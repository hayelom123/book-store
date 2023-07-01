import { useState, useEffect } from "react";
import { apiCall } from "../api/api";

export default usePaginate = (
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
  const [data, setData] = useState([]);
  const [error, seterror] = useState();
  const [page, setpage] = useState(0);
  const [size, setSize] = useState(30);
  const [pageEnd, setPageEnd] = useState(false);

  useEffect(() => {
    setData([]);
    fetchData();
  }, []);

  const fetchData = async () => {
    seterror(null);
    if (pageEnd) return;

    option.path = `${option.path}?page=${page}&size=${size}`;
    setLoading(true);
    apiCall({
      ...option,
      callback: ({ data: newData }) => {
        console.log("newdata:", newData);
        // { products }
        setData((prev) => [...prev, ...newData]);
        if (newData.length < size) {
          setPageEnd(true);
        }
      },
      onFailure: (err) => {
        seterror(err);
      },
    }).then(() => {
      setLoading(false);
    });
  };
  const nextPage = () => {
    if (!pageEnd && !loading) {
      setpage((prev) => prev + 1);
      fetchData();
    }
  };
  const onRefresh = () => {
    setData([]);
    setpage(0);
    setPageEnd(false);
    fetchData();
  };
  return { data, loading, error, nextPage, onRefresh, pageEnd };
};
