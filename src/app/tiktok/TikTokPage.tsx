"use client";

import Link from "next/link";
import { MessageCircle, Music, Heart, Share2 } from "lucide-react";
import { SITE_CONFIG, TIKTOK_POSTS } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { TikTokEmbed } from "@/components/TikTokEmbed";
import { TikTokIcon } from "@/lib/icons";
import { Logo } from "@/components/Logo";

const services = [
  { label: "Book Home Cleaning", message: "Hello! I'd like to book a home cleaning service." },
  { label: "Hire a Maid", message: "Hello! I'm interested in hiring a maid." },
  { label: "Aunt for Hire", message: "Hello! I'd like to learn more about the Aunt for Hire service." },
  { label: "Marriage Counselling", message: "Hello! I'm interested in marriage counselling." },
  { label: "Maid Training", message: "Hello! I'd like to know more about maid training." },
  { label: "Contact Us", message: "Hello! I'd like to get in touch." },
];

export function TikTokPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[500px] mx-auto px-6 pt-24 pb-16">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-light-section border-2 border-accent flex items-center justify-center mb-4">
            <Logo variant="dark" />
          </div>
          <h1 className="font-serif text-xl font-bold text-text-primary">
            {SITE_CONFIG.name}
          </h1>
          <p className="text-text-secondary text-sm mt-1 max-w-xs">
            Cleaning tips, marriage advice, and behind-the-scenes from Zimbabwe&apos;s trusted home & life service.
          </p>

          {/* Follow Button */}
          <a
            href={SITE_CONFIG.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark text-white font-semibold text-sm hover:bg-dark-light transition-colors mt-4"
          >
            <TikTokIcon className="h-4 w-4" />
            Follow on TikTok
          </a>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-5 text-center">
            <div>
              <p className="font-bold text-text-primary">1.2K</p>
              <p className="text-[11px] text-text-secondary uppercase tracking-wider">Followers</p>
            </div>
            <div>
              <p className="font-bold text-text-primary">15</p>
              <p className="text-[11px] text-text-secondary uppercase tracking-wider">Videos</p>
            </div>
            <div>
              <p className="font-bold text-text-primary">50K+</p>
              <p className="text-[11px] text-text-secondary uppercase tracking-wider">Likes</p>
            </div>
          </div>
        </div>

        {/* Service Buttons */}
        <div className="space-y-3 mb-10">
          {services.map((service) => (
            <a
              key={service.label}
              href={getWhatsAppUrl(SITE_CONFIG.whatsapp, service.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-accent text-dark font-semibold text-sm hover:bg-accent-light transition-colors shadow-md"
            >
              <MessageCircle className="h-4 w-4" />
              {service.label}
            </a>
          ))}
        </div>

        {/* TikTok Videos Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-5">
            <Music className="h-4 w-4 text-accent" />
            <h2 className="font-serif font-bold text-text-primary">Latest TikToks</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {TIKTOK_POSTS.map((post) => (
              <div
                key={post.id}
                className="rounded-xl overflow-hidden border border-border/50 bg-white"
              >
                <TikTokEmbed url={post.url} />
                <div className="px-3 py-2.5">
                  <p className="text-xs font-medium text-text-primary truncate">
                    {post.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-text-secondary text-[11px]">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      1.2K
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="h-3 w-3" />
                      89
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Link to Main Site */}
        <div className="text-center pt-6 border-t border-border/40">
          <Link
            href="/"
            className="text-sm text-text-secondary hover:text-accent transition-colors"
          >
            mamoyoservices.co.zw &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
