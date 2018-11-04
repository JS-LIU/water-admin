import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
import {data,actions} from '../../store/finance/rebateListSearchInterface';

import { Table, Tooltip , Button , Radio , Input ,Icon, Cascader ,Form , Row, Col , DatePicker } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
import ClearSuffixInput from '../../components/ClearSuffixInput';
import RadioQueryTabList from '../../components/RadioQueryTabList';
@observer class RebateSearchView extends Component{
    componentWillMount(){
        actions.onLoad();
    }
    render(){
        return(
            <div>
                <RebateInquireView />
                <CommodityDetailsTable />
            </div>
        )
    }
}


//搜索区域
@observer class RebateInquireView extends Component{
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
                <FormItem label={"订单状态"}>
                    <RadioQueryTabList defaultValue={'create'}
                                       changeHandle={(targetValue) => actions.setQueryInfo({rebateStatus:targetValue})}
                                       radioList={[
                                           {key:"create",name:"待返利"},
                                           {key:"over",name:"已返利"}]}
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
                <FormItem>
                    <Button type="primary" onClick={actions.getExcel}>导出报表</Button>
                </FormItem>
            </Form>
        )
    }
}

@observer class EditableCell extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
            editable: false
        };
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    };
    check = () => {
        this.setState({ editable: false });
        actions.repairRebate(this.props.rebateId,this.state.value);

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
                            {this.props.value || '暂无第二次修改'}
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

//商品详情表格
@observer class CommodityDetailsTable extends Component{
    render(){
        const columns = [{
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
            title: '第一次返利',
            dataIndex: 'firstRebateResult',
            key: 'firstRebateResult',
            width:120
        }, {
            title:"单位",
            dataIndex:"repairRebateCurrencyType",
            key:"repairRebateCurrencyType",
            width:80,
        },{
            title: "补充返利",
            dataIndex: "repairResult",
            key: "repairResult",
            width: 150,
            render: (text, record) => (
                <EditableCell
                    value={record.repairResult}
                    rebateId={record.rebateId}
                />
            ),
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
                repairResult:item.getShowRepairResult(),
                shopAlians:item.shopAlians,
                shopName:item.shopName,
                phoneNum:item.phoneNum,
                totalMount :item.totalMount ,
                rebatePrice:parseFloat(item.rebatePrice) / 100,
                repairRebateCurrencyType:item.repairRebateCurrencyType,
                remark:item.remark,
                status:item.status,
                rebateId:item.rebateId,
                productItemList:item.productItemList,
                firstRebateResult:item.getFirstRebateResult()
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
                scroll={{x:1000}}
                expandedRowRender={expandedRowRender}
                pagination={{total:data.pagination.total,current:data.pagination.page+1,onChange:value => actions.changePage(value)}}
            />
        )
    }
}




module.exports = RebateSearchView;