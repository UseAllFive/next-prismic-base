import { RichText } from 'prismic-reactjs'
import prismicRichTextShape from 'shapes/prismic/richtext'
import htmlSerializer from './html-serializer'

const PrismicRichText = ({ text }) => {
  return <RichText render={text} htmlSerializer={htmlSerializer} />
}

PrismicRichText.propTypes = {
  text: prismicRichTextShape,
}

export default PrismicRichText
