/**
 * Created by LDQ on 2018/1/9
 */

import React, {Component} from 'react';
import { Table, Tooltip , Button , Radio , Input } from 'antd';
const Search = Input.Search;
import {observer,inject} from 'mobx-react';
import {data,actions} from '../../store/order/merchantOrderListInterface';

@observer class MerchantOrderView extends Component{
    componentWillMount(){
        actions.onLoad();
    }
    render(){
        return(
            <div>
                <MerchantOrderListContainerView/>
                <div className='client_order_bottom'>
                    {/*<ClientOrderDetailView />*/}
                    {/*<DeliveryMerchantListView />*/}
                </div>
            </div>
        )
    }
}

@observer class MerchantOrderListContainerView extends Component{
    render(){
        return(
            <div>
                {/*<MerchantOrderListQueryView />*/}
                <MerchantOrderListView />
            </div>
        )
    }
}
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
            ></Table>
        )
    }
}

module.exports = MerchantOrderView;