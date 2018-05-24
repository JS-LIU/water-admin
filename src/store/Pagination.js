import {observable, computed,action,autorun} from "mobx";

class Pagination{
    constructor(size){
        this.size = size;
    }
    setTotal(total){
        this._total = total;
    }
    nextPage(){
        this._page+=1;
    }
    @observable _total = 1;
    @computed get total(){
        return this._total;
    }
    setPage(page){
        this._page = page - 1;
    }
    @observable _page = 1;
    @computed get info(){
        return {
            page:this._page,
            size:this.size
        }
    }
}
module.exports = Pagination;