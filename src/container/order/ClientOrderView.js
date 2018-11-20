/**
 * Created by LDQ on 2018/4/28
 */

import React, {Component} from 'react';
import {Table, Tooltip, Button, Radio, Input, Cascader, Icon, Form} from 'antd';
import LockLineView from '../../components/LockLineView';
import ClearSuffixInput from "../../components/ClearSuffixInput";
import RadioQueryTabList from "../../components/RadioQueryTabList";
const FormItem = Form.Item;


import {observer,inject} from 'mobx-react';
import {data,actions} from '../../store/order/clientOrderListInterface';
import orderStyle from './css/orderStyle.css';
import huipayTableStyle from '../../Util/huipayAdminStyle/huipayTableStyle.css';

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
                    {data.activeOrder.orderStatus === '待指派'?<DeliveryMerchantListView />:""}

                </div>
            </div>
        )
    }
}

@observer class ClientOrderListContainerView extends Component{
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
    state = {
        loading: false,
        // orderType:'all'
    };

    enterLoading = () => {
        this.setState({ loading: true });
        actions.queryByQueryInfo(()=>{this.setState({
            loading: false
        })});
    };
    render(){
        return (
            <Form layout="inline">
                <FormItem label={"订单号"}>
                    <ClearSuffixInput
                        changeHandle={(orderNo)=>actions.setQueryInfo({orderNo:orderNo})}
                        clearHandle={()=>actions.setQueryInfo({orderNo:null})}
                        placeholder="请输入订单号"
                    />
                </FormItem>
                <FormItem label={"手机号"}>
                    <ClearSuffixInput
                        changeHandle={(phoneNum)=>actions.setQueryInfo({phoneNum:phoneNum})}
                        clearHandle={()=>actions.setQueryInfo({phoneNum:null})}
                        placeholder="请输入手机号"
                    />
                </FormItem>
                <FormItem label={"订单状态"}>
                    <RadioQueryTabList
                        defaultValue={'0'}
                        changeHandle={targetValue => actions.selectQueryType(targetValue)}
                        radioList={[
                            {key:"0",name:"全部"},
                            {key:"1",name:"待派单"},
                            {key:"2",name:"待配送"}]}
                    />
                </FormItem>

                <FormItem>
                    <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
                        查询
                    </Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" >重置</Button>
                </FormItem>
                {/*<Button type="primary" icon="reload" onClick={() => actions.queryByQueryInfo()}>点击刷新</Button>*/}
            </Form>

        )
    }
}

class CanFixedLine extends Component{
    state={
        isFixed:false,
        // value:this.props.value
    };
    save(value){
        this.setState({
            // value:value,
            isFixed:false
        });
        if(value !== ""&&value !== this.props.receiver){
            this.props.onFixed(value);
        }

    }
    toFixed(){
        this.setState({
            isFixed:true
        })
    }
    render(){
        const {isFixed} = this.state;
        return (
            <div>
                {isFixed?
                    <Input type="text"  onBlur={e => this.save(e.target.value)}/>:
                    <div onClick={this.toFixed.bind(this)}>{this.props.receiver}</div>
                }
            </div>
        )
    }
}


@observer class ClientOrderListView extends Component{
    state={
        activeLineIndex:-1,
        otherRowClass:"",
    };
    changePage(pageNumber){
        actions.changePagination(pageNumber);
    }
    operateText(deliveryMerchant){
        if(deliveryMerchant.shopId === 1 || deliveryMerchant.shopId === 2){
            return "";
        }else{
            return "立即派单"
        }
    }
    setDeltaSettleDownValue(e){
        actions.setDeltaSettleDownValue(e.target.value)
    }
    getOperate(orderStatus,orderNo){
        if(orderStatus === "待配送"){
            return () => actions.dispatchOrder(orderNo);
        }
    }

    getColumns(){
        if(data.queryType === 0){
            return this.allColumns;
        }else if(data.queryType === 1){
            return this.waitRedirectColumns;
        }else if(data.queryType === 2){
            return this.waitDispatchColumns;
        }

    }
    setClassName(record, index){
        return index === this.state.activeLineIndex?"activeRowStyle":this.state.otherRowClass;
    }
    setActiveLineIndex(index){
        this.setState({
            activeLineIndex:index,
            tableHeight:100
        });
    }
    changeOtherRowClass(lockState){
        if(lockState === "lock"){
            this.setState({
                otherRowClass:"",
            })
        }else{
            this.setState({
                otherRowClass:"hiddenRowStyle",
            })
        }
    }
    render(){
        const baseColumns = [{
            title:'锁定',
            dataIndex:'lock',
            key:'lock',
            width:75,
            render:(text,record)=>{
                return (<LockLineView clickHandle={this.changeOtherRowClass.bind(this)}/>)
            }
        }, {
            title:'付款时间',
            dataIndex:"payTime",
            key:"payTime",
            width:200,
        },{
            title:'订单号',
            dataIndex:"orderNo",
            key:"orderNo",
            width:210
        },{
            title:'结算价',
            dataIndex:"cashSettleDownMount",
            key:"cashSettleDownMount",
            width:80
        },{
            title:'调整价',
            dataIndex:"deltaSettleDownValue",
            key:"deltaSettleDownValue",
            width:80,
            render:(text,record) =>{return (<input style={{ width: '60px' }} onChange={this.setDeltaSettleDownValue.bind(this)}/>)}
        }, {
            title:'实际结算',
            dataIndex:"actualSettleDownMount",
            key:"actualSettleDownMount",
            width:100
        },{
            title:'用户账号',
            dataIndex:"userInfo",
            key:"userInfo",
            width:130
        },{
            title:'收货人-收货电话',
            dataIndex:"receiver",
            key:"receiver",
            width:200,
            render: (text,record) =>{return (<Tooltip placement="topLeft" title={record.receiver}>
                <CanFixedLine receiver={record.receiver} onFixed={actions.fixedPhoneNum}/>
                {/*<div className="overflow_to_ellipsis">{record.receiver}</div>*/}
            </Tooltip>)}
        },{
            title:'收货地址',
            dataIndex:"deliveryAddress",
            key:"deliveryAddress",
            width:500
        },{
            title:'送货商家',
            dataIndex:"shopName",
            key:"shopName",
            width:180
        },{
            title:'实付金额',
            dataIndex:"totalPrice",
            key:"totalPrice",
            width:100
        },{
            title:'创建时间',
            dataIndex:"createTime",
            key:"createTime",
            width:200
        },{
            title:'订单状态',
            dataIndex:"orderStatus",
            key:"orderStatus",
            width:100
        }];
        this.allColumns = [...baseColumns];
        this.allColumns.push({
            title:'操作',
            dataIndex:"operate",
            key:"operate",
            width:100,
            render:(text,record) =>{return (<a href="javascript:void(0)" onClick={this.getOperate(record.orderStatus,record.orderNo)}>{this.operateText(record.deliveryShop)}</a>)}
        });
        this.waitRedirectColumns = [...baseColumns];
        this.waitDispatchColumns = [...baseColumns];
        this.waitDispatchColumns.push({
            title:'操作',
            dataIndex:"operate",
            key:"operate",
            width:100,
            render:(text,record) =>{return (<a href="javascript:void(0)" onClick={() => actions.dispatchOrder(record.orderNo)}>立即配送</a>)}
        });
        const dataSource = [];

        for(let i = 0;i < data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
                payTime:item.payTime,
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
                shopName:item.shopName,
                cashSettleDownMount:item.cashSettleDownMount/100,
                deltaSettleDownValue:item.deltaSettleDownValue/100,
                actualSettleDownMount:item.actualSettleDownMount/100,
            })
        }
        const expandedRowRender = record => {
            const columns = [
                { title: "商品类型", dataIndex: "type" , key: 'type',width:200},
                { title: '商品品牌', dataIndex: "name", key: 'name',width:200},
                { title: "商品种类", dataIndex: "volume" , key: 'volume',width:200},
                { title: '商品数量', dataIndex: 'count', key: 'count',width:200},
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
        let columns = this.getColumns();
        return (
            <Table
                className="components-table-demo-nested"
                columns={columns}
                expandedRowRender={expandedRowRender}
                dataSource={dataSource}
                scroll={{x: 2100,y:300}}
                onRow={(record,index) => {
                    return {
                        onClick: () => {
                            actions.selectOrder(record.orderId);
                            this.setActiveLineIndex(index);
                        }
                    };
                }}
                rowClassName={this.setClassName.bind(this)}
                pagination={{defaultCurrent:data.pagination.page+1,onChange:this.changePage.bind(this),total:data.pagination.total}}
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
                        <span>订单时间：{data.detail.createTime}</span>
                    </li>
                    <li className='list_border'>
                        <div className="consignee">收货人：{data.detail.deliveryAddressModel.name} </div>
                        <div className="consignee">收货地址：{data.detail.deliveryAddressModel.address.fullAddress}</div>
                        <div className="consignee">收货人电话：{data.detail.deliveryAddressModel.phoneNum }</div>
                    </li>
                    <li>
                        <ul>
                            {productItemNodes}
                        </ul>
                    </li>
                    <li className='shop_price_container'>
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
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

@observer class DeliveryMerchantListView extends Component{
    enterLoading = () => {
        this.setState({ loading: true });
        actions.queryNearShop(()=>{this.setState({
            loading: false
        })});
    };
    render(){
        return (
            <div className='order_detail_r ml30'>
                <Form layout="inline">
                    <FormItem label={"水站编号"}>
                        <ClearSuffixInput
                            changeHandle={(shopArtificialNum)=>actions.setNearShopQueryInfo({shopArtificialNum:shopArtificialNum})}
                            clearHandle={()=>actions.setNearShopQueryInfo({shopArtificialNum:null})}
                            placeholder="请输水站编号"
                        />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={()=>actions.resetNearMerchant()}>重置</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.enterLoading}>
                            查询
                        </Button>
                    </FormItem>
                </Form>
                <div className="order_detail_right">
                    <MerchantListView/>
                </div>
            </div>
        )
    }
}

@observer class MerchantListView extends Component{
    state={
        activeLineIndex:-1,
        tableHeight:300,
        otherRowClass:"",
        lockState:"unlock"
    };
    setClassName(record, index){
        return index === this.state.activeLineIndex?"activeRowStyle":this.state.otherRowClass;
    }
    setActiveLineIndex(index){
        this.setState({
            activeLineIndex:index,
            tableHeight:100
        });
    }
    changeOtherRowClass(lockState){
        if(lockState === "lock"){
            this.setState({
                otherRowClass:"",
            })
        }else{
            this.setState({
                otherRowClass:"hiddenRowStyle",
            })
        }
    }
    render(){
        const columns = [
            {
                title:'锁定',
                dataIndex:'lock',
                key:'lock',
                width:75,
                render:(text,record)=>{
                    return (<LockLineView clickHandle={this.changeOtherRowClass.bind(this)}/>)
                }
            },
            {
                title:"商家编号",
                dataIndex:"shopArtificialNum",
                key:"shopArtificialNum",
                width:100
            },
            {
                title:"配送商家",
                dataIndex:"shopName",
                key:"shopName",
                width:130
            },{
                title:"电话",
                dataIndex:"shopTelephone",
                key:"shopTelephone",
                width:100
            },{
                title:"地址",
                dataIndex:"shopAddress",
                key:"shopAddress",
                width:250
            },{
                title:"距离",
                dataIndex:"distance",
                key:"distance",
                width:100
            },{
                title:"商家类型",
                dataIndex:"type",
                key:"type",
                width:100
            },{
                title:"操作",
                dataIndex:"operator",
                key:"operator",
                width:100,
                render: (text, record) => <a href="javascript:;" onClick={()=>actions.redirectOrder(record.merchantId)}>重新指派</a>,
            }
        ];

        const dataSource = [];
        for(let i = 0;i < data.nearStore.length;i++){
            let item = data.nearStore[i];
            dataSource.push({
                key:i,
                shopArtificialNum:item.shopArtificialNum,
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
                pagination={false}
                scroll={{ x: "130%",y:300 }}
                onRow={(record,index) => {
                    return {
                        onClick: () => {
                            this.setActiveLineIndex(index);
                        }
                    };
                }}
                rowClassName={this.setClassName.bind(this)}
                loading={data.hasLoadingNearStore}
            />
        )
    }
}

module.exports = ClientOrderView;