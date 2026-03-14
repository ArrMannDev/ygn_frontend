import { Dumbbell, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-yellow-400 rounded-md">
                <Dumbbell className="h-5 w-5 text-zinc-950" />
              </div>
              <span className="font-bold text-lg text-white">
                YGN<span className="text-yellow-400">GYM</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Transform your body and mind with our state-of-the-art facilities
              and expert trainers. Join the movement today.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>
                <Link
                  to="/classes"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Classes
                </Link>
              </li>
              <li>
                <Link
                  to="/memberships"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Memberships
                </Link>
              </li>
              <li>
                <Link
                  to="/trainers"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Trainers
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-yellow-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-yellow-400 transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <div className="flex items-center gap-4 text-zinc-400">
              <a href="#" className="hover:text-yellow-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Newsletter
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white w-full focus:outline-none focus:border-yellow-400/50"
                />
                <button className="bg-yellow-400 text-zinc-950 px-3 py-2 rounded text-sm font-medium hover:bg-yellow-500 transition-colors">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} YgnGym. All rights reserved.
          </p>
          <p className="text-zinc-600 text-xs">Built with ❤️ in Yangon.</p>
        </div>
      </div>
    </footer>
  );
};
