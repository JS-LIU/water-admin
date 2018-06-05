
class Pagination{
    constructor(size){
        this.size = size;
        this.total = 0;
        this.page = 0;
    }
    setTotal(total){
        this.total = total;
    }
    nextPage(){
        this.page += 1;
    }
    setPage(page){
        this.page = page - 1;
    }
    getInfo(){
        return {
            page:this.page,
            size:this.size
        }
    }
}
module.exports = Pagination;