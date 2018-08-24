import React, {Component} from 'react'
import { Table , Button , Radio , Input , Select , Icon , Modal , Divider , Form , Row, Col ,Tooltip} from 'antd';
import Avatar from '../Avatar';
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

import {observer,inject} from 'mobx-react';
import {data,actions} from '../../store/finance/manufactureCostInterface';
import manufactureCostStyle from './manufactureCost.css';

@observer class ManufactureCostView extends Component{
    state = {
        isShow : false
    };
    componentWillMount(){
        actions.onLoad();
    };
    changeShow(newState){
        this.setState(newState)
    };
    render(){
        return (
            <div>
                <ManufactureCostSearchView isShow={this.state.isShow} onChange={this.changeShow.bind(this)} />
                <ManufactureCostListView />
                {
                    this.state.isShow?<ManufactureCostAddView isShow={this.state.isShow} onChange={this.changeShow.bind(this)} />:""
                }
            </div>
        )
    }
}

@observer class ManufactureCostSearchView extends Component{
    constructor(props){
        super(props);
    };
    addManufacture(){
        actions.addManufacture();
        this.props.onChange({
            isShow:true
        })
    };
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
                    <Button type='primary' onClick={this.addManufacture.bind(this)} >+进水支出</Button>
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
                width:150
            },
            {
                title:"交易单号",
                dataIndex:"payNumber",
                key:"payNumber",
                width:150
            },
            {
                title:"水厂",
                dataIndex:"shopName",
                key:"shopName",
                width:120
            },
            {
                title:"区域",
                dataIndex:"address",
                key:"address",
                width:150
            },
            {
                title:"商品",
                dataIndex:"productName",
                key:"productName",
                width:150
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
                width:120
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
                width:100,
                render:(text,record)=>{
                    return (
                        <img src={record.ticketUrl} />
                    )
                }
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
                scroll={{x:1420,y:400}}
            />
        )
    }
}

// 添加进水支出
@observer class ManufactureCostAddView extends Component{
    constructor(props){
        super(props);
    };
    createManufactureCost(){
        actions.createManufactureCost();
        this.props.onChange({
            isShow:false
        })
    };
    render(){
        let productNodes = data.productList.map((product,index)=>{
            return (
                <Option key={index} value={product.productId}>
                    <Tooltip placement="topLeft" title={product.productName}>
                        {product.productName}
                    </Tooltip>
                </Option>
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
                                <Select value={data.productId || "def"} onChange={value => actions.selectProduct(value)}>
                                    <Option value="def">-选择商品-</Option>
                                    {productNodes}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"单价"}>
                                <Input placeholder="输入金额" onChange={e => {actions.setPerProductPrice(e.target.value);actions.calcPayRmb()}} value={data.unitPrice}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"数量"}>
                                <Input placeholder="输入数量" onChange={e => {actions.setTotalCount(e.target.value);actions.calcPayRmb()}} value={data.count}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"金额"}>
                                <span>{data.totalRmb}</span>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"备注"}>
                                <Input onChange={e => actions.setMark(e.target.value)} value={data.remark}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"支付金额"}>
                                <Input onChange={e => actions.setPayRmb(e.target.value)} value={data.payRmb}/>
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem label={"收据存根"}>
                                <Avatar name={"file"} afterAction={actions.setTicketUrl} value={data.ticketUrl}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={this.createManufactureCost.bind(this)}>确认添加</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

module.exports = ManufactureCostView;