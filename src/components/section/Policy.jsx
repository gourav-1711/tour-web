import { Badge, FileText, Shield, CheckCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useSelector } from "react-redux";

export default function Policy() {
  // Policy
  const policies = useSelector((state) => state.fleetDetails.policies);
  return (
    <section
      id="policy"
      className="py-10  relative overflow-hidden"
      role="region"
      aria-labelledby="policy-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-red-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-rose-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <Shield className="w-8 h-8 text-red-600" aria-hidden="true" />
          </div>

          <h2
            id="policy-heading"
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-bold mb-2 text-gray-900"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
              Policy
            </span>
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            We're committed to transparency and trust. Here are the core
            principles that guide everything we do.
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {policies.map((policy, index) => (
            <Card
              key={`policy-${index}`}
              data-aos="fade-up"
              data-aos-delay={100 + index * 50}
              className="group border-border hover:border-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg p-2"
              role="listitem"
            >
              <CardContent className="p-2">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-5 h-5 " aria-hidden="true" />

                  <div className="flex-1">
                    <p className="text-foreground  text-md leading-relaxed">
                      {policy}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Your Company Name",
            url: "https://yourwebsite.com",
            description: "Company policies and terms of service",
            policy: policies.map((policy, index) => ({
              "@type": "Policy",
              name: `Policy ${index + 1}`,
              description: policy,
              url: `https://yourwebsite.com/policy#policy-${index + 1}`,
            })),
          }),
        }}
      />
    </section>
  );
}
