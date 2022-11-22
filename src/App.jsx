import * as React from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import Authenticate from './pages/authenticate'
import Home from './pages/home'
import Login from './pages/login'
import Error from './pages/error'
import Editor from './pages/editor'
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
                <Route path="/" element={<Home />} />
                <Route path="/:owner/:repo/:element/:branch/*" element={<Editor />} />
              </Route>
              <Route path="*" element={<Navigate to="/error/404" />} />
            </Routes>
          </AuthProvider>
        </ClientProvider>
      </main>
    </div>
  )
}
