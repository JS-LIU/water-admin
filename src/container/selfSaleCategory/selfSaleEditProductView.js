
import React, {Component} from 'react'
import { Table , Button , Radio , Input , Select , Icon , Modal , Divider , Form , Row, Col } from 'antd';
import Avatar from '../Avatar';
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

import {observer,inject} from 'mobx-react';
import {data,actions} from '../../store/product/selfSaleEditProductListInterface';

import formStyle from './css/formStyle.css';

@observer class SelfSaleEditProductView extends Component{
    componentWillMount(){
        actions.onLoad();
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
                          <a href="javascript:void(0);" onClick={() => {
                              actions.editProduct(record.productId);
                          }}>编辑</a>
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

// 添加商品
@observer class SelfSaleEditProductListAddDetailView extends Component{
    getBrandNodes(){
        return data.brandList.map((brand,index)=>{
            return (
                <Option key={index} value={brand.id}>{brand.name}</Option>
            )
        });
    }
    getCategoryNodes(){
        return data.categoryList.map((category,index)=>{
            return (
                <Option key={index} value={category.id}>{category.name}</Option>
            )
        })
    }
    getShopNodes(){
        return data.selfMerchantList.map((shop,index)=>{
            return (
                <Option key={index} value={shop.shopId}>{shop.shopName}</Option>
            )
        })
    }
    render(){
        return (
            <div className='add_order'>
                <div className='order_detail_header'>添加商品</div>
                <Form className="add_detail_section_left" id='add_detail_section_left'>
                    <Row gutter={16}>
                        <Col span={6}>
                            <FormItem label={"选择店铺"}>
                                <Select value={data.shopId || "def"} onChange={value => actions.setShopList(value)}>
                                    <Option value="def">-选择店铺-</Option>
                                    {this.getShopNodes()}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"商品品牌"}>
                                <Select defaultValue="def" onChange={value => actions.setBrand(value)}>
                                    <Option value="def">-选择品牌-</Option>
                                    {this.getBrandNodes()}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"商品名称"}>
                                <Input placeholder="填写商品名称" onChange={e => actions.setProductName(e.target.value)} value={data.productName}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"副标题"}>
                                <Input placeholder="描述商品特色，卖点，优惠等" onBlur={e => actions.setProductDescribe(e.target.value)}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"分类"}>
                                <Select defaultValue="def" onChange={value => actions.setCategory(value)}>
                                    <Option value="def">-选择品牌-</Option>
                                    {this.getCategoryNodes()}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"规格"}>
                                <Input placeholder="输入规格" onChange={e => actions.setVolume(e.target.value)} value={data.volume}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"商品头像"}>
                                <Avatar name={"file"} afterAction={actions.setHeaderImg}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"商品图像"}>
                                <Avatar name={"file"} imageUrl={data.productImg} afterAction={actions.setProductImg}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"价格"}>
                                <Input onChange={e => actions.setPrice(e.target.value)} value={data.price}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"原价"}>
                                <Input placeholder='请输入原价' onChange={e => actions.setOriginalPrice(e.target.value)} value={data.originalPrice}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"成本价"}>
                                <Input placeholder='请输入成本价' onChange={e => actions.setCostPrice(e.target.value)} value={data.costPrice}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"库存"}>
                                <Input placeholder='请输入库存数' onChange={e => actions.setStockStatus(e.target.value)} value={data.stockStatus}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"详情"}>
                                <Avatar name={"file"} afterAction={actions.setDetailImg}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"促销"}>
                                <Input placeholder='描述促销活动' onChange={e => actions.setProductActivity(e.target.value)} value={data.productActivity}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"服务"}>
                                <Input placeholder='2小时送货' onChange={e => actions.setServe(e.target.value)} value={data.serve}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={actions.createProduct}>创建商品</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}


module.exports = SelfSaleEditProductView;






















// 编辑商品
// @observer class SelfSaleEditProductListDetailView extends Component{
//     render(){
//
//         return (
//
//             <div className='add_order'>
//                 <div className='order_detail_header'>编辑</div>
//                 <Form className="add_detail_section_left" id='add_detail_section_left'>
//                     <Row gutter={16}>
//                         <Col span={6}>
//                             <FormItem label={"选择店铺"}>
//                                 <Select defaultValue="def" onChange={value => actions.setShopList(value)}>
//                                     <Option value="def">-选择店铺-</Option>
//                                     {this.getShopNodes()}
//                                 </Select>
//                             </FormItem>
//                         </Col>
//                         <Col span={6}>
//                             <FormItem label={"商品品牌"}>
//                                 <Select defaultValue="def" onChange={value => actions.setBrand(value)}>
//                                     <Option value="def">-选择品牌-</Option>
//                                     {this.getBrandNodes()}
//                                 </Select>
//                             </FormItem>
//                         </Col>
//                         <Col span={6}>
//                             <FormItem label={"商品名称"}>
//                                 <Input placeholder="填写商品名称" onBlur={e => actions.setProductName(e.target.value)}/>
//                             </FormItem>
//                         </Col>
//                         <Col span={6}>
//                             <FormItem label={"副标题"}>
//                                 <Input placeholder="描述商品特色，卖点，优惠等" onBlur={e => actions.setProductDescribe(e.target.value)}/>
//                             </FormItem>
//                         </Col>
//                         <Col span={6}>
//                             <FormItem label={"分类"}>
//                                 <Select defaultValue="def" onChange={value => actions.setCategory(value)}>
//                                     <Option value="def">-选择品牌-</Option>
//                                     {this.getCategoryNodes()}
//                                 </Select>
//                             </FormItem>
//                         </Col>
//                         <Col span={6}>
//                             <FormItem label={"规格"}>
//                                 <Input placeholder="输入规格" onBlur={e => actions.setVolume(e.target.value)}/>
//                             </FormItem>
//                         </Col>
//                         <Col span={6}>
//                             <FormItem label={"商品头像"}>
//                                 <Avatar name={"file"} afterAction={actions.setHeaderImg}/>
//                             </FormItem>
//                         </Col>
//                         <Col span={6}>
//                             <FormItem label={"商品图像"}>
//                                 <Avatar name={"file"} afterAction={actions.setProductImg}/>
//                             </FormItem>
//                         </Col>
//                         <Col span={6}>
//                             <FormItem label={"价格"}>
//                                 <Input placeholder='请输入销售价格' onBlur={e => actions.setPrice(e.target.value)}/>
//                             </FormItem>
//                         </Col>
//                         <Col span={6}>
//                             <FormItem label={"原价"}>
//                                 <Input placeholder='请输入原价' onBlur={e => actions.setOriginalPrice(e.target.value)}/>
//                             </FormItem>
//                         </Col>
//                         <Col span={6}>
//                             <FormItem label={"成本价"}>
//                                 <Input placeholder='请输入原价' onBlur={e => actions.setCostPrice(e.target.value)}/>
//                             </FormItem>
//                         </Col>
//                         <Col span={6}>
//                             <FormItem label={"库存"}>
//                                 <Input placeholder='请输入库存数' onBlur={e => actions.setStockStatus(e.target.value)}/>
//                             </FormItem>
//                         </Col>
//                         <Col span={6}>
//                             <FormItem label={"详情"}>
//                                 <Avatar name={"file"} afterAction={actions.setDetailImg}/>
//                             </FormItem>
//                         </Col>
//                         <Col span={6}>
//                             <FormItem label={"促销"}>
//                                 <Input placeholder='描述促销活动' onBlur={e => actions.setProductActivity(e.target.value)}/>
//                             </FormItem>
//                         </Col>
//                         <Col span={6}>
//                             <FormItem label={"服务"}>
//                                 <Input placeholder='2小时送货' onBlur={e => actions.setServe(e.target.value)}/>
//                             </FormItem>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col span={24} style={{ textAlign: 'right' }}>
//                             <Button type="primary" onClick={actions.createProduct}>创建商品</Button>
//                         </Col>
//                     </Row>
//                 </Form>
//             </div>
//         )
//     }
// }