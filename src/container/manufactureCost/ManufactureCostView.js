import React,{Component} from 'react';
import {observer,inject} from 'mobx-react';

import {data,actions} from '../../store/finance/manufactureCostInterface';

@observer class ManufactureCostView extends Component{
    render(){
        return (
            <div>
                ManufactureCostView
            </div>
        )
    }
}

module.exports = ManufactureCostView;