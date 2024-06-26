"use client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useCreateUser = (setError: any) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleError = (err: AxiosError<any>) => {
    if (err.response) {
      const { status, data } = err.response;
      if (status === 400) {
        setError(`Bad request: ${data.message}`);
      } else {
        setError(`Error ${status}: ${data.message}`);
      }
    } else if (err.request) {
      setError("Network error. Please try again later.");
    } else {
      setError("Unexpected error. Please try again.");
    }
  };
  

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
        pathname.includes("sign-up")
          ? "Registered user successfully"
          : "Created user successfully"
      );
      pathname.includes("sign-up") ? router.push("/login") : history.go(0);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });

  return mutation;
};

export default useCreateUser;
