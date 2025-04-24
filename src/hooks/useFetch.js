import { useState, useEffect } from "react";               // Import React hooks

export default function useFetch(fetchFn, param) {         // Define custom hook, takes a fetch function and parameter
  const [data, setData] = useState(null);                  // State to hold fetched data, initialized to null
  const [loading, setLoading] = useState(true);            // State to track loading status, starts as true
  const [error, setError] = useState(null);                // State to capture any fetch errors, starts as null

  useEffect(() => {                                        // Effect runs on mount and whenever fetchFn or param change
    setLoading(true);                                      // Set loading state before starting fetch
    fetchFn(param)                                        // Call the provided fetch function with parameter
      .then(res => setData(res.data))                      // On success, update data state with response data
      .catch(err => setError(err))                         // On failure, capture the error
      .finally(() => setLoading(false));                   // In all cases, stop loading once done
  }, [fetchFn, param]);                                    // Re-run effect if fetchFn or param dependencies change

  return { data, loading, error };                         // Return current data, loading, and error states
}
