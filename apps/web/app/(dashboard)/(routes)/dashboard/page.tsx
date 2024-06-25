"use client";

import { useRouter } from "next/navigation";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useEffect, useState } from "react";
import axios from "axios";
import { CreateUserModal } from "./_components/create-user-modal";
import { Button } from "@repo/ui/components/ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  status: boolean;
  __v: number;
}

const DashBoardPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

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
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);
  const handleDeleteRows = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete("http://localhost:5000/api/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          selectedRows,
        },
      });
      const { message } = response.data;
      if (message) {
        toast.success(message);
        history.go(0);
      }
    } catch (err) {
      console.error("Error! deleting rows", err);
    }
  };
  return (
    <div className="p-6 relative">
      <div className="absolute flex right-6 space-x-2">
        <Button
          onClick={handleDeleteRows}
          disabled={!selectedRows.length}
          variant="outline"
          className="flex items-center text-slate-700 font-medium  py-1"
        >
          <Trash className="mr-2 h-4 w-4" /> Selected Rows
        </Button>
        <CreateUserModal />
      </div>

      <DataTable
        columns={columns}
        data={users}
        setSelectedRows={setSelectedRows}
      />
    </div>
  );
};

export default DashBoardPage;
