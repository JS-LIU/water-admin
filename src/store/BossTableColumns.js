/**
 * Created by LDQ on 2018/10/10
 */

import TableColumns from './TableColumns';
class BossTableColumns{
    constructor(columns){
        this.tableColumns = new TableColumns(columns);
        // this.columns =
        this.columns = BossTableColumns.convertToBossTableColumnsItem(this.tableColumns);
    }
    static convertToBossTableColumnsItem(tableColumns){
        let columns = [];
        tableColumns.getColumns().map((item)=>{
            columns.push(new BossTableColumnItem(item));
        });
        return columns;
    }

}