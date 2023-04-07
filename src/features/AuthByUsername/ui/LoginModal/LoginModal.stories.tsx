import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoginModal } from './LoginModal';

export default {
    title: 'shared/Input',
    component: LoginModal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginModal>;

const Template: ComponentStory<typeof LoginModal> = (args) => (
    <LoginModal {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
