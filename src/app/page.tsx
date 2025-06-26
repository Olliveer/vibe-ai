import { caller } from "@/trpc/server";

export default async function Home() {
  const { greeting } = await caller.test({ text: 1 });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <pre>{greeting}</pre>
    </div>
  );
}
