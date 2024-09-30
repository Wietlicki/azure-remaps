import React, {Component} from 'react';
import AzureMapContext from '../azuremapcontext/AzureMapContext';
import { IconCollectionProps } from './IconCollection.types';
import { IconCollectionState } from './IconCollection.types';

export class IconCollection extends Component<IconCollectionProps, IconCollectionState> {
    static contextType = AzureMapContext;
    declare context: React.ContextType<typeof AzureMapContext>

    constructor(props: IconCollectionProps) {
        super(props);
        let loadStates : {[id: string]: string} = {};
        props.icons.forEach(i => {
            loadStates[i.id] = "pending";
        })
        this.state = {
            iconLoadStates: loadStates
        };
    }
    compareIcons = (x: {id: string, href: string}[], y: {id: string, href: string}[]) => {
        if(x.length !== y.length) 
            return false;
        return (
            x.every((v, i) => (y[i].id === v.id || y[i].href === v.href)));
    }
    componentDidMount(){
        if(this.context.map){
            this.props.icons.forEach(i => {
                this.context.map?.imageSprite.add(i.id, i.href).then(()=>{
                    let loadStates = this.state.iconLoadStates;
                    loadStates[i.id] = "ready";
                    this.setState({iconLoadStates: loadStates});
                })
            })
        }
    }
    componentDidUpdate(prevProps: IconCollectionProps){
        if(this.context.map){
            if(!this.compareIcons(this.props.icons, prevProps.icons)){
                //clear all images on changes in collection
                this.context.map.imageSprite.clear();
                //update state of all icons
                let loadStates : {[id: string]: string} = {};
                this.props.icons.forEach(i => {
                    loadStates[i.id] = "pending";
                    //add images to map
                    this.context.map?.imageSprite.add(i.id, i.href).then(()=>{
                        let loadStates = this.state.iconLoadStates;
                        loadStates[i.id] = "ready";
                        this.setState({iconLoadStates: loadStates});
                    });
                })
                //update load states
                this.setState({iconLoadStates: loadStates});
            }
        }
    }
    componentWillUnmount(){
        if(this.context.map){
            try{ this.context.map.imageSprite.clear(); }
            catch{}
        }
    }
    render(){    
        let isReady = true;
        Object.entries(this.state.iconLoadStates).forEach((e)=>{
            if(e[1] === "pending") isReady = false;
        });

        let jsx = (isReady) ? <>{this.props.children}</> : null;
        return jsx;
    }
}
export default IconCollection;