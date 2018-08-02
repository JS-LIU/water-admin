
import MerchantOrder from "./MerchantOrder";
import AdminList from '../AdminList';
import _h from "../../Util/HB";
import exportsExcel from '../ExportsExcel';


class MerchantOrderList extends AdminList{

    constructor(){
        super();
        this.orderType = "merchant_src";
        let orderListAjax = _h.ajax.resource('/admin/order/:action');

        this._getWaitingDispatchOrderList = function(postInfo){
            return orderListAjax.save({action:'waitingdispathlist'}, postInfo)
        };
        this.queryType = 0;
        this.orderStatus = ['create','delivery',"waiting_dispatch",'finish','finish_comment'];//    create,delivery,finish,finish_comment
        this._getOrderList = function(postInfo){
            return orderListAjax.save({action:"list"},postInfo);
        };

        let exportsAjax = _h.ajax.resource('/admin/exportShopOrder');
        this._getExcel = function(data){
            return exportsAjax.exportExcel({},data);
        }
    }
    selectQueryType(typeNum){
        this.queryType = typeNum;
    }
    setOrderStatus(statusList){
        this.orderStatus = statusList;
    }
    getWaitingDispatchOrderList(){
        let queryMsg = Object.assign({},this.queryMsg,{queryType:this.queryType},{orderSrc: this.orderType});
        let reqMsg = {queryInfoMsg:queryMsg};
        return this.getList(reqMsg,this._getWaitingDispatchOrderList,MerchantOrder);
    }
    getOrderList(){
        let queryMsg = Object.assign({},this.queryMsg,{orderStatus:this.orderStatus},{orderSrc: this.orderType});
        let reqMsg = {queryInfoMsg:queryMsg};
        return this.getList(reqMsg,this._getOrderList,MerchantOrder);
    }

    getExcel(){
        function str2ab(str) {
            var buf = new ArrayBuffer(str.length*2); // 每个字符占用2个字节
            var bufView = new Uint16Array(buf);
            for (var i=0, strLen=str.length; i<strLen; i++) {
                bufView[i] = str.charCodeAt(i);
            }
            return buf;
        }
        let queryMsg = Object.assign({},this.queryMsg,{orderStatus:this.orderStatus},{orderSrc: this.orderType});
        let reqMsg = {queryInfoMsg:queryMsg};
        // return Object.assign(reqMsg,this.pagination.getInfo());
        let postInfo = Object.assign(reqMsg,this.pagination.getInfo());

        var xhr = new XMLHttpRequest();
        xhr.open('post', '/huibeiwater/admin/exportShopOrder');
        //设置请求的类型及url
        //post请求一定要添加请求头才行不然会报错
        xhr.setRequestHeader("Content-type","application/json; charset=utf-8");

        xhr.responseType = 'arraybuffer';
        //发送请求
        xhr.send(JSON.stringify(postInfo));
        xhr.onreadystatechange = function () {
            // 这步为判断服务器是否正确响应
            if (xhr.readyState === 4 && xhr.status === 200) {
                let ab = xhr.response;
                let blob = new Blob([ab], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, "订单流水.xls");
                } else {
                    let link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "订单流水.xls";
                    link.click();
                    window.URL.revokeObjectURL(link.href);
                }
            }
        };
    }

}
module.exports = new MerchantOrderList();