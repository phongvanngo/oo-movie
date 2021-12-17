// post, patch, delete, put api calls

import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// cancel old request if there is new request come before old one response
let axiosRequest;

// common post
export async function post(endPoint, data) {
  if (axiosRequest) axiosRequest.cancel();

  axiosRequest = axios.CancelToken.source();

  const url = `${endPoint}`;
  const response = await axios({
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: { ...data },
  });
  return response;
}

//upload image
export async function uploadImage(endPoint, file) {
  if (axiosRequest) axiosRequest.cancel();
  axiosRequest = axios.CancelToken.source();

  const form = new FormData();
  form.append('file', file);

  const url = `${endPoint}`;
  const response = await axios({
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: form,
  });
  return response;
}

export async function get(endPoint, data) {
  //   if (axiosRequest) axiosRequest.cancel();

  //   axiosRequest = axios.CancelToken.source();

  const url = `${endPoint}`;
  const response = await axios({
    method: 'get',
    url: url,
    headers: {},
    params: { ...data },
  });
  return response;
}

export async function deleteItem(endPoint) {
  const url = `${endPoint}`;
  const response = await axios({
    method: 'delete',
    url: url,
    headers: {},
  });

  return response;
}
export async function Delete(endPoint, data) {
  const url = `${endPoint}`;
  const response = await axios({
    method: 'delete',
    url: url,
    headers: {},
    data: { ...data },
  });

  return response;
}
//PATCH
export async function patch(endPoint, data) {
  if (axiosRequest) axiosRequest.cancel();

  axiosRequest = axios.CancelToken.source();

  const url = `${endPoint}`;
  const response = await axios({
    method: 'patch',
    url: url,
    headers: {},
    data: { ...data },
  });
  return response;
}
