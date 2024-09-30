import React, {Component} from 'react';
import * as atlas from 'azure-maps-control';
import AzureMapContext from '../azuremapcontext/AzureMapContext';
import DataSourceContext from '../datasourcecontext/DataSourceContext';
import IAzureMapContext from '../azuremapcontext/IAzureMapContext';
import IDataSource from './IDataSource';
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
export default DataSource;