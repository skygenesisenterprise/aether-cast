import { BrowseHeader } from '@/components/browse/browse-header'
import { Suspense } from 'react'

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="h-16 bg-background" />}>
        <BrowseHeader />
      </Suspense>
      <main>{children}</main>
    </div>
  )
}
