/**
 * Created by LDQ on 2017/12/19
 */
import React, {Component} from 'react'
import { Select } from 'antd';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
import _h from '../Util/HB';
import QueryInfoBuilder from '../MobX/QueryInfoBuilder';
import OrderQueryStyle from './OrderQueryStyle.css';

import {observer} from 'mobx-react';

const Option = Select.Option;
const FormItem = Form.Item;

let queryInfoBuilder;

import toChinese from './chineseContentTable'

class QueryInfoView extends Component{
    componentWillMount(){
        queryInfoBuilder = new QueryInfoBuilder();
    }
    componentWillUnmount(){
        this.props.table.queryInfoMsg = {};
    }
    search(){
        this.props.table.queryInfoMsg = queryInfoBuilder.queryMsg;
        this.props.searchAction.search();
    }
    render(){
        let queryCondition = this.props.queryCondition;
        let queryNodes = queryCondition.map((item,index)=>{
            return (item.selectedValue?
                <SelectedView
                    key={index}
                    name={item.keys}
                    selectedList={item.selectedValue}
                    chineseChart={this.props.chineseChart}
                />:
                (item.keys.length>1?
                    <DateView
                        name={item.keys}
                        key={index}
                        chineseChart={this.props.chineseChart}
                    />:
                    <QueryInputView
                        key={index}
                        name={item.keys}
                        chineseChart={this.props.chineseChart}
                    />
                )
            )
        });
        return (
            <Row>
                {queryNodes}
                <Col span={6} style={{width:244}}>
                    <Button
                        style={{width:244}}
                        type="primary"
                        htmlType="submit"
                        onClick={this.search.bind(this)}>查询</Button>
                </Col>
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
                <FormItem label={toChinese(this.props.name[0],this.props.chineseChart)}>
                    <Input
                        placeholder={toChinese(this.props.name[0],this.props.chineseChart)}
                        onChange={this.onChange.bind(this)}/>
                </FormItem>
            </Col>
        )
    }
}

class DateView extends Component{
    onChange(moment,dateList){
        const dateFormat = 'YYYY-MM-DD';
        let keys = this.props.name;
        let start = _h.valid.addTimeToDay(dateList[0]," 00:00:00",dateFormat);
        let end = _h.valid.addTimeToDay(dateList[1]," 23:59:59",dateFormat);

        queryInfoBuilder.createQueryInfo("between",keys,[start,end]);
    }
    render(){
        const dateFormat = 'YYYY-MM-DD';
        return (
            <Col span={6}>
                <FormItem>
                    <RangePicker
                        style={{width:244}}
                        format={dateFormat}
                        onChange={this.onChange.bind(this)}
                    />
                </FormItem>
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
            return (<Option key={index}>{toChinese(item,this.props.chineseChart)}</Option>)
        });
        return (
            <Col span={6}>
                <FormItem>
                    <Select
                        mode="multiple"
                        style={{ width: 244 }}
                        placeholder={toChinese(this.props.name[0],this.props.chineseChart)}
                        onChange={this.onChange.bind(this)}
                    >
                        {selectedValue}
                    </Select>
                </FormItem>
            </Col>
        )
    }
}
module.exports = QueryInfoView;


