
import React, {Component} from 'react'
import {  Table , Button , Radio , Input , Select , Upload , Icon , Modal , Divider } from 'antd';
const Search = Input.Search;
import {observer,inject} from 'mobx-react';
const Option = Select.Option;

import {data,actions} from '../../store/product/distributeEditProductListInterface';

@observer class DistributeEditProductView extends Component{
    render(){
        return(
            <div>
                <DistributeEditProductListQueryView/>
                <DistributeEditProductListView/>
            </div>
        )
    }
}

// 搜索
class DistributeEditProductListQueryView extends Component{
    state = { queryType: 0 };
    onChange(e){
        this.setState({ queryType: e.target.value });
        if(e.target.value==0){
            actions.getList({productStatus:'在售中'})
        }else{
            actions.getList({productStatus:'待上架'})
        }
    }
    render(){
        const { queryType } = this.state;
        return (
            <div>
                <div className='all_search_box mb15'>
                    <div>
                        <span>商品名称:</span>
                        <Search
                            placeholder="输入店铺名称"
                            onSearch={value => {
                                actions.getList({shopName:value});
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </div>
                    <div>
                        <span>商品品牌:</span>
                        <Search
                            placeholder="输入商品品牌"
                            onSearch={value => {
                                actions.getList({productBrand:value});
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </div>
                    <div>
                        <span>商品分类:</span>
                        <Search
                            placeholder="输入商品分类"
                            onSearch={value => {
                                actions.getList({productCategory:value});
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </div>
                    <div>
                        <Button type="primary">+添加商品</Button>
                    </div>
                </div>
                <Radio.Group value={queryType} onChange={this.onChange.bind(this)} style={{ marginBottom: 16 }} >
                    <Radio.Button value={0}>在售中</Radio.Button>
                    <Radio.Button value={1}>待上架</Radio.Button>
                </Radio.Group>
            </div>
        )
    }
}

// list
@observer class DistributeEditProductListView extends Component{
    render(){
        const columns = [
            {
                title:'商品名称',
                dataIndex:"productName",
                key:"productName",
                width:200
            },{
                title:'规格',
                dataIndex:"volume",
                key:"volume",
                width:200
            },{
                title:'商品图片',
                dataIndex:"productImg",
                key:"productImg",
                width:200,
                render:(text,record)=>(<img src={record.productImg} />)
            },{
                title:'商品品牌',
                dataIndex:"productBrand",
                key:"productBrand",
                width:200
            },{
                title:'分类',
                dataIndex:"productCategory",
                key:"productCategory",
                width:200
            },{
                title:'所属区域',
                dataIndex:"areaBelong",
                key:"areaBelong",
                width:200
            },{
                title:'销售价',
                dataIndex:"salePrice",
                key:"salePrice",
                width:200
            },{
                title:'原价',
                dataIndex:"originalPrice",
                key:"originalPrice",
                width:200
            },{
                title:'成本价',
                dataIndex:"price",
                key:"price",
                width:200
            },{
                title:'库存',
                dataIndex:"stockStatus",
                key:"stockStatus",
                width:200
            },{
                title: '促销',
                dataIndex:"productActivity",
                key: 'productActivity',
                width: 200
            },{
                title: '服务',
                dataIndex:"serve",
                key: 'serve',
                width: 200
            },{
                title: '标签',
                dataIndex:"productTag",
                key: 'productTag',
                width: 200
            },{
                title: '状态',
                dataIndex:"productStatus",
                key: 'productStatus',
                width: 100
            },{
                title: '操作',
                dataIndex:"operate",
                key: 'operate',
                width: 200,
                render: (text, record) => {
                    return (
                        <span>
                          <a href="javascript:void(0);">编辑</a>
                          <Divider type="vertical" />
                          <a href="javascript:void(0);"
                             onClick={ () => {
                                 actions.operate(record.operate[0].title,record.orderId);
                             }
                             }
                          >{record.operate[0].title}</a>
                          <Divider type="vertical" />
                          <a href="javascript:void(0);"
                             onClick={ () => {
                                 actions.operate(record.operate[1].title,record.orderId);
                             }
                             }
                          >{record.operate[1].title}</a>
                        </span>
                    )
                }
            }
        ];
        const dataSource = [];
        for(let i = 0;i < data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
                productId:item.productId,
                productName:item.productName,
                volume:item.volume,
                productImg:item.productImg,
                productBrand:item. productBrand,
                productCategory:item.productCategory,
                areaBelong:item.areaBelong,
                salePrice:item.salePrice,
                originalPrice:item.originalPrice,
                price:item.price,
                stockStatus:item.stockStatus,
                productActivity:item.productActivity,
                serve:item.serve,
                productTag:item.productTag,
                productStatus:item.productStatus.title,
                operate:item.productStatus.actions
            })
        }
        return (
            <Table
                className="components-table-demo-nested"
                columns={columns}
                dataSource={dataSource}
                scroll={{x: 2900,y:500}}
            />
        )
    }
}


module.exports = DistributeEditProductView;