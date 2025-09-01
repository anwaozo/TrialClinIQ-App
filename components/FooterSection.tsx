import { Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export default function FooterSection() {
  return (
    <footer className="w-full bg-[#FAFAFA] ">
      <div className="max-w-[1300px] mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src={"/icons/trial_cliniq_logo.png"}
                alt="TrialCliniq Logo"
                width={124}
                height={39}
              />
            </div>
            <p className="text-gray-600 mb-6 max-w-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et
              lacinia mi.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-gray-600">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="text-gray-900 font-medium mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Find a study
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  More about trials
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  How TrialCliniq help
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-gray-900 font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Terms of Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>Copyright © 2025 TrialCliniq</div>
          <span>Website by Apperr</span>
          <div className="flex items-center space-x-8 mt-4 md:mt-0">
            <Link href="#" className="hover:text-gray-700">
              Back to top
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
