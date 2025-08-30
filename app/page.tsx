import { redirect } from "next/navigation"

export default function HomePage() {
  // Redirect to communication log as the main page
  redirect("/communication-log")
}
