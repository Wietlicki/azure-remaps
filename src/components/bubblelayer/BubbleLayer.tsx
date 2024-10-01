import React, {Component} from 'react';
import * as atlas from 'azure-maps-control';
import { IDataSourceContext, DataSourceContext } from '../datasourcecontext';
import { IBubbleLayer } from './IBubbleLayer';
import { BubbleLayerProps } from './BubbleLayer.types';

export class BubbleLayer extends Component<BubbleLayerProps> implements IBubbleLayer{
    static contextType = DataSourceContext;
    declare context: React.ContextType<typeof DataSourceContext>

    bubbleLayer?: atlas.layer.BubbleLayer

    constructor(props: any, context: IDataSourceContext) {
        super(props);
        if(context.dataSource){
            this.bubbleLayer = new atlas.layer.BubbleLayer(context.dataSource, undefined, props.options);
        }
    }
    //layer has to be added after data is added in the render method
    componentDidMount(){
        if(this.context.map && this.bubbleLayer){
            this.context.map.layers.add(this.bubbleLayer);
        }
    }
    componentWillUnmount() {
        if(this.context.map && this.bubbleLayer){
            if(this.context.map.layers.getLayerById(this.bubbleLayer.getId())){
                this.context.map.layers.remove(this.bubbleLayer);
            }
        }
    }
    //children should populate the dataSource with data
    render(){
        return (this.props.children) ? this.props.children : null;
    }
}