import DefaultLayout from '@/layouts/default'
import Button from '@/components/Button'

export default function Page() {
  return (
    <DefaultLayout>
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          welcome to Data Visualization Guideline
        </h1>

        <p className="mt-4 mb-6">
          hows d3 earth and table
        </p>

        <Button
          className="mr-6"
          href="/modules"
        >
          Components
        </Button>

        <Button
          className="mr-6"
          href="/layouts"
        >
          Layouts
        </Button>

        <Button>
          Icons
        </Button>
      </div>
    </DefaultLayout>
  )
}