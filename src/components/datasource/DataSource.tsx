import React, {Component} from 'react';
import * as atlas from 'azure-maps-control';
import { DataSourceContext } from '../datasourcecontext';
import { IAzureMapContext, AzureMapContext } from '../azuremapcontext';
import { IDataSource } from './IDataSource';
import { DataSourceProps } from './DataSource.types';

export class DataSource extends Component<DataSourceProps> implements IDataSource{
    static contextType = AzureMapContext;
    declare context: React.ContextType<typeof AzureMapContext>
    
    dataSource?: atlas.source.DataSource

    //Create dataSource in constructor so children can populate data
    constructor(props: any, context: IAzureMapContext) {
        super(props);
        if(context.map){
            this.dataSource = new atlas.source.DataSource();
            context.map.sources.add(this.dataSource);
        }
    }
    componentWillUnmount() {
        if(this.dataSource && this.context.map && this.context.map.sources.getById(this.dataSource.getId())){
            //remove any layers linked to datasource
            const layers = this.context.map.layers.getLayers();
            //loop through layers in map
            for(let layer of layers){
                //check layer is a bubble or symbol layer
                if(layer instanceof atlas.layer.BubbleLayer || layer instanceof atlas.layer.SymbolLayer){
                    let source = layer.getSource()
                    //remove layer if DataSource is it's source
                    if(source instanceof atlas.source.Source && source.getId() === this.dataSource.getId()){
                        this.context.map.layers.remove(layer);
                    }
                }
            }
            //remove datasource
            this.context.map.sources.remove(this.dataSource);
        }
    }
    //Render children only if can create a valid dataSource
    render(){
        return (
            (this.dataSource) ?
                <DataSourceContext.Provider value = {{map: this.context.map, dataSource: this.dataSource}}>
                    { this.props.children };
                </DataSourceContext.Provider> : null
        )
    }
}