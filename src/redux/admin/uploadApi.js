import { useSelector } from "react-redux";
import { publicRequest, userRequest } from "../slice/requestMethods";

const uploadApi = {
  uploadImage: (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return publicRequest.post(`/api/product/upload`, formData, config);
  },
};

export default uploadApi;
