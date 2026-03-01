"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon, MapPinIcon, PhoneIcon, SendIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { USER } from "@/features/profile/data/user";
import { cn } from "@/lib/utils";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

function decodeEmail(encoded: string): string {
  try {
    return atob(encoded);
  } catch {
    return "";
  }
}

export function Contact() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: ContactFormValues) {
    const scriptUrl = process.env.NEXT_PUBLIC_CONTACT_FORM_URL;

    if (!scriptUrl) {
      toast.error("Contact form is not configured. Please try again later.");
      return;
    }

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status === "success") {
        toast.success("Message sent successfully! I'll get back to you soon.");
        form.reset();
      } else {
        toast.error(
          result.message || "Something went wrong. Please try again."
        );
      }
    } catch {
      toast.error("Failed to send message. Please try again later.");
    }
  }

  const decodedEmail = decodeEmail(USER.email);

  return (
    <Panel id="contact" className="after:hidden">
      <PanelHeader>
        <PanelTitle>Let&apos;s Work Together</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Contact Info */}
          <div className="space-y-8">
            <ContactInfoItem
              icon={MapPinIcon}
              label="Location"
              value={USER.address}
            />

            {USER.phoneNumber && (
              <ContactInfoItem
                icon={PhoneIcon}
                label="Call me"
                value={USER.phoneNumber}
                href={`tel:${USER.phoneNumber}`}
              />
            )}

            <ContactInfoItem
              icon={MailIcon}
              label="Mail me"
              value={decodedEmail}
              href={`mailto:${decodedEmail}`}
            />

            {/* Social Links */}
            <div className="pt-2">
              <p className="mb-4 text-sm text-muted-foreground">Follow me:</p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full",
                      "bg-primary text-primary-foreground",
                      "transition-transform hover:scale-110"
                    )}
                    aria-label={link.title}
                  >
                    {typeof link.icon === "function" &&
                      React.createElement(link.icon, { className: "size-5" })}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          placeholder="Your Name"
                          className={cn(
                            "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm",
                            "placeholder:text-muted-foreground",
                            "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
                            "transition-colors"
                          )}
                          suppressHydrationWarning
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          type="email"
                          placeholder="Your Email"
                          className={cn(
                            "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm",
                            "placeholder:text-muted-foreground",
                            "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
                            "transition-colors"
                          )}
                          suppressHydrationWarning
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        placeholder="Subject"
                        className={cn(
                          "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm",
                          "placeholder:text-muted-foreground",
                          "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
                          "transition-colors"
                        )}
                        suppressHydrationWarning
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <textarea
                        placeholder="Message"
                        rows={5}
                        className={cn(
                          "w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm",
                          "placeholder:text-muted-foreground",
                          "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
                          "transition-colors"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="gap-2"
                suppressHydrationWarning
              >
                <SendIcon className="size-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </PanelContent>
    </Panel>
  );
}

function ContactInfoItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}:</p>
      <div className="flex items-center gap-3">
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted ring-1 ring-edge ring-offset-1 ring-offset-background"
          aria-hidden
        >
          <Icon className="size-4 text-muted-foreground" />
        </div>
        {href ? (
          <a
            href={href}
            className="text-lg font-semibold underline-offset-4 hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="text-lg font-semibold">{value}</p>
        )}
      </div>
    </div>
  );
}
