export const Pagination = function(response) {	
	return {
		page: response.page && Number(response.page),
		perPage: response.per_page && Number(response.per_page),
		total: response.total && Number(response.total),
		data: response.total && Array(...response.total),
	};
};