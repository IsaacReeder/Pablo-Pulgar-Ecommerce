import axios from "axios";

import { API_URL } from "./url";

export const uploadAction = async (image) => {
  const fd = new FormData();
  fd.append("image", image);
  const config = {
    headers: {
      "Content-Type": "Multipart/form-data",
    },
  };

  try {
    const res = await axios.post(API_URL + "api/images", fd, config);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
