const publicUrl = process.env.PUBLIC_URL || '';

export function appPath(path) {
  if (/^(?:[a-z][a-z\d+.-]*:|#|\/\/)/i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${publicUrl}${normalizedPath}`;
}

export function mediaPath(filename) {
  return appPath(`/media/${filename}`);
}
