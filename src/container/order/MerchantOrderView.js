/**
 * Created by LDQ on 2018/1/9
 */

import React, {Component} from 'react';
import { Table, Tooltip , Button , Radio , Input } from 'antd';
const Search = Input.Search;
import {observer,inject} from 'mobx-react';
import {data,actions} from '../../store/order/merchantOrderListInterface';
import {observable, computed, action, autorun} from "mobx";

import orderDetail from './css/orderDetail.css';
import merchantAddOrder from './css/merchantAddOrder.css';



@observer class MerchantOrderView extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShow : true
        };
    }
    componentWillMount(){
        actions.onLoad();
    }
    changeShow(newState){
        this.setState(newState);
    }
    render(){
        return(
            <div>
                <MerchantOrderListContainerView isShow={this.state.isShow} onChange={this.changeShow.bind(this)} />
                {this.state.isShow?(<div className='client_order_bottom'>
                    <MerchantOrderDetailView />
                    <DeliveryMerchantListView />
                </div>):<div className='merchant_add_order_bottom'>
                    <AddOrderView/>
                </div>}
            </div>
        )
    }
}

@observer class MerchantOrderListContainerView extends Component{
    constructor(props){
        super(props)

    }
    componentWillMount(){

    }
    render(){
        return(
            <div>
                <MerchantOrderListQueryView isShow={this.props.isShow} onChange={this.props.onChange} />
                <MerchantOrderListView onChange={this.props.onChange} />
            </div>
        )
    }
}

//  搜索
class MerchantOrderListQueryView extends Component{
    constructor(props){
        super(props);
    }
    addOrder(){
        this.props.onChange({
            isShow:!this.props.isShow
        })
    }
    render(){
        return (
            <div>
                <div>
                    订单号：
                    <Search
                        placeholder="请输入订单号"
                        onSearch={value => {
                            actions.setQueryInfo({orderNo:value});
                            actions.queryByQueryInfo();
                        }}
                        enterButton
                        style={{ marginBottom: 16 , width:260 }}
                    />
                    <Button type="primary" className='ml15' onClick={this.addOrder.bind(this)} >+添加订单</Button>
                </div>
            </div>
        )
    }
}

//  list
@observer class MerchantOrderListView extends Component{
    render(){
        const columns = [
            {
                title:"订单时间",
                dataIndex:"createTime",
                key:"createTime",
                width:200
            },{
                title:"订单号",
                dataIndex:"orderNo",
                key:"orderNo",
                width:200
            },{
                title:"商家名称",
                dataIndex:"receiverShopName",
                key:"receiverShopName",
                width:300
            },{
                title:"收货人-电话",
                dataIndex:"receiver",
                key:"receiver",
                width:200
            },{
                title:"电话",
                dataIndex:"userInfo",
                key:"userInfo",
                width:200
            },{
                title:"收货地址",
                dataIndex:"deliveryAddress",
                key:"deliveryAddress",
                width:300
            },{
                title:"商品金额",
                dataIndex:"totalPrice",
                key:"totalPrice",
                width:150
            },{
                title:"订单状态",
                dataIndex:"status",
                key:"status",
                width:100
            },{
                title:"配送仓库",
                dataIndex:"deliveryMerchant",
                key:"deliveryMerchant",
                width:300,
                render: (text,record) =>{return ( <a href="javascript:;">{record.deliveryMerchant.shopName}</a>)}
            }
        ];
        const dataSource =[];
        for(let i = 0 ;i < data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
                receiverShopName:item.receiverShopName+"-"+item.shopArtificialNum+item.shopAlias,
                createTime:item.createTime,
                orderNo:item.orderNo,
                userInfo:item.userInfo,
                receiver:item.receiver,
                deliveryAddress:item.deliveryAddress,
                totalPrice:item.totalPrice,
                status:item.status,
                productItems:item.productItems,
                orderId:item.orderId,
                deliveryMerchant:item.deliveryMerchant,
            })
        }
        const expandedRowRender = (record) => {
            const columns = [ {title: "商品类型", dataIndex: "type" , key: 'type'},
            { title: '商品品牌', dataIndex: "name", key: 'name' },
            { title: "商品种类", dataIndex: "volume" , key: 'volume'},
            { title: '商品数量', dataIndex: 'count', key: 'count' },
            { title: '商品单价', dataIndex: 'price', key:'price'}];
            const dataSource = [];
            for(let i = 0;i < record.productItems.length;i++){
                let item = record.productItems[i];
                dataSource.push({
                    key:i,
                    type:item.type,
                    name:item.name,
                    volume:item.volume,
                    count:item.count,
                    price:item.price / 100
                })
            }

            return (
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
            );
        };

        return(
            <Table
                className="components-table-demo-nested"
                columns={columns}
                dataSource={dataSource}
                expandedRowRender={expandedRowRender}
                scroll={{x: 1950,y:300}}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            actions.selectMerchantOrder(record.orderId);
                            this.props.onChange({
                                isShow:!this.props.isShow
                            })
                        },
                    };
                }}
            />
        )
    }
}

//  订单详情
@observer class MerchantOrderDetailView extends Component{
    render() {
        // console.log(data.detail)
        let productItemNodes = data.detail.productItemModels.map((item,i)=>{
            return (
                <div key={i} className='order_detail_shop'>
                     <span>{item.name}</span>
                     <span>{item.volume}</span>
                     <span>{item.currentPrice}</span>
                     <span>{item.selectCount}</span>
                </div>
            )
        });
        return (
            <div className='order_detail'>
                <div className='order_detail_header'>订单详情</div>
                <ul className='order_detail_left'>
                    <li className='mt20'>
                        <span>订单号：{data.detail.orderNo}</span>
                        <span className="send_orders">订单时间：{data.detail.createTime}</span>
                    </li>
                    <li>
                        <div> 收货人：{data.detail.deliveryAddressModel.name} </div>
                        <div> 收货地址：{data.detail.deliveryAddressModel.address.fullAddress}  </div>
                    </li>
                    <li>
                        <div className='order_detail_shop'>
                            <span>商品名称</span>
                            <span>规格</span>
                            <span>单价</span>
                            <span>数量</span>
                        </div>
                        {productItemNodes}
                    </li>
                    <li className='shop_price_container'>
                        <div className='shop_price'>
                            <span>商品金额：</span>
                            <span>￥{data.detail.buyAmount}</span>
                        </div>
                        <div className='shop_price'>
                            <span>水票（使用0张）：</span>
                            <span>-0.0</span>
                        </div>
                        <div className='shop_price'>
                            <span>优惠券（未使用）：</span>
                            <span>-0.0</span>
                        </div>
                        <div className='shop_price'>
                            <span>立减：</span>
                            <span>-0.0</span>
                        </div>
                        <div className='shop_price'>
                            <span>运费：</span>
                            <span>-0.0</span>
                        </div>
                        <div className='shop_price'>
                            <span>实付金额：</span>
                            <span>-0.0</span>
                        </div>
                        <div className='shop_price'>
                            <span>付款方式：</span>
                            <span>{data.activeOrder.payChannel}</span>
                        </div>
                        <div>
                            <span>备注：</span>
                            <textarea name="" id="" cols="40" rows="3"></textarea>
                            <div className='print_order'>
                                <Button>打印订单</Button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

@observer class DeliveryMerchantListView extends Component{
    render(){
        return (
            <div className='order_detail_r ml30'>
                <div className='order_detail_header'>派单</div>
                <MerchantListView />
            </div>
        )
    }
}

@observer class MerchantListView extends Component{
    render(){
        const columns = [
            {
                title:"配送仓库",
                dataIndex:"shopName",
                key:"shopName"
            },{
                title:"仓库地址",
                dataIndex:"shopAddress",
                key:"shopAddress"
            },{
                title:"配送员",
                dataIndex:"deliveryor",
                key:"deliveryor"
            },{
                title:"配送电话",
                dataIndex:"shopTelephone",
                key:"shopTelephone"
            },{
                title:"操作",
                dataIndex:"operator",
                key:"operator",
                render: () => <a href="javascript:;">确认派单</a>,
            }
        ];

        const dataSource = [];
        for(let i = 0;i < data.nearStore.length;i++){
            let item = data.nearStore[i];
            dataSource.push({
                key:i,
                shopName:item.shopName,
                shopAddress:item.shopAddress,
                deliveryor:item.deliveryor,
                shopTelephone:item.shopTelephone
            })
        }

        return(
            <Table columns={columns} dataSource={dataSource}></Table>
        )
    }
}

//  添加订单
@observer class AddOrderView extends Component{
    render() {
        return (
            <div className='add_order'>
                <div className='order_detail_header'>添加订单</div>
                <div className='add_detail_section'>
                    <div className="add_detail_section_left">
                        <ul>
                            <li>商家编号：<Input placeholder="请选择或输入商家编号" /></li>
                            <li>商家名称：<Input placeholder='请选择或输入商家名称'/></li>
                            <li>收货人：<Input placeholder='请输入收货人姓名'/></li>
                            <li>联系电话：<Input placeholder='请输入收货人电话'/></li>
                            <li>地区：<Input placeholder='请选择或输入商家编号'/></li>
                            <li>详细地址：<Input placeholder='请输入详细地址'/></li>
                            <li>付款方式：<Input placeholder='请选择或输入商家编号'/></li>
                        </ul>
                        <div className='operator'>
                            <Button type="primary">确认添加</Button>
                        </div>
                    </div>
                    <AddOrderShopView/>
                </div>
            </div>
        )
    }
}

@observer class AddOrderShopView extends Component{
    render(){
        const dataSource = [{
            key: '1',
            name: 'chen',
            volume: 20,
            currentPrice: '西湖区湖底公园1号',
            selectCount: '1',
            buyAmount: '1',
            lj: '1',
            sf: '1'
        }];

        const columns = [{
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '规格',
            dataIndex: 'volume',
            key: 'volume',
        }, {
            title: '单价',
            dataIndex: 'currentPrice',
            key: 'currentPrice',
        }, {
            title: '数量',
            dataIndex: 'selectCount',
            key: 'selectCount',
        }, {
            title: '商品金额',
            dataIndex: 'buyAmount',
            key: 'buyAmount',
        }, {
            title: '立减',
            dataIndex: 'lj',
            key: 'lj',
        }, {
            title: '实付金额',
            dataIndex: 'sf',
            key: 'sf',
        }];

        return (
            <div className="add_detail_section_right">
                <div>
                    <Table dataSource={dataSource} columns={columns} />
                </div>
                <ul>
                    <li>
                        <span>商品金额</span>
                        <span>￥</span>
                    </li>
                    <li>
                        <span>水票（使用0张）</span>
                        <span>-0.00</span>
                    </li>
                    <li>
                        <span>优惠券（使用0张）</span>
                        <span>-0.00</span>
                    </li>
                    <li>
                        <span>运费</span>
                        <span>+0.00</span>
                    </li>
                    <li>
                        <span>实付金额</span>
                        <span>￥1280.00</span>
                    </li>
                    <li>
                        添加备注<textarea name="" id="" cols="" rows="2"></textarea>
                    </li>
                    <li className='mt20'>
                        操作人：刘殿麒
                    </li>
                </ul>
            </div>
        )
    }
}


module.exports = MerchantOrderView;