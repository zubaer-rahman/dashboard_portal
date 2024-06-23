"use client";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface FormData {
  username: string;
  email: string;
  password: string;
}
export const UserRegistrationForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ token: string; user: object }>(
        "http://localhost:5000/api/users/register",
        formData
      );
      const { user } = response.data;
      if (user) toast.success("Registered user sucessfully");
      router.push("/login");
    } catch (err) {
      console.error("", err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">User Name</Label>
          <Input
            name="username"
            className="px-2"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            className="px-2"
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
            className="px-2"
            id="password"
            type="password"
            required
            onChange={handleChange}
          />
        </div>
        <Button
          variant="ghost"
          type="submit"
          className="w-full bg-black text-white"
        >
          Register
        </Button>
      </div>
    </form>
  );
};
