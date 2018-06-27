import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
import { Input , Button , Radio ,Table, Icon } from 'antd';
const Search = Input.Search;

import waterTicketMarkingStyle from './css/waterTicketMarkingStyle.css';

@observer class WaterTicketMarkingView extends Component{
    render(){
        return(
            <div>
                <WaterTicketMarkingInquireView/>
                <WaterTicketEventDetailsView />
                <CompilePromotionView />
            </div>
        )
    }
}
//搜索区域
@observer class WaterTicketMarkingInquireView extends Component{
    render(){
        return(
            <div>
                <div className='search_view'>
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

                <Radio.Group style={{ marginBottom: 16,marginLeft:10 ,marginTop:20}} >
                    <Radio.Button value={0}>最新水票活动</Radio.Button>
                    <Radio.Button value={1}>历史水票活动</Radio.Button>
                </Radio.Group>
            </div>

        )
    }
}

//水票活动详情
@observer class WaterTicketEventDetailsView extends Component{
    render(){
        const columns = [{
            itle: '区域',
            dataIndex: 'quyu',
            key: '区域',
        }, {
            title: '水票名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '商品名称',
            dataIndex: 'shopname',
            key: 'shopname',
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
            title: '详情说明',
            dataIndex: 'xqsm',
            key: 'xqsm',
        }, {
            title: '状态',
            dataIndex: 'zt',
            key: 'zt',
        }, {
            title: '操作',
            dataIndex: 'cz',
            key: 'cz',
        }];
        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
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
        return(
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}
//编辑促销
@observer class CompilePromotionView extends Component{
    render(){
        return(
            <div>
                <div className="bianji">编辑促销</div>
                <ul className="area_left">
                    <span>
                        促销区域：

                    </span>
                </ul>
                <ul className="area_right"></ul>
            </div>
        )
    }
}


module.exports = WaterTicketMarkingView;