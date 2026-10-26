import type { Thing, WithContext } from "schema-dts";

/**
 * Serializes structured data for a JSON-LD script tag.
 * Escaping "<" keeps a value such as "</script>" from closing the tag early.
 */
export function serializeJsonLd(data: WithContext<Thing>) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Renders schema.org structured data as a JSON-LD script tag. */
export function JsonLd({ data }: { data: WithContext<Thing> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
