import React, {Component} from 'react';
import * as atlas from 'azure-maps-control';
import DataSourceContext from '../datasourcecontext/DataSourceContext';
import IDataSourceContext from '../datasourcecontext/IDataSourceContext';
import ISymbolLayer from './ISymbolLayer';
import { SymbolLayerProps } from './SymbolLayer.types';

export class SymbolLayer extends Component<SymbolLayerProps> implements ISymbolLayer{
    static contextType = DataSourceContext;
    declare context: React.ContextType<typeof DataSourceContext>
    
    symbolLayer?: atlas.layer.SymbolLayer

    constructor(props: SymbolLayerProps, context: IDataSourceContext) {
        super(props);
        if(context.dataSource){
            this.symbolLayer = new atlas.layer.SymbolLayer(context.dataSource, undefined, props.symbolLayerOptions);
        }
    }
    //layer has to be added after data is added in the render method
    componentDidMount(){
        if(this.symbolLayer && this.context.map){
            this.context.map.layers.add(this.symbolLayer);
        }
    };
    componentDidUpdate(prevProps : SymbolLayerProps){
        if(this.symbolLayer && this.context.map && prevProps.symbolLayerOptions !== this.props.symbolLayerOptions){
            if(!this.props.symbolLayerOptions){
                this.symbolLayer.setOptions({});
            }
            else {
                this.symbolLayer.setOptions(this.props.symbolLayerOptions);
            }
        }
    }
    componentWillUnmount(){
        if(this.symbolLayer && this.context.map){
            if(this.context.map.layers.getLayerById(this.symbolLayer.getId())){
                this.context.map.layers.remove(this.symbolLayer);
            }
        }
    }
    //children should populate the dataSource with data
    render(){
        return (this.props.children) ? this.props.children : null;
    }
}
export default SymbolLayer