import { useState, useEffect } from "react";

export function useLoading(fetchMethod, params) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;
    setData(null);

    const request =
      params === undefined ? fetchMethod() : fetchMethod(params);

    request.then((res) => {
      if (!ignore) {
        setData(res);
      }
    });

    return () => {
      ignore = true;
    };
  }, [fetchMethod, params]);

  return data;
}
