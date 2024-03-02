import ModuleLayout from '@/layouts/ModuleLayout'
import { useRouter } from 'next/router'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function Page() {
  const router = useRouter()

  return (
    <ModuleLayout>
      <Breadcrumbs />

      <div>
        {router.query.name}
      </div>
    </ModuleLayout>
  )
}