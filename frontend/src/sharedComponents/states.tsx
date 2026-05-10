export function LoadingState() {
    return (
        <div className="space-y-3 py-2">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-6">
                    <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100" />
                    <div className="h-4 w-1/4 animate-pulse rounded bg-slate-100" />
                    <div className="h-4 w-1/4 animate-pulse rounded bg-slate-100 sm:block hidden" />
                </div>
            ))}
        </div>
    );
}

export function EmptyState() {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-12 text-center">
        <svg
          className="h-10 w-10 text-slate-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
        <p className="mt-3 text-sm font-medium text-slate-600">No customers yet</p>
        <p className="mt-1 text-xs text-slate-400">
          Create a customer above and they'll appear here.
        </p>
      </div>
    );
  }

export function ErrorState() {
    return (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.75-4.75a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-1.5 0v4.5Zm.75 2a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clipRule="evenodd"
                />
            </svg>
            <div>
                <p className="text-sm font-medium text-red-700">Failed to load customers</p>
                <p className="mt-0.5 text-xs text-red-500">Please refresh the page or try again later.</p>
            </div>
        </div>
    );
}