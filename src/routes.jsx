import App from './App'
import Login from './pages/login'
import NotFound from './pages/404'
import Error from './pages/500'

export default () => ([
  {
    path: "/",
    element: (<App />),
  },
  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/404",
    element: (<NotFound />),
  },
  {
    path: "/500",
    element: (<Error />),
  },
])