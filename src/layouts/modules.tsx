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
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1 mt-1">
          <ul>
            {t_modules}
          </ul>
        </div>

        <div className="col-span-5">
          {children}
        </div>
      </div>
    </DefaultLayout>
  )
}