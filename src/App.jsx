import * as React from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import Authenticate from './pages/authenticate'
import Login from './pages/login'
import Error from './pages/error'
import Explorer from './components/explorer'
import Repos from './components/repos'
import { AuthProvider, RequireAuth } from './lib/auth'
import { ClientProvider } from './lib/moonbase'
import Layout from './components/layout'

export default function App() {
  return (
    <div className="container mx-auto">
      <main role="main">
        <ClientProvider apiUrl={__APP_ENV__.MOONBASE_API_URL}>
          <AuthProvider>
            <Routes>
              <Route path="/error/:code" element={<Error />} />
              <Route path="/authenticate/:code" element={<Authenticate />} />
              <Route path="/login" element={<Login />} />
              <Route element={<RequireAuth><Layout /></RequireAuth>}>
                <Route path="/" element={<Repos />} />
                <Route path="/:owner/:repo/:element/:branch/*" element={<Explorer />} />
              </Route>
              <Route path="*" element={<Navigate to="/error/404" />} />
            </Routes>
          </AuthProvider>
        </ClientProvider>
      </main>
    </div>
  )
}
