import { Outlet } from 'react-router-dom'
import HeaderNavigation from '../components/HeaderNavigation'

const Root = () => {
  return (
    <>
        <HeaderNavigation />
        <main>
            <Outlet />
        </main>
    </>
  )
}

export default Root
