import { NextResponse } from "next/server";
import { getDatabase, ref, push, set } from "firebase/database";
import cloudinary from "@/lib/cloudinary";
import { app } from "@/app/(firebase)/firebase.config";

const db = getDatabase(app);

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    // Upload image to Cloudinary if exists
    let imageUrl = "";
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Convert buffer -> base64 -> Cloudinary upload
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "offers", // optional folder
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      imageUrl = uploadRes.secure_url;
    }

    // Prepare offer data
    const offerData = {
      title: formData.get("title"),
      location: formData.get("location"),
      duration: formData.get("duration"),
      price: formData.get("price"),
      oldPrice: formData.get("oldPrice"),
      discount: formData.get("discount"),
      features: JSON.parse(formData.get("features")),
      vehicle: formData.get("vehicle"),
      dateRange: formData.get("dateRange"),
      image: imageUrl || formData.get("imageUrl") || "",
      createdAt: new Date().toISOString(),
    };

    // Save to Realtime Database
    const offersRef = ref(db, "offers");
    await set(offersRef, offerData);

    return NextResponse.json({
      success: true,
      data: offerData,
      message: "Offer saved successfully",
    });
  } catch (error) {
    console.error("Error saving offer:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: "Failed to save offer",
    });
  }
}
