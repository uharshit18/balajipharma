/**
 * Optimizes external images using wsrv.nl to reduce size and convert to WebP.
 * @param url The original image URL (e.g. wikimedia, unsplash)
 * @param width The desired width (default 200)
 * @returns The proxied, optimized URL
 */
export const getOptimizedLogoUrl = (url: string, width: number = 200): string => {
    if (!url) return "";
    // If it's already a local asset, don't proxy it
    if (url.startsWith("/")) return url;

    // Encode the url
    const encoded = encodeURIComponent(url);

    // wsrv.nl parameters:
    // w: width
    // output: webp (modern format)
    // l: compression level (default 80 is fine, maybe 70)
    // fit: contain (to preserve aspect ratio within the box)
    return `https://wsrv.nl/?url=${encoded}&w=${width}&output=webp&q=75`;
};
