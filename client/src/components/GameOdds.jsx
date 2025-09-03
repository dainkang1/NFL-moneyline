import React, { useMemo } from 'react';

function formatTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

// Extract market helpers: h2h (moneyline), spreads, totals
function extractMarkets(bookmaker) {
  const result = { ml: null, spread: null, total: null };
  if (!bookmaker?.markets) return result;
  for (const m of bookmaker.markets) {
    if (m.key === 'h2h') {
      result.ml = m.outcomes;
    } else if (m.key === 'spreads') {
      result.spread = m.outcomes;
    } else if (m.key === 'totals') {
      result.total = m.outcomes;
    }
  }
  return result;
}

function Moneyline({ outcomes, homeTeam, awayTeam }) {
  if (!outcomes) return <span className="muted">—</span>;
  const home = outcomes.find((o) => o.name === homeTeam);
  const away = outcomes.find((o) => o.name === awayTeam);
  return (
    <div className="inline">
      <div>{awayTeam}: <strong>{away?.price ?? '—'}</strong></div>
      <div>{homeTeam}: <strong>{home?.price ?? '—'}</strong></div>
    </div>
  );
}

function Spread({ outcomes, homeTeam, awayTeam }) {
  if (!outcomes) return <span className="muted">—</span>;
  const home = outcomes.find((o) => o.name === homeTeam);
  const away = outcomes.find((o) => o.name === awayTeam);
  return (
    <div className="inline">
      <div>{awayTeam}: <strong>{away?.point ?? '—'}</strong> ({away?.price ?? '—'})</div>
      <div>{homeTeam}: <strong>{home?.point ?? '—'}</strong> ({home?.price ?? '—'})</div>
    </div>
  );
}

function Total({ outcomes }) {
  if (!outcomes) return <span className="muted">—</span>;
  const over = outcomes.find((o) => o.name?.toLowerCase() === 'over');
  const under = outcomes.find((o) => o.name?.toLowerCase() === 'under');
  return (
    <div className="inline">
      <div>Over: <strong>{over?.point ?? '—'}</strong> ({over?.price ?? '—'})</div>
      <div>Under: <strong>{under?.point ?? '—'}</strong> ({under?.price ?? '—'})</div>
    </div>
  );
}

export default function GameOdds({ game }) {
  const { home_team, away_team, commence_time, bookmakers = [] } = game;

  const sortedBooks = useMemo(() => {
    return [...bookmakers].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
  }, [bookmakers]);

  return (
    <div className="card">
      <div className="meta">
        <div className="teams">
          <div className="away">{away_team}</div>
          <div className="at">@</div>
          <div className="home">{home_team}</div>
        </div>
        <div className="time">{formatTime(commence_time)}</div>
      </div>

      <div className="book-header">
        <div className="col book">Sportsbook</div>
        <div className="col">Moneyline</div>
        <div className="col">Spread</div>
        <div className="col">Total</div>
      </div>
      {sortedBooks.length === 0 && (
        <div className="row muted">No bookmaker data.</div>
      )}
      {sortedBooks.map((bm) => {
        const { ml, spread, total } = extractMarkets(bm);
        return (
          <div className="row" key={bm.key}>
            <div className="col book">{bm.title || bm.key}</div>
            <div className="col"><Moneyline outcomes={ml} homeTeam={home_team} awayTeam={away_team} /></div>
            <div className="col"><Spread outcomes={spread} homeTeam={home_team} awayTeam={away_team} /></div>
            <div className="col"><Total outcomes={total} /></div>
          </div>
        );
      })}
    </div>
  );
}

