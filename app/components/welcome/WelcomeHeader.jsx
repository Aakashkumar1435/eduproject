"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "../ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export const WelcomeHeader = () => {
    const router = useRouter();
    const navigationItems = [
        {
            title: "Home",
            href: "/welcome",
        },
        {
            title: "About",
            href: "#about",
        },
        {
            title: "Services",
            href: "#services",
        },
    ];

    const [isOpen, setOpen] = useState(false);

    return (
        <header className="w-full z-40 fixed top-0 left-0 bg-background border-b">
            <div className="container relative mx-auto min-h-16 flex gap-4 flex-row lg:grid lg:grid-cols-2 items-center">
                <div className="justify-start items-center gap-4 lg:flex flex-row">
                    <NavigationMenu className="flex justify-start items-start">
                        <NavigationMenuList className="flex justify-start gap-4 flex-row">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={item.href}
                                            className="px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-300 hover:rounded-lg hover:text-base"
                                            >
                                            {item.title}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex justify-end w-full gap-4">
                    <Button onClick={() => router.push("/User-Sign-In")} variant="outline">Sign in</Button>
                    <Button>Get started</Button>
                </div>
                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {isOpen && (
                        <div className="absolute top-16 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 px-5 rounded-md container gap-8">
                            {navigationItems.map((item) => (
                                <div key={item.title}>
                                    <Link
                                        href={item.href}
                                        className="flex justify-between items-center"
                                    >
                                        <span className="text-lg">{item.title}</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
