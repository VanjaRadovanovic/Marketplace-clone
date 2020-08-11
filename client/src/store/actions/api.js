import axios from 'axios';

export function callApi(method, path, data) {
  return new Promise((resolve, reject) => {
    return axios[method](`localhost:4000/${path}`, data)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.response.data.error);
      })
  })
}