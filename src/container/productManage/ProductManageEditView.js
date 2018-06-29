
import React,{Component} from 'react';
import {observer,inject} from 'mobx-react';
import { Table, Pagination , Button , Radio , Input , Select , Upload , Icon , Modal } from 'antd';
const Search = Input.Search;
const Option = Select.Option;

// import {actions} from "../../store/merchant/merchantAuditInterface";
import {actions} from "../../store/product/Product";

@observer class ProductManageEditView extends Component{
    render(){
        return(
            <div>
                {/*<EditProductListQueryView />*/}
                {/*<EditProductListView />*/}
                {/*<AddCommodityView />*/}
                <EditCommodityView />
            </div>
        )
    }
}

// 搜索
class EditProductListQueryView extends Component{
    state = { queryType: 0 };
    onChange(e){
        this.setState({ queryType: e.target.value });
        if(e.target.value==0){
            actions.selectAllowList();
        }else{
            actions.selectRejectList();
        }
    }
    handleChange(){

    }
    render(){
        const { queryType } = this.state;
        return (
            <div>
                <div className='all_search_box mb15'>
                    <div>
                        <span>商品名称:</span>
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
                        <span>商品品牌:</span>
                        <Search
                            placeholder="输入商品品牌"
                            onSearch={value => {
                                actions.setQueryInfo({shopManagerName:value});
                                actions.queryByQueryInfo();
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </div>
                    <div>
                        <span>商品分类:</span>
                        <Search
                            placeholder="输入商品分类"
                            onSearch={value => {
                                actions.setQueryInfo({shopManagerTel:value});
                                actions.queryByQueryInfo();
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </div>
                    <div>
                        <Button type="primary">+添加订单</Button>
                    </div>
                </div>
                <Radio.Group value={queryType} onChange={this.onChange.bind(this)} style={{ marginBottom: 16 }} >
                    <Radio.Button value={0}>在售中</Radio.Button>
                    <Radio.Button value={1}>待上架</Radio.Button>
                </Radio.Group>
            </div>
        )
    }
}

// list
@observer class EditProductListView extends Component{
    render(){
        return (
            <div>
                table
            </div>
        )
    }
}

// 详情== 编辑商品
@observer class EditCommodityView extends Component{
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
                        <Button type="primary" className='mr10' >确认添加</Button>
                        <Button type="primary" >取消</Button>
                    </div>
                </div>
            </div>
        )
    }
}

// 添加商品
@observer class AddCommodityView extends Component{
    render(){
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
                        <li>商品头像：</li>
                        <li>商品图片：</li>
                        <li>价格：<Input placeholder='请输入销售价格'/></li>
                        <li>原价：<Input placeholder='请输入原价'/></li>
                        <li>成本价：<Input placeholder='请输入成本价'/></li>
                        <li>库存：<Input placeholder='请输入库存数'/></li>
                        <li>商品详情：</li>
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

module.exports = ProductManageEditView;
