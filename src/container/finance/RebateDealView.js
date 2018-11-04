import React, {Component} from 'react';
import {Input, Button, Table, Icon, Col, Select, InputNumber, DatePicker, Form} from 'antd';
import LockLineView from '../../components/LockLineView';
import ClearSuffixInput from "../../components/ClearSuffixInput";

const FormItem = Form.Item;
import rebateDealStyle from './css/rebateDealStyle.css';
const InputGroup = Input.Group;
const Option = Select.Option;
import {observer,inject} from 'mobx-react';
import {data,actions} from '../../store/finance/rebateDealInterface';

@observer class RebateDealView extends Component{
    componentWillMount(){
        actions.onLoad();
    }
    render(){
        return(
            <div>
                <RebateDisposeInquireView />
                <RebateDisposeDetails />
                <RebateOperation />
            </div>
        )
    }
}
//搜索区域
@observer class RebateDisposeInquireView extends Component{
    state = {
        loading: false,
        // orderType:'all'
    };

    enterLoading = () => {
        this.setState({ loading: true });
        actions.queryByQueryInfo(()=>{this.setState({
            loading: false
        })});
    };
    render(){
        return(
            <Form layout="inline">
                <FormItem label={"编号查询"}>
                    <ClearSuffixInput
                        changeHandle={(shopAlians)=>actions.setQueryInfo({shopAlians:shopAlians})}
                        clearHandle={()=>actions.setQueryInfo({shopAlians:null})}
                        placeholder="输入店铺编号"
                    />
                </FormItem>
                <FormItem label={"名称查询"}>
                    <ClearSuffixInput
                        changeHandle={(shopName)=>actions.setQueryInfo({shopName:shopName})}
                        clearHandle={()=>actions.setQueryInfo({shopName:null})}
                        placeholder="输入店铺名称"
                    />
                </FormItem>
                <FormItem label={"电话查询"}>
                    <ClearSuffixInput
                        changeHandle={(phoneNum)=>actions.setQueryInfo({phoneNum:phoneNum})}
                        clearHandle={()=>actions.setQueryInfo({phoneNum:null})}
                        placeholder="输入电话号码"
                    />
                </FormItem>
                <FormItem>
                    <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
                        查询
                    </Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" >重置</Button>
                </FormItem>
                {/*<FormItem>*/}
                    {/*<Button type="primary" onClick={actions.getExcel}>导出报表</Button>*/}
                {/*</FormItem>*/}
            </Form>
        )
    }
}

//各店铺返利详情
@observer class RebateDisposeDetails extends Component{
    state={
        activeLineIndex:-1,
        otherRowClass:"",
    };
    setActiveLineIndex(index){
        this.setState({
            activeLineIndex:index,
            tableHeight:100
        });
    }
    setClassName(record, index){
        return index === this.state.activeLineIndex?"activeRowStyle":this.state.otherRowClass;
    }
    changeOtherRowClass(lockState){
        if(lockState === "lock"){
            this.setState({
                otherRowClass:"",
            })
        }else{
            this.setState({
                otherRowClass:"hiddenRowStyle",
            })
        }
    }
    render(){
        const columns = [{
            title:'锁定',
            dataIndex:'lock',
            key:'lock',
            width:75,
            render:(text,record)=>{
                return (<LockLineView clickHandle={this.changeOtherRowClass.bind(this)}/>)
            }
        }, {
            title: '月份',
            dataIndex: 'month',
            key: 'month',
            width:80
        }, {
            title: '店铺编号',
            dataIndex: 'shopAlians',
            key: 'shopAlians',
            width:100
        }, {
            title: '店铺名称',
            dataIndex: 'shopName',
            key: 'shopName',
            width:150
        }, {
            title: '联系电话',
            dataIndex: 'phoneNum',
            key: 'phoneNum',
            width:150
        },{
            title: '总进货数量（桶）',
            dataIndex: 'totalMount',
            key: 'totalMount',
            width:150
        }, {
            title: '返利标准（元）',
            dataIndex: 'rebatePrice',
            key: 'rebatePrice',
            width:150
        }, {
            title: '返利金额（元）',
            dataIndex: 'rebateResult',
            key: 'rebateResult',
            width:150
        },{
            title:"评论",
            dataIndex:'remark',
            key:"remark",
            width:100
        },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width:100
        }];
        const dataSource = [];
        for(let i = 0;i < data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
                month:item.month+"月",
                shopAlians:item.shopAlians,
                shopName:item.shopName,
                phoneNum:item.phoneNum,
                totalMount :item.totalMount ,
                rebatePrice:parseFloat(item.rebatePrice) / 100,
                remark:item.remark,
                status:item.status,
                rebateId:item.rebateId,
                productItemList:item.productItemList,
                rebateResult:item.realRebateResultInYuan
            })
        }
        const expandedRowRender = record => {
            const columns = [
                { title: "商品名称", dataIndex: "productName" , key: 'productName',width:300},
                { title: '数量', dataIndex: "saleMount", key: 'saleMount' },
            ];
            const dataSource = [];
            for(let i = 0;i < record.productItemList.length;i++){
                let item = record.productItemList[i];
                dataSource.push({
                    key:i,
                    productName:item.productName,
                    saleMount:item.saleMount,
                })
            }

            return (
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
            );
        };
        return(
            <Table
                columns={columns}
                dataSource={dataSource}
                scroll={{y:300,x:1130}}
                expandedRowRender={expandedRowRender}
                rowClassName={this.setClassName.bind(this)}
                onRow={(record,index) => {
                    return {
                        onClick: () => {
                            actions.selectRebateItem(record.rebateId);
                            this.setActiveLineIndex(index);
                        }
                    };
                }}
                pagination={{defaultCurrent:data.pagination.page+1,onChange:value => actions.changePage(value),total:data.pagination.total}}
            />
        )
    }
}

//返利操作
@observer class RebateOperation extends Component{
    confirmRebate(){
        actions.confirmRebate();
    }
    render(){
        const columns = [
            { title: "商品名称", dataIndex: "productName" , key: 'productName',width:300},
            { title: '数量', dataIndex: "saleMount", key: 'saleMount' },
        ];
        const dataSource = [];
        for(let i = 0;i < data.activeItem.productItemList.length;i++){
            let item = data.activeItem.productItemList[i];
            dataSource.push({
                key:i,
                productName:item.productName,
                saleMount:item.saleMount,
            })
        }
        let getRealRebateWrapper = function(){
            if (data.activeItem.getRealRebate){
                return data.activeItem.getRealRebate("rmb")
            }
        };
        return(
            <div className="operation">
                <div className='order_detail_header'>
                    <span>返利操作</span>
                </div>

                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
                <ul>
                    <li className="rebate_list">
                        <span>实际总进货数量（桶）: {data.activeItem.totalMount}</span>
                        <span>应该返利金额（/元）: {getRealRebateWrapper()}</span>
                        <div style={{display:"flex"}}>
                            <span>实际返利喜币:</span>
                            <InputNumber value={getRealRebateWrapper()} onChange={value => actions.setRealResult(value ,'rmb', 'yuan')}/>
                            <span>元</span>
                        </div>
                        <span>
                            备注：
                            <Input type="textarea" placeholder="填写备注" rows={4} style={{ width: 363, height:130}}/>
                        </span>
                        <Button type="primary" onClick={() => actions.confirmRebate("xtb")} className="rebate_btn">确认返利</Button>
                    </li>
                </ul>
            </div>
        )
    }
}

module.exports = RebateDealView;