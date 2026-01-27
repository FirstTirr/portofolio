import LoginForm from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default function LoginPage() {
  return <LoginForm />;
}
