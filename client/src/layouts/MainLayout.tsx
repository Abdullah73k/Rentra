import { Outlet } from 'react-router-dom'
import HeaderNavigation from '../components/HeaderNavigation'

const MainLayout = () => {
  return (
    <>
        <HeaderNavigation />
        <main>
            <Outlet />
        </main>
    </>
  )
}

export default MainLayout
