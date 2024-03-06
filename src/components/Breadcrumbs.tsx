import { useRouter } from 'next/router'

export default function Breadcrumbs() {
  const router = useRouter()
  const urlPath = router.asPath.split('/')

  const gotoPath = (visitPath: string) => {
    const visitPathIndex = urlPath.indexOf(visitPath)
    let pathString = ''

    // build url path and
    // call router.push()

    urlPath.forEach((path, pathIndex) => {
      if (pathIndex <= visitPathIndex) {
        if (pathIndex === 1) {
          pathString += path
        } else {
          pathString += '/'+path
        }
        
      }
    })

    router.push(pathString)
  }

  return <div className="text-sm breadcrumbs">
    <ul>
      {
        urlPath.map((path, index) =>
          <li
            key={path}
            onClick={() => gotoPath(path)}
          >
            {
              path === ''
            ?
              'Home'
            :
              path.charAt(0).toUpperCase() + path.slice(1)
            }
          </li>
        )
      }
    </ul>
  </div>
}