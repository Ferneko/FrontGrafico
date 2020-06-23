import axios from "axios";

const Conexao = axios.create({
  baseURL: "https://localhost:44311/"
});

Conexao.interceptors.request.use(async config => {
  const token = localStorage.getItem('tokenJWT');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.onDownloadProgress = progressEvent => console.log(progressEvent.loaded)
  config.onUploadProgress = progressEvent => console.log(progressEvent.loaded)

  return config;
});

export default Conexao;