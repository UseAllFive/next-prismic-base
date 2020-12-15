import Component from './index.js'

export default {
  title: 'Button',
  component: Button,
}

const Template = (args) => <Component {...args} />

export const Button = Template.bind({})
Button.args = { link: {}, children: 'test' }
