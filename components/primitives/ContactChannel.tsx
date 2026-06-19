import type { ContactChannelDef } from "@/types/content";

interface ContactChannelProps {
  channel: ContactChannelDef;
  className?: string;
}

/**
 * Scene 12 contact action — ARCHITECTURE.md §5.2. Typographic and
 * minimal, no generic "contact card" styling (no icon library exists
 * yet either) — an underlined text link is the entire affordance.
 */
export function ContactChannel({ channel, className }: ContactChannelProps) {
  const isExternal = channel.type === "maps" || channel.type === "whatsapp";

  return (
    <a
      href={channel.value}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`font-body text-body-lg text-mist underline decoration-mist/40 underline-offset-4 transition-colors hover:decoration-mist ${className ?? ""}`}
    >
      {channel.label}
    </a>
  );
}
