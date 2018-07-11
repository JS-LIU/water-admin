import React, {Component} from 'react';
import { Input , Table, Icon , Radio ,Tabs , Select , Button } from 'antd';
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
import {observer,inject}from "mobx-react";

import expenditureStyle from './expenditure.css';
import {actions} from "../../store/order/merchantOrderSearchInterface";

@observer class ExpenditureView extends Component{
    render(){
        return (
            <div>
                <ExpenditureSearchView/>
                <ExpenditureHeaderView/>
                <ExpenditureListView/>
            </div>
        )
    }
}

@observer class ExpenditureSearchView extends Component{
    render(){
        return (
            <div className="manufacture_cost_box" >
                <div>
                    <span>水厂：</span>
                    <Select placeholder="选择水厂" style={{ width: 150 }} >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">lucy</Option>
                    </Select>
                </div>
                <div>
                    <Button type='primary'>查询</Button>
                </div>
            </div>
        )
    }
}

@observer class ExpenditureHeaderView extends Component{
    render(){
        return (
            <ul className='expenditure_header'>
                <li>
                    <div>生产数量</div>
                    <div><span>{}</span>桶</div>
                </li>
                <li>
                    <div>生产成本</div>
                    <div><span>{}</span>元</div>
                </li>
                <li>
                    <div>物流费用</div>
                    <div><span>{}</span>元</div>
                </li>
            </ul>
        )
    }
}

@observer class ExpenditureListView extends Component{
    state = { queryStrategy: "all" };
    onChange(e){
        this.setState({ queryStrategy: e.target.value });
    }
    render(){
        const { queryStrategy } = this.state;
        const columns = [
            {
                title:"生产时间",
                dataIndex:"",
                key:"",
                width:200
            },{
                title:"交易单号",
                dataIndex:"",
                key:"",
                width:200
            },{
                title:"水厂",
                dataIndex:"",
                key:"",
                width:200
            },{
                title:"商品",
                dataIndex:"",
                key:"",
                width:200
            },{
                title:"规格",
                dataIndex:"",
                key:"",
                width:100
            },{
                title:"分类",
                dataIndex:"",
                key:"",
                width:200
            },{
                title:"成本(元/桶)",
                dataIndex:"",
                key:"",
                width:200
            },{
                title:"数量(桶)",
                dataIndex:"",
                key:"",
                width:100
            },{
                title:"金额(元)",
                dataIndex:"",
                key:"",
                width:100
            },{
                title:"收据存根",
                dataIndex:"",
                key:"",
                width:200
            },{
                title:"备注",
                dataIndex:"",
                key:"",
                width:300
            }
        ];
        const dataSource = [];
        for(var i=0;i<dataSource.length;i++){
            let item = dataSource[i];
            dataSource.push({
                key:i,

            })
        }
        return (
            <div>
                <div>
                    <Radio.Group value={queryStrategy} onChange={this.onChange.bind(this)} style={{ marginBottom: 16 }} >
                        <Radio.Button value={"all"}>生产成本</Radio.Button>
                        <Radio.Button value={"waitPay"}>物流费用</Radio.Button>
                    </Radio.Group>
                </div>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{x:2000,y:600}}
                />
            </div>
        )

    }
}


module.exports = ExpenditureView;