
import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { wallet, referrer, points, potion } = req.body;

    if (!wallet) {
        return res.status(400).json({ error: 'Wallet is required' });
    }

    const sql = neon(process.env.DATABASE_URL!);

    try {
        // 1. Initial Table Setup (Safe to run multiple times)
        await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        wallet TEXT PRIMARY KEY,
        referrer TEXT,
        points INTEGER DEFAULT 0,
        potion TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

        // 2. Check if user already exists to determine if we should award referral bonus
        const existingUser = await sql`SELECT wallet FROM waitlist WHERE wallet = ${wallet}`;
        const isNewUser = existingUser.length === 0;

        let finalPoints = points;

        // 3. If new user has a referrer, award bonus points (+20 each)
        if (isNewUser && referrer && referrer.toLowerCase() !== wallet.toLowerCase()) {
            // Award 20 points to the new user (referee)
            finalPoints += 20;

            // Award 20 points to the referrer
            try {
                await sql`
          UPDATE waitlist 
          SET points = points + 20 
          WHERE wallet = ${referrer}
        `;
            } catch (refErr) {
                console.error('Failed to update referrer points:', refErr);
                // We continue even if referrer update fails (e.g. referrer doesn't exist yet)
            }
        }

        // 4. Insert or Update (Upsert) the user
        await sql`
      INSERT INTO waitlist (wallet, referrer, points, potion)
      VALUES (${wallet}, ${referrer || null}, ${finalPoints}, ${potion})
      ON CONFLICT (wallet) 
      DO UPDATE SET 
        points = CASE 
          WHEN waitlist.points < EXCLUDED.points THEN EXCLUDED.points 
          ELSE waitlist.points 
        END,
        potion = EXCLUDED.potion
    `;


        return res.status(200).json({ success: true });
    } catch (error: any) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to join waitlist', details: error.message });
    }
}
