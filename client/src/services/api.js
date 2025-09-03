export async function fetchOdds({ date, regions } = {}) {
  const params = new URLSearchParams();
  if (date) params.set('date', date);
  if (regions) params.set('regions', regions);
  const url = `/api/odds${params.toString() ? `?${params.toString()}` : ''}`;
  const r = await fetch(url);
  if (!r.ok) {
    const msg = await r.text();
    throw new Error(msg || 'Failed to fetch odds');
  }
  return r.json();
}
