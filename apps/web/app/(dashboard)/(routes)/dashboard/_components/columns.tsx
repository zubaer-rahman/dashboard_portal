"use client";

import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
 import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, Trash } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { IndeterminateCheckbox } from "./indeterminate-checkbox";

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
      history.go(0);
    }
  } catch (err) {
    console.error("Error deleting user: ", err);
  }
};
export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

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
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          className="flex"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (prop) => {
      const value = prop.getValue();
      return (
        <Badge variant="outline" className="text-white bg-slate-700">
          {value ? "Active" : "Inactive"}
        </Badge>
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
