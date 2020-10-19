import { RichText } from 'prismic-reactjs'
import styles from './index.module.scss'
import prismicRichTextShare from 'shapes/prismic/richtext'

const RichTextComponent = ({ richtext }) => {
  return (
    <div className={styles.container}>
      <RichText render={richtext} />
    </div>
  )
}

RichTextComponent.propTypes = {
  richtext: prismicRichTextShare,
}

export default RichTextComponent
