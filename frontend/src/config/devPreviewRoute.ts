/** Secret path for internal result-screen preview (not linked in the app UI). */
export const RESULT_PREVIEW_DEV_PATH = '/asq-internal-preview-8f3c2a9e1b7d4m6p2q0w5x'

export function isResultPreviewDevRoute(
  pathname: string = typeof window !== 'undefined' ? window.location.pathname : ''
): boolean {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  return normalized === RESULT_PREVIEW_DEV_PATH
}
