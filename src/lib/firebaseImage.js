import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

const cache = new Map();

function parseStorageObjectPath(url) {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("firebasestorage")) return null;
    const match = u.pathname.match(/\/o\/([^?]+)$/);
    if (!match) return null;
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

function splitStemAndExt(objectPath) {
  const dot = objectPath.lastIndexOf(".");
  if (dot === -1) return { stem: objectPath, ext: "" };
  return { stem: objectPath.slice(0, dot), ext: objectPath.slice(dot + 1) };
}

async function tryGetDownloadURL(path) {
  try {
    return await getDownloadURL(ref(storage, path));
  } catch {
    return null;
  }
}

export async function resolveResizedUrl(originalUrl, size) {
  if (!originalUrl) return originalUrl;
  const key = `${originalUrl}|${size}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const objectPath = parseStorageObjectPath(originalUrl);
  if (!objectPath) {
    cache.set(key, originalUrl);
    return originalUrl;
  }

  const promise = (async () => {
    const { stem, ext } = splitStemAndExt(objectPath);
    const candidates = [`${stem}_${size}x${size}.webp`];
    if (ext && ext.toLowerCase() !== "webp") {
      candidates.push(`${stem}_${size}x${size}.${ext}`);
    }
    for (const path of candidates) {
      const url = await tryGetDownloadURL(path);
      if (url) return url;
    }
    return originalUrl;
  })();

  cache.set(key, promise);
  const resolved = await promise;
  cache.set(key, resolved);
  return resolved;
}
