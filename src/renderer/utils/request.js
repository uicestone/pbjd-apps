import config from "../config";

const parseJson = async (res) => {
  try {
    let data = await res.json();
    return data;
  } catch (e) {
    throw new Error("服务器错误");
  }
}

export const request = (url, options) => {
  url = `${config.apiRoot}${url}`;
  return fetch(url, options).then(parseJson);
}



export const getUserCount = ({
  type,
  month,
  day
}) => {
  return request(`user-count/${type}/${month}/${day}`, {
    method: "GET"
  })
}

export const getCpcReview = ({
  type,
  month,
  day
}) => {
  return request(`cpc-review/${type}/${month}/${day}`, {
    method: "GET"
  })
}

export const UploadSpeech = ({
  type,
  uri
}) => {
  let fromData = new FormData()
  fromData.append("data", {
    type,
    bgid: "1",
    audio: uri
  })
  return request(`speeches/${type}`, {
    method: "POST",
    headers: {
      'Content-Type': "multipart/from-data"
    },
    body: fromData
  })
}

export const UploadMotto = ({
  text,
  image,
  authorName
}) => {
  let fromData = new FormData()
  fromData.append("data", {
    text,
    image,
    authorName
  })
  return request(`mottoes`, {
    method: "POST",
    headers: {
      'Content-Type': "multipart/from-data"
    },
    body: fromData
  })
}

export const getMottoes = () => {
  return request("mottoes", {
    method: "GET"
  })
}