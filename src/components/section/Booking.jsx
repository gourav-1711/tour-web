"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  Globe2Icon,
  Info,
  InfoIcon,
  Loader2,
  LocationEditIcon,
} from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useSelector } from "react-redux";
import WhyChooseUs from "./WhyChooseUs";
import Policy from "./Policy";

export default function Booking() {
  const [loading, setLoading] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const states = State.getStatesOfCountry("IN");
  // Date
  const today = new Date();
  // const cabs
  const cabs = useSelector((state) => state.fleetDetails.fleetDetails);

  // Rate states // round trip
  const [rate, setRate] = useState("");
  // local trip
  const [localRate, setLocalRate] = useState("");

  // Form states = round trip
  const [roundTripForm, setRoundTripForm] = useState({
    cab: "",
    rate: rate || "",
    state: "",
    city: "",
    pickupAddress: "",
    dropAddress: "",
    startDate: null,
    endDate: null,
    members: "",
    mobile: "",
  });
  // local trip
  const [localTripForm, setLocalTripForm] = useState({
    cab: "",
    rate: localRate || "",
    tripType: "",
    pickupAddress: "",
    dropAddress: "",
    dateTime: null,
    members: "",
    mobile: "",
  });

  useEffect(() => {
    const selectedCab = cabs.find((cab) => cab.value === roundTripForm.cab);
    if (selectedCab) {
      setRate(selectedCab.rate);
      setRoundTripForm({ ...roundTripForm, rate: selectedCab.rate });
    }
  }, [roundTripForm.cab]);

  useEffect(() => {
    const selectedCab = cabs.find((cab) => cab.value === localTripForm.cab);
    if (selectedCab) {
      setLocalRate(selectedCab.rate);
      setLocalTripForm({ ...localTripForm, rate: selectedCab.rate });
    }
  }, [localTripForm.cab]);

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
        name:
          roundTripForm.cab +
          "_" +
          roundTripForm.mobile +
          "_" +
          new Date().toISOString(),
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
      setLoading(false);
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
        name:
          localTripForm.cab +
          "_" +
          localTripForm.mobile +
          "_" +
          new Date().toISOString(),
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
      setLocalLoading(false);
      console.error("Error saving booking:", error);
      toast.error("Failed to save booking. Please try again.");
    }
  };

  return (
    <div>
      {/* Main Booking Section */}
      <section
        id="booking"
        className=" mx-auto  py-14 bg-gradient-to-b from-blue-100 to-blue-200/90 min-h-[600px]"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-4xl font-bold text-gray-800 mb-4"
            >
              Book Your Cab
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="150"
              className="text-xl text-gray-600"
            >
              Your Journey, Our Responsibility
            </p>
          </div>

          <Tabs
            defaultValue="roundTrip"
            className={"max-w-[100%] w-full md:w-[50%] mx-auto"}
          >
            <TabsList
              data-aos="fade-up"
              className="flex justify-center w-full md:w-auto mx-auto bg-white/70 backdrop-blur-md rounded-lg p-1 border border-white/20"
            >
              <TabsTrigger
                data-aos="fade-up"
                className="cursor-pointer relative px-6 py-3 rounded-md text-black  [data-state=active]:text-white/80 font-medium transition-all duration-300 hover:text-slate-600 data-[state=active]:text-white data-[state=active]:bg-red-500/80 data-[state=active]:backdrop-blur-sm data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/25 data-[state=active]:border data-[state=active]:border-red-400/30"
                value="roundTrip"
              >
                Round Trip <Globe2Icon className="w-5 h-5" />
              </TabsTrigger>
              <TabsTrigger
                data-aos="fade-up"
                className="cursor-pointer relative px-6 py-3 rounded-md text-black  [data-state=active]:text-white/80 font-medium transition-all duration-300 hover:text-slate-600 data-[state=active]:text-white data-[state=active]:bg-red-500/80 data-[state=active]:backdrop-blur-sm data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/25 data-[state=active]:border data-[state=active]:border-red-400/30"
                value="localTrip"
              >
                Local Trip <LocationEditIcon className="w-5 h-5" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="roundTrip">
              {/* Round Trip */}

              {loading ? (
                <div className="flex items-center justify-center h-full md:h-[50vh] w-full bg-white shadow-lg rounded-2xl">
                  <Loader2 size={48} color="red" className="animate-spin" />
                </div>
              ) : (
                <Card data-aos="slide-up" className="bg-white shadow-lg">
                  <CardContent className=" p-4 md:p-8">
                    <form onSubmit={handleRoundTripSubmit}>
                      <div className="text-center mb-6">
                        <span className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-semibold w-fit rounded-2xl">
                          Round Trip
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-4">
                          <div className="space-y-1">
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
                                {cabs.map((cab) => (
                                  <SelectItem key={cab.value} value={cab.value}>
                                    {cab.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          {rate && roundTripForm.cab && (
                            <div className="">
                              <span className="text-sm font-bold text-gray-800">
                                Rate: {rate}
                              </span>
                            </div>
                          )}

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
                                    <SelectItem
                                      key={city.name}
                                      value={city.name}
                                    >
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
                        <BookingWarning />

                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold ">
                          Confirm Booking
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="localTrip">
              {/* Local Trip */}
              {localLoading ? (
                <div className="flex items-center justify-center h-full md:h-[50vh] w-full bg-white shadow-lg rounded-2xl">
                  <Loader2 size={48} color="red" className="animate-spin" />
                </div>
              ) : (
                <Card data-aos="slide-up" className="bg-white shadow-lg">
                  <CardContent className="p-4 md:p-8">
                    <form onSubmit={handleLocalTripSubmit}>
                      <div className="text-center mb-6">
                        <span className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-semibold w-fit rounded-2xl">
                          Local Trip
                        </span>
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
                                {cabs.map((cab) => (
                                  <SelectItem key={cab.value} value={cab.value}>
                                    {cab.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {localRate && localTripForm.cab && (
                              <div className="">
                                <span className="text-sm font-bold text-gray-800">
                                  Rate: {localRate}
                                </span>
                              </div>
                            )}
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
                        {/* Booking Warning */}
                        <BookingWarning />

                        <Button
                          type="submit"
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold "
                        >
                          Confirm Booking
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"></div>
        </div>
      </section>

      <Policy />

      <WhyChooseUs />
    </div>
  );
}

const BookingWarning = () => {
  const scrollTo = () => {
    const section = document.querySelector("#policy")

    section.scrollIntoView({behavior : "smooth"})
  };
  return (
    <div
      onClick={scrollTo}
      className="flex items-center gap-1 text-gray-700 text-sm hover:text-red-500 duration-300 cursor-pointer"
    >
      <InfoIcon className="size-5" />
      <span className="font-semibold  ">
        !! Please Read Our Policy Before Booking !!
      </span>
    </div>
  );
};
