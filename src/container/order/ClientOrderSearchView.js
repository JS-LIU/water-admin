/**
 * Created by LDQ on 2018/6/16
 */
import React, {Component} from 'react';
import { Table, Tooltip , Button , Radio , Input , Cascader  } from 'antd';
const Search = Input.Search;
import {observer,inject} from 'mobx-react';
import {actions,data} from "../../store/order/clientOrderSearchInterface";

@observer class ClientOrderSearchView extends Component{
    state = { queryStrategy: "all" };
    onChange(e){
        this.setState({ queryStrategy: e.target.value });
        actions.selectQueryMsg({});
        actions.searchOrderList(e.target.value);
    }
    render(){
        const { queryStrategy } = this.state;
        return (
            <div>
                <OrderListSearchView queryStrategy={queryStrategy}/>
                <Radio.Group value={queryStrategy} onChange={this.onChange.bind(this)} style={{ marginBottom: 16 }} >
                    <Radio.Button value={"all"}>全部</Radio.Button>
                    <Radio.Button value={"waitPay"}>待付款</Radio.Button>
                    <Radio.Button value={"waitDispatch"}>待派单</Radio.Button>
                    <Radio.Button value={"waitDelivery"}>待配送</Radio.Button>
                    <Radio.Button value={"waitReceive"}>待收货</Radio.Button>
                    <Radio.Button value={"finish"}>已完成</Radio.Button>
                </Radio.Group>
                {/*<Table />*/}
            </div>

        )
    }
}
@observer class OrderListSearchView extends Component{

    render(){
        let queryStrategy = this.props.queryStrategy;
        return (
            <div>
                <Search
                    placeholder="输入订单号"
                    onSearch={value => {
                        actions.selectQueryMsg({orderNo:value});
                        actions.searchOrderList(queryStrategy);
                    }}
                    enterButton
                    style={{ marginBottom: 16 }}
                />
            </div>

        )
    }
}
module.exports = ClientOrderSearchView;