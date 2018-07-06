
import React, {Component} from 'react'
import { Table,  Input , Select } from 'antd';
const Search = Input.Search;
import {observer,inject} from 'mobx-react';
const Option = Select.Option;

import {data,actions} from '../../store/product/selfSaleProductSearchListInterface';

@observer class SelfSaleProductSearchView extends Component{
    componentWillMount(){
        actions.onLoad();
    }
    render(){
        const columns = [
            {
                title:'商品名称',
                dataIndex:'productName',
                key:'productName',
                width:200
            },
            {
                title:'规格',
                dataIndex:'volume',
                key:'volume',
                width:200
            },
            // {
            //     title:'商品头像',
            //     dataIndex:'',
            //     key:'',
            //     width:200
            // },
            {
                title:'商品品牌',
                dataIndex:"productBrand",
                key:"productBrand",
                width:200
            },
            {
                title:'分类',
                dataIndex:"productCategory",
                key:"productCategory",
                width:200
            },
            {
                title:'所属区域',
                dataIndex:"areaBelong",
                key:"areaBelong",
                width:200
            },
            {
                title:'销售价',
                dataIndex:"salePrice",
                key:"salePrice",
                width:100
            },
            {
                title:'原价',
                dataIndex:"originalPrice",
                key:"originalPrice",
                width:100
            },
            {
                title:'成本价',
                dataIndex:"price",
                key:"price",
                width:100
            },
            // {
            //     title:'已售',
            //     dataIndex:'',
            //     key:'',
            //     width:200
            // },
            {
                title:'库存',
                dataIndex:"stockStatus",
                key:"stockStatus",
                width:100
            },
            {
                title: '促销',
                dataIndex:"productActivity",
                key: 'productActivity',
                width: 200
            },
            {
                title:'商品图片',
                dataIndex:'productImg',
                key:'productImg',
                width:200,
                render:(text,record)=>(<img src={record.productImg} />)
            },
            // {
            //     title:'图片详情',
            //     dataIndex:'',
            //     key:'',
            //     width:200
            // },
            {
                title: '服务',
                dataIndex:"serve",
                key: 'serve',
                width: 200
            },
            {
                title: '标签',
                dataIndex:"productTag",
                key: 'productTag',
                width: 200
            },
            {
                title: '状态',
                dataIndex:"productStatus",
                key: 'productStatus',
                width: 100
            }
        ]
        const dataSource = [];
        for(let i=0;i<data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
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
                productStatus:item.productStatus,
            })
        }
        return(
            <Table
                className="components-table-demo-nested"
                columns={columns}
                dataSource={dataSource}
                scroll={{x: 2100,y:600}}
            />
        )
    }
}

module.exports = SelfSaleProductSearchView;