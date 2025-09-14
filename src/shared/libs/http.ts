import GLOBALS from "@/shared/const/globals";
import axios from "axios";

const http = await axios.create({
  baseURL: GLOBALS.API_BASE_URL,
});

export default http;
