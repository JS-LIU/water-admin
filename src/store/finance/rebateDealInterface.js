/**
 * Created by LDQ on 2018/6/6
 */


import {observable, computed, action, autorun} from "mobx";
let rebateDealListData = {
    @observable list:[]
};

let actions = {
    onLoad:{},
    selectOrder:{}
};



function rebateDealListActions(){
    actions.onLoad = function(){

    };

    actions.selectOrder = function(){

    };
    return actions;
}