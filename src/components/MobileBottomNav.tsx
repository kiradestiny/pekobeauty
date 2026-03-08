import Link from 'next/link';

export default function MobileBottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-platinum-silver z-50 pb-safe">
      <div className="flex items-center justify-around h-16">
        <Link href="/" className="flex flex-col items-center justify-center w-full h-full text-muted hover:text-accent">
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link href="https://wa.me/85253353313" className="flex flex-col items-center justify-center w-full h-full text-muted hover:text-accent">
          <span className="text-xs mt-1">WhatsApp</span>
        </Link>
        
        <Link href="/booking" className="flex flex-col items-center justify-center w-full h-full text-accent font-medium">
          <span className="text-xs mt-1">Book Now</span>
        </Link>
      </div>
    </div>
  );
}
