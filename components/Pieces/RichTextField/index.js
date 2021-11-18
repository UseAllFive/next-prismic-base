import { RichText } from 'prismic-reactjs'
import prismicRichTextShare from 'shapes/prismic/richtext'
import htmlSerializer from './html-serializer'

const RichTextField = ({ text }) => {
  return <RichText render={text} htmlSerializer={htmlSerializer} />
}

RichTextField.propTypes = {
  text: prismicRichTextShare,
}

export default RichTextField
