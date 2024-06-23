"use client";

import { Compass, Layout } from "lucide-react";
import SidebarItem from "./sidebar-item";

const routes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard" ,
  },
  { icon: Compass, label: "Browse", href: "#" },
];

const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
