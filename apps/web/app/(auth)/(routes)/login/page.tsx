"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@repo/ui/components/ui/card";
import { Label } from "@repo/ui/components/ui/label";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  useEffect(() => {
    localStorage.getItem("token") && router.push("/dashboard");
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formData);

      const response = await axios.post<{ token: string; user: object }>(
        "http://localhost:5000/api/users/login",
        formData
      ); // Assuming your login API endpoint is /api/login

      const { token, user } = response.data;
      console.log(token, user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm p-4">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="px-2"
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                onChange={handleChange}
                className="px-2"
                id="password"
                type="password"
                required
              />
            </div>
            <Button
              variant="ghost"
              type="submit"
              className="w-full bg-black text-white"
            >
              Login
            </Button>
          </div>
        </form>
      </CardContent>
      <div className="text-center mt-2">
        <p className="text-grey-dark text-sm">
          Don't have an account?{" "}
          <Link href="/sign-up" className="no-underline text-blue font-bold">
            Sign up
          </Link>
          .
        </p>
      </div>
    </Card>
  );
};
export default LoginPage;
