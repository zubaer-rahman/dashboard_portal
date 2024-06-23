"use client";

import { Button } from "@repo/ui/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavbarRoutes = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser).username);
    }
  }, []);
  
  return (
    <>
      <div className="flex gap-x-2 ml-auto items-center">
        <Button
          onClick={handleLogout}
          size="sm"
          variant="outline"
          className="flex p-1"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>

        <div className="rounded-full border border-slate-700 p-1 ">
          <User2 />
        </div>
        <p>{user}</p>
      </div>
    </>
  );
};

export default NavbarRoutes;
