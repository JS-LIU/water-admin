/**
 * Created by LDQ on 2018/5/29
 */
import {observable, computed, action, autorun} from "mobx";
import {actions,data} from './merchantSearchInterface';

autorun(()=>{
    console.log("list:",data.list);
    // console.log('detail:',data.detail);
    // console.log('active:',data.activeMerchant);
});
// actions.onLoad();
// actions.selectRejectList();