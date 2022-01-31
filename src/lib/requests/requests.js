import Config from "react-native-config";
const cookie = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJkYzkzYmMyLWQ3ZDQtNDFmZS1hNmIwLTNiMzZlYjNlY2U2MSIsInBlcm1pc3Npb24iOlsiQURNSU4iXSwiaWF0IjoxNjQzNTg3OTM0fQ.amPi-C7B_7bzAWryabmvxvFdLYn8lAR9iHUn-J4b3Yg"
import axios from "axios";
const sendRequest = async (metodh, url, params) => {
  const SERVER_URL = 'https://shop.amiba.pt/api/'
  const requestMetadata = {
    method: metodh,
    // credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  };
  
  const response = await fetch((SERVER_URL + url), requestMetadata)
    .then((res) => res.json())
    .then(
      (data) => ({ data }),
      (error) => ({ error }),
    );
  return response;
};

const sendRequest2 = async (metodh, url, params) => {
  const SERVER_URL = 'https://shop.amiba.pt/api/'
  const requestMetadata = {
    method: metodh,
    // credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth}`
    },
    body: JSON.stringify(params),
  };

  const response = await axios({
    method: metodh,
    url: SERVER_URL + url,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true

  })
  return response;
};

export { sendRequest, sendRequest2 }