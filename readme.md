# Azure-Remaps
React wrapper library for **azure-maps-control**. Provides components that offer a typical 'react' scripting experience by integrating the underlying .js library into the component lifecycle. 

## Installation
Installation using npm:
```
npm install azure-remaps
```

## Basic Usage
### Simple Map

```jsx
import { AzureMap } from "azure-remaps"

export function SimpleMap() {
    // Specify authentication options
    const authOptions = {
        authType: "subscriptionKey",
        subscriptionKey: '[your azure maps key]'
    }
    // Render azure map using auth options
    // AzureMap component requires a container with defined width and height
    return <div style={{ width: "400px", height: "400px" }}>
        <AzureMap authOptions={authOptions}></AzureMap>
    </div>
}
```

### Adjusting Camera and Style

```jsx
import { AzureMap } from "azure-remaps"

export function SimpleMap() {
    // Specify authentication options
    const authOptions = {
        authType: "subscriptionKey",
        subscriptionKey: '[your azure maps key]'
    }
    // Specify camera options
    const cameraOptions = {
        center: [0.0015, 51.4769],
        zoom: 12,
        minZoom: 3
    }
    // Specify map style options
    const styleOptions = {
        language: "en-US"
    }
    // Render azure map using above options
    return <div style={{ width: "400px", height: "400px" }}>
        <AzureMap
            authOptions={authOptions}
            cameraOptions={cameraOptions}
            styleOptions={styleOptions}>
        </AzureMap>
    </div>
}
```

### Adding a SymbolLayer with Points

```jsx
import { AzureMap, DataSource, SymbolLayer, Point } from "azure-remaps"

export function SimpleMap() {
    // Specify authentication options
    const authOptions = {
        authType: "subscriptionKey",
        subscriptionKey: '[your azure maps key]'
    }
    const cameraOptions = {
        center: [0.0015, 51.4769],
        zoom: 12,
        minZoom: 3
    }
    const styleOptions = {
        language: "en-US"
    }
    // Render azure map using above options
    // Add a DataSource component
    // Then add a SymbolLayer with child Point components
    return <div style={{ width: "400px", height: "400px" }}>
        <AzureMap
            authOptions={authOptions}
            cameraOptions={cameraOptions}
            styleOptions={styleOptions}>
            <DataSource>
                <SymbolLayer>
                    <Point coordinates={[0.0015, 51.4769]} />
                    <Point coordinates={[-0.0005, 51.4769]} />
                </SymbolLayer>
            </DataSource>
        </AzureMap>
    </div>
}
```