import Link from 'next/link'
import DefaultLayout from '@/layouts/default'

export default function Page() {
  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold underline">
        welcome to Data Visualization Guideline
      </h1>

      <p>
        hows d3 earth and table
      </p>

      <Link
        href="/modules"
      >
        See all Modules
      </Link>
    </DefaultLayout>
  )
}