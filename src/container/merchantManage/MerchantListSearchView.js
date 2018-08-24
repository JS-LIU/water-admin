import React, {Component} from 'react'
import {Table, Pagination, Button, Radio, Input, Select, Icon} from 'antd';

const Search = Input.Search;
import {observer, inject} from 'mobx-react';

import {data, actions} from '../../store/merchant/merchantSearchInterface';
import merchantAuditStyle from './css/merchantAudit.css';

@observer class MerchantListSearchView extends Component {
    componentWillMount() {
        actions.onLoad();
    }

    render() {
        return (
            <div>
                <MerchantListQueryView/>
                <MerchantListView/>
            </div>
        )
    }
}

// 搜索
@observer class MerchantListQueryView extends Component {
    state = {queryType: 0};

    onChange(e) {
        this.setState({queryType: e.target.value});
        if (e.target.value === 0) {
            actions.getPersonalList();
        } else {
            actions.getCorporateList();
        }
    }

    handleChange() {

    }

    render() {
        const {queryType} = this.state;
        return (
            <div>
                <div className='all_search_box mb15'>
                    <div>
                        <span>店铺名称:</span>
                        <Search
                            placeholder="输入店铺名称"
                            onSearch={value => {
                                actions.setQueryInfo({shopName: value});
                                actions.queryByQueryInfo();
                            }}
                            enterButton
                            style={{marginBottom: 16}}
                        />
                    </div>
                    <div>
                        <span>店长姓名:</span>
                        <Search
                            placeholder="输入店长姓名"
                            onSearch={value => {
                                actions.setQueryInfo({shopManagerName: value});
                                actions.queryByQueryInfo();
                            }}
                            enterButton
                            style={{marginBottom: 16}}
                        />
                    </div>
                    <div>
                        <span>电话号码:</span>
                        <Search
                            placeholder="输入电话号码"
                            onSearch={value => {
                                actions.setQueryInfo({shopManagerTel: value});
                                actions.queryByQueryInfo();
                            }}
                            enterButton
                            style={{marginBottom: 16}}
                        />
                    </div>
                </div>
                <Radio.Group value={queryType} onChange={this.onChange.bind(this)} style={{marginBottom: 16}}>
                    <Radio.Button value={0}>个人</Radio.Button>
                    <Radio.Button value={1}>公司</Radio.Button>
                </Radio.Group>
            </div>
        )
    }
}
@observer class EditableCell extends Component {
    state = {
        value: this.props.value,
        editable: false,
    };
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });

    };
    check = () => {
        this.setState({ editable: false });
        actions.updateMerchantNum(this.props.shopId,this.state.value);
    };
    edit = () => {
        this.setState({ editable: true });
    };
    render(){
        const { value,editable } = this.state;
        return  (
            <div className="editable-cell">
                {
                    editable ? (
                        <Input
                            value={value}
                            onChange={this.handleChange}
                            onPressEnter={this.check}
                            suffix={
                                <Icon
                                    type="check"
                                    className="editable-cell-icon-check"
                                    onClick={this.check}
                                />
                            }
                        />
                    ) : (
                        <div style={{ paddingRight: 24 }}>
                            {value || '添加水站编号'}
                            <Icon
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}
@observer class MerchantListView extends Component {
    closeMerchant(shopId){
        return ()=>{
            actions.closeMerchant(shopId);
        };
    }
    toTop(shopId){
        return ()=>{
            actions.toTop(shopId);
        }
    }
    changePage(pageNumber){
        actions.changePage(pageNumber);
    }
    render() {
        const columns = [
            {
                title: "商户号",
                dataIndex: "merchantNumber",
                key: "merchantNumber",
                width: 100
            },
            {
                title: "店铺名称",
                dataIndex: "shopName",
                key: "shopName",
                width: 130
            },
            {
                title: "商家编号",
                dataIndex: "shopArtificialNum",
                key: "shopArtificialNum",
                width: 150,
                render: (text, record) => (
                    <EditableCell
                        value={text}
                        shopId={record.shopId}
                    />
                ),
            },
            {
                title: "店铺头像",
                dataIndex: "shopHeaderImg",
                key: "shopHeaderImg",
                width: 200,
                render: (text, record) => (<img src={record.shopHeaderImg}/>)
            },
            {
                title: "店铺属性",
                dataIndex: "shopType",
                key: "shopType",
                width: 100
            },
            {
                title: "所在地区",
                dataIndex: "district",
                key: "district",
                width: 250
            },
            {
                title: "详细地址",
                dataIndex: "addressDetail",
                key: "addressDetail",
                width: 250
            },
            {
                title: "客服电话",
                dataIndex: "serviceTel",
                key: "serviceTel",
                width: 150
            },
            {
                title: "配送时间",
                dataIndex: "deliveryTime",
                key: "deliveryTime",
                width: 150
            },
            {
                title: "配送范围",
                dataIndex: "deliveryRange",
                key: "deliveryRange",
                width: 100
            },
            {
                title: "快递费用",
                dataIndex: "deliveryMoney",
                key: "deliveryMoney",
                width: 100
            },
            {
                title: "店铺图片",
                dataIndex: "shopImg",
                key: "shopImg",
                width: 200,
                render: (text, record) => (<img src={record.shopImg}/>)
            },
            {
                title: "营业执照",
                dataIndex: "licenseImageUrl",
                key: "licenseImageUrl",
                width: 100
            },
            {
                title: "商家介绍",
                dataIndex: "introduce",
                key: "introduce",
                width: 200
            },
            {
                title: "店长姓名",
                dataIndex: "managerName",
                key: "managerName",
                width: 150
            },
            {
                title: "联系电话",
                dataIndex: "managerTel",
                key: "managerTel",
                width: 150
            },
            {
                title: "手持身份证照片",
                dataIndex: "managerImgUrl",
                key: "managerImgUrl",
                width: 200,
                render: (text, record) => (<img src={record.managerImgUrl}/>)
            },
            {
                title: "审核人",
                dataIndex: "auditor",
                key: "auditor",
                width: 100
            },
            {
                title: "店铺类型",
                dataIndex: "merChantType",
                key: "merChantType",
                width: 100
            },
            {
                title: "操作",
                dataIndex: "operate",
                key: "operate",
                width: 200,
                render: (text, record) => {
                    return(<div>
                        <a href="javascript:void(0);" onClick={this.closeMerchant(record.shopId)}>关闭店铺</a>
                        <a href="javascript:void(0);" onClick={this.toTop(record.shopId)}>优先展示</a>
                    </div>)
                }
            }
        ];
        const dataSource = [];
        for (let i = 0; i < data.list.length; i++) {
            let item = data.list[i];
            dataSource.push({
                key: i,
                merchantNumber: item.merchantNumber,
                shopName: item.shopName,
                shopArtificialNum: item.shopArtificialNum,
                shopHeaderImg: item.shopHeaderImg,
                shopType: item.shopType,
                district: item.district,
                addressDetail: item.addressDetail,
                serviceTel: item.serviceTel,
                deliveryTime: item.deliveryTime,
                deliveryRange: item.deliveryRange,
                deliveryMoney: item.deliveryMoney,
                shopImg: item.shopImg,
                licenseImageUrl: item.licenseImageUrl,
                introduce: item.introduce,
                managerName: item.managerName,
                managerTel: item.managerTel,
                managerImgUrl: item.managerImgUrl,
                auditor: item.auditor,
                merChantType: item.merChantType,
                shopId:item.shopId
            })
        }
        return (
            <Table
                className="components-table-demo-nested"
                columns={columns}
                dataSource={dataSource}
                scroll={{x: 3000}}
                pagination={{total:data.pagination.total,defaultCurrent:1,onChange:this.changePage.bind(this),current:data.pagination.page+1}}
            />
        )
    }
}

module.exports = MerchantListSearchView;