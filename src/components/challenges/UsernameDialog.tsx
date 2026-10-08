"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { primaryButtonClass, quietButtonClass, secondaryButtonClass } from "@/components/lab/styles";
import { useDialogBehavior } from "@/components/lab/useDialogBehavior";
import { normalizeUsername, USERNAME_MAX_LENGTH } from "@/lib/username";

type Mode = "claim" | "recover";

const inputClass =
  "w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400";
const tabClass = (selected: boolean) =>
  `flex-1 rounded-lg px-3 py-2 text-sm font-bold transition ${
    selected ? "bg-cyan-400/15 text-cyan-200" : "text-slate-400 hover:text-white"
  }`;

async function postJson(url: string, body?: unknown) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message ?? "این درخواست انجام نشد.");
  return data;
}

/** Asks the server for a fresh recovery code; the old one stops working. */
export async function requestNewRecoveryCode(): Promise<string> {
  return (await postJson("/api/me/recovery-code")).recoveryCode as string;
}

/** The recovery code, shown once, with a copy button. */
export function RecoveryCodeCard({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4">
      <p className="mb-3 text-sm font-bold leading-7 text-amber-200">
        این کد رو همین الان یه جا ذخیره کن. فقط همین یک بار نشون داده می‌شه.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <code dir="ltr" className="select-all rounded-xl bg-slate-950/70 px-4 py-2.5 font-code text-lg font-bold tracking-widest text-white">
          {code}
        </code>
        <button type="button" onClick={copy} className={secondaryButtonClass}>
          {copied ? "کپی شد ✓" : "کپی"}
        </button>
      </div>
      <p className="mt-3 text-xs leading-6 text-slate-400">
        با این کد و اسمت می‌تونی از یه مرورگر یا دستگاه دیگه به امتیازهات برگردی. رمز و ایمیلی در کار نیست، پس اگه گمش کنی راه دیگه‌ای نداریم.
      </p>
    </div>
  );
}

/**
 * Claims a username, or rebinds this browser to one claimed earlier. `onDone`
 * fires as soon as the server accepts it; after a claim the dialog stays open
 * to show the recovery code until the visitor closes it.
 */
export default function UsernameDialog({
  intro,
  onDone,
  onClose,
}: {
  intro: string;
  onDone: (username: string) => void;
  onClose: () => void;
}) {
  const sheetRef = useDialogBehavior(onClose);
  const [mode, setMode] = useState<Mode>("claim");
  const [username, setUsername] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [issuedCode, setIssuedCode] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (mode === "claim") {
      const checked = normalizeUsername(username);
      if (!checked.ok) {
        setError(checked.message);
        return;
      }
    }
    setSaving(true);
    try {
      if (mode === "claim") {
        const data = await postJson("/api/me/username", { username });
        setIssuedCode(data.recoveryCode);
        onDone(data.username);
      } else {
        const data = await postJson("/api/me/recover", { username, recoveryCode });
        onDone(data.username);
        onClose();
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "این درخواست انجام نشد.");
    } finally {
      setSaving(false);
    }
  }

  const changeMode = (next: Mode) => {
    setMode(next);
    setError("");
  };

  // Portaled to <body> for the same reason as the lab's result sheet: <main> is its own stacking context.
  return createPortal(
    <div
      lang="fa"
      dir="rtl"
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="username-dialog-title"
        tabIndex={-1}
        className="challenge-font flex max-h-[88vh] w-full max-w-md flex-col gap-5 overflow-y-auto rounded-t-3xl border border-b-0 border-slate-700/50 bg-slate-900 px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] pt-6 text-right text-slate-100 shadow-2xl shadow-black/50 outline-none motion-safe:animate-[lab-sheet-up_0.3s_cubic-bezier(0.2,0.8,0.2,1)] sm:rounded-3xl sm:border-b sm:px-7 sm:pb-7 sm:motion-safe:animate-[lab-dialog-in_0.22s_cubic-bezier(0.2,0.8,0.2,1)]"
      >
        {issuedCode ? (
          <>
            <h3 id="username-dialog-title" className="text-lg font-black text-white">
              اسمت ثبت شد
            </h3>
            <RecoveryCodeCard code={issuedCode} />
            <button type="button" onClick={onClose} className={primaryButtonClass}>
              ذخیره کردم، ادامه بده
            </button>
          </>
        ) : (
          <>
            <div>
              <h3 id="username-dialog-title" className="mb-2 text-lg font-black text-white">
                {mode === "claim" ? "یه اسم برای خودت انتخاب کن" : "برگشتن به اسم قبلی"}
              </h3>
              <p className="text-sm leading-7 text-slate-400">
                {mode === "claim" ? intro : "اسم و کد بازیابی‌ای که موقع ثبت گرفتی رو وارد کن."}
              </p>
            </div>

            <div role="tablist" className="flex gap-1 rounded-xl bg-slate-950/60 p-1">
              <button type="button" role="tab" aria-selected={mode === "claim"} onClick={() => changeMode("claim")} className={tabClass(mode === "claim")}>
                اسم جدید
              </button>
              <button type="button" role="tab" aria-selected={mode === "recover"} onClick={() => changeMode("recover")} className={tabClass(mode === "recover")}>
                قبلاً اسم ثبت کرده‌ام
              </button>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-3">
              <label className="flex flex-col gap-1.5 text-xs text-slate-400">
                اسم
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  maxLength={USERNAME_MAX_LENGTH + 4}
                  autoComplete="username"
                  placeholder="مثلاً mahsa_dev"
                  className={inputClass}
                />
              </label>
              {mode === "claim" ? (
                <p className="text-xs leading-6 text-slate-500">
                  ۳ تا ۲۰ کاراکتر؛ حروف فارسی یا انگلیسی، عدد و _. این اسم تو رتبه‌بندی دیده می‌شه و بعداً عوض نمی‌شه.
                </p>
              ) : (
                <label className="flex flex-col gap-1.5 text-xs text-slate-400">
                  کد بازیابی
                  <input
                    dir="ltr"
                    value={recoveryCode}
                    onChange={(event) => setRecoveryCode(event.target.value)}
                    maxLength={16}
                    autoComplete="off"
                    placeholder="XXXXX-XXXXX"
                    className={`${inputClass} font-code tracking-widest`}
                  />
                </label>
              )}
              {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <button disabled={saving || !username.trim()} className={`${primaryButtonClass} flex-1`}>
                  {saving ? "یه لحظه…" : mode === "claim" ? "ثبت اسم" : "ورود با کد"}
                </button>
                <button type="button" onClick={onClose} className={quietButtonClass}>
                  فعلاً نه
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
