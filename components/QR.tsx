'use client';
import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export default function QR({
  value,
  size = 200,
  className = 'mx-auto',
}: {
  value: string;
  size?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) QRCode.toCanvas(ref.current, value, { width: size });
  }, [value, size]);
  return <canvas ref={ref} className={className} />;
}
