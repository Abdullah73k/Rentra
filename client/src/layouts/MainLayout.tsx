import { Outlet } from 'react-router-dom'
import HeaderNavigation from '../components/HeaderNavigation'
import { Toaster } from 'sonner'

const MainLayout = () => {
  return (
    <>
        <HeaderNavigation />
        <main>
            <Outlet />
            <Toaster />
        </main>
    </>
  )
}

export default MainLayout
