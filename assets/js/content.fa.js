var CONTENT_FA = {
    nav: {
        groups: {
            start: 'شروع کار',
            core: 'مفاهیم پایه',
            ext: 'اکستنشن‌ها',
            services: 'سرویس‌ها',
            lsp: 'یکپارچه‌سازی LSP',
            ui: 'رابط کاربری',
            packaging: 'بسته‌بندی (.gpl)',
            example: 'نمونه‌ی کامل'
        },
        pages: {
            intro: 'معرفی',
            architecture: 'معماری',
            quickstart: 'شروع سریع',
            'ghost-plugin': 'GhostPlugin',
            'plugin-context': 'PluginContext',
            'plugin-descriptor': 'PluginDescriptor',
            'plugin-dependency': 'PluginDependency',
            'plugin-logger': 'PluginLogger',
            disposable: 'Disposable',
            'setup-actions': 'PluginSetupAction',
            'plugin-storage': 'PluginStorage',
            'extension-point': 'ExtensionPoint',
            'extension-registry': 'ExtensionRegistry',
            'configurable-extension': 'ConfigurableExtension',
            'plugin-command': 'PluginCommand',
            'service-key': 'ServiceKey',
            'service-registry': 'ServiceRegistry',
            'global-registry': 'GlobalRegistry',
            'lsp-overview': 'نمای کلی',
            'lsp-server-provider': 'LspServerProvider',
            'lsp-server-definition': 'LspServerDefinition',
            'lsp-server-connection': 'LspServerConnection',
            'ui-overview': 'نمای کلی',
            'ide-host-services': 'IdeHostServices',
            'editor-host': 'EditorHost',
            'file-manager-host': 'FileManagerHost',
            'code-runner-host': 'CodeRunnerHost',
            'editor-panel': 'EditorPanel',
            'editor-action-handler': 'EditorActionHandler',
            'ui-feedback-host': 'UiFeedbackHost',
            'ide-events': 'IdeEvents / FileEvent',
            'plugin-screen': 'PluginScreen',
            'file-icon-contributor': 'FileIconContributor',
            'gpl-format': 'فرمت .gpl',
            'build-plugin': 'ساخت پلاگین',
            'loading-lifecycle': 'چرخه‌ی بارگذاری',
            installing: 'نصب پلاگین',
            'hello-world': 'Hello Ghost',
						'soon':'soon'
        }
    },

    home: {
        eyebrow: 'مستندات توسعه‌دهندگان · Ghost IDE',
        title: 'ویرایشگر Ghost IDE را با **پلاگین** خودت گسترش بده',
        lead: 'یک API سه‌بخشی برای افزودن زبان سرور (LSP)، صفحه‌ی UI اختصاصی و هر قابلیت دیگری به Ghost IDE — بدون دست‌زدن به کد خود اپ.',
        ctaPrimary: { group: 'start', slug: 'intro', label: 'شروع مستندات' },
        ctaSecondary: 'مخزن گیت‌هاب',
        stats: [
            { value: '۳', label: 'ماژول API مستقل' },
            { value: '۷', label: 'اکستنشن‌پوینت آماده' },
            { value: 'Java 17', label: 'زبان و نسخه' }
        ],
        mock: {
            filename: 'GhostPlugin.java',
            lines: [
                'public final class HelloGhostPlugin implements GhostPlugin {',
                '',
                '  @Override',
                '  public void activate(PluginContext context) {',
                '    Disposable d = context.getExtensions().register(',
                '        PluginUiExtensionPoints.PLUGIN_SCREEN,',
                '        new HelloScreen(),',
                '        context.getDescriptor().getId(),',
                '        0);',
                '    context.registerDisposable(d);',
                '  }',
                '}'
            ]
        },
        cards: [
            { group: 'start', slug: 'architecture', icon: 'compass', title: 'معماری پلتفرم', desc: 'نقشه‌ی سه ماژول API و رابطه‌شان با اپ میزبان.' },
            { group: 'core', slug: 'ghost-plugin', icon: 'box', title: 'GhostPlugin', desc: 'نقطه‌ی ورود هر پلاگین و چرخه‌ی activate/deactivate.' },
            { group: 'ext', slug: 'extension-point', icon: 'plug', title: 'سیستم اکستنشن', desc: 'ثبت قابلیت در یک اکستنشن‌پوینت با اولویت و مالکیت مشخص.' },
            { group: 'lsp', slug: 'lsp-server-provider', icon: 'terminal', title: 'افزودن Language Server', desc: 'معرفی یک سرور زبان جدید به ادیتور از طریق LspServerProvider.' },
            { group: 'ui', slug: 'plugin-screen', icon: 'layout', title: 'افزودن صفحه‌ی UI', desc: 'یک Fragment کامل را به‌عنوان صفحه‌ی پلاگین ثبت کن.' },
            { group: 'packaging', slug: 'gpl-format', icon: 'package', title: 'بسته‌بندی .gpl', desc: 'ساختار فایل نصب پلاگین و مانیفست plugin.json.' }
        ]
    },

    pages: {

        intro: {
            title: 'معرفی',
            filename: 'README.md',
            dek: 'Ghost IDE با یک لایه‌ی پلاگین رسمی گسترش‌پذیر است؛ همین API که خود ویژگی‌های داخلی اپ هم از آن استفاده می‌کنند.',
            blocks: [
                { type: 'p', text: 'یک پلاگین Ghost IDE یک کلاس Java است که رابط `GhostPlugin` را پیاده می‌کند، داخل یک بسته‌ی `.gpl` می‌شود، و در زمان اجرا با DexClassLoader بارگذاری می‌شود. بعد از بارگذاری، متد `activate(PluginContext)` صدا زده می‌شود و از همان‌جا پلاگین به رجیستری‌های اکستنشن و سرویس دسترسی پیدا می‌کند.' },
                { type: 'p', text: 'API در سه ماژول جدا از هم پخش شده تا هر پلاگین فقط به چیزی وابسته شود که واقعاً لازم دارد:' },
                {
                    type: 'table', headers: ['ماژول', 'نوع', 'وابستگی', 'کاربرد'], rows: [
                        ['`plugin-api`', 'کتابخانه‌ی جاوای خالص', 'ندارد', 'مدل پایه‌ی پلاگین، اکستنشن و سرویس'],
                        ['`ide-api`', 'کتابخانه‌ی جاوای خالص', '`plugin-api` + `lsp4j`', 'افزودن Language Server (LSP) به ادیتور'],
                        ['`ide-ui-api`', 'کتابخانه‌ی اندروید', '`plugin-api` + `androidx.appcompat`', 'افزودن صفحه‌ی UI و دسترسی به سرویس‌های میزبان']
                    ]
                },
                { type: 'note', variant: 'info', text: 'هر سه ماژول با **Java 17** کامپایل می‌شوند. `plugin-api` عمداً هیچ وابستگی به اندروید ندارد تا منطق خالص پلاگین بدون نیاز به SDK اندروید قابل کامپایل و تست باشد.' },
                { type: 'h2', text: 'یک پلاگین از چه اجزایی تشکیل شده؟' },
                {
                    type: 'list', items: [
                        '**کلاس ورودی** — پیاده‌سازی `GhostPlugin` با یک سازنده‌ی بدون آرگومان.',
                        '**مانیفست** — فایل `assets/plugin.json` با شناسه، نسخه و نام کلاس ورودی.',
                        '**بسته‌ی `.gpl`** — فایل نهایی نصب؛ یک zip حاوی مانیفست و `classes.dex`.'
                    ]
                },
                { type: 'p', text: 'برای شروع سریع به صفحه‌ی [شروع سریع](#/start/quickstart) برو، یا برای دیدن یک پلاگین کامل از صفر تا نصب، مستقیم سراغ [نمونه‌ی Hello Ghost](#/example/hello-world) برو.' }
            ]
        },

        architecture: {
            title: 'معماری',
            filename: 'ARCHITECTURE.md',
            dek: 'نقشه‌ی ماژول‌ها، رجیستری‌های اکستنشن/سرویس، و مرز بین کد پلاگین و کد اپ میزبان.',
            blocks: [
                { type: 'h2', text: 'نقشه‌ی ماژول‌ها' },
                {
                    type: 'modulemap', items: [
                        { name: 'plugin-api', desc: 'مدل پلاگین، PluginContext، ExtensionPoint/Registry، ServiceKey/Registry، GlobalRegistry.' },
                        { name: 'ide-api', desc: 'وابسته به plugin-api. اکستنشن‌پوینت LSP_SERVER_PROVIDER برای افزودن Language Server.' },
                        { name: 'ide-ui-api', desc: 'وابسته به plugin-api. اکستنشن‌پوینت‌های PLUGIN_SCREEN / EDITOR_PANEL / EDITOR_ACTION_HANDLER و سرویس‌های EditorHost / FileManagerHost / CodeRunnerHost.' }
                    ]
                },
                { type: 'p', text: 'ماژول `:app` (خود اپ) به هر سه بستگی دارد و در واقع تنها جایی است که پیاده‌سازی واقعی رجیستری‌ها (`DefaultExtensionRegistry`, `DefaultServiceRegistry`) و بارگذار پلاگین (`GplPluginLoader`) در آن زندگی می‌کند. کد پلاگین هرگز مستقیم با کلاس‌های داخلی `:app` صحبت نمی‌کند — فقط با رابط‌های `plugin-api`/`ide-api`/`ide-ui-api`.' },
                { type: 'h2', text: 'دو رجیستری مشترک' },
                { type: 'p', text: '`GlobalRegistry` یک نگه‌دارنده‌ی استاتیک برای کل پردازه است و دو رجیستری در اختیار می‌گذارد:' },
                {
                    type: 'table', headers: ['رجیستری', 'محدوده', 'چرا'], rows: [
                        ['`GlobalRegistry.extensions()`', 'یک نمونه‌ی مشترک بین همه‌ی پلاگین‌ها', 'ماژول‌هایی مثل `:editor` باید بتوانند تمام providerهای ثبت‌شده — از هر پلاگینی — را ببینند.'],
                        ['`GlobalRegistry.services()`', 'پایه‌ی مشترک؛ هر پلاگین یک **کپی** از آن می‌گیرد', 'هر پلاگین باید بتواند یک `Context` اندرویدِ مخصوص به خودش داشته باشد، بدون آن‌که به پلاگین‌های دیگر درز کند.']
                    ]
                },
                { type: 'note', variant: 'warn', text: 'چون اکستنشن‌ها در یک رجیستری *مشترک* ذخیره می‌شوند، پاک‌سازی هنگام unload کاملاً به درست پرکردن `ownerPluginId` هنگام ثبت بستگی دارد. جزئیات در صفحه‌ی [Extension Registry](#/ext/extension-registry).' },
                { type: 'h2', text: 'مسیر یک درخواست' },
                {
                    type: 'list', ordered: true, items: [
                        'اپ میزبان یک فایل `.gpl` را از پوشه‌ی نصب می‌خواند و `GplPluginLoader.load()` را صدا می‌زند.',
                        'لودر مانیفست را می‌خواند، کلاس ورودی را با ClassLoader اختصاصی بارگذاری می‌کند و یک `PluginContext` می‌سازد.',
                        '`activate(context)` صدا زده می‌شود؛ پلاگین از طریق `context.getExtensions()` و `context.getServices()` قابلیت ثبت می‌کند.',
                        'بقیه‌ی اپ (مثلاً `:editor` هنگام باز شدن یک فایل) از `ExtensionRegistry.extensions(point)` برای پیدا کردن providerهای فعال استفاده می‌کند.'
                    ]
                }
            ]
        },

        quickstart: {
            title: 'شروع سریع',
            filename: 'QUICKSTART.md',
            dek: 'کوتاه‌ترین مسیر از صفر تا یک پلاگین نصب‌شده روی Ghost IDE.',
            blocks: [
                {
                    type: 'list', ordered: true, items: [
                        '**وابستگی اضافه کن** — به `plugin-api` (و در صورت نیاز `ide-api` یا `ide-ui-api`) در `build.gradle` ماژول پلاگینت وابسته شو.',
                        '**رابط `GhostPlugin` را پیاده کن** — یک کلاس با سازنده‌ی بدون آرگومان که `activate(PluginContext)` را override می‌کند.',
                        '**قابلیت خودت را ثبت کن** — از طریق `context.getExtensions().register(...)`، با `ownerPluginId` برابر شناسه‌ی خودت.',
                        '**مانیفست بنویس** — `assets/plugin.json` شامل `id`, `name`, `version`, `entryClass`.',
                        '**بسته‌بندی کن** — مانیفست و `classes.dex` را در یک zip با پسوند `.gpl.` قرار بده.',
                        '**نصب کن** — فایل `.gpl` را در پوشه‌ی نصب پلاگین‌های دستگاه کپی کن.'
                    ]
                },
                {
                    type: 'code', filename: 'build.gradle', lang: 'gradle', code:
                        `dependencies {
  // plugin-api و ide-api و ide-ui-api هیچ کجای عمومی منتشر نشده‌اند.
  // آن‌ها را از GitHub Actions (آرتیفکت "ghostide-plugin-sdk")
  // یا از یک Release دانلود کن و به فایل‌های محلی jar/aar اشاره بده:
  compileOnly files('libs/plugin-api.jar')
  compileOnly files('libs/ide-api.jar')
  compileOnly files('libs/ide-ui-api.aar')
}` },
                { type: 'note', variant: 'info', text: 'گروه `ir.hanzodev1375.ghostide:...` **هیچ‌جا منتشر نشده** — خود اپ میزبان این APIها را همراه دارد. فایل‌های آماده را از آرتیفکت **ghostide-plugin-sdk** در [GitHub Actions](https://github.com/HanzoDev1375/GhostIdes/actions) یا از یک [Release](https://github.com/HanzoDev1375/GhostIdes/releases) مخزن Ghost IDE دانلود کن.' },
                { type: 'note', variant: 'tip', text: 'برای دیدن این شش قدم با کد کامل و واقعی، برو سراغ [نمونه‌ی Hello Ghost](#/example/hello-world) — دقیقاً همین مسیر را از اول تا آخر طی می‌کند.' }
            ]
        },

        'ghost-plugin': {
            title: 'GhostPlugin',
            filename: 'GhostPlugin.java',
            module: 'plugin-api',
            dek: 'نقطه‌ی ورود هر پلاگین Ghost IDE.',
            blocks: [
                { type: 'p', text: 'زمان اجرا کلاسی را که در `entryClass` مانیفست معرفی شده، با یک سازنده‌ی بدون آرگومان می‌سازد و سپس `activate(PluginContext)` را صدا می‌زند. پلاگین باید قابلیت‌های خودش را از طریق `context.getExtensions()` ثبت کند و `Disposable` برگشتی را حتماً با `PluginContext.registerDisposable(Disposable)` ثبت کند تا هنگام unload، رهاسازی به‌صورت قطعی انجام شود.' },
                {
                    type: 'code', filename: 'GhostPlugin.java', lang: 'java', code:
                        `public interface GhostPlugin {

  default List<PluginSetupAction> getSetupActions() {
    return Collections.emptyList();
  }

  void activate(PluginContext context);

  default void deactivate() {}
}` },
                {
                    type: 'table', headers: ['متد', 'اجباری', 'توضیح'], rows: [
                        ['`activate(PluginContext)`', 'بله', 'یک‌بار پس از بارگذاری صدا زده می‌شود؛ محل ثبت اکستنشن‌ها و سرویس‌ها.'],
                        ['`deactivate()`', 'خیر، پیش‌فرض خالی', 'درست پیش از unload صدا زده می‌شود؛ محل خاتمه‌ی کارهایی که در activate شروع شده‌اند.'],
                        ['`getSetupActions()`', 'خیر، پیش‌فرض لیست خالی', 'دستورهای راه‌اندازی محیط (مثل نصب یک Language Server) که فقط با تأیید کاربر در ترمینال اجرا می‌شوند.']
                    ]
                },
                { type: 'note', variant: 'warn', text: 'اگر `Disposable`ای که از `register(...)` برمی‌گردد را با `registerDisposable` ثبت نکنی، هنگام unload کسی آن را برایت آزاد نمی‌کند.' }
            ]
        },

        'plugin-context': {
            title: 'PluginContext',
            filename: 'PluginContext.java',
            module: 'plugin-api',
            dek: 'همه‌چیزی که یک پلاگین در activate() برای معرفی خودش لازم دارد.',
            blocks: [
                { type: 'p', text: 'این رابط عمداً هیچ وابستگی به فریمورک اندروید ندارد؛ همین باعث می‌شود ماژول `plugin-api` یک وابستگی خالص JVM باقی بماند و منطق پلاگین بدون نیاز به SDK اندروید قابل کامپایل و تست باشد.' },
                {
                    type: 'code', filename: 'PluginContext.java', lang: 'java', code:
                        `public interface PluginContext {

  PluginDescriptor getDescriptor();

  MutableExtensionRegistry getExtensions();

  ServiceRegistry getServices();

  PluginLogger getLogger();

  Disposable registerDisposable(Disposable disposable);
}` },
                {
                    type: 'table', headers: ['متد', 'برمی‌گرداند', 'توضیح'], rows: [
                        ['`getDescriptor()`', '`PluginDescriptor`', 'هویت پلاگین جاری (شناسه، نام، نسخه، ...).'],
                        ['`getExtensions()`', '`MutableExtensionRegistry`', 'برای ثبت قابلیت در یک `ExtensionPoint`؛ همین رجیستری بین همه‌ی پلاگین‌ها مشترک است.'],
                        ['`getServices()`', '`ServiceRegistry`', 'دسترسی فقط‌خواندنی به سرویس‌های در دسترس این پلاگین — یک کپی مخصوص خودش.'],
                        ['`getLogger()`', '`PluginLogger`', 'لاگر با تگ خودکار شناسه‌ی پلاگین.'],
                        ['`registerDisposable(Disposable)`', '`Disposable`', 'برای رهاسازی قطعی هنگام unload — همیشه صدا بزن.']
                    ]
                },
                { type: 'note', variant: 'info', text: '`getServices()` نوع `ServiceRegistry` (فقط‌خواندنی) برمی‌گرداند، نه `MutableServiceRegistry`. پلاگین‌ها فقط اجازه‌ی *خواندن* سرویس‌های میزبان را دارند، نه ثبت سرویس جدید برای بقیه.' }
            ]
        },

        'plugin-descriptor': {
            title: 'PluginDescriptor',
            filename: 'PluginDescriptor.java',
            module: 'plugin-api',
            dek: 'هویت تغییرناپذیر و پارس‌شده‌ی یک پلاگین نصب‌شده.',
            blocks: [
                { type: 'p', text: 'نمونه‌ها تغییرناپذیرند و فقط با `Builder` ساخته می‌شوند. برابری (`equals`) بر اساس ترکیب `id` + `version` تعیین می‌شود.' },
                {
                    type: 'table', headers: ['فیلد', 'نوع', 'الزام'], rows: [
                        ['`id`', '`String`', 'باید با الگوی `[A-Za-z0-9_.-]+` مطابقت داشته باشد.'],
                        ['`name`', '`String`', 'نباید خالی باشد.'],
                        ['`version`', '`String`', 'نباید خالی باشد.'],
                        ['`entryClass`', '`String`', 'نام کامل کلاسی که `GhostPlugin` را پیاده می‌کند.'],
                        ['`description`, `author`, `source`', '`String`', 'اختیاری؛ پیش‌فرض رشته‌ی خالی.'],
                        ['`classPath`', '`List<String>`', 'اختیاری؛ پیش‌فرض لیست خالی.'],
                        ['`dependencies`', '`List<PluginDependency>`', 'اختیاری؛ پیش‌فرض لیست خالی.'],
                        ['`capabilities`', '`Set<String>`', 'اختیاری؛ پیش‌فرض مجموعه‌ی خالی.'],
                        ['`enabledByDefault`', '`boolean`', 'اختیاری؛ پیش‌فرض `true`.']
                    ]
                },
                {
                    type: 'code', filename: 'PluginDescriptor.java', lang: 'java', code:
                        `PluginDescriptor descriptor = PluginDescriptor
    .builder("com.example.rust-tools", "Rust Tools", "1.0.0", "com.example.RustPlugin")
    .description("rust-analyzer integration for Ghost IDE")
    .author("you")
    .capabilities(Set.of("lsp"))
    .build();` },
                { type: 'note', variant: 'info', text: 'در عمل، ساختن `PluginDescriptor` کار خود میزبان است — `GplPluginLoader` این را از روی `plugin.json` تو می‌سازد. تو معمولاً فقط از طریق `context.getDescriptor()` آن را می‌خوانی.' }
            ]
        },

        'plugin-dependency': {
            title: 'PluginDependency',
            filename: 'PluginDependency.java',
            module: 'plugin-api',
            dek: 'وابستگی اعلام‌شده‌ی یک پلاگین به شناسه‌ی پلاگین دیگر.',
            blocks: [
                { type: 'p', text: 'یک `record` ساده که پیش از فعال‌سازی پلاگین بررسی می‌شود. `id` نباید خالی باشد.' },
                {
                    type: 'code', filename: 'PluginDependency.java', lang: 'java', code:
                        `public record PluginDependency(String id, String minVersion, boolean optional) {

  public static PluginDependency required(String id) {
    return new PluginDependency(id, null, false);
  }

  public static PluginDependency optional(String id) {
    return new PluginDependency(id, null, true);
  }
}` },
                {
                    type: 'table', headers: ['فیلد', 'توضیح'], rows: [
                        ['`id`', 'شناسه‌ی پلاگین موردنیاز.'],
                        ['`minVersion`', 'کمترین نسخه‌ی قابل‌قبول، یا `null` یعنی هر نسخه‌ای قابل‌قبول است.'],
                        ['`optional`', 'اگر `true` باشد، نبودِ این وابستگی مانع فعال‌سازی نمی‌شود.']
                    ]
                },
                { type: 'p', text: 'استفاده‌ی معمول در `PluginDescriptor.Builder.dependencies(...)`:' },
                {
                    type: 'code', filename: 'PluginDescriptor.java', lang: 'java', code:
                        `.dependencies(List.of(
    PluginDependency.required("ir.hanzodev1375.ghostide.core"),
    PluginDependency.optional("com.example.icons-pack")
))` }
            ]
        },

        'plugin-logger': {
            title: 'PluginLogger',
            filename: 'PluginLogger.java',
            module: 'plugin-api',
            dek: 'رابط لاگ‌گیری که میزبان از طریق PluginContext در اختیار پلاگین می‌گذارد.',
            blocks: [
                {
                    type: 'code', filename: 'PluginLogger.java', lang: 'java', code:
                        `public interface PluginLogger {

  void debug(String message);

  void info(String message);

  void warn(String message, Throwable throwable);

  void error(String message, Throwable throwable);

  default void warn(String message) {
    warn(message, null);
  }

  default void error(String message) {
    error(message, null);
  }
}` },
                { type: 'p', text: 'در پیاده‌سازی فعلی میزبان، هر پیام با تگ `gpl:<شناسه‌ی پلاگین>` به Logcat اندروید فرستاده می‌شود؛ یعنی لاگ‌های هر پلاگین به‌طور خودکار قابل تفکیک از بقیه هستند.' },
                { type: 'code', filename: 'RustPlugin.java', lang: 'java', code: `context.getLogger().info("rust-analyzer connection started");` }
            ]
        },

        disposable: {
            title: 'Disposable',
            filename: 'Disposable.java',
            module: 'plugin-api',
            dek: 'یک واحد پاک‌سازی، متعلق به یک ثبت‌نام مشخص.',
            blocks: [
                { type: 'p', text: 'تقریباً هر عملیات ثبتی در این API — چه ثبت اکستنشن، چه ثبت سرویس — یک `Disposable` برمی‌گرداند. مسئولیت پلاگین این است که این مقدار را با `PluginContext.registerDisposable(Disposable)` نگه دارد تا زمان‌اجرا بتواند هنگام unload آن را آزاد کند.' },
                {
                    type: 'code', filename: 'Disposable.java', lang: 'java', code:
                        `@FunctionalInterface
public interface Disposable {

  Disposable NONE = () -> {};

  void dispose();
}` },
                {
                    type: 'code', filename: 'HelloGhostPlugin.java', lang: 'java', code:
                        `Disposable registration = context.getExtensions().register(
    PluginUiExtensionPoints.PLUGIN_SCREEN,
    new HelloScreen(),
    context.getDescriptor().getId(),
    0);

context.registerDisposable(registration);` },
                { type: 'note', variant: 'tip', text: 'چون `Disposable` یک رابط تابعی است، خود یک لامبدا هم می‌تواند یک `Disposable` باشد — مثلاً برای بستن یک منبع دستی: `context.registerDisposable(() -> myResource.close());`' }
            ]
        },

        'setup-actions': {
            title: 'PluginSetupAction',
            filename: 'PluginSetupAction.java',
            module: 'plugin-api',
            dek: 'یک دستور راه‌اندازی محیط، متعلق به کل پلاگین — نه به یک اکستنشن‌پوینت خاص.',
            blocks: [
                { type: 'p', text: 'برای کارهایی مثل نصب یک Language Server داخل محیط proot Debian طراحی شده. میزبان این دستورها را **فقط** از طریق یک هندآف تعاملی به ترمینال — با تأیید صریح کاربر — اجرا می‌کند؛ هیچ‌وقت به‌صورت خاموش (silent) اجرا نمی‌شوند.' },
                {
                    type: 'code', filename: 'PluginSetupAction.java', lang: 'java', code:
                        `public record PluginSetupAction(String id, String label, String command, String description) {

  public PluginSetupAction(String id, String label, String command) {
    this(id, label, command, "");
  }
}` },
                {
                    type: 'table', headers: ['فیلد', 'توضیح'], rows: [
                        ['`id`', 'شناسه‌ی پایدار این اکشن، داخل پلاگین خودش.'],
                        ['`label`', 'برچسب کوتاه و قابل‌نمایش به کاربر.'],
                        ['`command`', 'متن دستور شل، عیناً به یک login shell پاس داده می‌شود.'],
                        ['`description`', 'توضیح بلندتر که پیش از تأیید کاربر نمایش داده می‌شود.']
                    ]
                },
                {
                    type: 'code', filename: 'RustPlugin.java', lang: 'java', code:
                        `@Override
public List<PluginSetupAction> getSetupActions() {
  return List.of(new PluginSetupAction(
      "install-rust-analyzer",
      "نصب rust-analyzer",
      "rustup component add rust-analyzer",
      "rust-analyzer را از طریق rustup داخل محیط ترمینال نصب می‌کند."));
}` }
            ]
        },

        'plugin-storage': {
            title: 'PluginStorage',
            filename: 'PluginStorage.java',
            module: 'plugin-api',
            dek: 'فضای ذخیره‌سازی دائمی key-value مخصوص پلاگین خودت — بعد از ری‌استارت و reload هم می‌ماند.',
            blocks: [
                { type: 'p', text: 'هاست این سرویس را زیر `CoreServices.PLUGIN_STORAGE` منتشر می‌کند. هر پلاگین نمونه‌ی ایزوله‌ی خودش را می‌گیرد (با namespace بر اساس descriptor id)، پس هیچ‌وقت نمی‌توانی داده‌ی پلاگین دیگری را بخوانی یا بازنویسی کنی. چون این اینترفیس در `plugin-api` است، حتی پلاگین‌های LSP خالص بدون اندروید هم می‌توانند از آن استفاده کنند.' },
                {
                    type: 'code', filename: 'PluginStorage.java', lang: 'java', code:
                        `public interface PluginStorage {

  String getString(String key, String defValue);
  void putString(String key, String value);

  boolean getBoolean(String key, boolean defValue);
  void putBoolean(String key, boolean value);

  int getInt(String key, int defValue);
  void putInt(String key, int value);

  long getLong(String key, long defValue);
  void putLong(String key, long value);

  float getFloat(String key, float defValue);
  void putFloat(String key, float value);

  void remove(String key);
  boolean contains(String key);
  void clear();
}` },
                {
                    type: 'code', filename: 'MyPlugin.java', lang: 'java', code:
                        `PluginStorage storage = context.getServices().require(CoreServices.PLUGIN_STORAGE);

int runs = storage.getInt("runCount", 0);
storage.putInt("runCount", runs + 1);
storage.putString("lastPath", "/sdcard/Project/main.py");` },
                { type: 'note', variant: 'tip', text: 'مقادیر را کوچک نگه دار — این store برای blobهای بزرگ ساخته نشده. برای حجم بیشتر، فایل را داخل دایرکتوری خصوصی پلاگین‌ات بنویس.' }
            ]
        },

        'extension-point': {
            title: 'ExtensionPoint',
            filename: 'ExtensionPoint.java',
            module: 'plugin-api',
            dek: 'قراردادی که یک گروه از قابلیت‌های ثبت‌شده باید پیاده کنند.',
            blocks: [
                { type: 'p', text: 'یک `record` ساده شامل شناسه‌ی یکتا و نوع (`Class`) قراردادی که هر ثبت‌کننده باید پیاده کند. خود این پلتفرم فعلاً هفت اکستنشن‌پوینت آماده دارد:' },
                {
                    type: 'table', headers: ['اکستنشن‌پوینت', 'نوع', 'ماژول'], rows: [
                        ['`EditorExtensionPoints.LSP_SERVER_PROVIDER`', '`LspServerProvider`', '`ide-api`'],
                        ['`PluginUiExtensionPoints.PLUGIN_SCREEN`', '`PluginScreen`', '`ide-ui-api`'],
                        ['`PluginUiExtensionPoints.EDITOR_PANEL`', '`EditorPanel`', '`ide-ui-api`'],
                        ['`PluginUiExtensionPoints.EDITOR_ACTION_HANDLER`', '`EditorActionHandler`', '`ide-ui-api`'],
                        ['`PluginUiExtensionPoints.FILE_ICON_CONTRIBUTOR`', '`FileIconContributor`', '`ide-ui-api`'],
                        ['`IdeEvents.FILE_EVENT`', '`FileEventListener`', '`ide-ui-api`'],
                        ['`CoreExtensionPoints.PLUGIN_COMMAND`', '`PluginCommand`', '`plugin-api`']
                    ]
                },
                {
                    type: 'code', filename: 'ExtensionPoint.java', lang: 'java', code:
                        `public record ExtensionPoint<T>(String id, Class<T> type) {

  public ExtensionPoint {
    if (id == null || id.isBlank()) {
      throw new IllegalArgumentException("Extension point id must not be blank");
    }
    if (type == null) {
      throw new IllegalArgumentException("Extension point type must not be null");
    }
  }
}` },
                { type: 'p', text: 'برای جزئیات هر کدام، صفحه‌ی [LspServerProvider](#/lsp/lsp-server-provider)، [PluginScreen](#/ui/plugin-screen)، [EditorPanel](#/ui/editor-panel) یا [EditorActionHandler](#/ui/editor-action-handler) را ببین.' }
            ]
        },

        'extension-registry': {
            title: 'ExtensionRegistry',
            filename: 'ExtensionRegistry.java',
            module: 'plugin-api',
            dek: 'محل ثبت و خواندن قابلیت‌های ثبت‌شده در یک ExtensionPoint، مرتب‌شده بر اساس اولویت.',
            blocks: [
                { type: 'p', text: '`ExtensionRegistry` فقط‌خواندنی است. `MutableExtensionRegistry` که `PluginContext.getExtensions()` برمی‌گرداند، امکان ثبت و پاک‌سازی را هم اضافه می‌کند.' },
                {
                    type: 'code', filename: 'ExtensionRegistry.java', lang: 'java', code:
                        `public interface ExtensionRegistry {

  <T> List<ExtensionRegistration<T>> registrations(ExtensionPoint<T> point);

  default <T> List<T> extensions(ExtensionPoint<T> point) {
    return registrations(point).stream()
        .map(ExtensionRegistration::extension)
        .collect(Collectors.toList());
  }
}` },
                {
                    type: 'code', filename: 'MutableExtensionRegistry.java', lang: 'java', code:
                        `public interface MutableExtensionRegistry extends ExtensionRegistry {

  <T> Disposable register(ExtensionPoint<T> point, T extension, String ownerPluginId, int priority);

  default <T> Disposable register(ExtensionPoint<T> point, T extension) {
    return register(point, extension, PluginIds.CORE, 0);
  }

  void unregisterOwner(String ownerPluginId);
}` },
                { type: 'note', variant: 'warn', text: 'همیشه از overload چهارآرگومانه‌ی `register(point, extension, ownerPluginId, priority)` استفاده کن و `ownerPluginId` را برابر `context.getDescriptor().getId()` بگذار. overload دوآرگومانه از `PluginIds.CORE` به‌عنوان مالک استفاده می‌کند — یعنی هنگام unload شدنِ پلاگین تو، `unregisterOwner(شناسه‌ی تو)` هرگز آن ثبت را پیدا نمی‌کند و پاک نمی‌شود.' },
                {
                    type: 'code', filename: 'HelloGhostPlugin.java', lang: 'java', code:
                        `context.getExtensions().register(
    PluginUiExtensionPoints.PLUGIN_SCREEN,
    new HelloScreen(),
    context.getDescriptor().getId(),
    0);` },
                { type: 'h2', text: 'DefaultExtensionRegistry' },
                { type: 'p', text: 'پیاده‌سازی درون‌حافظه‌ای، مبتنی بر `CopyOnWriteArrayList` و امن برای دسترسی هم‌زمان. هنگام ثبت، اگر شیء اکستنشن نوع اعلام‌شده در `ExtensionPoint.type()` را پیاده نکند، `IllegalArgumentException` می‌اندازد.' },
                { type: 'p', text: '`registrations(point)` نتیجه را بر اساس اولویت **نزولی** مرتب می‌کند و در تساوی، بر اساس `ownerPluginId` مرتب‌سازی پایدار انجام می‌دهد — یعنی هر بار همان ترتیب را می‌گیری.' }
            ]
        },

        'configurable-extension': {
            title: 'ConfigurableExtension',
            filename: 'ConfigurableExtension.java',
            module: 'plugin-api',
            dek: 'هویت پایدار و متادیتای قابل‌نمایش برای یک اکستنشن — پایه‌ی هر قرارداد تایپ‌شده.',
            blocks: [
                { type: 'p', text: 'هر قرارداد اکستنشنِ تایپ‌شده (فعلاً فقط `LspServerProvider`) از این رابط ارث می‌برد.' },
                {
                    type: 'code', filename: 'ConfigurableExtension.java', lang: 'java', code:
                        `public interface ConfigurableExtension {

  String getId();

  default String getDisplayName() {
    return getId();
  }

  default String getDescription() {
    return "";
  }

  default boolean isEnabledByDefault() {
    return true;
  }

  default boolean isCanDisable() {
    return true;
  }
}` },
                {
                    type: 'table', headers: ['متد', 'پیش‌فرض'], rows: [
                        ['`getId()`', 'اجباری — بدون پیش‌فرض.'],
                        ['`getDisplayName()`', 'برابر `getId()`.'],
                        ['`getDescription()`', 'رشته‌ی خالی.'],
                        ['`isEnabledByDefault()`', '`true`.'],
                        ['`isCanDisable()`', '`true`.']
                    ]
                }
            ]
        },

        'plugin-command': {
            title: 'PluginCommand',
            filename: 'PluginCommand.java',
            module: 'plugin-api',
            dek: 'یک اکشن نام‌دار که کاربر می‌تواند اجرایش کند — بلوک سازنده‌ی command palette.',
            blocks: [
                { type: 'p', text: 'پیاده‌سازی‌هایت را در `CoreExtensionPoints.PLUGIN_COMMAND` ثبت کن تا هاست بتواند آن‌ها را لیست و اجرا کند. شناسه‌ها باید یکتا و به سبک reverse-domain باشند، مثل `com.example.myplugin.format`.' },
                {
                    type: 'code', filename: 'PluginCommand.java', lang: 'java', code:
                        `public interface PluginCommand {

  String getId();      // یکتا، reverse-domain
  String getTitle();   // برچسب کوتاه و قابل‌نمایش

  default String getDescription() {
    return "";
  }

  void execute();
}` },
                {
                    type: 'code', filename: 'FormatCommand.java', lang: 'java', code:
                        `public final class FormatCommand implements PluginCommand {

  @Override public String getId() { return "com.example.myplugin.format"; }

  @Override public String getTitle() { return "Format project"; }

  @Override public void execute() {
    // ممکن است خارج از ترد اصلی صدا زده شود — قبل از UI به ترد اصلی برو
  }
}` },
                {
                    type: 'code', filename: 'MyPlugin.java', lang: 'java', code:
                        `context.registerDisposable(
    context.getExtensions().register(
        CoreExtensionPoints.PLUGIN_COMMAND,
        new FormatCommand(),
        context.getDescriptor().getId(),
        0));` },
                { type: 'note', variant: 'tip', text: '`execute()` ممکن است از هر تردی فراخوانی شود. خودت قبل از دست زدن به ادیتور یا هر view ای به ترد اصلی سوییچ کن.' }
            ]
        },

        'service-key': {
            title: 'ServiceKey',
            filename: 'ServiceKey.java',
            module: 'plugin-api',
            dek: 'هویت یک سرویسِ در دسترس‌گذاشته‌شده توسط میزبان.',
            blocks: [
                {
                    type: 'code', filename: 'ServiceKey.java', lang: 'java', code:
                        `public record ServiceKey<T>(String name, Class<T> type) {

  public ServiceKey {
    if (name == null || name.isBlank()) {
      throw new IllegalArgumentException("Service key name must not be blank");
    }
    if (type == null) {
      throw new IllegalArgumentException("Service key type must not be null");
    }
  }
}` },
                { type: 'p', text: 'ماژول `ide-ui-api` شش کلید آماده منتشر می‌کند — `IdeHostServices.EDITOR_HOST`, `FILE_MANAGER_HOST`, `CODE_RUNNER_HOST`, `PLUGIN_ANDROID_CONTEXT`, `PROOT_PROCESS_LAUNCHER` و `UI_FEEDBACK`. جزئیات در صفحه‌ی [IdeHostServices](#/ui/ide-host-services).' }
            ]
        },

        'service-registry': {
            title: 'ServiceRegistry',
            filename: 'ServiceRegistry.java',
            module: 'plugin-api',
            dek: 'جستجوی فقط‌خواندنی سرویس‌هایی که میزبان در دسترس پلاگین گذاشته.',
            blocks: [
                {
                    type: 'code', filename: 'ServiceRegistry.java', lang: 'java', code:
                        `public interface ServiceRegistry {

  <T> T get(ServiceKey<T> key);

  default <T> T require(ServiceKey<T> key) {
    T service = get(key);
    if (service == null) {
      throw new IllegalStateException("Required service '" + key.name() + "' is not registered");
    }
    return service;
  }
}` },
                {
                    type: 'code', filename: 'HelloGhostPlugin.java', lang: 'java', code:
                        `EditorHost editor = context.getServices().require(IdeHostServices.EDITOR_HOST);
String openPath = editor.getOpenFile().getAbsolutePath();` },
                { type: 'h2', text: 'MutableServiceRegistry و DefaultServiceRegistry' },
                { type: 'p', text: '`MutableServiceRegistry` امکان `register`, `unregister` و `copy()` را اضافه می‌کند. `DefaultServiceRegistry` پیاده‌سازی درون‌حافظه‌ایِ آن است، مبتنی بر `ConcurrentHashMap`.' },
                { type: 'note', variant: 'info', text: '`copy()` دقیقاً همان مکانیزمی است که هر پلاگین را از بقیه ایزوله نگه می‌دارد: میزبان یک کپی مستقل از `GlobalRegistry.services()` می‌سازد و فقط داخل همان کپی، `PLUGIN_ANDROID_CONTEXT` مخصوص همان پلاگین را ثبت می‌کند.' }
            ]
        },

        'global-registry': {
            title: 'GlobalRegistry',
            filename: 'GlobalRegistry.java',
            module: 'plugin-api',
            dek: 'نگه‌دارنده‌ی استاتیک و مشترکِ رجیستری اکستنشن و سرویس برای کل پردازه.',
            blocks: [
                {
                    type: 'code', filename: 'GlobalRegistry.java', lang: 'java', code:
                        `public final class GlobalRegistry {

  public static MutableExtensionRegistry extensions() {
    return EXTENSIONS;
  }

  public static MutableServiceRegistry services() {
    return SERVICES;
  }
}` },
                { type: 'p', text: 'زندگی این کلاس در `plugin-api` است تا هم `:editor` و هم `:app` بدون وابستگی به یکدیگر بتوانند به آن دسترسی داشته باشند — `:editor` برای خواندن providerهای ثبت‌شده، `:app` برای نوشتن ثبت‌های داخلی و ثبت‌های پلاگین‌ها.' },
                { type: 'note', variant: 'warn', text: 'کد پلاگین معمولاً هرگز مستقیم `GlobalRegistry` را صدا نمی‌زند. همیشه از `context.getExtensions()` و `context.getServices()` استفاده کن — همان‌ها هستند که میزبان برایت مهیا کرده، اما با محدودیت و ایزوله‌سازی درست.' }
            ]
        },

        'lsp-overview': {
            title: 'نمای کلی ماژول ide-api',
            filename: 'ide-api/README.md',
            module: 'ide-api',
            dek: 'اکستنشن‌پوینتی که به ادیتور اجازه می‌دهد یک Language Server تازه را از یک پلاگین بشناسد.',
            blocks: [
                { type: 'p', text: '`ide-api` روی `plugin-api` و `org.eclipse.lsp4j` سوار می‌شود و دقیقاً یک اکستنشن‌پوینت اضافه می‌کند: `EditorExtensionPoints.LSP_SERVER_PROVIDER`. اگر زبانی که می‌خواهی پشتیبانی کنی از قبل داخل اپ نیست، از همین‌جا وارد می‌شوی.' },
                { type: 'note', variant: 'info', text: 'ادیتور از قبل با سرورهایی مثل Clangd، OmniSharp (سی‌شارپ)، HTML، CSS، Emmet، Go، JSON، Markdown، PHP، Pylsp (پایتون)، Ruby (Solargraph)، Sass، TypeScript و Vue کار می‌کند — همه داخل محیط proot Debian اجرا می‌شوند. `LSP_SERVER_PROVIDER` برای زبان‌هایی است که این لیست را پوشش نمی‌دهد.' },
                { type: 'p', text: 'برای معرفی سرور جدید، سه چیز لازم داری: یک `LspServerProvider` که تشخیص می‌دهد چه فایلی را پوشش می‌دهد، یک `LspServerDefinition` که مشخصات سرور را توصیف می‌کند، و یک `LspServerConnection` که واقعاً پروسه/جریان I/O سرور را مدیریت می‌کند.' }
            ]
        },

        'lsp-server-provider': {
            title: 'LspServerProvider',
            filename: 'LspServerProvider.java',
            module: 'ide-api',
            dek: 'یک Language Server را به ادیتور معرفی می‌کند.',
            blocks: [
                { type: 'p', text: 'نمونه‌ای از این رابط را در اکستنشن‌پوینت `EditorExtensionPoints.LSP_SERVER_PROVIDER` ثبت کن.' },
                {
                    type: 'code', filename: 'LspServerProvider.java', lang: 'java', code:
                        `public interface LspServerProvider extends ConfigurableExtension {

  default int getPriority() {
    return 0;
  }

  boolean supports(LspServerRequest request);

  LspServerDefinition createDefinition(LspServerRequest request);
}` },
                {
                    type: 'table', headers: ['متد', 'توضیح'], rows: [
                        ['`supports(request)`', 'بر اساس `LspServerRequest` (مسیر پروژه + فایل) تصمیم می‌گیرد این provider مسئول این فایل هست یا نه.'],
                        ['`createDefinition(request)`', 'وقتی `supports` مثبت بود، `LspServerDefinition` کامل را می‌سازد و برمی‌گرداند.'],
                        ['`getPriority()`', 'وقتی چند provider یک فایل را پوشش می‌دهند، بالاترین اولویت انتخاب می‌شود.']
                    ]
                },
                {
                    type: 'code', filename: 'RustLspProvider.java', lang: 'java', code:
                        `public final class RustLspProvider implements LspServerProvider {

  @Override
  public String getId() {
    return "com.example.rust-analyzer";
  }

  @Override
  public boolean supports(LspServerRequest request) {
    return "rs".equalsIgnoreCase(request.extension());
  }

  @Override
  public LspServerDefinition createDefinition(LspServerRequest request) {
    return LspServerDefinition
        .builder(getId(), Set.of("rs"), "rust-analyzer", RustConnection::new)
        .build();
  }
}` },
                {
                    type: 'code', filename: 'RustPlugin.java', lang: 'java', code:
                        `context.getExtensions().register(
    EditorExtensionPoints.LSP_SERVER_PROVIDER,
    new RustLspProvider(),
    context.getDescriptor().getId(),
    0);` }
            ]
        },

        'lsp-server-definition': {
            title: 'LspServerDefinition',
            filename: 'LspServerDefinition.java',
            module: 'ide-api',
            dek: 'هر چیزی که ادیتور برای مسیریابی فایل‌ها به یک Language Server و تطبیق‌دادن اتصال لازم دارد.',
            blocks: [
                { type: 'p', text: 'تغییرناپذیر است و فقط با `Builder` ساخته می‌شود. اپ به‌ازای هر ترکیب شناسه/پروژه، یک اتصال مشترک نگه می‌دارد.' },
                {
                    type: 'table', headers: ['فیلد Builder', 'نوع', 'پیش‌فرض'], rows: [
                        ['`grammarScopeName(String)`', 'String', '—'],
                        ['`expectedCapabilities(ServerCapabilities)`', 'lsp4j `ServerCapabilities`', '—'],
                        ['`initializationOptions(Object)`', 'Object', '—'],
                        ['`configuration(Object)`', 'Object', '—'],
                        ['`enableInlayHints(boolean)`', 'boolean', '`true`'],
                        ['`enableSignatureHelp(boolean)`', 'boolean', '`true`'],
                        ['`initializationTimeoutMillis(int)`', 'int', '`10000`'],
                        ['`traceIncomingMessages(boolean)`', 'boolean', '`false`'],
                        ['`textMateGrammarLink(String)`', 'String', '—']
                    ]
                },
                {
                    type: 'code', filename: 'RustLspProvider.java', lang: 'java', code:
                        `LspServerDefinition definition = LspServerDefinition
    .builder("com.example.rust-analyzer", Set.of("rs"), "rust-analyzer", RustConnection::new)
    .grammarScopeName("source.rust")
    .initializationTimeoutMillis(15_000)
    .enableInlayHints(true)
    .build();` },
                { type: 'note', variant: 'warn', text: 'اگر `fileExtensions` خالی باشد، `displayName` خالی باشد، یا `initializationTimeoutMillis` صفر یا منفی باشد، سازنده بلافاصله `IllegalArgumentException` می‌اندازد.' }
            ]
        },

        'lsp-server-connection': {
            title: 'LspServerConnection',
            filename: 'LspServerConnection.java',
            module: 'ide-api',
            dek: 'اتصال واقعی به یک Language Server — جریان ورودی/خروجی خام پروتکل LSP.',
            blocks: [
                {
                    type: 'code', filename: 'LspServerConnection.java', lang: 'java', code:
                        `public interface LspServerConnection extends AutoCloseable {

  void start() throws IOException;

  OutputStream getOutputStream();

  InputStream getInputStream();

  boolean isClosed();

  @Override
  void close();
}` },
                { type: 'note', variant: 'warn', text: 'پیاده‌سازی باید فقط داخل `start()` واقعاً پروسه/اتصال را راه بیندازد — نه داخل سازنده. همچنین هر خروجی تشخیصی سرور باید به stderr برود، نه به `getOutputStream()`، وگرنه فریمینگ stdio پروتکل LSP خراب می‌شود.' },
                {
                    type: 'code', filename: 'LspServerConnectionFactory.java', lang: 'java', code:
                        `@FunctionalInterface
public interface LspServerConnectionFactory {
  LspServerConnection create(LspServerRequest request);
}` },
                {
                    type: 'code', filename: 'LspServerRequest.java', lang: 'java', code:
                        `public record LspServerRequest(File projectRoot, File file) {

  public String extension() {
    String name = file.getName();
    int dot = name.lastIndexOf('.');
    if (dot < 0 || dot == name.length() - 1) {
      return "";
    }
    return name.substring(dot + 1).toLowerCase(Locale.ROOT);
  }
}` }
            ]
        },

        'ui-overview': {
            title: 'نمای کلی ماژول ide-ui-api',
            filename: 'ide-ui-api/README.md',
            module: 'ide-ui-api',
            dek: 'اکستنشن‌پوینت و سرویس‌هایی برای افزودن رابط کاربری و دسترسی به میزبان.',
            blocks: [
                { type: 'p', text: '`ide-ui-api` یک کتابخانه‌ی اندرویدی است (namespace: `ir.hanzodev1375.ghostide.ide.ui.api`، `minSdk 26`، `compileSdk 36`) که روی `plugin-api` و `androidx.appcompat` سوار می‌شود.' },
                { type: 'note', variant: 'info', text: 'اندروید اجازه نمی‌دهد کد بارگذاری‌شده در زمان اجرا یک `<activity>` تازه در مانیفست میزبان اعلام کند. به همین دلیل "صفحه" یک پلاگین در واقع یک `Fragment` است، نه یک Activity — همان تکنیکی که چارچوب‌های پلاگین اندرویدی معمولاً استفاده می‌کنند. اپ میزبان یک اکتیویتی میزبان‌کننده‌ی صفحه دارد که این Fragment را نمایش می‌دهد.' },
                { type: 'p', text: 'برای افزودن یک صفحه، رابط [PluginScreen](#/ui/plugin-screen) را ببین. برای بازکردن پنل داخل ادیتورِ در حال اجرا، [EditorPanel](#/ui/editor-panel) را ببین. برای دسترسی به ادیتور یا فایل‌منیجر باز، رابط‌های [EditorHost](#/ui/editor-host) و [FileManagerHost](#/ui/file-manager-host) را ببین. برای اجرای کد یا دستور شل، [CodeRunnerHost](#/ui/code-runner-host) را ببین. برای هندل محلی دستورهای سرور زبان، [EditorActionHandler](#/ui/editor-action-handler) را ببین.' }
            ]
        },

        'ide-host-services': {
            title: 'IdeHostServices',
            filename: 'IdeHostServices.java',
            module: 'ide-ui-api',
            dek: 'کلیدهای سرویسی که میزبان منتشر می‌کند تا پلاگین از `services()` پیدایشان کند.',
            blocks: [
                {
                    type: 'code', filename: 'IdeHostServices.java', lang: 'java', code:
                        `public final class IdeHostServices {

  public static final ServiceKey<EditorHost> EDITOR_HOST =
      new ServiceKey<>("ir.hanzodev1375.ghostide.ui.editorHost", EditorHost.class);

  public static final ServiceKey<FileManagerHost> FILE_MANAGER_HOST =
      new ServiceKey<>("ir.hanzodev1375.ghostide.ui.fileManagerHost", FileManagerHost.class);

  public static final ServiceKey<CodeRunnerHost> CODE_RUNNER_HOST =
      new ServiceKey<>("ir.hanzodev1375.ghostide.ui.codeRunnerHost", CodeRunnerHost.class);

  public static final ServiceKey<Context> PLUGIN_ANDROID_CONTEXT =
      new ServiceKey<>("ir.hanzodev1375.ghostide.ui.pluginAndroidContext", Context.class);

  public static final ServiceKey<ProotProcessLauncher> PROOT_PROCESS_LAUNCHER =
      new ServiceKey<>("ir.hanzodev1375.ghostide.ui.prootProcessLauncher", ProotProcessLauncher.class);
}` },
                { type: 'h2', text: 'PLUGIN_ANDROID_CONTEXT' },
                { type: 'p', text: 'یک `Context` مخصوص خودِ پلاگین، نه اکتیویتی میزبان. برای `inflate` کردن layout یک `PluginScreen` باید از همین Context عبور کنی، نه از inflater پیش‌فرض اکتیویتی میزبان — وگرنه شناسه‌های `R.layout` خودِ پلاگین resolve نمی‌شوند.' },
                {
                    type: 'code', filename: 'HelloScreenFragment.java', lang: 'java', code:
                        `Context pluginContext = context.getServices().require(IdeHostServices.PLUGIN_ANDROID_CONTEXT);
LayoutInflater.from(pluginContext)
    .cloneInContext(pluginContext)
    .inflate(R.layout.my_screen, container, false);` },
                { type: 'h2', text: 'CODE_RUNNER_HOST' },
                { type: 'p', text: 'سرویسی که پلاگین وقتی می‌خواهد کدی یا دستوری را اجرا کند از آن استفاده می‌کند — [CodeRunnerHost](#/ui/code-runner-host) را ببین.' }
            ]
        },

        'editor-host': {
            title: 'EditorHost',
            filename: 'EditorHost.java',
            module: 'ide-ui-api',
            dek: 'سرویسی که زیر IdeHostServices.EDITOR_HOST منتشر می‌شود.',
            blocks: [
                { type: 'p', text: 'فقط قابلیت‌هایی را توصیف می‌کند که یک پلاگین از صفحه‌ی ادیتور لازم دارد — هرگز کلاس‌های واقعی `EditorActivity`/`IdeEditor` را افشا نمی‌کند، تا `:app` تنها ماژولی باقی بماند که آن‌ها را می‌شناسد.' },
                {
                    type: 'code', filename: 'EditorHost.java', lang: 'java', code:
                        `public interface EditorHost {

  File getProjectRoot();

  File getOpenFile();

  String getEditorText();

  void setEditorText(String text);

  void openFile(File file);

  Context getContext();

  // اختیاری: ادیتور خام، یا null وقتی فایلی باز نیست
  Object getEditor();
}` },
                {
                    type: 'code', filename: 'HelloGhostPlugin.java', lang: 'java', code:
                        `EditorHost editor = context.getServices().require(IdeHostServices.EDITOR_HOST);
editor.setEditorText(editor.getEditorText() + "\\n// added by HelloGhost");` },
                { type: 'h2', text: 'getEditor()' },
                { type: 'p', text: 'متدهای ساده‌ی بالا برای بیشتر پلاگین‌ها کافی‌اند. `getEditor()` راه فرار است: خودِ ویجت ادیتورِ پشت تب فعلی را برمی‌گرداند — یعنی `IdeEditor` میزبان — به‌صورت `Object`، یا وقتی فایلی باز نیست `null` برمی‌گرداند. `IdeEditor` در ماژول ادیتورِ میزبان زندگی می‌کند نه در این API، پس آن ماژول را به‌صورت `compileOnly` اضافه کن و cast کن:' },
                {
                    type: 'code', filename: 'HelloGhostPlugin.java', lang: 'java', code:
                        `Object raw = editor.getEditor();
if (raw instanceof IdeEditor ide) {   // add ':editor' as compileOnly to cast
  String path = ide.getCurrentFilePath();
  ide.getLspEditor();
}` }
            ]
        },

        'file-manager-host': {
            title: 'FileManagerHost',
            filename: 'FileManagerHost.java',
            module: 'ide-ui-api',
            dek: 'سرویسی که زیر IdeHostServices.FILE_MANAGER_HOST منتشر می‌شود.',
            blocks: [
                {
                    type: 'code', filename: 'FileManagerHost.java', lang: 'java', code:
                        `public interface FileManagerHost {

  File getRootDirectory();

  File getSelectedFile();

  void refresh();

  void openFile(File file);

  Context getContext();
}` },
                {
                    type: 'code', filename: 'HelloGhostPlugin.java', lang: 'java', code:
                        `FileManagerHost fileManager = context.getServices().require(IdeHostServices.FILE_MANAGER_HOST);
fileManager.refresh();` }
            ]
        },

        'code-runner-host': {
            title: 'CodeRunnerHost',
            filename: 'CodeRunnerHost.java',
            module: 'ide-ui-api',
            dek: 'یک دستور شل یا یک فایل منبع را در ترمینال IDE اجرا می‌کند — دقیقاً مثل زدن دکمه‌ی اجرای (FAB) ادیتور.',
            blocks: [
                { type: 'p', text: 'میزبان این سرویس را زیر `IdeHostServices.CODE_RUNNER_HOST` ثبت می‌کند. هر وقت پلاگین‌ت نیاز به اجرای کد یا دستور شل داشت از آن استفاده کن — دستور به ترمینال IDE سپرده می‌شود که یا به‌صورت bottom sheet باز می‌شود یا تمام‌صفحه.' },
                {
                    type: 'code', filename: 'CodeRunnerHost.java', lang: 'java', code:
                        `public interface CodeRunnerHost {

  void runShell(String command, boolean asBottomSheet);

  void runCurrentFile(boolean asBottomSheet);

  void runFile(String filePath, boolean asBottomSheet);

  boolean isSupported(String filePath);

  ExecResult exec(String command, Consumer<String> onOutputLine);

  record ExecResult(int exitCode, String output) {
    public boolean success() { return exitCode == 0; }
  }
}` },
                {
                    type: 'table', headers: ['متد', 'توضیح'], rows: [
                        ['`runShell(command, asBottomSheet)`', 'هر دستور شلی را در ترمینال اجرا می‌کند.'],
                        ['`runCurrentFile(asBottomSheet)`', 'فایلی را که الان در ادیتور باز است اجرا می‌کند، مثل دکمه‌ی FAB.'],
                        ['`runFile(filePath, asBottomSheet)`', 'یک فایل مشخص را با مسیر آن اجرا می‌کند.'],
                        ['`isSupported(filePath)`', 'اگر `true` بود یعنی اجراکننده آن نوع فایل را می‌شناسد.'],
                        ['`exec(command, onOutputLine)`', 'اجرای headless بدون هیچ UI ای — یک `ExecResult` برمی‌گرداند. بلاکینگ است؛ از ترد پس‌زمینه صدا بزن.']
                    ]
                },
                { type: 'p', text: 'آرگومان `asBottomSheet` تعیین می‌کند ترمینال چطور نمایش داده شود: `true` یعنی bottom sheet، `false` یعنی تمام‌صفحه.' },
                {
                    type: 'code', filename: 'HelloGhostPlugin.java', lang: 'java', code:
                        `CodeRunnerHost runner = context.getServices().require(IdeHostServices.CODE_RUNNER_HOST);

// اجرای هر دستوری در ترمینال
runner.runShell("python3 main.py", true);

// اجرای فایل بازِ فعلی ادیتور
runner.runCurrentFile();

// اجرای یک فایل مشخص
runner.runFile("/sdcard/Project/main.py", false);

// بررسی قبل از اجرا
if (runner.isSupported("/sdcard/Project/main.py")) {
  runner.runFile("/sdcard/Project/main.py", true);
}` },
                { type: 'note', variant: 'tip', text: '`runCurrentFile()` مسیر را از `EditorPanel`های ثبت‌شده می‌گیرد: اولین `EditorPanel.getLastPath()` غیرخالی برنده است، وگرنه به فایل بازِ ادیتور برمی‌گردد. [EditorPanel](#/ui/editor-panel) را ببین.' },
                { type: 'h2', text: 'exec() — اجرای headless با گرفتن خروجی' },
                { type: 'p', text: 'وقتی خروجی یک دستور را برنامه‌نویسی‌شده می‌خواهی (نه نمایش در ترمینال)، از `exec()` استفاده کن. این متد از طریق `sh -c` و بدون هیچ UI ای اجرا می‌کند و تا تموم شدن پروسس بلاک می‌شود — همیشه از ترد پس‌زمینه صدا بزنش. `Consumer<String>` اختیاری هر خط از stdout/stderr (ادغام‌شده) را همان لحظه دریافت می‌کند.' },
                {
                    type: 'code', filename: 'GitStatusTask.java', lang: 'java', code:
                        `CodeRunnerHost.ExecResult result =
    runner.exec("git -C /sdcard/Project status --porcelain", null);

if (result.success()) {
  String listing = result.output();   // هرجور خواستی پردازشش کن
} else {
  ui.toast("git failed: " + result.exitCode());
}` },
                { type: 'note', variant: 'warn', text: '`exec()` در محیط شل خودِ اپ اجرا می‌شود که لزوماً با سشن ترمینال تعاملی یکی نیست. باینری‌های داخل rootfs پرووت باید از [ProotProcessLauncher](#/ui/ui-overview) بروند.' }
            ]
        },

        'editor-panel': {
            title: 'EditorPanel',
            filename: 'EditorPanel.java',
            module: 'ide-ui-api',
            dek: 'یک پنل UI که پلاگین داخل صفحه‌ی بازِ ادیتور باز می‌کند — معادل «webview / side panel» در VS Code.',
            blocks: [
                { type: 'p', text: 'یک پیاده‌سازی را در `PluginUiExtensionPoints.EDITOR_PANEL` ثبت کن. میزبان فقط یک‌بار، وقتی پنل اولین بار نمایش داده می‌شود، `View` آن را می‌سازد و تا پایان عمر اکتیویتی نگهش می‌دارد؛ پس view را تنبل (lazy) بساز و حالتش را داخل خودش نگه دار.' },
                {
                    type: 'code', filename: 'EditorPanel.java', lang: 'java', code:
                        `public interface EditorPanel {

  String getId();

  String getTitle();

  View createView();

  // اختیاری: این پنل به چه فایل/مسیری اشاره دارد
  default String getLastPath() {
    return null;
  }
}` },
                { type: 'p', text: 'برای inflate باید از Context مخصوص خودِ پلاگین استفاده کنی، وگرنه شناسه‌های `R.layout` تو resolve نمی‌شوند:' },
                {
                    type: 'code', filename: 'MyPanel.java', lang: 'java', code:
                        `Context pluginContext = context.getServices().require(IdeHostServices.PLUGIN_ANDROID_CONTEXT);
View view = LayoutInflater.from(pluginContext)
    .cloneInContext(pluginContext)
    .inflate(R.layout.my_panel, root, false);` },
                { type: 'h2', text: 'getLastPath()' },
                { type: 'p', text: 'مسیری را برمی‌گرداند که پنل در حال حاضر درباره‌ی آن است — مثلاً فایلی که کاربر پنل انتخاب کرده. میزبان هنگام اجرای فایل جاری (`CodeRunnerHost.runCurrentFile()`) به `getLastPath()` همه‌ی پنل‌ها نگاه می‌کند؛ اگر `null` برگردانی، به فایل بازِ ادیتور سقوط می‌کند.' },
                { type: 'note', variant: 'tip', text: 'برای نمایش پنل با نوع پنجره‌ی متفاوت، `getState()` را override کن یا `setState(PluginStateMod)` صدا بزن — side sheet، dialog، bottom sheet و بقیه همگی پشتیبانی می‌شوند.' }
            ]
        },

        'editor-action-handler': {
            title: 'EditorActionHandler',
            filename: 'EditorActionHandler.java',
            module: 'ide-ui-api',
            dek: 'به پلاگین اجازه می‌دهد دستورهای LSP خودش را محلی مدیریت کند، به‌جای فرستادن دوباره‌شان به سرور زبان.',
            blocks: [
                { type: 'p', text: 'دستورهایی که ادیتور از code actionهای LSP دریافت می‌کند معمولاً با `workspace/executeCommand` دوباره به سرور فرستاده می‌شوند. ثبت یک `EditorActionHandler` در `PluginUiExtensionPoints.EDITOR_ACTION_HANDLER` به پلاگین‌ت اجازه می‌دهد دستورهای خودش را محلی هندل کند — جایی که خودِ ویجت ادیتور در دسترس است.' },
                {
                    type: 'code', filename: 'EditorActionHandler.java', lang: 'java', code:
                        `public interface EditorActionHandler {

  String getCommandId();

  boolean execute(Object editor, String command, List<Object> arguments);
}` },
                {
                    type: 'table', headers: ['متد', 'توضیح'], rows: [
                        ['`getCommandId()`', 'شناسه‌ی دستوری که این هندلر مالکش است — ادیتور فقط برای دستورهای با همین شناسه صداات می‌زند.'],
                        ['`execute(editor, command, arguments)`', 'دستور را اجرا می‌کند. اگر `true` برگردانی یعنی هندل شد؛ `false` یعنی ادیتور مثل قبل به سرور بفرستد.']
                    ]
                },
                { type: 'p', text: 'آرگومان `editor` همان ویجت خام `IdeEditor` پشت اکشن است (به‌صورت `Object`، چون `IdeEditor` در ماژول ادیتورِ میزبان زندگی می‌کند نه در این API)، یا وقتی ادیتوری متصل نیست `null`. برای cast کردن، ماژول ادیتور میزبان را به‌صورت `compileOnly` اضافه کن:' },
                {
                    type: 'code', filename: 'MyActionHandler.java', lang: 'java', code:
                        `public final class MyActionHandler implements EditorActionHandler {

  @Override
  public String getCommandId() {
    return "com.example.myplugin.run";
  }

  @Override
  public boolean execute(Object editor, String command, List<Object> arguments) {
    if (editor instanceof IdeEditor ide) {   // add ':editor' as compileOnly to cast
      ide.getCurrentFilePath();
    }
    return true;
  }
}` },
                {
                    type: 'code', filename: 'RustPlugin.java', lang: 'java', code:
                        `context.getExtensions().register(
    PluginUiExtensionPoints.EDITOR_ACTION_HANDLER,
    new MyActionHandler(),
    context.getDescriptor().getId(),
    0);` },
                { type: 'note', variant: 'warn', text: '`execute` ممکن است روی یک thread پس‌زمینه اجرا شود؛ قبل از دست‌زدن به ادیتور به thread اصلی برگرد.' }
            ]
        },

        'ui-feedback-host': {
            title: 'UiFeedbackHost',
            filename: 'UiFeedbackHost.java',
            module: 'ide-ui-api',
            dek: 'نمایش toast و دیالوگ‌های ساده (ورودی، تأیید) به نام پلاگین شما — بدون نیاز به Activity.',
            blocks: [
                { type: 'p', text: 'هاست این سرویس را زیر `IdeHostServices.UI_FEEDBACK` منتشر می‌کند. همه‌ی متدهایش از هر thread ای امن هستند — هاست خودش داخلاً به ترد اصلی می‌رود. اگر Activity ای برای میزبانی دیالوگ در دسترس نباشد، callback ها با `null`/`false` صدا زده می‌شوند؛ پس همیشه این حالت‌ها را هندل کن.' },
                {
                    type: 'code', filename: 'UiFeedbackHost.java', lang: 'java', code:
                        `public interface UiFeedbackHost {

  default void toast(String message) { toast(message, false); }
  void toast(String message, boolean longDuration);

  void promptInput(String title, String prefill, InputCallback callback);

  void confirm(String title, String message, ConfirmCallback callback);

  @FunctionalInterface interface InputCallback {
    void onInput(String text);   // null = کنسل شد
  }

  @FunctionalInterface interface ConfirmCallback {
    void onResult(boolean confirmed);
  }
}` },
                {
                    type: 'code', filename: 'MyPlugin.java', lang: 'java', code:
                        `UiFeedbackHost ui = context.getServices().require(IdeHostServices.UI_FEEDBACK);

ui.toast("۴۲ فایل ایندکس شد");

ui.confirm("فرمت همه؟", "این کار ۱۲ فایل را بازنویسی می‌کند.", confirmed -> {
  if (confirmed) formatAll();
});

ui.promptInput("اسم پروژه", "my-app", name -> {
  if (name == null) return; // کنسل شد
  createProject(name);
});` },
                { type: 'note', variant: 'tip', text: 'به جای نگه داشتن یک `Context` برای خودت، از این سرویس استفاده کن: همیشه همان صفحه‌ای هدف‌گیری می‌شود که کاربر الان به آن نگاه می‌کند.' }
            ]
        },

        'ide-events': {
            title: 'IdeEvents / FileEvent',
            filename: 'IdeEvents.java',
            module: 'ide-ui-api',
            dek: 'گوش دادن به تغییرات چرخه‌ی عمر فایل در کل IDE — باز شدن، ذخیره، بسته شدن، حذف، تغییر نام.',
            blocks: [
                { type: 'p', text: 'یک `FileEventListener` را در `IdeEvents.FILE_EVENT` ثبت کن. لیسنر تو موقع unload شدن پلاگین به‌صورت خودکار حذف می‌شود. لیسنر ممکن است از هر thread ای صدا زده شود (ذخیره و حذف روی ترد پس‌زمینه اتفاق می‌افتند) — قبل از کار با UI به ترد اصلی برو.' },
                {
                    type: 'table', headers: ['نوع رویداد', 'معنی'], rows: [
                        ['`OPENED`', 'یک فایل در تب جدیدی از ادیتور باز شد (نه فقط فوکوس مجدد).'],
                        ['`SAVED`', 'ادیتور محتوای یک فایل را روی دیسک نوشت.'],
                        ['`CLOSED`', 'تبی که این فایل را نشان می‌داد بسته شد.'],
                        ['`DELETED`', 'یک فایل یا پوشه از دیسک حذف شد.'],
                        ['`RENAMED`', 'یک فایل یا پوشه rename/move شد؛ `path()` مسیر جدید و `previousPath()` مسیر قبلی است.']
                    ]
                },
                {
                    type: 'code', filename: 'MyPlugin.java', lang: 'java', code:
                        `context.registerDisposable(
    context.getExtensions().register(
        IdeEvents.FILE_EVENT,
        event -> {
          switch (event.type()) {
            case SAVED -> lint(event.path());
            case RENAMED -> updateIndex(event.previousPath(), event.path());
            case OPENED, CLOSED, DELETED -> {}
          }
        },
        context.getDescriptor().getId(),
        0));` },
                { type: 'p', text: 'مسیرها absolute هستند. خود هاست هم برای ارسال رویداد به همه‌ی لیسنرها از همان متد استاتیک `IdeEvents.post(FileEvent)` استفاده می‌کند.' },
                { type: 'note', variant: 'tip', text: 'کاربردهای معمول: فرمت خودکار موقع ذخیره، باطل کردن ایندکس موقع حذف/rename، بازیابی session موقع باز شدن.' }
            ]
        },

        'plugin-screen': {
            title: 'PluginScreen',
            filename: 'PluginScreen.java',
            module: 'ide-ui-api',
            dek: 'یک صفحه‌ی کامل که یک پلاگین معرفی می‌کند.',
            blocks: [
                {
                    type: 'code', filename: 'PluginScreen.java', lang: 'java', code:
                        `public interface PluginScreen {

  String getId();

  String getTitle();

  Fragment createFragment();
}` },
                { type: 'p', text: 'نمونه را در اکستنشن‌پوینت `PluginUiExtensionPoints.PLUGIN_SCREEN` ثبت کن. layout و منابع Fragment از بسته‌ی `.gpl` خودِ پلاگین می‌آیند، نه از منابع اپ میزبان.' },
                {
                    type: 'code', filename: 'PluginUiExtensionPoints.java', lang: 'java', code:
                        `public final class PluginUiExtensionPoints {

  public static final ExtensionPoint<PluginScreen> PLUGIN_SCREEN =
      new ExtensionPoint<>("ir.hanzodev1375.ghostide.ui.pluginScreen", PluginScreen.class);

  public static final ExtensionPoint<EditorPanel> EDITOR_PANEL =
      new ExtensionPoint<>("ir.hanzodev1375.ghostide.ui.editorPanel", EditorPanel.class);

  public static final ExtensionPoint<EditorActionHandler> EDITOR_ACTION_HANDLER =
      new ExtensionPoint<>(
          "ir.hanzodev1375.ghostide.ui.editorActionHandler", EditorActionHandler.class);
}` },
                { type: 'p', text: 'برای یک پیاده‌سازی کامل — شامل خودِ Fragment — به [نمونه‌ی Hello Ghost](#/example/hello-world) نگاه کن.' }
            ]
        },

        'file-icon-contributor': {
            title: 'FileIconContributor',
            filename: 'FileIconContributor.java',
            module: 'ide-ui-api',
            dek: 'آیکون فایل/پوشه‌ی داخلی را برای مسیرهایی که پلاگین تشخیص می‌دهد override می‌کند — از جمله کل آیکون‌پک‌ها.',
            blocks: [
                { type: 'p', text: 'یک `FileIconContributor` را در `PluginUiExtensionPoints.FILE_ICON_CONTRIBUTOR` ثبت کن. برای هر آیکونی که در فایل منیجر، تب‌های ادیتور، تاریخچه و بوکمارک‌ها نمایش داده می‌شود، **قبل از** مجموعه‌ی داخلی `file_icons.json` از او پرسیده می‌شود. برای مسیرهایی که هندل نمی‌کنی `null` برگردان تا contributor بعدی — یا مجموعه‌ی داخلی — جواب بدهد.' },
                {
                    type: 'code', filename: 'FileIconContributor.java', lang: 'java', code:
                        `public interface FileIconContributor {

  String getIcon(String filePath);
}` },
                {
                    type: 'table', headers: ['مقدار بازگشتی', 'معنی'], rows: [
                        ['`file://...`, `content://...`', 'یک URI کامل. برای آرت‌ورکی که داخل `.gpl` خودت داری؛ موقع `activate()` آن را به حافظه‌ی خصوصی کپی کن چون Glide نمی‌تواند asset پلاگین را از طریق `android_asset` باز کند.'],
                        ['`file_type_kotlin`', 'یک نام آیکون ساده؛ به‌صورت `vscode_icons/<name>.svg` در assetهای میزبان حل می‌شود.'],
                        ['`null` / خالی', 'این مسیر را هندل نمی‌کنی — به contributor بعدی و سپس مجموعه‌ی داخلی می‌رسد.']
                    ]
                },
                { type: 'h2', text: 'JsonFileIconContributor' },
                { type: 'p', text: 'برای مپ کردن گروهی، یک فایل JSON داخل assetهای پلاگین بگذار و `JsonFileIconContributor` آماده را ثبت کن. این JSON **جزئی** است: فقط بخشی را که می‌خواهی override کنی بنویس و بقیه fallback می‌شود. کلید پسوند را می‌توان `hsi` یا `.hsi` یا `*.hsi` نوشت — هر سه یکی‌اند.' },
                {
                    type: 'code', filename: 'assets/myicons.json', lang: 'json', code:
                        `{
  "asset_dir": "myicons",
  "extensions": {
    "hsi": "file_type_hsi",
    "ghost": "file_type_ghost"
  },
  "filenames": {
    "makefile": "file_type_makefile",
    "ghostide.json": "file_type_ghost"
  },
  "folders": {
    "components": "folder_type_components",
    "node_modules": "folder_type_node"
  },
  "defaults": {
    "file": "default_file",
    "folder": "default_folder",
    "root_folder": "default_root_folder"
  }
}` },
                { type: 'p', text: 'معادل VS Code هم قبول است: `fileExtensions` \u2192 `extensions`، `fileNames` \u2192 `filenames`، `folderNames` / `folderNamesExpanded` \u2192 `folders`. یک پک مینیمال چیزی جز مپ لازم ندارد:' },
                {
                    type: 'code', filename: 'assets/myicons.json', lang: 'json', code:
                        `{
  "extensions": {
    "hsi": "iconhsi"
  }
}` },
                {
                    type: 'code', filename: 'MyPlugin.java', lang: 'java', code:
                        `public void activate(PluginContext context) {
  Context pluginContext =
      context.getServices().require(IdeHostServices.PLUGIN_ANDROID_CONTEXT);
  context.registerDisposable(
      context.getExtensions().register(
          PluginUiExtensionPoints.FILE_ICON_CONTRIBUTOR,
          new JsonFileIconContributor(pluginContext, "myicons.json")));
}` },
                { type: 'p', text: '`asset_dir` اختیاری است؛ نام‌هایی که به یک SVG داخلش اشاره کنند یک بار به حافظه‌ی خصوصی پلاگین استخراج و به‌صورت `file://` سرو می‌شوند، و نام‌های ناشناخته به مجموعه‌ی داخلی `vscode_icons` می‌رسند. `defaults` از `file`، `folder` و `root_folder` پشتیبانی می‌کند.' },
                { type: 'h2', text: 'اولویت بین آیکون‌پک‌ها' },
                { type: 'p', text: 'چند افزونه‌ی آیکون می‌توانند هم‌زمان فعال باشند. **جدیدترین پکی که نصب شده** اول پرسیده می‌شود — اولویتش از زمان نصب فایل `.gpl` گرفته می‌شود و بعد از ری‌استارت هم حفظ می‌شود. اولین جواب non-null برای هر مسیر برنده است، پس پک جدید روی کلیدهایی که تعریف می‌کند پک‌های قدیمی‌تر را override می‌کند و بقیه‌جاها به آن‌ها و در نهایت به مجموعه‌ی داخلی fallback می‌کند. با unload شدن پلاگین، contributionهایش خودکار حذف می‌شوند.' },
                { type: 'note', variant: 'tip', text: 'برای استفاده از آرت‌ورک داخلی، یک مپ را به هر نام آیکون موجود اشاره بده (مثلاً `file_type_kotlin`). SVGهای خودت را فقط برای آیکون‌هایی که در مجموعه‌ی داخلی نیستند زیر `asset_dir` بگذار.' }
            ]
        },

        'gpl-format': {
            title: 'فرمت .gpl',
            filename: 'plugin.json',
            module: 'gpl runtime',
            dek: 'ساختار فایل نصب یک پلاگین Ghost IDE.',
            blocks: [
                { type: 'p', text: 'یک فایل `.gpl` از نظر ساختار یک zip است — شبیه یک APK ساده‌شده — و دو چیز داخلش اجباری است:' },
                {
                    type: 'table', headers: ['مسیر داخل zip', 'محتوا'], rows: [
                        ['`assets/plugin.json`', 'مانیفست پلاگین.'],
                        ['`classes.dex` (یا `classes2.dex`, ...)', 'بایت‌کد کامپایل‌شده‌ی پلاگین.']
                    ]
                },
                { type: 'h2', text: 'فیلدهای plugin.json' },
                {
                    type: 'table', headers: ['فیلد', 'نوع', 'الزام'], rows: [
                        ['`id`', 'رشته', 'اجباری — با `PluginDescriptor` هم‌قرارداد؛ شناسه‌ی reverse-domain.'],
                        ['`name`', 'رشته', 'اجباری.'],
                        ['`version`', 'رشته', 'اجباری.'],
                        ['`entryClass`', 'رشته', 'اجباری — نام کامل کلاسِ پیاده‌کننده‌ی `GhostPlugin`، با سازنده‌ی بدون‌آرگومان و public.'],
                        ['`description`', 'رشته', 'اختیاری؛ پیش‌فرض رشته‌ی خالی.'],
                        ['`minHostVersion`', 'عدد صحیح', 'اختیاری؛ پیش‌فرض `۰`. کمترین versionCode اپ میزبان که این پلاگین را پشتیبانی می‌کند.'],
                        ['`icon`', 'رشته', 'اختیاری؛ نام یک فایل PNG/JPG داخل `assets/` (همان پوشه‌ی `plugin.json`). اگر نباشد، پلاگین آیکن ندارد.']
                    ]
                },
                {
                    type: 'code', filename: 'assets/plugin.json', lang: 'json', code:
                        `{
  "id": "com.example.hello-ghost",
  "name": "Hello Ghost",
  "version": "1.0.0",
  "entryClass": "com.example.helloghost.HelloGhostPlugin",
  "description": "یک صفحه‌ی نمونه به Ghost IDE اضافه می‌کند.",
  "minHostVersion": 1,
  "icon": "icon.png"
}` },
                { type: 'note', variant: 'warn', text: 'اگر `assets/plugin.json` داخل zip نباشد یا JSON نامعتبر باشد، بارگذاری با خطا شکست می‌خورد و پلاگین اصلاً فعال نمی‌شود.' }
            ]
        },

        'build-plugin': {
            title: 'ساخت پلاگین',
            filename: 'BUILD.md',
            module: 'gpl runtime',
            dek: 'یک روش پیشنهادی برای تولید بسته‌ای که GplPluginLoader انتظارش را دارد.',
            blocks: [
                { type: 'p', text: 'زمان‌اجرا هیچ ابزار ساخت خاصی را اجبار نمی‌کند — فقط به خروجی نهایی اهمیت می‌دهد: یک zip با پسوند `.gpl` که `assets/plugin.json` و حداقل یک `classes*.dex` معتبر دارد. مسیر زیر یک الگوی ساده و رایج است:' },
                {
                    type: 'list', ordered: true, items: [
                        'ماژول پلاگین را در برابر `plugin-api` (و در صورت نیاز `ide-api`/`ide-ui-api`) با `compileOnly` کامپایل کن — این وابستگی‌ها را در زمان اجرا خودِ اپ میزبان تأمین می‌کند، پس نباید داخل `.gpl` هم بسته‌بندی شوند.',
                        '.class های خروجی را با دکسر اندروید (`d8`) به یک یا چند فایل `classes.dex` تبدیل کن.',
                        '`assets/plugin.json` را کنار `classes.dex` در یک zip قرار بده.',
                        'فایل zip را با پسوند `.gpl` تغییرنام بده.'
                    ]
                },
                {
                    type: 'code', filename: 'package.sh', lang: 'bash', code:
                        `d8 --output build/dex build/classes/*.class

cd build/dex
zip -r ../hello-ghost.gpl classes.dex ../../assets/plugin.json -j
mv ../../assets/plugin.json assets/plugin.json 2>/dev/null || true` },
                { type: 'note', variant: 'tip', text: 'برای کامپایل در برابر APIها به فایل‌های آماده‌ی `plugin-api.jar` / `ide-api.jar` / `ide-ui-api.aar` نیاز داری — آن‌ها را از آرتیفکت **ghostide-plugin-sdk** در [GitHub Actions](https://github.com/HanzoDev1375/GhostIdes/actions) یا از یک [Release](https://github.com/HanzoDev1375/GhostIdes/releases) بردار.' },
                { type: 'note', variant: 'tip', text: 'ساده‌ترین راه برای اطمینان از ساختار درست، این است که پیش از فشرده‌سازی یک پوشه‌ی موقت با همین چیدمان بسازی: `classes.dex` در ریشه و `assets/plugin.json` داخل زیرپوشه‌ی `assets/` — دقیقاً همان چیزی که `GplManifestReader` با نام `assets/plugin.json` جست‌وجو می‌کند.' }
            ]
        },

        'loading-lifecycle': {
            title: 'چرخه‌ی بارگذاری',
            filename: 'GplPluginLoader.java',
            module: 'gpl runtime',
            dek: 'دقیقاً چه اتفاقی از لحظه‌ی نصب یک .gpl تا فعال‌شدنش می‌افتد — و هنگام حذف.',
            blocks: [
                { type: 'p', text: 'این بخش داخلیِ اپ میزبان است، نه بخشی از سطح API عمومی؛ اما دانستنش کمک می‌کند بفهمی دقیقاً چه چیزی زیر `activate(context)` تو در حال اجراست.' },
                { type: 'h2', text: 'بارگذاری' },
                {
                    type: 'list', ordered: true, items: [
                        '`GplManifestReader` مانیفست را از `assets/plugin.json` می‌خواند.',
                        'اگر پلاگینی با همین شناسه از قبل بارگذاری شده باشد، همان نمونه بدون کار اضافه برگردانده می‌شود.',
                        'در Android 14 (API 34) به بالا، همه‌ی `classes*.dex` مستقیم در حافظه خوانده می‌شوند و با `InMemoryDexClassLoader` بارگذاری می‌شوند — بدون استخراج روی دیسک. زیر API 34، فایل‌های dex استخراج و با `DexClassLoader` بارگذاری می‌شوند.',
                        'یک `Context` مخصوص پلاگین ساخته می‌شود که منابع (`R.layout` و بقیه) را از خودِ فایل `.gpl` می‌خواند — با تکنیک reflection روی `AssetManager.addAssetPath`، همان روشی که چارچوب‌های پلاگین اندرویدی مثل RePlugin و VirtualAPK استفاده می‌کنند.',
                        '`entryClass` بارگذاری، با سازنده‌ی بدون‌آرگومان ساخته، و پیاده‌سازیِ `GhostPlugin` بودنش تأیید می‌شود.',
                        'یک `PluginDescriptor` از روی مانیفست ساخته می‌شود.',
                        'یک کپیِ مخصوص همین پلاگین از `GlobalRegistry.services()` گرفته می‌شود و `PLUGIN_ANDROID_CONTEXT` فقط داخل همین کپی ثبت می‌گردد.',
                        '`activate(context)` صدا زده می‌شود.'
                    ]
                },
                { type: 'note', variant: 'warn', text: 'اگر reflection روی `addAssetPath` به هر دلیلی شکست بخورد (مثلاً نسخه‌ی آینده‌ی اندروید این API غیررسمی را ببندد)، بارگذاری به‌جای شکست کامل، به منابع اپ میزبان سقوط می‌کند — یعنی پلاگین بالا می‌آید ولی layout و drawable اختصاصی خودش را نمی‌بیند.' },
                { type: 'h2', text: 'حذف (unload)' },
                {
                    type: 'list', ordered: true, items: [
                        '`plugin.deactivate()` صدا زده می‌شود.',
                        'هر `Disposable`ای که با `registerDisposable` ثبت شده، به ترتیب معکوسِ ثبت (LIFO) آزاد می‌شود.',
                        '`GlobalRegistry.extensions().unregisterOwner(pluginId)` به‌عنوان یک لایه‌ی اطمینان اضافی، هر ثبتی که هنوز به این شناسه نسبت داده شده را جارو می‌کند.'
                    ]
                }
            ]
        },

        installing: {
            title: 'نصب پلاگین',
            filename: 'GplInstalledPlugins.java',
            module: 'gpl runtime',
            dek: 'محل زندگی فایل‌های .gpl نصب‌شده روی دستگاه و روند اسکن آن‌ها در استارتاپ.',
            blocks: [
                { type: 'p', text: 'همه‌ی فایل‌های `.gpl` نصب‌شده داخل `filesDir/gpl_plugins/` اپ میزبان نگه‌داری می‌شوند. هر فایل با پسوند `.gpl` داخل این پوشه «نصب‌شده» حساب می‌شود.' },
                {
                    type: 'code', filename: 'GplInstalledPlugins.java', lang: 'java', code:
                        `public static File installDir(Context context) {
  File dir = new File(context.getApplicationContext().getFilesDir(), "gpl_plugins");
  if (!dir.exists()) {
    dir.mkdirs();
  }
  return dir;
}` },
                { type: 'p', text: 'در زمان استارتاپ، `loadAll(context, loader)` تمام فایل‌های این پوشه را اسکن می‌کند و برای هر شناسه‌ای که هنوز بارگذاری نشده، `loader.load(file)` را صدا می‌زند.' },
                { type: 'note', variant: 'tip', text: 'یک پلاگین خراب یا مانیفست نامعتبر باعث توقف کل اسکن نمی‌شود — فقط همان یکی رد می‌شود و بقیه‌ی پلاگین‌ها عادی بالا می‌آیند.' },
                { type: 'h2', text: 'پلاگین‌ها از کجا میان؟' },
                { type: 'p', text: 'پلاگین‌ها هیچ‌جای جداگانه‌ای منتشر نمی‌شوند. باندل‌های آماده‌ی `.gpl` از خودِ مخزن Ghost IDE به اشتراک گذاشته می‌شوند — یا از تب **Actions** همان رانِ ورک‌فلو، یا از پیوست‌های فایل یک **Release** دانلودشان کن:' },
                {
                    type: 'code', filename: 'GitHub', lang: 'text', code:
                        `https://github.com/HanzoDev1375/GhostIdes

Releases -> می‌توانی فایل .gpl را به یک Release پیوست کنی و کاربران از آنجا بردارند
Actions  -> هر ران ورک‌فلو آرتیفکت‌هایش را ۹۰ روز نگه می‌دارد، از جمله باندل‌های .gpl` },
                { type: 'note', variant: 'info', text: 'آرتیفکت `app-debug` خودِ APK است، `ghostide-plugin-sdk` شامل jar/aarهایی است که برای کامپایل پلاگین لازم داری، و هر باندل `.gpl` که نویسنده‌ی پلاگین می‌خواهد به اشتراک بگذارد هم به‌صورت پیوست Release یا آرتیفکت ورک‌فلو در دسترس است.' }
            ]
        },

        'hello-world': {
            title: 'نمونه‌ی کامل: Hello Ghost',
            filename: 'HelloGhostPlugin.java',
            module: 'gpl runtime',
            dek: 'یک پلاگین کوچک ولی کامل — از پیاده‌سازی تا مانیفست تا بسته‌بندی — که همه‌ی مفاهیم قبلی را کنار هم می‌گذارد.',
            blocks: [
                { type: 'p', text: 'این پلاگین یک صفحه‌ی ساده به Ghost IDE اضافه می‌کند که متن فایل بازِ فعلی را نشان می‌دهد. سه فایل لازم داریم: کلاس ورودی، خودِ صفحه (Fragment)، و مانیفست.' },
                { type: 'h2', text: '۱. کلاس ورودی' },
                {
                    type: 'code', filename: 'HelloGhostPlugin.java', lang: 'java', code:
                        `package com.example.helloghost;

import ir.hanzodev1375.ghostide.ide.ui.api.PluginUiExtensionPoints;
import ir.hanzodev1375.ghostide.plugin.api.Disposable;
import ir.hanzodev1375.ghostide.plugin.api.GhostPlugin;
import ir.hanzodev1375.ghostide.plugin.api.PluginContext;

public final class HelloGhostPlugin implements GhostPlugin {

  @Override
  public void activate(PluginContext context) {
    Disposable registration = context.getExtensions().register(
        PluginUiExtensionPoints.PLUGIN_SCREEN,
        new HelloScreen(),
        context.getDescriptor().getId(),
        0);

    context.registerDisposable(registration);
    context.getLogger().info("Hello Ghost activated");
  }

  @Override
  public void deactivate() {
    // نیازی به کاری اضافه بر آنچه Disposable انجام می‌دهد نیست
  }
}` },
                { type: 'h2', text: '۲. صفحه' },
                { type: 'p', text: '`HelloScreen` رابط `PluginScreen` را پیاده می‌کند و یک `Fragment` می‌سازد. برای این‌که نمونه بدون هیچ فایل layout اضافه کار کند، `TextView` به‌صورت برنامه‌نویسی‌شده ساخته می‌شود.' },
                {
                    type: 'code', filename: 'HelloScreen.java', lang: 'java', code:
                        `package com.example.helloghost;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import ir.hanzodev1375.ghostide.ide.ui.api.IdeHostServices;
import ir.hanzodev1375.ghostide.ide.ui.api.PluginScreen;

public final class HelloScreen implements PluginScreen {

  @Override
  public String getId() {
    return "com.example.hello-ghost.screen";
  }

  @Override
  public String getTitle() {
    return "Hello Ghost";
  }

  @Override
  public Fragment createFragment() {
    return new HelloFragment();
  }

  public static final class HelloFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(
        @NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle state) {
      TextView view = new TextView(requireContext());
      view.setPadding(32, 32, 32, 32);
      view.setTextSize(15f);
      view.setText("این صفحه از یک پلاگین Ghost IDE می‌آید.");
      return view;
    }
  }
}` },
                { type: 'h2', text: '۳. مانیفست' },
                {
                    type: 'code', filename: 'assets/plugin.json', lang: 'json', code:
                        `{
  "id": "com.example.hello-ghost",
  "name": "Hello Ghost",
  "version": "1.0.0",
  "entryClass": "com.example.helloghost.HelloGhostPlugin",
  "description": "یک صفحه‌ی نمونه به Ghost IDE اضافه می‌کند.",
  "minHostVersion": 1,
  "icon": "icon.png"
}` },
                { type: 'h2', text: '۴. بسته‌بندی و نصب' },
                {
                    type: 'list', ordered: true, items: [
                        '`HelloGhostPlugin.java` و `HelloScreen.java` را در برابر `plugin-api` + `ide-ui-api` کامپایل کن.',
                        'خروجی را با `d8` به `classes.dex` تبدیل کن.',
                        '`classes.dex` را کنار `assets/plugin.json` در یک zip قرار بده و پسوند را به `.gpl` تغییر بده — طبق [فرمت .gpl](#/packaging/gpl-format).',
                        'فایل `hello-ghost.gpl` را داخل `filesDir/gpl_plugins/` دستگاه کپی کن — طبق [نصب پلاگین](#/packaging/installing).',
                        'اپ را ری‌استارت کن؛ «Hello Ghost» باید به‌عنوان یک صفحه‌ی پلاگین فعال در دسترس باشد.'
                    ]
                },
                { type: 'note', variant: 'tip', text: 'همین الگو، با جایگزین‌کردن `PluginUiExtensionPoints.PLUGIN_SCREEN` با `EditorExtensionPoints.LSP_SERVER_PROVIDER`، دقیقاً همان مسیری است که یک پلاگین Language Server طی می‌کند — [LspServerProvider](#/lsp/lsp-server-provider) را ببین.' }
            ]
        }
    }
};
