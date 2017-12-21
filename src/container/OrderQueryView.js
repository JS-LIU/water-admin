/**
 * Created by LDQ on 2017/12/19
 */
import React, {Component} from 'react'
import { Select } from 'antd';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;


import OrderQueryStyle from './OrderQueryStyle.css';

const Option = Select.Option;
const FormItem = Form.Item;

class OrderQueryView extends Component{
    render(){
        return(
            <div>
                <QueryListView queryCondition={this.props.queryCondition}/>
            </div>
        )
    }
}
class QueryListView extends Component{
    render(){
        let queryCondition = this.props.queryCondition;
        let queryNodes = queryCondition.map((item,index)=>{
            return (item.selectedValue?<SelectedView name={item.keys} selectedList={item.selectedValue}/>:(item.keys.length>1?<DateView />:<QueryInputView name={item.keys}/>))
        });
        return (
            <Row gutter={24}>
                {queryNodes}
            </Row>
        )
    }
}

class QueryInputView extends Component{
    render(){
        return (
            <Col span={4}>
                <FormItem label={this.props.name[0]}>
                    <Input placeholder={this.props.name[0]} />
                </FormItem>
            </Col>
        )
    }
}

class DateView extends Component{
    render(){
        const dateFormat = 'YYYY/MM/DD';
        return (
            <RangePicker
                format={dateFormat}
            />
        )
    }
}

class SelectedView extends Component{
    render(){
        let selectedValue = this.props.selectedList.map((item,index)=>{
            return (<Option key={index}>{item}</Option>)
        });
        return (
            <FormItem label={this.props.name[0]}>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                >
                    {selectedValue}
                </Select>
            </FormItem>
        )
    }
}
module.exports = OrderQueryView;


