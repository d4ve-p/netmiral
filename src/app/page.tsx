"use client"
import LoadingPage from "@/components/ui/loading-page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/dashboard')
  })

  return <LoadingPage />
}