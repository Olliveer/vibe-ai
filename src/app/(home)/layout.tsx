import { Navbar } from "@/modules/home/ui/components/navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen bg-background dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] bg-[radial-gradient(#dadde2_1px,transparent_1px)] [background-size:16px_16px]">
      <Navbar />
      <div className="flex-1 flex flex-col px-4 pb-4">{children}</div>
    </main>
  );
}
