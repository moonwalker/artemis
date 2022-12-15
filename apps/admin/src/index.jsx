import { createRoot } from 'react-dom/client'
import { AdminPage } from './app'

const appUrl = __APP_ENV__.APP_BASE_URL || '/'

createRoot(document.getElementById('root')).render(
  <AdminPage baseUrl={appUrl} />
)
