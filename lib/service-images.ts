/**
 * Illustrations de secours par pôle d'expertise, utilisées quand aucune image
 * n'a été renseignée dans l'administration.
 */
const FALLBACK_BY_SLUG: Record<string, string> = {
    web: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop',
    mobile: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=1200&auto=format&fit=crop',
    desktop: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    erp: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop',
    ai: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop',
    devops: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    maintenance: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200&auto=format&fit=crop',
}

const GENERIC_FALLBACK =
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop'

export function getServiceImage(service: { slug: string; image_url?: string | null }): string {
    if (service.image_url) return service.image_url
    return FALLBACK_BY_SLUG[service.slug] ?? GENERIC_FALLBACK
}
