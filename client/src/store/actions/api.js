import axios from 'axios';

//const token = useSelector(state => state.currentUser.user.token);


export function callApi(method, path, data, token) {
  const axiosPosts = axios.create({
    headers: {
      authorization: `Bearer ${token}`,
      data: data
    }
  })
  return new Promise((resolve, reject) => {
    return axiosPosts[method](path, data)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.response.data.error);
      })
  })
}