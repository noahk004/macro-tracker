import { Button } from "@/components/ui";

export default function DeleteConfirmation({
  onCancel,
  onDelete,
}: {
  onCancel: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-background">
      <div className="w-screen h-full absolute top-0 left-0 bg-black opacity-50" />
      <div className="absolute bg-background p-5 rounded-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <h3>Delete</h3>
        <p>Are you sure?</p>
        <div>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onDelete} variant="destructive">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
