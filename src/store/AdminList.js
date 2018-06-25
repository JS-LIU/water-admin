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
    setActiveItem(item){
        this.activeItem = item;
    }
    selectQueryMsg(queryMsg){
        this.queryMsg = queryMsg;
    }

    getList(reqMsg,ajax,listItem){
        let postInfo = Object.assign(reqMsg,this.pagination.getInfo());
        return new Promise((resolve, reject)=>{
            ajax(postInfo).then((listContainer)=>{
                let list = listContainer.content;
                this.pagination.setTotal(listContainer.totalElements);
                this.list = AdminList.createList(this.list,list,listItem);
                resolve(this.list);
            }).catch((err)=>{
                reject(err);
            })
        })
    }
    getQueryMsg(...queryBaseInfo){
        let queryMsg = this.queryMsg;
        queryBaseInfo.map((item)=>{
            queryMsg = Object.assign(queryMsg,item);
        });
        return queryMsg
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