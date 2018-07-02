/**
 * Created by LDQ on 2018/6/28
 */
import _h from "../../Util/HB";
import AdminList from '../AdminList';
import ManufactureCost from './ManufactureCost';
import ProductList from '../product/ProductList';
import merchantListContainer from '../merchant/MerchantListContainer';
class ManufactureCostList extends AdminList{
    constructor(){
        super();
        let manufactureCostListAjax = _h.ajax.resource("/admin/stock/:action");
        this._getManufactureCostList = function(postInfo){
            return manufactureCostListAjax.save({action:'findStockWaterPayList'},postInfo);
        };
        //  水厂
        this.waterStoreList = merchantListContainer;
        //  水
        this.stockProductList = new ProductList();

        //  创建进货单
        this._createManufactureCost = function(postInfo){
            return manufactureCostListAjax.save({action:'createStockWaterPay'},postInfo)
        }
    }

    getManufactureCostList(){
        let postInfo = this.getQueryMsg();
        return this.getList(postInfo,this._getManufactureCostList,ManufactureCost);
    }

    newManufactureCost(){
        this.setActiveItem(new ManufactureCost({}));
    }
    createManufactureCost(){
        let self = this;
        let postInfo = {
            count:self.activeItem.count,
            payRmb:self.activeItem.payRmb,
            productId:self.activeItem.productId,
            remake:self.activeItem.remark,
            shopId:self.activeItem.shopId,
            ticketUrl:self.activeItem.ticketUrl,
            unitPrice:self.activeItem.unitPrice,
            id:self.activeItem.id
        };
        return this._createManufactureCost(postInfo)
    }
}
module.exports = new ManufactureCostList();