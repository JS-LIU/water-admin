import React, {Component} from 'react'
import {observer,inject} from 'mobx-react';
import { Table, Pagination , Button , Radio , Input , Select , List , TimePicker ,Slider } from 'antd';
import moment from 'moment';
const Search = Input.Search;
const Option = Select.Option;
import Avatar from '../Avatar';

import {data,actions} from '../../store/merchant/merchantAuditInterface';
import merchantAuditStyle from './css/merchantAudit.css';
import merchantAuditDataStyle from './css/merchantAuditData.css';

@observer class MerchantAuditView extends Component{
    state = {
        isShow:true
    }
    componentWillMount(){
        actions.onLoad();
    }
    getNewShow(newState){
        this.setState({
            isShow:newState.isShow
        })
    }
    render(){
        return (
            <div>
                <MerchantAuditListQueryView isShow={this.state.isShow} onChange={this.getNewShow.bind(this)} />
                <MerchantAuditListView isShow={this.state.isShow} onChange={this.getNewShow.bind(this)} />
                {
                    this.state.isShow?(<MerchantAuditDatailView />):(<AddMerchantAuditView />)
                }
            </div>
        )
    }
}

// 搜索
class MerchantAuditListQueryView extends Component{
    state = { queryType: 0 };
    onChange(e){
        this.setState({ queryType: e.target.value });
        if(e.target.value === 0){
            actions.selectAllowList();
        }else{
            actions.selectRejectList();
        }
    }
    addMerchant(){
        actions.addMerchantShop();
        this.props.onChange({
            isShow:false
        })
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
                                actions.setQueryInfo({shopManagerName:value});
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
                                actions.setQueryInfo({shopManagerTel:value});
                                actions.queryByQueryInfo();
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </div>
                    <div>
                        <Button type="primary" onClick={this.addMerchant.bind(this)} >+添加店铺</Button>
                    </div>
            </div>
                <Radio.Group value={queryType} onChange={this.onChange.bind(this)} style={{ marginBottom: 16 }} >
                    <Radio.Button value={0}>待审核</Radio.Button>
                    <Radio.Button value={1}>未通过</Radio.Button>
                </Radio.Group>
            </div>
        )
    }
}

// list
@observer class MerchantAuditListView extends Component{
    changePage(pageNumber){
        actions.changePage(pageNumber);
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
            dataIndex:"merchantType",
            key:"merchantType",
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
                merchantType:item.merchantType,
                district:item.district,
                addressDetail:item. addressDetail,
                serviceTel:item.serviceTel,
                licenseImageUrl:item.licenseImageUrl,
                managerName:item.managerName,
                managerTel:item.managerTel,
                managerImgUrl:item.managerImgUrl,
                auditStatus:item.auditStatus,
                operate:item.auditStatus,
                shopId:item.shopId
            })
        }
        return (
            <Table
                className="components-table-demo-nested"
                columns={columns}
                dataSource={dataSource}
                scroll={{x: 2300,y:420}}
                onRow={(record)=>{
                    return {
                        onClick:()=>{
                            actions.selectMerchant(record.shopId);
                            this.props.onChange({
                                isShow:true
                            })
                        }
                    }
                }}
                pagination={{total:data.pagination.total,defaultCurrent:1,onChange:this.changePage.bind(this)}}
            />
        )
    }
}

// 详情
@observer class MerchantAuditDatailView extends Component{
    agree(){
        actions.allow()
    }
    reject(){
        actions.notAllow()
    }
    render(){
        let merchantPicNodes = data.detail.shopDetailImg.map((picItem,index)=>{
            return (
                <img key={index} src={picItem} alt=""/>
            )
        });
        return (
            <div className='merchant_audit_data'>
                <div className='order_detail_header'>审核资料</div>
                <div className='audit_material_container'>
                    <h5>店主信息</h5>
                    <ul>
                        <li>店铺属性：{data.detail.merchantType}</li>
                        <li>店主姓名：{data.detail.shopOwnerName}</li>
                        <li>联系电话：{data.detail.shopOwnerTel}</li>
                        <li>手持身份证照片：<img src={data.detail.idCardImageUrl} alt=""/></li>
                    </ul>
                    <h5 className='audit_material_header'>店铺信息</h5>
                    <ul>
                        <li>店铺名称：{data.detail.shopName}</li>
                        <li>所在地区：{data.detail.mappingAddress}</li>
                        <li>详细地址：{data.detail.appendAddress}</li>
                        <li>客服电话：{data.detail.serviceTel[0]}</li>
                        <li>配送时间：{data.detail.deliverTime}</li>
                        <li>店铺头像：<img src={data.detail.shopIconImg} /></li>
                        <li>店铺图片：{merchantPicNodes}</li>
                        <li>营业执照：<img src={data.detail.businessLicenseImg} alt=""/></li>
                        <li>配送范围：{data.detail.deliveryScope}km</li>
                        <li>快递费用：{data.detail.freight}</li>
                    </ul>
                    <div className='provider_introduce'>
                        <span>商家介绍：{data.detail.merchantDiscription}</span>
                        <span>
                            <Button type="primary" className='mr50' onClick={this.agree} >同意</Button>
                            <Button type="danger" onClick={this.reject}>拒绝</Button>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

// 添加店铺
@observer class AddMerchantAuditView extends Component{
    createMerchant(){
        actions.createMerchant();
    }
    render(){
        return (
            <div className='add_order'>
                <div className='order_detail_header'>添加店铺</div>
                <div className="add_detail_section_left" id='add_detail_section_left'>
                    <ul>
                        <li>店铺名称：<Input onBlur={e => actions.setShopName(e.target.value)} placeholder="请填写店铺名称" /></li>
                        {/*<li>商家编号：<Input onBlur={this.inputShopAli} placeholder='请输入商家编号'/></li>*/}
                        <li>店铺头像：
                            <Avatar name={"file"} afterAction={actions.setShopHeaderImg}/>
                        </li>
                        <li>店铺图片：
                            <Avatar name={"file"} afterAction={actions.setShopImg}/>
                        </li>
                        <li>店铺属性：
                            <Select defaultValue="unSelect" style={{ width: 200 }} onChange={value => {actions.setMerchantType(value)}}>
                                <Option value="unSelect">选择店铺类型</Option>
                                <Option value="personal">个人店铺</Option>
                                <Option value="corporate">公司店铺</Option>
                            </Select>
                        </li>
                        <li>联系电话：<Input onBlur={e => actions.setServiceTel(e.target.value)} placeholder='请输入联系电话'/></li>
                        <li>所在地区：
                            <Input onChange={e => actions.inputMappingAddress(e.target.value)} value={data.mappingAddress} placeholder='搜索地址'/>
                            <DistrictList />
                        </li>
                        <li>详细地址：<Input onChange={e => actions.setAppendingAddress(e.target.value)} value={data.appendingAddress} placeholder='请输入详细地址'/></li>
                        <li>配送时间：
                            <TimePicker defaultValue={moment('09:00:00', 'HH:mm:ss')} onChange={(time,timeString) => {actions.setStartTime(timeString)}}/>
                            <TimePicker defaultValue={moment('17:00:00', 'HH:mm:ss')} onChange={(time,timeString) => {actions.setEndTime(timeString)}}/>
                        </li>
                        <li>配送范围：
                            <Slider range step={1} defaultValue={[0, 10]} max={10} onAfterChange={value => actions.setDeliveryRange(value)}/>
                        </li>
                        <li>快递费用：<Input onBlur={e => actions.setDeliveryMoney(e.target.value)} placeholder='请输入快递费用'/></li>
                        <li>商家介绍：<Input onBlur={e => actions.setIntroduce(e.target.value)} placeholder='请填写商家介绍，有助于提高销售业绩'/></li>
                        <li>分配账号：<Input onBlur={e => actions.setManagerTel(e.target.value)} placeholder='申请人手机号'/></li>
                        <li>默认密码：666666</li>
                    </ul>
                    <div className='add_detail_section_bottom'>
                        <span>
                            <Button type="primary" className='mr10' onClick={this.createMerchant}>确认添加</Button>
                            <Button type="primary" >取消</Button>
                        </span>
                        <span>
                            操作人：张潇潇
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
@observer class DistrictList extends Component{
    selectAddress(location){
        return ()=>{
            actions.selectAddress(location);
        }
    }
    render(){
        return (
            <List
                size="small"
                bordered
                dataSource={data.districtList}
                renderItem={item => (<List.Item onClick={this.selectAddress(item)}>{item.fullAddress}</List.Item>)}
            />
        )
    }
}

module.exports = MerchantAuditView;