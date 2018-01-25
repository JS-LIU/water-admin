/**
 * Created by LDQ on 2018/1/24
 */
import React, {Component} from 'react'
import { Button,Popconfirm } from 'antd';
import {observer,inject} from 'mobx-react';
@inject(['openShopContainer'])
@observer class AuditOperationBtnView extends Component{
    allowOpen(){
        this.props.openShopContainer.allowAudit(this.props.auditItem);

    }

    render(){
        return (
            <div>
                <Popconfirm title="是通过审核?" onConfirm={this.allowOpen.bind(this)}>
                    <a style={{color:"#dd7c1e"}}>{this.props.auditItem.merchantStatus}</a>
                </Popconfirm>
            </div>
        )
    }
}
module.exports = AuditOperationBtnView;