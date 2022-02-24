import axios from "axios";

const instance = axios.create({
    baseURL: "http://54.180.95.115",
    headers: {
      "Authorization": localStorage.getItem('token')
    }
  });

export default instance;