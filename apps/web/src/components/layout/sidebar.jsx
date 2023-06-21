
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useClient, endpoints } from '../../lib/moonbase'

const infoPath = 'info'
const assetPath = '_asset'

export default function Sidebar() {
  const { owner, repo, branch, collection } = useParams()
  const [modelCategories, setModelCategories] = useState()
  const client = useClient()

  useEffect(() => {
    if (owner && repo && branch) {
      client.get(endpoints.modelCategories(owner, repo, branch)).then(data => {
        if (!data.error) {
          setModelCategories(data.content)
        }
      })
    }
  }, [owner, repo, branch])


  return (
    <nav className="py-4 px-0 bg-zinc-100 shadow-inner fixed inset-y-0 left-0 md:py-20 dark:bg-gray-800 w-full h-full sm:w-20 lg:w-48">
      <ul className="relative">
        {repo && <li className="relative">
          <a className="group flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out dark:text-gray-100" href={`/cms/${owner}/${repo}/${branch}/${infoPath}`}>
            <svg className="w-6 h-6 lg:mr-3 fill-gray-700 dark:fill-gray-100 group-hover:fill-gray-900 transition duration-300 ease-in-out " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
            <span className="hidden lg:block">Home</span>
          </a>
        </li>}
        {branch && <li className="relative">
          <a className="group flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out dark:text-gray-100" href={`/cms/${owner}/${repo}/${branch}/${assetPath}`}>
            <svg className="w-6 h-6 lg:mr-3 fill-gray-700 dark:fill-gray-100 group-hover:fill-gray-900 transition duration-300 ease-in-out " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M160 32c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320H328 280 200c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120z" />
            </svg>
            <span className="hidden lg:block">Assets</span>
          </a>
        </li>}
        {branch && <li className="relative">
          <a className="group flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out dark:text-gray-100" href={`/cms/${owner}/${repo}/${branch}`}>
            <svg className="w-6 h-6 lg:mr-3 fill-gray-700 dark:fill-gray-100 group-hover:fill-gray-900 transition duration-300 ease-in-out " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              {/* {!collection || (collection == assetPath) ?
                <path d="M448 480H64c-35.3 0-64-28.7-64-64V192H512V416c0 35.3-28.7 64-64 64zm64-320H0V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H448c35.3 0 64 28.7 64 64z" /> :
                <path d="M384 480h48c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224H144c-11.4 0-21.9 6-27.6 15.9L48 357.1V96c0-8.8 7.2-16 16-16H181.5c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8H416c8.8 0 16 7.2 16 16v32h48V160c0-35.3-28.7-64-64-64H298.5c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H87.7 384z" />
              } */}
              <path d="M448 480H64c-35.3 0-64-28.7-64-64V192H512V416c0 35.3-28.7 64-64 64zm64-320H0V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H448c35.3 0 64 28.7 64 64z" />
            </svg>
            <span className="hidden lg:block">Collections</span>
          </a>
        </li>}
        {collection && (collection != assetPath) && <li className="relative">
          <a className="group flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out dark:text-gray-100" href={`/cms/${owner}/${repo}/${branch}/${collection}`}>
            <svg className="w-6 h-6 lg:mr-3 fill-gray-700 dark:fill-gray-100 group-hover:fill-gray-900 transition duration-300 ease-in-out " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M572.6 270.3l-96 192C471.2 473.2 460.1 480 447.1 480H64c-35.35 0-64-28.66-64-64V96c0-35.34 28.65-64 64-64h117.5c16.97 0 33.25 6.742 45.26 18.75L275.9 96H416c35.35 0 64 28.66 64 64v32h-48V160c0-8.824-7.178-16-16-16H256L192.8 84.69C189.8 81.66 185.8 80 181.5 80H64C55.18 80 48 87.18 48 96v288l71.16-142.3C124.6 230.8 135.7 224 147.8 224h396.2C567.7 224 583.2 249 572.6 270.3z" />
            </svg>
            <span className="hidden lg:block">{collection}</span>
          </a>
        </li>}
        {modelCategories && (<li className="relative border-t border-gray-600">
        </li>
        )}
        {modelCategories && Object.keys(modelCategories).map(mc => (<li className="relative" key={mc}>
          <a className="group flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out dark:text-gray-100" href={`/cms/${owner}/${repo}/${branch}?filter=${mc}`}>
            <svg className="w-6 h-6 lg:mr-3 fill-gray-700 dark:fill-gray-100 group-hover:fill-gray-900 transition duration-300 ease-in-out " role="img" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
              <path d="M32 119.4C12.9 108.4 0 87.7 0 64C0 28.7 28.7 0 64 0c23.7 0 44.4 12.9 55.4 32H456.6C467.6 12.9 488.3 0 512 0c35.3 0 64 28.7 64 64c0 23.7-12.9 44.4-32 55.4V392.6c19.1 11.1 32 31.7 32 55.4c0 35.3-28.7 64-64 64c-23.7 0-44.4-12.9-55.4-32H119.4c-11.1 19.1-31.7 32-55.4 32c-35.3 0-64-28.7-64-64c0-23.7 12.9-44.4 32-55.4V119.4zM456.6 96H119.4c-5.6 9.7-13.7 17.8-23.4 23.4V392.6c9.7 5.6 17.8 13.7 23.4 23.4H456.6c5.6-9.7 13.7-17.8 23.4-23.4V119.4c-9.7-5.6-17.8-13.7-23.4-23.4zM128 160c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160zM256 320h32c35.3 0 64-28.7 64-64V224h64c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V320z" />
            </svg>
            <span className="hidden lg:block">{modelCategories[mc].label}</span>
          </a>
        </li>))}
      </ul>
    </nav>
  )
}
