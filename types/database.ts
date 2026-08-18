export type Project = {
    id: string
    title: string
    slug: string
    description: string
    content?: string
    image_url?: string
    gallery?: string[]
    category: 'Mobile' | 'Web' | 'Desktop' | 'API'
    technologies?: string[]
    project_url?: string
    download_url?: string
    is_featured: boolean
    status: 'online' | 'development' | 'archived'
    sort_order: number
    created_at: string
    updated_at: string
}

export type Testimonial = {
    id: string
    name: string
    position?: string
    photo_url?: string
    message: string
    rating: number
    is_featured: boolean
    created_at: string
}

export type Article = {
    id: string
    title: string
    slug: string
    excerpt?: string
    content: string
    cover_url?: string
    category?: string
    tags?: string[]
    author_id: string
    status: 'draft' | 'published' | 'archived'
    published_at?: string
    created_at: string
    updated_at: string
}

export type Technology = {
    id: string
    name: string
    logo_url?: string
    category: string
    description?: string
    proficiency: number
    level?: 'Debutant' | 'Intermediaire' | 'Expert'
    sort_order: number
}

export type Service = {
    id: string
    slug: string
    title: string
    tagline?: string
    description?: string
    icon_name: string
    image_url?: string
    features: string[]
    deliverables: string[]
    stack: string[]
    timeline?: string
    sort_order: number
    status: 'draft' | 'published'
    created_at: string
    updated_at: string
}

export type Product = {
    id: string
    slug: string
    name: string
    badge?: string
    tagline?: string
    description?: string
    icon_name: string
    modules: string[]
    specs: Record<string, string>
    target?: string
    highlight_metric?: string
    highlight_label?: string
    image_url?: string
    sort_order: number
    status: 'draft' | 'published'
    created_at: string
    updated_at: string
}

export type ExperienceSkill = {
    id: string
    name: string
    domain?: string
    tech?: string
    level: number
    color?: string
    created_at: string
}

export type Message = {
    id: string
    name: string
    email: string
    phone?: string
    subject: string
    message: string
    status: 'unread' | 'read' | 'archived'
    created_at: string
}

export type Statistic = {
    id: string
    key: string
    value: number
    label: string
    icon?: string
    is_auto: boolean
}

export type Setting = {
    id: string
    key: string
    value: any
    type: 'text' | 'json' | 'url'
}
