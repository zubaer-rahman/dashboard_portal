"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import useCreateUser from "../app/hooks/useCreateUser";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export const UserRegistrationForm: React.FC = () => {
  const pathname = usePathname();
  const isSignUpPage = pathname.includes("sign-up");

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const mutation = useCreateUser();

  const onError = (err: any) => {
    const {
      data: { message },
      status,
    } = err.response;
    setError(`Error (${status}): ${message}`);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(formData, { onError });
    } catch (err) {
      console.log(
        `Error ${isSignUpPage ? "Registering" : "Creating"} user:`,
        err
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
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
          {isSignUpPage ? "Register" : "Create"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
};
