'use client'

import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Text } from '@/components/common/text'

export type SpeakerDetailItem = {
  title: string
  subTitle: string
  description: string
  image: string
}

type Props = {
  open: boolean
  onClose: () => void
  speaker: SpeakerDetailItem | null
}

export function SpeakerDetailModal({ open, onClose, speaker }: Props) {
  if (!speaker) return null

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-[#0B5C6B]/20 bg-[#EAF4F6] p-0 shadow-xl"
        showCloseButton
      >
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="shrink-0 flex justify-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[#8DC63F]/40 bg-white">
                <Image
                  src={speaker.image}
                  alt={speaker.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-[#0B5C6B] mb-1">
                {speaker.title}
              </DialogTitle>
              {speaker.subTitle && (
                <DialogDescription className="text-[#0B5C6B] font-semibold text-sm mb-3">
                  {speaker.subTitle}
                </DialogDescription>
              )}
              <Text className="text-[#333] font-medium leading-[1.5] text-justify">
                {speaker.description}
              </Text>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
