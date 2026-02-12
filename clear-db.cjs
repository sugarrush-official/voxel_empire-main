
const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function clear() {
    const rawUrl = (process.env.DATABASE_URL || '').trim().replace(/[\u200B-\u200D\uFEFF]/g, '');
    const sql = neon(rawUrl);
    try {
        await sql`DELETE FROM waitlist`;
        console.log("DB_CLEARED_SUCCESSFULLY");
    } catch (err) {
        console.error("ERROR:", err.message);
    }
}
clear();
