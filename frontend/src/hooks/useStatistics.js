import { useState, useEffect } from 'react';
import { getStatistics } from '../api/crimeApi';

export function useStatistics() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStatistics();
      setStatistics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  return { statistics, loading, error, refetch: fetch };
}
