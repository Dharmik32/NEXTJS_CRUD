"use client";

import { CircularProgress, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent) => {
  return function AuthGuard(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          router.push("/login");
        } else {
          setLoading(false);
        }
      }

    }, []);

    if (loading) {
      return (
        <Stack
          sx={{
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
            <CircularProgress />
        </Stack>

      );
    }
    console.log("display an wrappedcompoent", WrappedComponent);
    
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
