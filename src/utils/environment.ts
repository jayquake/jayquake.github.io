export function isStaticDeployment(): boolean {
  if (process.env.REACT_APP_STATIC_ONLY === 'true') return true;
  const host = window.location.hostname;
  return (
    host.endsWith('.github.io') ||
    host.endsWith('.netlify.app') ||
    host.endsWith('.vercel.app') ||
    host.endsWith('.web.app') ||
    host.endsWith('.firebaseapp.com') ||
    host.endsWith('.s3.amazonaws.com') ||
    host.endsWith('.cloudfront.net')
  );
}

export function getDeploymentMode(): 'local' | 'static' | 'cloud' {
  if (process.env.REACT_APP_API_URL) return 'cloud';
  if (isStaticDeployment()) return 'static';
  return 'local';
}

export function getApiBaseUrl(): string {
  return process.env.REACT_APP_API_URL || '';
}
