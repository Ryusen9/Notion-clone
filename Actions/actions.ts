"use server";

import { adminDb } from "@/Firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {

  const { sessionClaims } = await auth();

  const email = sessionClaims?.email;
  const userId = sessionClaims?.sub;

  if (!email || !userId) {
    throw new Error("Unauthorized");
  }

  const docRef = await adminDb.collection("documents").add({
    title: "New Document",
    createdAt: new Date(),
  });

  await adminDb
    .collection("users")
    .doc(userId)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: email,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}