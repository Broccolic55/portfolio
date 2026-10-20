/** Build a URL for a file copied from public/, honoring Vite's deployment base. */
export const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
