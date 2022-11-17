import config from '../config'
import { createClient } from '../lib/moonbase'

export default function App() {
  const client = createClient(config.MOONBASE_API_URL)

  // client.getCollections(...), etc.

  return <h1 class="text-3xl font-bold underline">Artemis</h1>
}
