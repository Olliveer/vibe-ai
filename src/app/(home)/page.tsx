import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col max-w-5xl w-full mx-auto">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/logo.svg"
            alt="Vibe AI logo"
            width={50}
            height={50}
            className="hidden md:block"
          />
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-primary/10 text-primary">
            🚀 Powered by AI
          </div>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Build Amazing Apps with AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into reality with our AI-powered platform.
            Create stunning websites, applications, and digital experiences in
            minutes, not hours.
          </p>

          <div className="mt-4 mb-6">
            <div className="inline-flex items-center rounded-lg px-4 py-2 text-sm bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <span className="text-yellow-800 dark:text-yellow-200">
                📚 This is a test project created for educational and study
                purposes only.
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto w-full">
          <ProjectForm />
        </div>
      </section>

      <section className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Your Projects
          </h2>
          <p className="text-muted-foreground">
            Manage and explore your AI-generated projects
          </p>
        </div>
        <ProjectsList />
      </section>
    </div>
  );
}
