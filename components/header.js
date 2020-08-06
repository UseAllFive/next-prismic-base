import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <Link href="/[[...slug]]" as="/">
        <a>Home</a>
      </Link>
    </header>
  )
}
