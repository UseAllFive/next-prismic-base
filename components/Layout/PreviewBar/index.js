import styles from './index.module.scss'

export default function PreviewBar() {
  return (
    <div className={styles.bar}>
      This is page is a preview.&nbsp;
      <a href="/api/exit-preview">Click here to exit preview mode</a>.
    </div>
  )
}
