import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Country, State, City } from "country-state-city";
export default function Booking() {

// All states of India
const states = State.getStatesOfCountry("IN");

// All cities of a state (e.g., Maharashtra)
const cities = City.getCitiesOfState("IN", "MH");

console.log(states);
console.log(cities);

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
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-semibold">
                    Round Trip
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Select>
                      <SelectTrigger className="bg-gray-50">
                        <SelectValue placeholder="Select cab" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="ertiga">Ertiga</SelectItem>
                        <SelectItem value="innova">Innova</SelectItem>
                        <SelectItem value="crysta">Innova Crysta</SelectItem>
                        <SelectItem value="tempo">Tempo Traveller</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select name="place" model={false}>
                      <SelectTrigger className="bg-gray-50">
                        <SelectValue placeholder="Select place" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jaipur">Jaipur</SelectItem>
                        <SelectItem value="bikaner">Bikaner</SelectItem>
                        <SelectItem value="jaisalmer">Jaisalmer</SelectItem>
                        <SelectItem value="udaipur">Udaipur</SelectItem>
                        <SelectItem value="pushkar">Pushkar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Pickup Address"
                      className="bg-gray-50"
                    />
                    <Input placeholder="Drop Address" className="bg-gray-50" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      placeholder="Start date"
                      className="bg-gray-50"
                    />
                    <Input
                      type="date"
                      placeholder="End date"
                      className="bg-gray-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Total members" className="bg-gray-50" />
                    <Input placeholder="Mobile" className="bg-gray-50" />
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold mt-6">
                    Confirm
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Local Trip */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-semibold">
                    Local Trip
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Select>
                      <SelectTrigger className="bg-gray-50">
                        <SelectValue placeholder="Select cab" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="ertiga">Ertiga</SelectItem>
                        <SelectItem value="innova">Innova</SelectItem>
                        <SelectItem value="crysta">Innova Crysta</SelectItem>
                        <SelectItem value="tempo">Tempo Traveller</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger className="bg-gray-50">
                        <SelectValue placeholder="Select place" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local-jodhpur">
                          Local Jodhpur
                        </SelectItem>
                        <SelectItem value="airport">
                          Airport Transfer
                        </SelectItem>
                        <SelectItem value="railway">Railway Station</SelectItem>
                        <SelectItem value="city-tour">City Tour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Pickup Address"
                      className="bg-gray-50"
                    />
                    <Input placeholder="Drop Address" className="bg-gray-50" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      placeholder="Select date"
                      className="bg-gray-50"
                    />
                    <Input
                      type="time"
                      placeholder="Select time"
                      className="bg-gray-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Total members" className="bg-gray-50" />
                    <Input placeholder="Mobile" className="bg-gray-50" />
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold mt-6">
                    Confirm
                  </Button>
                </div>
              </CardContent>
            </Card>
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
