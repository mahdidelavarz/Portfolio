export const pageArchitectureArticleFa = (
  <>
    <p>
      اوایل پروژه تقریباً هر صفحه CRUD داستان خودش را داشت. table و modal و hookها
      خیلی با هم فرق نمی‌کردند، ولی wiring همه‌شان دوباره داخل همان page نوشته
      می‌شد: گرفتن داده، باز و بسته کردن فرم، تشخیص create و edit، ساختن actionهای
      هر ردیف، loading، delete و بقیه چیزهایی که تقریباً در همه صفحه‌ها تکرار می‌شدند.
    </p>
    <p>
      اگر صفحه فایل، گزارش یا resource فرزند هم داشت، چند تکه دیگر به همین مجموعه
      اضافه می‌شد.
    </p>
    <p>
      تا یک جایی این وضعیت آزاردهنده بود، ولی قابل تحمل. مشکل وقتی جدی شد که تغییر
      دادن یک رفتار مشترک دیگر به معنی تغییر دادن یک component نبود. باید چند page
      مختلف را می‌گشتیم تا ببینیم هرکدام آن رفتار را چطور به table، form و hookهایشان
      وصل کرده‌اند.
    </p>
    <p>component مشترک داشتیم. چیزی که مشترک نبود، خودِ ترکیب صفحه بود.</p>

    <h2>مشکل داخل componentها نبود</h2>
    <p>
      DataTable آن زمان خودش امکانات کمی نداشت. search، filter، sort، pagination،
      حالت mobile، action گروهی و بعدتر server-side table را داشتیم.
    </p>
    <p>سمت form هم input، select، modal و validation تا حد خوبی reusable شده بودند.</p>
    <p>
      پس مسئله این نبود که یک Table جدید یا Form جدید بسازم. اگر PageShell دوباره
      این رفتارها را داخل خودش پیاده می‌کرد، فقط یک component بزرگ‌تر ساخته بودم
      که نسخه دوم همان زیرساخت قبلی بود.
    </p>
    <p>تکرار اصلی اینجا بود:</p>
    <pre><code>{`Page
├── data hooks
├── mutation hooks
├── table
├── form modal
├── CRUD actions
├── permissions
├── loading states
└── feature-specific actions`}</code></pre>
    <p>و تقریباً هر page دوباره همین قطعات را با دست به هم وصل می‌کرد.</p>
    <p>
      اولین راه‌حلی که رفتم سمتش یک CRUD shell عمومی بود. flow معمول صفحه‌های
      server-table را جمع می‌کرد و از نظر تئوری نشان می‌داد که بخش زیادی از این
      wiring قابل حذف است.
    </p>
    <p>
      ولی خیلی زود یک مشکل مشخص شد: آن abstraction بیشتر شبیه یک component با تعداد
      زیادی prop بود تا یک قرارداد واقعی برای ساخت صفحه.
    </p>
    <p>
      حتی بعضی صفحه‌هایی که همان موقع در کنار آن ساخته شده بودند عملاً از shell
      استفاده نکردند.
    </p>
    <p>
      همان‌جا یک نکته برایم روشن شد: اینکه چیزی را داخل <code>shared/</code> بگذاریم،
      لزوماً به این معنی نیست که abstraction خوبی ساخته‌ایم.
    </p>

    <h2>صفحه‌های واقعی همیشه یک چیزی اضافه داشتند</h2>
    <p>CRUD ساده مشکلی نداشت.</p>
    <p>مشکل وقتی شروع می‌شد که صفحه واقعی وارد بازی می‌شد.</p>
    <p>یک صفحه table سمت server داشت، یکی داده را سمت client نگه می‌داشت.</p>
    <p>یک صفحه create داشت ولی delete نباید روی آن فعال می‌شد.</p>
    <p>یک صفحه فقط برای نمایش اطلاعات بود و اصلاً form معنی نداشت.</p>
    <p>
      resourceهای nested هم داستان خودشان را داشتند. باید id والد از route خوانده
      می‌شد، query براساس آن scope می‌شد، breadcrumb ساخته می‌شد و موقع create همان
      parent به‌عنوان مقدار ثابت داخل form قرار می‌گرفت.
    </p>
    <p>بعد هم قابلیت‌هایی مثل این‌ها اضافه می‌شدند:</p>
    <ul>
      <li>upload فایل</li><li>report</li><li>signature</li>
      <li>navigation به resource فرزند</li><li>custom action</li>
      <li>انتخاب چند ردیف از داخل یک modal</li>
    </ul>
    <p>هیچ‌کدام هم روی تمام صفحه‌ها وجود نداشتند.</p>
    <p>
      می‌شد برای همه‌شان داخل shell چیزی مثل <code>hasUpload</code>،
      <code>hasReport</code>، <code>hasSignature</code> و ده‌ها flag دیگر اضافه کرد.
      ولی انتهای آن مسیر تقریباً مشخص بود: یک component عظیم که درباره همه قسمت‌های
      ERP اطلاعات دارد و نصف کدش شرط است.
    </p>
    <p>پس هدف را عوض کردم.</p>
    <p>قرار نبود «یک CRUD page که همه‌جا کار کند» بسازم.</p>
    <p><strong>قرار بود بخش ثابت ساخت صفحه را مشترک کنم و بخش متغیر را تا جای ممکن بیرون نگه دارم.</strong></p>

    <h2>PageDefinition + PageShell</h2>
    <p>مدلی که در نهایت بیشتر جواب داد، دو بخش اصلی داشت:</p>
    <p><code>PageDefinition</code> و <code>PageShell</code>.</p>
    <p>
      هر feature تعریف خودش را داشت: hookها، columnها، عنوان‌ها، form config، نوع
      table و policy مربوط به actionها.
    </p>
    <p>PageShell فقط مسئول این بود که این قطعات را به زیرساخت مشترک وصل کند.</p>
    <p>به‌شکل ساده:</p>
    <pre><code>{`PageDefinition
      ↓
   PageShell
      ├── Data strategy
      ├── Form config
      ├── Table mode
      ├── Policies
      ├── Nested context
      └── Features`}</code></pre>
    <p>
      یک helper تایپ‌شده هم روی تعریف page داشتیم تا config تبدیل به یک object آزاد
      با <code>any</code>های فراوان نشود.
    </p>
    <p>type رکورد دامنه، submit model، fieldها و columnها هنوز متعلق به همان feature بودند.</p>
    <p>
      PageShell قرار نبود بفهمد یک status در بخش فروش چه معنی دارد یا فلان relation
      در Planning چرا وجود دارد. فقط می‌دانست این قطعات باید چطور کنار هم قرار بگیرند.
    </p>
    <p>این مرز بعداً خیلی مهم شد.</p>
    <p>
      وقتی یک صفحه موجود به PageShell migrate می‌شد، business logic آن صفحه ناگهان
      تبدیل به بخشی از PageShell نمی‌شد. فقط orchestration آن صفحه عوض شده بود.
    </p>

    <h2>قابلیت‌های اختیاری را feature کردم</h2>
    <p>
      برای چیزهایی که روی همه صفحات نبودند، به‌جای اضافه کردن flagهای بیشتر به هسته،
      feature adapter شکل گرفت.
    </p>
    <p>هر feature می‌توانست چیزهایی مثل این‌ها را برگرداند:</p>
    <ul><li>row action</li><li>table action</li><li>modal</li><li>رفتار اضافه مربوط به همان قابلیت</li></ul>
    <p>
      در نتیجه upload، report، navigation، selection modal و بقیه قابلیت‌ها
      می‌توانستند کنار PageShell قرار بگیرند، بدون اینکه implementation آنها وارد
      خود shell شود.
    </p>
    <p>تصویر ذهنی تقریباً این بود:</p>
    <pre><code>{`             ┌─ Upload
             ├─ Report
PageShell ───┼─ Signature
             ├─ Navigation
             ├─ Selection
             └─ Custom Action`}</code></pre>
    <p>یکی از محدودیت‌های جالب این مدل به React برمی‌گشت.</p>
    <p>
      feature factory ممکن بود خودش hook اجرا کند. در نتیجه نمی‌شد وسط render براساس
      یک شرط، feature را از آرایه حذف یا به آن اضافه کرد. ساختار featureها باید ثابت
      می‌ماند تا ترتیب hookها هم ثابت بماند.
    </p>
    <p>یعنی enable/disable شدن قابلیت باید داخل config همان feature مدیریت می‌شد.</p>
    <p>API کمی سخت‌گیرتر شد، ولی حداقل رفتار آن قابل پیش‌بینی بود.</p>

    <h2><code>readOnly</code> همان <code>editable: false</code> نبود</h2>
    <p>یکی از چیزهایی که مدل اولیه درست تفکیک نکرده بود همین بود.</p>
    <p>صفحه‌ای ممکن است edit نداشته باشد، ولی هنوز یک action دیگر روی rowهایش داشته باشد.</p>
    <p>این با صفحه‌ای که واقعاً read-only است فرق دارد.</p>
    <p>در حالت دوم نه فقط edit، بلکه form، mutation و actionهای جانبی هم نباید در دسترس باشند.</p>
    <p>بعداً این دو مفهوم از هم جدا شدند:</p>
    <ul><li><code>editable: false</code></li><li>read-only کامل</li></ul>
    <p>همین قسمت یک bug هم ایجاد کرد.</p>
    <p>
      در بعضی حالت‌ها با اینکه صفحه read-only بود، row actionها هنوز به یکی از مسیرهای
      render table می‌رسیدند.
    </p>
    <p>
      در ظاهر شاید می‌شد فقط دکمه‌ها را در component پایین‌تر مخفی کرد، ولی ترجیح
      دادم policy در خود مرز PageShell اعمال شود. یعنی اگر page read-only است، shell
      اصلاً action به table ندهد.
    </p>
    <p>
      این نوع bugها برای من مفید بودند، چون دقیقاً نشان می‌دادند abstraction کجا هنوز
      فقط «ظاهر مشترک» دارد و کجا واقعاً مسئولیت خودش را کنترل می‌کند.
    </p>

    <h2>nested resourceها قرارداد را جدی‌تر کردند</h2>
    <p>برای یک صفحه nested، <code>isNested: true</code> عملاً اطلاعات کافی نبود.</p>
    <p>PageShell باید می‌دانست:</p>
    <ul>
      <li>کدام route param شناسه parent است</li><li>کدام query لیست scoped را برمی‌گرداند</li>
      <li>اطلاعات parent از کجا می‌آید</li><li>breadcrumb چطور ساخته شود</li>
      <li>مقدار parent باید داخل کدام field فرم قرار بگیرد</li>
    </ul>
    <p>نسخه اول این قسمت یک bug داشت.</p>
    <p>
      shell سعی می‌کرد از اسم route param، اسم field فرم را حدس بزند. در یکی از
      consumerها نتیجه تبدیل شد به یک field اشتباه، در حالی که form config از قبل
      مشخص کرده بود مقدار باید داخل کدام property قرار بگیرد.
    </p>
    <p>به‌جای اینکه convention را پیچیده‌تر کنم، قرارداد را explicit کردم:</p>
    <pre><code>{`route param → declared form field`}</code></pre>
    <p>
      یعنی config هم می‌گفت چه paramی خوانده شود و هم مشخص می‌کرد مقدار داخل چه fieldی
      نوشته شود.
    </p>
    <p>
      از آن تصمیم‌هایی بود که بعداً خیلی ساده به نظر می‌رسند، ولی معمولاً اول باید
      یک بار از حدس‌زدن اسم‌ها ضربه بخوری تا به آن برسی.
    </p>

    <h2>اولین selection modal هم بی‌نقص نبود</h2>
    <p>اولین consumer واقعی selection modal در نسخه اولیه با یک id ثابت وصل شده بود.</p>
    <p>بعد اصلاح شد تا context ردیفی که کاربر واقعاً انتخاب کرده وارد feature شود.</p>
    <p>
      بعد از آن، همان adapter توانست default selection، table داخلی و group action را
      مدیریت کند، بدون اینکه PageShell بداند این انتخاب در business چه معنایی دارد.
    </p>
    <p>
      برای من این بخش مهم بود، چون اگر PageShell برای پیاده کردن selection مجبور
      می‌شد domain object را بشناسد، عملاً مرزی که ساخته بودیم از بین می‌رفت.
    </p>

    <h2>form و table هم همزمان جلو می‌رفتند</h2>
    <p>PageShell قرار نبود زیرساخت اطراف خودش را freeze کند.</p>
    <p>
      بعداً cascade field به dynamic form اضافه شد. یک field می‌توانست parent مورد
      نیاز lookup بعدی را تعیین کند و metadata فرم این dependency را منتقل می‌کرد.
    </p>
    <p>PageShell لازم نبود برای یک صفحه مشخص branch جدید داشته باشد.</p>
    <p>همین اتفاق برای table افتاد.</p>
    <p>
      server table امکان quick filter گرفت، در حالی که client table تنظیمات خودش
      برای pagination، sorting و filtering را داشت.
    </p>
    <p>shell فقط config مناسب را عبور می‌داد.</p>
    <p>این separation باعث شد توسعه form و table الزاماً به تغییر contract صفحه منجر نشود.</p>

    <p>
      history پروژه فاصله دو دوره را خوب نشان می‌دهد. صفحه مدیریت Menu اولین بار
      در ۱۸ فوریه ۲۰۲۵ دیده می‌شود؛ create آن ۴ مارس کامل شد و edit/delete در دو
      مرحله در ۱۹ آوریل به flow اضافه شدند. این به معنی دو ماه کار پیوسته روی یک
      صفحه نیست؛ feature طی چند چرخه جلو رفت، هم‌زمان با اینکه table، form و select
      مشترک هم در حال ساخته شدن بودند. نکته مهم برای من این بود که هنوز بخش زیادی
      از plumbing در خود page حل می‌شد.
    </p>

    <h2>معماری با migrate کردن pageهای واقعی تست شد</h2>
    <p>PageShell را روی یک demo ساختم و تمام نکردم.</p>
    <p>مهاجرت به‌مرور انجام شد.</p>
    <p>
      در rollout کامل PageShell در ۱۵ فوریه ۲۰۲۶، پنج صفحه domain ــ Project،
      Product، Pump Model، Technology و Technology Step ــ در یک چرخه توسعه به
      قرارداد مشترک منتقل شدند. دو روز بعد، Machine و Workshop به‌همراه flow انتخاب
      Tool برای Technology Step در یک session اضافه شدند و follow-up همان flow حدود
      دو ساعت بعد کامل شد. این اعداد درباره migration و integration فرانت‌اندند، نه
      مالکیت behavior دامنه‌های پشت این صفحه‌ها.
    </p>
    <p>
      اول صفحه‌های ساده‌تر، بعد صفحه‌هایی که report یا upload داشتند، resourceهای
      nested، صفحه‌های کاملاً read-only، server table با quick filter و client
      tableهایی که policy متفاوتی برای delete داشتند.
    </p>
    <p>بعدتر formهای دارای dependency و selection هم وارد شدند.</p>
    <p>طبیعتاً همه‌چیز هم تمیز پیش نرفت.</p>
    <p>یک helper برای data loading استخراج شده بود ولی خود PageShell هنوز از آن استفاده نمی‌کرد.</p>
    <p>نسخه اولیه documentation چند مثال نیمه‌کاره داشت.</p>
    <p>
      سه test قدیمی form system هم بعد از migration حذف شدند، چون دیگر معماری‌ای را
      تست می‌کردند که pageهای اصلی از آن استفاده نمی‌کردند و نتیجه‌شان برای ساختار
      جدید قابل اعتماد نبود.
    </p>
    <p>اگر امروز دوباره این migration را انجام بدهم، احتمالاً قبل از زیاد شدن consumerها چند contract test مشخص برای این قسمت‌ها می‌نویسم:</p>
    <ul><li>action policy</li><li>read-only behavior</li><li>nested param mapping</li><li>feature composition</li></ul>
    <p>نه برای اینکه coverage درصد بالاتری نشان بدهد، بیشتر برای اینکه مرزهای abstraction زودتر قفل شوند.</p>
    <p>
      با مقایسه همین history قبل و بعد از factoryها و PageShell، برای صفحه‌های CRUD
      مشابه و تکراری، کاهش بیش از ۷۰٪ در زمان توسعه برآورد محافظه‌کارانه‌ای است. این
      عدد benchmark رسمی برای تمام frontend یا کل ERP نیست؛ فقط تفاوت چرخه پیاده‌سازی
      admin pageهایی را توصیف می‌کند که بعد از حذف wiring تکراری، بیشتر به config و
      integration تبدیل شدند.
    </p>

    <h2>چیزی که از PageShell نگه می‌دارم</h2>
    <p>اگر بخواهم امروز دوباره چنین ساختاری بسازم، هنوز همان سه مرز را نگه می‌دارم:</p>
    <pre><code>{`Typed Definition
      +
Stable Orchestrator
      +
Domain Behavior`}</code></pre>
    <p>feature adapterها هم باید کوچک و explicit بمانند.</p>
    <p>
      اگر روزی یک registry بزرگ بسازیم که صد نوع capability ERP را بشناسد، فقط از
      یک <code>Page.tsx</code> بزرگ رسیده‌ایم به یک <code>PageShell.tsx</code> بزرگ‌تر.
    </p>
    <p>ارزش PageShell برای من هیچ‌وقت صرفاً کم شدن تعداد خط‌های کد نبود.</p>
    <p>
      تغییر مهم‌تر این بود که wiring تکراری pageها بالاخره یک جای مشخص پیدا کرد،
      بدون اینکه behavior واقعی featureها مجبور شود خودش را شبیه یک CRUD عمومی نشان بدهد.
    </p>
    <p>هنوز هم یک معیار ساده برایش دارم:</p>
    <p>
      اگر برای توضیح یک business rule مجبور شوم بروم داخل کد PageShell، احتمالاً آن
      rule جای اشتباهی قرار گرفته.
    </p>
  </>
);
