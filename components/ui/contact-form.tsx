'use client';

import { useState } from 'react';
import { contactFormSchema, type ContactFormInput } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateForm = (): boolean => {
    try {
      contactFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const fieldErrors: FormErrors = {};
      error.errors?.forEach((err: any) => {
        const field = err.path[0] as keyof FormErrors;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setFormState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
      }

      setFormState('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setFormState('idle');
      }, 5000);
    } catch (error: any) {
      setFormState('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          disabled={formState === 'loading'}
          className={errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
          placeholder="Your name"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-red-500 flex items-center gap-1" role="alert">
            <XCircle className="h-4 w-4" aria-hidden="true" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled={formState === 'loading'}
          className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
          placeholder="your.email@example.com"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-red-500 flex items-center gap-1" role="alert">
            <XCircle className="h-4 w-4" aria-hidden="true" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={formState === 'loading'}
          className={errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}
          placeholder="Your message..."
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-red-500 flex items-center gap-1" role="alert">
            <XCircle className="h-4 w-4" aria-hidden="true" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={formState === 'loading'}
        className="w-full"
        aria-label={formState === 'loading' ? 'Sending message...' : 'Send message'}
      >
        {formState === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>

      {/* Success Message */}
      {formState === 'success' && (
        <div 
          className="p-4 rounded-md bg-primary/10 border border-primary text-primary flex items-center gap-2"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          <p className="text-sm font-medium">Message sent successfully! I&apos;ll get back to you soon.</p>
        </div>
      )}

      {/* Error Message */}
      {formState === 'error' && errorMessage && (
        <div 
          className="p-4 rounded-md bg-red-500/10 border border-red-500 text-red-500 flex items-center gap-2"
          role="alert"
          aria-live="assertive"
        >
          <XCircle className="h-5 w-5" aria-hidden="true" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
