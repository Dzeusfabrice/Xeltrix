/**
 * Illustrations de secours pour les produits logiciels, utilisées quand aucune image
 * n'a été renseignée dans l'administration.
 */
const FALLBACK_BY_SLUG: Record<string, string> = {
    'x-crm': 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
    'x-logistics': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    'x-health': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
}

const GENERIC_FALLBACK =
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop'

export function getProductImage(product: { slug: string; image_url?: string | null }): string {
    if (product.image_url) return product.image_url
    return FALLBACK_BY_SLUG[product.slug] ?? GENERIC_FALLBACK
}
