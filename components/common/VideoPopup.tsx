'use client'

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { parseVideoUrl } from '@/lib/videoUrl'

export type VideoPopupProps = {
  videoUrl: string
  title?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Reusable video popup: 80% page width, close (X) on top right,
 * plays video by format (YouTube/Vimeo/Drive iframe, or direct <video>).
 */
export function VideoPopup({ videoUrl, title, open, onOpenChange }: VideoPopupProps) {
  const videoConfig = videoUrl ? parseVideoUrl(videoUrl) : null

  if (!videoConfig) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[95vw] max-w-[95vw] sm:w-[85vw] sm:max-w-[85vw] lg:w-[80vw] lg:max-w-[80vw] max-h-[90vh] p-0 overflow-hidden [&>button]:absolute [&>button]:top-2 [&>button]:right-2 [&>button]:z-10 [&>button]:flex [&>button]:h-9 [&>button]:w-9 [&>button]:shrink-0 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:bg-white/95 [&>button]:text-gray-900 [&>button]:shadow-md"
        showCloseButton
      >
        <DialogTitle className="sr-only">
          {title ? `Video: ${title}` : 'Video'}
        </DialogTitle>
        <div className="relative w-full aspect-video bg-black">
          {open &&
            (videoConfig.type === 'direct' ? (
              <video
                src={videoConfig.src}
                controls
                playsInline
                className="w-full h-full max-h-[85vh] object-contain"
                title="Video player"
              />
            ) : (
              <iframe
                className="w-full h-full min-h-[50vh] max-h-[85vh] border-0"
                src={videoConfig.embedUrl}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
