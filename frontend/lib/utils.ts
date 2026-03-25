export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Get initials from full name (e.g. "John Doe" -> "JD"). */
export function getInitials(name: string | null | undefined): string {
  if (!name || !name.trim()) return "?";
  return name
    .trim()
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Extract a user-friendly message from Axios/FastAPI error. Use for all API catch blocks. */
export function getApiErrorMessage(err: unknown, fallback: string): string {
  const ax = err as {
    message?: string;
    response?: {
      data?: { detail?: string | { msg?: string }[] };
      status?: number;
    };
    code?: string;
  };
  if (ax.response?.data?.detail != null) {
    const d = ax.response.data.detail;
    if (typeof d === "string") return d;
    if (Array.isArray(d))
      return d
        .map((x) => (typeof x === "object" && x?.msg ? x.msg : String(x)))
        .join(", ");
  }
  if (ax.response?.status === 404) return "Not found.";
  if (ax.response?.status === 401) return "Please log in again.";
  if (ax.response?.status === 409) return "Conflict (e.g. duplicate).";
  if (ax.message && ax.message !== "Network Error") return ax.message;
  if (ax.response?.status === 0 || ax.code === "ERR_NETWORK")
    return "Cannot reach server. Is the API running?";
  return fallback;
}
