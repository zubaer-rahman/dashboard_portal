"use client";

import { Button } from "@repo/ui/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, Trash } from "lucide-react";
import toast from "react-hot-toast";

type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  __v: number;
};
const handleDelete = async (id: String) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { message } = response.data;
    if (message) {
      toast.success("Deleted user successfully");
    }
  } catch (err) {
    console.error("Error deleting user: ", err);
  }
};
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          className="flex"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          className="flex"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "password",
    header: ({ column }) => {
      return (
        <Button
          className="flex"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Password
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { _id } = row.original;
      return (
        <Trash
          onClick={() => handleDelete(_id)}
          className="h-4 w-4 mr-2 cursor-pointer"
        />
      );
    },
  },
];
