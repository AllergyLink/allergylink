"use client";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-8">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} AllergyLink. All rights reserved.</p>
        <div className="flex gap-4">
          <a
            href="mailto:support@allergylink.com"
            className="hover:text-slate-700"
          >
            support@allergylink.com
          </a>
          <a href="#faq" className="hover:text-slate-700">
            FAQ
          </a>
        </div>
      </div>
    </footer>
  );
}
