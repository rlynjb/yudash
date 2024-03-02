import ModuleLayout from '@/layouts/ModuleLayout'
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <ModuleLayout>
      {router.query.name}
    </ModuleLayout>
  )
}