import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Main } from './Main';

const meta: Meta<typeof Main> = {
  args: {
    description: 'description default',
    title: 'title default',
  },
  component: Main,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Main',
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Default: Story = {};

export const Basic: Story = {
  args: {
    description: 'description basic',
    title: 'title basic',
  },
};
