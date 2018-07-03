import React, {Component} from 'react';
import waterTicketMarketingStyle from './css/waterTicketMarketingStyle.css'
import {observer} from "mobx-react/index";

import { Button, Radio, Icon , Input ,  Table , Cascader ,DatePicker } from 'antd';

const Search = Input.Search;
const { MonthPicker, RangePicker } = DatePicker;

@observer class WaterTicketMarketingView extends Component{
    render(){
        return(
            <div>
                <WaterTicketSearchView />
                <WaterTicketActivityDetails />
                <CompilePromotionView />
            </div>
        )
    }
}

//搜索区域
@observer class WaterTicketSearchView extends Component{
    render(){
        return(
            <div>
                <div className="search_view">
                    <span>
                        <Search
                            placeholder="输入商品名称"
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </span>
                    <span>
                        <Search
                            placeholder="输入水票名称"
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </span>
                    <span>
                        <Button type="primary" icon="plus">添加促销</Button>
                    </span>
                </div>

                <Radio.Group style={{ marginBottom: 16 ,marginLeft:10}} >
                    <Radio.Button value={0}>最新水票活动</Radio.Button>
                    <Radio.Button value={1}>历史水票活动</Radio.Button>
                </Radio.Group>
            </div>
        )
    }
}

//水票活动详情
@observer class WaterTicketActivityDetails extends Component{

    render(){
        const columns = [{
            title: '区域',
            dataIndex: 'qy',
            key: 'qy'
        }, {
            title: '水票名称',
            dataIndex: 'spmc',
            key: 'spmc',
        }, {
            title: '商品名称',
            dataIndex: 'sp',
            key: 'sp',
        }, {
            title: '购买规则',
            dataIndex: 'gmgz',
            key: 'gmgz',
        }, {
            title: '活动时间',
            dataIndex: 'hdsj',
            key: 'hdsj',
        }, {
            title: '发放总数量',
            dataIndex: 'ffzsl',
            key: 'ffzsl',
        }, {
            title: '已售',
            dataIndex: 'ys',
            key: 'ys',
        }, {
            title: '赠送',
            dataIndex: 'zs',
            key: 'zs',
        }, {
            title: '回收',
            dataIndex: 'hs',
            key: 'hs',
        }, {
            title: '详细说明',
            dataIndex: 'xxsm',
            key: 'xxsm',
        }, {
            title: '状态',
            dataIndex: 'zt',
            key: 'zt',
        }];
        const dataSource = [{
            key: '1',
            zt: '',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }];
        const columnss = [{
            title: '操作',
            key: 'cz',
            render: (text, record) => (
                <span className="operate_btn">
                  <a href="#">编辑</a>
                  <span className="wire" />
                  <a href="#">下架</a>
                </span>
            ),
        }];
        const data = [{
            key: 'cz ',
        }];
        return(
            <div>
                <Table columns={columns} dataSource={dataSource} className="details_list" />
                <Table columns={columnss} dataSource={data} className="operation_column" />
            </div>
        )
    }
}

//编辑促销
@observer class CompilePromotionView extends Component{
    render(){
        const options = [{
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [{
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [{
                    value: 'xihu',
                    label: 'West Lake',
                }],
            }],
        }, {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [{
                value: 'nanjing',
                label: 'Nanjing',
                children: [{
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                }],
            }],
        }];

        function onChange(value) {
            console.log(value);
        }
        return(
            <div className="bianji">
                <div className="compile">编辑促销</div>
                <ul className="left_area">
                    <li>
                        <span>
                            促销区域：
                            <Cascader options={options} onChange={onChange} placeholder="选择促销区域" />
                        </span>
                        <span>
                            商品名称：
                            <Input placeholder="输入商品名称" />
                        </span>
                        <span>
                            水票名称：
                            <Input placeholder="输入水票名称" />
                        </span>
                    </li>
                    <li>
                        <span>
                            活动时间：
                            <RangePicker onChange={onChange} />
                        </span>
                        <span>
                            详细说明：
                            <textarea name="" id="" cols="40" rows="3" width="100" height="50"></textarea>
                        </span>

                    </li>
                </ul>
                <ul className="right_area"> .
                    <span>
                        购买规则：
                        <Button icon="plus" className="add_activity">添加活动</Button>
                    </span>
                    <span>
                        水票发放总数量：
                        <Input placeholder="输入数量" className="count"/>
                        <Button className="unlimited_btn" type="primary">数量不限</Button>
                    </span>
                    <span className="btn_group">
                        <Button type="primary">确认添加</Button>
                        <Button type="dashed" className="cancel">取消</Button>
                    </span>
                </ul>
            </div>
        )
    }
}
module.exports = WaterTicketMarketingView;