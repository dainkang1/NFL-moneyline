import { teamLogoUrl } from '../teams.js';

describe('teamLogoUrl', () => {
  it('returns ESPN logo URL for known team', () => {
    expect(teamLogoUrl('Buffalo Bills')).toBe(
      'https://a.espncdn.com/i/teamlogos/nfl/500/buf.png'
    );
  });

  it('returns null for unknown team', () => {
    expect(teamLogoUrl('Unknown Team')).toBeNull();
  });
});

