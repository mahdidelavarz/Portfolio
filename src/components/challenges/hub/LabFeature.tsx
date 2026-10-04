import Link from "next/link";
import Num from "@/components/lab/Num";
import { formatMs, formatNumber, padTicketNumber } from "@/lib/lab/format";
import type { LabShowcaseTicket } from "@/lib/lab/repository";

function TicketPreview({ ticket }: { ticket: LabShowcaseTicket }) {
  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-800/80 py-4 last:border-b-0">
      <span dir="ltr" className="w-5 shrink-0 font-code text-xs text-slate-500">#{padTicketNumber(ticket.number)}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-slate-100">{ticket.title}</p>
        <p dir="auto" className="mt-0.5 truncate text-xs text-slate-500">{ticket.concept}</p>
      </div>
      <div className="basis-full pr-9 sm:basis-auto sm:pr-0 sm:text-left">
        <div className="text-[11px] text-slate-500">{ticket.metricLabel}</div>
        <div className="text-sm">
          <Num className="text-slate-500 line-through decoration-slate-600">{formatMs(ticket.baseValue)}</Num>
          <span aria-hidden="true" className="mx-1.5 text-slate-600">←</span>
          <Num className="font-black text-emerald-300">{formatMs(ticket.bestValue)}</Num>
        </div>
      </div>
    </li>
  );
}

export default function LabFeature({ tickets, totalTickets }: { tickets: LabShowcaseTicket[]; totalTickets: number }) {
  const upcoming = totalTickets - tickets.length;

  return (
    <section
      aria-labelledby="lab-feature-title"
      className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-800/50 shadow-xl shadow-black/10 backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 p-5 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
        <div className="flex flex-col">
          <span className="mb-5 self-start rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300">
            جدید · آزمایشگاه پرفورمنس
          </span>
          <h2 id="lab-feature-title" className="mb-4 text-2xl font-black leading-[1.5] text-white sm:text-3xl">
            تیکت‌های واقعی یک فروشگاه، روی میز تو
          </h2>
          <p className="mb-8 max-w-xl text-sm leading-8 text-slate-400 sm:text-base">
            «کالاستان» یک فروشگاه آنلاین است که کند شده. هر تیکت گزارش یک کاربر است: مشکل را در اپ زنده می‌بینی، علتش را در نمودارها پیدا می‌کنی و با تغییر کد، عددها را واقعاً پایین می‌آوری.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-4">
            <Link
              href="/challenges/lab"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 font-black text-white shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:shadow-cyan-500/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              ورود به آزمایشگاه
            </Link>
            <span className="text-sm text-slate-500">رایگان، بدون ثبت‌نام</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/50 bg-slate-950/50 px-4 py-2 sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-slate-800/80 py-3 text-xs text-slate-500">
            <span>تیکت‌های باز</span>
            <span>از وضعیت فعلی تا بهترین راه‌حل</span>
          </div>
          <ul>
            {tickets.map((ticket) => (
              <TicketPreview key={ticket.id} ticket={ticket} />
            ))}
          </ul>
          {upcoming > 0 && (
            <p className="border-t border-dashed border-slate-800 py-3 text-xs text-slate-500">
              <Num>{formatNumber(upcoming)}</Num> تیکت دیگر به‌زودی باز می‌شود.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
