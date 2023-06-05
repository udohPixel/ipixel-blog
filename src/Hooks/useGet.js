import { useEffect, useState } from 'react';

const useGet = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // abort controller
    const abortCtrl = new AbortController();

    // fetch data
    const getData = async () => {
      try {
        // fetch the data from the api
        const res = await fetch(url, { signal: abortCtrl.signal });

        // check if res is not ok
        if (!res.ok && res.status === 404) {
          throw Error("Invalid payload passed.");
        }
        if (!res.ok && res.status === 400) {
          throw Error("Something went wrong while processing your request.");
        }

        // convert the res to json
        const json = await res.json();

        setData(json);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setIsLoading(false);
          setError(err?.message);
        }
      }
    }
    getData();

    return () => abortCtrl.abort();
  }, [url]);

  return { data, isLoading, error };
}

export default useGet;