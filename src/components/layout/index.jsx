import { Outlet } from "react-router-dom";
import Header from './header'
import Sidebar from './sidebar'
import Footer from './footer'

export default () => (
    <div className="container mx-auto">
        <main role="main" className="py-20 md:pl-60">
            <Outlet />
        </main>
        <Sidebar />
        <Header />
        <Footer />
    </div>
)
