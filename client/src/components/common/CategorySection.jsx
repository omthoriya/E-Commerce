import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Mobiles",
    icon: "📱",
  },
  {
    id: 2,
    name: "Laptops",
    icon: "💻",
  },
  {
    id: 3,
    name: "Watches",
    icon: "⌚",
  },
  {
    id: 4,
    name: "Fashion",
    icon: "👕",
  },
];

const CategorySection = () => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">Shop By Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to="/products"
            className="bg-white shadow-md rounded-xl p-8 text-center hover:shadow-xl transition"
          >
            <div className="text-6xl">{category.icon}</div>

            <h3 className="mt-4 text-xl font-semibold">{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
