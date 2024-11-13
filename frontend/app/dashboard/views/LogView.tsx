"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

import DeleteConfirmation from "../components/DeleteConfirmation";

import { LoaderCircle } from "lucide-react";

const dummyLogs = [
  {
    id: 1,
    title: "11/12/2024",
  },
  {
    id: 2,
    title: "11/11/2024",
  },
  {
    id: 3,
    title: "11/10/2024",
  },
  {
    id: 4,
    title: "11/9/2024",
  },
];

export default function LogView() {
  return (
    <div>
      {dummyLogs.map((log) => {
        const [deleteConfirmation, setDeleteConfirmation] =
          useState<boolean>(false);

        const [editLoading, setEditLoading] = useState<boolean>(false);

        return (
          <div
            key={log.id}
            className="border-2 border-gray-200 p-4 w-fit rounded-lg"
          >
            <h2>{log.title}</h2>
            <p>Calories: x</p>
            <p>Protein: x</p>
            <div>
              {editLoading ? (
                <LoaderCircle />
              ) : (
                <Button onClick={() => setEditLoading(true)} asChild>
                  <Link href={`/dashboard/logs/${log.id}`}>Edit</Link>
                </Button>
              )}

              <Button
                variant="destructive"
                onClick={() => setDeleteConfirmation(true)}
              >
                Delete
              </Button>
            </div>

            {deleteConfirmation && (
              <DeleteConfirmation
                onCancel={() => {
                  setDeleteConfirmation(false);
                }}
                onDelete={() => {}}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
