import { useRouter } from 'next/router'
import { useState } from 'react'
import { faker } from '@faker-js/faker';

import Breadcrumbs from '@/components/Breadcrumbs'
import Table from '@/components/Table'

import ChangeViewport from '@/features/ChangeViewport'

import ModuleLayout from '@/layouts/modules'


export default function Page() {
  const router = useRouter()


  // Change Viewport stuff
  const [viewport_cols, set_viewport_cols] = useState(12)
  const viewport_onCols = (val: any) => {
    set_viewport_cols(val.target.value)
  }


  // TODO: may need to move Table stuff on its own component page
  const sample_data = []
  for (let i=0; i<10; i++) {
    sample_data.push({
      id: faker.string.alphanumeric(20),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      jobTitle: faker.person.jobTitle(),
      zodiacSign: faker.person.zodiacSign(),
      faveColor: faker.color.human()
    })
  }
  const table_columns = [
    {field: 'firstName', name: 'First Name'},
    {field: 'lastName', name: 'Last Name'},
    {field: 'jobTitle', name: 'Job Title'},
    {field: 'zodiacSign', name: 'Zodiac Sign'},
    {field: 'faveColor', name: 'Fave Color'}
  ]


  return (
    <ModuleLayout>
      <Breadcrumbs />

      <div className="mt-6">
        <h1 className="text-2xl capitalize mb-4">
          {router.query.name}
        </h1>

        <div className="bg-black p-3 rounded-none mt-4">
          <ChangeViewport onCols={viewport_onCols} />
        </div>
        
        <div className="my-6 card bg-base-200 shadow-xl rounded-none grid grid-cols-12">
          <div className={`card-body col-span-${viewport_cols}`}>
            { router.query.name === 'breadcrumb' && <Breadcrumbs /> }
            {
              router.query.name === 'table' && 
                <Table
                  columns={table_columns}
                  rows={sample_data}
                  selector={true}
                /> 
            }
          </div>
        </div>
      </div>
    </ModuleLayout>
  )
}