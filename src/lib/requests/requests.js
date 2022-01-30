import Config from "react-native-config";

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

export { sendRequest }