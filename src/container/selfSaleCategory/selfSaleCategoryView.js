
import React, {Component} from 'react'
import { Table, Pagination , Button , Radio , Input , Select } from 'antd';
const Search = Input.Search;
import {observer,inject} from 'mobx-react';
const Option = Select.Option;

import {data,actions} from '../../store/product/selfSaleCategoryListInterface';

@observer class SelfSaleCategoryView extends Component{
    componentWillMount(){
        // actions.onLoad();
    }
    render(){
        return (
            <div>
               分类管理hhhhhhhhhhh
            </div>
        )
    }
}

module.exports = SelfSaleCategoryView;