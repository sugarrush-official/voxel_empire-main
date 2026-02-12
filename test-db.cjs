
const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function test() {
    console.log("Testing connection...");
    const rawUrl = process.env.DATABASE_URL || '';
    const url = rawUrl.trim().replace(/[\u200B-\u200D\uFEFF]/g, '');
    if (!url) {
        console.error("DATABASE_URL is missing!");
        return;
    }
    console.log("URL detected (starts with):", url.substring(0, 20) + "...");

    const sql = neon(url);
    try {
        const result = await sql`SELECT 1 as test`;
        console.log("SUCCESS:", result);
    } catch (err) {
        console.error("FAILURE:", err.message);
        console.error("Full Error:", err);
    }
}

test();
