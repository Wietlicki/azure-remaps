import React, {Component} from 'react';
import * as atlas from 'azure-maps-control';
import { DataSourceContext } from '../datasourcecontext';
import IPoint from './IPoint';
import { PointProps } from './Point.types';

export class Point extends Component<PointProps> implements IPoint{
    static contextType = DataSourceContext;
    declare context: React.ContextType<typeof DataSourceContext>

    point? : atlas.Shape;

    constructor(props: any) {
        super(props);
        this.point = new atlas.Shape(new atlas.data.Point(props.coordinates));       
    }
    componentDidMount(){
        if(this.point) this.context.dataSource?.add(this.point);
    }
    componentDidUpdate(){
        if(this.point){
            this.point.setCoordinates(this.props.coordinates);
        }
    }
    componentWillUnmount() {
        if(this.context.dataSource && this.point && this.context.dataSource.getShapeById(this.point.getId())){
            this.context.dataSource.removeById(this.point.getId());
        }
    }
    render(){
        return null;
    }
}