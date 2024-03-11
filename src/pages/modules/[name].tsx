import ModuleLayout from '@/layouts/modules'
import { useRouter } from 'next/router'
import Breadcrumbs from '@/components/Breadcrumbs'
import Table from '@/components/Table'
import AdjustLayout from '@/features/SwitchLayout'
import { useState } from 'react'

export default function Page() {
  const router = useRouter()
  const [layout_cols, set_layout_cols] = useState(12)

  // Table sample data

  const listenCols = (val: any) => {
    set_layout_cols(val.target.value)
  }

  return (
    <ModuleLayout>
      <Breadcrumbs />

      <div className="mt-6">
        <h1 className="text-2xl capitalize mb-4">
          {router.query.name}
        </h1>

        <div className="bg-black p-3 rounded-none mt-4">
          <AdjustLayout onCols={listenCols} />
        </div>
        
        <div className="my-6 card bg-base-200 shadow-xl rounded-none grid grid-cols-12">
          <div className={`card-body col-span-${layout_cols}`}>
            { router.query.name === 'breadcrumb' && <Breadcrumbs /> }
            { router.query.name === 'table' && <Table /> }
          </div>
        </div>
      </div>
    </ModuleLayout>
  )
}