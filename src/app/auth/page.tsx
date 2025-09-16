"use client"

import useSWR from "swr"
import LoginPage from "./loginPage"
import RegisterPage from "./registerPage"
import { CHECK_ADMIN_EXISTS_ENDPOINT, checkAdminExists } from "@/lib/api/admin"
import LoadingPage from "@/components/ui/loading-page"

export default function Page() {
  const { data, isLoading } = useSWR(CHECK_ADMIN_EXISTS_ENDPOINT, checkAdminExists)

  if(isLoading || data === undefined) {
    return <LoadingPage />
  }

  if(data?.admin_exists) {
    return <LoginPage/>
  }

  return (
    <RegisterPage/>
  )
}