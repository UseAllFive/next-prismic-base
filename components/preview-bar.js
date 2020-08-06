import { Flex } from 'rebass/styled-components'

export default function PreviewBar() {
  return (
    <Flex
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        bg: '#5163ba',
        padding: '5px 20px',
        a: { color: 'currentColor' },
      }}>
      This is page is a preview.&nbsp;<a href="/api/exit-preview">Click here</a>&nbsp;to exit preview mode.
    </Flex>
  )
}
