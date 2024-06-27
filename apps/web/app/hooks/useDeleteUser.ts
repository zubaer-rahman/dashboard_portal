import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useDeleteUser = (id: string) => {
  const token = localStorage.getItem("token");
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Deleted user succesfuly");
      history.go(0);
    },
    onError: (err) => {
      console.log("Error deleting user", err);
    },
  });
  return mutation;
};

export default useDeleteUser;
