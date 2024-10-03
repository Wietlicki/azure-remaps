import type { Meta, StoryObj } from '@storybook/react';
import InteractiveMap from './StoryComponents/InteractiveMap';

const meta = {
    title: 'AzureRemaps/InteractiveMap',
    component: InteractiveMap,
    decorators: [(Story)=><div style={{width: "400px", height: "400px"}}><Story/></div>],
    parameters: {
      layout: 'centered',
    },
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {},
    args: { },
} satisfies Meta<typeof InteractiveMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        subscriptionKey: "xxxx"
    },
};