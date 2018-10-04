/**
 * Created by LDQ on 2018/9/18
 */
import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
import { Table, Tooltip , Button , Radio , Input , Cascader ,Form , Row, Col , DatePicker } from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

import {actions,data} from "../../store/active/waterTicketActiveListInterface";

@observer class WaterTicketActiveSearchView extends Component{
    searchByAcceptTime(data,dataString){
        actions.selectQueryInfo({acceptTimePeriod:dataString});
        actions.searchWaterTicketActivityList();
    }
    render(){
        return (
            <Form>
                <Row gutter={16}>

                    <Col span={8}>
                        <FormItem label={"处理时间"}>
                            <RangePicker onChange={this.searchByAcceptTime.bind(this)} />
                        </FormItem>
                    </Col>
                    {/*<Col span={8}>*/}
                        {/*<Button type="primary" onClick={actions.getExcel}>导出报表</Button>*/}
                    {/*</Col>*/}
                </Row>
            </Form>
        )

    }
}
@observer class WaterTicketAcceptListView extends Component{
    changePage(pageNum){
        actions.changePage(pageNum)
    }
    render(){
        const columns = [

            {
                title:"序号",
                dataIndex:"number",
                key:"number",
                width:80
            },
            {
                title:"时间",
                dataIndex:"acceptTime",
                key:"acceptTime",
                width:200
            },
            {
                title:"用户名称",
                dataIndex:"nickName",
                key:"nickName",
                width:200
            },
            {
                title:"账号",
                dataIndex:"phoneNum",
                key:"phoneNum",
                width:180
            },
            {
                title:"使用水票",
                dataIndex:"use",
                key:"use",
                width:130
            },
            {
                title:"领取途径",
                dataIndex:"acceptWay",
                key:"acceptWay",
                width:200
            },
            {
                title:"邀请人",
                dataIndex:"invterUserName",
                key:"invterUserName",
                width:100
            }

        ];
        const dataSource = [];
        for(let i = 0;i < data.acceptList.length;i++){

            let item = data.acceptList[i];
            dataSource.push({
                key:i,
                number:(data.pagination.page*10)+(i+1),
                acceptRecordId:item.acceptRecordId,
                acceptTime:item.acceptTime,
                acceptWay:item.acceptWay ,
                invterUserName:item.invterUserName,
                nickName:item.nickName,
                phoneNum:item.phoneNum,
                use:item.use,
            })
        }
        return(
            <Table
                columns={columns}
                dataSource={dataSource}
                scroll={{x:1100,y:600}}
                pagination={{current:data.pagination.page+1,onChange:this.changePage.bind(this),total:data.pagination.total}}
            />
        )
    }
}

@observer class ActiveListView extends Component{
    render(){
        const columns = [

            {
                title:"时间",
                dataIndex:"activityTime",
                key:"activityTime",
                width:80
            },
            {
                title:"活动名称",
                dataIndex:"activityName",
                key:"activityName",
                width:200
            },
            {
                title:"状态",
                dataIndex:"status",
                key:"status",
                width:200
            },
            {
                title:"剩余数量",
                dataIndex:"totalCount",
                key:"totalCount",
                width:180
            },
            {
                title:"接受数量",
                dataIndex:"acceptCount",
                key:"acceptCount",
                width:130
            },
            {
                title:"使用数量",
                dataIndex:"useCount",
                key:"useCount",
                width:200
            }

        ];
        const dataSource = [];
        for(let i = 0;i < data.activeList.length;i++){

            let item = data.activeList[i];
            dataSource.push({
                key:i,
                activityTime:item.activityTime,
                activityName:item.activityName,
                status:item.status ,
                totalCount:item.totalCount,
                acceptCount:item.acceptCount,
                useCount:item.useCount,
            })
        }
        return(
            <Table
                columns={columns}
                dataSource={dataSource}
                scroll={{x:1100,y:600}}
            />
        )
    }
}

@observer class WaterTicketActiveListView extends Component{
    state = { queryStrategy: "online" };
    componentWillMount(){
        actions.onLoad();
    }
    onChange(e){
        this.setState({ queryStrategy: e.target.value });
        actions.setActivityMode(e.target.value);
        actions.searchWaterTicketActivityList();
    }
    render(){
        const { queryStrategy } = this.state;
        return (
            <div>
                <WaterTicketActiveSearchView queryStrategy={queryStrategy}/>
                <Radio.Group value={queryStrategy} onChange={this.onChange.bind(this)} style={{ marginBottom: 16 }} >
                    <Radio.Button value={"online"}>线上促销</Radio.Button>
                    <Radio.Button value={"offline"}>线下促销</Radio.Button>
                </Radio.Group>
                <ActiveListView />
                <WaterTicketAcceptListView />
            </div>

        )
    }
}


module.exports = WaterTicketActiveListView;
