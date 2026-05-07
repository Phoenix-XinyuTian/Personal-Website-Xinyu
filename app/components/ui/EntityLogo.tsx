"use client";

import { useState } from "react";
import Image from "next/image";

export default function EntityLogo({
  src,
  alt,
  fallback,
  bgClass,
  textClass,
  borderClass,
  className,
}: {
  src: string | null;
  alt: string;
  fallback: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  className?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const showImg = src && !imgError;
  return (
    <div className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl ${className ?? ""}`}>
      {showImg ? (
        <Image
          src={src}
          alt={alt}
          width={64}
          height={64}
          className="h-full w-full object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={`flex h-full w-full items-center justify-center rounded-2xl border ${borderClass} ${bgClass}`}>
          <span className={`text-sm font-bold uppercase tracking-[0.12em] ${textClass}`}>{fallback}</span>
        </div>
      )}
    </div>
  );
}
