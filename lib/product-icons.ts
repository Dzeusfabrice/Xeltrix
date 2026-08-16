import {
    BarChart3,
    Database,
    type LucideIcon,
    MessageSquare,
    Package,
    Tablet,
    Users,
} from 'lucide-react'

export const PRODUCT_ICON_OPTIONS = [
    'Database',
    'Users',
    'MessageSquare',
    'Tablet',
    'BarChart3',
    'Package',
] as const

const PRODUCT_ICONS: Record<string, LucideIcon> = {
    Database,
    Users,
    MessageSquare,
    Tablet,
    BarChart3,
    Package,
}

export function getProductIcon(name?: string | null): LucideIcon {
    if (!name) return Package
    return PRODUCT_ICONS[name] ?? Package
}
