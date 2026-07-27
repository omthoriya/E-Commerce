import { Truck, ShieldCheck, RotateCcw, BadgeCheck } from "lucide-react";

const features = [
  {
    id: 1,
    icon: <Truck size={40} className="text-blue-600" />,
    title: "Free Shipping",
    description: "Fast and free delivery across India.",
  },
  {
    id: 2,
    icon: <ShieldCheck size={40} className="text-green-600" />,
    title: "Secure Payment",
    description: "100% secure online payment system.",
  },
  {
    id: 3,
    icon: <RotateCcw size={40} className="text-orange-500" />,
    title: "Easy Returns",
    description: "7-day hassle-free return policy.",
  },
  {
    id: 4,
    icon: <BadgeCheck size={40} className="text-purple-600" />,
    title: "Premium Quality",
    description: "Quality products from trusted brands.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose ShopEase?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition text-center"
            >
              <div className="flex justify-center">{feature.icon}</div>

              <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>

              <p className="mt-3 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
