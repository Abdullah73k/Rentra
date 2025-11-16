import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { NavLink } from "react-router-dom";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";

const HeaderNavigation = () => {
  const navButtonClass = "text-md hover:underline p-2 py-0.5";

  return (
    <header className=" bg-[#f8f8f8] flex items-center justify-between p-6">
      {/* <nav>
        <ul className="flex space-x-2">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink className={navButtonClass} to="/auth/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink className={navButtonClass} to="/auth/Signup">
              Sign up
            </NavLink>
          </li>
          <li>
            
            <NavLink className={navButtonClass} to="/auth/settings">
              Profile
            </NavLink>
          </li>
        </ul>
      </nav> */}
      <div className="flex space-x-2">
        <div className="h-2 w-2 rounded-full bg-black" />
        <div className="h-2 w-2 rounded-full bg-black" />
      </div>
      <div className="flex items-center space-x-6">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-row px-2">
            <NavigationMenuItem className={navButtonClass}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <NavLink to="/auth/Signup">Sign up</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={navButtonClass}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <NavLink to="/auth/login">Login</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={navButtonClass}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <NavLink className={navButtonClass} to="/auth/settings">
                  Profile
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={navButtonClass}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <NavLink to="/">Home</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={navButtonClass}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <NavLink to="/properties/dashboard">Dashboard</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default HeaderNavigation;
