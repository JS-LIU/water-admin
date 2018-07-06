
import React, {Component} from 'react'
import { Table , Button , Radio , Input , Select , Upload , Icon , Modal , Divider } from 'antd';
const Search = Input.Search;
import {observer,inject} from 'mobx-react';
const Option = Select.Option;

import {data,actions} from '../../store/product/selfSaleEditProductListInterface';

@observer class SelfSaleEditProductView extends Component{
    componentWillMount(){
        actions.getList();
    }
    render(){
        return (
            <div>
                <SelfSaleEditProductListQueryView/>
                <SelfSaleEditProductListView/>
                {/*<SelfSaleEditProductListDetailView/>*/}
                <SelfSaleEditProductListAddDetailView/>
            </div>
        )
    }
}

// 搜索
class SelfSaleEditProductListQueryView extends Component{
    render(){
        return (
            <div>
                <div className='all_search_box mb15'>
                    <div>
                        <span>商品名称:</span>
                        <Search
                            placeholder="输入店铺名称"
                            onSearch={value => {
                                actions.getList({shopName:value});
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </div>
                    <div>
                        <span>商品品牌:</span>
                        <Search
                            placeholder="输入商品品牌"
                            onSearch={value => {
                                actions.getList({productBrand:value});
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </div>
                    <div>
                        <Button type="primary" onClick={actions.addProduct}>+添加商品</Button>
                    </div>
                </div>
            </div>
        )
    }
}

// list
@observer class SelfSaleEditProductListView extends Component{
    render(){
        const columns = [
            {
                title:'商品名称',
                dataIndex:"productName",
                key:"productName",
                width:200
            },{
                title:'规格',
                dataIndex:"volume",
                key:"volume",
                width:200
            },{
                title:'商品图片',
                dataIndex:"productImg",
                key:"productImg",
                width:150,
                render:(text,record)=>(<img src={record.productImg} />)
            },{
                title: '商品品牌',
                dataIndex:"productTag",
                key: 'productTag',
                width: 100
            },{
                title:'销售价',
                dataIndex:"price",
                key:"price",
                width:100
            },{
                title:'原价',
                dataIndex:"originalPrice",
                key:"originalPrice",
                width:100
            },{
                title:'成本价',
                dataIndex:"costPrice",
                key:"costPrice",
                width:100
            },{
                title:'库存',
                dataIndex:"stockStatus",
                key:"stockStatus",
                width:100
            },{
                title: '促销',
                dataIndex:"productActivity",
                key: 'productActivity',
                width: 100
            },{
                title: '服务',
                dataIndex:"serve",
                key: 'serve',
                width: 100
            },{
                title: '状态',
                dataIndex:"productStatus",
                key: 'productStatus',
                width: 100
            },{
                title: '操作',
                dataIndex:"operate",
                key: 'operate',
                width: 200,
                render: (text, record) => {
                    return (
                        <span>
                          <a href="javascript:void(0);">编辑</a>
                          <Divider type="vertical" />
                          <a href="javascript:void(0);"
                             onClick={ () => {
                                  actions.operate(record.operate[0].title,record.orderId);
                                }
                             }
                          >{record.operate[0].title}</a>
                          <Divider type="vertical" />
                          <a href="javascript:void(0);"
                             onClick={ () => {
                                 actions.operate(record.operate[1].title,record.orderId);
                             }
                             }
                          >{record.operate[1].title}</a>
                        </span>
                    )
                }
            }
        ];
        const dataSource = [];
        for(let i = 0;i < data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
                productId:item.productId,
                productName:item.productName,
                volume:item.volume,
                productImg:item.productImg,
                costPrice:item.costPrice / 100,
                originalPrice:item.originalPrice / 100,
                price:item.price / 100,
                stockStatus:item.stockStatus,
                productActivity:item.productActivity || "----",
                serve:item.serve || "----",
                productTag:item.productTag,
                productStatus:item.productStatus.title,
                operate:item.productStatus.actions
            })
        }
        return (
            <Table
                className="components-table-demo-nested"
                columns={columns}
                dataSource={dataSource}
                scroll={{x: 1550,y:500}}
            />
        )
    }
}

// 编辑商品
@observer class SelfSaleEditProductListDetailView extends Component{
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };
    handleCancel = () => this.setState({ previewVisible: false });
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };
    handleChange = ({ fileList }) => this.setState({ fileList });
    render(){
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return (
            <div className='add_order'>
                <div className='order_detail_header'>添加商品</div>
                <div className="add_detail_section_left" id='add_detail_section_left'>
                    <ul>
                        <li>区域：</li>
                        <li>商品品牌：</li>
                        <li>商品名称：<Input placeholder='填写商品名称'/></li>
                        <li>副标题：<Input placeholder='描述商品特色，卖点，优惠等'/></li>
                        <li>分类：</li>
                        <li>规格：</li>
                        <li>
                            <span>商品头像：</span>
                            <div className="clearfix">
                                <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {fileList.length >= 3 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </li>
                        <li>
                            <span>商品图片：</span>
                            <div className="clearfix">
                                <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {fileList.length >= 3 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </li>
                        <li>价格：<Input placeholder='请输入销售价格'/></li>
                        <li>原价：<Input placeholder='请输入原价'/></li>
                        <li>成本价：<Input placeholder='请输入成本价'/></li>
                        <li>库存：<Input placeholder='请输入库存数'/></li>
                        <li>
                            <span>商品详情：</span>
                            <div className="clearfix">
                                <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {fileList.length >= 3 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </li>
                        <li>促销：<Input placeholder='描述促销活动'/></li>
                        <li>服务：<Input placeholder='2小时送货'/></li>
                        <li>标签：</li>
                    </ul>
                    <div>
                        <Button type="primary" className='mr10' >确认修改</Button>
                        <Button type="primary" >取消</Button>
                    </div>
                </div>
            </div>
        )
    }
}

// 添加商品
@observer class SelfSaleEditProductListAddDetailView extends Component{
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        fileList2: []
    };
    handleCancel = () => this.setState({ previewVisible: false });
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };
    handlePreview2 = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };
    handleChange = ({ fileList }) => {
        this.setState({  fileList  })
    };
    handleChange2 = ({ fileList2 }) => {
        this.setState({ fileList2 })
    };
    render(){
        const { previewVisible, previewImage, fileList, fileList2 } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return (
            <div className='add_order'>
                <div className='order_detail_header'>添加商品</div>
                <div className="add_detail_section_left" id='add_detail_section_left'>
                    <ul>
                        <li>区域：</li>
                        <li>商品品牌：</li>
                        <li>商品名称：<Input placeholder='填写商品名称'/></li>
                        <li>副标题：<Input placeholder='描述商品特色，卖点，优惠等'/></li>
                        <li>分类：</li>
                        <li>规格：</li>
                        <li>
                            <span>商品头像：</span>
                            <div className="clearfix">
                                <Upload
                                    action=""
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {fileList.length >= 3 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </li>
                        <li>
                            <span>商品图片：</span>
                            <div className="clearfix">
                                <Upload
                                    action=""
                                    listType="picture-card"
                                    fileList={fileList2}
                                    onPreview={this.handlePreview2}
                                    onChange={this.handleChange2}
                                >
                                    {uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </li>
                        <li>价格：<Input placeholder='请输入销售价格'/></li>
                        <li>原价：<Input placeholder='请输入原价'/></li>
                        <li>成本价：<Input placeholder='请输入成本价'/></li>
                        <li>库存：<Input placeholder='请输入库存数'/></li>
                        <li>
                            <span>商品详情：</span>
                            <div className="clearfix">
                                {/*<Upload*/}
                                    {/*action="//jsonplaceholder.typicode.com/posts/"*/}
                                    {/*listType="picture-card"*/}
                                    {/*fileList={fileList}*/}
                                    {/*onPreview={this.handlePreview}*/}
                                    {/*onChange={this.handleChange}*/}
                                {/*>*/}
                                    {/*{fileList.length >= 3 ? null : uploadButton}*/}
                                {/*</Upload>*/}
                                {/*<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>*/}
                                    {/*<img alt="example" style={{ width: '100%' }} src={previewImage} />*/}
                                {/*</Modal>*/}
                            </div>
                        </li>
                        <li>促销：<Input placeholder='描述促销活动'/></li>
                        <li>服务：<Input placeholder='2小时送货'/></li>
                        <li>标签：</li>
                    </ul>
                    <div>
                        <Button type="primary" className='mr10' >确认添加</Button>
                        <Button type="primary" >取消</Button>
                    </div>
                </div>
            </div>
        )
    }
}


module.exports = SelfSaleEditProductView;