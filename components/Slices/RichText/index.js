import styles from './index.module.scss'
import prismicRichTextShare from 'shapes/prismic/richtext'
import RichTextField from 'components/Pieces/RichTextField'

const RichTextComponent = ({ richtext }) => {
  return (
    <div className={styles.container}>
      <RichTextField text={richtext} />
    </div>
  )
}

RichTextComponent.propTypes = {
  richtext: prismicRichTextShare,
}

export default RichTextComponent
