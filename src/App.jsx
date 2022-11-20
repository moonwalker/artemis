import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Authenticate from './pages/authenticate'
import Home from './pages/home'
import Login from './pages/login'
import Signin from './pages/signin'
import { AuthProvider, RequireAuth } from './lib/auth'
import { ClientProvider } from './lib/moonbase'
import Layout from './components/layout'

export default function App() {
  return (
    <div class="container mx-auto">
      <main role="main">
        <ClientProvider apiUrl={import.meta.env.VITE_MOONBASE_API_URL}>
          <AuthProvider>
            <Routes>
              <Route path="/authenticate" element={<Authenticate />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login" element={<Signin />} />
              <Route element={<RequireAuth><Layout /></RequireAuth>}>
                <Route path="/" element={<Home />} />
              </Route>
            </Routes>
          </AuthProvider>
        </ClientProvider>
      </main>
    </div>
  )
}
