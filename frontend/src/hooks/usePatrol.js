import { useState, useEffect } from 'react';
import { getPatrolRecommendations } from '../api/crimeApi';

export function usePatrol() {
  const [patrol, setPatrol] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPatrolRecommendations();
      setPatrol(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  return { patrol, loading, error, refetch: fetch };
}
