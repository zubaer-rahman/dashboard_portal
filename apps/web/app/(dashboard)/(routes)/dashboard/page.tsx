"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./_components/data-table";
import { CreateUserModal } from "./_components/create-user-modal";
import { Button } from "@repo/ui/components/ui/button";
import { Trash } from "lucide-react";
import { PaginationState } from "@tanstack/react-table";
import { columns } from "./_components/columns";
import { useFetchUsers, User } from "../../../hooks/useFetchUsers";
import useDeleteRows from "../../../hooks/useDeleteRows";
 
const DashBoardPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const token = localStorage.getItem("token") || "";
  const user = localStorage.getItem("user") || "";

  const { data } = useFetchUsers(token, user, pagination, search, status);
  const mutation = useDeleteRows(token);

  useEffect(() => {
    if (data) {
      setUsers(data.users || []);
      setTotalCount(data.total || 0);
    }
  }, [data]);

  const handleDeleteRows = async () => {
    await mutation.mutateAsync(selectedRows);
  };

  return (
    <div className="p-6 relative">
      <div className="absolute flex right-6 space-x-2">
        <Button
          onClick={handleDeleteRows}
          disabled={!selectedRows.length}
          variant="outline"
          className="flex items-center text-slate-700 font-medium py-1"
        >
          <Trash className="mr-2 h-4 w-4" /> Selected Rows
        </Button>
        <CreateUserModal />
      </div>

      <DataTable
        columns={columns}
        data={users}
        setSelectedRows={setSelectedRows}
        pagination={pagination}
        setPagination={setPagination}
        totalCount={totalCount}
        setStatus={setStatus}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
};

export default DashBoardPage;
