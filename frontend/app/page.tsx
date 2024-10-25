import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function Page() {
  return (
    <div>
      <h1>Macro Tracker</h1>

      <Button asChild><Link href="/items">View Items</Link></Button>
    </div>
  )
}