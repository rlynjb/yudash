import Link from 'next/link'
import { useState } from "react"
import DefaultLayout from '@/layouts/default'
 
export default function Layout({ children }) {
  const [modules] = useState([
    {
      label: 'D3.js',
      url: '/modules/d3'
    },
    {
      label: 'Table',
      url: '/modules/table'
    }
  ])

  const t_modules = modules.map((module) =>
    <li
      key={module.label}
    >
      <Link
        href={module.url}
      >
        { module.label }
      </Link>
    </li>
  )

  return (
    <DefaultLayout>
      <h1>
        List of all Modules available
      </h1>

      <ul>
        {t_modules}
      </ul>

      {children}
    </DefaultLayout>
  )
}