import type { Metadata } from "next";
import { CareersContent } from "@/components/careers/CareersContent";
import { Navbar } from "@/components/hero/Navbar";

export const metadata: Metadata = {
  title: "Careers | Megaannum",
  description: "Open roles at Megaannum, across AI research, treasury engineering, trading, and asset management.",
};

export default function CareersPage() {
  return (
    <main>
      <Navbar />
      <CareersContent />
    </main>
  );
}
