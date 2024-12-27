package com.buana.dto.pagination;

import io.swagger.v3.oas.annotations.media.Schema;

public class PaginationRequest {
    @Schema(defaultValue = "")
    public String search;

    @Schema(defaultValue = "10")
    public int limit;

    @Schema(defaultValue = "0")
    public int pageIndex;

    @Schema(defaultValue = "createdAt")
    public String filterBy;

    public PaginationRequest(String search, int limit, int pageIndex, String filterBy) {
        this.search = search;
        this.limit = limit;
        this.pageIndex = pageIndex;
        this.filterBy = filterBy;
    }

    public PaginationRequest() {
        this.search = "";
        this.limit = 10;
        this.pageIndex = 0;
        this.filterBy = "createdAt";
    }
}
