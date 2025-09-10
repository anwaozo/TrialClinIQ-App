import Link from "next/link"

export function DashboardFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">Copyright © 2025 TrialCliniq.</p>
          <div className="flex space-x-6 text-sm text-gray-600">
            <Link href="/terms" className="hover:text-gray-900">
              Terms of Conditions
            </Link>
            <Link href="/contact" className="hover:text-gray-900">
              Contact Us
            </Link>
            <Link href="/about" className="hover:text-gray-900">
              About Us
            </Link>
            <Link href="/privacy" className="hover:text-gray-900">
              Privacy Policy
            </Link>
          </div>
          <p className="text-sm text-gray-600">
            Curated by <span className="text-blue-600">Apperr</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
