"use client";

import { MenuIcon } from "lucide-react";
import NewDocumentButton from "./NewDocumentButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import {
  collectionGroup,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/Firebase";
import { useEffect, useState } from "react";

interface RoomDocument extends DocumentData {
  id: string;
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

const Sidebar = () => {
  const { user } = useUser();
  const [groupedData, setGroupData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });

  const userId = user?.emailAddresses?.[0]?.emailAddress;

  const queryRef =
    userId &&
    query(collectionGroup(db, "rooms"), where("userId", "==", userId));

  const [data, loading, error] = useCollection(queryRef);

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;

        const docWithId = { id: curr.id, ...roomData };

        if (roomData.role === "owner") {
          acc.owner.push(docWithId);
        } else if (roomData.role === "editor") {
          acc.editor.push(docWithId);
        }

        return acc;
      },
      { owner: [], editor: [] }
    );

    setGroupData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />
      {groupedData.owner.length === 0 ? (
        <h2 className="text-gray-500 font-semibold text-sm">
          No Documents Found
        </h2>
      ) : (
        <>
          <h2 className="text-gray-500 font-semibold text-sm">My Documents</h2>
          {groupedData.owner.map((doc) => (
            <p key={doc.roomId}>{doc.roomId}</p>
            // <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
          ))}
        </>
      )}
    </>
  );

  return (
    <div className="bg-gray-200 p-2 md:p-5">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col items-center justify-center space-y-5">
              {menuOptions}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
};

export default Sidebar;
