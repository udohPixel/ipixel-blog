import { useEffect, useState } from 'react';

const useGet = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch data
    const getData = async () => {
      try {
        // fetch the data from the api
        const res = await fetch(url);

        // check if res is not ok
        if (!res.ok && res.status === 404) {
          throw Error("Invalid payload passed.");
        }
        if (!res.ok && res.status === 400) {
          throw Error("Something went wrong while processing your request.");
        }

        // convert the res to json
        const json = await res.json();

        await setData(json);
      } catch (err) {
        setError(err?.message);
      }
    }
    getData();

    setIsLoading(false);
    setError(null);

  }, [url]);

  return { data, isLoading, error };
}

export default useGet;