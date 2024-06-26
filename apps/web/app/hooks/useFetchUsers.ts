import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  status: boolean;
  __v: number;
}

interface Pagination {
  pageIndex: number;
  pageSize: number;
}

interface FetchUsersParams {
  token: string;
  user: string;
  pagination: Pagination;
  search: string;
  status: string;
}

const fetchUsers = async ({
  token,
  user,
  pagination,
  search,
  status,
}: FetchUsersParams) => {
  const parsedUser: User = JSON.parse(user);
  const response = await axios.get(
    `http://localhost:5000/api/users?id=${parsedUser._id}&page=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize}&search=${search}&status=${status}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export function useFetchUsers(
  token: string,
  user: string,
  pagination: Pagination,
  search: string,
  status: string
) {
  const router = useRouter();
  const queryKey: QueryKey = ["users", user, pagination, search, status];

  const queryFn = async () => {
    try {
      return await fetchUsers({ token, user, pagination, search, status });
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const queryOptions: UseQueryOptions<any, Error, any, QueryKey> = {
    queryKey,
    queryFn,
  };

  const { data, error, isLoading } = useQuery(queryOptions);

  if (error) {
    console.error("Error fetching users:", error);
    router.push("/login");
  }

  return { data, isLoading, error };
}
