import axios from "axios";
import ENDPOINT from "./contstants";

export const apiCall = async (
  option = {
    url: ENDPOINT,
    path: "",
    method: "get",
    data: {},
    callback: (data) => data,
    onFailure: (err) => err,
    token: "",
  }
) => {
  const ob = {
    url: ENDPOINT,
    method: "get",
    path: "/",
    data: {},
    callback: (data) => data,
    onFailure: null,
    token: "",
    ...option,
  };
  const { method, url, path, data, callback, onFailure, token } = ob;
  //  sessionStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `${token ? token : ""}`,
    },
  };
  console.log(url + path);

  return axios({
    method: method,
    url: url + "" + path,
    data,
    config,
  })
    .then((res) => {
      callback(res.data);

      return res.data;
    })
    .catch((error) => {
      if (onFailure) return onFailure(error);
      throw new Error(error);
      //   return error;
      // toast.error(error.response.data.message);
    });
};
