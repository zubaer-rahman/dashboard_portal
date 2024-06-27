"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useCreateUser = () => {
  const pathname = usePathname();
  const isSignUpPage = pathname.includes("sign-up");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (formData: object) => {
      const response = await axios.post<{ token: string; user: object }>(
        "http://localhost:5000/api/users/register",
        formData
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success(
        isSignUpPage
          ? "Registered user successfully"
          : "Created user successfully"
      );
      pathname.includes("sign-up") ? router.push("/login") : history.go(0);
    },
  });
  return mutation;
};

export default useCreateUser;
