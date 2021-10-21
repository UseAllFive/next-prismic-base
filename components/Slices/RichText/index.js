import { RichText } from 'prismic-reactjs'
import styles from './index.module.scss'
import prismicRichTextShare from 'shapes/prismic/richtext'
import { htmlSerializer } from 'lib/richtext'

const RichTextComponent = ({ richtext }) => {
  return (
    <div className={styles.container}>
      <RichText render={richtext} htmlSerializer={htmlSerializer} />
    </div>
  )
}

RichTextComponent.propTypes = {
  richtext: prismicRichTextShare,
}

export default RichTextComponent
