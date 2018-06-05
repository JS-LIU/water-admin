/**
 * Created by LDQ on 2018/4/28
 */

import React, {Component} from 'react';
import { Table, Tooltip , Button , Radio , Input , Pagination , Badge, Menu, Dropdown, Icon } from 'antd';
const Search = Input.Search;
import {observer,inject} from 'mobx-react';
// import OrderView from './OrderView';
import clientOrderHeaderStyle from './css/ClientOrderHeaderStyle.css';
import clientOrderStyle from './css/orderStyle.css';
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
                <div>
                    <Search
                        placeholder="input search text"
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
        this.columns = [{
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
        this.dataSource = [];
        for(let i = 0;i < data.list.length;i++){
            let item = data.list[i];
            this.dataSource.push({
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
                columns={this.columns}
                expandedRowRender={expandedRowRender}
                dataSource={this.dataSource}
                scroll={{x: 1650,y:300}}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            actions.selectOrder(record.orderId);
                        },
                    };
                }}
                pagination={{total:20,defaultCurrent:1,onChange:this.changePage.bind(this)}}
            />
        )
    }
}




//  订单详情
@observer class ClientOrderDetailView extends Component{
    render() {
        return (
            <div className='order_detail'>
                <div className='order_detail_header'>订单详情</div>
                <ul className='order_detail_left'>
                    <li>
                        <span>订单号：{data.activeOrder.orderNo}</span>
                        <span className="send_orders">订单时间：{data.activeOrder.createTime}</span>
                    </li>
                    <li>
                        <div> 收货人：{data.activeOrder.receiver} </div>
                        <div> 收货地址：{data.activeOrder.shopAddress}  </div>
                    </li>
                    <li>
                        <div className='order_detail_shop'>
                            <span>商品名称</span>
                            <span>规格</span>
                            <span>单价</span>
                            <span>数量</span>
                        </div>
                        <div className='order_detail_shop'>
                            {/*<span>{orderDetail.productItems.name}</span>*/}
                            {/*<span>{orderDetail.productItems.colume}</span>*/}
                            {/*<span>{orderDetail.productItems.price}</span>*/}
                            {/*<span>{orderDetail.productItems.count}</span>*/}
                        </div>
                    </li>
                    <li className='shop_price_container'>
                        <div className='shop_price'>
                            <span>商品金额：</span>
                            <span>￥{data.activeOrder.buyAmount}</span>
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
                                <button>打印订单</button>
                            </div>
                            ·                        </div>
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
        let merchantShopNodes = data.nearStore.map((merchantShop,i)=>{
            return (
                <li className='water_site mt20' key={i}>
                    <span>{merchantShop.shopName}</span>
                    <span>{merchantShop.shopAddress}</span>
                    <span>{merchantShop.shopName}</span>
                    <span>{merchantShop.shopTelephone}</span>
                    <span><Button type="primary" >确认订单</Button></span>
                </li>
            )
        });
        return(
            <ul className='delivery_order_fee'>
                <li className='water_site mt20'>
                    <span>选择</span>
                    <span>配送仓库</span>
                    <span>仓库地址</span>
                    <span>配送员</span>
                    <span>配送电话</span>
                    <span>操作</span>
                </li>
                {merchantShopNodes}
            </ul>
        )
    }
}

module.exports = ClientOrderView;