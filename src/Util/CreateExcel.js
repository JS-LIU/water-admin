/**
 * Created by LDQ on 2018/8/10
 */
class CreateExcel{
    constructor(){
        this.title = "报表.xls";
    }
    setTitle(title){
        this.title = title + "xls";
    }
    downLoad(response){
        let blob = new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, this.title);
        } else {
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = this.title;
            link.click();
            window.URL.revokeObjectURL(link.href);
        }
    }

}
module.exports = new CreateExcel();