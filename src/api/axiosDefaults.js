import axios from "axios";

// Adapted from Code Institute Moments walkthrough
axios.defaults.baseURL = "https://tiny-wheels-drf-api-4afe6c445f29.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "mulitpart/form-data"; //mulitpart as api will expect images and text
axios.defaults.withCredentials = true;

export const axiosReq = axios.create(); //for intercepting requests
export const axiosRes = axios.create(); //for intercepting response