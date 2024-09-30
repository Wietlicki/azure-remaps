import * as atlas from 'azure-maps-control';

export interface IDataSourceContext {
    map?: atlas.Map,
    dataSource?: atlas.source.DataSource
}