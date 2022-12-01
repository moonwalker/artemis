
import { useParams } from 'react-router-dom'

export default function Sidebar() {
  const { owner, repo, branch, collection } = useParams()

  return (
    <nav className="py-4 px-0 bg-zinc-100 shadow-inner fixed inset-y-0 left-0 md:py-20 dark:bg-gray-800 w-full h-full sm:w-20 lg:w-48">
      <ul className="relative">
        {repo && <li className="relative">
          <a className="group flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out dark:text-gray-100" href={`/cms/${owner}/${repo}/${branch}/info`}>
            <svg className="w-6 h-6 lg:mr-3 fill-gray-700 dark:fill-gray-100 group-hover:fill-gray-900 transition duration-300 ease-in-out " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
            <span className="hidden lg:block">Home</span>
          </a>
        </li>}
        {branch && <li className="relative">
          <a className="group flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out dark:text-gray-100" href={`/cms/${owner}/${repo}/${branch}`}>
            <svg className="w-6 h-6 lg:mr-3 fill-gray-700 dark:fill-gray-100 group-hover:fill-gray-900 transition duration-300 ease-in-out " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M448 480H64c-35.3 0-64-28.7-64-64V192H512V416c0 35.3-28.7 64-64 64zm64-320H0V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H448c35.3 0 64 28.7 64 64z" />
            </svg>
            <span className="hidden lg:block">Collections</span>
          </a>
        </li>}
        {collection && <li className="relative">
          <a className="group flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out dark:text-gray-100" href={`/cms/${owner}/${repo}/${branch}/${collection}`}>
            <svg className="w-6 h-6 lg:mr-3 fill-gray-700 dark:fill-gray-100 group-hover:fill-gray-900 transition duration-300 ease-in-out " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M572.6 270.3l-96 192C471.2 473.2 460.1 480 447.1 480H64c-35.35 0-64-28.66-64-64V96c0-35.34 28.65-64 64-64h117.5c16.97 0 33.25 6.742 45.26 18.75L275.9 96H416c35.35 0 64 28.66 64 64v32h-48V160c0-8.824-7.178-16-16-16H256L192.8 84.69C189.8 81.66 185.8 80 181.5 80H64C55.18 80 48 87.18 48 96v288l71.16-142.3C124.6 230.8 135.7 224 147.8 224h396.2C567.7 224 583.2 249 572.6 270.3z" />
            </svg>
            <span className="hidden lg:block">{collection}</span>
          </a>
        </li>}
      </ul>
    </nav>
  )
}
