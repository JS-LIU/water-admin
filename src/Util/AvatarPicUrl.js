/**
 * Created by LDQ on 2018/7/4
 */
class AvatarPicUrl{
    constructor(){
        this.url = "http://123.57.161.212:8080/group1/M00/00/07/ezmh1FnwRPmAPnj5AAFELj4-XFU825.png";
    }
    getUrlFromAvatar(info){
        if(info.fileList){
            this.url = info.fileList[0].response[0].bigImg
        }
        console.log(this.url);
        return this.url;
    }
}
module.exports = new AvatarPicUrl();