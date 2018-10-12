/**
 * Created by LDQ on 2018/10/10
 */
import ColumnItem from './ColumnItem';
class TableColumns{
    constructor(columns){
        this.columns = TableColumns.createColumns(columns);
    }
    static createColumnItem(item,ColumnItem){
        return new ColumnItem(item);
    }
    static createColumns(columns){
        let columnList = [];
        columns.map(()=>{
            columns.map((item)=>{
                columnList.push(TableColumns.createColumnItem(item,ColumnItem));
            });
        });
        return columnList;
    }
    appendTo(item){
        let columnItem = TableColumns.createColumnItem(item);
        this.columns.push(columnItem);
    }
}
module.exports = TableColumns;