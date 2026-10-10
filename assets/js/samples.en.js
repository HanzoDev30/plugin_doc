/* Ready-made plugin samples — kept out of content.en.js so that file stays small.
   Merged into CONTENT_EN from index.html. */
var SAMPLES_EN = {
    groupLabel: 'Samples',
    titles: {
        'sample-overview': 'Sample project layout',
        'sample-entry': 'Full entry class',
        'sample-settings': 'Plugin settings in the IDE settings screen',
        'sample-screen': 'UI screen (PluginScreen)',
        'sample-panel': 'Editor panel (EditorPanel)',
        'sample-command': 'Command (PluginCommand)',
        'sample-storage': 'Storage (PluginStorage)',
        'sample-events': 'Listening to file events',
        'sample-icons': 'Custom file icons',
        'sample-lsp': 'Adding a language server',
        'sample-feedback': 'Feedback and host services',
        'sample-build': 'Building and packaging .gpl'
    },
    pages: {

        'sample-overview': {
            title: 'Sample project layout',
            filename: 'SampleKit/',
            dek: 'A complete, copy-paste-ready project (SampleKit) that every sample in this section is drawn from. Start from this skeleton and get your plugin running with no friction.',
            blocks: [
                { type: 'p', text: 'The project is an Android app module with no Activity; it exists only to produce a `classes.dex`. Dependencies are pulled `compileOnly` from `libs/` so they are not copied into the `.gpl`.' },
                { type: 'h2', text: 'File tree' },
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
                { type: 'h2', text: '1. settings.gradle' },
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
                { type: 'h2', text: '2. Root build.gradle' },
                {
                    type: 'code', filename: 'build.gradle', lang: 'gradle', code:
`plugins {
    id 'com.android.application' version '8.5.0' apply false
}`
                },
                { type: 'h2', text: '3. app/build.gradle' },
                { type: 'p', text: 'Drop the three API files into `app/libs/`: `plugin-api-0.1.0.jar`, `ide-api-0.1.0.jar` and `ide-ui-api-release.aar`. If your plugin has no LSP you can drop `ide-api`; if it has no UI you can drop `ide-ui-api`.' },
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
                { type: 'h2', text: '4. AndroidManifest.xml' },
                {
                    type: 'code', filename: 'app/src/main/AndroidManifest.xml', lang: 'text', code:
`<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Not a real app: only used to get a dex. No activity, no permissions. -->
    <application
        android:allowBackup="false"
        android:label="SampleKit" />

</manifest>`
                },
                { type: 'h2', text: '5. Plugin manifest' },
                {
                    type: 'code', filename: 'app/src/main/assets/plugin.json', lang: 'json', code:
`{
  "id": "com.example.sample-kit",
  "name": "Sample Kit",
  "version": "1.0.0",
  "entryClass": "com.example.samplekit.SampleKitPlugin",
  "description": "A sample plugin demonstrating every Ghost IDE capability.",
  "author": "You",
  "minHostVersion": 1,
  "icon": "icon.png"
}`
                },
                { type: 'note', variant: 'tip', text: 'The `id` field may only contain letters, numbers, `.`, `_` and `-`, and is the same id you pass as `owner` on every registration — usually `context.getDescriptor().getId()`.' },
                { type: 'p', text: 'Next, read the [full entry class](#/samples/sample-entry) to see how all the pieces are wired together.' }
            ]
        },

        'sample-entry': {
            title: 'Full entry class',
            filename: 'SampleKitPlugin.java',
            module: 'plugin-api',
            dek: 'An entry class that registers all seven kinds of contribution: settings, screen, panel, command, event, icon and language server.',
            blocks: [
                { type: 'p', text: 'Everything starts in `activate(PluginContext)`. Each `register(...)` returns a `Disposable` that you hand to `context.registerDisposable(...)` so unload releases it automatically.' },
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

  /** Environment setup commands; the host only runs them in a terminal after the user confirms. */
  @Override
  public List<PluginSetupAction> getSetupActions() {
    return List.of(
        new PluginSetupAction(
            "install-tool",
            "Install sample tool",
            "npm install -g sample-tool",
            "Installs the sample language tool inside the rootfs."));
  }

  @Override
  public void activate(PluginContext context) {
    String owner = context.getDescriptor().getId();
    PluginStorage storage = context.getServices().require(CoreServices.PLUGIN_STORAGE);
    Context android = context.getServices().require(IdeHostServices.PLUGIN_ANDROID_CONTEXT);

    settings = new SampleSettings(storage);
    panel = new SamplePanel(context, settings);

    // 1) editor panel
    register(context, owner, PluginUiExtensionPoints.EDITOR_PANEL, panel);

    // 2) full UI screen
    register(context, owner, PluginUiExtensionPoints.PLUGIN_SCREEN, new SampleScreen());

    // 3) settings rows in the host settings screen
    register(
        context,
        owner,
        CoreExtensionPoints.PLUGIN_SETTINGS,
        new SampleSettingsContributor(android, settings, panel));

    // 4) an invokable command
    register(context, owner, CoreExtensionPoints.PLUGIN_COMMAND, new SampleCommand(context));

    // 5) a custom file icon contributor
    register(context, owner, PluginUiExtensionPoints.FILE_ICON_CONTRIBUTOR, new SampleIcons(android));

    // 6) listen to file events (may be called from any thread)
    register(
        context,
        owner,
        IdeEvents.FILE_EVENT,
        event -> context.getLogger().info("file event: " + event));

    // 7) add a language server
    register(context, owner, EditorExtensionPoints.LSP_SERVER_PROVIDER, new SampleLspProvider(context));

    context.getLogger().info("Sample Kit activated");
  }

  @Override
  public void deactivate() {
    // Every registration already holds a Disposable; only release manual resources here.
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
                { type: 'note', variant: 'info', text: 'If the plugin is LSP-only it never needs `ide-ui-api`: depend on `plugin-api` and `ide-api` and keep only registration "7".' },
                { type: 'p', text: 'Next, see [plugin settings](#/samples/sample-settings), the newest API feature.' }
            ]
        },

        'sample-settings': {
            title: 'Plugin settings in the IDE settings screen',
            filename: 'SampleSettingsContributor.java',
            module: 'plugin-api',
            dek: 'Instead of building a separate settings screen, drop your rows straight into the host settings screen — either a toggle or a plain tappable row.',
            blocks: [
                { type: 'p', text: 'Implement `PluginSettingsContributor` and register it at `CoreExtensionPoints.PLUGIN_SETTINGS`. The host re-reads `getSettings()` every time the settings screen opens and tags each row with your plugin name.' },
                { type: 'note', variant: 'info', text: 'There are two row kinds: `PluginSetting.toggle(...)` for a switch and `PluginSetting.action(...)` for a plain row that runs code on tap. For richer choices (lists, sliders) use an `action` and show your own dialog or screen. Callbacks run on the UI thread.' },
                { type: 'h2', text: '1. Put the text in resources' },
                { type: 'p', text: 'Read text from `R.string` so it localizes with the device language and ships inside the `.gpl`.' },
                {
                    type: 'code', filename: 'res/values/strings.xml', lang: 'text', code:
`<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="prefs_group_name">Sample Kit</string>

    <string name="setting_wrap">Word wrap</string>
    <string name="setting_wrap_desc">Wrap long lines in the panel</string>

    <string name="setting_autoreload">Auto reload</string>
    <string name="setting_autoreload_desc">Reload when the file is saved</string>

    <string name="setting_clear_cache">Clear cache</string>
    <string name="setting_clear_cache_desc">Purge the panel cache</string>
</resources>`
                },
                { type: 'h2', text: '2. Keep state in PluginStorage' },
                {
                    type: 'code', filename: 'SampleSettings.java', lang: 'java', code:
`package com.example.samplekit;

import ir.hanzodev1375.ghostide.plugin.api.PluginStorage;

/** Plugin preferences; values live in PluginStorage and survive restarts. */
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
                { type: 'h2', text: '3. Build the rows' },
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
                { type: 'note', variant: 'tip', text: 'Each row `id` keys the value in `storage`; use the same constants in `SampleSettings` and the contributor so the value read matches the value written.' }
            ]
        },

        'sample-screen': {
            title: 'UI screen (PluginScreen)',
            filename: 'SampleScreen.java',
            module: 'ide-ui-api',
            dek: 'A full screen added to the Ghost IDE screen list, with access to host services (editor, files, runner).',
            blocks: [
                { type: 'p', text: '`PluginScreen` needs only `getId`, `getTitle` and `createFragment`. Inside the Fragment you pull services from `IdeHostServices`; you can also use `IdeHostServices.PLUGIN_ANDROID_CONTEXT` for inflating.' },
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

    @Nullable
    @Override
    public View onCreateView(
        @NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle state) {
      return build();
    }

    private View build() {
      LinearLayout root = new LinearLayout(requireContext());
      root.setOrientation(LinearLayout.VERTICAL);
      int pad = dp(16);
      root.setPadding(pad, pad, pad, pad);

      TextView title = new TextView(requireContext());
      title.setText("Current editor text:");
      root.addView(title);

      EditText input = new EditText(requireContext());
      root.addView(input);

      Button apply = new Button(requireContext());
      apply.setText("Put into editor");
      apply.setOnClickListener(v -> { /* use injected EditorHost */ });
      root.addView(apply);
      return root;
    }

    private int dp(int value) {
      return Math.round(value * getResources().getDisplayMetrics().density);
    }
  }
}`
                },
                { type: 'h2', text: 'The correct way: inject services from activate' },
                {
                    type: 'code', filename: 'ui/SampleScreen.java (better)', lang: 'java', code:
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
    // ... same build()
  }
}`
                },
                { type: 'p', text: 'In `SampleKitPlugin.activate` build and register it like this:' },
                {
                    type: 'code', filename: 'SampleKitPlugin.java (excerpt)', lang: 'java', code:
`EditorHost editor = context.getServices().require(IdeHostServices.EDITOR_HOST);
Context android = context.getServices().require(IdeHostServices.PLUGIN_ANDROID_CONTEXT);
register(context, owner, PluginUiExtensionPoints.PLUGIN_SCREEN,
    new SampleScreen(editor, android));`
                }
            ]
        },

        'sample-panel': {
            title: 'Editor panel (EditorPanel)',
            filename: 'SamplePanel.java',
            module: 'ide-ui-api',
            dek: 'A panel that opens next to the editor, like the Live Preview panel. Its display mode can be changed with PluginStateMod.',
            blocks: [
                { type: 'p', text: '`Panel` (and therefore `EditorPanel` and `FilePanel`) builds a `View` via `createView()` and picks where it shows via `getState()/setState()`: `SIDESHEET`, `DIALOGFRAGMENT`, `FRAGMENT`, `FLOATINGWINDOWS` and more.' },
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
                { type: 'note', variant: 'tip', text: 'To change the display mode, call `panel.setState(PluginStateMod.FLOATINGWINDOWS);` in `activate()` after building the panel — the value is stored in `PanelStateStore` and read by the host.' }
            ]
        },

        'sample-command': {
            title: 'Command (PluginCommand)',
            filename: 'SampleCommand.java',
            module: 'plugin-api',
            dek: 'An invokable action the host (and, in future, a command palette) can list and run.',
            blocks: [
                { type: 'p', text: '`PluginCommand` has three parts: `getId()` (unique, reverse-domain), `getTitle()` and `execute()`. Execution may arrive on any thread; move to the main thread yourself before touching UI.' },
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
    return "Runs the currently open file in the terminal.";
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
      Executors.newSingleThreadExecutor().execute(() -> runner.exec("file " + path, null));
    }
  }
}`
                },
                { type: 'note', variant: 'info', text: '`execute()` runs off the main thread; do not block it for long and never touch views directly.' }
            ]
        },

        'sample-storage': {
            title: 'Storage (PluginStorage)',
            filename: 'SampleStorageUsage.java',
            module: 'plugin-api',
            dek: 'Every plugin has an isolated key-value space, namespaced by its id, that survives restarts.',
            blocks: [
                { type: 'p', text: 'Get the `CoreServices.PLUGIN_STORAGE` service and store primitives (String/boolean/int/long/float). For large payloads create files in your own private directory instead.' },
                {
                    type: 'code', filename: 'SampleStorageUsage.java', lang: 'java', code:
`import ir.hanzodev1375.ghostide.plugin.api.CoreServices;
import ir.hanzodev1375.ghostide.plugin.api.PluginStorage;

// inside activate:
PluginStorage storage = context.getServices().require(CoreServices.PLUGIN_STORAGE);

storage.putString("lastFile", "/sdcard/notes.txt");
storage.putInt("runCount", storage.getInt("runCount", 0) + 1);
storage.putBoolean("firstRun", false);

String last = storage.getString("lastFile", "");
boolean has = storage.contains("runCount");
storage.remove("lastFile");
// storage.clear(); // wipes all data for this plugin`
                },
                { type: 'note', variant: 'info', text: 'Always pass a default (`defValue`); a missing key returns it and never throws.' }
            ]
        },

        'sample-events': {
            title: 'Listening to file events',
            filename: 'IdeEventsListener.java',
            module: 'ide-ui-api',
            dek: 'Use the IdeEvents.FILE_EVENT extension point to learn when a file is opened, saved, closed, deleted or renamed.',
            blocks: [
                { type: 'p', text: 'Register a `FileEventListener`. A `FileEvent` carries a `type()` (OPENED/SAVED/CLOSED/DELETED/RENAMED), a `path()` and, for renames, a `previousPath()`.' },
                {
                    type: 'code', filename: 'IdeEventsListener.java', lang: 'java', code:
`import ir.hanzodev1375.ghostide.ide.ui.api.FileEvent;
import ir.hanzodev1375.ghostide.ide.ui.api.FileEventListener;
import ir.hanzodev1375.ghostide.ide.ui.api.IdeEvents;

// inside activate:
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
                { type: 'note', variant: 'warn', text: 'The listener may be called on any thread; never touch a View directly from it.' }
            ]
        },

        'sample-icons': {
            title: 'Custom file icons',
            filename: 'SampleIcons.java',
            module: 'ide-ui-api',
            dek: 'With one JSON file and a few images, override the icons shown for your language files in the file tree.',
            blocks: [
                { type: 'p', text: 'The ready-made `JsonFileIconContributor` takes a JSON file and an artwork folder and returns the right icon per extension / file name / folder. Artwork is extracted from assets and cached.' },
                { type: 'h2', text: '1. The icon JSON file' },
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
                { type: 'p', text: 'Next to it, put artwork `file_type_foo.svg`, `folder_src.svg`, etc. in `assets/fileicons/` (`.svg/.png/.jpg/.webp` are supported).' },
                { type: 'h2', text: '2. The contributor class' },
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
                { type: 'note', variant: 'tip', text: 'If you only need a couple of extensions, implement `FileIconContributor` directly and return a drawable name or path based on `filePath`.' }
            ]
        },

        'sample-lsp': {
            title: 'Adding a language server',
            filename: 'SampleLspProvider.java',
            module: 'ide-api',
            dek: 'Introduce a new language to the editor. The host manages the LSP lifecycle; you only declare which files you support and how to launch the process.',
            blocks: [
                { type: 'p', text: '`LspServerProvider` decides which request it supports and builds an `LspServerDefinition`. The definition carries the extensions, display name and an `LspServerConnectionFactory`. If your server is a proot binary inside the rootfs, use the `ProotProcessLauncher` service.' },
                {
                    type: 'code', filename: 'lsp/SampleLspProvider.java', lang: 'java', code:
`package com.example.samplekit.lsp;

import java.util.List;
import java.util.Set;

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
                { type: 'h2', text: 'Manual connection (without proot)' },
                { type: 'p', text: 'If you want to manage the process yourself, write an `LspServerConnection` implementing `start()`, `getInputStream()/getOutputStream()` and `close()`, and pass it into the builder.' },
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
                { type: 'note', variant: 'info', text: '`grammarScopeName` connects to ThemeMaker so syntax highlighting colors are applied correctly.' }
            ]
        },

        'sample-feedback': {
            title: 'Feedback and host services',
            filename: 'FeedbackUsage.java',
            module: 'ide-ui-api',
            dek: 'For short messages, input prompts and confirmations use UiFeedbackHost; for editor, file and runner access the host services are available.',
            blocks: [
                { type: 'p', text: '`UiFeedbackHost` exposes `toast`, `promptInput` and `confirm`. All host services are obtained with `context.getServices().require(...)`.' },
                {
                    type: 'code', filename: 'FeedbackUsage.java', lang: 'java', code:
`import ir.hanzodev1375.ghostide.ide.ui.api.CodeRunnerHost;
import ir.hanzodev1375.ghostide.ide.ui.api.EditorHost;
import ir.hanzodev1375.ghostide.ide.ui.api.FileManagerHost;
import ir.hanzodev1375.ghostide.ide.ui.api.IdeHostServices;
import ir.hanzodev1375.ghostide.ide.ui.api.UiFeedbackHost;

// inside activate or anywhere:
UiFeedbackHost feedback = context.getServices().require(IdeHostServices.UI_FEEDBACK);
EditorHost editor = context.getServices().require(IdeHostServices.EDITOR_HOST);
FileManagerHost files = context.getServices().require(IdeHostServices.FILE_MANAGER_HOST);
CodeRunnerHost runner = context.getServices().require(IdeHostServices.CODE_RUNNER_HOST);

feedback.toast("Sample Kit ready");

feedback.promptInput("New file name", "untitled.txt", text -> {
  if (text != null) {
    editor.setEditorText("// " + text);
  }
});

feedback.confirm("Clear cache?", "This cannot be undone.", confirmed -> {
  if (confirmed) {
    runner.runShell("rm -rf cache", true);
  }
});

// Run a command and read its output
CodeRunnerHost.ExecResult result = runner.exec("echo hi", line -> {});
if (result.success()) {
  feedback.toast(result.output());
}`
                },
                { type: 'h2', text: 'Host services table' },
                {
                    type: 'table', headers: ['Service', 'Key', 'Purpose'], rows: [
                        ['`EditorHost`', '`IdeHostServices.EDITOR_HOST`', 'open file, editor text, open file'],
                        ['`FileManagerHost`', '`IdeHostServices.FILE_MANAGER_HOST`', 'project root, selected file, refresh'],
                        ['`CodeRunnerHost`', '`IdeHostServices.CODE_RUNNER_HOST`', 'run shell/file and read output'],
                        ['`UiFeedbackHost`', '`IdeHostServices.UI_FEEDBACK`', 'toast, prompt input, confirm'],
                        ['`ProotProcessLauncher`', '`IdeHostServices.PROOT_PROCESS_LAUNCHER`', 'run a process inside the rootfs'],
                        ['`Context`', '`IdeHostServices.PLUGIN_ANDROID_CONTEXT`', 'access resources and inflate']
                    ]
                }
            ]
        },

        'sample-build': {
            title: 'Building and packaging .gpl',
            filename: 'build-gpl.sh',
            dek: 'Turn the project output into a .gpl file: compile, build the dex with d8, and zip it with the manifest.',
            blocks: [
                { type: 'p', text: 'A `.gpl` file is really a zip that contains at least `classes.dex` and `assets/plugin.json`. Resources (such as `resources.arsc` for `R.string`) must be inside the zip too, so plugin strings resolve.' },
                {
                    type: 'list', ordered: true, items: [
                        'Compile the plugin: `./gradlew :app:assembleDebug` (intermediate dex/jar output).',
                        'Convert the plugin classes to `classes.dex` with `d8`.',
                        'Zip `classes.dex`, the `assets/` folder (with `plugin.json`) and `resources.arsc`/`res/` when present.',
                        'Rename the zip to `.gpl`.',
                        'Copy it into the device `filesDir/gpl_plugins/` and restart the app.'
                    ]
                },
                { type: 'h2', text: 'Sample script' },
                {
                    type: 'code', filename: 'build-gpl.sh', lang: 'bash', code:
`#!/usr/bin/env bash
set -euo pipefail

OUT=build/gpl
rm -rf "$OUT"
mkdir -p "$OUT"

# 1) compile plugin classes against the APIs
javac -source 17 -target 17 \\
  -cp "app/libs/plugin-api-0.1.0.jar:app/libs/ide-api-0.1.0.jar" \\
  -d "$OUT/classes" \\
  $(find app/src/main/java -name '*.java')

# 2) convert to dex  (d8 from Android build-tools)
d8 --min-api 26 --output "$OUT" \\
  $(find "$OUT/classes" -name '*.class')

# 3) bring in the manifest and resources
cp -r app/src/main/assets "$OUT/" 2>/dev/null || true

# 4) build the .gpl file
mkdir -p "$OUT/zip"
cp "$OUT/classes.dex" "$OUT/zip/"
cp -r "$OUT/assets" "$OUT/zip/" 2>/dev/null || true
(cd "$OUT/zip" && zip -r ../samplekit.gpl .)

echo "built: $OUT/samplekit.gpl"`
                },
                { type: 'note', variant: 'tip', text: 'To include `R.string` text you must also place `resources.arsc` and the `res/` folder from the `assembleDebug` output inside the zip; otherwise `Context.getString` cannot find the plugin resources.' },
                { type: 'note', variant: 'info', text: 'See the install and load path in [.gpl format](#/packaging/gpl-format) and [Installing plugins](#/packaging/installing).' }
            ]
        }
    }
};
