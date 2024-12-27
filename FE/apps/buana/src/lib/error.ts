import type { ApiErrorResponse } from "@/types/api";
import { ErrorEnum } from "@/types/api";
import { AxiosError } from "axios";

export class ApiError extends AxiosError {
  constructor(error: ApiErrorResponse) {
    super(error.message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  stringify(): string {
    switch (this.message) {
      case ErrorEnum.EventCategoryNameExists:
        return "Event Category Name Already Exists";
      case ErrorEnum.INVALID:
        return "Email or password is invalid.";
      case ErrorEnum.InvalidDate:
        return "Event Date Invalid";
      case ErrorEnum.EventCategoryRequired:
        return "Event Category Required";
      default:
        return this.message;
    }
  }
}

export const errorMessages = (error: unknown): string | undefined => {
  if (error instanceof ApiError) {
    return error.stringify();
  }
};
