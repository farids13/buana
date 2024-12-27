package com.buana.dto.pagination;

import java.util.List;

public class PaginationResponse<T> {
	public List<T> data;
	public int total;
	public int pageIndex;
	public int numberOfPages;

	public PaginationResponse(List<T> data, int total, int pageIndex, int numberOfPages) {
		this.data = data;
		this.total = total;
		this.pageIndex = pageIndex;
		this.numberOfPages = numberOfPages;
	}
}
