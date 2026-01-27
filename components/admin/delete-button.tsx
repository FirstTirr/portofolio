"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<void>;
}

export function DeleteButton({ id, action }: DeleteButtonProps) {
  return (
    <form action={async () => await action(id)}>
      <Button variant="destructive" size="icon" type="submit">
        <Trash className="h-4 w-4" />
      </Button>
    </form>
  );
}
