import { PersonalInfo } from '@/types/portfolio';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { ContactForm } from '@/components/ui/contact-form';
import { Mail, Github, Linkedin, Twitter, MapPin } from 'lucide-react';

interface ContactSectionProps {
  personalInfo: PersonalInfo;
}

export function ContactSection({ personalInfo }: ContactSectionProps) {
  return (
    <SectionWrapper 
      id="contact" 
      heading="Get In Touch"
      description="Have a question or want to work together? Feel free to reach out!"
      className="py-16 md:py-24 bg-muted/30"
      headingClassName="text-3xl md:text-4xl font-bold mb-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary min-h-[44px] min-w-[44px] flex items-center justify-center" aria-hidden="true">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium mb-1">Email</p>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`Send email to ${personalInfo.email}`}
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              {personalInfo.location && (
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary min-h-[44px] min-w-[44px] flex items-center justify-center" aria-hidden="true">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Location</p>
                    <p className="text-muted-foreground">{personalInfo.location}</p>
                  </div>
                </div>
              )}

              {/* Social Media Links */}
              <div>
                <p className="font-medium mb-4">Connect With Me</p>
                <div className="flex flex-wrap gap-4">
                  {/* GitHub */}
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors min-h-[44px]"
                    aria-label="Visit my GitHub profile (opens in new tab)"
                  >
                    <Github className="h-5 w-5" aria-hidden="true" />
                    <span>GitHub</span>
                  </a>

                  {/* LinkedIn */}
                  {personalInfo.linkedin && (
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors min-h-[44px]"
                      aria-label="Visit my LinkedIn profile (opens in new tab)"
                    >
                      <Linkedin className="h-5 w-5" aria-hidden="true" />
                      <span>LinkedIn</span>
                    </a>
                  )}

                  {/* Twitter */}
                  {personalInfo.twitter && (
                    <a
                      href={personalInfo.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors min-h-[44px]"
                      aria-label="Visit my Twitter profile (opens in new tab)"
                    >
                      <Twitter className="h-5 w-5" aria-hidden="true" />
                      <span>Twitter</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
