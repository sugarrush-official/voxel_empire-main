
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { neon } = require('@neondatabase/serverless');

const app = express();
app.use(cors());
app.use(express.json());

const rawUrl = (process.env.DATABASE_URL || '').trim().replace(/[\u200B-\u200D\uFEFF]/g, '');
let parsed = {};
try {
    parsed = new URL(rawUrl);
    console.log('Attempting connection to:', parsed.hostname);
} catch (e) {
    console.error('INVALID DATABASE_URL FORMAT!');
}
const sql = neon(rawUrl);

// --- API: HEALTH ---
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', hostname: parsed.hostname || 'unknown' });
});

// --- API: JOIN ---
app.post('/api/join', async (req, res) => {
    const { wallet, referrer, points, potion } = req.body;
    console.log('🌾 Farmer Joining:', { wallet, points, referrer, potion });
    console.log('📝 DATABASE_URL present:', !!rawUrl, rawUrl.substring(0, 30) + '...');

    try {
        // 1. Initial Table Setup
        await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        wallet TEXT PRIMARY KEY,
        referrer TEXT,
        points INTEGER DEFAULT 0,
        potion TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

        // 2. Check for new user
        const existingUser = await sql`SELECT wallet FROM waitlist WHERE wallet = ${wallet}`;
        const isNewUser = existingUser.length === 0;
        let finalPoints = points;

        // 3. Referral Logic
        if (isNewUser && referrer && referrer.toLowerCase() !== wallet.toLowerCase()) {
            finalPoints += 20;
            try {
                await sql`UPDATE waitlist SET points = points + 20 WHERE wallet = ${referrer}`;
            } catch (e) {
                console.error('Referrer update skipped:', e.message);
            }
        }

        // 4. Upsert
        await sql`
      INSERT INTO waitlist (wallet, referrer, points, potion)
      VALUES (${wallet}, ${referrer || null}, ${finalPoints}, ${potion})
      ON CONFLICT (wallet) 
      DO UPDATE SET 
        points = CASE WHEN waitlist.points < EXCLUDED.points THEN EXCLUDED.points ELSE waitlist.points END,
        potion = EXCLUDED.potion
    `;

        console.log('✅ Successfully saved to Neon:', { wallet, finalPoints });
        res.json({ success: true });
    } catch (err) {
        console.error('❌ DB Error:', err.message);
        console.error('📍 Full error stack:', err);
        res.status(500).json({ error: `DATABASE ERROR: ${err.message}` });
    }
});

// --- API: REFERRALS ---
app.get('/api/referrals', async (req, res) => {
    const { wallet } = req.query;
    try {
        const result = await sql`SELECT COUNT(*)::int as count FROM waitlist WHERE referrer = ${wallet}`;
        res.json({ referralCount: result[0].count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Database Bridge active on port ${PORT}`));
