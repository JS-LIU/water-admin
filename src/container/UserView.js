/**
 * Created by LDQ on 2017/12/16
 */
import React, {Component} from 'react';
class UserView extends Component{
    componentWillMount(){
        console.log("i'm user");
    }
    render(){
        return (
            <div>
                i'm user;
            </div>
        )
    }
}
module.exports = UserView;