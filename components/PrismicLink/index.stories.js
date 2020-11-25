import PrismicLink from './index.js'

export default {
  title: 'Components/PrismicLink',
  component: PrismicLink,
}

const Template = (args) => <PrismicLink {...args} />

export const NoLink = Template.bind({})
NoLink.args = { link: {}, children: 'test' }
