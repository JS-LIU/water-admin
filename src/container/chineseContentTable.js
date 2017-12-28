/**
 * Created by LDQ on 2017/12/27
 */

var table = {
    create:"未支付",
    waiting_dispatch:"待指派",
    delivery:"待收货",
    finish:"未评价",
    finish_comment:"已评价",
    WeixinPay:"微信客户端支付",
    AlipayClient:"支付宝",
    phoneNum:"用户电话",
    orderNo:"订单号码",
    shopName:"商店名称",
    orderStatus:"订单状态",
    payWay:"支付方式",
    CardTicket:"水票支付",
    WeixinJSPay:"公众号微信支付"

};

export default function toChinese(key){
    let value = table[key];
    if (value){
        return table[key]
    }else{
        return key;
    }
}
