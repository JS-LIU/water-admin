/**
 * Created by LDQ on 2017/12/27
 */
import React, {Component} from 'react'
import {observer,inject} from 'mobx-react';
import { Modal, Button,List } from 'antd';

class TextView extends Component{
    constructor(props){
        super(props);

    }
    componentWillMount(){
        let value = this.props.flexValue||"1";
        this.style ={display:"flex",justifyContent:"flex-start", flex:value}
    }
    render(){
        return (
            <div style={this.style}>{this.props.text}</div>
        )
    }
}
@inject(['orderContainer'])
@observer class OrderNoView extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false
        };
        this.data = [];
    }
    componentWillMount(){
        let productItemList = this.props.orderItem.productItems;
        for(let i = 0;i < productItemList.length;i++){
            this.data.push( productItemList[i].name);
        }
    }
    handleCancel(e){
        this.setState({
            visible: false,
        });
    }
    showModal(){
        this.setState({
            visible: true,
        });
    }
    setToTestOrder(orderItem){
        return ()=>{
            // console.log(orderItem);
            this.handleCancel();
            this.props.orderContainer.setToTestOrder(orderItem)
        }
    }
    render(){
        let productNodes = this.props.orderItem.productItems.map((item,index)=>{
            let color = (item.type === "【水票】"?"#E2E2E2":"");
            return (
                <div key={index} style={{display:"flex",justifyContent:"space-around",width:"100%",color:color}}>
                    <TextView text={item.type} />
                    <TextView text={item.name} flexValue="2"/>
                    <TextView text={item.volume} />
                    <TextView text={item.count}/>
                    <TextView text={item.price/100+"元"} />
                </div>
            )
        });
        let btn_style = (this.props.orderItem.status === "待指派"?{color:"#dd7c1e",textDecoration:"underline"}:{color:"#1890ff",textDecoration:"underline"});
        return (
            <div>
                <a
                    onClick={this.showModal.bind(this)}
                    style={btn_style}
                >{this.props.orderItem.orderNo}</a >
                <Modal
                    title={"订单："+this.props.orderItem.orderNo}
                    visible={this.state.visible}
                    onCancel={this.handleCancel.bind(this)}
                    footer={null}>
                    <div>
                        <div style={{display:"flex",justifyContent:"space-around",width:"100%"}}>
                            <TextView text="类型"/>
                            <TextView text="名称" flexValue="2"/>
                            <TextView text="规格" />
                            <TextView text="数量" />
                            <TextView text="单价" />
                        </div>
                        {productNodes}
                        <div style={{marginTop:"1rem",borderTop:"1px solid #E2E2E2",paddingTop:"1rem"}}>
                            <div>总共花费：{this.props.orderItem.totalPrice}元</div>
                            <div>用户电话：{this.props.orderItem.userInfo}</div>
                            <div>收货地址：{this.props.orderItem.deliveryAddress}</div>
                        </div>

                        <a onClick={this.setToTestOrder(this.props.orderItem)}>
                            置为测试订单
                        </a>
                    </div>

                </Modal>
            </div>
        )
    }
}
module.exports = OrderNoView;