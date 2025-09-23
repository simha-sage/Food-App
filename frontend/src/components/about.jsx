import Navigation from "./navigation";

export default function About() {
  return (
    <div>
      <Navigation />
      <div className="bg-gray-50 min-h-screen py-12 px-6 lg:px-20">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            About Us
          </h1>

          {/* Intro Section */}
          <p className="text-lg text-gray-600 mb-10 text-center leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-gray-800">FoodieHub</span>, your
            one-stop destination for discovering and enjoying the best food
            around you. We believe food isn’t just about taste — it’s an
            experience, a memory, and a way to bring people together.
          </p>

          {/* Mission and Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white shadow-lg rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                ✨ Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To connect people with their favorite meals, whether it’s a hot
                cheesy pizza, a juicy burger, or a refreshing beverage. We aim
                to provide a seamless food ordering experience with convenience,
                trust, and speed.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                🌍 Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To be the most loved food discovery and delivery platform,
                helping people explore cuisines and restaurants from the comfort
                of their homes. We dream of making every meal special.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              🍽️ What We Offer
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-600 leading-relaxed">
              <li>Wide range of restaurants and food categories.</li>
              <li>Exclusive deals and offers to make your meals affordable.</li>
              <li>Fast and reliable delivery services.</li>
              <li>User-friendly app and website with secure payments.</li>
              <li>Dedicated customer support for your queries.</li>
            </ul>
          </div>

          {/* Team / People Behind */}
          <div className="bg-gray-100 rounded-2xl p-8 shadow-inner">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              👨‍🍳 The People Behind
            </h2>
            <p className="text-gray-600 leading-relaxed text-center mb-6">
              We are a passionate team of food lovers, tech enthusiasts, and
              customer-first thinkers. Our goal is to blend technology with
              taste to make your life more flavorful.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="font-semibold text-gray-800">B L Narasimha</h3>
                <p className="text-gray-500 text-sm">Founder & Visionary</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="font-semibold text-gray-800">B L Narasimha</h3>
                <p className="text-gray-500 text-sm">Tech Lead</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="font-semibold text-gray-800">B L Narasimha</h3>
                <p className="text-gray-500 text-sm">Making it happen</p>
              </div>
            </div>
          </div>

          {/* Closing Note */}
          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              ❤️ Thank you for choosing us!
            </h2>
            <p className="text-gray-600">
              Your trust inspires us to keep serving better. Let’s continue this
              delicious journey together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
