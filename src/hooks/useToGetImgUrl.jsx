import axios from "axios";

const imgbb_api_key = import.meta.env.VITE_IMGBB_API_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`;

const useToGetImageUrl = () => {
  const getImageUrl = async (imgObject) => {
    const imgFile = { image: imgObject[0] };
    const res = await axios.post(img_hosting_api, imgFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res?.data?.data)
    return res?.data?.data?.url;
  };
  return getImageUrl;
};

export default useToGetImageUrl;