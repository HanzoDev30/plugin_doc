/* نمونه‌های آماده‌ی پلاگین‌نویسی — فایل جدا از محتوای اصلی تا content.fa.js گنده نشود.
   این آبجکت در index.html به CONTENT_FA وصل می‌شود. */
var SAMPLES_FA = {
    groupLabel: 'نمونه‌های آماده',
    titles: {
        'sample-overview': 'ساختار پروژه‌ی نمونه',
        'sample-entry': 'کلاس ورودی کامل',
        'sample-settings': 'تنظیمات پلاگین در صفحه‌ی تنظیمات',
        'sample-screen': 'صفحه‌ی UI (PluginScreen)',
        'sample-panel': 'پنل ادیتور (EditorPanel)',
        'sample-command': 'دستور (PluginCommand)',
        'sample-storage': 'ذخیره‌سازی (PluginStorage)',
        'sample-events': 'گوش‌دادن به رویدادهای فایل',
        'sample-icons': 'آیکن فایل سفارشی',
        'sample-lsp': 'افزودن Language Server',
        'sample-feedback': 'پیام‌ها و سرویس‌های میزبان',
        'sample-build': 'ساخت و بسته‌بندی .gpl'
    },
    pages: {

        'sample-overview': {
            title: 'ساختار پروژه‌ی نمونه',
            filename: 'SampleKit/',
            dek: 'یک پروژه‌ی کامل و آماده‌ی کپی (SampleKit) که همه‌ی نمونه‌های این بخش از آن گرفته شده‌اند. با همین اسکلت، پلاگین خودت را بدون دردسر بالا بیاور.',
            blocks: [
                { type: 'p', text: 'پروژه یک ماژول اپ اندروید است که هیچ Activity ندارد؛ فقط برای گرفتن خروجی `classes.dex` ساخته می‌شود. وابستگی‌ها به‌صورت `compileOnly` از پوشه‌ی `libs/` خوانده می‌شوند تا داخل `.gpl` کپی نشوند.' },
                { type: 'h2', text: 'ساختار درخت فایل‌ها' },
                {
                    type: 'code', filename: 'tree', lang: 'text', code:
`SampleKit/
├─ settings.gradle
├─ build.gradle
├─ gradle.properties
└─ app/
   ├─ build.gradle
   └─ src/main/
      ├─ AndroidManifest.xml
      ├─ assets/
      │  ├─ plugin.json
      │  └─ fileicons/icons.json
      ├─ res/values/strings.xml
      └─ java/com/example/samplekit/
         ├─ SampleKitPlugin.java
         ├─ SampleSettings.java
         ├─ SampleSettingsContributor.java
         ├─ ui/SampleScreen.java
         ├─ ui/SamplePanel.java
         ├─ command/SampleCommand.java
         ├─ icons/SampleIcons.java
         └─ lsp/SampleLspProvider.java`
                },
                { type: 'h2', text: '۱. settings.gradle' },
                {
                    type: 'code', filename: 'settings.gradle', lang: 'gradle', code:
`pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = 'SampleKit'
include ':app'`
                },
                { type: 'h2', text: '۲. build.gradle ریشه' },
                {
                    type: 'code', filename: 'build.gradle', lang: 'gradle', code:
`plugins {
    id 'com.android.application' version '8.5.0' apply false
}`
                },
                { type: 'h2', text: '۳. app/build.gradle' },
                { type: 'p', text: 'سه فایل API را در `app/libs/` بگذار: `plugin-api-0.1.0.jar`، `ide-api-0.1.0.jar` و `ide-ui-api-release.aar`. اگر پلاگینت LSP ندارد می‌توانی `ide-api` را حذف کنی و اگر UI ندارد `ide-ui-api` را.' },
                {
                    type: 'code', filename: 'app/build.gradle', lang: 'gradle', code:
`plugins {
    id 'com.android.application'
}

android {
    namespace 'com.example.samplekit'
    compileSdk 36

    defaultConfig {
        minSdk 26
        targetSdk 36
        versionCode 1
        versionName '1.0.0'
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
}

dependencies {
    compileOnly fileTree(dir: 'libs', include: ['*.jar', '*.aar'])
}`
                },
                { type: 'h2', text: '۴. AndroidManifest.xml' },
                {
                    type: 'code', filename: 'app/src/main/AndroidManifest.xml', lang: 'text', code:
`<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- این یک اپ واقعی نیست؛ فقط برای ساختن dex. هیچ Activity و مجوزی لازم نیست. -->
    <application
        android:allowBackup="false"
        android:label="SampleKit" />

</manifest>`
                },
                { type: 'h2', text: '۵. مانیفست پلاگین' },
                {
                    type: 'code', filename: 'app/src/main/assets/plugin.json', lang: 'json', code:
`{
  "id": "com.example.sample-kit",
  "name": "Sample Kit",
  "version": "1.0.0",
  "entryClass": "com.example.samplekit.SampleKitPlugin",
  "description": "یک پلاگین نمونه که همه‌ی قابلیت‌های Ghost IDE را نشان می‌دهد.",
  "author": "You",
  "minHostVersion": 1,
  "icon": "icon.png"
}`
                },
                { type: 'note', variant: 'tip', text: 'فیلد `id` باید فقط حرف، عدد، `.`، `_` و `-` داشته باشد و همان شناسه‌ای باشد که همه‌جا به‌عنوان `owner` هنگام ثبت اکستنشن‌ها می‌دهی — معمولاً `context.getDescriptor().getId()`.' },
                { type: 'p', text: 'حالا سراغ [کلاس ورودی کامل](#/samples/sample-entry) برو تا ببینی همه‌ی قطعات چطور به هم وصل می‌شوند.' }
            ]
        },

        'sample-entry': {
            title: 'کلاس ورودی کامل',
            filename: 'SampleKitPlugin.java',
            module: 'plugin-api',
            dek: 'یک کلاس ورودی که هر هفت نوع مشارکت را ثبت می‌کند: تنظیمات، صفحه، پنل، دستور، رویداد، آیکن و Language Server.',
            blocks: [
                { type: 'p', text: 'همه‌چیز از `activate(PluginContext)` شروع می‌شود. هر `register(...)` یک `Disposable` برمی‌گرداند که با `context.registerDisposable(...)` ثبت می‌شود تا هنگام unload خودکار آزاد شود.' },
                {
                    type: 'code', filename: 'SampleKitPlugin.java', lang: 'java', code:
`package com.example.samplekit;

import android.content.Context;

import java.util.List;

import ir.hanzodev1375.ghostide.ide.api.EditorExtensionPoints;
import ir.hanzodev1375.ghostide.ide.ui.api.IdeEvents;
import ir.hanzodev1375.ghostide.ide.ui.api.IdeHostServices;
import ir.hanzodev1375.ghostide.ide.ui.api.PluginUiExtensionPoints;
import ir.hanzodev1375.ghostide.plugin.api.CoreExtensionPoints;
import ir.hanzodev1375.ghostide.plugin.api.CoreServices;
import ir.hanzodev1375.ghostide.plugin.api.ExtensionPoint;
import ir.hanzodev1375.ghostide.plugin.api.GhostPlugin;
import ir.hanzodev1375.ghostide.plugin.api.PluginContext;
import ir.hanzodev1375.ghostide.plugin.api.PluginSetupAction;
import ir.hanzodev1375.ghostide.plugin.api.PluginStorage;

import com.example.samplekit.command.SampleCommand;
import com.example.samplekit.icons.SampleIcons;
import com.example.samplekit.lsp.SampleLspProvider;
import com.example.samplekit.ui.SamplePanel;
import com.example.samplekit.ui.SampleScreen;

public final class SampleKitPlugin implements GhostPlugin {

  private SampleSettings settings;
  private SamplePanel panel;

  /** دستورهای نصب محیط؛ میزبان فقط با تأیید کاربر در ترمینال اجرا می‌کند. */
  @Override
  public List<PluginSetupAction> getSetupActions() {
    return List.of(
        new PluginSetupAction(
            "install-tool",
            "Install sample tool",
            "npm install -g sample-tool",
            "ابزار زبان نمونه را داخل rootfs نصب می‌کند."));
  }

  @Override
  public void activate(PluginContext context) {
    String owner = context.getDescriptor().getId();
    PluginStorage storage = context.getServices().require(CoreServices.PLUGIN_STORAGE);
    Context android = context.getServices().require(IdeHostServices.PLUGIN_ANDROID_CONTEXT);

    settings = new SampleSettings(storage);
    panel = new SamplePanel(context, settings);

    // ۱) پنل ادیتور
    register(context, owner, PluginUiExtensionPoints.EDITOR_PANEL, panel);

    // ۲) صفحه‌ی کامل UI
    register(context, owner, PluginUiExtensionPoints.PLUGIN_SCREEN, new SampleScreen());

    // ۳) ردیف‌های تنظیمات در صفحه‌ی تنظیمات خود اپ
    register(
        context,
        owner,
        CoreExtensionPoints.PLUGIN_SETTINGS,
        new SampleSettingsContributor(android, settings, panel));

    // ۴) یک دستور قابل فراخوانی
    register(context, owner, CoreExtensionPoints.PLUGIN_COMMAND, new SampleCommand(context));

    // ۵) آیکن فایل سفارشی
    register(context, owner, PluginUiExtensionPoints.FILE_ICON_CONTRIBUTOR, new SampleIcons(android));

    // ۶) گوش‌دادن به رویداد فایل (ممکن است از هر threadی صدا زده شود)
    register(
        context,
        owner,
        IdeEvents.FILE_EVENT,
        event -> context.getLogger().info("file event: " + event));

    // ۷) افزودن Language Server
    register(context, owner, EditorExtensionPoints.LSP_SERVER_PROVIDER, new SampleLspProvider(context));

    context.getLogger().info("Sample Kit activated");
  }

  @Override
  public void deactivate() {
    // همه‌ی ثبت‌ها قبلاً Disposable گرفته‌اند؛ فقط منابع دستی را این‌جا آزاد کن.
    if (panel != null) {
      panel.destroy();
      panel = null;
    }
  }

  private static <T> void register(
      PluginContext context, String owner, ExtensionPoint<T> point, T extension) {
    context.registerDisposable(context.getExtensions().register(point, extension, owner, 0));
  }
}`
                },
                { type: 'note', variant: 'info', text: 'اگر پلاگین فقط LSP است، لازم نیست به `ide-ui-api` وابسته شود؛ کافی است `plugin-api` و `ide-api` را بگیری و فقط رجیستر «۷» را نگه داری.' },
                { type: 'p', text: 'بعد برو سراغ [تنظیمات پلاگین](#/samples/sample-settings) که جدیدترین قابلیت API است.' }
            ]
        },

        'sample-settings': {
            title: 'تنظیمات پلاگین در صفحه‌ی تنظیمات',
            filename: 'SampleSettingsContributor.java',
            module: 'plugin-api',
            dek: 'به‌جای ساختن صفحه‌ی تنظیمات جداگانه، ردیف‌های تنظیمات را داخل صفحه‌ی تنظیمات خود اپ بریز — یا به‌صورت کلید روشن/خاموش یا یک ردیف قابل کلیک.',
            blocks: [
                { type: 'p', text: 'واسط `PluginSettingsContributor` را پیاده کن و در اکستنشن‌پوینت `CoreExtensionPoints.PLUGIN_SETTINGS` رجیستر کن. میزبان هر بار که صفحه‌ی تنظیمات باز می‌شود `getSettings()` را تازه می‌خواند و هر ردیف را با نام پلاگین تو برچسب می‌زند.' },
                { type: 'note', variant: 'info', text: 'دو نوع ردیف داری: `PluginSetting.toggle(...)` برای سوئیچ و `PluginSetting.action(...)` برای یک ردیف ساده که با کلیک کد اجرا می‌کند. برای انتخاب‌های پیچیده‌تر (لیست، اسلایدر) از یک `action` استفاده کن و خودت دیالوگ یا صفحه‌ات را باز کن. callbackها روی UI thread اجرا می‌شوند.' },
                { type: 'h2', text: '۱. متن‌ها را در resources بگذار' },
                { type: 'p', text: 'متن‌ها را از `R.string` بخوان تا با زبان دستگاه ترجمه شوند و داخل `.gpl` همراه بیایند.' },
                {
                    type: 'code', filename: 'res/values/strings.xml', lang: 'text', code:
`<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="prefs_group_name">Sample Kit</string>

    <string name="setting_wrap">Word wrap</string>
    <string name="setting_wrap_desc">شکستن خطوط بلند در پنل</string>

    <string name="setting_autoreload">Auto reload</string>
    <string name="setting_autoreload_desc">بارگذاری مجدد هنگام ذخیره‌ی فایل</string>

    <string name="setting_clear_cache">Clear cache</string>
    <string name="setting_clear_cache_desc">پاک‌کردن کش پنل</string>
</resources>`
                },
                { type: 'h2', text: '۲. وضعیت را در PluginStorage نگه دار' },
                {
                    type: 'code', filename: 'SampleSettings.java', lang: 'java', code:
`package com.example.samplekit;

import ir.hanzodev1375.ghostide.plugin.api.PluginStorage;

/** تنظیمات پلاگین؛ مقادیر در PluginStorage ذخیره می‌شوند و بین ری‌استارت‌ها می‌مانند. */
public final class SampleSettings {

  public static final String KEY_WRAP = "wrap";
  public static final String KEY_AUTORELOAD = "autoreload";

  private final PluginStorage storage;

  public SampleSettings(PluginStorage storage) {
    this.storage = storage;
  }

  public boolean isWrap() {
    return storage.getBoolean(KEY_WRAP, true);
  }

  public void setWrap(boolean value) {
    storage.putBoolean(KEY_WRAP, value);
  }

  public boolean isAutoReload() {
    return storage.getBoolean(KEY_AUTORELOAD, true);
  }

  public void setAutoReload(boolean value) {
    storage.putBoolean(KEY_AUTORELOAD, value);
  }
}`
                },
                { type: 'h2', text: '۳. ردیف‌ها را بساز' },
                {
                    type: 'code', filename: 'SampleSettingsContributor.java', lang: 'java', code:
`package com.example.samplekit;

import android.content.Context;

import java.util.List;

import ir.hanzodev1375.ghostide.plugin.api.PluginSetting;
import ir.hanzodev1375.ghostide.plugin.api.PluginSettingsContributor;
import com.example.samplekit.ui.SamplePanel;

public final class SampleSettingsContributor implements PluginSettingsContributor {

  private final Context android;
  private final SampleSettings settings;
  private final SamplePanel panel;

  public SampleSettingsContributor(Context android, SampleSettings settings, SamplePanel panel) {
    this.android = android;
    this.settings = settings;
    this.panel = panel;
  }

  @Override
  public String getId() {
    return "com.example.samplekit.settings";
  }

  @Override
  public String getDisplayName() {
    return android.getString(R.string.prefs_group_name);
  }

  @Override
  public List<PluginSetting> getSettings() {
    return List.of(
        PluginSetting.toggle(
            SampleSettings.KEY_WRAP,
            android.getString(R.string.setting_wrap),
            android.getString(R.string.setting_wrap_desc),
            settings.isWrap(),
            value -> {
              settings.setWrap(value);
              panel.applySettings();
            }),
        PluginSetting.toggle(
            SampleSettings.KEY_AUTORELOAD,
            android.getString(R.string.setting_autoreload),
            android.getString(R.string.setting_autoreload_desc),
            settings.isAutoReload(),
            settings::setAutoReload),
        PluginSetting.action(
            "clear_cache",
            android.getString(R.string.setting_clear_cache),
            android.getString(R.string.setting_clear_cache_desc),
            panel::clearCache));
  }
}`
                },
                { type: 'note', variant: 'tip', text: 'شناسه‌ی هر ردیف (`id`) در `storage` کلید می‌شود؛ پس همان ثابت‌ها را در `SampleSettings` و contributor به کار ببر تا مقدار خوانده‌شده با مقدار ذخیره‌شده یکی بماند.' }
            ]
        },

        'sample-screen': {
            title: 'صفحه‌ی UI (PluginScreen)',
            filename: 'SampleScreen.java',
            module: 'ide-ui-api',
            dek: 'یک صفحه‌ی کامل که به لیست صفحه‌های Ghost IDE اضافه می‌شود و به سرویس‌های میزبان (ادیتور، فایل، اجرا) دسترسی دارد.',
            blocks: [
                { type: 'p', text: '`PluginScreen` فقط سه چیز می‌خواهد: `getId`، `getTitle` و `createFragment`. داخل Fragment از `IdeHostServices` سرویس می‌گیری و از `IdeHostServices.PLUGIN_ANDROID_CONTEXT` هم می‌توانی برای inflate استفاده کنی.' },
                {
                    type: 'code', filename: 'ui/SampleScreen.java', lang: 'java', code:
`package com.example.samplekit.ui;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import ir.hanzodev1375.ghostide.ide.ui.api.EditorHost;
import ir.hanzodev1375.ghostide.ide.ui.api.IdeHostServices;
import ir.hanzodev1375.ghostide.ide.ui.api.PluginScreen;

public final class SampleScreen implements PluginScreen {

  @Override
  public String getId() {
    return "com.example.samplekit.screen";
  }

  @Override
  public String getTitle() {
    return "Sample Kit";
  }

  @Override
  public Fragment createFragment() {
    return new ScreenFragment();
  }

  public static final class ScreenFragment extends Fragment {

    private EditorHost editor;

    @Nullable
    @Override
    public View onCreateView(
        @NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle state) {
      editor = (EditorHost) requireContext().getSystemService("__plugin_editor_host__");
      return build(inflater);
    }

    private View build(LayoutInflater inflater) {
      LinearLayout root = new LinearLayout(requireContext());
      root.setOrientation(LinearLayout.VERTICAL);
      int pad = dp(16);
      root.setPadding(pad, pad, pad, pad);

      TextView title = new TextView(requireContext());
      title.setText("متن فایل فعلی:");
      root.addView(title);

      EditText input = new EditText(requireContext());
      input.setText(editor == null ? "" : editor.getEditorText());
      root.addView(input);

      Button apply = new Button(requireContext());
      apply.setText("جای‌گذاری در ادیتور");
      apply.setOnClickListener(v -> {
        if (editor != null) {
          editor.setEditorText(input.getText().toString());
        }
      });
      root.addView(apply);
      return root;
    }

    private int dp(int value) {
      return Math.round(value * getResources().getDisplayMetrics().density);
    }
  }
}`
                },
                { type: 'note', variant: 'warn', text: 'دسترسی به سرویس‌ها از این‌گونه `getSystemService` روش صحیح نیست؛ این‌جا فقط برای کوتاه‌شدن نمونه است. در کد واقعی سرویس‌ها را در `activate()` بگیر و به `createFragment()`/سازنده تزریق کن.' },
                { type: 'h2', text: 'نسخه‌ی درست: تزریق سرویس از activate' },
                {
                    type: 'code', filename: 'ui/SampleScreen.java (بهتر)', lang: 'java', code:
`public final class SampleScreen implements PluginScreen {

  private final EditorHost editor;
  private final Context android;

  public SampleScreen(EditorHost editor, Context android) {
    this.editor = editor;
    this.android = android;
  }

  @Override public String getId() { return "com.example.samplekit.screen"; }
  @Override public String getTitle() { return "Sample Kit"; }
  @Override public Fragment createFragment() { return new ScreenFragment(editor, android); }

  public static final class ScreenFragment extends Fragment {
    private final EditorHost editor;
    private final Context android;
    ScreenFragment(EditorHost editor, Context android) {
      this.editor = editor;
      this.android = android;
    }
    // ... همان build(...)
  }
}`
                },
                { type: 'p', text: 'در `SampleKitPlugin.activate` این‌طور بساز و رجیستر کن:' },
                {
                    type: 'code', filename: 'SampleKitPlugin.java (بخش)', lang: 'java', code:
`EditorHost editor = context.getServices().require(IdeHostServices.EDITOR_HOST);
Context android = context.getServices().require(IdeHostServices.PLUGIN_ANDROID_CONTEXT);
register(context, owner, PluginUiExtensionPoints.PLUGIN_SCREEN,
    new SampleScreen(editor, android));`
                }
            ]
        },

        'sample-panel': {
            title: 'پنل ادیتور (EditorPanel)',
            filename: 'SamplePanel.java',
            module: 'ide-ui-api',
            dek: 'یک پنل که کنار ادیتور باز می‌شود؛ مثل پنل Live Preview. حالت نمایشش را هم می‌توانی با PluginStateMod عوض کنی.',
            blocks: [
                { type: 'p', text: '`Panel` (و در نتیجه `EditorPanel` و `FilePanel`) با `createView()` یک `View` می‌سازد و با `getState()/setState()` جای نمایشش را تعیین می‌کند: `SIDESHEET`، `DIALOGFRAGMENT`، `FRAGMENT`، `FLOATINGWINDOWS` و… .' },
                {
                    type: 'code', filename: 'ui/SamplePanel.java', lang: 'java', code:
`package com.example.samplekit.ui;

import android.content.Context;
import android.view.View;
import android.widget.TextView;

import ir.hanzodev1375.ghostide.ide.ui.api.EditorHost;
import ir.hanzodev1375.ghostide.ide.ui.api.EditorPanel;
import ir.hanzodev1375.ghostide.ide.ui.api.IdeHostServices;
import ir.hanzodev1375.ghostide.ide.ui.api.PluginStateMod;

import com.example.samplekit.SampleSettings;
import ir.hanzodev1375.ghostide.plugin.api.PluginContext;

public final class SamplePanel implements EditorPanel {

  private final PluginContext context;
  private final SampleSettings settings;
  private TextView view;

  public SamplePanel(PluginContext context, SampleSettings settings) {
    this.context = context;
    this.settings = settings;
    setState(PluginStateMod.SIDESHEET);
  }

  @Override public String getId() { return "com.example.samplekit.panel"; }

  @Override public String getTitle() { return "Sample"; }

  @Override
  public View createView() {
    Context android = context.getServices().require(IdeHostServices.PLUGIN_ANDROID_CONTEXT);
    view = new TextView(android);
    view.setPadding(24, 24, 24, 24);
    refresh();
    return view;
  }

  public void applySettings() {
    refresh();
  }

  public void clearCache() {
    if (view != null) {
      view.setText("cache cleared");
    }
  }

  private void refresh() {
    if (view == null) {
      return;
    }
    EditorHost editor = context.getServices().require(IdeHostServices.EDITOR_HOST);
    String wrap = settings.isWrap() ? "on" : "off";
    view.setText("wrap: " + wrap + ", autoReload: " + settings.isAutoReload()
        + ", file: " + editor.getOpenFile());
  }

  public void destroy() {
    view = null;
  }
}`
                },
                { type: 'note', variant: 'tip', text: 'برای تغییر حالت نمایش، در `activate()` بعد از ساخت پنل این‌طور صدا بزن: `panel.setState(PluginStateMod.FLOATINGWINDOWS);` — این مقدار از طریق `PanelStateStore` ذخیره و به میزبان داده می‌شود.' }
            ]
        },

        'sample-command': {
            title: 'دستور (PluginCommand)',
            filename: 'SampleCommand.java',
            module: 'plugin-api',
            dek: 'یک عمل قابل فراخوانی که میزبان (و آینده: command palette) می‌تواند فهرست و اجرا کند.',
            blocks: [
                { type: 'p', text: '`PluginCommand` سه چیز دارد: `getId()` (یکتا و reverse-domain)، `getTitle()` و `execute()`. اجرا ممکن است از هر threadی باشد؛ قبل از دست‌زدن به UI خودت به main thread برو.' },
                {
                    type: 'code', filename: 'command/SampleCommand.java', lang: 'java', code:
`package com.example.samplekit.command;

import java.util.concurrent.Executors;

import ir.hanzodev1375.ghostide.ide.ui.api.CodeRunnerHost;
import ir.hanzodev1375.ghostide.ide.ui.api.EditorHost;
import ir.hanzodev1375.ghostide.ide.ui.api.IdeHostServices;
import ir.hanzodev1375.ghostide.plugin.api.PluginCommand;
import ir.hanzodev1375.ghostide.plugin.api.PluginContext;

public final class SampleCommand implements PluginCommand {

  private final PluginContext context;

  public SampleCommand(PluginContext context) {
    this.context = context;
  }

  @Override
  public String getId() {
    return "com.example.samplekit.runCurrentFile";
  }

  @Override
  public String getTitle() {
    return "Sample Kit: Run current file";
  }

  @Override
  public String getDescription() {
    return "فایل باز فعلی را در ترمینال اجرا می‌کند.";
  }

  @Override
  public void execute() {
    CodeRunnerHost runner = context.getServices().require(IdeHostServices.CODE_RUNNER_HOST);
    EditorHost editor = context.getServices().require(IdeHostServices.EDITOR_HOST);
    if (editor.getOpenFile() == null) {
      return;
    }
    String path = editor.getOpenFile().getAbsolutePath();
    if (runner.isSupported(path)) {
      runner.runFile(path);
    } else {
      Executors.newSingleThreadExecutor().execute(() -> runner.exec("file \\"" + path + "\\"", null));
    }
  }
}`
                },
                { type: 'note', variant: 'warn', text: 'در رشته‌ی داخل کد، نقل‌قول‌ها فرار داده شده‌اند تا داخل خود رشته قرار بگیرند؛ هنگام کامپایل مطمئن شو کاراکترهای escape درست باشند.' }
            ]
        },

        'sample-storage': {
            title: 'ذخیره‌سازی (PluginStorage)',
            filename: 'SampleStorageUsage.java',
            module: 'plugin-api',
            dek: 'هر پلاگین یک فضای کلید-مقدار مستقل دارد که با شناسه‌ی خودش namespace می‌شود و بین ری‌استارت‌ها می‌ماند.',
            blocks: [
                { type: 'p', text: 'سرویس `CoreServices.PLUGIN_STORAGE` را بگیر و مقادیر اولیه (String/boolean/int/long/float) را ذخیره کن. برای داده‌ی حجیم فایل جداگانه در پوشه‌ی خودت بساز.' },
                {
                    type: 'code', filename: 'SampleStorageUsage.java', lang: 'java', code:
`import ir.hanzodev1375.ghostide.plugin.api.CoreServices;
import ir.hanzodev1375.ghostide.plugin.api.PluginStorage;

// داخل activate:
PluginStorage storage = context.getServices().require(CoreServices.PLUGIN_STORAGE);

storage.putString("lastFile", "/sdcard/notes.txt");
storage.putInt("runCount", storage.getInt("runCount", 0) + 1);
storage.putBoolean("firstRun", false);

String last = storage.getString("lastFile", "");
boolean has = storage.contains("runCount");
storage.remove("lastFile");
// storage.clear(); // همه‌ی داده‌های این پلاگین را پاک می‌کند`
                },
                { type: 'note', variant: 'info', text: 'مقدار پیش‌فرض (`defValue`) را همیشه بده؛ کلید ناموجود همان را برمی‌گرداند و استثنایی پرتاب نمی‌شود.' }
            ]
        },

        'sample-events': {
            title: 'گوش‌دادن به رویدادهای فایل',
            filename: 'IdeEventsListener.java',
            module: 'ide-ui-api',
            dek: 'با اکستنشن‌پوینت IdeEvents.FILE_EVENT بفهم کِی فایلی باز، ذخیره، بسته، حذف یا تغییرنام داده شده.',
            blocks: [
                { type: 'p', text: 'یک `FileEventListener` ثبت کن. رویداد `FileEvent` یک `type()` (OPENED/SAVED/CLOSED/DELETED/RENAMED)، یک `path()` و برای تغییرنام یک `previousPath()` دارد.' },
                {
                    type: 'code', filename: 'IdeEventsListener.java', lang: 'java', code:
`import ir.hanzodev1375.ghostide.ide.ui.api.FileEvent;
import ir.hanzodev1375.ghostide.ide.ui.api.FileEventListener;
import ir.hanzodev1375.ghostide.ide.ui.api.IdeEvents;

// داخل activate:
FileEventListener listener = new FileEventListener() {
  @Override
  public void onFileEvent(FileEvent event) {
    switch (event.type()) {
      case SAVED:
        context.getLogger().info("saved: " + event.path());
        break;
      case RENAMED:
        context.getLogger().info(event.previousPath() + " -> " + event.path());
        break;
      default:
        break;
    }
  }
};
context.registerDisposable(
    context.getExtensions().register(IdeEvents.FILE_EVENT, listener, owner, 0));`
                },
                { type: 'note', variant: 'warn', text: 'listener ممکن است روی هر threadی صدا زده شود؛ هرگز مستقیم از آن به View دست نزن.' }
            ]
        },

        'sample-icons': {
            title: 'آیکن فایل سفارشی',
            filename: 'SampleIcons.java',
            module: 'ide-ui-api',
            dek: 'با یک فایل JSON و چند تصویر، آیکن فایل‌های مخصوص زبان خودت را در درخت فایل جایگزین کن.',
            blocks: [
                { type: 'p', text: 'کلاس آماده‌ی `JsonFileIconContributor` یک فایل JSON و پوشه‌ی تصاویر می‌گیرد و آیکن مناسب هر پسوند/نام فایل/پوشه را برمی‌گرداند. تصاویر از assets استخراج و کش می‌شوند.' },
                { type: 'h2', text: '۱. فایل JSON آیکن‌ها' },
                {
                    type: 'code', filename: 'assets/fileicons/icons.json', lang: 'json', code:
`{
  "asset_dir": "fileicons",
  "defaults": {
    "file": "default_file",
    "folder": "default_folder",
    "root_folder": "default_root_folder"
  },
  "fileExtensions": {
    "foo": "file_type_foo",
    "bar": "file_type_bar"
  },
  "fileNames": {
    "makefile": "file_type_makefile"
  },
  "folderNames": {
    "src": "folder_src"
  }
}`
                },
                { type: 'p', text: 'کنار همین فایل، تصاویر `file_type_foo.svg`، `folder_src.svg` و… را در پوشه‌ی `assets/fileicons/` بگذار (پسوندهای `.svg/.png/.jpg/.webp` پشتیبانی می‌شوند).' },
                { type: 'h2', text: '۲. کلاس contributor' },
                {
                    type: 'code', filename: 'icons/SampleIcons.java', lang: 'java', code:
`package com.example.samplekit.icons;

import android.content.Context;

import ir.hanzodev1375.ghostide.ide.ui.api.FileIconContributor;
import ir.hanzodev1375.ghostide.ide.ui.api.JsonFileIconContributor;

public final class SampleIcons implements FileIconContributor {

  private final JsonFileIconContributor delegate;

  public SampleIcons(Context android) {
    this.delegate = new JsonFileIconContributor(android, "fileicons/icons.json");
  }

  @Override
  public String getIcon(String filePath) {
    return delegate.getIcon(filePath);
  }
}`
                },
                { type: 'note', variant: 'tip', text: 'اگر فقط چند پسوند ساده می‌خواهی، می‌توانی مستقیماً `FileIconContributor` را پیاده کنی و بسته به `filePath` یک نام drawable یا مسیر برگردانی.' }
            ]
        },

        'sample-lsp': {
            title: 'افزودن Language Server',
            filename: 'SampleLspProvider.java',
            module: 'ide-api',
            dek: 'یک زبان جدید را به ادیتور معرفی کن. میزبان خودش چرخه‌ی LSP را مدیریت می‌کند؛ تو فقط می‌گویی کدام فایل‌ها را پشتیبانی می‌کنی و چطور پروسه را اجرا کنی.',
            blocks: [
                { type: 'p', text: '`LspServerProvider` تعیین می‌کند کدام درخواست را پشتیبانی می‌کند و یک `LspServerDefinition` می‌سازد. خود تعریف شامل پسوندها، نمایش‌نام و یک `LspServerConnectionFactory` است. اگر سرورت داخل rootfs پروت است، از سرویس `ProotProcessLauncher` استفاده کن.' },
                {
                    type: 'code', filename: 'lsp/SampleLspProvider.java', lang: 'java', code:
`package com.example.samplekit.lsp;

import java.util.List;
import java.util.Set;

import ir.hanzodev1375.ghostide.ide.api.LspServerConnection;
import ir.hanzodev1375.ghostide.ide.api.LspServerDefinition;
import ir.hanzodev1375.ghostide.ide.api.LspServerProvider;
import ir.hanzodev1375.ghostide.ide.api.LspServerRequest;
import ir.hanzodev1375.ghostide.ide.ui.api.IdeHostServices;
import ir.hanzodev1375.ghostide.ide.ui.api.ProotProcessLauncher;
import ir.hanzodev1375.ghostide.plugin.api.PluginContext;

public final class SampleLspProvider implements LspServerProvider {

  private final ProotProcessLauncher launcher;

  public SampleLspProvider(PluginContext context) {
    this.launcher = context.getServices().require(IdeHostServices.PROOT_PROCESS_LAUNCHER);
  }

  @Override
  public String getId() {
    return "com.example.samplekit.lsp";
  }

  @Override
  public String getDisplayName() {
    return "Sample Language";
  }

  @Override
  public boolean supports(LspServerRequest request) {
    return "foo".equals(request.extension());
  }

  @Override
  public LspServerDefinition createDefinition(LspServerRequest request) {
    return LspServerDefinition
        .builder(
            "sample-language",
            Set.of("foo"),
            "Sample Language",
            r -> launcher.launch(
                r.projectRoot().getAbsolutePath(),
                "/usr/bin/sample-ls",
                List.of("--stdio")))
        .grammarScopeName("source.foo")
        .enableInlayHints(true)
        .enableSignatureHelp(true)
        .initializationTimeoutMillis(10000)
        .build();
  }
}`
                },
                { type: 'h2', text: 'اتصال دستی (بدون proot)' },
                { type: 'p', text: 'اگر می‌خواهی پروسه را خودت مدیریت کنی، یک `LspServerConnection` بنویس که `start()`، `getInputStream()/getOutputStream()` و `close()` را پیاده کند و همان را داخل builder بده.' },
                {
                    type: 'code', filename: 'MyConnection.java', lang: 'java', code:
`import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import ir.hanzodev1375.ghostide.ide.api.LspServerConnection;

public final class MyConnection implements LspServerConnection {

  private final Process process;

  public MyConnection(Process process) {
    this.process = process;
  }

  @Override public void start() throws IOException { /* process already started */ }
  @Override public OutputStream getOutputStream() { return process.getOutputStream(); }
  @Override public InputStream getInputStream() { return process.getInputStream(); }
  @Override public boolean isClosed() { return !process.isAlive(); }
  @Override public void close() { process.destroy(); }
}`
                },
                { type: 'note', variant: 'info', text: 'مقدار `grammarScopeName` به ThemeMaker وصل می‌شود تا رنگ‌آمیزی نحو درست اعمال شود.' }
            ]
        },

        'sample-feedback': {
            title: 'پیام‌ها و سرویس‌های میزبان',
            filename: 'FeedbackUsage.java',
            module: 'ide-ui-api',
            dek: 'برای پیام کوتاه، پرسیدن ورودی و تأیید، از UiFeedbackHost استفاده کن؛ برای کار با ادیتور، فایل و اجرا هم سرویس‌های میزبان در دسترس‌اند.',
            blocks: [
                { type: 'p', text: '`UiFeedbackHost` سه متد دارد: `toast`، `promptInput` و `confirm`. همه‌ی سرویس‌های میزبان با `context.getServices().require(...)` گرفته می‌شوند.' },
                {
                    type: 'code', filename: 'FeedbackUsage.java', lang: 'java', code:
`import ir.hanzodev1375.ghostide.ide.ui.api.CodeRunnerHost;
import ir.hanzodev1375.ghostide.ide.ui.api.EditorHost;
import ir.hanzodev1375.ghostide.ide.ui.api.FileManagerHost;
import ir.hanzodev1375.ghostide.ide.ui.api.IdeHostServices;
import ir.hanzodev1375.ghostide.ide.ui.api.UiFeedbackHost;

// داخل activate یا هر جای دیگر:
UiFeedbackHost feedback = context.getServices().require(IdeHostServices.UI_FEEDBACK);
EditorHost editor = context.getServices().require(IdeHostServices.EDITOR_HOST);
FileManagerHost files = context.getServices().require(IdeHostServices.FILE_MANAGER_HOST);
CodeRunnerHost runner = context.getServices().require(IdeHostServices.CODE_RUNNER_HOST);

feedback.toast("Sample Kit ready");

feedback.promptInput("نام فایل جدید", "untitled.txt", text -> {
  if (text != null) {
    editor.setEditorText("// " + text);
  }
});

feedback.confirm("پاک کردن کش؟", "این عمل برگشت‌پذیر نیست.", confirmed -> {
  if (confirmed) {
    runner.runShell("rm -rf cache", true);
  }
});

// اجرای مستقیم یک دستور و خواندن خروجی
CodeRunnerHost.ExecResult result = runner.exec("echo hi", line -> {});
if (result.success()) {
  feedback.toast(result.output());
}`
                },
                { type: 'h2', text: 'جدول سرویس‌های میزبان' },
                {
                    type: 'table', headers: ['سرویس', 'کلید', 'کاربرد'], rows: [
                        ['`EditorHost`', '`IdeHostServices.EDITOR_HOST`', 'فایل باز، متن ادیتور، باز کردن فایل'],
                        ['`FileManagerHost`', '`IdeHostServices.FILE_MANAGER_HOST`', 'ریشه‌ی پروژه، فایل انتخاب‌شده، refresh'],
                        ['`CodeRunnerHost`', '`IdeHostServices.CODE_RUNNER_HOST`', 'اجرای شل/فایل و گرفتن خروجی'],
                        ['`UiFeedbackHost`', '`IdeHostServices.UI_FEEDBACK`', 'toast، پرسیدن ورودی، تأیید'],
                        ['`ProotProcessLauncher`', '`IdeHostServices.PROOT_PROCESS_LAUNCHER`', 'اجرای پروسه داخل rootfs'],
                        ['`Context`', '`IdeHostServices.PLUGIN_ANDROID_CONTEXT`', 'دسترسی به resources و inflate']
                    ]
                }
            ]
        },

        'sample-build': {
            title: 'ساخت و بسته‌بندی .gpl',
            filename: 'build-gpl.sh',
            dek: 'خروجی پروژه را به یک فایل .gpl تبدیل کن: کامپایل، ساختن dex با d8، و zip کردن همراه مانیفست.',
            blocks: [
                { type: 'p', text: 'فایل `.gpl` در واقع یک zip است که حداقل `classes.dex` و `assets/plugin.json` را دارد. منابع (مانند `resources.arsc` برای `R.string`) هم باید داخل zip باشند تا متن‌های پلاگین درست بیایند.' },
                {
                    type: 'list', ordered: true, items: [
                        'پلاگین را کامپایل کن: `./gradlew :app:assembleDebug` (خروجی dex/jar موقت).',
                        'کلاس‌های پلاگین را با `d8` به `classes.dex` تبدیل کن.',
                        '`classes.dex`، پوشه‌ی `assets/` (شامل `plugin.json`) و در صورت وجود `resources.arsc`/`res/` را در یک zip بگذار.',
                        'پسوند zip را به `.gpl` تغییر بده.',
                        'فایل را در `filesDir/gpl_plugins/` دستگاه کپی کن و اپ را ری‌استارت کن.'
                    ]
                },
                { type: 'h2', text: 'اسکریپت نمونه' },
                {
                    type: 'code', filename: 'build-gpl.sh', lang: 'bash', code:
`#!/usr/bin/env bash
set -euo pipefail

OUT=build/gpl
rm -rf "$OUT"
mkdir -p "$OUT"

# ۱) کامپایل کلاس‌های پلاگین در برابر APIها
javac -source 17 -target 17 \\
  -cp "app/libs/plugin-api-0.1.0.jar:app/libs/ide-api-0.1.0.jar" \\
  -d "$OUT/classes" \\
  $(find app/src/main/java -name '*.java')

# ۲) تبدیل به dex  (d8 از build-tools اندروید)
d8 --min-api 26 --output "$OUT" \\
  $(find "$OUT/classes" -name '*.class')

# ۳) کنار هم گذاشتن مانیفست و منابع
cp -r app/src/main/assets "$OUT/" 2>/dev/null || true

# ۴) ساخت فایل .gpl
mkdir -p "$OUT/zip"
cp "$OUT/classes.dex" "$OUT/zip/"
cp -r "$OUT/assets" "$OUT/zip/" 2>/dev/null || true
(cd "$OUT/zip" && zip -r ../samplekit.gpl .)

echo "ساخته شد: $OUT/samplekit.gpl"`
                },
                { type: 'note', variant: 'tip', text: 'برای افزودن متن‌های `R.string` باید `resources.arsc` و پوشه‌ی `res/` را هم از خروجی `assembleDebug` داخل zip بگذاری؛ وگرنه `Context.getString` روی منابع پلاگین پیدا نمی‌شود.' },
                { type: 'note', variant: 'info', text: 'مسیر نصب و بارگذاری را در [فرمت .gpl](#/packaging/gpl-format) و [نصب پلاگین](#/packaging/installing) ببین.' }
            ]
        }
    }
};
