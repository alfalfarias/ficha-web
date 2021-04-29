export const Pagination = function(response) {	
	const paginationResponse =  {
		page: response.page && Number(response.page),
		perPage: response.per_page && Number(response.per_page),
		total: response.total && Number(response.total),
		data: response.data && Array(...response.data),
	};
	return paginationResponse;
};