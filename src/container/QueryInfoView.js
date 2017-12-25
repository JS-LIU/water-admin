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

class QueryInfoView extends Component{
    search(){
        this.props.table.queryInfoMsg = queryInfoBuilder.queryMsg;
        this.props.searchAction.search();

    }
    render(){
        return(
            <div>
                <QueryListView queryCondition={this.props.queryCondition}/>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>Search</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
class QueryListView extends Component{

    render(){
        let queryCondition = this.props.queryCondition;
        let queryNodes = queryCondition.map((item,index)=>{
            return (item.selectedValue?<SelectedView key={index} name={item.keys} selectedList={item.selectedValue}/>:(item.keys.length>1?<DateView name={item.keys} key={index} />:<QueryInputView key={index} name={item.keys}/>))
        });
        return (
            <Row gutter={24} type="flex" justify="space-between">
                {queryNodes}
            </Row>
        )
    }
}

class QueryInputView extends Component{
    onChange(e){
        let key = this.props.name;
        let value = e.target.value;
        queryInfoBuilder.createQueryInfo("eq",key,value);
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
    onChange(moment,dateList){
        let keys = this.props.name;
        let start = dateList[0] + " 00:00:00";
        let end = dateList[1] + " 23:59:59";
        queryInfoBuilder.createQueryInfo("between",keys,[start,end]);

    }
    render(){
        const dateFormat = 'YYYY-MM-DD';
        return (
            <Col span={8}>
                <RangePicker
                    format={dateFormat}
                    onChange={this.onChange.bind(this)}
                />
            </Col>
        )
    }
}

class SelectedView extends Component{
    onChange(value){
        let key = this.props.name;
        let allValues = this.props.selectedList;
        let indexList = value;
        queryInfoBuilder.createQueryInfo("eqOr",key,allValues,indexList);
    }
    render(){
        let selectedValue = this.props.selectedList.map((item,index)=>{
            return (<Option key={index}>{item}</Option>)
        });
        return (
            <Col span={6}>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder={this.props.name[0]}
                    onChange={this.onChange.bind(this)}
                >
                    {selectedValue}
                </Select>
            </Col>
        )
    }
}
module.exports = QueryInfoView;


