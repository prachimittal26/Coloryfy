"use client";

import { useState, useContext, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { SearchContext } from "@/context/SearchContextProvider";
import Link from "next/link";
import { pacifico } from "@/lib/fonts";
import { usePathname } from "next/navigation";
import { Logo } from ".";
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
interface NavbarProps {
  hideSearch?: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ hideSearch = false }) => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [pendingFocus, setPendingFocus] = useState(false);
  const { triggerFocus } = useContext(SearchContext);
  const { theme, setTheme } = useTheme();
  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    {
      href: "https://github.com/prachimittal26/Coloryfy/blob/main/README.md",
      label: "Docs",
      external: true,
    },
  ];

  const handleSearchClick = useCallback(() => {
    const searchSection = document.getElementById("search-section");
    if (searchSection) {
      const offset = 50;
      const elementPosition = searchSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      triggerFocus();
    }
  }, [triggerFocus]);

  useEffect(() => {
    if (pendingFocus && pathname === "/") {
      handleSearchClick();
      setPendingFocus(false);
    }
  }, [pathname, pendingFocus, handleSearchClick]);

  return (
    <nav className="my-6" aria-label="Global">
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Logo (and hamburger on mobile) */}
        <div className="flex items-center gap-4">
          {/* Mobile hamburger menu */}
          <div className="md:hidden">
            <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8"
                  variant="ghost"
                  size="icon"
                  aria-expanded={isMenuOpen}
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                  <span className="sr-only">
                    {isMenuOpen ? "Close menu" : "Open menu"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                align="start"
                className="w-48 p-2"
                aria-describedby="mobile-menu-description"
              >
                <nav
                  className="space-y-2"
                  role="navigation"
                  aria-label="Main navigation"
                >
                  {menuItems.map((item) => (
                    <div key={item.href}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium rounded-sm hover:bg-accent"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className={`block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium rounded-sm hover:bg-accent ${
                            pathname === item.href
                              ? "text-foreground font-semibold bg-accent"
                              : ""
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </PopoverContent>
            </Popover>
          </div>
          {/* Logo */}
          <Logo />
        </div>

        {/* Center - Desktop Navigation */}
        <div className="hidden md:flex md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  {item.external ? (
                    <NavigationMenuLink asChild>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors font-semibold"
                      >
                        {item.label}
                      </a>
                    </NavigationMenuLink>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={`text-muted-foreground hover:text-foreground transition-colors font-semibold ${
                          pathname === item.href ? "text-foreground" : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side - Search */}
        <div className="flex items-center">
          {!hideSearch && (
            <Button asChild variant="ghost" size="icon">
              <Link
                href="/"
                onClick={(e) => {
                  if (pathname === "/") {
                    e.preventDefault();
                    handleSearchClick();
                  } else {
                    setPendingFocus(true);
                  }
                }}
              >
                <Search className="size-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
