import { Outlet } from "react-router-dom";
// import meta from 'content/site.json'
// import Header from '@components/header'
// import Sidebar from '@components/sidebar'
import Footer from './footer'

export default () => (
    <div class="container mx-auto">
        {/* <Header /> */}
        <main role="main" className="py-12">
            {/* <Sidebar /> */}
            <Outlet />
        </main>
        <Footer />
    </div>
)
