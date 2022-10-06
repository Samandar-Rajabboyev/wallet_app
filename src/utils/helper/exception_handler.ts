import { Response } from "express";

export const exceptionHandler = (err, response: Response) => {
  const status = err.status || 400;

  response.status(status);
  return { error: err.message };
};
