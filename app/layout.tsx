import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/ui/navigation";
import { AdminPanel } from "@/components/ui/admin-panel";
import { isAuthenticated } from "@/lib/auth";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { personalInfo } from "@/data/personal-info";

export const metadata: Metadata = {
  title: "Melnar Ancit Cordova - CRM & Software Engineer Portfolio",
  description: "Portfolio website showcasing coding projects, technical skills, education, career timeline, and technical writing by Melnar Ancit Cordova, a CRM and Software Engineer.",
  keywords: ["portfolio", "software engineer", "CRM", "web development", "Next.js", "TypeScript", "React"],
  authors: [{ name: "Melnar Ancit Cordova" }],
  creator: "Melnar Ancit Cordova",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://melnar-cordova.com",
    title: "Melnar Ancit Cordova - CRM & Software Engineer",
    description: "Portfolio website showcasing coding projects, technical skills, and technical writing.",
    siteName: "Melnar Cordova Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Melnar Ancit Cordova - CRM & Software Engineer",
    description: "Portfolio website showcasing coding projects, technical skills, and technical writing.",
    creator: "@narancit",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authenticated = isAuthenticated();

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-foreground antialiased">
        {/* Skip to main content link for keyboard navigation */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        
        <Navigation />
        
        <main id="main-content" className="min-h-screen">
          {children}
        </main>

        <footer className="bg-muted border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* About Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  {personalInfo.fullName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {personalInfo.title}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {personalInfo.location}
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#projects"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      href="#skills"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Skills
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  Connect
                </h3>
                <div className="flex gap-4">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  {personalInfo.linkedin && (
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                  )}
                  {personalInfo.twitter && (
                    <a
                      href={personalInfo.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Twitter Profile"
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                  )}
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Email Contact"
                  >
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        <AdminPanel isAuthenticated={authenticated} />
      </body>
    </html>
  );
}
