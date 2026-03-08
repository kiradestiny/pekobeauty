import { Suspense } from "react";
import ThankYouContent from "@/app/thank-you/ThankYouContent";

export const metadata = {
  title: "預約申請已收到 | Peko Beauty 醫學美容",
  description: "感謝您的預約，我們將於 24 小時內透過 WhatsApp 確認您的預約時間。",
};

export default function ThankYouPage() {
  return (
    // useSearchParams() 需要 Suspense boundary
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
