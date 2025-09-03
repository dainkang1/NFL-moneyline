import React, { useEffect, useMemo, useState } from 'react';
import { fetchOdds } from './services/api';
import GameOdds from './components/GameOdds';
import mockData from './mock/odds-sample.json';

function App() {
  const [odds, setOdds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useMock, setUseMock] = useState(false);
  const [date, setDate] = useState(''); // YYYY-MM-DD (optional)
  const [regions, setRegions] = useState('us');
  const [teamFilter, setTeamFilter] = useState('');

  const sortedOdds = useMemo(() => {
    return [...odds].sort((a, b) => new Date(a.commence_time) - new Date(b.commence_time));
  }, [odds]);

  const teams = useMemo(() => {
    const s = new Set();
    for (const g of odds) {
      if (g.home_team) s.add(g.home_team);
      if (g.away_team) s.add(g.away_team);
    }
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [odds]);

  const displayOdds = useMemo(() => {
    if (!teamFilter) return sortedOdds;
    return sortedOdds.filter(
      (g) => g.home_team === teamFilter || g.away_team === teamFilter
    );
  }, [sortedOdds, teamFilter]);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        if (useMock) {
          setOdds(mockData);
        } else {
          const data = await fetchOdds({ date, regions });
          if (active) setOdds(data);
        }
      } catch (e) {
        console.error(e);
        if (active) setError('Failed to load odds');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [useMock, date, regions]);

  return (
    <div className="container">
      <header>
        <h1>Football Odds</h1>
        <div className="controls">
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            Region:
            <select value={regions} onChange={(e) => setRegions(e.target.value)}>
              <option value="us">US</option>
              <option value="eu">EU</option>
              <option value="uk">UK</option>
              <option value="au">AU</option>
            </select>
          </label>
          <label>
            Team:
            <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
              <option value="">All teams</option>
              {teams.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="toggle">
            <input type="checkbox" checked={useMock} onChange={(e) => setUseMock(e.target.checked)} />
            Use mock data
          </label>
        </div>
      </header>

      {loading && <div className="status">Loading odds…</div>}
      {error && <div className="status error">{error}</div>}

      {!loading && !error && sortedOdds.length === 0 && (
        <div className="status">No games found.</div>
      )}

      <div className="games">
        {displayOdds.map((game) => (
          <GameOdds key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default App;
