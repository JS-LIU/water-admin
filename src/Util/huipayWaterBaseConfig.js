/**
 * Created by LDQ on 2018/8/9
 */
import _h from "./HB";
let commonAjax = _h.ajax();
commonAjax.setConfig({baseUrl:"/huibeiwater"});
let exportExcelAjax = _h.ajax();
exportExcelAjax.setConfig({baseUrl:"/huibeiwater",responseType:"arraybuffer"});

module.exports = {commonAjax,exportExcelAjax};