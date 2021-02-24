import Component from './index.js'

export default {
  title: 'Button',
  component: Component,
}

const Template = (args) => <Component {...args} />

export const Button = Template.bind({})
Button.args = { link: {}, children: 'test' }
