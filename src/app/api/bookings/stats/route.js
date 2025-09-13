import { getDatabase, ref, get } from "firebase/database";
import { app } from "@/app/(firebase)/firebase.config";

export async function GET() {
  try {
    const db = getDatabase(app);
    const bookingsRef = ref(db, "bookings");

    // Fetch all bookings
    const snapshot = await get(bookingsRef);

    if (!snapshot.exists()) {
      return Response.json({
        success: false,
        message: "No booking data found",
        stats: {
          completedBookings: 0,
          failedBookings: 0,
          pendingBookings: 0,
        },
      });
    }

    // Process the data
    const bookings = snapshot.val();
    let completedBookings = 0;
    let failedBookings = 0;
    let pendingBookings = 0;

    // Count bookings by status
    Object.values(bookings).forEach((booking) => {
      if (booking.status === "completed") completedBookings++;
      else if (booking.status === "failed") failedBookings++;
      else if (booking.status === "pending") pendingBookings++;
    });

    return Response.json({
      success: true,
      stats: {
        completedBookings,
        failedBookings,
        pendingBookings,
      },
    });
  } catch (error) {
    console.error("Error fetching booking stats:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch booking statistics",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
