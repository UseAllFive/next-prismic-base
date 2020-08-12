import { RichText } from 'prismic-reactjs'

export default function RichTextComponent({ richtext }) {
  return <RichText render={richtext} />
}
