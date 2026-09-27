const VIDEO_ID = /^[a-zA-Z0-9_-]{1,64}$/;

function youtubeId(url: URL): string | null {
  if (url.hostname === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0] ?? "";
    return VIDEO_ID.test(id) ? id : null;
  }

  const host = url.hostname.replace(/^www\./, "");
  if (host !== "youtube.com" && host !== "youtube-nocookie.com") return null;

  const fromQuery = url.searchParams.get("v");
  if (fromQuery && VIDEO_ID.test(fromQuery)) return fromQuery;

  const embed = url.pathname.match(/^\/embed\/([a-zA-Z0-9_-]{1,64})/);
  if (embed && VIDEO_ID.test(embed[1])) return embed[1];

  const shorts = url.pathname.match(/^\/shorts\/([a-zA-Z0-9_-]{1,64})/);
  if (shorts && VIDEO_ID.test(shorts[1])) return shorts[1];

  return null;
}

function vimeoId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "vimeo.com" && host !== "player.vimeo.com") return null;
  const id = url.pathname.split("/").filter(Boolean).pop() ?? "";
  return /^\d{1,20}$/.test(id) ? id : null;
}

/** YouTube and Vimeo embed URLs only. Query values from the CMS are not forwarded. */
export function toSafeEmbedUrl(url: string, options?: { autoplay?: boolean; muted?: boolean; loop?: boolean }): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  if (parsed.protocol !== "https:") return null;

  const youtube = youtubeId(parsed);
  if (youtube) {
    const params = new URLSearchParams();
    if (options?.autoplay) params.set("autoplay", "1");
    if (options?.muted) params.set("mute", "1");
    if (options?.loop) {
      params.set("loop", "1");
      params.set("playlist", youtube);
    }
    params.set("rel", "0");
    params.set("playsinline", "1");
    return `https://www.youtube-nocookie.com/embed/${youtube}?${params.toString()}`;
  }

  const vimeo = vimeoId(parsed);
  if (vimeo) {
    const params = new URLSearchParams();
    if (options?.autoplay) params.set("autoplay", "1");
    if (options?.muted) params.set("muted", "1");
    if (options?.loop) params.set("loop", "1");
    params.set("playsinline", "1");
    return `https://player.vimeo.com/video/${vimeo}?${params.toString()}`;
  }

  return null;
}
