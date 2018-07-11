import React, {Component} from 'react'
import { Table , Button , Radio , Input , Select , Icon , Modal , Divider , Form , Row, Col } from 'antd';
import Avatar from '../Avatar';
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

import {observer,inject} from 'mobx-react';
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
    render(){
        let shopNodes = data.waterStoreList.map((shop,index)=>{
            return (
                <Option key={index} value={shop.shopId}>{shop.shopName}</Option>
            )
        });
        return (
            <div className="manufacture_cost_box" >
                <div>
                    <span>水厂：</span>
                    <Select defaultValue={'def'}  style={{ width: 150 }} >
                        <Option value='def'>-请选择水厂-</Option>
                        {shopNodes}
                    </Select>
                </div>
                <div>
                    <Button type='primary' onClick={() => actions.addManufacture()} >+进水支出</Button>
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
    render(){
        let productNodes = data.productList.map((product,index)=>{
            return (
                <Option key={index} value={product.productId}>{product.productName}</Option>
            )
        });
        let shopNodes = data.waterStoreList.map((shop,index)=>{
            return (
                <Option key={index} value={shop.shopId}>{shop.shopName}</Option>
            )
        });
        return (
            <div className='manufacture_cost_add' >
                <div className="manufacture_cost_add_head">+添加进水支出</div>
                <Form className="add_detail_section_left" id='add_detail_section_left'>
                    <Row gutter={16}>
                        <Col span={6}>
                            <FormItem label={"选择商品"}>
                                <Select defaultValue="def" onChange={value => actions.selectProduct(value)}>
                                    <Option value="def">-选择商品-</Option>
                                    {productNodes}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"单价"}>
                                <Input placeholder="输入金额" onChange={e => {actions.setPerProductPrice(e.target.value);actions.calcPayRmb()}}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"数量"}>
                                <Input placeholder="输入数量" onChange={e => {actions.setTotalCount(e.target.value);actions.calcPayRmb()}}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"金额"}>
                                <span>{data.totalRmb}</span>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"备注"}>
                                <Input onChange={e => actions.setMark(e.target.value)}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"选择水厂"}>
                                <Select defaultValue={'def'} onChange={value => actions.selectWaterStore(value)}>
                                    <Option value='def'>-请选择水厂-</Option>
                                    {shopNodes}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"支付金额"}>
                                <Input onChange={e => actions.setPayRmb(e.target.value)}/>
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem label={"收据存根"}>
                                <Avatar name={"file"} afterAction={actions.setTicketUrl}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={actions.createProduct}>确认添加</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

module.exports = ManufactureCostView;