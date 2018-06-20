/**
 * Created by LDQ on 2017/6/20.
 */


class AutoMap{
    constructor(mapInfo){
        let baseInfo = {
            center: [116.397428, 39.90923],
            resizeEnable:true
        };
        let mapObj = Object.assign(baseInfo,mapInfo);
        this.map = new AMap.Map('container', mapObj);
    }


    autoComplete(str){
        let auto = new AMap.Autocomplete();
        return new Promise((resolve, reject)=>{
            auto.search(str, function(status, result){
                if (status === 'complete' && result.info === 'OK') {
                    let list = [];
                    let tips = result.tips;
                    for(let i = 0;i <  tips.length;i++){
                        list.push({
                            longitude : tips[i].location.lng,
                            latitude : tips[i].location.lat,
                            adcode: tips[i].adcode,
                            receiveAddress : tips[i].name,
                            district: tips[i].district,
                            fullAddress: tips[i].district +  tips[i].name
                        })
                    }
                    resolve(list)
                }else{
                    reject(result);
                }
            });
        });

    }
    // @observable showLocationInfo = {
    //     longitude : "",
    //     latitude : "",
    //     pcode: "",
    //     province:"",
    //     citycode:"",
    //     city:"",
    //     adcode:"",
    //     fullAddress:"正在获取当前位置...",
    //     receiveAddress : "",
    // };
    //
    // @observable _addressList = [];
    // @computed get addressList(){
    //     return this._addressList;
    // }
    //

    // @action getCurrentLocation(){
    //     let geolocation;
    //     let self = this;
    //     let pcode = "",citycode = '',districtcode = '',formattedAddress = '正在获取当前位置...';
    //     this.map.plugin('AMap.Geolocation', function() {
    //         geolocation = new AMap.Geolocation({
    //             enableHighAccuracy: true,               //是否使用高精度定位，默认:true
    //             timeout: 10000,                         //超过10秒后停止定位，默认：无穷大
    //             buttonOffset: new AMap.Pixel(10, 20),   //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    //             zoomToAccuracy: true,                   //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    //             buttonPosition:'RB'
    //         });
    //         self.map.addControl(geolocation);
    //         geolocation.getCurrentPosition();
    //         AMap.event.addListener(geolocation, 'complete', function(data){
    //             console.log('============定位成功',data);
    //
    //             self.showLocationInfo.longitude = data.position.getLng();
    //             self.showLocationInfo.latitude = data.position.getLat();
    //             self.showLocationInfo.pcode = data.addressComponent.citycode.substring(0,2)+"0000";
    //             self.showLocationInfo.province = data.addressComponent.province;
    //             self.showLocationInfo.citycode = data.addressComponent.citycode;
    //             self.showLocationInfo.city = data.addressComponent.city;
    //             self.showLocationInfo.adcode = data.addressComponent.adcode;
    //             self.showLocationInfo.fullAddress = data.formattedAddress;
    //             self.showLocationInfo.receiveAddress = data.formattedAddress;
    //         });//返回定位信息
    //         AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    //     });
    //     function onError(data) {
    //         console.log(data);
    //         self.showLocationInfo.receiveAddress = '定位失败';
    //     }
    // }

    // @action searchNearAddress(lnglat){
    //     let self = this;
    //     let placeSearch = new AMap.PlaceSearch({
    //         extensions:'all'
    //     });
    //     placeSearch.searchNearBy('', lnglat, 200, function(status, result) {
    //         if (status === 'complete' && result.info === 'OK') {
    //             console.log("searchNearAddress:",result);
    //             let poiList = result.poiList.pois;
    //             let list = [];
    //             for(let i = 0;i < result.poiList.pois.length;i++){
    //                 list.push({
    //                     longitude : poiList[i].location.lng,
    //                     latitude : poiList[i].location.lat,
    //                     pcode: poiList[i].pcode,
    //                     province:poiList[i].pname,
    //                     citycode:poiList[i].citycode,
    //                     city:poiList[i].cityname,
    //                     adcode:poiList[i].adcode,
    //                     receiveAddress : poiList[i].name,
    //                     fullAddress : poiList[i].pname + poiList[i].adname + poiList[i].name,
    //                 });
    //             }
    //             self._addressList = list;
    //         }
    //     });
    // }



    // @action searchAddressDetail(str){
    //     let self = this;
    //     let placeSearch = new AMap.PlaceSearch({
    //         extensions:'all'
    //     });
    //
    //     placeSearch.search(str,function(status, result){
    //         if (status === 'complete' && result.info === 'OK') {
    //             placeSearch_CallBack(result);
    //         }
    //     });
    //     function placeSearch_CallBack(data){
    //         let poiInfo = data.poiList.pois[0];
    //         console.log("searchAddressDetail:",poiInfo);
    //         self.showLocationInfo.longitude = poiInfo.location.getLng();
    //         self.showLocationInfo.latitude = poiInfo.location.getLat();
    //         self.showLocationInfo.pcode = poiInfo.pcode;
    //         self.showLocationInfo.province = poiInfo.pname;
    //         self.showLocationInfo.citycode = poiInfo.citycode;
    //         self.showLocationInfo.city = poiInfo.cityname;
    //         self.showLocationInfo.adcode = poiInfo.adcode;
    //         self.showLocationInfo.receiveAddress = poiInfo.name;
    //         self.showLocationInfo.fullAddress = poiInfo.cityname + poiInfo.adname + poiInfo.name;
    //         self.city = poiInfo.cityname;
    //     }
    // }
    //
    // @action dragSiteSelection(){
    //     let self = this;
    //     AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
    //         let positionPicker = new PositionPicker({
    //             mode: 'dragMap',
    //             map: self.map,
    //             iconStyle: { //自定义外观
    //                 url: '//webapi.amap.com/ui/1.0/assets/position-picker2.png',
    //                 ancher: [24, 40],
    //                 size: [32, 32]
    //             }
    //         });
    //         positionPicker.start();
    //         positionPicker.on('success', function(positionResult) {
    //             console.log("positionResult:",positionResult);
    //             let regeocode = positionResult.regeocode;
    //
    //             self.showLocationInfo.longitude = positionResult.position.getLng();
    //             self.showLocationInfo.latitude = positionResult.position.getLat();
    //             self.showLocationInfo.pcode = regeocode.addressComponent.pcode;
    //             self.showLocationInfo.province = regeocode.addressComponent.province;
    //             self.showLocationInfo.citycode = regeocode.addressComponent.citycode;
    //             self.showLocationInfo.city = regeocode.addressComponent.city;
    //             self.showLocationInfo.adcode = regeocode.addressComponent.adcode;
    //             self.showLocationInfo.receiveAddress = positionResult.address;
    //             self.showLocationInfo.fullAddress = positionResult.address;
    //         });
    //
    //     });
    // }
    //
    // @action geocoder(lnglatXY){
    //     let geocoder = new AMap.Geocoder({
    //         radius: 1000,
    //         extensions: "base"
    //     });
    //     geocoder.getAddress(lnglatXY, function(status, result) {
    //         if (status === 'complete' && result.info === 'OK') {
    //             geocoder_CallBack(result);
    //         }
    //     });
    //     function geocoder_CallBack(data) {
    //         let regeocode = data.regeocode;
    //         console.log("省："+regeocode.addressComponent.province);
    //         console.log("市："+regeocode.addressComponent.city);
    //         console.log("区："+regeocode.addressComponent.district);
    //         console.log("乡镇："+regeocode.addressComponent.township);
    //         console.log("街道："+regeocode.addressComponent.street);
    //         console.log("门牌号："+regeocode.addressComponent.streetNumber);
    //         console.log("所在社区："+regeocode.addressComponent.neighborhood);
    //         console.log("社区类型："+regeocode.addressComponent.neighborhoodType);
    //         console.log("所在大楼："+regeocode.addressComponent.building);
    //         console.log("楼类型："+regeocode.addressComponent.buildingType);
    //     }
    // }
}


module.exports = AutoMap;
