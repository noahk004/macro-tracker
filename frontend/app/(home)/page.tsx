import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function Page() {
  return (
    <div>
      <h1>Macro Tracker</h1>

      <Button asChild><Link href="/sign-in">Sign In</Link></Button>
      <Button asChild><Link href="/sign-up">Sign Up</Link></Button>
    </div>
  )
}