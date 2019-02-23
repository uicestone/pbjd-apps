import config from "../config";

export const $ = (obj, cb) => {
  for (let [key, val] of Object.entries(obj)) {
    cb(key, val);
  }
};

export const obj2query = obj => {
  let queryString = "";
  for (let [key, value] of Object.entries(obj)) {
    queryString += `&${key}=${encodeURIComponent(value)}`;
  }
  return queryString.substr(1);
};

const parseJson = async res => {
  try {
    let data = await res.json();
    return data;
  } catch (e) {
    throw new Error("服务器错误");
  }
};

export const request = async (url, options = {}) => {
  let { cacheable = true } = options;

  if (options.method && options.method !== 'GET') {
    cacheable = false;
  }

  url = `${config.apiRoot}${url}`;
  const cacheData = JSON.parse(localStorage.getItem(url));
  let remoteData = null;
  if (cacheable && cacheData) {
    // console.log("Cache data founded.");
    _fetch(url, options)
      .then(data => {
        localStorage.setItem(url, JSON.stringify(data));
        // console.log("Cache data.");
      })
      .catch(e => {
        console.error("Network error fetching data.");
      });

    return cacheData;
  } else {
    console.log("Not found cached data, get data from remote server.");

    remoteData = await _fetch(url, options);
    localStorage.setItem(url, JSON.stringify(remoteData));
    // console.log("Cache data.");

    return remoteData;
  }
};

export const _fetch = (url, options) => fetch(url, options).then(parseJson);

export const getUserCount = ({ type, month, day }) => {
  return request(`user-count/${type}/${month}/${day}`, {
    method: "GET"
  });
};

export const getUserCountTotal = () => {
  return request(`user-count`, {
    method: "GET"
  });
};

export const spotsConfig = () => {
  return request(`spots/config`, {
    method: "GET"
  });
};

export const postsBuilding = () => {
  return request(`posts/building`, {
    method: "GET"
  });
};

export const rooms = () => {
  return request(`rooms`, {
    method: "GET"
  });
};

export const organizations = () => {
  return request(`organizations`, {
    method: "GET"
  });
};

export const getCpcReview = ({ type, month, day }) => {
  return request(`cpc-review/${type}/${month}/${day}`, {
    method: "GET"
  });
};

export const UploadSpeechTalk = datas => {
  let formData = new FormData();
  $(datas, (key, val) => {
    formData.append(key, val);
  });
  return request(`speeches/talk`, {
    method: "POST",
    body: formData
  });
};

export const UploadSpeechMovie = datas => {
  let formData = new FormData();
  $(datas, (key, val) => {
    formData.append(key, val);
  });
  return request(`speeches/movie`, {
    method: "POST",
    body: formData
  });
};


export const getSpeechMove = datas => {
  const { id } = datas;
  return request(`speeches/${id}`, {
    method: "GET"
  });
};

export const postsDetail = datas => {
  const { id } = datas;
  return request(`posts/${id}`, {
    method: "GET"
  });
};

export const updateSpeech = speech => {
  const { id } = speech;
  return request(`speeches/${id}`, {
    method: "POST",
    body: JSON.stringify(speech)
  });
};

export const UploadMotto = datas => {
  let formData = new FormData();
  $(datas, (key, val) => {
    formData.append(key, val);
  });
  return request(`mottoes`, {
    method: "POST",
    body: formData
  });
};

export const getMotto = datas => {
  const { id } = datas;
  return request(`mottoes/${id}`, {
    method: "GET"
  });
};

export const getMottoes = datas => {
  const { query } = datas;
  return request(`mottoes?${obj2query(query)}`, {
    method: "GET",
    cacheable: false
  });
};
export const getSpeechs = datas => {
  const { type, query } = datas;

  return request(`speeches/${type}?${obj2query(query)}`, {
    cacheable: false
  });
};

export const getSpots = datas => {
  return request(`spots`);
};

export const getIntroSlides = datas => {
  return request(`intro`);
};

export const getMapConfig = () => {
  return request(`spots/config`);
};

export const getAllResources = datas => {
  const query = {
    limit: -1
  }
  return request(`attachments?${obj2query(query)}`, {
    method: "GET"
  })
}

export const getWxJsapiArgs = (url) => {
  return request(`wx/jsapi-args?url=${encodeURIComponent(url)}`, {
    method: "GET"
  })
}
