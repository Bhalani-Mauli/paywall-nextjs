"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

import Spinner from "@/components/atoms/Spinner/Spinner";
import { useUser } from "@/components/context/UserProvider";

import styles from "./navigation.module.css";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser, loading } = useUser();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (path) => pathname === path;

  if (loading) {
    return <Spinner />;
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          LearnToday
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`${styles.nav} ${open ? styles.open : ""}`}>
          {user ? (
            <>
              <nav className={styles.navLinks}>
                <Link
                  href="/dashboard"
                  className={
                    isActive("/dashboard") ? styles.activeLink : styles.link
                  }
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/courses"
                  className={
                    isActive("/courses") ? styles.activeLink : styles.link
                  }
                  onClick={() => setOpen(false)}
                >
                  Courses
                </Link>
                <Link
                  href="/subscription"
                  className={
                    isActive("/subscription") ? styles.activeLink : styles.link
                  }
                  onClick={() => setOpen(false)}
                >
                  Subscription
                </Link>
              </nav>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <div className={styles.authButtons}>
              <Link
                href="/auth/login"
                className={styles.loginBtn}
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className={styles.signupBtn}
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
