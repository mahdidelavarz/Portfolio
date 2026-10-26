import {
  ArticleComparison,
  ArticleFlowDiagram,
} from "@/components/articles/ArticleVisuals";

export const sharedDataTableArticleFa = (
  <>
    <p>
      در یک ERP تقریباً هر صفحه‌ای اول یک table است. کاربر قبل از اینکه رکوردی
      را edit کند، درخواستی را تأیید کند یا وارد resource فرزند شود، اول باید آن
      را داخل یک لیست پیدا کند.
    </p>
    <p>
      برای همین table مشترک پرتکرارترین قطعه‌ی فرانت پروژه شد. و هر میان‌بُری که
      اول کار زدم، بعداً روی بیست صفحه‌ی دیگر برگشت.
    </p>
    <p>
      این نوشته درباره‌ی همین مسیر است: از یک table ساده‌ی client-side تا دو
      پیاده‌سازی جدا، اینکه چرا دو بار سراغ TanStack Table رفتم و هر دو بار
      composition خودمان را نگه داشتم، و اینکه state یک table واقعاً باید کجا
      زندگی کند.
    </p>

    <h2>نسخه‌ی اول همه‌چیز را داخل memory پردازش می‌کرد</h2>
    <p>
      table اول یک component جنریک TypeScript بود که با column definitionهای
      typed کار می‌کرد. کل لیست را می‌گرفت و داخل یک pipeline مموایز شده پردازش
      می‌کرد: filter ستون‌ها، بعد search کلی، بعد sort، و در آخر slice برای page
      فعلی.
    </p>
    <pre>
      <code>{`const processed = useMemo(
  () => sortRows(searchRows(filterRows(rows, filters), query), sort),
  [rows, filters, query, sort],
);
const visible = processed.slice(page * pageSize, (page + 1) * pageSize);`}</code>
    </pre>
    <p>
      شماره‌ی ردیف‌ها هم از جایگاه داده‌ی اصلی ساخته می‌شد، پس بین pageها درست
      می‌ماند بدون اینکه رکورد domain فیلد شماره داشته باشد.
    </p>
    <p>
      برای صفحه‌های مدیریتی اول کار، این انتخاب درستی بود. لیست‌ها کوچک بودند و
      backend هنوز contract صفحه‌بندی نداشت. filter کردن را عمداً سمت client نگه
      داشتم و مسیر server را برای ماژول‌هایی گذاشتم که واقعاً به آن نیاز داشتند،
      نه قبل از اینکه صفحه‌ای لازمش داشته باشد.
    </p>

    <h2>بیرون کشیدن دانش domain از table</h2>
    <p>
      table خیلی ساده نماند. ولی بیشتر رشدش اضافه کردن feature نبود، حذف کردن
      فرض‌ها بود.
    </p>
    <p>
      API اول propهای ثابت <code>onAdd</code> و <code>onEdit</code> و{" "}
      <code>onDelete</code> داشت. صفحه‌های واقعی approve، upload، باز کردن
      رکوردهای فرزند، دانلود و assign می‌خواستند. callbackهای ثابت را با action
      descriptorهای typed عوض کردم. حالا page آیکن، label، callback و permission
      لازم را می‌دهد و table فقط render می‌کند.
    </p>
    <pre>
      <code>{`type RowAction<T> = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  role?: string;          // با permission منوی فعال چک می‌شود
  onClick: (row: T) => void;
};`}</code>
    </pre>
    <p>
      قرارداد ستون‌ها و actionها قبلاً یک type همه‌کاره داشت که هر فیلد
      optionalی که یک صفحه زمانی لازم داشت، داخلش بود. آن را با generic روی view
      type خود هر feature عوض کردم. حالا key ستونی که روی آن رکورد وجود ندارد،
      موقع compile خطا می‌دهد، نه اینکه یک سلول خالی render شود.
    </p>
    <p>
      همین ایده برای رفتار هم بود. tableی که داخل modal است، مثلاً لیست کوتاه
      فایل‌های یک گروه، search و sort و pagination نمی‌خواهد. به جای component
      دوم، table برای این عملیات‌ها switch گرفت و actionهای toolbar حتی وقتی
      search خاموش است در دسترس ماندند.
    </p>
    <p>
      روی صفحه‌های کوچک هم یک نمای کارتی اضافه شد که از همان rowهای پردازش‌شده و
      صفحه‌بندی‌شده و همان row actionها ساخته می‌شود. پس نسخه‌ی موبایل نمی‌تواند
      از نسخه‌ی دسکتاپ جدا شود.
    </p>

    <ArticleComparison
      caption="table دیگر نمی‌دانست صفحه درباره‌ی چیست"
      beforeTitle="table اولیه"
      beforeItems={[
        "چند prop ثابت برای add و edit و delete",
        "یک type مشترک برای همه",
        "همیشه با search و pagination",
        "فقط ردیف‌های دسکتاپ",
      ]}
      afterTitle="table مشترک"
      afterItems={[
        "توصیف typed برای هر action",
        "تایپ جدا برای هر صفحه با generic",
        "عملیات قابل خاموش شدن",
        "کارت موبایل از همان ردیف‌ها",
      ]}
    />

    <h2>دو بار سراغ TanStack Table رفتم</h2>
    <p>
      TanStack Table انتخاب بدیهی برای این نوع component است و اوایل کار
      ارزیابی‌اش کردم. تصمیم گرفتم table خودمان را نگه دارم.
    </p>
    <p>
      بعدها، وقتی مسیر server-side را می‌ساختم، برای مدت کوتاهی آن table را روی
      TanStack Table بازنویسی کردم و در تغییر بعدی composition خودمان را
      برگرداندم.
    </p>
    <p>
      دلیلش ضعف کتابخانه نبود. یک table model headless مسئله‌ی sort state و
      column model و row model را خیلی خوب حل می‌کند. ولی در این پروژه این‌ها
      قبلاً کار می‌کردند و وقت ما آنجا نمی‌رفت.
    </p>
    <p>
      وقت ما صرف layout راست‌به‌چپ و جهت pagination، نمای کارتی موبایل،
      actionهای وابسته به permission، operatorهای filter که باید برای backend
      serialize می‌شدند، و ظاهری می‌شد که بین خیلی از صفحه‌ها مشترک بود. مهاجرت
      به کتابخانه همه‌ی این کار را نگه می‌داشت و یک لایه‌ی adapter هم وسطش اضافه
      می‌کرد.
    </p>
    <aside>
      کتابخانه وقتی ارزش آوردن دارد که بخش سخت مسئله‌ی تو را حذف کند. اینجا بخشی
      را عوض می‌کرد که از قبل کار می‌کرد.
    </aside>
    <p>
      روی یک پروژه‌ی جدید که table آماده ندارد، یا جایی که virtualization ستون و
      grouping لازم است، احتمالاً تصمیم دیگری می‌گرفتم.
    </p>

    <h2>table سمت server، و اینکه query مال کیست</h2>
    <p>
      dataهای بزرگ‌تر بخش مهندسی بالاخره صفحه‌بندی واقعی سمت server خواستند.
      contract ساده بود: client مقدارهای <code>page</code> و{" "}
      <code>pageSize</code> و <code>filter</code> و <code>orderBy</code> را
      می‌فرستد و itemها را همراه تعداد کل می‌گیرد. backend از Gridify استفاده
      می‌کرد، پس فرانت filter ستون‌ها، sort و search را به عبارت‌های Gridify
      تبدیل می‌کرد.
    </p>
    <pre>
      <code>{`// نمونه‌ی ساده‌شده‌ی یک request
?page=2&pageSize=16
&filter=title=*pump,status=2
&orderBy=createdAt desc`}</code>
    </pre>
    <p>سؤال سخت‌تر مالکیت بود.</p>
    <p>
      اولین server table خودش query را داشت و یک fetch callback می‌گرفت. بعد
      paging و filter و query را کامل داخل table بردم تا page فقط ستون‌ها را
      تعریف کند. تمیز به نظر می‌رسید، تا وقتی که table به یک query خاص گره خورد
      و دیگر قابل استفاده‌ی مجدد نبود.
    </p>
    <p>
      نسخه‌ی نهایی fetch را به page برگرداند. یک hook از table state پارامترهای
      request را می‌سازد، page query را اجرا می‌کند، و table فقط data، تعداد،
      وضعیت loading و error را می‌گیرد.
    </p>
    <p>
      این را هم کنار گذاشتم که یک table هر دو کار را بکند. table سمت client
      رفتار قبلی‌اش را برای همه‌ی صفحه‌های موجود نگه داشت و server table یک
      component جدا شد. header، rowها، کارت موبایل، toolbar، breadcrumb و
      pagination بین هر دو مشترک است. پس تکرار فقط در جایی است که واقعاً فرق
      دارد: data از کجا می‌آید و state چطور به request تبدیل می‌شود.
    </p>

    <ArticleFlowDiagram
      caption="server table خودش چیزی fetch نمی‌کند"
      source="table state ذخیره‌شده"
      items={[
        {
          title: "hook پارامترها",
          detail: "همراه debounce: filter، sort، search و page",
        },
        {
          title: "سازنده‌ی Gridify",
          detail: "تبدیل state به filter و orderBy",
        },
        {
          title: "query صفحه",
          detail: "مال page است و با پارامترها key می‌شود",
        },
        {
          title: "server table",
          detail: "نمایش data و گزارش تغییر state",
        },
      ]}
    />

    <h2>state یک table کجا باید باشد؟</h2>
    <p>جواب این سؤال سه نسخه طول کشید.</p>
    <p>
      نسخه‌ی اول paging و sort و filterها را داخل query string آدرس نگه می‌داشت.
      state قابل share بود، ولی state table با state route قاطی می‌شد و وقتی
      advanced search شرط‌های چندتایی آورد، کار سخت شد.
    </p>
    <p>
      نسخه‌ی دوم state را به یک store ذخیره‌شده‌ی Zustand برد. state بعد از
      navigation و refresh می‌ماند، که کاربرها می‌خواستند. ولی فقط یک store بود،
      پس همه‌ی server tableها یک state را می‌خواندند و می‌نوشتند. تا وقتی یک
      صفحه از آن استفاده می‌کرد کار می‌کرد، و به محض اینکه دو صفحه شد، غلط بود.
    </p>
    <p>
      نسخه‌ی سوم singleton را با یک store factory عوض کرد. هر table store
      ذخیره‌شده‌ی خودش را می‌گیرد که با route خودش key شده، و این store به
      table، search bar و hook پارامترها inject می‌شود. table سمت client هم
      factory مشابه گرفت و حالا هر client table باید key صریح بدهد.
    </p>
    <pre>
      <code>{`const createTableStore = (key: string) =>
  create(
    persist(tableState, {
      name: \`table-store-\${key}\`,
      // selection یک state زنده است، نه ترجیح کاربر
      partialize: ({ selectedRows, ...rest }) => rest,
    }),
  );`}</code>
    </pre>
    <p>
      آن خط آخر از یک fix بعدی آمد. ذخیره کردن rowهای انتخاب‌شده یعنی یک انتخاب
      قدیمی می‌توانست بعد از reload دوباره ظاهر شود و بدون اینکه کاربر متوجه شود
      در یک عملیات گروهی استفاده شود. page و sort و search و filter
      ترجیح‌هایی‌اند که ارزش برگرداندن دارند. selection نه.
    </p>

    <h2>table state و workspace</h2>
    <p>
      ERP یک workspace تب‌دار دارد که navigation معمولی یک تب موقت را دوباره
      استفاده می‌کند. وقتی state هر table ذخیره شد، مشکل جدیدی پیدا شد: کاربر
      می‌توانست چند دقیقه روی filterهای یک لیست وقت بگذارد و بعد با کلیک بعدی
      روی sidebar آن تب را از دست بدهد.
    </p>
    <p>
      حالا table تعامل‌های معنی‌دار مثل filter، search، sort یا عوض کردن page را
      گزارش می‌دهد و workspace در آن لحظه تب موقت را pin می‌کند. قرار است بستن
      تب هم state ذخیره‌شده‌ی route آن را پاک کند.
    </p>

    <h2>باگ‌های کوچکی که contract را شکل دادند</h2>
    <ul>
      <li>
        <strong>دکمه داخل form.</strong> tableهای embedded داخل form هستند.
        pagination، toggle فیلتر و row actionهایی که{" "}
        <code>type=&quot;button&quot;</code> نداشتند، form اطراف را submit
        می‌کردند. حالا همه‌ی کنترل‌های table صریحاً امن برای form هستند.
      </li>
      <li>
        <strong>«انتخاب همه» یعنی چه؟</strong> از page فعلی، به کل dataی
        فیلترشده، و بعد به IDهای عددی رسید تا انتخاب بین pageها بماند. نگه داشتن
        کل object هر row به محض refetch شدن data، identity را می‌شکست.
      </li>
      <li>
        <strong>permission روی actionها.</strong> actionهای غیرمجاز اول فقط
        کم‌رنگ می‌شدند. fix بعدی واقعاً disabledشان کرد، که فرق بین یک راهنما و
        یک قانون است. دسترسی همچنان در backend چک می‌شود. این فقط باعث می‌شود UI
        چیزی را پیشنهاد ندهد که شکست می‌خورد.
      </li>
      <li>
        <strong>reset قابل دیدن.</strong> دکمه‌ی reset وقتی filter، sort یا
        search فعالی هست یک نشانگر نشان می‌دهد. selector یک boolean برمی‌گرداند
        نه یک object جدید، پس render اضافه ایجاد نمی‌کند.
      </li>
    </ul>

    <h2>چه چیزهایی هنوز باز است</h2>
    <p>
      ترجیح می‌دهم محدودیت‌های شناخته‌شده را بگویم تا اینکه وانمود کنم table
      تمام شده.
    </p>
    <ul>
      <li>
        advanced search با ترکیب شرط‌های AND و OR سمت client به ترتیب ارزیابی
        می‌شود ولی سمت server گروه‌بندی می‌شود. پس دو table ممکن است روی یک
        query نتیجه‌ی متفاوت بدهند.
      </li>
      <li>ستون‌های تودرتو نمایش داده می‌شوند ولی sort و filter نمی‌شوند.</li>
      <li>
        storeهای client و server یک prefix مشترک دارند. اگر یک client table داخل
        صفحه‌ای باشد که server table هم روی همان route دارد، ممکن است با هم
        برخورد کنند.
      </li>
      <li>
        پاک‌سازی موقع بستن تب الان key مربوط به route فعال را پاک می‌کند، نه
        همیشه key تبی که بسته می‌شود.
      </li>
    </ul>
    <p>
      همه‌ی این‌ها راه‌حل روشنی دارند. هیچ‌کدام هنوز آن‌قدر لازم نشده که تغییرش
      را توجیه کند.
    </p>
    <p>
      درسی که از این table گرفتم این است که بخش گران یک component مشترک معمولاً
      render نیست. تصمیم گرفتن درباره‌ی این است که هر تکه state مال کیست، و ثابت
      نگه داشتن همان تصمیم روی همه‌ی صفحه‌هایی که از آن استفاده می‌کنند.
    </p>
  </>
);
