"use client";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { createNewDocument } from "@/Actions/actions";

const NewDocumentButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
  };
  return (
    <div>
      <Button disabled={isPending} onClick={handleCreateNewDocument}>
        {isPending ? "Creating..." : "New Document"}
      </Button>
    </div>
  );
};
export default NewDocumentButton;
