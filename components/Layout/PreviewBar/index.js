import styles from './index.module.scss'

export default function PreviewBar() {
  return (
    <div className={styles.bar}>
      This is page is a preview.&nbsp;
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/api/exit-preview">Click here to exit preview mode</a>.
    </div>
  )
}
