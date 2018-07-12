import React, {Component} from 'react';
import { Input , Table, Icon , Radio ,Tabs} from 'antd';
const Search = Input.Search;
const TabPane = Tabs.TabPane;
import {observer,inject}from "mobx-react/index";
import {data,actions} from '../../store/finance/volumeOfTransactionSearchInterface';
import volumeOfTransaction from './css/VolumeOfTransactionStyle.css'

@observer class VolumeOfTransactionView extends Component{
    componentWillMount(){
        // actions.selectQueryInfo();
        actions.onLoad();
    }
    render(){
        return(
            <div>
                {/*<BarginSummarizeView />*/}
                <ChengJiaoView />

                {/*<Tabs defaultActiveKey="1">*/}
                {/*<TabPane tab="批发订单" key="1">*/}
                {/*<WholesaleOrder />*/}
                {/*</TabPane>*/}
                {/*<TabPane tab="自营订单" key="2">*/}
                {/*<SelfsupportOrder />*/}
                {/*</TabPane>*/}
                {/*<TabPane tab="水站订单" key="3">*/}
                {/*<WaterStationOrder />*/}
                {/*</TabPane>*/}
                {/*</Tabs>*/}

                {/*<WholesaleOrder />*/}
                {/*<SelfsupportOrder />*/}
                {/*<WaterStationOrder />*/}
            </div>
        )
    }
}

@observer class ChengJiaoView extends Component{
    componentWillMount(){
    }
    render(){
        return(
            <div>
                <TransactionInquireView />
                <BarginSummarizeView />
                <WholesaleOrder />
            </div>
        )
    }
}

//搜索区域
@observer class TransactionInquireView extends Component{
    state = { orderSrc: "merchant_src"};
    onChange(e){
        this.setState({ orderSrc: e.target.value });
        actions.setOrderSrc(e.target.value);
        actions.queryListByQueryInfo();
    }
    render(){
        const { orderSrc } = this.state;
        return(
            <div>
                <div>
                    <span>
                        <Search
                            placeholder="输入订单号"
                            onSearch={value => {
                                actions.selectQueryInfo({orderNo:value});
                                actions.queryListByQueryInfo();
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </span>
                </div>
                <Radio.Group value={orderSrc} onChange={this.onChange.bind(this)} style={{ marginBottom: 16 }} >
                    <Radio.Button value={"merchant_src"}>批发订单</Radio.Button>
                    <Radio.Button value={"self_src"}>自营订单</Radio.Button>
                    <Radio.Button value={"client_src"}>水站订单</Radio.Button>
                </Radio.Group>
            </div>
        )
    }
}

//交易总结
@observer class BarginSummarizeView extends Component{
    render(){
        return(
            <div>
                <ul className="bargin_summarize">
                    <li>
                        <h3>成交总金额</h3>
                        <p>
                            <span className="tatal_money">{parseInt(data.volumeOfTransactionData.turnoverTotal / 100)}</span>
                            <span className="unit">元</span>
                        </p>
                    </li>
                    <li>
                        <h3>喜腾山泉批发</h3>
                        <p>
                            <span>{parseInt(data.volumeOfTransactionData.bucketWaterTotal / 100)}</span>
                            <span className="unit">桶</span>
                            <span>{parseInt(data.volumeOfTransactionData.rmbWaterTotal / 100)}</span>
                            <span className="unit">元</span>
                        </p>
                    </li>
                    <li>
                        <h3>商家端成交</h3>
                        <p>
                            <span>{parseInt(data.volumeOfTransactionData.merchantRmbTotal / 100)}</span>
                            <span className="unit">元</span>
                        </p>
                    </li>
                    <li>
                        <h3>用户端成交</h3>
                        <p>
                            <span>{parseInt(data.volumeOfTransactionData.clientRmbTotal / 100)}</span>
                            <span className="unit">元</span>
                        </p>
                    </li>
                </ul>
            </div>
        )

    }
}

//批发订单
@observer class WholesaleOrder extends Component{
    changePage(){

    }
    render(){
        const columns = [{
            title: '订单时间',
            dataIndex: 'payTime',
            key: 'payTime',
        }, {
            title: '订单号',
            dataIndex: 'orderNo',
            key: 'orderNo',
        }, {
            title: '订货商家',
            dataIndex: 'shopName',
            key: 'shopName',
        }, {
            title: '商家编号',
            dataIndex: 'shopNumber',
            key: 'shopNumber',
        },{
            title: '区域',
            dataIndex: 'city',
            key: 'city',
        }, {
            title: '实付金额',
            dataIndex: 'payRelatedRmb',
            key: 'payRelatedRmb',
        },{
            title: '支付方式',
            dataIndex: 'payWay',
            key: 'payWay',
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        }];

        const dataSource = [];
        for(let i = 0;i < data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
                payTime:item.payTime,
                orderNo:item.orderNo,
                shopName:item.shopName,
                shopNumber:item.shopNumber,
                city:item.city,
                name:item.name,
                volume:item.volume,
                productType:item.productType,
                originalPrice:item.originalPrice/100,
                selectCount:item.selectCount,
                payRelatedRmb:item.payRelatedRmb/100,
                payWay:item.payWay,
                productItemModels:item.productItemModels,
                remark:item.remark,
            });

        }

        //级联
        const expandedRowRender = record => {
            const columns = [
                { title: "商品名称", dataIndex: "name" , key: 'name'},
                { title: '商品规格', dataIndex: "volume", key: 'volume' },
                { title: '商品类型', dataIndex: "productType", key: 'productType' },
                { title: '单价', dataIndex: "originalPrice", key: 'originalPrice' },
                { title: '数量', dataIndex: "selectCount", key: 'selectCount' },

            ];
            const dataSource = [];
            for(let i = 0;i < record.productItemModels.length;i++){
                let item = record.productItemModels[i];
                dataSource.push({
                    key:i,
                    name:item.name,
                    volume:item.volume,
                    productType:item.productType,
                    originalPrice:item.originalPrice/100,
                    selectCount:item.selectCount,
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
            <div>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    expandedRowRender={expandedRowRender}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                actions.queryListByQueryInfo(record.orderId);
                            },
                        };
                    }}
                    pagination={{defaultCurrent:data.pagination.page+1,onChange:this.changePage.bind(this),total:data.pagination.total}}
                />
            </div>
        )
    }
}

//自营订单
// @observer class SelfsupportOrder extends Component{
//     render(){
//         const columns = [{
//             title: '订单时间',
//             dataIndex: 'payTime',
//             key: 'payTime',
//         }, {
//             title: '订单号',
//             dataIndex: 'orderNo',
//             key: 'orderNo',
//         }, {
//             title: '用户账号',
//             dataIndex: 'userMobile',
//             key: 'userMobile',
//         }, {
//             title: '联系电话',
//             dataIndex: 'shopPhone',
//             key: 'shopPhone',
//         },{
//             title: '区域',
//             dataIndex: 'city',
//             key: 'city',
//         },{
//             title: '配送商家',
//             dataIndex: 'shopName',
//             key: 'shopName',
//         },{
//             title: '商家编号',
//             dataIndex: 'shopNumber',
//             key: 'shopNumber',
//         }, {
//             title: '水票',
//             dataIndex: 'ticketUseNum',
//             key: 'ticketUseNum',
//         },{
//             title: '优惠券',
//             dataIndex: 'yhq',
//             key: 'yhq',
//         },{
//             title: '立减（每桶）',
//             dataIndex: 'lj',
//             key: 'lj',
//         },{
//             title: '运费',
//             dataIndex: 'yf',
//             key: 'yf',
//         },{
//             title: '实付金额',
//             dataIndex: 'payRelatedRmb',
//             key: 'payRelatedRmb',
//         },{
//             title: '支付方式',
//             dataIndex: 'payWay',
//             key: 'payWay',
//         }, {
//             title: '备注',
//             dataIndex: 'remark',
//             key: 'remark',
//         }];
//
//         const dataSource = [];
//         for(let i = 0;i < data.list.length;i++){
//             let item = data.list[i];
//             dataSource.push({
//                 key:i,
//                 payTime:item.payTime,
//                 orderNo:item.orderNo,
//                 userMobile:item.userMobile,
//                 shopPhone:item.shopPhone,
//                 city:item.city,
//                 shopName:item.shopName,
//                 shopNumber:item.shopNumber,
//                 payRelatedRmb:item.payRelatedRmb/100,
//                 payWay:item.payWay,
//                 remark:item.remark,
//             });
//
//         }
//
//         //级联
//         const expandedRowRender = record => {
//             const columns = [
//                 { title: "商品名称", dataIndex: "name" , key: 'name'},
//                 { title: '商品规格', dataIndex: "volume", key: 'volume' },
//                 { title: '商品类型', dataIndex: "productType", key: 'productType' },
//                 { title: '单价', dataIndex: "originalPrice", key: 'originalPrice' },
//                 { title: '数量', dataIndex: "selectCount", key: 'selectCount' },
//                 {title: '商品金额', dataIndex: "currentPrice", key: 'currentPrice' },
//                 {title: '促销', dataIndex: "promotionActivityInfo", key: 'promotionActivityInfo' },
//
//             ];
//             const dataSource = [];
//             for(let i = 0;i < record.productItemModels.length;i++){
//                 let item = record.productItemModels[i];
//                 dataSource.push({
//                     key:i,
//                     name:item.name,
//                     volume:item.volume,
//                     productType:item.productType,
//                     originalPrice:item.originalPrice/100,
//                     selectCount:item.selectCount,
//                     currentPrice:item.currentPrice,
//                     promotionActivityInfo:item.promotionActivityInfo,
//
//                 })
//             }
//
//             return (
//                 <Table
//                     columns={columns}
//                     dataSource={dataSource}
//                     pagination={false}
//                 />
//             );
//         };
//
//         return(
//             <div>
//                 <Table
//                     columns={columns}
//                     dataSource={dataSource}
//                     expandedRowRender={expandedRowRender}
//                     onRow={(record) => {
//                         return {
//                             onClick: () => {
//                                 actions.selectOrder(record.orderId);
//                             },
//                         };
//                     }}
//                 />
//             </div>
//         )
//     }
// }

//水站订单
// @observer class WaterStationOrder extends Component{
//     render(){
//         const columns = [{
//             title: '订单时间',
//             dataIndex: 'payTime',
//             key: 'payTime',
//         }, {
//             title: '订单号',
//             dataIndex: 'orderNo',
//             key: 'orderNo',
//         }, {
//             title: '商家',
//             dataIndex: 'shopName',
//             key: 'shopName',
//         }, {
//             title: '商家编号',
//             dataIndex: 'shopNumber',
//             key: 'shopNumber',
//         },{
//             title: '区域',
//             dataIndex: 'city',
//             key: 'city',
//         },{
//             title: '购买用户账号',
//             dataIndex: 'userMobile',
//             key: 'userMobile',
//         },{
//             title: '联系电话',
//             dataIndex: 'shopPhone',
//             key: 'shopPhone',
//         },
//             //     {
//             //     title: '商品名称',
//             //     dataIndex: 'productItemModels[0].name',
//             //     key: 'name',
//             // },{
//             //     title: '规格',
//             //     dataIndex: 'productItemModels[0].volume',
//             //     key: 'volume',
//             // },{
//             //     title: '分类',
//             //     dataIndex: 'num',
//             //     key: 'num',
//             // },{
//             //     title: '单价（元）',
//             //     dataIndex: 'dj',
//             //     key: 'dj',
//             // },{
//             //     title: '数量',
//             //     dataIndex: 'qq',
//             //     key: 'qq',
//             // },{
//             //     title: '商品金额',
//             //     dataIndex: 'currentPrice',
//             //     key: 'currentPrice',
//             // },{
//             //     title: '促销',
//             //     dataIndex: 'cx',
//             //     key: 'cx',
//             // },
//             {
//                 title: '水票',
//                 dataIndex: 'sp',
//                 key: 'sp',
//             },{
//                 title: '优惠券',
//                 dataIndex: 'yhq',
//                 key: 'yhq',
//             },{
//                 title: '立减（每桶）',
//                 dataIndex: 'lj',
//                 key: 'lj',
//             },{
//                 title: '运费',
//                 dataIndex: 'yf',
//                 key: 'yf',
//             },{
//                 title: '实付金额',
//                 dataIndex: 'payRelatedRmb',
//                 key: 'payRelatedRmb',
//             },{
//                 title: '支付方式',
//                 dataIndex: 'payWay',
//                 key: 'payWay',
//             }, {
//                 title: '备注',
//                 dataIndex: 'remark',
//                 key: 'remark',
//             }];
//
//         const dataSource = [];
//         for(let i = 0;i < data.list.length;i++){
//             let item = data.list[i];
//             dataSource.push({
//                 key:i,
//                 payTime:item.payTime,
//                 orderNo:item.orderNo,
//                 shopName:item.shopName,
//                 shopNumber:item.shopNumber,
//                 city:item.city,
//                 name:item.name,
//                 volume:item.volume,
//                 productType:item.productType,
//                 originalPrice:item.originalPrice/100,
//                 selectCount:item.selectCount,
//                 payRelatedRmb:item.payRelatedRmb/100,
//                 payWay:item.payWay,
//                 productItemModels:item.productItemModels,
//                 remark:item.remark,
//             });
//
//         }
//
//
//         return(
//             <div>
//                 <Table columns={columns} dataSource={data.list} />
//             </div>
//         )
//     }
// }

module.exports = VolumeOfTransactionView;