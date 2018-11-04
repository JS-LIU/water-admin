import React,{Component} from "react";
import {Icon} from "antd";

/**
 * Created by Liudq on 2018/11/4
 */
class LockLineView extends Component {
    constructor(props){
        super(props);
    }
    state={
        lockState:"unlock"
    };
    lockLine(){
        if(this.state.lockState === "lock"){
            this.setState({
                lockState:"unlock",
            });
        }else{
            this.setState({
                lockState:"lock",
            });
        }
        this.props.clickHandle(this.state.lockState);
    }
    render(){
        const { lockState } = this.state;
        return(<Icon type={lockState} onClick={this.lockLine.bind(this)}/>)

    }
}
module.exports = LockLineView;