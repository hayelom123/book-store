import { useState, useEffect } from "react";
import { apiCall } from "../api/api";

export default useFetch = ({}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, seterror] = useState();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    apiCall()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        seterror(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { data, loading, error };
};
