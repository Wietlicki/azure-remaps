import * as atlas from 'azure-maps-control';

export default interface IDataSourceContext {
    map?: atlas.Map,
    dataSource?: atlas.source.DataSource
}