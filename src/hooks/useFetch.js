import { useState, useEffect } from "react";

export default function useFetch(fetchFn, param) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchFn(param)
      .then(res => setData(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [fetchFn, param]);

  return { data, loading, error };
}
