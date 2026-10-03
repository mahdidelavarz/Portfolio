const steps = [
  {
    title: "بازتولید",
    text: "اول مشکل را خودت در اپ ببین: صفحه‌ای که دیر بالا می‌آید یا تایپی که گیر می‌کند.",
  },
  {
    title: "تحلیل",
    text: "نمودار شبکه، main thread یا رندرها نشان می‌دهند وقت دقیقاً کجا می‌رود.",
  },
  {
    title: "تغییر و پیش‌بینی",
    text: "روی خط مشکوک بزن، راه‌حلت را انتخاب کن و قبل از اجرا حدس بزن چه می‌شود.",
  },
  {
    title: "نتیجه",
    text: "قبل و بعد، درصد بهینگی و بررسی درستی رفتار؛ سریع‌تر شدن به قیمت خراب شدن قبول نیست.",
  },
];

export default function LabSteps() {
  return (
    <section aria-labelledby="lab-steps-title" className="mt-16 sm:mt-20">
      <h2 id="lab-steps-title" className="mb-2 text-xl font-black text-white sm:text-2xl">هر تیکت چطور حل می‌شود</h2>
      <p className="mb-8 max-w-2xl text-sm leading-7 text-slate-400">
        جواب را حفظ نمی‌کنی؛ مثل یک دیباگ واقعی، از علامت به علت می‌رسی. اگر گیر کردی، راهنمایی‌ها دقیقاً جایی را که باید نگاه کنی نشان می‌دهند.
      </p>
      <ol className="grid gap-px overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-700/40 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="bg-slate-950/90 p-6">
            <span className="mb-4 grid size-8 place-items-center rounded-full bg-cyan-500/15 text-xs font-bold text-cyan-300">
              {(index + 1).toLocaleString("fa-IR")}
            </span>
            <h3 className="mb-2 font-black text-slate-100">{step.title}</h3>
            <p className="text-sm leading-7 text-slate-400">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
