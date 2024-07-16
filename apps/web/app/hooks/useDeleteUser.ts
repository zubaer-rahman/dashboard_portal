import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { isTokenExpired } from "../../utils/token-checker";
import { useRouter } from "next/navigation";

const useDeleteUser = (id: string) => {
  const router = useRouter();
  const token = localStorage.getItem("token");
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        if (isTokenExpired(token)) {
          router.push("/login");
        }
        const response = await axios.delete(
          `http://localhost:5000/api/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {}
    },
    onSuccess: () => {
      toast.success("Deleted user succesfuly");
      router.refresh();
    },
    onError: (err) => {
      console.log("Error deleting user", err);
    },
  });
  return mutation;
};

export default useDeleteUser;
