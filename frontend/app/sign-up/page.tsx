"use client";

import { Button, Input } from "@/components/ui/index";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { LoaderCircle } from "lucide-react";

import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [passwordsMatchError, setPasswordsMatchError] =
    useState<boolean>(false);
  const [existingUsernameError, setExistingUsernameError] =
    useState<boolean>(false);

  useState<boolean>(false);

  useEffect(() => {
    setPasswordsMatchError(!(password == confirmPassword));
  }, [confirmPassword]);

  const handleSubmit = async () => {
    setExistingUsernameError(false)

    try {
      setLoading(true);
      const response = await fetch(
        `http://${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/users`,
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      const responseData = await response.json()

      if (responseData.message.includes("duplicate")) {
        setExistingUsernameError(true);
        return
      }
      router.push("/sign-in");
      
    } catch (error) {
      console.error("Something went wrong while adding a new user: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="md:border-2 px-6 py-8 md:border-gray-200 rounded-2xl flex flex-col gap-3">
        <div>
          <h1 className="font-bold text-2xl">Sign Up</h1>
          <p>Create an account by entering your credentials.</p>
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

        <div>
          <p>Confirm Password</p>
          <Input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {passwordsMatchError && (
          <p className="text-red-500">Passwords must match.</p>
        )}
        {existingUsernameError && (
          <p className="text-red-500">Username already exists. Please enter a new username.</p>
        )}

        <Link
          href="/sign-in"
          className="underline underline-offset-2 text-blue-500"
        >
          Already have an account? Sign in.
        </Link>

        <div className="flex justify-end gap-2">
          <Button asChild variant="outline">
            <Link href="/">Cancel</Link>
          </Button>
          {!loading ? (
            <Button
              disabled={
                !username ||
                !password ||
                !confirmPassword ||
                !(password == confirmPassword)
              }
              onClick={handleSubmit}
            >
              Submit
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
