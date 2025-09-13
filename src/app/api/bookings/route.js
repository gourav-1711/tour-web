import { getDatabase, ref, get, update, child } from "firebase/database";
import { app } from "@/app/(firebase)/firebase.config";

export async function GET() {
  try {
    const db = getDatabase(app);
    const bookingsRef = ref(db, "bookings");

    const snapshot = await get(bookingsRef);

    if (!snapshot.exists()) {
      return Response.json({
        success: true,
        data: [],
      });
    }

    const bookings = [];
    snapshot.forEach((childSnapshot) => {
      bookings.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
    });

    return Response.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch bookings",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { bookingId, status } = await request.json();

    if (!bookingId || !status) {
      return Response.json(
        {
          success: false,
          message: "Missing required fields: bookingId and status are required",
        },
        { status: 400 }
      );
    }

    const db = getDatabase(app);
    const bookingRef = ref(db, `bookings/${bookingId}`);

    // First check if booking exists
    const snapshot = await get(bookingRef);
    if (!snapshot.exists()) {
      return Response.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 }
      );
    }

    // Update the booking status
    await update(bookingRef, { status });

    return Response.json({
      success: true,
      message: "Booking status updated successfully",
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update booking status",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
