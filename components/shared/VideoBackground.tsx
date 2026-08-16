import React from 'react'
import Image from 'next/image'
import { cn } from '../ui'

const VIDEO_MIME_TYPES: Record<string, string> = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogv: 'video/ogg',
}

const getMimeType = (src: string) => VIDEO_MIME_TYPES[src.split('.').pop()?.toLowerCase() ?? '']

type VideoBackgroundProps = {
    /** One or more video files, ordered by browser preference (e.g. webm before mp4). */
    sources: string | string[]
    /** Still image shown before playback starts, and instead of the video when motion is reduced. */
    poster?: string
    className?: string
    /** Tint layer keeping foreground text readable over the footage. */
    overlayClassName?: string
}

export const VideoBackground = ({
    sources,
    poster,
    className,
    overlayClassName,
}: VideoBackgroundProps) => {
    const files = Array.isArray(sources) ? sources : [sources]

    return (
        <div aria-hidden="true" className={cn('absolute inset-0 z-0 overflow-hidden', className)}>
            {poster && (
                <Image
                    src={poster}
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            )}

            <video
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                preload="metadata"
                poster={poster}
                tabIndex={-1}
                className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            >
                {files.map((src) => (
                    <source key={src} src={src} type={getMimeType(src)} />
                ))}
            </video>

            <div
                className={cn(
                    'absolute inset-0 bg-white/85 dark:bg-slate-950/85',
                    overlayClassName
                )}
            />
        </div>
    )
}
