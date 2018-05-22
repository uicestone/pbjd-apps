import config from "../config";

async function parseJson(res) {
  try {
    let data = await res.json();
    return data;
  } catch (e) {
    throw new Error("服务器错误");
  }
}

export default function request(url, options) {
  url = `${config.apiRoot}${url}`;
  return fetch(url, options).then(pareJSON);
}
