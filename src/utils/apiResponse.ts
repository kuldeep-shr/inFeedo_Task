import { Response } from "express";

export interface apiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;
}

export interface validationAPIKeysInResponse {
  objectid: string;
  applicant: string;
  cnn: string;
}

export interface ApiResponse<T> {
  success?: boolean;
  data: T;
  error?: string;
}

// Type guard function
function isApiResponse<T>(response: any): response is ApiResponse<T> {
  return typeof response === "object" && response.length > 0;
}

interface sendAPISuccessResponseI {
  success: boolean;
  message?: string;
  [key: string]: any;
}

function sendAPISuccessResponse<T>(
  res: Response,
  data: any,
  message?: string
): void {
  const response: sendAPISuccessResponseI = {
    success: true,
    message: message,
    data: data,
  };
  res.status(200).json(response);
}

interface sendAPIErrorResponseI {
  success: boolean;
  message?: string;
  data: any;
}

function sendAPIErrorResponse<T>(res: any, data: [], message?: string): void {
  const response: sendAPIErrorResponseI = {
    success: false,
    message: message,
    data: [],
  };
  return res.status(400).json(response);
}

/*
  new api Response typeguard
*/

// function isResponseData(obj: any): obj is validationAPIKeysInResponse; {
//   return typeof obj === "object" && obj !== null && "data" in obj;
// }

export { isApiResponse, sendAPISuccessResponse, sendAPIErrorResponse };
