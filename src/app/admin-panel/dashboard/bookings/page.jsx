"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { BookingCard } from "@/components/admin/booking-card";
import { BookingFilters } from "@/components/admin/booking-filters";
import { Input } from "@/components/ui/input";
import { Search, Loader2, AlertCircle } from "lucide-react";
import axios from "axios";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("/api/bookings");

      if (response.data.success) {
        setBookings(response.data.data || []);
      } else {
        toast.error(response.data.message || "Failed to fetch bookings");
      }
    } catch (error) {
      let errorMessage = "Failed to load bookings";

      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Unauthorized. Please log in again.";
        } else if (error.response.status === 404) {
          errorMessage = "No bookings found";
        } else if (error.response.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        errorMessage = "No response from server. Check your connection.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      setUpdatingId(bookingId);

      // Optimistic update
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );

      const response = await axios.put("/api/bookings", {
        bookingId,
        status: newStatus,
      });

      if (!response.data.success) {
        toast.error(response.data.message || "Failed to update booking status");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update booking status"
      );

      // Revert optimistic update on error
      fetchBookings();

      let errorMessage = "Failed to update booking status";

      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || "Invalid request";
        } else if (error.response.status === 404) {
          errorMessage = "Booking not found";
        } else if (error.response.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        errorMessage = "No response from server. Check your connection.";
      }
      alert(errorMessage);
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      (booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.mobile?.includes(searchTerm)) ??
      false;

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const matchesType = typeFilter === "all" || booking.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  if (loading && bookings.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <AdminHeader
          title="Bookings"
          description="Manage and track all booking requests"
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading bookings...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AdminHeader
        title="Bookings"
        description="Manage and track all booking requests"
      />

      <div className="flex-1 p-6 space-y-6">
        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
            <button
              onClick={fetchBookings}
              className="ml-auto text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded flex items-center gap-1"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Retrying...
                </>
              ) : (
                "Retry"
              )}
            </button>
          </div>
        ) : (
          <>
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by booking name, city, or mobile..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <BookingFilters
                statusFilter={statusFilter}
                typeFilter={typeFilter}
                onStatusChange={setStatusFilter}
                onTypeChange={setTypeFilter}
              />
            </div>

            {/* Bookings Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onStatusUpdate={updateBookingStatus}
                  isUpdating={updatingId === booking.id}
                />
              ))}
            </div>

            {filteredBookings.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {bookings.length === 0
                    ? "No bookings found."
                    : "No bookings match your current filters."}
                </p>
                {bookings.length === 0 && (
                  <button
                    onClick={fetchBookings}
                    className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mx-auto"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Refreshing...
                      </>
                    ) : (
                      "Refresh"
                    )}
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
