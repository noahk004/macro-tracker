import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
    return (
        <div>
            
            <h1>My Items</h1>
            <Button asChild>
                <Link href="/">Back Home</Link>
            </Button>
            <Button>Add new item</Button>
        </div>
    )
}