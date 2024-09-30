import React from 'react';
import IDataSourceContext from './IDataSourceContext';

const DataSourceContext = React.createContext<IDataSourceContext>({});

export default DataSourceContext;