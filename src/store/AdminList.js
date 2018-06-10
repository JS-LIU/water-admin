/**
 * Created by LDQ on 2018/6/7
 */
import _h from '../Util/HB';
import Pagination from './Pagination';
class AdminList {
    constructor(){
        this.queryMsg = {};
        this.pagination = new Pagination(10);
        this.list = [];
    }
    selectQueryInfo(queryMsg){
        this.queryMsg = queryMsg;
    }
    setActiveItem(rebateItem){
        this.activeRebateItem = rebateItem;
    }
    selectQueryMsg(queryMsg){
        this.queryMsg = queryMsg;
    }

    getList(reqMsg,ajax){
        let postInfo = Object.assign(reqMsg,this.pagination.getInfo());
        return new Promise((resolve, reject)=>{
            ajax(postInfo).then((listContainer)=>{
                let list = listContainer.content;
                this.pagination.setTotal(listContainer.totalElements);
                this.list = AdminList.createList(this.list,list);
                resolve(this.list);
            }).catch((err)=>{
                console.log(err);
            })
        })
    }
    getQueryMsg(queryBaseInfo){
        return Object.assign(this.queryMsg,queryBaseInfo);
    }
    static createList(targetList,listData,Item){
        targetList = [];
        for(let i = 0;i < listData.length;i++){
            targetList.push(new Item(listData[i]));
        }
        return targetList;
    }
    findItemByItemId(list,itemId,idKey){
        return list.find((item)=>{
            return item[idKey] === itemId;
        })
    }
    removeItem(list,item,idKey){
        let index = this.findItemIndexByItemId(list,item[idKey],idKey);
        list.splice(index,1);
        return list;
    }
    findItemIndexByItemId(list,ItemId,idKey){
        return list.findIndex((item)=>{
            return item[idKey]=== ItemId;
        })
    }
}
module.exports = AdminList;