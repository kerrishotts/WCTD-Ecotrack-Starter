// Social media integration: share buttons, plus links to the team's own
// accounts from siteConfig.js. Share links only open the other site;
// nothing is sent until the visitor chooses to post.

import { SITE } from "../siteConfig.js";

export default function SocialLinks() {
  const url = typeof window !== "undefined" ? window.location.origin : "";
  const text = encodeURIComponent(SITE.shareText);
  const link = encodeURIComponent(url);

  const shares = [
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${link}` },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${text}%20${link}` },
    { label: "Share by email", href: `mailto:?subject=${encodeURIComponent(SITE.name)}&body=${text}%20${link}` },
  ];

  const follows = [
    { label: "GitHub", href: SITE.social.github },
    { label: "Instagram", href: SITE.social.instagram },
    { label: "YouTube", href: SITE.social.youtube },
  ].filter((item) => item.href);

  async function handleNativeShare() {
    try {
      await navigator.share({ title: SITE.name, text: SITE.shareText, url });
    } catch {
      // the visitor closed the share sheet: nothing to do
    }
  }

  return (
    <div className="social">
      <p className="social-title">Spread the word</p>
      <ul className="social-list">
        {typeof navigator !== "undefined" && navigator.share && (
          <li>
            <button type="button" className="chip" onClick={handleNativeShare}>
              Share…
            </button>
          </li>
        )}
        {shares.map((item) => (
          <li key={item.label}>
            <a className="chip" href={item.href} target="_blank" rel="noopener noreferrer">
              {item.label}
            </a>
          </li>
        ))}
        {follows.map((item) => (
          <li key={item.label}>
            <a className="chip chip--follow" href={item.href} target="_blank" rel="noopener noreferrer">
              Follow us on {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
