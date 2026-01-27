"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  ExternalLink,
  Terminal,
} from "lucide-react";

export const Contact = () => {
  return (
    <section
      id="contact"
      className="py-32 px-6 relative overflow-hidden bg-secondary/5"
    >
      {/* Visual Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row items-end justify-between gap-4 border-b border-border pb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-8 bg-primary/50"></span>
              <span className="text-sm font-news font-medium text-primary uppercase tracking-widest">
                Contact
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
              Get in Touch
            </h2>
            <p className="text-muted-foreground text-lg">
              Let's build something extraordinary together.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              System Status: Online & Ready for Logic
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="prose dark:prose-invert">
              <p className="text-lg leading-relaxed text-muted-foreground">
                I'm currently available for freelance projects and consulting.
                If you have a project that needs some creative injection or
                technical expertise, drop me a line.
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:hello@example.com"
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors border border-transparent hover:border-border"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    Email{" "}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-muted-foreground">hello@example.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-border transition-colors">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Location</h3>
                  <p className="text-muted-foreground">
                    Jakarta, Indonesia (GMT+7)
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-dashed border-border bg-secondary/5 mt-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Terminal className="w-24 h-24" />
              </div>
              <h4 className="font-mono font-bold text-primary mb-2 flex items-center gap-2">
                <span className="text-green-500">$</span> echo "Let's Connect"
              </h4>
              <p className="text-sm text-muted-foreground font-mono">
                Whether you have a question or just want to say hi, I'll try my
                best to get back to you!
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-3xl p-8 shadow-2xl relative"
          >
            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="bg-background/50 border-border focus:ring-primary/20 h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-background/50 border-border focus:ring-primary/20 h-12"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="Project Inquiry"
                  className="bg-background/50 border-border focus:ring-primary/20 h-12"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  className="min-h-[150px] bg-background/50 border-border focus:ring-primary/20 resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-base font-semibold"
              >
                Send Message <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
