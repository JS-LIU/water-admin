import React,{Component} from 'react';
import {observer,inject} from 'mobx-react';
import {Table , Input , Select , Button } from 'antd';
const Search = Input.Search;
const Option = Select.Option;

import {data,actions} from '../../store/finance/manufactureCostInterface';
import manufactureCostStyle from './manufactureCost.css';

@observer class ManufactureCostView extends Component{
    componentWillMount(){
        actions.onLoad();
    }
    render(){
        return (
            <div>
                <ManufactureCostSearchView />
                <ManufactureCostListView />
                <ManufactureCostAddView />
            </div>
        )
    }
}

@observer class ManufactureCostSearchView extends Component{
    addWater(){
        console.log('进水指出。');
        actions.addManufacture();
    }
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
                    <Button type='primary' onClick={this.addWater.bind(this)} >+进水支出</Button>
                </div>
                <div>
                    <Button type='primary'>查询</Button>
                </div>
            </div>
        )
    }
}

@observer class ManufactureCostListView extends Component{
    render(){
        const columns = [
            {
                title:"生产时间",
                dataIndex:"createTime",
                key:"createTime",
                width:200
            },
            {
                title:"交易单号",
                dataIndex:"payNumber",
                key:"payNumber",
                width:200
            },
            {
                title:"水厂",
                dataIndex:"shopName",
                key:"shopName",
                width:200
            },
            {
                title:"区域",
                dataIndex:"address",
                key:"address",
                width:200
            },
            {
                title:"商品",
                dataIndex:"productName",
                key:"productName",
                width:200
            },
            {
                title:"规格",
                dataIndex:"volume",
                key:"volume",
                width:100
            },
            {
                title:"分类",
                dataIndex:"productType",
                key:"productType",
                width:100
            },
            {
                title:"成本（元/桶）",
                dataIndex:"unitPrice",
                key:"unitPrice",
                width:200
            },
            {
                title:"数量（桶）",
                dataIndex:"count",
                key:"count",
                width:100
            },
            {
                title:"金额（元）",
                dataIndex:"payRmb",
                key:"payRmb",
                width:100
            },
            {
                title:"收据存根",
                dataIndex:"ticketUrl",
                key:"ticketUrl",
                width:100
            },
            {
                title:"备注",
                dataIndex:"remark",
                key:"remark",
                width:100
            }
        ];
        const dataSource =[];
        for(let i=0;i<data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
                createTime:item.createTime,
                payNumber:item.payNumber,
                shopName:item.shopName,
                address:item.address,
                productName:item.productName,
                volume:item.volume,
                productType:item.productType,
                unitPrice:item.unitPrice,
                count:item.count,
                payRmb:item.payRmb,
                ticketUrl:item.ticketUrl,
                remark:item.remark
            })
        }
        return (
            <Table
                columns={columns}
                dataSource={dataSource}
                scroll={{x:1800,y:400}}
            />
        )
    }
}

// 添加进水支出
@observer class ManufactureCostAddView extends Component{
    confirmAdd(){
        console.log('确认添加。');
        actions.createManufactureCost();
    }
    render(){
        return (
            <div className='manufacture_cost_add' >
                <div className="manufacture_cost_add_head">
                    +添加进水支出
                </div>
                <div className="manufacture_cost_add_list">
                    <div className="manufacture_left manufacture_cost_item">
                        <span>
                            商品名称：
                            <Select placeholder="选择商品" style={{ width: 150 , paddingRight:10 }} >
                              <Option value="jack">Jack</Option>
                              <Option value="lucy">lucy</Option>
                            </Select>
                            <Select placeholder="选择规格" style={{ width: 120 }}>
                              <Option value="jack">Jack</Option>
                              <Option value="lucy">lucy</Option>
                            </Select>
                        </span>
                            <span>
                            单价：<Input placeholder="输入金额"/>  元/桶
                        </span>
                            <span>
                            数量：<Input placeholder="输入数量"/>
                        </span>
                            <span>
                            金额：<Input placeholder="输入金额"/>
                        </span>
                            <span>
                            备注：
                        </span>
                    </div>
                    <div className="manufacture_right manufacture_cost_item">
                        <span>
                            水厂：
                            <Select placeholder="选择水厂" style={{ width: 120 }}>
                              <Option value="jack">Jack</Option>
                              <Option value="lucy">lucy</Option>
                            </Select>
                        </span>
                            <span>
                            支付金额：<Input placeholder="输入支付金额" />
                        </span>
                            <span>
                            收据存根:  <Button>添加存根</Button>
                        </span>
                            <span></span>
                            <span>
                            <Button type="primary" onClick={this.confirmAdd.bind(this)} >确认添加</Button>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = ManufactureCostView;