import config from "../config";

export const $ = (obj, cb) => {
  for (let [key, val] of Object.entries(obj)) {
    cb(key, val)
  }
}

export const obj2query = obj => {
  let queryString = ""
  for (let [key, value] of Object.entries(obj)) {
    queryString += `&${key}=${encodeURIComponent(value)}`
  }
  return queryString.substr(1)
}

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
  // console.log(options)
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

export const UploadSpeechTalk = (datas) => {

  let formData = new FormData()
  $(datas, (key, val) => {
    formData.append(key, val)
  })
  return request(`speeches/talk`, {
    method: "POST",
    body: formData
  })
}

export const UploadSpeechMovie = (datas) => {

  let formData = new FormData()
  $(datas, (key, val) => {
    formData.append(key, val)
  })
  return request(`speeches/movie`, {
    method: "POST",
    body: formData
  })
}

export const getSpeechMove = (datas) => {
  const {
    id
  } = datas
  return request(`speeches/${id}`, {
    method: "GET"
  })
}



export const UploadMotto = (datas) => {
  let formData = new FormData()
  $(datas, (key, val) => {
    formData.append(key, val)
  })
  return request(`mottoes`, {
    method: "POST",
    body: formData
  })
}

export const getMotto = datas => {
  const {
    id
  } = datas
  return request(`mottoes/${id}`, {
    method: "GET"
  })
}

export const getMottoes = datas => {
  const {
    query
  } = datas
  return request(`mottoes?${obj2query(query)}`, {
    method: "GET"
  })
}
export const getSpeechs = datas => {
  const {
    type,
    query
  } = datas

  return request(`speeches/${type}?${obj2query(query)}`)
}

export const getSpots = datas => {
  return request(`spots`)
}