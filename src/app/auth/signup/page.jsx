"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getUserFromCookie } from "@/lib/client/auth";
import SignupForm from "@/components/SignupForm/SignupForm";
import Spinner from "@/components/atoms/Spinner/Spinner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getUserFromCookie();
        if (user) {
          router.replace("/dashboard");
          return;
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <Spinner />;
  }

  return <SignupForm />;
}
