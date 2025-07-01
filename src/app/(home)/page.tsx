import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col max-w-5xl w-full mx-auto">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="Vibe AI logo"
            width={50}
            height={50}
            className="hidden md:block"
          />
        </div>
        <h1 className="text-2xl md:text-5xl font-bold text-center">
          Vibe AI is a platform for creating and sharing AI-generated content.
        </h1>
        <p className="text-center text-lg md:text-xl text-muted-foreground">
          Create apps, websites, and more with AI.
        </p>

        <div className="max-w-3xl mx-auto w-full">
          <ProjectForm />
        </div>
      </section>
      <ProjectsList />
    </div>
  );
}
