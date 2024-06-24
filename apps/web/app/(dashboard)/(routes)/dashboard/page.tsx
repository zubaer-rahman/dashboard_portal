"use client";

import { useRouter } from "next/navigation";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useEffect, useState } from "react";
import axios from "axios";
import { CreateUserModal } from "./_components/create-user-modal";
import { Button } from "@repo/ui/components/ui/button";
import { Trash } from "lucide-react";

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

  return (
    <div className="p-6">
      <div className="flex justify-end space-x-2 mb-4">
        <Button
        onClick={() => console.log(selectedRows)
        }
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
