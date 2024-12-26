package com.buana.dto.pagination;

public class PaginationRequest {
    public String search;
    public int limit = 10;
    public int pageIndex = 0;
    public String filterBy;

    public PaginationRequest() {
        // do nothing
    }
}
