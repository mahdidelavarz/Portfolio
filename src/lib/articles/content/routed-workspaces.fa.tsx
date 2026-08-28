export const routedWorkspacesArticleFa = (
  <>
    <p>
      اولش باز کردن resource فرزند داخل modal کاملاً منطقی بود. یک table کوچک بود و
      چند action. کاربر از صفحه parent خارج نمی‌شد و برای چیزی که آن زمان ساده بود،
      ساختن route جدا واقعاً اضافه‌کاری به نظر می‌رسید.
    </p>
    <p>مشکل وقتی شروع شد که همان resource خودش form و CRUD پیدا کرد.</p>
    <p>
      edit کردن یکی از rowها modal دیگری باز می‌کرد. بعد child بعدی هم اضافه شد. بعد
      filter و permission و workflow آمدند وسط.
    </p>
    <p>
      UI هنوز کار می‌کرد، ولی چیزی که داخل overlay بود دیگر یک interaction کوتاه
      نبود. عملاً یک page کامل بود که فقط اتفاقی داخل modal گیر کرده بود.
    </p>
    <pre><code>{`Parent Page
    ↓
Child Modal
    ↓
Edit Modal
    ↓
Nested Child`}</code></pre>
    <p>
      از یک جایی به بعد، مشکل دیگر فقط شلوغی UI نبود. context به state محلی parent
      وابسته بود، refresh می‌توانست flow را از بین ببرد، deep link معنی نداشت و
      resource فرزند فضای کافی برای خودش نداشت.
    </p>

    <h2>چه زمانی modal دیگر کافی نیست؟</h2>
    <p>نتیجه‌ای که گرفتم این نبود که modal بد است.</p>
    <p>confirmation، form کوچک، upload یا selection محدود هنوز داخل modal کاملاً منطقی‌اند.</p>
    <p>فرق در خود resource است.</p>
    <p>اگر یک child این چیزها را پیدا کند:</p>
    <ul>
      <li>CRUD مستقل</li><li>table state</li><li>چند action جدی</li>
      <li>permission یا workflow خودش</li><li>child بعدی</li>
      <li>identityای که URL برایش معنی داشته باشد</li>
    </ul>
    <p>احتمالاً دیگر فقط محتوای موقت parent نیست.</p>
    <p>workspace خودش را می‌خواهد.</p>

    <h2>context والد را وارد route کردم</h2>
    <p>
      برای resourceهای پیچیده‌تر، مدیریت child را از modal بیرون آوردم و به routeهای
      مستقل React Router منتقل کردم.
    </p>
    <p>parent id داخل route قرار گرفت و page فرزند query خودش را از همان context می‌ساخت.</p>
    <p>مثلاً به‌شکل عمومی:</p>
    <pre><code>{`/parents/:parentId/children
/parents/:parentId/children/:childId/details`}</code></pre>
    <p>این‌ها route واقعی سیستم نیستند، فقط شکل مسئله را نشان می‌دهند.</p>
    <p>نکته مهم این بود که parent دیگر فقط تا وقتی component قبلی mount است وجود نداشت.</p>
    <p>بعد از این تغییر:</p>
    <ul>
      <li>refresh همان context را برمی‌گرداند</li><li>لینک مستقیم معنی داشت</li>
      <li>back/forward مرورگر قابل استفاده شد</li><li>breadcrumb می‌توانست hierarchy را دوباره بسازد</li>
      <li>child page دیگر به زنده ماندن parent page وابسته نبود</li>
    </ul>
    <p>
      اولین استفاده جدی این pattern برای childهای بخش Workflow بود. خود business
      logic آن بخش کاملاً کار من نبود؛ چیزی که من تغییر دادم integration فرانت‌اند
      و مدل navigation آن بود.
    </p>
    <p>
      در همان migration، دو خانواده resource فرزند ــ Step و Transition ــ از
      مدیریت modalمحور به صفحه‌های routeشده و parent-aware منتقل شدند. این count
      کوچک بود، اما برای آزمودن route context، breadcrumb و navigation مستقل روی دو
      flow واقعی کافی بود.
    </p>

    <h2>breadcrumb فقط برای قشنگی نبود</h2>
    <p>داخل ERP عنوان‌هایی مثل <code>Steps</code> یا <code>Parts</code> به‌تنهایی خیلی بی‌معنی‌اند.</p>
    <p>چند parent مختلف می‌توانند دقیقاً همین نوع child را داشته باشند.</p>
    <p>پس کاربر باید بفهمد table فعلی متعلق به کجاست.</p>
    <p>
      برای همین page فرزند اطلاعات parent را دوباره load می‌کرد و hierarchy را داخل
      UI نشان می‌داد.
    </p>
    <p>من برای خودم یک تست ساده داشتم:</p>
    <p>
      اگر یک page بعد از refresh نتواند فقط از روی route و data context خودش را
      دوباره بسازد، هنوز بیش از حد به flow قبلی وابسته است.
    </p>

    <h2>route مشکل identity را حل کرد، ولی یک مشکل دیگر باقی ماند</h2>
    <p>بعد از route شدن resourceها، یک رفتار دیگر بیشتر خودش را نشان داد.</p>
    <p>کاربر ERP معمولاً یک کار را کامل نمی‌کند و بعد سراغ بعدی نمی‌رود.</p>
    <p>
      ممکن است یک resource را باز کند، برود چیزی را در صفحه دیگری چک کند، برگردد به
      table قبلی که filter شده، بعد دوباره برود سراغ resource اول.
    </p>
    <p>navigation معمول مرورگر این حرکت را خطی می‌کرد، ولی خود کار خطی نبود.</p>
    <p>اینجا workspace چندتب وارد شد.</p>
    <p>هر tab نماینده یک route بود، نه یک instance تصادفی از component.</p>
    <pre><code>{`Route A  → Tab A
Route B  → Tab B
Route C  → Tab C`}</code></pre>
    <p>اگر همان path دوباره باز می‌شد، tab قبلی active می‌شد و duplicate جدید ساخته نمی‌شد.</p>
    <p>Sidebar هم باید از همین مدل استفاده می‌کرد.</p>
    <p>
      resourceهای nested هم title وابسته به parent می‌گرفتند، وگرنه خیلی سریع چند
      tab با اسم‌های عمومی مثل <code>Steps</code> کنار هم داشتیم که هیچ‌کس نمی‌فهمید
      کدام مربوط به چیست.
    </p>

    <h2>هر tab قرار نبود برای همیشه بماند</h2>
    <p>اولین نسخه اگر هر مقصد را نگه می‌داشت، خیلی زود tab bar تبدیل به history شلوغ می‌شد.</p>
    <p>برای همین temporary و retained از هم جدا شدند.</p>
    <p>
      workspace در عمل دو mode اصلی داشت: tab موقت برای navigation گذرا و tab
      permanent برای contextی که باید حفظ می‌شد. pin کردن، همان tab موقت را به حالت
      دوم ارتقا می‌داد؛ mode سومی با lifecycle جدا وجود نداشت.
    </p>
    <p>
      navigation معمول می‌توانست یک tab موقت بسازد. اگر کاربر می‌خواست آن context
      را نگه دارد، می‌توانست pin شود.
    </p>
    <p>این تفاوت وقتی table state وارد بازی شد مهم‌تر شد.</p>
    <p>فرض کن کاربر روی یک table:</p>
    <ul>
      <li>search کرده</li><li>filter گذاشته</li><li>sort را تغییر داده</li>
      <li>چند row انتخاب کرده</li><li>یا pagination را جلو برده</li>
    </ul>
    <p>در آن نقطه دیگر صفحه فقط یک مقصد گذری نیست. بخشی از کاربر روی آن باقی مانده.</p>
    <p>جایگزین شدن بی‌هشدار چنین tabی با navigation بعدی تجربه خوبی نبود.</p>
    <p>
      drag ordering و clear-all بعداً آمدند، ولی اصل ماجرا همان بود: بعضی routeها فقط
      برای نگاه کردن باز می‌شوند، بعضی‌ها تبدیل به workspace واقعی می‌شوند.
    </p>

    <h2>URL و tab state باید درباره یک چیز حرف بزنند</h2>
    <p>بخش سخت‌تر implementation این بود که چند منبع state داشتیم:</p>
    <ul>
      <li>React Router</li><li>active tab</li><li>لیست tabهای باز</li>
      <li>Sidebar</li><li>titleهای dynamic</li><li>table state</li>
    </ul>
    <p>اگر هرکدام مستقل تصمیم می‌گرفتند، edge caseها خیلی سریع ظاهر می‌شدند.</p>
    <p>
      مثلاً بستن یک tab می‌توانست table state اشتباه را پاک کند، یا route change چیزی
      را که همین الان بسته شده بود دوباره باز کند.
    </p>
    <p>برای همین tab state متمرکز شد و با route sync شد.</p>
    <p>البته از روز اول بی‌نقص نبود.</p>
    <p>
      cleanup اولیه در بعضی حالت‌ها current path را می‌دید، نه tabی را که واقعاً بسته
      شده بود. بعضی navigationها history را یکسان تغییر نمی‌دادند. keyboard behavior
      یکی از close controlها هم کامل نبود.
    </p>
    <p>
      این‌ها بیشتر از اینکه مشکل tab component باشند، نشان می‌دادند workspace فقط UI
      نیست. route lifecycle و state lifecycle باید با هم هماهنگ باشند.
    </p>

    <h2>mobile را مجبور نکردم شبیه desktop باشد</h2>
    <p>workspace چندتب برای desktop ساخته شده بود.</p>
    <p>
      روی mobile از قبل navigation مقصد‌محور داشتیم. اینکه همان tab bar را کوچک کنیم
      و در عرض کم بچپانیم فقط ظاهر feature را حفظ می‌کرد، نه دلیل وجودش را.
    </p>
    <p>پس interaction متفاوت ماند.</p>
    <p>desktop می‌توانست چند context را هم‌زمان نگه دارد.</p>
    <p>mobile ساده‌تر بین routeها جابه‌جا می‌شد و هر route کل فضای صفحه را می‌گرفت.</p>
    <p>hierarchy یکی بود، chrome فرق می‌کرد.</p>

    <h2>modal هنوز سر جای خودش ماند</h2>
    <p>بعد از این تغییر modal حذف نشد.</p>
    <p>create/edit متمرکز هنوز می‌تواند داخل modal باشد.</p>
    <p>confirmation هم route نمی‌خواهد.</p>
    <p>
      upload یا selection چند row هم تا وقتی navigation مستقل ندارند، همچنان
      interaction موقت خوبی هستند.
    </p>
    <p>مرزی که هنوز برای خودم استفاده می‌کنم این است:</p>
    <pre><code>{`Temporary interaction → Modal

Resource with identity/state/history → Route

Several active routed contexts → Workspace`}</code></pre>
    <p>
      اگر برای یک resource لازم باشد URL، breadcrumb، table state و lifecycle مستقل
      داشته باشم، دیگر زور کردنش داخل modal معمولاً فقط مشکل را عقب می‌اندازد.
    </p>
  </>
);
