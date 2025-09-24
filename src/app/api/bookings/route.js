import { getDatabase, ref, get, update } from "firebase/database";
import { app } from "@/app/(firebase)/firebase.config";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const db = getDatabase(app);
    const bookingsRef = ref(db, "bookings");

    const snapshot = await get(bookingsRef);

    if (!snapshot.exists()) {
      return NextResponse.json({
        success: true,
        data: [],
        message: "No Bookings Found",
      });
    }

    const bookings = [];
    snapshot.forEach((childSnapshot) => {
      bookings.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
    });
    const filterd = bookings.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return NextResponse.json({
      success: true,
      data: filterd,
      message: "Bookings Found SuccessFully",
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
}

export async function PUT(request) {
  try {
    const { bookingId, status } = await request.json();

    if (!bookingId || !status) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields: bookingId and status are required",
      });
    }

    const db = getDatabase(app);
    const bookingRef = ref(db, `bookings/${bookingId}`);

    // First check if booking exists
    const snapshot = await get(bookingRef);
    if (!snapshot.exists()) {
      return NextResponse.json({
        success: false,
        message: "Booking not found",
      });
    }

    // Update the booking status
    await update(bookingRef, { status });

    return NextResponse.json({
      success: true,
      message: "Booking status updated successfully",
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to update booking status",
      error: error.message,
    });
  }
}
