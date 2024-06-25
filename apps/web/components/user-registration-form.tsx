import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import toast from "react-hot-toast";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export const UserRegistrationForm: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ token: string; user: object }>(
        "http://localhost:5000/api/users/register",
        formData
      );
      const { user } = response.data;
      if (user) {
        toast.success(
          pathname.includes("sign-up")
            ? "Registered user successfully"
            : "Created user successfully"
        );
        router.push("/login");
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleApiError = (err: AxiosError) => {
    if (err.response) {
      // Server responded with a status code outside of 2xx range
      const { status, data } = err.response;
      setError(`Error ${status}: ${data.message}`);
    } else if (err.request) {
      // The request was made but no response was received
      setError("Network error. Please try again later.");
    } else {
      // Something happened in setting up the request that triggered an error
      setError("Unexpected error. Please try again.");
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
          {pathname.includes("sign-up") ? "Register" : "Create"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
};
