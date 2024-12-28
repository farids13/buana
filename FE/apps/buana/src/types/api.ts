export type ApiErrorResponse = {
  message: ErrorEnum;
};

export enum ErrorEnum {
  INVALID = "INVALID_USERNAME_OR_PASSWORD",
}

export type PaginatedParams = {
  limit?: number;
  orderBy?: string;
  pageIndex?: number;
  search?: string;
  filterBy?: string;
};
