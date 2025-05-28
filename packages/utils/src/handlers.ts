import axios from "axios";

export const axiosErrorHandler = (error: unknown, from: string) => {
  console.log(`\n${from}\n`);
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("Error Data:", error.response.data);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error Message:", error.message);
    }
  } else {
    console.error("Unexpected Error  :", error);
  }
};

export const errorMessageHandler = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "API ERROR";
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "An unexpected error occurred";
  }
};
