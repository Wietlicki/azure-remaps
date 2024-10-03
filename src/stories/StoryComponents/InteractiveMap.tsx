import { AzureMap, BubbleLayer, HtmlMarker, Point, DataSource, SymbolLayer, IconCollection, ZoomControl } from '../../components';
import { useState, useCallback } from 'react';
import * as atlas from 'azure-maps-control';

export default function InteractiveMap({subscriptionKey}:{subscriptionKey: string}){
    const [coordinateOptionIx, setCoordinateOptionIx] = useState(0);
    const [colorOptionIx, setColorOptionIx] = useState(0);
    const [showPoints, setShowPoints] = useState(true);

    const handleRandomizePointClick = useCallback(()=>{
        setCoordinateOptionIx(Math.floor(Math.random() * 3));
    },[])
    const handleRandomizeColorClick = useCallback(()=>{
        setColorOptionIx(Math.floor(Math.random() * 6));
    },[])
    const handleShowToggleClick = useCallback(()=>{
        setShowPoints(!showPoints);
    },[showPoints])

    const styleOptions = {
        view: "Auto",
        language: "en-US",
        style: "road_shaded_relief",
        userRegion: "Auto",
        showLogo: false,
        showFeedbackLink: false
    };
    const cameraOptions = {
        center: [0.0015, 51.4769],
        zoom: 12,
        minZoom: 3
    }
    const authOptions: atlas.AuthenticationOptions = {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: subscriptionKey
    }
    const coordinateOptions: Array<[number, number]> = [
        [0.0025, 51.495],
        [-0.0017, 51.48],
        [0.0015, 51.48],
        [0.000, 51.48]
    ]
    const colorOptions: Array<string> = ["red", "green", "blue", "yellow", "pink", "orange", "black"];
    const color = colorOptions[colorOptionIx];
    const pointJSX = <Point coordinates={coordinateOptions[coordinateOptionIx]}/>
    const datasourceJSX = showPoints === true ? <DataSource>
        <BubbleLayer options={{
            radius: 6,
            strokeColor: "white",
            strokeWidth: 3, 
            color: color}}>
            {pointJSX}
        </BubbleLayer>
    </DataSource> : null;

    return <div style={{width: "100%", height: "100%"}}>
        <button onClick={handleRandomizePointClick}>Random Point</button>
        <button onClick={handleShowToggleClick}>Hide/Show Points</button>
        <button onClick={handleRandomizeColorClick}>Random Color</button>
        <AzureMap styleOptions={styleOptions} cameraOptions={cameraOptions} authOptions={authOptions}>
            {datasourceJSX}
        </AzureMap>
    </div>
}