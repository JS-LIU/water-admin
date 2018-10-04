/**
 * Created by LDQ on 2018/9/19
 */
class Active{
    constructor(info){
        this.acceptCount=info.acceptCount ;
        this.activityId=info.activityId ;
        this.activityName=info.activityName ;
        this.activityTime=info.activityTime ;
        this.status=info.status ;
        this.ticketIndate=info.ticketIndate ;
        this.totalCount=info.totalCount ;
        this.useCount = info.useCount;
    }
}
module.exports = Active;