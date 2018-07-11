
import React, {Component} from 'react'
import { Table, Pagination,Divider , Button , Radio , Input , Select } from 'antd';
const Search = Input.Search;
import {observer,inject} from 'mobx-react';
const Option = Select.Option;

import {data,actions} from '../../store/product/selfSaleCategoryListInterface';

@observer class SelfSaleCategoryView extends Component{
    componentWillMount(){
        actions.onLoad();
    }
    render(){
        const columns = [
            {
                title:"分类名称",
                dataIndex:"name",
                key:"name",
                width:300
            },
            {
                title:"操作",
                dataIndex:"operate",
                key:"operate",
                width:300,
                render:(text,record)=>{
                    return(
                        <span>
                          <a href="javascript:void(0);"
                             onClick={ () => {
                                 console.log('add...',record.name);
                                 actions.appendCategory(record.name)
                             }
                             }
                          >+添加子分类</a>
                          <Divider type="vertical" />
                          <a href="javascript:void(0);"
                             onClick={ () => {
                                 console.log('edit...')
                             }
                             }
                          >编辑名称</a>
                          <Divider type="vertical" />
                          <a href="javascript:void(0);"
                             onClick={ () => {
                                 console.log('del..')
                             }
                             }
                          >删除分类</a>
                        </span>
                    )
                }
            }
        ];
        const dataSource = [];
        for(let i=0;i<data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
                name:item.name,
                operate:item.operate
            })
        }
        return(
            <Table
                columns={columns}
                dataSource={dataSource}
            />
        )
    }
}

module.exports = SelfSaleCategoryView;