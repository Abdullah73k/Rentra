import { NavLink, useNavigate } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { authClient } from "@/utils/auth-client";

const navigationLinks = [
  {
    title: "Home",
    href: "/",
    description: "Overview of the platform and key product details.",
  },
  {
    title: "Sign up",
    href: "/auth/signup",
    description: "Create an account to start managing your properties.",
  },
  {
    title: "Login",
    href: "/auth/login",
    description: "Securely access your property management workspace.",
  },
  {
    title: "Profile",
    href: "/auth/settings",
    description: "Personalize preferences, billing data, and notifications.",
  },
];

const HeaderNavigation = () => {
  const navigate = useNavigate();
  return (
    // header styling is the same, just made relative
    <header className="relative bg-[#f8f8f8] p-6 flex">
      {/* left dots block, unchanged */}
      <div className="mx-auto flex w-full flex-row gap-4 md:items-center md:justify-between">
        <div className="flex space-x-2">
          <div className="h-2 w-2 rounded-full bg-black" />
          <div className="h-2 w-2 rounded-full bg-black" />
        </div>
      </div>

      {/* hamburger menu absolutely positioned at the top-right */}
      <NavigationMenu className="relative right-6 top-6">
        <NavigationMenuList className="justify-end ml-110">
          <NavigationMenuItem className="">
            <NavigationMenuTrigger className="flex items-center justify-between gap-3 rounded-2xl border border-grey-500/60 bg-white px-4 py-3 font-semibold uppercase tracking-wide text-[#2e1c17] shadow-sm transition hover:bg-[#ffffff] focus-visible:ring-grey-600/50 focus-visible:ring-offset-0 [&_svg]:hidden">
              <span className="sr-only">Toggle site navigation</span>
              <div className="flex items-center gap-3">
                <div className="flex flex-col space-y-1">
                  <span className="h-0.5 w-7 bg-black" />
                  <span className="h-0.5 w-7 bg-black" />
                  <span className="h-0.5 w-7 bg-black" />
                </div>
                <span className="text-xs black">Menu</span>
              </div>
            </NavigationMenuTrigger>

            {/* dropdown panel now fully on-screen */}
            <NavigationMenuContent className="z-50 rounded-3xl border border-[#fdd6c4] bg-[#2b1310] p-0 text-white shadow-2xl relative top-0 left-0 ">
              <div className="grid gap-5 p-6 md:w-[460px] lg:w-[580px] lg:grid-cols-[0.65fr_1fr]  ">
                <NavigationMenuLink asChild className="">
                  <NavLink
                    to="/properties/dashboard"
                    className="flex  h-full flex-col justify-between rounded-2xl bg-linear-to-br from-[#ff9770] via-[#fe7e6d] to-[#f04d64] p-6 text-left shadow-lg transition hover:shadow-2xl"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase text-white/80">
                        Dashboard
                      </p>
                      <h3 className="mt-2 text-2xl font-black">
                        Control Center
                      </h3>
                      <p className="mt-3 text-sm text-white/90">
                        Track occupancy, payments, and maintenance tasks with
                        real-time alerts.
                      </p>
                    </div>
                    <span className="mt-5 text-sm font-semibold text-white">
                      Go to dashboard -&gt;
                    </span>
                  </NavLink>
                </NavigationMenuLink>

                <ul className="grid gap-2 text-sm">
                  {navigationLinks.map((link) => (
                    <li key={link.title}>
                      <NavigationMenuLink asChild>
                        <NavLink
                          to={link.href}
                          className="block rounded-2xl border border-white/10 bg-white/10 p-4 text-left text-white transition hover:border-white/30 hover:bg-white/20"
                        >
                          <div className="text-base font-semibold text-[#ffe1d6]">
                            {link.title}
                          </div>
                          <p className="mt-1 text-xs text-white/80">
                            {link.description}
                          </p>
                        </NavLink>
                      </NavigationMenuLink>
                    </li>
                  ))}
                  <li className="h-12">
                    <NavigationMenuLink asChild>
                      <Button
                        onClick={() =>
                          authClient.signOut({
                            fetchOptions: {
                              onSuccess: () => {
                                navigate("/");
                              },
                            },
                          })
                        }
                        className="flex h-12 w-full items-start border border-white/10 bg-white/10 p-4 text-left text-white transition hover:border-white/30 hover:bg-white/20"
                      >
                        <p className="text-base font-semibold text-[#ffe1d6]">
                          Sign Out
                        </p>
                      </Button>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default HeaderNavigation;
