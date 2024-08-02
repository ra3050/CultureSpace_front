import axios from "axios";
import { AxiosHttpData } from "./Axios.config";

const Axios = axios.create(AxiosHttpData);

export default Axios;