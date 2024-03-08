import ModuleLayout from '@/layouts/modules'
import { useRouter } from 'next/router'
import Breadcrumbs from '@/components/Breadcrumbs'
import Table from '@/components/Table'

export default function Page() {
  const router = useRouter()

  // Table sample data

  return (
    <ModuleLayout>
      <Breadcrumbs />

      <div className="mt-6">
        <h1 className="text-2xl capitalize mb-4">
          {router.query.name}
        </h1>
        <span className="badge badge-ghost p-3 rounded-none">
          import {router.query.name} from '@/components/{router.query.name}'
        </span>

        { router.query.name === 'table' &&
          <div className="mt-6">
            <label>Select data to load:</label>
            <div>
              rick and morty api, country list api
            </div>
            <label>Features:</label>
            <div>
              list of features and interactive
            </div>
          </div>
        }
        
        <div className="my-6 card bg-base-200 shadow-xl rounded-none">
          <div className='card-body'>
            { router.query.name === 'breadcrumb' && <Breadcrumbs /> }
            { router.query.name === 'table' && <Table /> }
          </div>
        </div>
      </div>
    </ModuleLayout>
  )
}