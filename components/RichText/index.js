import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'
import styles from './index.module.scss'
import PRISMIC_RICHTEXT_SHAPE from 'shapes/prismic/richtext'

const RichTextComponent = ({ richtext }) => {
  return (
    <div className={styles.container}>
      <RichText render={richtext} />
    </div>
  )
}

RichTextComponent.propTypes = {
  richtext: PRISMIC_RICHTEXT_SHAPE,
}

export default RichTextComponent
