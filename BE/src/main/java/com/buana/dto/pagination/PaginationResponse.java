package com.buana.dto.pagination;

import java.util.List;

public class PaginationResponse<T> {
	public List<T> data;
	public int totalItems;
	public int pageIndex;
	public int totalPages;

	public PaginationResponse(List<T> data, int totalItems, int pageIndex, int totalPages) {
		this.data = data;
		this.totalItems = totalItems;
		this.pageIndex = pageIndex;
		this.totalPages = totalPages;
	}
}
