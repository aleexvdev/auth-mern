import { Response } from "express";

interface ResponseData {
  message?: string;
  detail?: any;
}

interface ResponseStructure {
  timestamp: string;
  code: number;
  status: boolean;
  data: ResponseData | any;
}

const getCurrentTimestamp = (): string => new Date().toISOString();

const defaultStructure = (
  code: number,
  message: string | null,
  data: any | null,
  status: boolean
): ResponseStructure => ({
  timestamp: getCurrentTimestamp(),
  code,
  status,
  data: message ? { message, detail: data } : data,
});

const defaultResponse = (res: Response, code: number, message: string): void => {
  const response = defaultStructure(code, message, null, false);
  res.status(code).json(response);
};

const successResponse = (res: Response, message: string, data: any): void => {
  const response = defaultStructure(200, message, data, true);
  res.status(200).json(response);
};

/* const errorResponse = (res: Response, code: number, message: string, errors: any = null): void => {
  const response = defaultStructure(code, message, errors, false);
  res.status(code).json(response);
}; */

const errorResponse = (res: Response, code: number, message: string, errors: any = null): void => {
  const response = defaultStructure(code, message, errors ? { error: errors } : null, false);
  res.status(code).json(response);
};

export { defaultResponse, successResponse, errorResponse };