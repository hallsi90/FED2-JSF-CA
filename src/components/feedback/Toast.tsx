import { useEffect } from "react";
import { useToastStore } from "../../stores/useToastStore";

function Toast() {
  const message = useToastStore((state) => state.message);
  const toastId = useToastStore((state) => state.toastId);
  const clearToast = useToastStore((state) => state.clearToast);

  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = window.setTimeout(clearToast, 8000);

    return () => window.clearTimeout(timeoutId);
  }, [message, toastId, clearToast]);

  return (
    <div
      role="status"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-4 bottom-6 z-50 flex justify-center"
    >
      {message && (
        <div
          key={toastId}
          className="flex w-full max-w-md items-start gap-3 rounded-xl border border-emerald-300 bg-white p-4 text-slate-900 shadow-lg"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-emerald-700"
          >
            <circle cx="12" cy="12" r="9" />
            <path
              d="m8 12 3 3 5-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="min-w-0 wrap-break-word text-sm font-medium leading-relaxed">
            {message}
          </p>
        </div>
      )}
    </div>
  );
}

export default Toast;
