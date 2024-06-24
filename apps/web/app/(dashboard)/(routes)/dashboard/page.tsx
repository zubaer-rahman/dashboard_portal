"use client";

import { useRouter } from "next/navigation";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useEffect, useState } from "react";
import axios from "axios";
import { CreateUserModal } from "./_components/create-user-modal";

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  __v: number;
}

const DashBoardPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (!token || !user) {
        router.push("/login");
        return;
      }

      try {
        const parsedUser: User = JSON.parse(user);
        const response = await axios.get(
          `http://localhost:5000/api/users?id=${parsedUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle unauthorized access or other errors
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="p-6">
      <CreateUserModal />
      <DataTable
        columns={columns}
        data={users}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </div>
  );
};

export default DashBoardPage;
