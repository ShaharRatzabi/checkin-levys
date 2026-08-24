import React, { useEffect, useState } from "react";
import { resolveResizedUrl } from "../lib/firebaseImage";

export default function ResizedImage({ originalUrl, size, ...imgProps }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setSrc(null);
    resolveResizedUrl(originalUrl, size).then((url) => {
      if (!cancelled) setSrc(url);
    });
    return () => {
      cancelled = true;
    };
  }, [originalUrl, size]);

  if (!src) return null;
  return <img src={src} {...imgProps} />;
}
