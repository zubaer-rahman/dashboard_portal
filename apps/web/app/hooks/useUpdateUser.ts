import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useUpdateUser = (id: string) => {
  const token = localStorage.getItem("token");
  const mutation = useMutation({
    mutationFn: async (payload: object) => {
      const response = await axios.patch(
        `http://localhost:5000/api/users/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success(`Updated user successfuly`);
      history.go(0);
    },
    onError: (err) => {
      console.log("Error updating user: ", err);
    },
  });
  return mutation;
};

export default useUpdateUser;
