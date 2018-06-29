
import React, {Component} from 'react'
import { Table, Pagination , Button , Radio , Input , Select } from 'antd';
const Search = Input.Search;
import {observer,inject} from 'mobx-react';
const Option = Select.Option;


@observer class SortManagementView extends Component{
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

module.exports = SortManagementView;