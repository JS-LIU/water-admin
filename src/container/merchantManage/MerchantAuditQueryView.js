

import React, {Component} from 'react'
import { Table, Pagination , Button , Radio , Input } from 'antd';
const Search = Input.Search;
import {observer,inject} from 'mobx-react';

import {data,actions} from '../../store/merchant/merchantAuditInterface';
import merchantAuditStyle from './css/merchantAudit.css';

@inject (['shopListContainer'])
@observer class MerchantAuditView extends Component{
    componentWillMount(){
        actions.onLoad();
    }
    render(){
        return (
            <div>
                <MerchantAuditListQueryView />
            </div>
        )
    }
}

class MerchantAuditListQueryView extends Component{
    state = { queryType: 0 };
    onChange(e){
        this.setState({ queryType: e.target.value });
        actions.selectQueryType(e.target.value);
    }
    render(){
        const { queryType } = this.state;
        return (
            <div>
                <div>
                    <Search
                        placeholder="input search text"
                        onSearch={value => {
                            actions.setQueryInfo({orderNo:value});
                            actions.queryByQueryInfo();
                        }}
                        enterButton
                        style={{ marginBottom: 16 }}
                    />
                </div>
            </div>

        )
    }
}



module.exports = MerchantAuditView;