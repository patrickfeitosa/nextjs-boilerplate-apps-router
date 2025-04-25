import { Meta, StoryObj } from '@storybook/react';

import Main from '.';

export default {
  args: {
    description: 'description default',
    title: 'title default',
  },
  component: Main,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Main',
} as Meta;

export const Default: StoryObj = {};

export const Basic: StoryObj = {
  args: {
    description: 'description basic',
    title: 'title basic',
  },
};
