import React, {Component} from 'react';
import * as atlas from 'azure-maps-control';
import './AzureMap.css';
import 'azure-maps-control/dist/atlas.min.css';
import { AzureMapContext } from '../azuremapcontext';
import IAzureMap from './IAzureMap';
import { AzureMapProps } from './AzureMap.types';
import { AzureMapState } from './AzureMap.types';

export class AzureMap extends Component<AzureMapProps, AzureMapState> implements IAzureMap
{
    map?: atlas.Map;

    constructor(props: any) {
        super(props);
        this.state = { 
            isMapReady: false
        };
        this.updateStyle = this.updateStyle.bind(this);
        this.updateCamera = this.updateCamera.bind(this);
        this.updateUserInteraction = this.updateUserInteraction.bind(this);
    }

    componentDidMount(){
        //define a special mapOptions object for the map constructor
        //ensuring all style and camera options are passed at this stage will prevent double rendering
        let mapOptions :{[key:string]: any} = {
            authOptions: this.props.authOptions
        };
        if(this.props.styleOptions){
            Object.keys(this.props.styleOptions).forEach(key => {
                mapOptions[key] = this.props.styleOptions ? this.props.styleOptions[key] : null;
            });
        }
        if(this.props.cameraOptions){
            Object.keys(this.props.cameraOptions).forEach(key => {
                mapOptions[key] = this.props.cameraOptions ? this.props.cameraOptions[key] : null;
            });
        }
        if(this.props.userInteractionOptions){
            Object.keys(this.props.userInteractionOptions).forEach(key => {
                mapOptions[key] = this.props.userInteractionOptions ? this.props.userInteractionOptions[key] : null;
            });
        }
        //create a new map after container is rendered
        this.map = new atlas.Map("azureMap", mapOptions);
        //set the map 'ready' handler
        this.map.events.add("ready", () => {
            //mark map as ready
            this.setState({isMapReady: true});

            //hook up event handlers
            if(typeof this.props.onClick === "function" && this.map){
                this.map.events.add("click", this.props.onClick);
            }
            if(typeof this.props.onDblClick === "function" && this.map){
                this.map.events.add("dblclick", this.props.onDblClick);
            }
            if(typeof this.props.onMouseMove === "function" && this.map){
                this.map.events.add("mousemove", this.props.onMouseMove);
            }
            if(typeof this.props.onMouseOut === "function" && this.map){
                this.map.events.add("mouseout", this.props.onMouseOut);
            }
            if(typeof this.props.onMouseOver === "function" && this.map){
                this.map.events.add("mouseover", this.props.onMouseOver);
            }
            if(typeof this.props.onMove === "function" && this.map){
                this.map.events.add("move", this.props.onMove);
            }
            if(typeof this.props.onMoveEnd === "function" && this.map){
                this.map.events.add("moveend", this.props.onMoveEnd);
            }
            if(typeof this.props.onMoveStart === "function" && this.map){
                this.map.events.add("movestart", this.props.onMoveStart);
            }
            if(typeof this.props.onTouchCancel === "function" && this.map){
                this.map.events.add("touchcancel", this.props.onTouchCancel);
            }
            if(typeof this.props.onTouchEnd === "function" && this.map){
                this.map.events.add("touchend", this.props.onTouchEnd);
            }
            if(typeof this.props.onTouchMove === "function" && this.map){
                this.map.events.add("touchmove", this.props.onTouchMove);
            }
            if(typeof this.props.onTouchStart === "function" && this.map){
                this.map.events.add("touchstart", this.props.onTouchStart);
            }
            if(typeof this.props.onTouchCancel === "function" && this.map){
                this.map.events.add("touchcancel", this.props.onTouchCancel);
            }
            if(typeof this.props.onWheel === "function" && this.map){
                this.map.events.add("wheel", this.props.onWheel);
            }
            if(typeof this.props.onZoom === "function" && this.map){
                this.map.events.add("zoom", this.props.onZoom);
            }
            if(typeof this.props.onZoomEnd === "function" && this.map){
                this.map.events.add("zoomend", this.props.onZoomEnd);
            }
            if(typeof this.props.onZoomStart === "function" && this.map){
                this.map.events.add("zoomstart", this.props.onZoomStart);
            }
        });
    }
    shallowCompare(xobj: {[key:string]: any} | undefined, yobj: {[key:string]: any} | undefined){
        if(!xobj && !yobj) return true;
        if(xobj && !yobj) return false;
        if(!xobj && yobj) return false;
        if(xobj && yobj){
            let xkeys = Object.keys(xobj);
            let ykeys = Object.keys(yobj);
            
            if(xkeys.length !== ykeys.length) return false;
            
            return xkeys.every(key => yobj.hasOwnProperty(key) && xobj[key] === yobj[key]);
        }
    }
    componentDidUpdate(prevProps: AzureMapProps){
        if(!this.shallowCompare(prevProps.styleOptions, this.props.styleOptions)){
            this.updateStyle();
        }
        if(!this.shallowCompare(prevProps.cameraOptions, this.props.cameraOptions)){
            this.updateCamera();
        }
        if(!this.shallowCompare(prevProps.userInteractionOptions, this.props.userInteractionOptions)){
            this.updateUserInteraction();
        }
        //update handlers if necessary
    }
    componentWillUnmount(){
        if(this.map){
            this.map.dispose();
        }
    }
    updateStyle(){
        if(this.map && this.state.isMapReady){
            this.map.setStyle(this.props.styleOptions);
        }
    }
    updateCamera(){
        if(this.map && this.state.isMapReady){
            this.map.setCamera(this.props.cameraOptions);
        }
    }
    updateUserInteraction(){
        if(this.map && this.state.isMapReady){
            this.map.setUserInteraction(this.props.userInteractionOptions);
        }
    }

    render(){
        //render map container and also children when map is ready
        const jsx = (this.state.isMapReady) ?
            <div className="azure-map-container" id="azureMap">
                <AzureMapContext.Provider value = {{ map: this.map }}>{ this.props.children }</AzureMapContext.Provider>
            </div> :
            <div className="azure-map-container" id="azureMap"></div>;

        return jsx;
    }
}
export default AzureMap;