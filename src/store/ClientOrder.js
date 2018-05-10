class ClientOrder {
    constructor(orderInfo){
        this.orderId = orderInfo.orderId;
        this.orderNo = orderInfo.orderNo;
        this.orderSrc = orderInfo.orderSrc;
        this.createTime = orderInfo.createTime;
        this.productItems = orderInfo.productItems;
    }

}
module.exports = ClientOrder;