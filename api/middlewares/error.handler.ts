import { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";
import type { ErrorTMDB } from '../types/error'

export function logErrors(error: Error, _req: Request, _res: Response, next: NextFunction) {
  console.error(error);
  next(error);
}

export function errorHandler(error: Error, _req: Request, res: Response, _next: NextFunction) {
  res.status(500).json(error);
}


export function axiosErrorHandler(error: AxiosError, _req: Request, res: Response, next: NextFunction) {
  if (error.isAxiosError) {
    if (error.response) {
      const errorData: ErrorTMDB = error.response.data as ErrorTMDB;
      res.status(error.response.status).json({
        message: errorData.status_message,
        stack: error.stack
      })
    }
    else {
      res.status(500).json(error.toJSON())
    }
  } else {
    next(error);
  }
}
