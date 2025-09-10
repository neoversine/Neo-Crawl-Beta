"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "../utils/CheckAuth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validate = async () => {
            const isValid = await checkAuth();
            if (!isValid) {
                router.replace("/login"); // or "/signup"
            }
            setLoading(false);
        };
        validate();
    }, [router]);

    if (loading) return <p>Checking authentication...</p>;

    return <>{children}</>;
}
