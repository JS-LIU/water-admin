/**
 * Created by LDQ on 2018/6/21
 */
class Location {
    constructor(lng,lat,adcode,name,district){
        this.lng = lng;
        this.lat = lat;
        this.adcode = adcode;
        this.name = name;
        this.district = district;
        this.fullAddress = name + district;
    }
}
module.exports = Location;