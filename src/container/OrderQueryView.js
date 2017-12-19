/**
 * Created by LDQ on 2017/12/19
 */
import React, {Component} from 'react'
import { Select } from 'antd';
import { Form, Row, Col, Input, Button, Icon } from 'antd';

import OrderQueryStyle from './OrderQueryStyle.css';

const Option = Select.Option;
const FormItem = Form.Item;

import {observer,inject} from 'mobx-react';
class OrderQueryView extends Component{
    render(){
        return(
            <div>
                <Row gutter={24}>
                    <Col span={6}>
                        <FormItem label={`订单号`}>
                            <Input placeholder="订单号" />
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label={`订单号2`}>
                            <Input placeholder="订单号" />
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
}
module.exports = OrderQueryView;