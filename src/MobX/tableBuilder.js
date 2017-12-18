/**
 * Created by LDQ on 2017/12/18
 */

import {observable, computed,action,autorun} from 'mobx';


const tableBuilder = {
    convertToColumns:function (obj){
        let columns = [];
        for(let prop in obj){
            if (obj.hasOwnProperty(prop)) {
                let column = {
                    key: prop,
                    title: prop,
                    dataIndex: prop
                };
                columns.push(column);
            }
        }
        return columns;
    },
    convertToSource:function (arr){
        let dataSource = [];
        for(let i = 0;i < arr.length;i++){
            dataSource.push(Object.assign({},arr[i],{
                key:i
            }));
        }
        return dataSource;
    }
};


module.exports = tableBuilder;