/**
 * Created by LDQ on 2018/9/17
 */
class ReceiveWaterTicketItem{
    constructor(info){
        this.acceptRecordId = info.acceptRecordId;
        this.acceptTime = info.acceptTime;
        this.acceptWay = info.acceptWay;
        this.invterUserName = info.invterUserName;
        this.nickName = info.nickName;
        this.phoneNum = info.phoneNum;
        this.use = info.use?1:0;
    }

}
module.exports = ReceiveWaterTicketItem;