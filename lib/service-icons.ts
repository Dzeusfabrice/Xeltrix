import {
    Bot,
    Cloud,
    Code2,
    Database,
    Globe,
    Layers,
    type LucideIcon,
    Monitor,
    Server,
    Shield,
    Smartphone,
    Wrench,
    Zap,
} from 'lucide-react'

export const SERVICE_ICON_OPTIONS = [
    'Globe',
    'Smartphone',
    'Monitor',
    'Database',
    'Bot',
    'Cloud',
    'Wrench',
    'Code2',
    'Server',
    'Shield',
    'Zap',
    'Layers',
] as const

export type ServiceIconName = (typeof SERVICE_ICON_OPTIONS)[number]

const SERVICE_ICONS: Record<string, LucideIcon> = {
    Globe,
    Smartphone,
    Monitor,
    Database,
    Bot,
    Cloud,
    Wrench,
    Code2,
    Server,
    Shield,
    Zap,
    Layers,
}

export function getServiceIcon(name?: string | null): LucideIcon {
    if (!name) return Wrench
    return SERVICE_ICONS[name] ?? Wrench
}
