import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";

import { PlusCircle } from "lucide-react";
import { UserRegistrationForm } from "../../../../../components/user-registration-form";

export function CreateUserModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            className="flex items-center text-slate-700 font-medium  py-1"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> New
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Enter your username, email and password to create an account
          </DialogDescription>
        </DialogHeader>
        <UserRegistrationForm />
      </DialogContent>
    </Dialog>
  );
}
