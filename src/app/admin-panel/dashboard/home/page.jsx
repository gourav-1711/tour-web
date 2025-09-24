"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminHome() {
  const router = useRouter();
  const [stats, setStats] = useState({
    completedBookings: 0,
    failedBookings: 0,
    pendingBookings: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchBookingStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Fetching booking statistics...");

      const response = await axios.post("/api/bookings/stats");

      if (response.data.success) {
        console.log("Received booking stats:", response.data.stats);
        setStats(response.data.stats);
        setLastUpdated(new Date());
      } else {
        throw new Error(
          response.data.message || "Failed to fetch booking statistics"
        );
      }
    } catch (error) {
      console.error("Error in fetchBookingStats:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      let errorMessage = "Failed to load booking statistics";

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          errorMessage = "Unauthorized. Please log in again.";
        } else if (error.response.status === 404) {
          errorMessage = "Booking data not found";
        } else if (error.response.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response from server. Check your connection.";
      }

      setError(errorMessage);

      // Reset stats on error
      setStats({
        completedBookings: 0,
        failedBookings: 0,
        pendingBookings: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingStats();

    // Auto refresh every 5 minutes
    const refreshInterval = setInterval(fetchBookingStats, 1 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []); // Empty dependency array means this effect runs once on mount

  const handleRetry = () => {
    fetchBookingStats();
  };

  if (isLoading && !lastUpdated) {
    return (
      <div className="flex flex-col h-full">
        <AdminHeader
          title="Dashboard"
          description="Booking statistics overview"
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="text-lg">Loading booking statistics...</span>
            <span className="text-sm text-gray-500">
              This may take a few moments
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <AdminHeader
          title="Dashboard"
          description="Booking statistics overview"
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 max-w-md text-center">
            <AlertTriangle className="h-12 w-12 text-red-500" />
            <h3 className="text-xl font-semibold text-red-700">
              Error Loading Data
            </h3>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Retrying...
                </>
              ) : (
                "Try Again"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AdminHeader
        title="Dashboard"
        description={
          <div className="flex items-center gap-2">
            <span>Booking statistics overview</span>
            {lastUpdated && (
              <span className="text-xs text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        }
      />

      <div className="flex-1 p-6">
        <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
          <Card className="border-green-200 bg-green-50/50 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-green-800">
                Completed Bookings
              </CardTitle>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-700">
                {stats.completedBookings}
              </div>
              <p className="text-sm text-green-600 mt-2">
                Successfully finished trips
              </p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-red-800">
                Failed Bookings
              </CardTitle>
              <XCircle className="h-8 w-8 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-red-700">
                {stats.failedBookings}
              </div>
              <p className="text-sm text-red-600 mt-2">
                Cancelled or unsuccessful trips
              </p>
            </CardContent>
          </Card>

          <Card
            onClick={() => router.push("/admin-panel/dashboard/bookings")}
            className="border-yellow-200 bg-yellow-50/50 hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-yellow-800">
                Pending Bookings
              </CardTitle>
              <Clock className="h-8 w-8 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-yellow-700">
                {stats.pendingBookings}
              </div>
              <p className="text-sm text-yellow-600 mt-2">
                Awaiting confirmation
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Refresh button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleRetry}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded-lg transition-colors"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span>Refresh Data</span>
            {lastUpdated && (
              <span className="text-xs text-gray-500 ml-2">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
