import Link from 'next/link'
import { useState } from "react"
import DefaultLayout from '@/layouts/default'
 
export default function Layout({ children }) {
  const [modules] = useState([
    {
      label: 'Breadcrumb',
      url: '/modules/breadcrumb'
    },
    {
      label: 'Table',
      url: '/modules/table'
    },
    {
      label: 'Select Multiple Field',
      url: '/modules/select-multiple-field'
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