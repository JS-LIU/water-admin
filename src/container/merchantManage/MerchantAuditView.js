

import React, {Component} from 'react'
import { Table, Pagination , Button , Radio , Input , Select } from 'antd';
const Search = Input.Search;
import {observer,inject} from 'mobx-react';
const Option = Select.Option;

import {data,actions} from '../../store/merchant/merchantAuditInterface';
// import {data,actions} from '../../store/merchant/merchantSearchInterface';
import merchantAuditStyle from './css/merchantAudit.css';
import merchantAuditDataStyle from './css/merchantAuditData.css';

@inject (['shopListContainer'])
@observer class MerchantAuditView extends Component{
    componentWillMount(){
        actions.onLoad();
    }
    render(){
        return (
            <div>
                <MerchantAuditListQueryView />
                <MerchantAuditListView />
                <MerchantAuditDataView />
            </div>
        )
    }
}

// 搜索  （店铺属性）
class MerchantAuditListQueryView extends Component{
    state = { queryType: 0 };
    onChange(e){
        this.setState({ queryType: e.target.value });
        switch (e.target.value){
            case 0:
                return actions.onLoad;
                break;
            case 1:
                return actions.selectAllowList;
                break;
            case 2:
                return actions.selectRejectList;
                break;
            default:
                break;
        }
        actions.rejectList();
    }
    handleChange(){

    }
    render(){
        const { queryType } = this.state;
        return (
            <div>
                <div className='all_search_box mb15'>
                    <div>
                        <span>店铺名称:</span>
                        <Search
                            placeholder="输入店铺名称"
                            onSearch={value => {
                                actions.setQueryInfo({shopName:value});
                                actions.queryByQueryInfo();
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </div>
                    <div>
                        <span>店长姓名:</span>
                        <Search
                            placeholder="输入店长姓名"
                            onSearch={value => {
                                actions.setQueryInfo({managerName:value});
                                actions.queryByQueryInfo();
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </div>
                    <div>
                        <span>电话号码:</span>
                        <Search
                            placeholder="输入电话号码"
                            onSearch={value => {
                                actions.setQueryInfo({managerTel:value});
                                actions.queryByQueryInfo();
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </div>
                    <div>店铺属性：
                        <Select defaultValue="lucy" style={{ width: 200 }} onChange={this.handleChange()}>
                            <Option value="lucy">选择店铺属性</Option>
                            <Option value="jack">Jack</Option>
                            {/*<Option value="jack">Jack</Option>*/}
                        </Select>
                    </div>
                    <div>
                        <Button type="primary">+添加订单</Button>
                    </div>
            </div>
                <Radio.Group value={queryType} onChange={this.onChange.bind(this)} style={{ marginBottom: 16 }} >
                    <Radio.Button value={0}>全部</Radio.Button>
                    <Radio.Button value={1}>待审核</Radio.Button>
                    <Radio.Button value={2}>未通过</Radio.Button>
                </Radio.Group>
            </div>
        )
    }
}

// list
@observer class MerchantAuditListView extends Component{
    changePage(pageNumber){
        actions.changePagination(pageNumber);
    }
    render(){
        const columns = [
            {
            title:'申请时间',
            dataIndex:"applyTime",
            key:"applyTime",
            width:200
        },{
            title:'店铺名称',
            dataIndex:"shopName",
            key:"shopName",
            width:200
        },{
            title:'店铺属性',
            dataIndex:"shopType",
            key:"shopType",
            width:200
        },{
            title:'所在地区',
            dataIndex:"district",
            key:"district",
            width:200
        },{
            title:'详细地址',
            dataIndex:"addressDetail",
            key:"addressDetail",
            width:300
        },{
            title:'客服电话',
            dataIndex:"serviceTel",
            key:"serviceTel",
            width:200
        },{
            title:'营业执照',
            dataIndex:"licenseImageUrl",
            key:"licenseImageUrl",
            width:200
        },{
            title:'店长姓名',
            dataIndex:"managerName",
            key:"managerName",
            width:200
        },{
            title:'联系人电话',
            dataIndex:"managerTel",
            key:"managerTel",
            width:200
        },{
            title:'手持身份证照片',
            dataIndex:"managerImgUrl",
            key:"managerImgUrl",
            width:200,
            render:(text,record)=>(<img src={record.managerImgUrl} />)
        },{
            title: '审核状态',
            dataIndex:"auditStatus",
            key: 'auditStatus',
            width: 100,
            render: (text,record) =>{
                return(<span>{record.auditStatus.title}</span>)
            }
        },{
            title: '操作',
            dataIndex:"operate",
            key: 'operate',
            width: 100,
            render: (text,record) =>{
                return(<a href="javascript:;">{record.operate.operate}</a>)
            }
        }
        ];
        const dataSource = [];
        for(let i = 0;i < data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
                applyTime:item.applyTime,
                shopName:item.shopName,
                shopType:item.shopType,
                district:item.district,
                addressDetail:item.addressDetail,
                serviceTel:item.serviceTel,
                licenseImageUrl:item.licenseImageUrl,
                managerName:item.managerName,
                managerTel:item.managerTel,
                managerImgUrl:item.managerImgUrl,
                auditStatus:item.auditStatus,
                operate:item.auditStatus
            })
        }
        return (
            <Table
                className="components-table-demo-nested"
                columns={columns}
                dataSource={dataSource}
                scroll={{x: 2300,y:300}}
                onRow={(record)=>{
                    return {
                        onClick:()=>{
                            console.log(record.key)
                            actions.getDetail()
                        }
                    }
                }}
                pagination={{total:20,defaultCurrent:1,onChange:this.changePage.bind(this)}}
            />
        )
    }
}

// 详情
class MerchantAuditDataView extends Component{
    render(){
        return (
            <div className='merchant_audit_data'>
                <div className='order_detail_header'>审核资料</div>
                <div className='audit_material_container'>
                    <h5>店主信息</h5>
                    <ul>
                        <li>店铺属性：</li>
                        <li>店主姓名：</li>
                        <li>联系电话：</li>
                        <li>手持身份证照片：</li>
                    </ul>
                    <h5 className='audit_material_header'>店铺信息</h5>
                    <ul>
                        <li>店铺名称：</li>
                        <li>所在地区：</li>
                        <li>详细地址：</li>
                        <li>客服电话：</li>
                        <li>配送时间：</li>
                        <li>店铺头像：</li>
                        <li>店铺图片：</li>
                        <li>营业执照：</li>
                        <li>配送范围：</li>
                        <li>快递费用：</li>
                    </ul>
                    <div className='provider_introduce'>
                        <span>商家介绍：</span>
                        <span>
                            <Button type="primary" className='mr50'>同意</Button>
                            <Button type="danger">拒绝</Button>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}


module.exports = MerchantAuditView;