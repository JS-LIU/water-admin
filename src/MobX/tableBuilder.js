/**
 * Created by LDQ on 2017/12/18
 */


const tableBuilder = {
    convertToColumns:function (obj,func = function(){}){
        let columns = [];
        for(let prop in obj){
            if (obj.hasOwnProperty(prop)) {
                let column = {
                    key: prop,
                    title: obj[prop]||prop,
                    dataIndex: prop
                };
                columns.push(column);
            }
        }
        func(columns);
        return columns;
    },
    convertToSource:function (arr,func = function(){}){
        let dataSource = [];
        for(let i = 0;i < arr.length;i++){
            func(arr[i]);
            dataSource.push(Object.assign({},arr[i],{
                key:i
            }));
        }
        return dataSource;
    }
};
module.exports = tableBuilder;


