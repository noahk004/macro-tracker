"use client";

import Cookies from "js-cookie"

import { Button, Input } from "@/components/ui/index";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { LoaderCircle } from "lucide-react";

export default function Page() {
  const router = useRouter();

  const jwt = Cookies.get("jwt");
  if (jwt) {
    router.push("/dashboard");
  }

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [invalidCredentialsError, setInvalidCredentialsError] =
    useState<boolean>(false);

  const [userNotFoundError, setUserNotFoundError] = useState<boolean>(false);

  const handleSubmit = async () => {
    setInvalidCredentialsError(false);
    setUserNotFoundError(false);

    try {
      setLoading(true);
      const response = await fetch(
        `http://${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/tokens`,
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include"
        }
      );
      const responseData = await response.json();

      if (response.status == 200) {
        router.push("/dashboard");
      } else {
        setLoading(false);
        if (response.status == 401) {
          setInvalidCredentialsError(true);
        } else if (response.status == 404) {
          setUserNotFoundError(true);
        } else {
          throw new Error(responseData.message);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Something went wrong while signing in: ", error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="md:border-2 px-6 py-8 md:border-gray-200 rounded-2xl flex flex-col gap-3">
        <div>
          <h1 className="font-bold text-2xl">Sign In</h1>
          <p>Log into your account by entering your credentials.</p>
        </div>
        <div>
          <p>Username</p>
          <Input onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <p>Password</p>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {invalidCredentialsError && (
          <p className="text-red-500">Password is incorrect.</p>
        )}
        {userNotFoundError && <p className="text-red-500">User not found.</p>}
        <Link
          href="/sign-up"
          className="underline underline-offset-2 text-blue-500"
        >
          Don't have an account? Create one here.
        </Link>
        <div className="flex justify-end gap-2">
          <Button asChild variant="outline">
            <Link href="/">Cancel</Link>
          </Button>
          {!loading ? (
            <Button disabled={!username || !password} onClick={handleSubmit}>
              Sign In
            </Button>
          ) : (
            <div className="flex justify-center items-center w-12">
              <LoaderCircle className="animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
