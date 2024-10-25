import { Button } from "@/components/ui/button";
import Link from "next/link"

export default function Page() {
    return (
        <div>
            <h1>Sign In</h1>
            <Button asChild>
                <Link href="/">Home</Link>
            </Button>
        </div>
    )
}