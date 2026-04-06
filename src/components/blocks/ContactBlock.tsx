"use client";

import React, { useState } from "react";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, Send, Calendar, Info, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactBlockProps {
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  anchorId?: string;
  showNewsletter?: boolean;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
}

export default function ContactBlock({
  title = "Get in Touch",
  description = "Have questions? We'd love to hear from you. Join our circle or reach out directly.",
  email = "hello@thehairclique.com",
  phone = "+44 (0) 123 456 789",
  anchorId,
  showNewsletter = true,
  newsletterPlaceholder = "Enter your email",
  newsletterButtonText = "Join the Clique",
}: ContactBlockProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe. Please try again.");
      }

      setIsSubmitted(true);
      setInputValue("");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id={anchorId} className="py-12 px-4 md:py-24 md:px-6 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Heading type="h2">{title}</Heading>
              <Text variant="muted" className="max-w-md">
                {description}
              </Text>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="size-5" />
                </div>
                <div>
                  <Text
                    variant="muted"
                    className="text-sm font-medium uppercase tracking-wider"
                  >
                    Email Us
                  </Text>
                  <a
                    href={`mailto:${email}`}
                    className="text-lg hover:text-primary transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Phone className="size-5" />
                </div>
                <div>
                  <Text
                    variant="muted"
                    className="text-sm font-medium uppercase tracking-wider"
                  >
                    Call Us
                  </Text>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="text-lg hover:text-accent transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter / Join Section */}
          {showNewsletter && (
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-sm">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Heading type="h4">Join the Clique</Heading>
                    <Text variant="muted">
                      Stay updated with our latest stories, styling tips, and
                      sanctuary updates.
                    </Text>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder={newsletterPlaceholder}
                      required
                      disabled={isLoading}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="flex-1 h-12"
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="h-12 px-8"
                      disabled={isLoading}
                    >
                      {isLoading ? "Joining..." : newsletterButtonText}
                      <Send className="ml-2 size-4" />
                    </Button>
                  </div>
                  {error && (
                    <Text variant="error" className="text-sm">
                      {error}
                    </Text>
                  )}
                </form>
              ) : (
                <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="size-8" />
                  </div>
                  <Heading type="h4">You're in!</Heading>
                  <Text variant="muted">
                    Thank you for joining. We'll be in touch soon with some
                    magic.
                  </Text>
                  <Button variant="ghost" onClick={() => setIsSubmitted(false)}>
                    Join with another email
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Consultation Information */}
        <div
          className={cn(
            "pt-12 border-t border-border/50",
            showNewsletter ? "mt-20" : "mt-16",
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <Heading
                  type="h4"
                  className="text-primary uppercase tracking-widest text-xs font-bold"
                >
                  Consultations / wig fittings / trials
                </Heading>
                <div className="space-y-1">
                  <Text className="text-xl font-extralight tracking-tighter">
                    Mondays, Tuesdays & Saturdays
                  </Text>
                  <Text
                    variant="brand-primary"
                    className="text-xl font-extralight tracking-tight"
                  >
                    8am — 5pm
                  </Text>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-primary/5 flex items-center justify-center">
                  <Calendar className="size-4 text-primary" />
                </div>
                <Text variant="muted" className="text-sm italic">
                  Follow ups will be arranged after initial consultation
                </Text>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <Heading
                  type="h4"
                  className="text-accent uppercase tracking-widest text-xs font-bold"
                >
                  Consultation Format
                </Heading>
                <div className="space-y-2">
                  <Text className="text-lg font-extralight tracking-tighter">
                    Virtual Consultations
                  </Text>
                  {/*<Text className="text-lg font-extralight tracking-tighter">
                    Physical Consultations <br />
                    <span className="flex items-center gap-2 p-2">
                      <Info className="size-5 text-accent shrink-0 mt-0.5" />
                      <blockquote className="text-sm">
                        Arranged after initial consultation
                      </blockquote>
                    </span>
                  </Text>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
