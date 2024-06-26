// hooks/useDeleteRows.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useDeleteRows = (token: string) => {
  const mutation = useMutation<void, Error, string[]>({
    mutationFn: async (selectedRows: string[]) => {
      const response = await axios.delete("http://localhost:5000/api/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { selectedRows },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Rows deleted successfully");
      history.go(0);
    },
    onError: (error: any) => {
      console.error("Error deleting rows:", error);
      toast.error("Failed to delete rows");
    },
  });

  return mutation;
};

export default useDeleteRows;
