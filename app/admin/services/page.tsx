import { createClient } from '@/lib/supabase/server'
import { Card, Button, Badge } from '@/components/ui'
import { Wrench, Plus, Edit2, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { DeleteServiceButton } from './delete-button'
import { getServiceIcon } from '@/lib/service-icons'
import { getServiceImage } from '@/lib/service-images'
import type { Service } from '@/types/database'

export default async function AdminServicesPage() {
    const supabase = await createClient()

    const { data: services, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true })

    const list = (services || []) as Service[]

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
                        <Wrench size={26} className="text-blue-600 dark:text-blue-400" />
                        <span>Gestion des Services</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Ajoutez, modifiez ou retirez les expertises affichées sur le site.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/services" target="_blank">
                        <Button variant="outline" size="sm">
                            <span>Voir la page publique</span>
                            <ArrowUpRight size={14} />
                        </Button>
                    </Link>
                    <Link href="/admin/services/new">
                        <Button variant="primary" size="sm">
                            <Plus size={16} />
                            <span>Nouveau service</span>
                        </Button>
                    </Link>
                </div>
            </div>

            {error && (
                <Card className="p-5 border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                        Impossible de charger les services. Vérifie que la table <code className="font-mono">services</code> existe
                        dans Supabase (exécute le fichier <code className="font-mono">supabase/migrations/20260316_create_services.sql</code>).
                    </p>
                </Card>
            )}

            {!error && list.length === 0 && (
                <Card className="p-10 text-center space-y-4">
                    <p className="text-slate-600 dark:text-slate-300">Aucun service en base pour le moment.</p>
                    <Link href="/admin/services/new">
                        <Button variant="primary">Créer le premier service</Button>
                    </Link>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {list.map((srv) => {
                    const Icon = getServiceIcon(srv.icon_name)
                    const isPublished = srv.status === 'published'

                    return (
                        <Card key={srv.id} className="p-6 space-y-4 overflow-hidden">
                            <div className="relative -mx-6 -mt-6 h-28 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={getServiceImage(srv)}
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-slate-950/30" />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <Icon size={20} />
                                </div>
                                <Badge variant={isPublished ? 'success' : 'warning'} className="text-[10px]">
                                    {isPublished ? 'Publié' : 'Brouillon'}
                                </Badge>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{srv.title}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">#{srv.slug}</p>
                                {srv.timeline && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                        Délai : <strong className="text-slate-800 dark:text-slate-200">{srv.timeline}</strong>
                                    </p>
                                )}
                            </div>

                            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                <Link
                                    href={`/services#${srv.slug}`}
                                    target="_blank"
                                    className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline inline-flex items-center gap-0.5"
                                >
                                    Voir <ArrowUpRight size={12} />
                                </Link>
                                <div className="flex items-center gap-1">
                                    <Link
                                        href={`/admin/services/edit/${srv.id}`}
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors"
                                    >
                                        <Edit2 size={16} />
                                    </Link>
                                    <DeleteServiceButton id={srv.id} title={srv.title} />
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
