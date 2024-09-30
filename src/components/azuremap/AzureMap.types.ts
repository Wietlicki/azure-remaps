import * as atlas from 'azure-maps-control';

export type AzureMapProps = {
    cameraOptions?: atlas.CameraOptions,
    styleOptions?: atlas.StyleOptions,
    authOptions: atlas.AuthenticationOptions,
    userInteractionOptions?: atlas.UserInteractionOptions,
    onClick?: (e: atlas.MapEvent) => void,
    onDblClick?: (e: atlas.MapEvent) => void,
    onMouseMove?: (e: atlas.MapEvent) => void,
    onMouseOver?: (e: atlas.MapEvent) => void,
    onMouseOut?: (e: atlas.MapEvent) => void,
    onMove?: (e: atlas.MapEvent) => void,
    onMoveStart?: (e: atlas.MapEvent) => void,
    onMoveEnd?: (e: atlas.MapEvent) => void,
    onTouchCancel?: (e: atlas.MapEvent) => void,
    onTouchEnd?: (e: atlas.MapEvent) => void,
    onTouchMove?: (e: atlas.MapEvent) => void,
    onTouchStart?: (e: atlas.MapEvent) => void,
    onWheel?: (e: atlas.MapEvent) => void,
    onZoom?: (e: atlas.MapEvent) => void,
    onZoomEnd?: (e: atlas.MapEvent) => void,
    onZoomStart?: (e: atlas.MapEvent) => void,
    children?: React.ReactNode
}

export type AzureMapState = {
    isMapReady: boolean
}