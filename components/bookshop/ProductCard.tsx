'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { BookshopProduct } from '@/lib/api/bookshop'

type ProductCardProps = {
  product: BookshopProduct
  className?: string
}

function formatPrice(price: number): string {
  return Number(price).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const hasDiscount = product.old_price != null && product.old_price > product.current_price
  const thumbnailUrl = product.thumbnail_url || null
  const href = `/bookshop/product/${product.slug}`

  return (
    <Link
      href={href}
      className={`group block rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div className="relative aspect-[4/5] bg-gray-50 p-3">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
        {hasDiscount && (
          <span className="absolute top-2 left-2 rounded bg-[#065D80] px-2 py-0.5 text-xs font-medium text-white z-10">
            Sale
          </span>
        )}
      </div>
      <div className="px-3 pt-2 pb-3">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
          {product.title}
        </h3>
        <p className="mt-1 font-bold text-[#1a8a5c] text-sm">
          Rs {formatPrice(product.current_price)}
          {hasDiscount && product.old_price != null && (
            <span className="ml-2 text-gray-400 text-xs line-through font-normal">
              Rs {formatPrice(product.old_price)}
            </span>
          )}
        </p>
        {product.category && (
          <>
            <hr className="my-1.5 border-gray-200" />
            <p className="text-xs text-gray-500">{product.category.name}</p>
          </>
        )}
      </div>
    </Link>
  )
}
