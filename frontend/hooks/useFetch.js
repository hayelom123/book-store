import { useState, useEffect } from "react";
import { apiCall } from "../api/api";

export default useFetch = (
  option = {
    path: "",
    method: "get",
    data: {},
    callback: (data) => data,
    onFailure: (err) => err,
    token: "",
  }
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, seterror] = useState();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    seterror(null);

    option.path = `${option.path}`;
    setLoading(true);
    apiCall({
      ...option,
      callback: ({ data: newData }) => {
        setData({ ...newData });
      },
      onFailure: (err) => {
        seterror(err);
      },
    }).then(() => {
      setLoading(false);
    });
  };
  const retry = () => {
    fetchData();
  };
  return { data, loading, error, retry };
};
