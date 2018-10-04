import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
import {data,actions} from '../../store/finance/rebateListSearchInterface';

import { Table, Tooltip , Button , Radio , Input , Cascader ,Form , Row, Col , DatePicker } from 'antd';
const Search = Input.Search;

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
    state = { rebateStatus: "create" };
    onChange(e){
        this.setState({ rebateStatus: e.target.value });
        actions.changeType(e.target.value);
    }
    render(){
        const { rebateStatus } = this.state;
        return(

            <div>
                <Form>
                    <Row gutter={16}>
                        <Col span={8}>
                            <FormItem label={"编号查询"}>
                                <Search
                                    placeholder="输入店铺编号"
                                    onSearch={value => {
                                        actions.setQueryInfo({shopAlians:value});
                                        actions.queryByQueryInfo();
                                    }}
                                    enterButton
                                />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={"店铺名称查询"}>
                                <Search
                                    placeholder="输入店铺名称"
                                    onSearch={value => {
                                        actions.setQueryInfo({shopName:value});
                                        actions.queryByQueryInfo();
                                    }}
                                    enterButton
                                />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={"电话号码查询"}>
                                <Search
                                    placeholder="输入电话号码"
                                    onSearch={value => {
                                        actions.setQueryInfo({phoneNum:value});
                                        actions.queryByQueryInfo();
                                    }}
                                    enterButton
                                />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={"付款时间"}>
                                <RangePicker onChange={this.searchByPayTime.bind(this)} />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={"处理时间"}>
                                <RangePicker onChange={this.searchByDispatchTime.bind(this)} />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <Button type="primary" onClick={actions.getExcel}>导出报表</Button>
                        </Col>
                    </Row>
                </Form>
                <Radio.Group value={rebateStatus} onChange={this.onChange.bind(this)} style={{ marginBottom: 16 }} >
                    <Radio.Button value={"create"}>待返利</Radio.Button>
                    <Radio.Button value={"over"}>已返利</Radio.Button>
                </Radio.Group>
            </div>

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
            dataIndex: 'realRebateResult',
            key: 'realRebateResult',
            width:120
        }, {
            title:"单位",
            dataIndex:"rebateCurrencyType",
            key:"rebateCurrencyType",
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
                repairResult:item.repairResult,
                shopAlians:item.shopAlians,
                shopName:item.shopName,
                phoneNum:item.phoneNum,
                totalMount :item.totalMount ,
                rebatePrice:parseFloat(item.rebatePrice) / 100,
                rebateCurrencyType:item.rebateCurrencyType,
                remark:item.remark,
                status:item.status,
                rebateId:item.rebateId,
                productItemList:item.productItemList,
                realRebateResult:item.realRebateResult
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