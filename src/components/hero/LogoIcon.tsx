import Image from "next/image";

export function LogoIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo_megaannum.png"
      alt="Megaannum"
      width={32}
      height={32}
      className={className}
      priority
    />
  );
}
