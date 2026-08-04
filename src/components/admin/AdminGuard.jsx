"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth/api/api";

const subscribeToAuth = (callback) => {
  window.addEventListener("storage", callback);
  window.addEventListener("authChange", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("authChange", callback);
  };
};

const getAdminTokenSnapshot = () => Boolean(localStorage.getItem("adminToken"));
const getServerSnapshot = () => false;

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const hasAdminToken = useSyncExternalStore(
    subscribeToAuth,
    getAdminTokenSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    let isMounted = true;

    const verifyAdminAccess = async () => {
      if (!hasAdminToken) {
        if (isMounted) {
          setIsAuthorized(false);
          setIsChecking(false);
        }
        router.replace("/");
        return;
      }

      try {
        const profile = await authService.getMe();
        const role = profile?.role || profile?.user?.role || "";
        const isAdmin =
          role === "admin" ||
          profile?.user?.is_staff === true ||
          profile?.user?.is_superuser === true;

        if (!isMounted) return;

        if (isAdmin) {
          localStorage.setItem("userRole", role || "admin");
          setIsAuthorized(true);
          setIsChecking(false);
          return;
        }

        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRefreshToken");
        localStorage.removeItem("isAdmin");
        localStorage.setItem("userRole", "user");
        setIsAuthorized(false);
        setIsChecking(false);
        router.replace("/");
      } catch (error) {
        if (!isMounted) return;

        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRefreshToken");
        localStorage.removeItem("isAdmin");
        localStorage.setItem("userRole", "user");
        setIsAuthorized(false);
        setIsChecking(false);
        router.replace("/");
      }
    };

    verifyAdminAccess();

    return () => {
      isMounted = false;
    };
  }, [hasAdminToken, router]);

  if (isChecking || !isAuthorized) return null;

  return children;
}
