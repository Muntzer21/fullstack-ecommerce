import Link from "next/link";
import {
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-24 bg-gray-900 text-gray-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Logo */}

        <div>
          <div className="mb-5 flex items-center gap-3">
            <ShoppingBag className="text-blue-500" size={30} />

            <span className="text-2xl font-bold text-white">BasraEase</span>
          </div>

          <p className="leading-7 text-gray-400">
            Shop thousands of premium products with fast shipping, secure
            payment and the best prices.
          </p>

          <div className="mt-6 flex gap-4">
            
          </div>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">Quick Links</h3>

          <ul className="space-y-3">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Categories */}

        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">Categories</h3>

          <ul className="space-y-3">
            <li>Electronics</li>
            <li>Clothing</li>
            <li>Home & Living</li>
            <li>Beauty</li>
            <li>Sports</li>
          </ul>
        </div>

        {/* Contact */}

        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">Contact</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <span>Basrah, Iraq</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} />
              <span>+964 770 000 0000</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span>support@shopease.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="border-t border-gray-700">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-6 py-6 md:flex-row">
          <p className="text-sm text-gray-400">
            © 2026 ShopEase. All rights reserved.
          </p>

          
        </div>
      </div>
    </footer>
  );
}
