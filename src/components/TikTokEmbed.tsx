"use client";

import { useEffect, useRef } from "react";

export function TikTokEmbed({ url }: { url: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="flex justify-center">
      <blockquote
        className="tiktok-embed"
        cite={url}
        data-video-id={url.split("/").pop()}
        style={{ maxWidth: "325px", minWidth: "325px" }}
      >
        <section>
          <a target="_blank" rel="noopener noreferrer" href={url}>
            View on TikTok
          </a>
        </section>
      </blockquote>
    </div>
  );
}
