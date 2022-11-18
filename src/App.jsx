import Login from './pages/login'
import { createClient } from '../lib/moonbase'

export default function App() {
  const client = createClient(import.meta.env.VITE_MOONBASE_API_URL)

  // client.getCollections(...), etc.

  return (
    <div class="container mx-auto">
      <main role="main">
        
        
      </main>
    </div>
  )
}
