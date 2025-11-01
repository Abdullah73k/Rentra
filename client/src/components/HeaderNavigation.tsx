import { NavLink } from "react-router-dom"

const HeaderNavigation = () => {
  return (
    <header>
        <nav>
            <ul>
                {/* <li>
                    <NavLink to="/" >Home</NavLink>
                </li> */}
                <li>
                    <NavLink to="/auth/login" >Login</NavLink>
                </li>
                <li>
                    <NavLink to="/auth/Signup" >Sign up</NavLink>
                </li>
                <li>
                    {/* need to add logic to display this only when user is logged in */}
                    <NavLink to="/auth/settings" >Profile</NavLink>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default HeaderNavigation
