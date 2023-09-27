import { apiResponse, isApiResponse } from "./apiResponse";
import fetch from "node-fetch";

interface apiHeaders {
  "Content-Type": string;
}

export interface apiRequest {
  method: string;
  url: string;
  timeout: number;
  headers: apiHeaders;
}

const fetchData = async (data: apiRequest) => {
  const makingApiCall = await fetch(data.url);
  const extractResponse = await makingApiCall.json();

  if (isApiResponse<apiResponse>(extractResponse)) {
    return extractResponse;
  } else {
    console.log("Invalid API response");
  }
};
export { fetchData };
