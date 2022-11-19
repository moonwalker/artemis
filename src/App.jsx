import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Authenticate from './pages/authenticate'
import Home from './pages/home'
import Login from './pages/login'
import { AuthProvider, RequireAuth } from './lib/auth'
import Layout from './components/layout'
// import { createClient } from '../lib/moonbase'

export default function App() {
  // const client = createClient(import.meta.env.VITE_MOONBASE_API_URL)

  // client.getCollections(...), etc.
  return (
    <div class="container mx-auto">
      <main role="main">
        <AuthProvider>
          <Routes>
            <Route path="/authenticate" element={<Authenticate />} />
            <Route path="/login" element={<Login />} />
            <Route element={<RequireAuth><Layout /></RequireAuth>}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </AuthProvider>
      </main>
    </div>
  )
}
