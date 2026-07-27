const Newsletter = () => {
  return (
    <section className="bg-blue-600 py-16">
      <div className="max-w-3xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-white">Stay Updated</h2>

        <p className="text-blue-100 mt-4">
          Subscribe to receive our latest products, exclusive offers and
          exciting deals.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-3 rounded-lg bg-white outline-none"
          />

          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-3 rounded-lg">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
