import type { Meta, StoryObj } from '@storybook/react';
import * as atlas from 'azure-maps-control';
import { AzureMap, BubbleLayer, HtmlMarker, Point, DataSource, SymbolLayer, IconCollection, ZoomControl } from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'AzureRemaps/Map',
  component: AzureMap,
  decorators: [(Story)=><div style={{width: "400px", height: "400px"}}><Story/></div>],
  parameters: {
    layout: 'centered',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { },
} satisfies Meta<typeof AzureMap>;

export default meta;
type Story = StoryObj<typeof meta>;

const authOptions: atlas.AuthenticationOptions = {
  authType: atlas.AuthenticationType.subscriptionKey,
  subscriptionKey: 'xxxxxx'
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    authOptions: authOptions
  },
};

export const Styled: Story = {
  args: {
    authOptions: authOptions,
    styleOptions: {
      view: "Auto",
      language: "en-US",
      style: "road_shaded_relief",
      userRegion: "Auto",
      showLogo: false,
      showFeedbackLink: false
    }
  },
};

export const StyledAndCentered: Story = {
  args: {
    authOptions: authOptions,
    styleOptions: {
      view: "Auto",
      language: "en-US",
      style: "road_shaded_relief",
      userRegion: "Auto",
      showLogo: false,
      showFeedbackLink: false
    },
    cameraOptions: {
      center: [0.0015, 51.4769],
      zoom: 12,
      minZoom: 3
    }
  },
};

export const WithZoomControl: Story = {
  args: {
    authOptions: authOptions,
    styleOptions: {
      view: "Auto",
      language: "en-US",
      style: "road_shaded_relief",
      userRegion: "Auto",
      showLogo: false,
      showFeedbackLink: false
    },
    cameraOptions: {
      center: [0.0015, 51.4769],
      zoom: 12,
      minZoom: 3
    }
  },
  render: (args) => (
    <AzureMap {...args}>
      <ZoomControl controlOptions={{position: atlas.ControlPosition.BottomRight}}/>
    </AzureMap>
  ),
};

const markerSvg = '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" id="SVGRoot" version="1.1" style="display:block; height: 40px; width: 40px" viewBox="0 0 100 100" height="40px" width="40px"><defs id="defs1382"/><g id="layer1" transform="translate(0,5.9487438)"><path id="path1940" d="m 50,5.9394531 c -2.5,0 -23.242188,0.1953119 -23.242188,25.1953129 0,25 18.742188,60.804687 22.742188,62.804687 0.298142,0.149071 0.701858,0.149071 1,0 4,-2 22.742188,-37.804687 22.742188,-62.804687 C 73.242188,6.1347646 52.5,5.9394531 50,5.9394531 Z m 0,10.3066409 a 12,12 0 0 1 12,12 12,12 0 0 1 -12,12 12,12 0 0 1 -12,-12 12,12 0 0 1 12,-12 z" style="fill:#1a1a1a;stroke:white;stroke-width:4px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" /></g></svg>';

export const MapWithHtmlMarkers: Story = {
  args: {
    authOptions: authOptions,
    styleOptions: {
      view: "Auto",
      language: "en-US",
      style: "road_shaded_relief",
      userRegion: "Auto",
      showLogo: false,
      showFeedbackLink: false
    },
    cameraOptions: {
      center: [0.0015, 51.4769],
      zoom: 12,
      minZoom: 3
    }
  },
  render: (args) => (
    <AzureMap {...args}>
      <HtmlMarker htmlMarkerOptions={{position: [0.0015, 51.4769], htmlContent: markerSvg}}/>
      <HtmlMarker htmlMarkerOptions={{position: [-0.0005, 51.4769], htmlContent: markerSvg}}/>
    </AzureMap>
  ),
};


export const MapWithSymbols: Story = {
  args: {
    authOptions: authOptions,
    styleOptions: {
      view: "Auto",
      language: "en-US",
      style: "road_shaded_relief",
      userRegion: "Auto",
      showLogo: false,
      showFeedbackLink: false
    },
    cameraOptions: {
      center: [0.0015, 51.4769],
      zoom: 12,
      minZoom: 3
    }
  },
  render: (args) => (
    <AzureMap {...args}>
      <DataSource>
        <SymbolLayer>
          <Point coordinates={[0.0015, 51.4769]}/>
          <Point coordinates={[-0.0005, 51.4769]}/>
        </SymbolLayer>
      </DataSource>
    </AzureMap>
  ),
};

export const MapWithBuiltInIcons: Story = {
  args: {
    authOptions: authOptions,
    styleOptions: {
      view: "Auto",
      language: "en-US",
      style: "road_shaded_relief",
      userRegion: "Auto",
      showLogo: false,
      showFeedbackLink: false
    },
    cameraOptions: {
      center: [0.0015, 51.4769],
      zoom: 12,
      minZoom: 3
    }
  },
  render: (args) => (
    <AzureMap {...args}>
      <DataSource>
        <SymbolLayer symbolLayerOptions={{iconOptions:{image: "pin-red"}}}>
          <Point coordinates={[0.0015, 51.4769]}/>
          <Point coordinates={[-0.0005, 51.4769]}/>
        </SymbolLayer>
      </DataSource>
    </AzureMap>
  ),
};

export const MapWithCustomIcons: Story = {
  args: {
    authOptions: authOptions,
    styleOptions: {
      view: "Auto",
      language: "en-US",
      style: "road_shaded_relief",
      userRegion: "Auto",
      showLogo: false,
      showFeedbackLink: false
    },
    cameraOptions: {
      center: [0.0015, 51.4769],
      zoom: 12,
      minZoom: 3
    }
  },
  render: (args) => (
    <AzureMap {...args}>
      <IconCollection icons={[{id: "sun", href: "https://upload.wikimedia.org/wikipedia/commons/9/92/Draw_sunny.png"}]}>
        <DataSource>
          <SymbolLayer symbolLayerOptions={{iconOptions:{image: "sun", size: 0.2}}}>
            <Point coordinates={[0.0015, 51.4769]}/>
            <Point coordinates={[-0.0005, 51.4769]}/>
          </SymbolLayer>
        </DataSource>
      </IconCollection>
    </AzureMap>
  ),
};


export const MapWithBubbles: Story = {
  args: {
    authOptions: authOptions,
    styleOptions: {
      view: "Auto",
      language: "en-US",
      style: "road_shaded_relief",
      userRegion: "Auto",
      showLogo: false,
      showFeedbackLink: false
    },
    cameraOptions: {
      center: [0.0015, 51.4769],
      zoom: 12,
      minZoom: 3
    }
  },
  render: (args) => (
    <AzureMap {...args}>
      <DataSource>
        <BubbleLayer options={{
          radius: 6,
          strokeColor: "white",
          strokeWidth: 3, 
          color: "Salmon"}}>
          <Point coordinates={[0.0015, 51.4769]}/>
          <Point coordinates={[-0.0005, 51.4769]}/>
        </BubbleLayer>
      </DataSource>
      <DataSource>
        <BubbleLayer options={{
            radius: 6,
            strokeColor: "white",
            strokeWidth: 3, 
            color: "SkyBlue"}}>
            <Point coordinates={[0.0025, 51.4777]}/>
        </BubbleLayer>
      </DataSource>
    </AzureMap>
  ),
};