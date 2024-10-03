import React, {Component} from 'react';
import * as atlas from 'azure-maps-control';
import { AzureMapContext } from '../azuremapcontext';
import { IHtmlMarker } from './IHtmlMarker';
import { HtmlMarkerProps } from './HtmlMarker.types';

export class HtmlMarker extends Component<HtmlMarkerProps> implements IHtmlMarker{
    static contextType = AzureMapContext;
    declare context: React.ContextType<typeof AzureMapContext>
    htmlMarker? : atlas.HtmlMarker;

    constructor(props: HtmlMarkerProps) {
        super(props);
        this.htmlMarker = new atlas.HtmlMarker(props.htmlMarkerOptions);
    }
    componentDidMount(){
        if(this.htmlMarker && this.context.map){
            this.context.map.markers.add(this.htmlMarker);
        }
    }
    componentDidUpdate(){
        if(this.htmlMarker && this.props.htmlMarkerOptions){
            this.htmlMarker.setOptions(this.props.htmlMarkerOptions);
        }
    }
    componentWillUnmount(){
        if(this.htmlMarker && this.context.map){
            try {
                this.context.map.markers.remove(this.htmlMarker);
            }
            catch {}
        }
    }
    render(){
        return null;
    }
}