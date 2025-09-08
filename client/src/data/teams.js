// Mapping of NFL team display names to abbreviations and logo URLs
// Uses ESPN CDN 500px logos; falls back handled by <img onError> in UI.

export const TEAM_INFO = {
  'Arizona Cardinals': { abbr: 'ari' },
  'Atlanta Falcons': { abbr: 'atl' },
  'Baltimore Ravens': { abbr: 'bal' },
  'Buffalo Bills': { abbr: 'buf' },
  'Carolina Panthers': { abbr: 'car' },
  'Chicago Bears': { abbr: 'chi' },
  'Cincinnati Bengals': { abbr: 'cin' },
  'Cleveland Browns': { abbr: 'cle' },
  'Dallas Cowboys': { abbr: 'dal' },
  'Denver Broncos': { abbr: 'den' },
  'Detroit Lions': { abbr: 'det' },
  'Green Bay Packers': { abbr: 'gb' },
  'Houston Texans': { abbr: 'hou' },
  'Indianapolis Colts': { abbr: 'ind' },
  'Jacksonville Jaguars': { abbr: 'jax' },
  'Kansas City Chiefs': { abbr: 'kc' },
  'Las Vegas Raiders': { abbr: 'lv' },
  'Los Angeles Chargers': { abbr: 'lac' },
  'Los Angeles Rams': { abbr: 'lar' },
  'Miami Dolphins': { abbr: 'mia' },
  'Minnesota Vikings': { abbr: 'min' },
  'New England Patriots': { abbr: 'ne' },
  'New Orleans Saints': { abbr: 'no' },
  'New York Giants': { abbr: 'nyg' },
  'New York Jets': { abbr: 'nyj' },
  'Philadelphia Eagles': { abbr: 'phi' },
  'Pittsburgh Steelers': { abbr: 'pit' },
  'San Francisco 49ers': { abbr: 'sf' },
  'Seattle Seahawks': { abbr: 'sea' },
  'Tampa Bay Buccaneers': { abbr: 'tb' },
  'Tennessee Titans': { abbr: 'ten' },
  'Washington Commanders': { abbr: 'wsh' },
};

export function teamLogoUrl(teamName) {
  const info = TEAM_INFO[teamName];
  if (!info?.abbr) return null;
  const abbr = info.abbr.toLowerCase();
  // Primary source
  return `https://a.espncdn.com/i/teamlogos/nfl/500/${abbr}.png`;
}

