"use client";

import { useState } from "react";

export default function DisplayNamePrompt({ onSaved }: { onSaved?: (name: string) => void }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      const response = await fetch("/api/me/display-name", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: name }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message ?? "ثبت نام انجام نشد.");
      onSaved?.(data.visitor.displayName);
      setDismissed(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "ثبت نام انجام نشد.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-cyan-400/25 bg-cyan-400/10 p-5 sm:p-6" aria-labelledby="display-name-title">
      <h2 id="display-name-title" className="mb-2 text-lg font-black text-white">پاسخت ثبت شد.</h2>
      <p className="mb-5 text-sm leading-7 text-slate-300">
        برای ذخیره امتیاز و نمایش در رتبه‌بندی ماهانه، نامی را که در LinkedIn نمایش می‌دهی وارد کن.
      </p>
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="linkedin-display-name">نام نمایشی LinkedIn</label>
        <input
          id="linkedin-display-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="مثلاً مهدی دلاور"
          maxLength={40}
          className="min-w-0 flex-1 rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
        />
        <button disabled={saving} className="rounded-xl bg-cyan-500 px-5 py-3 font-bold text-slate-950 disabled:opacity-60">
          {saving ? "در حال ثبت…" : "ثبت نام و امتیاز"}
        </button>
      </form>
      {error && <p role="alert" className="mt-3 text-sm text-rose-300">{error}</p>}
      <button type="button" onClick={() => setDismissed(true)} className="mt-4 text-sm text-slate-400 underline-offset-4 hover:text-white hover:underline">
        فعلاً ناشناس ادامه می‌دهم
      </button>
    </section>
  );
}
