
const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function check() {
    const rawUrl = process.env.DATABASE_URL || '';
    const url = rawUrl.trim().replace(/[\u200B-\u200D\uFEFF]/g, '');
    const sql = neon(url);
    try {
        const result = await sql`SELECT * FROM waitlist`;
        console.log("WAITLIST_DATA:", JSON.stringify(result, null, 2));
    } catch (err) {
        console.error("ERROR:", err.message);
    }
}
check();
