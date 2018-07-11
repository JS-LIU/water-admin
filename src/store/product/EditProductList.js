/**
 * Created by LDQ on 2018/6/21
 */
import AdminList from '../AdminList';
import _h from '../../Util/HB';
import Product from './Product';
import categoryList from './CategoryList';
import merchantListContainer from '../merchant/MerchantListContainer';

class EditProductList extends AdminList {
    constructor() {
        super();
        let productListAjax = _h.ajax.resource('/admin/:entity/:action');

        //  批发
        this._getStockList = function (postInfo) {
            return productListAjax.save({entity: "product", action: "getStockList"}, postInfo);
        };
        //  自营
        this._getSelfSaleProductList = function (postInfo) {
            return productListAjax.save({entity: "merchant", action: "selfSaleShopProductList"}, postInfo);
        };
        //  分销
        this._getDistributeProductList = function (postInfo) {
            return productListAjax.save({entity: "product", action: "getDistributionProductListInfo"}, postInfo);
        };
        this._createProduct = function (postInfo) {
            return productListAjax.save({entity: "product", action: "addProduct"}, postInfo);
        };

        //  分类
        this.categoryList = categoryList;
        //  店铺
        this.merchantListContainer = merchantListContainer;
    }

    getStockList() {
        return new Promise((resolve, reject) => {
            this._getStockList({}).then((list) => {
                this.list = EditProductList.createList(this.list, list, Product);
                resolve(this.list);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    getSelfSaleProductList() {
        return this.getList({}, this._getSelfSaleProductList, Product);
    }

    getDistributeProductList() {
        return new Promise((resolve, reject) => {
            this._getDistributeProductList().then((list) => {
                this.list = EditProductList.createList(this.list, list, Product);
                resolve(this.list);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    newProduct(shopId) {
        this.setActiveItem(new Product({shopProductStatus: "在售",shopId:shopId}))
    }

    createProduct() {
        let product = this.activeItem;
        let postInfo = {
            brandId: product.brandId,
            brandImageUrl: product.headerImg,
            costPrice: product.costPrice,
            originalPrice: product.originalPrice,
            productCategoryId: product.categoryId,
            productDescribe: product.productDescribe,
            productDetailImageUrl: product.detailImg,
            productImageUrl: product.productImg,
            productName: product.productName,
            productTagIdList: [1],
            productVolume: product.volume,
            promotion: product.productActivity,
            sellingPrice: product.price,
            service: product.service,
            shopId: [product.shopId],
            stock: product.stockStatus,
        };
        return this._createProduct(postInfo);
    };
}
module.exports = new EditProductList();