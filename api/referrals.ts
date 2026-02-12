
import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { wallet } = req.query;

    if (!wallet) {
        return res.status(400).json({ error: 'Wallet address is required' });
    }

    const sql = neon(process.env.DATABASE_URL!);

    try {
        // Count how many people have this wallet as their referrer
        const result = await sql`
      SELECT COUNT(*)::int as count 
      FROM waitlist 
      WHERE referrer = ${wallet}
    `;

        return res.status(200).json({
            wallet,
            referralCount: result[0].count
        });
    } catch (error: any) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to fetch referral count' });
    }
}
