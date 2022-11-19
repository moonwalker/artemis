import { Outlet } from "react-router-dom";
// import meta from 'content/site.json'
// import Header from '@components/header'
// import Sidebar from '@components/sidebar'
// import Footer from '@components/footer'

export default function Layout({ children }) {
    return (<div> <Outlet /></div>)
    // return (
    //     <div class="container mx-auto">
    //         <Header />
    //         <main role="main">
    //             <Sidebar />
    //             {children}
    //         </main>
    //         <Footer />
    //     </div>
    // )
}
