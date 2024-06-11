"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@repo/ui/components/ui/card";
import { Label } from "@repo/ui/components/ui/label";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import React, { useState } from "react";
 
interface LoginFormData {
  username: string;
  password: string;
}

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

function LoginForm({
  onSubmit,
  setIsLoginForm,
}: {
  onSubmit: (data: LoginFormData) => void;
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <>
    <Card className="mx-auto max-w-sm p-4">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </CardContent>
      <div className="text-center">
          <p className="text-grey-dark text-sm">
            Don't have an account?{" "}
            <a href="#" className="no-underline text-blue font-bold">
              Sign up
            </a>
            .
          </p>
        </div>
    </Card>
    
    </>
  );
}

function RegisterForm({
  onSubmit,
  setIsLoginForm,
}: {
  onSubmit: (data: RegisterFormData) => void;
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ username, email, password });
  };

  return (
    <Card>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="space-y-2" />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="space-y-2" />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="space-y-2" />
        <Button type="submit">Register</Button>
      </form>
      <div className="space-y-2" />
      <p>
        Already have an account?{" "}
        <span onClick={() => setIsLoginForm(true)}>Login here</span>
      </p>
    </Card>
  );
}

function Next14LoginRegisterPage() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleLogin = (credentials: LoginFormData) => {
    console.log("Login:", credentials);
    // Implement login logic here
  };

  const handleRegister = (userData: RegisterFormData) => {
    console.log("Register:", userData);
    // Implement register logic here
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {isLoginForm ? (
        <LoginForm onSubmit={handleLogin} setIsLoginForm={setIsLoginForm} />
      ) : (
        <RegisterForm
          onSubmit={handleRegister}
          setIsLoginForm={setIsLoginForm}
        />
      )}
    </div>
  );
}

export default Next14LoginRegisterPage;
