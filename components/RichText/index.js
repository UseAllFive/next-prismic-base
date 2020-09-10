import { RichText } from 'prismic-reactjs'
import styles from './index.module.scss'

export default function RichTextComponent({ richtext }) {
  return (
    <div className={styles.container}>
      <RichText render={richtext} />
    </div>
  )
}
