import Link from 'next/link'

export default function Button({ children, href = '', className = '' }) {
  return <Link
    className={`btn btn-primary ${className}`}
    href={href}
  >
    {children}
  </Link>
}