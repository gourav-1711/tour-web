import { NextResponse } from "next/server";
import { getDatabase, ref, get, remove } from "firebase/database";
import { app } from "@/app/(firebase)/firebase.config";
import { getPublicIdFromUrl } from "@/lib/cloudinary";

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
    const body = await request.json();
    const publicId = getPublicIdFromUrl(body.image);
    await cloudinary.uploader.destroy(publicId);

    remove(offersRef);

    return NextResponse.json({
      status: true,
      message: "Offers deleted successfully",
      data: {},
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      message: "Error deleting offers",
      data: {},
    });
  }
}
