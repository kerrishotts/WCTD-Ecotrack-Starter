// Shown for any address that doesn't match a route.
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section className="card stack-sm">
      <title>Page not found · EcoTrack</title>
      <h2>Page not found</h2>
      <p>We couldn’t find that page. It may have moved, or the address has a typo.</p>
      <p>
        <Link to="/">Back to the tracker →</Link>
      </p>
    </section>
  );
}
