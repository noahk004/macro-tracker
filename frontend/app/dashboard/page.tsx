import Link from "next/link";
import LogView from "./views/LogView";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div>
        <h1 className="text-2xl">My Logs</h1>
        <LogView />
        <Button>Add new log</Button>
    </div>
  );
}
