const UNSPLASH_HOST = 'images.unsplash.com';

function isUnsplashUrl(url) {
  if (!url || typeof url !== 'string') return false;

  try {
    return new URL(url).hostname.includes(UNSPLASH_HOST);
  } catch {
    return false;
  }
}

export function optimizeImageUrl(url, options = {}) {
  if (!url || typeof url !== 'string') return url;

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }

  if (!parsed.hostname.includes(UNSPLASH_HOST)) {
    return url;
  }

  const {
    width = 1200,
    height,
    quality = 62,
    fit = 'crop',
    format = 'webp',
  } = options;

  parsed.searchParams.set('auto', 'format');
  parsed.searchParams.set('fit', fit);
  parsed.searchParams.set('fm', format);
  parsed.searchParams.set('q', String(quality));
  parsed.searchParams.set('w', String(width));

  if (height) {
    parsed.searchParams.set('h', String(height));
  }

  return parsed.toString();
}

export function buildUnsplashSrcSet(url, options = {}) {
  if (!isUnsplashUrl(url)) return undefined;

  const {
    widths = [320, 480, 640, 800, 960, 1200],
    aspectRatio,
    quality = 62,
    fit = 'crop',
    format = 'webp',
  } = options;

  return widths
    .map((width) => {
      const height = aspectRatio ? Math.round(width / aspectRatio) : undefined;
      const candidate = optimizeImageUrl(url, { width, height, quality, fit, format });
      return `${candidate} ${width}w`;
    })
    .join(', ');
}

/**
 * Build picture element sourceSet for local optimized images (AVIF + WebP fallback to JPG)
 * @param {string} baseName - Image basename without extension (e.g., 'hero', 'services-eng')
 * @param {object} options - { basePath, jpg, webp, avif } sourceset attributes
 * @returns {object} - { jpg, webp, avif } URLs ready for picture element
 */
export function getLocalImageFormats(baseName, options = {}) {
  const basePath = options.basePath || '/images/unsplash';
  return {
    jpg: `${basePath}/${baseName}.jpg`,
    webp: `${basePath}/${baseName}.webp`,
    avif: `${basePath}/${baseName}.avif`,
  };
}
