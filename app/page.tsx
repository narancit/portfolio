import { HeroSection } from "@/components/sections/HeroSection"
import { ProjectsSection } from "@/components/sections/ProjectsSection"
import { SkillsSection } from "@/components/sections/SkillsSection"
import { BlogSection } from "@/components/sections/BlogSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { personalInfo } from "@/data/personal-info"
import { techStack } from "@/data/tech-stack"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection personalInfo={personalInfo} techStack={techStack} />
      <ProjectsSection />
      <SkillsSection />
      <BlogSection />
      <ContactSection personalInfo={personalInfo} />
    </main>
  );
}
