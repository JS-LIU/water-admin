import React,{Component} from 'react';
import { Table,  Input , Select } from 'antd';
const Search = Input.Search;
import {observer,inject} from 'mobx-react';
const Option = Select.Option;

import {data,actions} from '../../store/product/stockCategoryListInterface';

@observer class StockCategoryView extends Component{
    componentWillMount(){
        actions.onLoad();
    }
    render(){
        return (
            <div>
                分类管理
            </div>
        )
    }
}



module.exports = StockCategoryView;