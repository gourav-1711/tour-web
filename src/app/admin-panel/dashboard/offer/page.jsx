"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Clock,
  Calendar,
  Car,
  Check,
  Star,
  Plus,
  X,
  Upload,
  Eye,
} from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminHeader } from "@/components/admin/admin-header";

export default function page() {
  const [offers, setOffers] = useState({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    duration: "",
    price: "",
    oldPrice: "",
    discount: "",
    features: [""],
    vehicle: "",
    dateRange: "",
    image: null,
  });

  const vehicle = useSelector((state) => state.fleetDetails.fleetDetails);

  useEffect(() => {
    fetchOffers();
  }, []);
  // Pre-populate form with existing offer data when editing
  useEffect(() => {
    if (showForm && Object.keys(offers).length > 0) {
      setFormData({
        title: offers.title || "",
        location: offers.location || "",
        duration: offers.duration || "",
        price: offers.price || "",
        oldPrice: offers.oldPrice || "",
        discount: offers.discount || "",
        features:
          offers.features && offers.features.length > 0
            ? offers.features
            : [""],
        vehicle: offers.vehicle || "",
        dateRange: offers.dateRange || "",
        image: offers.image || null,
      });
    }
  }, [showForm, offers]);

  // Cleanup effect for object URLs
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const fetchOffers = async () => {
    try {
      const response = await axios.post("/api/offer/get");
      setOffers(response.data.data || {});
    } catch (error) {
      console.error("Error fetching offers:", error);
      setOffers({});
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Clean up previous object URL to prevent memory leaks
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      // Create temporary image preview using createObjectURL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({
      ...prev,
      features: newFeatures,
    }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        features: newFeatures,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Filter out empty features
      const filteredFeatures = formData.features.filter(
        (feature) => feature.trim() !== ""
      );

      // Prepare data using FormData for multipart/form-data
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("oldPrice", formData.oldPrice);
      formDataToSend.append("discount", formData.discount);
      formDataToSend.append("features", JSON.stringify(filteredFeatures));
      formDataToSend.append("vehicle", formData.vehicle);
      formDataToSend.append("dateRange", formData.dateRange);

      // Add image if present (you mentioned you'll handle image saving)
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.post("/api/offer/save", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.data.status) {
        await fetchOffers();
        setShowForm(false);

        // Clean up object URL
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);

        setFormData({
          title: "",
          location: "",
          duration: "",
          price: "",
          oldPrice: "",
          discount: "",
          features: [""],
          vehicle: "",
          dateRange: "",
          image: null,
        });
      }
    } catch (error) {
      console.error("Error saving offer:", error);
    }
  };
  console.log(formData);

  if (loading) {
    return <div className="text-center py-8">Loading offers...</div>;
  }

  return (
    <section
      id="offer"
      className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-300"
    >
      <AdminHeader
        title={"Special Travel Offer"}
        description={"Limited time exclusive package for your dream vacation"}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center my-4">
          <h2 className="text-3xl font-bold text-gray-800">Special Offers</h2>
          {Object.keys(offers).length > 0 && (
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {showForm ? "Cancel" : "Edit Offer"}
            </Button>
          )}
        </div>
        {/* show form when showForm is true */}
        {showForm && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-semibold mb-4">
                  {Object.keys(offers).length > 0
                    ? "Edit Offer"
                    : "Add New Offer"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="oldPrice">Old Price (₹)</Label>
                    <Input
                      id="oldPrice"
                      name="oldPrice"
                      value={formData.oldPrice}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="discount">Discount</Label>
                    <Input
                      id="discount"
                      name="discount"
                      value={formData.discount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="vehicle">Vehicle</Label>
                    <Select
                      name="vehicle"
                      value={formData.vehicle}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          vehicle: value,
                        }))
                      }
                      className={"w-full"}
                    >
                      <SelectTrigger className={"w-full"}>
                        <SelectValue placeholder="Select a vehicle" />
                      </SelectTrigger>
                      <SelectContent className={"w-full"}>
                        {vehicle.map((cab) => (
                          <SelectItem key={cab.value} value={cab.value}>
                            {cab.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="dateRange">Date Range</Label>
                    <Input
                      id="dateRange"
                      name="dateRange"
                      value={formData.dateRange}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Features</Label>
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={feature}
                            onChange={(e) =>
                              handleFeatureChange(index, e.target.value)
                            }
                            placeholder={`Feature ${index + 1}`}
                            required={index === 0}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeFeature(index)}
                            disabled={formData.features.length === 1}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addFeature}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Feature
                      </Button>
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="image">Image</Label>
                    <div className="space-y-4">
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        onChange={handleInputChange}
                        accept="image/*"
                      />
                      {imagePreview ||
                        (offers.image && (
                          <div className="relative w-48 h-32 border rounded-lg overflow-hidden">
                            <img
                              src={imagePreview || offers.image}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-2 right-2">
                              <Eye className="h-4 w-4 text-white bg-black bg-opacity-50 rounded p-1" />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {Object.keys(offers).length > 0
                      ? "Update Offer"
                      : "Save Offer"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="">
          {/* show when offer is available */}
          {Object.keys(offers).length > 0 ? (
            <OfferCard offers={offers} />
          ) : (
            // show when no offer
            <div className="col-span-full text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Offers Available
                </h3>
                <p className="text-gray-500 mb-6">
                  Create your first special travel offer to attract customers
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Offer
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function OfferCard({ offers }) {
  return (
    <section
      id="offer"
      className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 sm:text-4xl mb-3">
            Special Travel Offer
          </h2>
          <p className="mt-2 text-xl text-blue-700 dark:text-blue-300 font-medium">
            Limited time exclusive package for your dream vacation
          </p>
        </div>

        <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 group">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2 relative h-80 md:h-auto group overflow-hidden rounded-l-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                <div className="absolute bottom-0 p-6 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {offers.title}
                  </h3>
                  <div className="flex items-center text-green-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <MapPin className="h-5 w-5 mr-1" />
                    <span>{offers.location}</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/20 z-0"></div>
              <img
                src={offers.image}
                alt={offers.title}
                fill
                className={`object-fill h-full w-full transition-all duration-700 group-hover:scale-105`}
                loading="lazy"
              />
              <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full hover:bg-red-700 transition-colors duration-300 shadow-lg z-20">
                {offers.discount}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 md:w-1/2 bg-white dark:bg-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                    {offers.title}
                  </h3>
                  <div className="flex items-center mt-2 text-blue-600 dark:text-blue-300">
                    <MapPin className="h-5 w-5 mr-1" />
                    <span>{offers.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-red-600 dark:text-red-400">
                    ₹ {offers.price}
                  </span>
                  <p className="text-sm text-gray-500 line-through">
                    ₹ {offers.oldPrice}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 group">
                  <Clock className="h-5 w-5 mr-2 text-gray-700 group-hover:text-green-600 transition-colors duration-300" />
                  <span>Duration: {offers.duration}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 group">
                  <Calendar className="h-5 w-5 mr-2 text-gray-700 group-hover:text-green-600 transition-colors duration-300" />
                  <span>Available: {offers.dateRange}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 group">
                  <Car className="h-5 w-5 mr-2 text-gray-700 group-hover:text-green-600 transition-colors duration-300" />
                  <span>Vehicle: {offers.vehicle}</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-4 h-1 bg-red-500 mr-2 rounded-full"></span>
                  Tour Features:
                </h4>
                <ul className="space-y-3">
                  {offers.features?.map((feature, index) => (
                    <li key={index} className="flex items-center group/feature">
                      <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-full mr-3 group-hover/feature:bg-green-100 dark:group-hover/feature:bg-green-900/30 transition-colors duration-300">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400 group-hover/feature:text-green-600 dark:group-hover/feature:text-green-400 transition-colors duration-300" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 group-hover/feature:text-gray-900 dark:group-hover/feature:text-white transition-colors duration-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Button className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-6 text-lg font-semibold hover:from-red-700 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-200 dark:hover:shadow-red-900/50">
                  Book Now
                </Button>
              </div>

              <p className="mt-4 text-sm text-blue-600 dark:text-blue-300 text-center font-medium">
                Limited spots available. Book now to secure your adventure!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
