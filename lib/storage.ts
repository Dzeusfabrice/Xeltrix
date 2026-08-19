import { createClient } from './supabase/server'

/**
 * Uploads a file to a Supabase storage bucket and returns the public URL.
 * @param file The file to upload
 * @param bucket The bucket name (default: 'zeltrix')
 * @param folder Optional folder path inside the bucket
 */
export async function uploadFile(file: File, bucket: string = 'zeltrix', folder?: string) {
    if (!file || file.size === 0) return null

    const supabase = await createClient()

    // Create a unique file name
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 10)}-${Date.now()}.${fileExt}`
    const path = folder ? `${folder}/${fileName}` : fileName

    const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
            cacheControl: '3600',
            upsert: false
        })

    if (uploadError) {
        console.error('Upload Error:', uploadError)
        throw new Error(`Erreur d'upload: ${uploadError.message}`)
    }

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(path)

    return publicUrl
}
