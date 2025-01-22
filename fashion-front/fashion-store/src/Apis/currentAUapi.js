import axios from "axios";


export const setCurrentAboutUs = async (aboutUsId) => {
  try {
    const { data } = await axios.post("http://127.0.0.1:5000/api/currab/set-current", { aboutUsId });
    return data; //response data after success
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message); 
  }
};


export const getCurrentAboutUs = async () => {
  try {
    const { data } = await axios.get("http://127.0.0.1:5000/api/currab/current");
    return data; //response data after success
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message); 
  }
}; 