import React,{Component} from "react";
import {Radio} from "antd";

/**
 * Created by Liudq on 2018/11/4
 */
class RadioQueryTabList extends Component{
    state={
        type:this.props.defaultValue,
    };
    onChange(e){
        this.setState({
            type:e.target.value
        });
        this.props.changeHandle(e.target.value);
    }

    render(){
        const {type} = this.state;
        let radioItem = this.props.radioList.map((item,i)=>{
            return (<Radio.Button value={item.key} key={i}>{item.name}</Radio.Button>)
        });
        return (
            <Radio.Group value={type} onChange={this.onChange.bind(this)} >
                {radioItem}
            </Radio.Group>
        )
    }
}
module.exports = RadioQueryTabList;