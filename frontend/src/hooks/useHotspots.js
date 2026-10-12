import { useState, useEffect } from 'react';
import { getHotspots } from '../api/crimeApi';

export function useHotspots() {
  const [hotspots, setHotspots] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHotspots();
      setHotspots(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  return { hotspots, loading, error, refetch: fetch };
}
