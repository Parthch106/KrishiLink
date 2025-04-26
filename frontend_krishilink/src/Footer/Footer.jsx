import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-green-700 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">About Krishi Link</h4>
            <p className="text-green-100">
              Delivering fresh, premium farm products from local fields
              directly to companies. Experience the farm-to-business journey
              that fuels sustainable growth and quality.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-100 hover:text-white">
                  <span className="text-white">About Us</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white">
                  <span className="text-white">Products</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white">
                  <span className="text-white">Farmers</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white">
                  <span className="text-white">Contact</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-green-100">
              <li>Email: info@krishilink.com</li>
              <li>Phone: +91 1234567890</li>
              <li>
                Address: 152, Shree Residency, Piplod Road, Surat, Gujarat
                395007, India
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                className="hover:text-green-200"
              >
                <Facebook className="text-white" />
              </a>
              <a href="https://www.x.com" className="hover:text-green-200">
                <Twitter  className="text-white" />
              </a>
              <a
                href="https://www.instagram.com"
                className="hover:text-green-200"
              >
                <Instagram className="text-white" />
              </a>
              <a
                href="https://www.youtube.com"
                className="hover:text-green-200"
              >
                <Youtube className="text-white" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-100">
          <p>
            &copy; {new Date().getFullYear()} Krishi Link. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
