/**
 * Created by LDQ on 2018/1/24
 */
import React, {Component} from 'react'
import {observable, computed,action,autorun} from "mobx";
import _h from '../Util/HB';
import Pagination from "./Pagination";
import tableBuilder from "./tableBuilder";
import AuditOperationBtnView from '../container/AuditOperationBtnView';
import ShowAuditView from '../container/ShowAuditView';
class OpenShopContainer{
    constructor(){
        let auditAjax = _h.ajax.resource('/admin/merchant/:action');

        this._getAuditList = function (postInfo) {
            return auditAjax.save({action:'getWaitingPermissionList'}, postInfo)
        };
        this._setRemark = function(postInfo){
            return auditAjax.save({action:"setShopArtificialInfo"},postInfo);
        };
        this._allowAudit = function(postInfo){
            return auditAjax.save({action:"passStatus"},postInfo)
        };

        this._pagination = new Pagination(10);
        this.queryInfoMsg = {};
        this.columnConfig = {
            name:"水站名称",
            deliverTime:"配送时间",
            merchantType:"审核类型",
            administratorName:"管理员姓名",
            administratorNum:"管理员电话",
        };
    }

    @observable _auditInfo = {content:[]};

    @observable _pagination;
    @observable _loading = false;
    @observable _customerName = "";
    @observable _customerCode = "";
    @observable _isCooperation = true;
    @computed get pagination(){
        return this._pagination;
    }
    @computed get columns (){
        return tableBuilder.convertToColumns(this.columnConfig,(list)=>{
            list.push({
                key: 'auditImg',
                title: '资质证件',
                dataIndex: "auditImg",
                width: 150,
                fixed:"right"
            });
            list.push({
                key: 'operation',
                title: '审核状态',
                dataIndex: "operation",
                width: 150,
                fixed:"right"
            })
        });
    }
    @computed get dataSource(){
        return tableBuilder.convertToSource(this._auditInfo.content,(item)=>{
            item.auditImg = (()=>{
                return <ShowAuditView auditItem={item}/>
            })();
            item.operation = (()=>{
                return <AuditOperationBtnView auditItem={item}/>
            })()
        });
    }

    /**
     * 审核列表
     * @param pageNumber
     */
    @action getAuditList(pageNumber = 1){
        this._pagination.setPage(pageNumber);
        let msg = this.queryInfoMsg;
        let postInfo = Object.assign(this.pagination.info,{
            queryInfoMsg:msg
        });
        this._loading = true;
        this._getAuditList(this.pagination.info).then((info)=>{
            this._auditInfo = info;
            this._pagination.setTotal(info.totalElements);
            this._loading = false;
        }).catch(()=>{
            this._loading = true;
        });
    }

    @action setCustomerName(name){
        this._customerName = name;
    }
    @action setCustomerCode(code){
        this._customerCode = code;
    }
    @action setCooperation(isCooperation){
        this._isCooperation = isCooperation;
    }
    @action setRemark(shopId){
        let postInfo = {
            shopId:shopId,
            shopArtificialNum:this._customerName,
            shopAlias:this._customerCode,
            collaborate:this._isCooperation
        };
        this._setRemark(postInfo)
    }

    /**
     * 通过审核
     * @param merchantId
     */
    @action allowAudit(auditItem){
        this._loading = true;
        this._allowAudit({id:auditItem.id}).then(()=>{
            let msg = this.queryInfoMsg;
            let postInfo = Object.assign(this.pagination.info,{
                queryInfoMsg:msg
            });
            this._getAuditList(this.pagination.info).then((info)=>{
                this._auditInfo = info;
                this._pagination.setTotal(info.totalElements);
                this._loading = false;
            });

        }).catch(()=>{
            this._loading = false;
            alert("找你强哥解决一下");
        })
    }
    @computed get loading(){
        return this._loading;
    }

}
module.exports = OpenShopContainer;