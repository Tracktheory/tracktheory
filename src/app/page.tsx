// Updated layout with new branding, dropdown nav structure, and prep for dynamic cart/sidebar etc.
'use client';

import Image from 'next/image';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [recommendations, setRecommendations] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('engine');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const make = e.target.make.value;
    const model = e.target.model.value;
    const year = e.target.year.value;
    const goal = e.target.goal.value;

    try {
      const res = await fetch('/api/build-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ make, model, year, goal }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      setRecommendations(data.recommendations);
    } catch (err: any) {
      setRecommendations(`⚠️ Could not fetch recommendations:\n\n${err.message}`);
    }
  };

  const navItems = [
    'Home', 'Shop', 'Engine', 'Suspension', 'Brakes/Drivetrain', 'Exhausts', 'Cooling',
    'Interior/Exterior', 'Wheels', 'Tools', 'Clearance', 'Brands', 'AI Advisor',
    'Package Deals', 'Scratch & Win', 'My Garage'
  ];

  const handleNavClick = (item: string) => {
    if (item === 'AI Advisor') {
      const advisorSection = document.getElementById('advisor');
      advisorSection?.scrollIntoView({ behavior: 'smooth' });
    } else if (item === 'Shop' || navItems.includes(item)) {
      setSelectedCategory(item.toLowerCase());
      const shopSection = document.getElementById('shop');
      shopSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-black text-white min-h-screen font-sans">
      {/* Promo Banner */}
      <div className="bg-gray-900 text-sm text-white py-2 px-4 flex justify-around items-center border-b border-gray-800">
        <span className="flex items-center gap-2">🔧 Expert Support</span>
        <span className="flex items-center gap-2">🚚 Fast Shipping</span>
        <span className="flex items-center gap-2">🇦🇺 Aussie Owned</span>
        <span className="flex items-center gap-2">💲 Best Prices</span>
      </div>

      {/* Header */}
      <header className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex-1">
          <Image src="/Tracktheory.svg" alt="TrackTheory Logo" width={50} height={140} className="mx-auto" />
        </div>
        <div className="hidden md:flex gap-4 items-center text-gray-400 text-sm">
          <input
            type="text"
            placeholder="Search keyword or item #"
            className="bg-gray-800 text-white px-3 py-1 rounded w-72"
          />
          <span>📞 (08) 8123 4567</span>
          <span>👤</span>
          <span>🇦🇺</span>
          <span>🛒</span>
        </div>
      </header>

      {/* Nav Bar */}
      <nav className="bg-gray-950 text-sm px-4 py-3 flex flex-wrap justify-center gap-4 border-b border-gray-800">
        {navItems.map((item) => (
          <button
            key={item}
            className="hover:text-teal-400 text-white font-medium"
            onClick={() => handleNavClick(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Shop Section */}
      <section id="shop" className="p-6 bg-gray-950">
        <h2 className="text-2xl font-semibold mb-4">🛒 Performance Parts Catalogue</h2>
        <div className="bg-gray-800 p-6 rounded-xl text-white">
          <h3 className="text-xl font-bold mb-2 capitalize">{selectedCategory.replace(/\//g, ' ')}</h3>
          <p className="text-gray-400 text-sm">Browse all products for {selectedCategory}.</p>
          <p className="text-gray-500 italic mt-4">Product listings will appear here once connected to inventory.</p>
        </div>
      </section>

      {/* AI Advisor */}
      <section id="advisor" className="p-6 bg-gray-900">
        <h2 className="text-2xl font-semibold mb-4">🧠 AI Build Advisor</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto bg-gray-800 p-6 rounded-xl">
          <input name="make" placeholder="Vehicle Make" className="w-full p-2 bg-gray-700 text-white rounded" />
          <input name="model" placeholder="Model" className="w-full p-2 bg-gray-700 text-white rounded" />
          <input name="year" placeholder="Year" className="w-full p-2 bg-gray-700 text-white rounded" />
          <select name="goal" className="w-full p-2 bg-gray-700 text-white rounded">
            <option value="">Select a goal</option>
            <option value="track">Track Ready</option>
            <option value="street">Street Performance</option>
            <option value="diesel">Towing & Diesel Power</option>
          </select>
          <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 p-2 rounded font-bold">Generate Recommendations</button>
        </form>
        {recommendations && (
          <div className="mt-6 bg-gray-800 p-4 rounded-xl text-left whitespace-pre-line">
            <h3 className="text-lg font-bold mb-2">Recommended Mods:</h3>
            <ReactMarkdown className="text-sm text-gray-300">{recommendations}</ReactMarkdown>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="p-6 text-sm text-center text-gray-500 border-t border-gray-700">
        © 2025 Track Theory. Built for speed.
      </footer>
    </main>
  );
}