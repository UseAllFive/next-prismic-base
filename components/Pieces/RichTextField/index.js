import { RichText } from 'prismic-reactjs'
import prismicRichTextShape from 'shapes/prismic/richtext'
import htmlSerializer from './html-serializer'

const RichTextField = ({ text }) => {
  return <RichText render={text} htmlSerializer={htmlSerializer} />
}

RichTextField.propTypes = {
  text: prismicRichTextShape,
}

export default RichTextField
