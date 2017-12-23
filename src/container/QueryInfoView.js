/**
 * Created by LDQ on 2017/12/19
 */
import React, {Component} from 'react'
import { Select } from 'antd';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
import _h from '../Util/HB';
import {observer,inject} from 'mobx-react';

import QueryInfoBuilder from '../MobX/QueryInfoBuilder';
import OrderQueryStyle from './OrderQueryStyle.css';


const Option = Select.Option;
const FormItem = Form.Item;

let queryInfoBuilder = new QueryInfoBuilder();

@observer class QueryInfoView extends Component{
    render(){
        return(
            <div>
                <QueryListView queryCondition={this.props.queryCondition}/>
            </div>
        )
    }
}
class QueryListView extends Component{
    search(){
        this.props.searchAction(queryInfoBuiler.queryMsg);
    }
    render(){
        let queryCondition = this.props.queryCondition;
        let queryNodes = queryCondition.map((item,index)=>{
            return (item.selectedValue?<SelectedView key={index} name={item.keys} selectedList={item.selectedValue}/>:(item.keys.length>1?<DateView key={index} />:<QueryInputView key={index} name={item.keys}/>))
        });
        return (
            <div>
                <Row gutter={24} type="flex" justify="space-between">
                    {queryNodes}
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>Search</Button>
                    </Col>
                </Row>
            </div>


        )
    }
}

class QueryInputView extends Component{
    onChange(e){
        let key = this.props.name;
        let value = e.target.value;
        let info = _h.obj.createCustomKeyObject(key,value);
        queryInfoBuilder.addQueryInfo(info);

    }
    render(){
        return (
            <Col span={6}>
                <FormItem label={this.props.name[0]}>
                    <Input placeholder={this.props.name[0]} onChange={this.onChange.bind(this)}/>
                </FormItem>
            </Col>
        )
    }
}

class DateView extends Component{
    render(){
        const dateFormat = 'YYYY/MM/DD';
        return (
            <Col span={8}>
                <RangePicker
                    format={dateFormat}
                />
            </Col>
        )
    }
}

class SelectedView extends Component{
    render(){
        let selectedValue = this.props.selectedList.map((item,index)=>{
            return (<Option key={index}>{item}</Option>)
        });
        return (
            <Col span={6}>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder={this.props.name[0]}>
                    {selectedValue}
                </Select>
            </Col>
        )
    }
}
module.exports = QueryInfoView;


