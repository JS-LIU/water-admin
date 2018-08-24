/**
 * Created by LDQ on 2018/8/9
 */
import _h from "./HB";
let commonAjax = _h.ajax();
console.log(commonAjax.config);
commonAjax.config({baseUrl:"/huibeiwater"});
let exportExcelAjax = _h.ajax();
exportExcelAjax.config({baseUrl:"/huibeiwater",responseType:"arraybuffer"});

module.exports = {commonAjax,exportExcelAjax};