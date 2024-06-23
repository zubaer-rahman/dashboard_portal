import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@repo/ui/components/ui/card";
import React from "react";
import Link from "next/link";
import { UserRegistrationForm } from "../../../../components/user-registration-form";

export default function SignUpPage() {
  return (
    <>
      <Card className="mx-auto max-w-sm p-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>
            Enter your username, email and password to register an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserRegistrationForm />
        </CardContent>
        <div className="text-center mt-2">
          <p className="text-grey-dark text-sm">
            Already have an account?{" "}
            <Link href={"/login"} className="no-underline text-blue font-bold">
              Login
            </Link>
            .
          </p>
        </div>
      </Card>
    </>
  );
}
