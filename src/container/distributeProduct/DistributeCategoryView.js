
import React, {Component} from 'react'
import { Table,  Input , Select,Divider } from 'antd';
const Search = Input.Search;
import {observer,inject} from 'mobx-react';
const Option = Select.Option;

import {data,actions} from '../../store/product/distuibuteCategoryListInterface';

@observer class DistributeCategoryView extends Component{
    componentWillMount(){
        actions.onLoad();
    }
    render(){
        // console.log(data);
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
                                     console.log('add...');
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

module.exports = DistributeCategoryView;