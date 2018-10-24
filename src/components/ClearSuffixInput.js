/**
 * Created by Liudq on 2018/10/25
 */
import React, {Component} from 'react';
import {Icon, Input} from "antd";
class ClearSuffixInput extends Component{
    constructor(props){
        super(props);
    }
    state = {
        inputValue:""
    };
    clearHandle(){
        this.props.clearHandle();
        this.setState({
            inputValue:""
        })
    }
    changeHandle(e){

        this.props.changeHandle(e.target.value);
        this.setState({
            inputValue:e.target.value
        })
    }
    render(){
        const {inputValue} = this.state;
        return (
            <Input
                suffix={<Icon type="close" onClick={this.clearHandle.bind(this)}/>}
                placeholder={this.props.placeholder}
                value={inputValue}
                onChange={this.changeHandle.bind(this)}
            />
        )
    }
}
module.exports = ClearSuffixInput;