import React from 'react';

// ─── Shimmer wrapper ──────────────────────────────────────────────────────────
const Shimmer = ({ className }: { className?: string }) => (
  <div
    className={`relative overflow-hidden bg-gray-100 rounded-xl ${className}`}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
  </div>
);

// ─── Blog Card Skeleton ───────────────────────────────────────────────────────
export const BlogCardSkeleton = () => (
  <div className="flex flex-col h-full bg-white rounded-[32px] overflow-hidden border border-gray-100">
    {/* Image */}
    <Shimmer className="aspect-[4/3] rounded-none" />

    {/* Content */}
    <div className="p-7 flex flex-col flex-grow space-y-4">
      {/* Meta */}
      <div className="flex gap-3">
        <Shimmer className="h-3 w-24 rounded-full" />
        <Shimmer className="h-3 w-16 rounded-full" />
      </div>
      {/* Title */}
      <Shimmer className="h-5 w-full" />
      <Shimmer className="h-5 w-4/5" />
      {/* Excerpt */}
      <Shimmer className="h-3.5 w-full" />
      <Shimmer className="h-3.5 w-3/4" />
      {/* Tags */}
      <div className="flex gap-2 pt-1">
        <Shimmer className="h-6 w-16 rounded-lg" />
        <Shimmer className="h-6 w-20 rounded-lg" />
        <Shimmer className="h-6 w-14 rounded-lg" />
      </div>
      {/* Footer */}
      <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
        <Shimmer className="h-4 w-16 rounded-full" />
        <Shimmer className="h-8 w-8 rounded-full" />
      </div>
    </div>
  </div>
);

// ─── Featured Post Skeleton ───────────────────────────────────────────────────
export const FeaturedSkeleton = () => (
  <div className="mb-16">
    <Shimmer className="rounded-[40px] aspect-[16/9] lg:aspect-[21/9]" />
    {/* Tags below */}
    <div className="flex gap-2 mt-4 px-2">
      <Shimmer className="h-6 w-20 rounded-lg" />
      <Shimmer className="h-6 w-24 rounded-lg" />
      <Shimmer className="h-6 w-16 rounded-lg" />
    </div>
  </div>
);

// ─── Sidebar Skeleton ─────────────────────────────────────────────────────────
export const SidebarSkeleton = () => (
  <div className="space-y-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex gap-4 items-start">
        {/* Rank */}
        <Shimmer className="w-7 h-7 rounded-lg flex-shrink-0" />
        {/* Thumbnail */}
        <Shimmer className="w-16 h-16 rounded-xl flex-shrink-0" />
        {/* Text */}
        <div className="flex-1 space-y-2 pt-1">
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-3 w-3/4" />
          <div className="flex gap-2">
            <Shimmer className="h-2.5 w-16 rounded-full" />
            <Shimmer className="h-2.5 w-12 rounded-full" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ─── Hero Skeleton ────────────────────────────────────────────────────────────
export const HeroSkeleton = () => (
  <div className="py-20 text-center space-y-6">
    <Shimmer className="h-8 w-48 rounded-full mx-auto" />
    <Shimmer className="h-14 w-3/4 mx-auto" />
    <Shimmer className="h-14 w-1/2 mx-auto" />
    <Shimmer className="h-5 w-2/3 mx-auto" />
    <div className="flex justify-center gap-4 pt-4">
      <Shimmer className="h-24 w-36 rounded-2xl" />
      <Shimmer className="h-24 w-36 rounded-2xl" />
      <Shimmer className="h-24 w-36 rounded-2xl" />
    </div>
  </div>
);
