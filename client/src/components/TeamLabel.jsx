import React, { useMemo } from 'react';
import { TEAM_INFO, teamLogoUrl } from '../data/teams';
import placeholder from '../assets/nfl-placeholder.svg';

export default function TeamLabel({ name, size = 22, align = 'left', display = 'name', compact = false }) {
  const src = useMemo(() => teamLogoUrl(name), [name]);
  const alt = `${name} logo`;
  const style = { width: size, height: size };
  const abbr = TEAM_INFO[name]?.abbr?.toUpperCase();
  const label = display === 'abbr' && abbr ? abbr : name;
  return (
    <span className={`team-label ${align} ${compact ? 'compact' : ''}`}>
      <img
        className="team-logo"
        style={style}
        src={src || placeholder}
        alt={alt}
        onError={(e) => {
          // Try an alternate ESPN scoreboard path, then fall back to placeholder
          const info = TEAM_INFO[name];
          const a = info?.abbr?.toLowerCase();
          const altUrl = a ? `https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/${a}.png` : null;
          if (altUrl && e.currentTarget.src !== altUrl) {
            e.currentTarget.src = altUrl;
          } else if (e.currentTarget.src !== placeholder) {
            e.currentTarget.src = placeholder;
          }
        }}
      />
      <span className="team-name">{label}</span>
    </span>
  );
}
