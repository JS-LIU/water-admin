/**
 * Created by LDQ on 2017/12/27
 */

export default function toChinese(key,table){
    let value = table[key];
    if (value){
        return table[key]
    }else{
        return key;
    }
}
