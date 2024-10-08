import React, {Component} from 'react';
import * as atlas from 'azure-maps-control';
import { AzureMapContext }  from '../azuremapcontext';
import IZoomControl from './IZoomControl';
import { ZoomControlProps } from './ZoomControl.types';

export class ZoomControl extends Component<ZoomControlProps> implements IZoomControl{
    static contextType = AzureMapContext;
    declare context: React.ContextType<typeof AzureMapContext>
    zoomControl?: atlas.control.ZoomControl;

    constructor(props: ZoomControlProps) {
        super(props);
        this.zoomControl = new atlas.control.ZoomControl(props.zoomControlOptions);
    }
    componentDidMount(){
        if(this.zoomControl && this.context.map){
            this.context.map.controls.add(this.zoomControl, this.props.controlOptions);
        }
    }
    componentDidUpdate() {
        if(this.zoomControl && this.context.map){
            if(this.context.map.controls.getControls().includes(this.zoomControl)){
                this.context.map.controls.remove(this.zoomControl);
            }
            this.zoomControl = new atlas.control.ZoomControl(this.props.zoomControlOptions);
            this.context.map.controls.add(this.zoomControl, this.props.controlOptions);
        }
    }
    componentWillUnmount() {
        if(this.zoomControl && this.context.map){
            try {
                this.context.map.controls.remove(this.zoomControl);
            } catch {}
        }
    }
    render(){
        return null;
    }
}