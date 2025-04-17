"use client";

import { Button } from "../ui/button";
import { useRouter, usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const navigationItems = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Pricing", href: "/pricing" },
    { title: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className={styles.navbarContainer}>
      <div className={styles.navbarInner}>
        {/* Logo */}
        <div className={styles.navLeft}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className={styles.logo}
          />

          {/* Navigation Menu */}
          <NavigationMenu className={styles.navMenu}>
            <NavigationMenuList className={styles.navMenuList}>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                  <Link
  href={item.href}
  className={`${styles.navLink} ${
    pathname === item.href ? styles.activeLink : ''
  }`}
>
  {item.title}
</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth Buttons */}
        <div className={styles.authButtons}>
          <Button onClick={() => router.push("/UserAuth/User-Sign-in")} variant="outline">
            Sign in
          </Button>
          <Button  onClick={() => router.push("/UserAuth/User-Sign-Up")} variant="outline">Get started</Button>
        </div>
      </div>
    </header>
  );
};
