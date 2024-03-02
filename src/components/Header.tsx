import Link from 'next/link'

export default function Header() {
  return <header>
    <div className="container mx-auto py-6">
      <Link href="/">
        yudash
      </Link>
    </div>
  </header>
}