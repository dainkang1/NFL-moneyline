import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5050;
const ODDS_API_KEY = process.env.ODDS_API_KEY;
const SPORT = process.env.SPORT || 'americanfootball_nfl';
const BOOKMAKERS = (process.env.BOOKMAKERS || '').trim();

if (!ODDS_API_KEY) {
  console.warn('[warning] ODDS_API_KEY not set. /api/odds will return 500.');
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, sport: SPORT });
});

// Proxy endpoint to fetch odds
// Query params: date=YYYY-MM-DD (optional), regions=us|eu (default us)
app.get('/api/odds', async (req, res) => {
  try {
    if (!ODDS_API_KEY) {
      return res.status(500).json({ error: 'ODDS_API_KEY not configured on server' });
    }

    const regions = req.query.regions || 'us';
    const dateParam = req.query.date ? `&dateFormat=iso&date=${encodeURIComponent(req.query.date)}` : '&dateFormat=iso';
    const markets = 'h2h,spreads,totals';
    const oddsFormat = 'american';
    const bookmakers = BOOKMAKERS ? `&bookmakers=${encodeURIComponent(BOOKMAKERS)}` : '';

    const url = `https://api.the-odds-api.com/v4/sports/${SPORT}/odds/?regions=${regions}&markets=${markets}&oddsFormat=${oddsFormat}${dateParam}${bookmakers}&apiKey=${ODDS_API_KEY}`;

    const r = await fetch(url);
    if (!r.ok) {
      const text = await r.text();
      return res.status(r.status).json({ error: 'Upstream error', details: text });
    }
    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Only listen when not under test
if (process.env.NODE_ENV !== 'test' && !process.env.VITEST) {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

export default app;
