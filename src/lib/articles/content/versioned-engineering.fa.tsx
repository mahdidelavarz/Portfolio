export const versionedEngineeringArticleFa = (
  <>
    <p>
      صفحه‌های اولیه Tag و Part از بیرون خیلی عجیب نبودند. یک list، یک form، چند
      lookup و چند action معمولی.
    </p>
    <p>مشکل وقتی شروع شد که Engineering بعد از جلو رفتن یک تعریف در workflow دوباره نیاز به تغییر داشت.</p>
    <p>تا قبل از آن، مدل ذهنی خیلی ساده بود:</p>
    <pre><code>{`record → edit → save`}</code></pre>
    <p>ولی اینجا دیگر همیشه نمی‌شد همان row قبلی را edit کرد.</p>
    <p>
      اگر یک Part از تعریف جدید حذف می‌شد، نباید از نسخه‌ای که قبلاً براساس آن کار
      شده بود هم ناپدید می‌شد. اگر Part یا quantity تغییر می‌کرد، نسخه قبلی باید
      می‌ماند و معلوم می‌شد تغییر جدید متعلق به کدام revision است.
    </p>
    <p>از اینجا به بعد مسئله دیگر form و CRUD نبود. باید history خودش بخشی از مدل می‌شد.</p>

    <h2>Project تمام می‌شد، ولی کار Engineering تازه شروع می‌شد</h2>
    <p>Project در Sales شکل می‌گرفت و می‌توانست چند Tag داشته باشد.</p>
    <p>
      بعد از تأیید نهایی Project، بخش مرتبط وارد Engineering می‌شد. این handoff را
      نمی‌شد فقط با اضافه کردن چند field مهندسی به همان Project form حل کرد.
    </p>
    <p>Project workflow و Tag Edition workflow دو چیز جدا بودند.</p>
    <p>
      اولی مشخص می‌کرد کار چه زمانی از Sales وارد مرحله بعد شده، ولی دومی lifecycle
      خود تعریف مهندسی را کنترل می‌کرد.
    </p>
    <p>frontend باید Project را به‌عنوان context نگه می‌داشت، ولی Engineering فضای خودش را لازم داشت.</p>
    <p>به‌شکل خیلی ساده:</p>
    <pre><code>{`Sales Project
      ↓
Final Approval
      ↓
Engineering
      ↓
Edition 0
      ↓
Completed Definition
      ↓
Revision Needed?
      ↓
Edition 1 / 2 / ...`}</code></pre>

    <h2>Edition 0 فقط یک عدد نبود</h2>
    <p>Edition صفر اولین تعریف مهندسی بعد از handoff بود.</p>
    <p>اطلاعات Tag، محصول‌ها، Groupها و Part List به‌مرور داخل همین context کامل می‌شدند.</p>
    <p>
      یک دوره frontend شماره Edition را به‌صورت input اجباری نمایش می‌داد، در حالی
      که backend خودش براساس آخرین Edition شماره بعدی را تعیین می‌کرد.
    </p>
    <p>این از آن inconsistencyهایی بود که نشان می‌داد مفهوم هنوز کاملاً در UI جا نیفتاده.</p>
    <p>وقتی Edition ترتیب revisionها را نشان می‌دهد، منطقی نیست کاربر خودش هر عددی وارد کند.</p>
    <p>
      Edition بعدی هم قرار نبود مستقل و بدون ارتباط ساخته شود. باید ادامه یک تعریف
      قبلی باشد و براساس state همان جریان جلو برود.
    </p>

    <h2>تغییر Part یعنی ساخت history، نه overwrite کردن آن</h2>
    <p>در Edition جدید، یک Part می‌توانست نسبت به نسخه قبل:</p>
    <ul><li>Added باشد</li><li>Removed باشد</li><li>Modified باشد</li></ul>
    <p>
      این سه state فقط واژه‌های مقاله نیستند؛ همان سه وضعیت معنی‌دار و قابل نمایش
      در مدل revision بودند. وضعیت داخلی Unknown هم در بخشی از implementation وجود
      داشت، اما برای روایت تغییر واقعی بین دو Edition، Added، Removed و Modified
      همان چیزی بودند که کاربر باید می‌دید.
    </p>
    <p>مثلاً:</p>
    <pre><code>{`Edition 0
├── Part A
├── Part B
└── Part C

        ↓

Edition 1
├── Part A
├── Part B'   Modified
├── Part D    Added
└── Part C    Removed`}</code></pre>
    <p>
      برای <code>Modified</code> فقط داشتن مقدار جدید کافی نبود. row جدید باید
      می‌دانست از کدام Part قبلی آمده.
    </p>
    <p>
      هم برای نمایش تغییر لازم بود، هم برای اینکه مراحل بعدی یک Part جدید را با نسخه
      اصلاح‌شده یک Part قبلی اشتباه نگیرند.
    </p>
    <p>رفتار update هم بسته به این فرق می‌کرد که row از کجا آمده.</p>
    <p>اگر Part از قبل متعلق به draft جاری بود، همان row می‌توانست edit شود.</p>
    <p>
      ولی اگر از Edition قبلی به ارث رسیده بود، تغییر باید داخل Edition جدید ثبت
      می‌شد و ارتباطش با نسخه قبل حفظ می‌شد.
    </p>
    <p>
      delete هم برای یک Part تاریخی به معنی پاک کردن گذشته نبود. حذف باید خودش
      به‌عنوان تغییر در revision جدید ثبت می‌شد.
    </p>
    <p>
      نسخه‌های اولیه این flow کامل نبودند. بعضی lookupها موقت بودند و انتخاب Part
      قبلی هنوز به شکلی انجام می‌شد که برای lineage نهایی مناسب نبود.
    </p>
    <p>
      بعداً این ارتباط به خود عملیات revision منتقل شد و دیگر قرار نبود کاربر با یک
      selector حدس بزند Part جدید ادامه کدام row قبلی است.
    </p>

    <h2>این ساختار را نمی‌شد تا ابد داخل modal نگه داشت</h2>
    <p>
      Project، Tag، Edition، Group و Part پنج سطح context روی هم داشتند؛ و موقعیت
      nested هر Part می‌توانست hierarchy را از این هم عمیق‌تر کند.
    </p>
    <p>تا وقتی child فقط یک فرم کوچک است، modal جواب می‌دهد.</p>
    <p>
      ولی وقتی همان child خودش table، form، validation، workflow و حتی child دیگری
      دارد، modal داخل modal خیلی زود تبدیل می‌شود به چیزی که نه navigation خوبی دارد
      و نه state آن قابل اعتماد می‌ماند.
    </p>
    <p>برای این بخش resourceها را به routeهای مستقل بردم.</p>
    <p>
      کاربر وقتی وارد Partها می‌شد هنوز context Tag و Group را داشت. refresh هم
      context را از بین نمی‌برد و لینک مستقیم به همان صفحه قابل استفاده بود.
    </p>
    <p>جزئیات routeهای داخلی اهمیتی ندارند. چیزی که مهم بود این بود:</p>
    <pre><code>{`Project
  ↓
Tag
  ↓
Edition
  ↓
Group
  ↓
Part`}</code></pre>
    <p>
      parent identity بخشی از URL و navigation شد، نه state موقتی که فقط تا باز بودن
      یک modal زنده بماند.
    </p>
    <p>create کردن resource nested هم باید دقیق بود.</p>
    <p>
      parent از route می‌آمد، داخل field درست form قرار می‌گرفت و در آن context قابل
      تغییر نبود.
    </p>
    <p>
      اوایل بعضی اسم routeها و fieldها واقعاً چیزی را که حمل می‌کردند خوب نشان
      نمی‌دادند. همین باعث شد mappingها explicitتر شوند و کمتر روی conventionهای
      حدسی حساب کنیم.
    </p>

    <h2>history باید می‌ماند، ولی نباید وارد هر validationی می‌شد</h2>
    <p>
      بعد از اضافه شدن Edition، یکی از دردسرهای اصلی این بود که فرق بین history و
      current state در همه مسیرها رعایت شود.
    </p>
    <p>rowهای Editionهای قبلی باید باقی می‌ماندند.</p>
    <p>اما باقی ماندنشان به این معنی نبود که validation نسخه جاری هم باید آنها را حساب کند.</p>
    <p>یک completeness check قدیمی Partهای چند Edition را با هم traverse می‌کرد.</p>
    <p>در چنین حالتی ممکن بود Edition جاری ناقص باشد، ولی داده تاریخی باعث شود کامل دیده شود.</p>
    <p>یا validation درباره rowهایی تصمیم بگیرد که اصلاً دیگر تعریف فعال نیستند.</p>
    <p>مدل درست این بود که completeness روی Edition مرتبطِ فعلی بررسی شود.</p>
    <p>Editionهای قبل برای history و مقایسه‌اند.</p>
    <p>
      این مرز در همه‌جای implementation یک‌دست نبود. در بعضی stageهای جدیدتر filtering
      براساس Edition درست شده بود، ولی مسیرهای قدیمی هنوز history را با state فعلی
      مخلوط می‌کردند.
    </p>
    <p>report هم دقیقاً همین مشکل را داشت.</p>
    <p>«همه Partهایی که زمانی وجود داشته‌اند» با «Part List معتبر فعلی» یکی نیست.</p>

    <h2>quantity قرار نبود مجوز rebuild داده‌ها باشد</h2>
    <p>یک مسئله دیگر از quantityهای مورد انتظار آمد.</p>
    <p>Project تعداد Tag مورد انتظار داشت و هر Tag هم تعداد محصول مورد انتظار خودش را.</p>
    <p>راه ساده این بود که اگر quantity تغییر کرد، childها پاک شوند و دوباره ساخته شوند.</p>
    <p>در اولین نگاه حتی منطقی به نظر می‌رسد.</p>
    <p>
      ولی Tag یا Product ممکن است تا آن زمان کلی اطلاعات، relation، فایل یا داده
      مهندسی داشته باشد.
    </p>
    <p>تغییر یک عدد نباید بتواند همه این‌ها را بی‌سروصدا نابود کند.</p>
    <p>پس quantity را به‌عنوان constraint در نظر گرفتیم، نه فرمان sync.</p>
    <pre><code>{`Expected Count
      ↓
Compare With Actual
      ↓
Mismatch
      ↓
Block Completion
      ↓
User Fixes It Explicitly`}</code></pre>
    <p>
      اگر mismatch وجود داشت، سیستم completion را متوقف می‌کرد تا کاربر خودش تصمیم
      بگیرد رکورد اضافه کند، حذف کند یا expected count را تغییر دهد.
    </p>
    <p>
      چند branch قدیمی هنوز رفتار clear-and-recreate داشتند. بعد از روشن شدن business
      rule، دیگر نمی‌شد آن‌ها را implementation نهایی در نظر گرفت.
    </p>

    <h2>حتی Good هم همیشه identity کافی نبود</h2>
    <p>داخل Part List ممکن بود یک item یکسان در چند جای assembly استفاده شود.</p>
    <p>مثلاً:</p>
    <pre><code>{`3
└── 3.2
    └── 3.2.1`}</code></pre>
    <p>
      پس اینکه دو row <code>Good</code> یکسان داشته باشند، الزاماً به معنی این نبود
      که همان Part هستند.
    </p>
    <p>موقعیت hierarchical هم بخشی از context بود.</p>
    <p>این rule در نسخه‌های اولیه در همه مسیرها یکسان پیاده نشده بود.</p>
    <p>
      مثلاً pre-check مربوط به copy، item و nested position را با هم می‌دید، ولی خود
      copy فقط item را مقایسه می‌کرد و حتی position را هم منتقل نمی‌کرد.
    </p>
    <p>نتیجه‌اش مشخص بود: دو Part با item یکسان ولی جای متفاوت ممکن بود duplicate در نظر گرفته شوند.</p>
    <p>
      اگر امروز این قسمت را دوباره می‌ساختم، equivalence را یک rule مشترک می‌کردم که
      copy، revision، duplicate check و validation همگی از همان استفاده کنند.
    </p>
    <p>چنین چیزی نباید در چهار service مختلف چهار تعریف نزدیک ولی متفاوت داشته باشد.</p>

    <h2>workflow فقط نباید در backend وجود داشته باشد</h2>
    <p>داشتن API برای edit به این معنی نیست که edit در هر stateی مجاز است.</p>
    <p>
      ساخت Group، تغییر Part یا ایجاد revision جدید باید با Edition جاری و workflow
      آن هماهنگ می‌بود.
    </p>
    <p>این gateها در طول توسعه چند بار اصلاح شدند.</p>
    <p>
      یک نسخه حتی ساخت Group را منوط به کامل شدن Edition کرده بود، در حالی که خود
      Group برای کامل کردن همان Edition لازم بود. یعنی rule از نظر فنی وجود داشت،
      ولی از نظر flow عملاً مسیر را بسته بود.
    </p>
    <p>frontend باید بین این حالت‌ها فرق می‌گذاشت:</p>
    <ul><li>دیدن history</li><li>ویرایش draft جاری</li><li>شروع revision جدید</li></ul>
    <p>فقط disabled کردن یک form برای بیان این تفاوت کافی نبود.</p>
    <p>
      route، context، change status و actionهای قابل دسترس باید همه یک state واحد را
      نشان می‌دادند.
    </p>

    <h2>اگر امروز از اول می‌ساختم</h2>
    <p>قبل از ساختن formها سه چیز را خیلی زودتر مشخص می‌کردم:</p>
    <ol>
      <li>Edition فعال دقیقاً کدام است؟</li>
      <li>دو Part در دو revision چه زمانی معادل‌اند؟</li>
      <li>در هر state چه operationهایی مجازند؟</li>
    </ol>
    <p>بعد query، validation، copy، report و action policy باید همگی از همین قراردادها استفاده کنند.</p>
    <p>
      routeهای nested را همچنان نگه می‌داشتم. این resourceها آن‌قدر state و history
      دارند که فضای مستقل برایشان ارزش دارد.
    </p>
    <p>
      lineage را هم explicit نگه می‌داشتم. اینکه frontend دو snapshot را مقایسه کند
      و بعد حدس بزند چه چیزی Modified شده، برای چنین داده‌ای زیادی شکننده است.
    </p>
    <p>Edition به‌خودی‌خود سخت‌ترین بخش نبود.</p>
    <p>سختی واقعی این بود که تمام مسیرهای سیستم روی یک تعریف از «Edition جاری» توافق داشته باشند.</p>
    <p>
      اگر validation تاریخچه را با نسخه فعلی قاطی کند، copy موقعیت Part را فراموش
      کند یا report Edition اشتباهی را بخواند، UI ممکن است کاملاً درست به نظر برسد
      ولی نتیجه همچنان غلط باشد.
    </p>
  </>
);
