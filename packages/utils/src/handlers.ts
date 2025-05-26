import axios from "axios";

export const axiosErrorHandler = (error: unknown, from: string) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("Error Data:", error.response.data);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error Message:", error.message);
    }
  } else {
    console.error(`Unexpected Error ${from} :`, error);
  }
};
