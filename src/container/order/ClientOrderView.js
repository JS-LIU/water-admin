/**
 * Created by LDQ on 2018/4/28
 */

import React, {Component} from 'react';
import { Table, Tooltip , Button , Radio , Input , Cascader  } from 'antd';
const Search = Input.Search;
import {observer,inject} from 'mobx-react';
// import OrderView from './OrderView';
// import clientOrderHeaderStyle from './css/clientOrderHeaderStyle.css';
// import clientOrderStyle from './css/orderStyle.css';
import huipayTableStyle from '../../Util/huipayAdminStyle/huipayTableStyle.css';
import {data,actions} from '../../store/order/clientOrderListInterface';


@observer class ClientOrderView extends Component{
    componentWillMount(){
        actions.onLoad();
    }
    render(){
        return(
            <div>
                <ClientOrderListContainerView/>
                <div className='client_order_bottom'>
                    <ClientOrderDetailView />
                    <DeliveryMerchantListView />
                </div>
            </div>
        )
    }
}

@observer class ClientOrderListContainerView extends Component{
    componentWillMount(){
    }
    render(){
        return(
            <div>
                <ClientOrderListQueryView />
                <ClientOrderListView />
            </div>
        )
    }
}


//  搜索
class ClientOrderListQueryView extends Component{
    state = { queryType: 0 };
    onChange(e){
        this.setState({ queryType: e.target.value });
        actions.selectQueryType(e.target.value);
    }
    render(){
        const { queryType } = this.state;
        return (
            <div>
                <div className="search_box">
                    <Search
                        placeholder="输入订单号"
                        onSearch={value => {
                            actions.setQueryInfo({orderNo:value});
                            actions.queryByQueryInfo();
                        }}
                        enterButton
                        style={{ marginBottom: 16 }}
                    />
                </div>
                <Radio.Group value={queryType} onChange={this.onChange.bind(this)} style={{ marginBottom: 16 }} >
                    <Radio.Button value={0}>全部</Radio.Button>
                    <Radio.Button value={1}>待派单</Radio.Button>
                    <Radio.Button value={2}>待配送</Radio.Button>
                </Radio.Group>
            </div>

        )
    }
}


@observer class ClientOrderListView extends Component{
    changePage(pageNumber){
        actions.changePagination(pageNumber);
    }
    render(){
        const columns = [{
            title:'订单时间',
            dataIndex:"createTime",
            key:"createTime",
            width:200
        },{
            title:'订单号',
            dataIndex:"orderNo",
            key:"orderNo",
            width:200
        },{
            title:'用户账号',
            dataIndex:"userInfo",
            key:"userInfo",
            width:200
        },{
            title:'收货人-收货电话',
            dataIndex:"receiver",
            key:"receiver",
            width:200,
            render: (text,record) =>{return (<Tooltip placement="topLeft" title={record.receiver}>
                <div className="overflow_to_ellipsis">{record.receiver}</div>
            </Tooltip>)}
        },{
            title:'收货地址',
            dataIndex:"deliveryAddress",
            key:"deliveryAddress",
            width:500
        },{
            title:'实付金额',
            dataIndex:"totalPrice",
            key:"totalPrice",
            width:100
        },{
            title:'订单状态',
            dataIndex:"orderStatus",
            key:"orderStatus",
            width:100
        },{
            title: '配送商家',
            key: 'operator',
            width: 200,
            dataIndex:"deliveryShop",
            render: (text,record) =>{return ( <a href="javascript:;">{record.deliveryShop.shopName}</a>)}
        }];
        const dataSource = [];
        for(let i = 0;i < data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
                createTime:item.createTime,
                orderNo:item.orderNo,
                userInfo:item.userInfo,
                receiver:item.receiver,
                deliveryAddress:item.deliveryAddress,
                totalPrice:item.totalPrice,
                orderStatus:item.orderStatus,
                productItems:item.productItems,
                orderId:item.orderId,
                deliveryShop:item.deliveryShop,
            })
        }
        const expandedRowRender = record => {
            const columns = [
                { title: "商品类型", dataIndex: "type" , key: 'type'},
                { title: '商品品牌', dataIndex: "name", key: 'name' },
                { title: "商品种类", dataIndex: "volume" , key: 'volume'},
                { title: '商品数量', dataIndex: 'count', key: 'count' },
                { title: '商品单价', dataIndex: 'price', key:'price'}
            ];
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
        return (
            <Table
                className="components-table-demo-nested"
                columns={columns}
                expandedRowRender={expandedRowRender}
                dataSource={dataSource}
                scroll={{x: 1650,y:300}}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            actions.selectOrder(record.orderId);
                        },
                    };
                }}
                pagination={{defaultCurrent:1,onChange:this.changePage.bind(this)}}
            />
        )
    }
}

//  订单详情
@observer class ClientOrderDetailView extends Component{
    render() {
        let productItemNodes = data.detail.productItemModels.map((productItem,i)=>{
            return (
                <li key={i} className='list_border name'>
                    <dl>
                        <dd>商品名称</dd>
                        <dd>{productItem.name}</dd>
                        <dd>{productItem.productType }</dd>
                    </dl>
                    <dl>
                        <dd>规格</dd>
                        <dd>{productItem.volume}</dd>
                    </dl>
                    <dl>
                        <dd>单价</dd>
                        <dd>{productItem.currentPrice /100}</dd>
                    </dl>
                    {/*<div>*/}
                        {/*<dd>立减</dd>*/}
                        {/*<dd>{productItem.payRelatedRmb||0 }</dd>*/}
                    {/*</div>*/}
                    <dl>
                        <dd>数量</dd>
                        <dd>{productItem.selectCount }</dd>
                    </dl>
                </li>
            )
        });
        return (
            <div className='order_detail'>
                <div className='order_detail_header'>
                    <span className="pai">订单详情</span>
                </div>
                <ul className='order_detail_left'>
                    <li className='list_border'>
                        <span>订单号：{data.detail.orderNo}</span>
                        <span className="send_orders">订单时间：{data.detail.createTime}</span>
                    </li>
                    <li className='list_border'>
                        <div> 收货人：{data.detail.deliveryAddressModel.name} </div>
                        <div>收获地址：{data.detail.deliveryAddressModel.address.fullAddress}</div>
                    </li>
                    <li>
                        <ul>
                            {productItemNodes}
                        </ul>

                        {/*<div className='order_detail_shop'>*/}
                            {/*<span>商品名称:{data.detail.name}</span>*/}
                            {/*<span>规格</span>*/}
                            {/*<span>单价</span>*/}
                            {/*<span>数量</span>*/}
                        {/*</div>*/}
                        <div className='order_detail_shop'>
                            {/*<span>{orderDetail.productItems.name}</span>*/}
                            {/*<span>{orderDetail.productItems.colume}</span>*/}
                            {/*<span>{orderDetail.productItems.price}</span>*/}
                            {/*<span>{orderDetail.productItems.count}</span>*/}
                        </div>
                    </li>
                    <li className='shop_price_container'>
                        <ul>
                            {/*{productItemNodes}*/}
                        </ul>

                        <div className='shop_price'>
                            <span>商品金额：</span>
                            <span className='money '>￥{data.detail.totalPayRmb/100}</span>
                        </div>
                        <div className='shop_price'>
                            <span>水票（使用{data.detail.useWaterTicket}张）</span>
                            <span>-{data.detail.useWaterTicketRmb/100}</span>
                        </div>
                        <div className='shop_price'>
                            <span>优惠券（未使用）：</span>
                            <span>-0.00</span>
                        </div>
                        <div className='shop_price'>
                            <span>立减：</span>
                            <span>-0.00</span>
                        </div>
                        <div className='shop_price'>
                            <span>运费：</span>
                            <span>-0.00</span>
                        </div>
                        <div className='shop_price'>
                            <span>实付金额：</span>
                            <span className='money '>￥{data.detail.totalPayRmb/100}</span>
                        </div>
                        <div className='shop_price'>
                            <span>付款方式：</span>
                            <span>{data.detail.payChannel }</span>
                        </div>
                        <div className='remark'>
                            <span>备注：</span>
                            <textarea name="" id="" cols="40" rows="3" placeholder="填写"></textarea>
                            {/*<div className='print_order'>*/}
                                {/*<button>打印订单</button>*/}
                            {/*</div>*/}
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
                <div className='order_detail_header send'>
                    <span className="pai">派单</span>
                    <span className="search_site">
                       <Input placeholder="输入水站名称" />
                        <Button className="search_site_btn">搜索水站</Button>
                    </span>
                </div>
                <div className="order_detail_right">
                    <MerchantListView/>
                </div>
            </div>
        )
    }
}

@observer class MerchantListView extends Component{
    render(){
        const columns = [
            {
                title:"配送商家",
                dataIndex:"shopName",
                key:"shopName"
            },{
                title:"电话",
                dataIndex:"shopTelephone",
                key:"shopTelephone"
            },{
                title:"地址",
                dataIndex:"shopAddress",
                key:"shopAddress"
            },{
                title:"距离",
                dataIndex:"distance",
                key:"distance"
            },{
                title:"商家类型",
                dataIndex:"type",
                key:"type"
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
                shopTelephone:item.shopTelephone,
                shopAddress:item.shopAddress,
                distance:item.distance,
                type:item.type,
                merchantId:item.shopId
            })
        }

        return(
            <Table
                columns={columns}
                dataSource={dataSource}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            actions.dispatchOrder(record.merchantId);
                        },
                    };
                }}
            />
        )
    }
}

module.exports = ClientOrderView;