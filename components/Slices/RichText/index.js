import styles from './index.module.scss'
import prismicRichTextShape from 'shapes/prismic/richtext'
import PrismicRichText from 'components/Pieces/PrismicRichText'

const RichTextComponent = ({ richtext }) => {
  return (
    <div className={styles.container}>
      <PrismicRichText text={richtext} />
    </div>
  )
}

RichTextComponent.propTypes = {
  richtext: prismicRichTextShape,
}

export default RichTextComponent
