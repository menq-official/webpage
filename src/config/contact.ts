/**
 * Public contact channels. A channel set to `null` is not live yet and is
 * hidden everywhere it would render. Remaining gaps are tracked in
 * docs/buildpack/OPEN_ITEMS_LOG.md.
 */
type Channel = { label: string; href: string };

export const contact: {
  phone: Channel;
  email: Channel | null;
  telegram: Channel | null;
  whatsapp: Channel | null;
  socials: readonly { id: string; label: string; href: string }[];
} = {
  phone: { label: "+374 44 74 74 47", href: "tel:+37444747447" },
  email: { label: "info@menqstudio.am", href: "mailto:info@menqstudio.am" },
  telegram: null,
  whatsapp: { label: "WhatsApp", href: "https://wa.me/37444747447" },
  socials: [
    { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/37444747447" },
  ],
};

export type ContactConfig = typeof contact;
