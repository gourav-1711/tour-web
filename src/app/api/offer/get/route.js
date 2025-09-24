import { NextResponse } from "next/server";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "@/app/(firebase)/firebase.config";

const db = getDatabase(app);

export async function POST(request) {
  try {
    const offersRef = ref(db, "offers");
    const snapshot = await get(offersRef);

    if (!snapshot.exists()) {
      return NextResponse.json({
        status: false,
        message: "No offers found",
        data: {},
      });
    }

    return NextResponse.json({
      status: true,
      message: "Offers fetched successfully",
      data: snapshot.val(),
    });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return NextResponse.json({
      status: false,
      message: "Failed to fetch offers",
      error: error.message,
    });
  }
}
