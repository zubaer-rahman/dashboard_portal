"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isTokenExpired } from "../../utils/token-checker";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      router.push("/dashboard");
    }
  }, []);
  return (
    <div>
      <div className="h-[100vh] flex items-center">{children}</div>
    </div>
  );
}
