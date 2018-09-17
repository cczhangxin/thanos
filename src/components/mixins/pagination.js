export default {
	data() {
		return {
      pagination: {
      	pageSizes: [20, 50, 100],
      	currentPageSize: 20,
      	currentPage: 1,
      	total: 0,
      	layout: "total, sizes, prev, pager, next, jumper"
      }			
		}
	},
	methods: {
    handlePageSizeChange(size) {
    	this.pagination.currentPageSize = size
    },
    handleCurrentPageChange(index) {
      this.pagination.currentPage = index
      this.fetchList(index)
    }    
	}
}