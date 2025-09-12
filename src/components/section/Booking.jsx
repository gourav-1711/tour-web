"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Country, State, City } from "country-state-city";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { toast } from "sonner";
import axios from "axios";
import { getDatabase, ref, push, set } from "firebase/database";
import { app } from "@/app/(firebase)/firebase.config";

export default function Booking() {
  const [loading, setLoading] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const states = State.getStatesOfCountry("IN");
  const today = new Date();

  // Form states
  const [roundTripForm, setRoundTripForm] = useState({
    cab: "",
    state: "",
    city: "",
    pickupAddress: "",
    dropAddress: "",
    startDate: null,
    endDate: null,
    members: "",
    mobile: "",
  });

  const [localTripForm, setLocalTripForm] = useState({
    cab: "",
    tripType: "",
    pickupAddress: "",
    dropAddress: "",
    dateTime: null,
    members: "",
    mobile: "",
  });

  // Update cities when state changes
  useEffect(() => {
    if (roundTripForm.state) {
      const stateCode = states.find(
        (s) => s.name === roundTripForm.state
      )?.isoCode;
      if (stateCode) {
        const stateCities = City.getCitiesOfState("IN", stateCode);
        setCities(stateCities);
      }
    }
  }, [roundTripForm.state]);

  const handleRoundTripChange = (e) => {
    const { name, value } = e.target;
    setRoundTripForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocalTripChange = (e) => {
    const { name, value } = e.target;
    setLocalTripForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (formData, isLocal = false) => {
    if (!formData.cab) return "Please select a cab type";
    if (!isLocal && !formData.state) return "Please select a state";
    if (!isLocal && !formData.city) return "Please select a city";
    if (!formData.pickupAddress) return "Please enter pickup address";
    if (!formData.dropAddress) return "Please enter drop address";
    if (!formData.members) return "Please enter number of members";
    if (!formData.mobile || !/^[0-9]{10}$/.test(formData.mobile))
      return "Please enter a valid 10-digit mobile number";
    if (isLocal) {
      if (!formData.tripType) return "Please select a trip type";
      if (!formData.dateTime) return "Please select date and time";
    } else {
      if (!formData.startDate) return "Please select start date";
      if (!formData.endDate) return "Please select end date";
      if (formData.startDate >= formData.endDate)
        return "End date must be after start date";
    }
    return null;
  };

  const handleRoundTripSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm(roundTripForm, false);
    if (error) {
      toast.error(error);
      return;
    }
    setLoading(true);
    try {
      // Save to Firebase
      const db = getDatabase(app);
      const bookingsRef = ref(db, "bookings");
      const newBookingRef = push(bookingsRef);

      const bookingData = {
        ...roundTripForm,
        type: "round_trip",
        status: "pending",
        createdAt: new Date().toISOString(),
        startDate: roundTripForm.startDate?.toISOString(),
        endDate: roundTripForm.endDate?.toISOString(),
      };

      await set(newBookingRef, bookingData);
      // Send email via API
      await axios.post("/api/send", bookingData);

      toast.success("Your round trip has been booked successfully!");
      // Reset form after successful submission
      setLoading(false);
      setRoundTripForm({
        cab: "",
        state: "",
        city: "",
        pickupAddress: "",
        dropAddress: "",
        startDate: null,
        endDate: null,
        members: "",
        mobile: "",
      });
    } catch (error) {
      console.error("Error saving booking:", error);
      toast.error("Failed to save booking. Please try again.");
    }
  };

  const handleLocalTripSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm(localTripForm, true);
    if (error) {
      toast.error(error);
      return;
    }
    setLocalLoading(true);
    try {
      // Save to Firebase
      const db = getDatabase(app);
      const bookingsRef = ref(db, "bookings");
      const newBookingRef = push(bookingsRef);

      const bookingData = {
        ...localTripForm,
        type: "local_trip",
        status: "pending",
        createdAt: new Date().toISOString(),
        dateTime: localTripForm.dateTime?.toISOString(),
      };

      await set(newBookingRef, bookingData);
      // Send email via API
      await axios.post("/api/send", bookingData);

      toast.success("Your local trip has been booked successfully!");
      setLocalLoading(false);
      // Reset form after successful submission
      setLocalTripForm({
        cab: "",
        tripType: "",
        pickupAddress: "",
        dropAddress: "",
        dateTime: null,
        members: "",
        mobile: "",
      });
    } catch (error) {
      console.error("Error saving booking:", error);
      toast.error("Failed to save booking. Please try again.");
    }
  };

  return (
    <div>
      {/* Main Booking Section */}
      <section className=" mx-auto  py-16 bg-gradient-to-b from-blue-100 to-blue-200 min-h-[600px]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Book Your Cab
            </h1>
            <p className="text-xl text-gray-600">
              Your Journey, Our Responsibility
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Round Trip */}

            {loading ? (
              <div className="flex items-center justify-center h-full w-full bg-white shadow-lg rounded-2xl">
                <Loader2 size={48} color="red" className="animate-spin" />
              </div>
            ) : (
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleRoundTripSubmit}>
                    <div className="text-center mb-6">
                      <Button
                        type="button"
                        className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-semibold w-full"
                      >
                        Round Trip
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cab">Select Cab</Label>
                          <Select
                            name="cab"
                            value={roundTripForm.cab}
                            onValueChange={(value) =>
                              setRoundTripForm((prev) => ({
                                ...prev,
                                cab: value,
                              }))
                            }
                          >
                            <SelectTrigger className="w-full bg-gray-50">
                              <SelectValue placeholder="Select cab" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sedan">Sedan</SelectItem>
                              <SelectItem value="ertiga">Ertiga</SelectItem>
                              <SelectItem value="innova">Innova</SelectItem>
                              <SelectItem value="crysta">
                                Innova Crysta
                              </SelectItem>
                              <SelectItem value="tempo">
                                Tempo Traveller
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Select
                              value={roundTripForm.state}
                              onValueChange={(value) =>
                                setRoundTripForm((prev) => ({
                                  ...prev,
                                  state: value,
                                  city: "",
                                }))
                              }
                            >
                              <SelectTrigger className="w-full bg-gray-50">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                {states.map((state) => (
                                  <SelectItem
                                    key={state.isoCode}
                                    value={state.name}
                                  >
                                    {state.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="city">City</Label>
                            <Select
                              value={roundTripForm.city}
                              onValueChange={(value) =>
                                setRoundTripForm((prev) => ({
                                  ...prev,
                                  city: value,
                                }))
                              }
                              disabled={!roundTripForm.state}
                            >
                              <SelectTrigger className="w-full bg-gray-50">
                                <SelectValue
                                  placeholder={
                                    roundTripForm.state
                                      ? "Select city"
                                      : "Select state first"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {cities.map((city) => (
                                  <SelectItem key={city.name} value={city.name}>
                                    {city.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pickupAddress">Pickup Address</Label>
                        <Input
                          name="pickupAddress"
                          value={roundTripForm.pickupAddress}
                          onChange={handleRoundTripChange}
                          placeholder="Enter pickup address"
                          className="bg-gray-50 w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dropAddress">Drop Address</Label>
                        <Input
                          name="dropAddress"
                          value={roundTripForm.dropAddress}
                          onChange={handleRoundTripChange}
                          placeholder="Enter drop address"
                          className="bg-gray-50 w-full"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date & Time</Label>
                          <DateTimePicker
                            date={roundTripForm.startDate}
                            setDate={(date) =>
                              setRoundTripForm((prev) => ({
                                ...prev,
                                startDate: date,
                              }))
                            }
                            placeholder="Select start date"
                            fromDate={today}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date & Time</Label>
                          <DateTimePicker
                            date={roundTripForm.endDate}
                            setDate={(date) =>
                              setRoundTripForm((prev) => ({
                                ...prev,
                                endDate: date,
                              }))
                            }
                            placeholder="Select end date"
                            fromDate={roundTripForm.startDate || today}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="members">Total Members</Label>
                          <Input
                            type="number"
                            name="members"
                            value={roundTripForm.members}
                            onChange={handleRoundTripChange}
                            placeholder="Number of members"
                            className="bg-gray-50 w-full"
                            min="1"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobile">Mobile Number</Label>
                          <Input
                            type="tel"
                            name="mobile"
                            value={roundTripForm.mobile}
                            onChange={handleRoundTripChange}
                            placeholder="Enter mobile number"
                            className="bg-gray-50 w-full"
                            maxLength="10"
                          />
                        </div>
                      </div>

                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold mt-6">
                        Confirm Booking
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Local Trip */}
            {localLoading ? (
              <div className="flex items-center justify-center h-full w-full bg-white shadow-lg rounded-2xl">
                <Loader2 size={48} color="red" className="animate-spin" />
              </div>
            ) : (
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleLocalTripSubmit}>
                    <div className="text-center mb-6">
                      <Button
                        type="button"
                        className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-semibold w-full"
                      >
                        Local Trip
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cab">Select Cab</Label>
                          <Select
                            name="cab"
                            value={localTripForm.cab}
                            onValueChange={(value) =>
                              setLocalTripForm((prev) => ({
                                ...prev,
                                cab: value,
                              }))
                            }
                          >
                            <SelectTrigger className="w-full bg-gray-50">
                              <SelectValue placeholder="Select cab" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sedan">Sedan</SelectItem>
                              <SelectItem value="ertiga">Ertiga</SelectItem>
                              <SelectItem value="innova">Innova</SelectItem>
                              <SelectItem value="crysta">
                                Innova Crysta
                              </SelectItem>
                              <SelectItem value="tempo">
                                Tempo Traveller
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tripType">Trip Type</Label>
                          <Select
                            name="tripType"
                            value={localTripForm.tripType}
                            onValueChange={(value) =>
                              setLocalTripForm((prev) => ({
                                ...prev,
                                tripType: value,
                              }))
                            }
                          >
                            <SelectTrigger className="w-full bg-gray-50">
                              <SelectValue placeholder="Select trip type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="local-jodhpur">
                                Local Jodhpur
                              </SelectItem>
                              <SelectItem value="airport">
                                Airport Transfer
                              </SelectItem>
                              <SelectItem value="railway">
                                Railway Station
                              </SelectItem>
                              <SelectItem value="city-tour">
                                City Tour
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pickupAddress">Pickup Address</Label>
                        <Input
                          name="pickupAddress"
                          value={localTripForm.pickupAddress}
                          onChange={handleLocalTripChange}
                          placeholder="Enter pickup address"
                          className="bg-gray-50 w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dropAddress">Drop Address</Label>
                        <Input
                          name="dropAddress"
                          value={localTripForm.dropAddress}
                          onChange={handleLocalTripChange}
                          placeholder="Enter drop address"
                          className="bg-gray-50 w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Date & Time</Label>
                        <DateTimePicker
                          date={localTripForm.dateTime}
                          setDate={(date) =>
                            setLocalTripForm((prev) => ({
                              ...prev,
                              dateTime: date,
                            }))
                          }
                          placeholder="Select date and time"
                          fromDate={today}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="members">Total Members</Label>
                          <Input
                            type="number"
                            name="members"
                            value={localTripForm.members}
                            onChange={handleLocalTripChange}
                            placeholder="Number of members"
                            className="bg-gray-50 w-full"
                            min="1"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobile">Mobile Number</Label>
                          <Input
                            type="tel"
                            name="mobile"
                            value={localTripForm.mobile}
                            onChange={handleLocalTripChange}
                            placeholder="Enter mobile number"
                            className="bg-gray-50 w-full"
                            maxLength="10"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold mt-6"
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose us
          </h2>

          <div className="max-w-6xl mx-auto space-y-4">
            {[
              "24/7 Customer Support",
              "All-India Permit Cabs",
              "Well-Trained & Verified Drivers",
              "Clean, Sanitized & GPS-enabled Vehicles",
              "Flexible Pricing & Transparent Billing",
              "Custom Itinerary Planning",
              "On-Time Guarantee",
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">About Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            in progress.. on home page later
          </p>
        </div>
      </section>
    </div>
  );
}
