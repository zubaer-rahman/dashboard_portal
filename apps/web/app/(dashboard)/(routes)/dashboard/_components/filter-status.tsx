import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Filter } from "lucide-react";

interface FilterStatusProps {
  handleStatusChange: (value: string) => void;
}
export function FilterStatus({ handleStatusChange }: FilterStatusProps) {
  return (
    <Select onValueChange={(event) => handleStatusChange(event)}>
      <SelectTrigger className="w-[120px] ">
        <Filter className="h-4 w-4 text-slate-500" />
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
