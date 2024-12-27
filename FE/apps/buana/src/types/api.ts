export type ApiErrorResponse = {
  message: ErrorEnum;
};

export enum ErrorEnum {
  INVALID = "INVALID_USERNAME_OR_PASSWORD",
  InvalidDate = "INVALID_EVENT_DATE",
  EventCategoryNameExists = "EVENT_CATEGORY_NAME_EXISTS",
  EventCategoryRequired = "EVENT_CATEGORY_NOT_FOUND"
}

export type PaginatedParams = {
  limit?: number;
  orderBy?: string;
  pageIndex?: number;
  search?: string;
  filterBy?: string;
};
