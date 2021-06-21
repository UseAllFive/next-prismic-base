import Component from './index.js'

const ButtonStoryProps = {
  title: 'Button',
  component: Component,
}

export default ButtonStoryProps

const Template = (args) => <Component {...args} />

export const Button = Template.bind({})
Button.args = { link: {}, children: 'test' }
