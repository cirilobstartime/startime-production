import Image from "next/image";

interface UfiSectionProps {
  locale?: string;
}

export default function UfiSection({
  locale = "en",
}: UfiSectionProps) {
  const isAr = locale === "ar";

  return (
    <section className="bg-white" id="startime">
      <div className="bg-white pt-20 text-center">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4">
          <p className="text-xl font-light leading-relaxed text-zinc-700 md:text-2xl">
            {isAr ? "نفخر بعضويتنا في" : "A proud member of"}
          </p>

          <Image
            src="/logo-ufi-colored.svg"
            alt="UFI The Global Association of the Exhibition Industry Logo"
            width={240}
            height={48}
            className="object-contain py-6"
            priority
          />

          <p className="hidden text-xl font-light leading-relaxed text-zinc-700 md:text-2xl">
            {isAr
              ? "الرابطة العالمية لصناعة المعارض"
              : "The Global Association of Exhibition Industry"}
          </p>
        </div>
      </div>
    </section>
  );
}