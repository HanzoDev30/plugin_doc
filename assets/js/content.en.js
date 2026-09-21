var CONTENT_EN = {
  nav: {
    groups: {
      start: 'Getting Started',
      core: 'Core Concepts',
      ext: 'Extensions',
      services: 'Services',
      lsp: 'LSP Integration',
      ui: 'UI Integration',
      packaging: 'Packaging (.gpl)',
      example: 'Full Example'
    },
    pages: {
      intro: 'Introduction',
      architecture: 'Architecture',
      quickstart: 'Quickstart',
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
      'lsp-overview': 'Overview',
      'lsp-server-provider': 'LspServerProvider',
      'lsp-server-definition': 'LspServerDefinition',
      'lsp-server-connection': 'LspServerConnection',
      'ui-overview': 'Overview',
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
      'gpl-format': '.gpl Format',
      'build-plugin': 'Building a Plugin',
      'loading-lifecycle': 'Loading Lifecycle',
      installing: 'Installing Plugins',
      'hello-world': 'Hello Ghost'
    }
  },

  home: {
    eyebrow: 'Developer Docs · Ghost IDE',
    title: 'Extend Ghost IDE with your own **plugin**',
    lead: 'A three-part API for adding a language server (LSP), a custom UI screen, or any other capability to Ghost IDE — without touching the app\u2019s own code.',
    ctaPrimary: { group: 'start', slug: 'intro', label: 'Start reading' },
    ctaSecondary: 'GitHub repo',
    stats: [
      { value: '3', label: 'independent API modules' },
      { value: '7', label: 'ready-made extension points' },
      { value: 'Java 17', label: 'language & version' }
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
      { group: 'start', slug: 'architecture', icon: 'compass', title: 'Platform architecture', desc: 'A map of the three API modules and how they relate to the host app.' },
      { group: 'core', slug: 'ghost-plugin', icon: 'box', title: 'GhostPlugin', desc: 'Every plugin\u2019s entry point and its activate/deactivate lifecycle.' },
      { group: 'ext', slug: 'extension-point', icon: 'plug', title: 'Extension system', desc: 'Register a capability at an extension point with a priority and clear ownership.' },
      { group: 'lsp', slug: 'lsp-server-provider', icon: 'terminal', title: 'Add a language server', desc: 'Introduce a new language server to the editor via LspServerProvider.' },
      { group: 'ui', slug: 'plugin-screen', icon: 'layout', title: 'Add a UI screen', desc: 'Register a complete Fragment as a plugin screen.' },
      { group: 'packaging', slug: 'gpl-format', icon: 'package', title: 'Package as .gpl', desc: 'The install-file layout and the plugin.json manifest.' }
    ]
  },

  pages: {

    intro: {
      title: 'Introduction',
      filename: 'README.md',
      dek: 'Ghost IDE ships with a first-class plugin layer \u2014 the very same API its own built-in features are built on.',
      blocks: [
        { type: 'p', text: 'A Ghost IDE plugin is a Java class that implements `GhostPlugin`, is packaged inside a `.gpl` bundle, and is loaded at runtime with a DexClassLoader. Once loaded, `activate(PluginContext)` is called, and from there the plugin reaches the extension and service registries.' },
        { type: 'p', text: 'The API is split across three independent modules, so a plugin only depends on what it actually needs:' },
        { type: 'table', headers: ['Module', 'Kind', 'Depends on', 'Purpose'], rows: [
          ['`plugin-api`', 'Plain Java library', 'none', 'Core plugin, extension and service model'],
          ['`ide-api`', 'Plain Java library', '`plugin-api` + `lsp4j`', 'Add a language server (LSP) to the editor'],
          ['`ide-ui-api`', 'Android library', '`plugin-api` + `androidx.appcompat`', 'Add a UI screen and reach host services']
        ] },
        { type: 'note', variant: 'info', text: 'All three modules compile with **Java 17**. `plugin-api` deliberately has zero Android dependency, so plain plugin logic can be compiled and tested without the Android SDK.' },
        { type: 'h2', text: 'What makes up a plugin?' },
        { type: 'list', items: [
          '**Entry class** \u2014 a `GhostPlugin` implementation with a no-arg constructor.',
          '**Manifest** \u2014 an `assets/plugin.json` file with an id, version and entry class name.',
          '**`.gpl` bundle** \u2014 the final install artifact: a zip containing the manifest and `classes.dex`.'
        ] },
        { type: 'p', text: 'Head to [Quickstart](#/start/quickstart) for the short version, or jump straight to the [Hello Ghost example](#/example/hello-world) to see a complete plugin from scratch to install.' }
      ]
    },

    architecture: {
      title: 'Architecture',
      filename: 'ARCHITECTURE.md',
      dek: 'The module map, the extension/service registries, and where plugin code ends and host code begins.',
      blocks: [
        { type: 'h2', text: 'Module map' },
        { type: 'modulemap', items: [
          { name: 'plugin-api', desc: 'The plugin model itself: PluginContext, ExtensionPoint/Registry, ServiceKey/Registry, GlobalRegistry.' },
          { name: 'ide-api', desc: 'Depends on plugin-api. The LSP_SERVER_PROVIDER extension point for adding a language server.' },
          { name: 'ide-ui-api', desc: 'Depends on plugin-api. The PLUGIN_SCREEN / EDITOR_PANEL / EDITOR_ACTION_HANDLER extension points plus the EditorHost, FileManagerHost and CodeRunnerHost services.' }
        ] },
        { type: 'p', text: 'The `:app` module (the app itself) depends on all three, and is the only place where the real registry implementations (`DefaultExtensionRegistry`, `DefaultServiceRegistry`) and the plugin loader (`GplPluginLoader`) actually live. Plugin code never talks to `:app`\u2019s internal classes directly \u2014 only to the `plugin-api`/`ide-api`/`ide-ui-api` interfaces.' },
        { type: 'h2', text: 'Two shared registries' },
        { type: 'p', text: '`GlobalRegistry` is a static, process-wide holder that exposes two registries:' },
        { type: 'table', headers: ['Registry', 'Scope', 'Why'], rows: [
          ['`GlobalRegistry.extensions()`', 'One instance shared by every plugin', 'Modules like `:editor` need to see every registered provider from any plugin.'],
          ['`GlobalRegistry.services()`', 'A shared base; each plugin gets a **copy**', 'Each plugin needs its own Android `Context` without leaking it to other plugins.']
        ] },
        { type: 'note', variant: 'warn', text: 'Because extensions live in one *shared* registry, cleanup on unload depends entirely on correctly setting `ownerPluginId` at registration time. See [Extension Registry](#/ext/extension-registry) for details.' },
        { type: 'h2', text: 'A request\u2019s path' },
        { type: 'list', ordered: true, items: [
          'The host app reads a `.gpl` file from the install folder and calls `GplPluginLoader.load()`.',
          'The loader reads the manifest, loads the entry class with a dedicated class loader, and builds a `PluginContext`.',
          '`activate(context)` is called; the plugin registers capabilities through `context.getExtensions()` and `context.getServices()`.',
          'The rest of the app (e.g. `:editor` when opening a file) uses `ExtensionRegistry.extensions(point)` to find active providers.'
        ] }
      ]
    },

    quickstart: {
      title: 'Quickstart',
      filename: 'QUICKSTART.md',
      dek: 'The shortest path from nothing to a plugin installed on Ghost IDE.',
      blocks: [
        { type: 'list', ordered: true, items: [
          '**Add a dependency** \u2014 depend on `plugin-api` (and `ide-api` or `ide-ui-api` if needed) in your plugin module\u2019s `build.gradle`.',
          '**Implement `GhostPlugin`** \u2014 a class with a no-arg constructor that overrides `activate(PluginContext)`.',
          '**Register your capability** \u2014 through `context.getExtensions().register(...)`, with `ownerPluginId` set to your own id.',
          '**Write a manifest** \u2014 `assets/plugin.json` with `id`, `name`, `version`, `entryClass`.',
          '**Package it** \u2014 put the manifest and `classes.dex` into a zip with a `.gpl` extension.',
          '**Install it** \u2014 copy the `.gpl` file into the device\u2019s plugin install folder.'
        ] },
        { type: 'code', filename: 'build.gradle', lang: 'gradle', code:
`dependencies {
  // plugin-api, ide-api and ide-ui-api are NOT on any public repository.
  // Download them from GitHub Actions ("ghostide-plugin-sdk" artifact)
  // or from a Release, then point to the local jar/aar files:
  compileOnly files('libs/plugin-api.jar')
  compileOnly files('libs/ide-api.jar')
  compileOnly files('libs/ide-ui-api.aar')
}` },
        { type: 'note', variant: 'info', text: 'The `ir.hanzodev1375.ghostide:...` group is **not published anywhere** \u2014 the host app ships these APIs itself. Grab the compiled files from the **ghostide-plugin-sdk** artifact of [GitHub Actions](https://github.com/HanzoDev1375/GhostIdes/actions) or from a [Release](https://github.com/HanzoDev1375/GhostIdes/releases) of the Ghost IDE repo.' },
        { type: 'note', variant: 'tip', text: 'To see all six steps with real, complete code, go to the [Hello Ghost example](#/example/hello-world) \u2014 it walks through this exact path end to end.' }
      ]
    },

    'ghost-plugin': {
      title: 'GhostPlugin',
      filename: 'GhostPlugin.java',
      module: 'plugin-api',
      dek: 'The entry point of every Ghost IDE plugin.',
      blocks: [
        { type: 'p', text: 'At runtime, the class named by `entryClass` in the manifest is constructed with a no-arg constructor, then `activate(PluginContext)` is called. The plugin should register its capabilities through `context.getExtensions()`, and must register the returned `Disposable` with `PluginContext.registerDisposable(Disposable)` so cleanup on unload is deterministic.' },
        { type: 'code', filename: 'GhostPlugin.java', lang: 'java', code:
`public interface GhostPlugin {

  default List<PluginSetupAction> getSetupActions() {
    return Collections.emptyList();
  }

  void activate(PluginContext context);

  default void deactivate() {}
}` },
        { type: 'table', headers: ['Method', 'Required', 'Description'], rows: [
          ['`activate(PluginContext)`', 'Yes', 'Called once after loading; the place to register extensions and services.'],
          ['`deactivate()`', 'No, empty by default', 'Called right before unload; the place to wind down anything started in activate.'],
          ['`getSetupActions()`', 'No, empty list by default', 'Environment setup commands (e.g. installing a language server), only run with explicit user confirmation in the terminal.']
        ] },
        { type: 'note', variant: 'warn', text: 'If the `Disposable` returned from `register(...)` is never passed to `registerDisposable`, nothing frees it for you on unload.' }
      ]
    },

    'plugin-context': {
      title: 'PluginContext',
      filename: 'PluginContext.java',
      module: 'plugin-api',
      dek: 'Everything a plugin needs inside activate() to introduce itself.',
      blocks: [
        { type: 'p', text: 'This interface is deliberately free of any Android framework dependency, which is what keeps `plugin-api` a plain JVM dependency \u2014 plugin logic can be compiled and tested without the Android SDK.' },
        { type: 'code', filename: 'PluginContext.java', lang: 'java', code:
`public interface PluginContext {

  PluginDescriptor getDescriptor();

  MutableExtensionRegistry getExtensions();

  ServiceRegistry getServices();

  PluginLogger getLogger();

  Disposable registerDisposable(Disposable disposable);
}` },
        { type: 'table', headers: ['Method', 'Returns', 'Description'], rows: [
          ['`getDescriptor()`', '`PluginDescriptor`', 'The current plugin\u2019s identity (id, name, version, ...).'],
          ['`getExtensions()`', '`MutableExtensionRegistry`', 'Used to register a capability at an `ExtensionPoint`; shared across every plugin.'],
          ['`getServices()`', '`ServiceRegistry`', 'Read-only access to the services available to this plugin \u2014 its own copy.'],
          ['`getLogger()`', '`PluginLogger`', 'A logger automatically tagged with this plugin\u2019s id.'],
          ['`registerDisposable(Disposable)`', '`Disposable`', 'For deterministic cleanup on unload \u2014 always call this.']
        ] },
        { type: 'note', variant: 'info', text: '`getServices()` returns the read-only `ServiceRegistry` type, not `MutableServiceRegistry`. Plugins may only *read* host services, not register new services for others.' }
      ]
    },

    'plugin-descriptor': {
      title: 'PluginDescriptor',
      filename: 'PluginDescriptor.java',
      module: 'plugin-api',
      dek: 'The immutable, parsed identity of an installed plugin.',
      blocks: [
        { type: 'p', text: 'Instances are immutable and only built through `Builder`. Equality (`equals`) is based on the `id` + `version` pair.' },
        { type: 'table', headers: ['Field', 'Type', 'Requirement'], rows: [
          ['`id`', '`String`', 'Must match the pattern `[A-Za-z0-9_.-]+`.'],
          ['`name`', '`String`', 'Must not be blank.'],
          ['`version`', '`String`', 'Must not be blank.'],
          ['`entryClass`', '`String`', 'Fully-qualified name of the class implementing `GhostPlugin`.'],
          ['`description`, `author`, `source`', '`String`', 'Optional; default is an empty string.'],
          ['`classPath`', '`List<String>`', 'Optional; default is an empty list.'],
          ['`dependencies`', '`List<PluginDependency>`', 'Optional; default is an empty list.'],
          ['`capabilities`', '`Set<String>`', 'Optional; default is an empty set.'],
          ['`enabledByDefault`', '`boolean`', 'Optional; default `true`.']
        ] },
        { type: 'code', filename: 'PluginDescriptor.java', lang: 'java', code:
`PluginDescriptor descriptor = PluginDescriptor
    .builder("com.example.rust-tools", "Rust Tools", "1.0.0", "com.example.RustPlugin")
    .description("rust-analyzer integration for Ghost IDE")
    .author("you")
    .capabilities(Set.of("lsp"))
    .build();` },
        { type: 'note', variant: 'info', text: 'In practice, building a `PluginDescriptor` is the host\u2019s job \u2014 `GplPluginLoader` builds one from `plugin.json` for you. You typically only ever read it through `context.getDescriptor()`.' }
      ]
    },

    'plugin-dependency': {
      title: 'PluginDependency',
      filename: 'PluginDependency.java',
      module: 'plugin-api',
      dek: 'A plugin\u2019s declared dependency on another plugin\u2019s id.',
      blocks: [
        { type: 'p', text: 'A simple `record` checked before a plugin is activated. `id` must not be blank.' },
        { type: 'code', filename: 'PluginDependency.java', lang: 'java', code:
`public record PluginDependency(String id, String minVersion, boolean optional) {

  public static PluginDependency required(String id) {
    return new PluginDependency(id, null, false);
  }

  public static PluginDependency optional(String id) {
    return new PluginDependency(id, null, true);
  }
}` },
        { type: 'table', headers: ['Field', 'Description'], rows: [
          ['`id`', 'The id of the required plugin.'],
          ['`minVersion`', 'The lowest acceptable version, or `null` meaning any version is acceptable.'],
          ['`optional`', 'When `true`, this dependency being missing does not block activation.']
        ] },
        { type: 'p', text: 'Typical use inside `PluginDescriptor.Builder.dependencies(...)`:' },
        { type: 'code', filename: 'PluginDescriptor.java', lang: 'java', code:
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
      dek: 'The logging interface the host exposes to a plugin through PluginContext.',
      blocks: [
        { type: 'code', filename: 'PluginLogger.java', lang: 'java', code:
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
        { type: 'p', text: 'In the current host implementation, every message is sent to Android Logcat tagged `gpl:<plugin id>` \u2014 meaning each plugin\u2019s logs are automatically distinguishable from everyone else\u2019s.' },
        { type: 'code', filename: 'RustPlugin.java', lang: 'java', code: `context.getLogger().info("rust-analyzer connection started");` }
      ]
    },

    disposable: {
      title: 'Disposable',
      filename: 'Disposable.java',
      module: 'plugin-api',
      dek: 'A single unit of cleanup, owned by a specific registration.',
      blocks: [
        { type: 'p', text: 'Almost every registration in this API \u2014 extension or service \u2014 returns a `Disposable`. It\u2019s the plugin\u2019s responsibility to hold onto it via `PluginContext.registerDisposable(Disposable)`, so the runtime can release it on unload.' },
        { type: 'code', filename: 'Disposable.java', lang: 'java', code:
`@FunctionalInterface
public interface Disposable {

  Disposable NONE = () -> {};

  void dispose();
}` },
        { type: 'code', filename: 'HelloGhostPlugin.java', lang: 'java', code:
`Disposable registration = context.getExtensions().register(
    PluginUiExtensionPoints.PLUGIN_SCREEN,
    new HelloScreen(),
    context.getDescriptor().getId(),
    0);

context.registerDisposable(registration);` },
        { type: 'note', variant: 'tip', text: 'Since `Disposable` is a functional interface, a lambda can be one too \u2014 handy for closing a resource manually: `context.registerDisposable(() -> myResource.close());`' }
      ]
    },

    'setup-actions': {
      title: 'PluginSetupAction',
      filename: 'PluginSetupAction.java',
      module: 'plugin-api',
      dek: 'An environment setup command owned by the whole plugin \u2014 not by a specific extension point.',
      blocks: [
        { type: 'p', text: 'Designed for things like installing a language server inside the proot Debian environment. The host runs these commands **only** through an interactive terminal handoff, with explicit user confirmation \u2014 never silently.' },
        { type: 'code', filename: 'PluginSetupAction.java', lang: 'java', code:
`public record PluginSetupAction(String id, String label, String command, String description) {

  public PluginSetupAction(String id, String label, String command) {
    this(id, label, command, "");
  }
}` },
        { type: 'table', headers: ['Field', 'Description'], rows: [
          ['`id`', 'A stable id for this action, scoped within the plugin itself.'],
          ['`label`', 'A short, user-facing label.'],
          ['`command`', 'The shell command text, passed verbatim to a login shell.'],
          ['`description`', 'A longer explanation shown before the user confirms.']
        ] },
        { type: 'code', filename: 'RustPlugin.java', lang: 'java', code:
`@Override
public List<PluginSetupAction> getSetupActions() {
  return List.of(new PluginSetupAction(
      "install-rust-analyzer",
      "Install rust-analyzer",
      "rustup component add rust-analyzer",
      "Installs rust-analyzer via rustup inside the terminal environment."));
}` }
      ]
    },

    'plugin-storage': {
      title: 'PluginStorage',
      filename: 'PluginStorage.java',
      module: 'plugin-api',
      dek: 'Persistent key-value storage scoped to your own plugin \u2014 survives restarts and reloads.',
      blocks: [
        { type: 'p', text: 'Published by the host under `CoreServices.PLUGIN_STORAGE`. Every plugin receives its own isolated instance (namespaced by its descriptor id), so you can never read or overwrite another plugin\u2019s data. Because it lives in `plugin-api`, even Android-free LSP plugins can use it.' },
        { type: 'code', filename: 'PluginStorage.java', lang: 'java', code:
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
        { type: 'code', filename: 'MyPlugin.java', lang: 'java', code:
`PluginStorage storage = context.getServices().require(CoreServices.PLUGIN_STORAGE);

int runs = storage.getInt("runCount", 0);
storage.putInt("runCount", runs + 1);
storage.putString("lastPath", "/sdcard/Project/main.py");` },
        { type: 'note', variant: 'tip', text: 'Keep values small \u2014 this store is not meant for large blobs. For bigger payloads write files inside your plugin\u2019s private directory instead.' }
      ]
    },

    'extension-point': {
      title: 'ExtensionPoint',
      filename: 'ExtensionPoint.java',
      module: 'plugin-api',
      dek: 'The contract a group of registered capabilities must implement.',
      blocks: [
        { type: 'p', text: 'A simple `record` holding a unique id and the `Class` type every registration must implement. The platform ships with seven extension points today:' },
        { type: 'table', headers: ['Extension point', 'Type', 'Module'], rows: [
          ['`EditorExtensionPoints.LSP_SERVER_PROVIDER`', '`LspServerProvider`', '`ide-api`'],
          ['`PluginUiExtensionPoints.PLUGIN_SCREEN`', '`PluginScreen`', '`ide-ui-api`'],
          ['`PluginUiExtensionPoints.EDITOR_PANEL`', '`EditorPanel`', '`ide-ui-api`'],
          ['`PluginUiExtensionPoints.EDITOR_ACTION_HANDLER`', '`EditorActionHandler`', '`ide-ui-api`'],
          ['`PluginUiExtensionPoints.FILE_ICON_CONTRIBUTOR`', '`FileIconContributor`', '`ide-ui-api`'],
          ['`IdeEvents.FILE_EVENT`', '`FileEventListener`', '`ide-ui-api`'],
          ['`CoreExtensionPoints.PLUGIN_COMMAND`', '`PluginCommand`', '`plugin-api`']
        ] },
        { type: 'code', filename: 'ExtensionPoint.java', lang: 'java', code:
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
        { type: 'p', text: 'For details on each, see [LspServerProvider](#/lsp/lsp-server-provider), [PluginScreen](#/ui/plugin-screen), [EditorPanel](#/ui/editor-panel) or [EditorActionHandler](#/ui/editor-action-handler).' }
      ]
    },

    'extension-registry': {
      title: 'ExtensionRegistry',
      filename: 'ExtensionRegistry.java',
      module: 'plugin-api',
      dek: 'Where capabilities registered at an ExtensionPoint are written and read, ordered by priority.',
      blocks: [
        { type: 'p', text: '`ExtensionRegistry` is read-only. `MutableExtensionRegistry`, returned by `PluginContext.getExtensions()`, adds registration and cleanup on top.' },
        { type: 'code', filename: 'ExtensionRegistry.java', lang: 'java', code:
`public interface ExtensionRegistry {

  <T> List<ExtensionRegistration<T>> registrations(ExtensionPoint<T> point);

  default <T> List<T> extensions(ExtensionPoint<T> point) {
    return registrations(point).stream()
        .map(ExtensionRegistration::extension)
        .collect(Collectors.toList());
  }
}` },
        { type: 'code', filename: 'MutableExtensionRegistry.java', lang: 'java', code:
`public interface MutableExtensionRegistry extends ExtensionRegistry {

  <T> Disposable register(ExtensionPoint<T> point, T extension, String ownerPluginId, int priority);

  default <T> Disposable register(ExtensionPoint<T> point, T extension) {
    return register(point, extension, PluginIds.CORE, 0);
  }

  void unregisterOwner(String ownerPluginId);
}` },
        { type: 'note', variant: 'warn', text: 'Always use the four-argument `register(point, extension, ownerPluginId, priority)` overload and set `ownerPluginId` to `context.getDescriptor().getId()`. The two-argument overload attributes the registration to `PluginIds.CORE` \u2014 so when your plugin unloads, `unregisterOwner(yourId)` will never find and clean it up.' },
        { type: 'code', filename: 'HelloGhostPlugin.java', lang: 'java', code:
`context.getExtensions().register(
    PluginUiExtensionPoints.PLUGIN_SCREEN,
    new HelloScreen(),
    context.getDescriptor().getId(),
    0);` },
        { type: 'h2', text: 'DefaultExtensionRegistry' },
        { type: 'p', text: 'The in-memory implementation, backed by a `CopyOnWriteArrayList` and safe for concurrent access. On registration, if the extension object doesn\u2019t implement the type declared by `ExtensionPoint.type()`, it throws `IllegalArgumentException`.' },
        { type: 'p', text: '`registrations(point)` sorts results by **descending** priority, breaking ties with a stable sort on `ownerPluginId` \u2014 so you get the same ordering every time.' }
      ]
    },

    'configurable-extension': {
      title: 'ConfigurableExtension',
      filename: 'ConfigurableExtension.java',
      module: 'plugin-api',
      dek: 'Stable identity and user-facing metadata for one extension contribution \u2014 the base of every typed contract.',
      blocks: [
        { type: 'p', text: 'Every typed extension contract (currently just `LspServerProvider`) extends this interface.' },
        { type: 'code', filename: 'ConfigurableExtension.java', lang: 'java', code:
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
        { type: 'table', headers: ['Method', 'Default'], rows: [
          ['`getId()`', 'Required \u2014 no default.'],
          ['`getDisplayName()`', 'Equal to `getId()`.'],
          ['`getDescription()`', 'Empty string.'],
          ['`isEnabledByDefault()`', '`true`.'],
          ['`isCanDisable()`', '`true`.']
        ] }
      ]
    },

    'plugin-command': {
      title: 'PluginCommand',
      filename: 'PluginCommand.java',
      module: 'plugin-api',
      dek: 'A named, user-invokable action your plugin contributes \u2014 the building block for a command palette.',
      blocks: [
        { type: 'p', text: 'Register implementations at `CoreExtensionPoints.PLUGIN_COMMAND` so the host can list and invoke them. Ids must be unique and reverse-domain namespaced, e.g. `com.example.myplugin.format`.' },
        { type: 'code', filename: 'PluginCommand.java', lang: 'java', code:
`public interface PluginCommand {

  String getId();      // unique, reverse-domain
  String getTitle();   // short user-facing label

  default String getDescription() {
    return "";
  }

  void execute();
}` },
        { type: 'code', filename: 'FormatCommand.java', lang: 'java', code:
`public final class FormatCommand implements PluginCommand {

  @Override public String getId() { return "com.example.myplugin.format"; }

  @Override public String getTitle() { return "Format project"; }

  @Override public void execute() {
    // may be called off the main thread \u2014 hop before touching UI
  }
}` },
        { type: 'code', filename: 'MyPlugin.java', lang: 'java', code:
`context.registerDisposable(
    context.getExtensions().register(
        CoreExtensionPoints.PLUGIN_COMMAND,
        new FormatCommand(),
        context.getDescriptor().getId(),
        0));` },
        { type: 'note', variant: 'tip', text: '`execute()` may be invoked from any thread. Move to the main thread yourself before touching the editor or any view.' }
      ]
    },

    'service-key': {
      title: 'ServiceKey',
      filename: 'ServiceKey.java',
      module: 'plugin-api',
      dek: 'The identity of a service the host makes available.',
      blocks: [
        { type: 'code', filename: 'ServiceKey.java', lang: 'java', code:
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
        { type: 'p', text: 'The `ide-ui-api` module publishes six ready-made keys \u2014 `IdeHostServices.EDITOR_HOST`, `FILE_MANAGER_HOST`, `CODE_RUNNER_HOST`, `PLUGIN_ANDROID_CONTEXT`, `PROOT_PROCESS_LAUNCHER` and `UI_FEEDBACK`. See [IdeHostServices](#/ui/ide-host-services) for details.' }
      ]
    },

    'service-registry': {
      title: 'ServiceRegistry',
      filename: 'ServiceRegistry.java',
      module: 'plugin-api',
      dek: 'Read-only lookup of the services the host has made available to a plugin.',
      blocks: [
        { type: 'code', filename: 'ServiceRegistry.java', lang: 'java', code:
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
        { type: 'code', filename: 'HelloGhostPlugin.java', lang: 'java', code:
`EditorHost editor = context.getServices().require(IdeHostServices.EDITOR_HOST);
String openPath = editor.getOpenFile().getAbsolutePath();` },
        { type: 'h2', text: 'MutableServiceRegistry and DefaultServiceRegistry' },
        { type: 'p', text: '`MutableServiceRegistry` adds `register`, `unregister` and `copy()`. `DefaultServiceRegistry` is the in-memory implementation, backed by a `ConcurrentHashMap`.' },
        { type: 'note', variant: 'info', text: '`copy()` is exactly the mechanism that keeps every plugin isolated from every other: the host builds an independent copy of `GlobalRegistry.services()` and registers that plugin\u2019s own `PLUGIN_ANDROID_CONTEXT` only inside that copy.' }
      ]
    },

    'global-registry': {
      title: 'GlobalRegistry',
      filename: 'GlobalRegistry.java',
      module: 'plugin-api',
      dek: 'The static, process-wide holder for the shared extension and service registries.',
      blocks: [
        { type: 'code', filename: 'GlobalRegistry.java', lang: 'java', code:
`public final class GlobalRegistry {

  public static MutableExtensionRegistry extensions() {
    return EXTENSIONS;
  }

  public static MutableServiceRegistry services() {
    return SERVICES;
  }
}` },
        { type: 'p', text: 'It lives in `plugin-api` so both `:editor` and `:app` can reach it without depending on each other \u2014 `:editor` to read registered providers, `:app` to write built-in and plugin-contributed registrations.' },
        { type: 'note', variant: 'warn', text: 'Plugin code should essentially never call `GlobalRegistry` directly. Always go through `context.getExtensions()` and `context.getServices()` \u2014 those are the ones the host has wired up correctly, with the proper isolation.' }
      ]
    },

    'lsp-overview': {
      title: 'ide-api module overview',
      filename: 'ide-api/README.md',
      module: 'ide-api',
      dek: 'The extension point that lets the editor learn about a new language server from a plugin.',
      blocks: [
        { type: 'p', text: '`ide-api` builds on `plugin-api` and `org.eclipse.lsp4j`, adding exactly one extension point: `EditorExtensionPoints.LSP_SERVER_PROVIDER`. If the language you want to support isn\u2019t already built into the app, this is where you plug in.' },
        { type: 'note', variant: 'info', text: 'The editor already ships with servers such as Clangd, OmniSharp (C#), HTML, CSS, Emmet, Go, JSON, Markdown, PHP, Pylsp (Python), Ruby (Solargraph), Sass, TypeScript and Vue \u2014 all running inside the proot Debian environment. `LSP_SERVER_PROVIDER` is for languages that list doesn\u2019t cover.' },
        { type: 'p', text: 'To introduce a new server you need three things: an `LspServerProvider` that decides which files it covers, an `LspServerDefinition` describing the server, and an `LspServerConnection` that actually manages the server\u2019s process and I/O streams.' }
      ]
    },

    'lsp-server-provider': {
      title: 'LspServerProvider',
      filename: 'LspServerProvider.java',
      module: 'ide-api',
      dek: 'Introduces a language server to the editor.',
      blocks: [
        { type: 'p', text: 'Register an instance of this interface at the `EditorExtensionPoints.LSP_SERVER_PROVIDER` extension point.' },
        { type: 'code', filename: 'LspServerProvider.java', lang: 'java', code:
`public interface LspServerProvider extends ConfigurableExtension {

  default int getPriority() {
    return 0;
  }

  boolean supports(LspServerRequest request);

  LspServerDefinition createDefinition(LspServerRequest request);
}` },
        { type: 'table', headers: ['Method', 'Description'], rows: [
          ['`supports(request)`', 'Decides, from the `LspServerRequest` (project root + file), whether this provider is responsible for this file.'],
          ['`createDefinition(request)`', 'Once `supports` returns true, builds and returns the full `LspServerDefinition`.'],
          ['`getPriority()`', 'When several providers cover the same file, the highest priority wins.']
        ] },
        { type: 'code', filename: 'RustLspProvider.java', lang: 'java', code:
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
        { type: 'code', filename: 'RustPlugin.java', lang: 'java', code:
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
      dek: 'Everything the editor needs to route files to a language server and shape the connection.',
      blocks: [
        { type: 'p', text: 'Immutable, and only built through `Builder`. The app keeps one shared connection per id/project combination.' },
        { type: 'table', headers: ['Builder field', 'Type', 'Default'], rows: [
          ['`grammarScopeName(String)`', 'String', '\u2014'],
          ['`expectedCapabilities(ServerCapabilities)`', 'lsp4j `ServerCapabilities`', '\u2014'],
          ['`initializationOptions(Object)`', 'Object', '\u2014'],
          ['`configuration(Object)`', 'Object', '\u2014'],
          ['`enableInlayHints(boolean)`', 'boolean', '`true`'],
          ['`enableSignatureHelp(boolean)`', 'boolean', '`true`'],
          ['`initializationTimeoutMillis(int)`', 'int', '`10000`'],
          ['`traceIncomingMessages(boolean)`', 'boolean', '`false`'],
          ['`textMateGrammarLink(String)`', 'String', '\u2014']
        ] },
        { type: 'code', filename: 'RustLspProvider.java', lang: 'java', code:
`LspServerDefinition definition = LspServerDefinition
    .builder("com.example.rust-analyzer", Set.of("rs"), "rust-analyzer", RustConnection::new)
    .grammarScopeName("source.rust")
    .initializationTimeoutMillis(15_000)
    .enableInlayHints(true)
    .build();` },
        { type: 'note', variant: 'warn', text: 'If `fileExtensions` is empty, `displayName` is blank, or `initializationTimeoutMillis` is zero or negative, the constructor throws `IllegalArgumentException` immediately.' }
      ]
    },

    'lsp-server-connection': {
      title: 'LspServerConnection',
      filename: 'LspServerConnection.java',
      module: 'ide-api',
      dek: 'The actual connection to a language server \u2014 the raw LSP protocol I/O streams.',
      blocks: [
        { type: 'code', filename: 'LspServerConnection.java', lang: 'java', code:
`public interface LspServerConnection extends AutoCloseable {

  void start() throws IOException;

  OutputStream getOutputStream();

  InputStream getInputStream();

  boolean isClosed();

  @Override
  void close();
}` },
        { type: 'note', variant: 'warn', text: 'Implementations should only actually start the process/connection inside `start()` \u2014 never in the constructor. Any diagnostic output from the server must go to stderr, not to `getOutputStream()`, or the LSP protocol\u2019s stdio framing gets corrupted.' },
        { type: 'code', filename: 'LspServerConnectionFactory.java', lang: 'java', code:
`@FunctionalInterface
public interface LspServerConnectionFactory {
  LspServerConnection create(LspServerRequest request);
}` },
        { type: 'code', filename: 'LspServerRequest.java', lang: 'java', code:
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
      title: 'ide-ui-api module overview',
      filename: 'ide-ui-api/README.md',
      module: 'ide-ui-api',
      dek: 'The extension point and services for adding UI and reaching the host.',
      blocks: [
        { type: 'p', text: '`ide-ui-api` is an Android library (namespace: `ir.hanzodev1375.ghostide.ide.ui.api`, `minSdk 26`, `compileSdk 36`) that builds on `plugin-api` and `androidx.appcompat`.' },
        { type: 'note', variant: 'info', text: 'Android doesn\u2019t let dynamically loaded code declare a new `<activity>` in the host\u2019s manifest. That\u2019s why a plugin\u2019s \u201cscreen\u201d is actually a `Fragment`, not an Activity \u2014 the same technique Android plugin frameworks commonly use. The host app has a single screen-hosting Activity that displays this Fragment.' },
        { type: 'p', text: 'To add a screen, see the [PluginScreen](#/ui/plugin-screen) interface. To slide a panel inside the running editor, see [EditorPanel](#/ui/editor-panel). To reach the open editor or file manager, see [EditorHost](#/ui/editor-host) and [FileManagerHost](#/ui/file-manager-host). To run code or a shell command, see [CodeRunnerHost](#/ui/code-runner-host). To intercept your language server\u2019s commands locally, see [EditorActionHandler](#/ui/editor-action-handler).' }
      ]
    },

    'ide-host-services': {
      title: 'IdeHostServices',
      filename: 'IdeHostServices.java',
      module: 'ide-ui-api',
      dek: 'The service keys the host publishes for a plugin to look up via services().',
      blocks: [
        { type: 'code', filename: 'IdeHostServices.java', lang: 'java', code:
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
        { type: 'p', text: 'A `Context` scoped to the plugin itself, not to the host Activity. To inflate a `PluginScreen`\u2019s layout you must go through this Context, not the host Activity\u2019s default inflater \u2014 otherwise the plugin\u2019s own `R.layout` ids won\u2019t resolve.' },
        { type: 'code', filename: 'HelloScreenFragment.java', lang: 'java', code:
`Context pluginContext = context.getServices().require(IdeHostServices.PLUGIN_ANDROID_CONTEXT);
LayoutInflater.from(pluginContext)
    .cloneInContext(pluginContext)
    .inflate(R.layout.my_screen, container, false);` },
        { type: 'h2', text: 'CODE_RUNNER_HOST' },
        { type: 'p', text: 'The service a plugin asks for when it wants to run code or a shell command \u2014 see [CodeRunnerHost](#/ui/code-runner-host).' }
      ]
    },

    'editor-host': {
      title: 'EditorHost',
      filename: 'EditorHost.java',
      module: 'ide-ui-api',
      dek: 'The service published under IdeHostServices.EDITOR_HOST.',
      blocks: [
        { type: 'p', text: 'Describes only the capabilities a plugin needs from the editor screen \u2014 it never exposes the real `EditorActivity`/`IdeEditor` classes, so `:app` stays the only module that knows about them.' },
        { type: 'code', filename: 'EditorHost.java', lang: 'java', code:
`public interface EditorHost {

  File getProjectRoot();

  File getOpenFile();

  String getEditorText();

  void setEditorText(String text);

  void openFile(File file);

  Context getContext();

  // Optional: the raw editor widget, or null when no file is open
  Object getEditor();
}` },
        { type: 'code', filename: 'HelloGhostPlugin.java', lang: 'java', code:
`EditorHost editor = context.getServices().require(IdeHostServices.EDITOR_HOST);
editor.setEditorText(editor.getEditorText() + "\\n// added by HelloGhost");` },
        { type: 'h2', text: 'getEditor()' },
        { type: 'p', text: 'The plain methods above are enough for most plugins. `getEditor()` is the escape hatch: it returns the real editor widget behind the current tab \u2014 the host\u2019s `IdeEditor` \u2014 as an `Object`, or `null` when no file is open. `IdeEditor` lives in the host editor module, not in this API, so add that module as a `compileOnly` dependency to cast:' },
        { type: 'code', filename: 'HelloGhostPlugin.java', lang: 'java', code:
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
      dek: 'The service published under IdeHostServices.FILE_MANAGER_HOST.',
      blocks: [
        { type: 'code', filename: 'FileManagerHost.java', lang: 'java', code:
`public interface FileManagerHost {

  File getRootDirectory();

  File getSelectedFile();

  void refresh();

  void openFile(File file);

  Context getContext();
}` },
        { type: 'code', filename: 'HelloGhostPlugin.java', lang: 'java', code:
`FileManagerHost fileManager = context.getServices().require(IdeHostServices.FILE_MANAGER_HOST);
fileManager.refresh();` }
      ]
    },

    'code-runner-host': {
      title: 'CodeRunnerHost',
      filename: 'CodeRunnerHost.java',
      module: 'ide-ui-api',
      dek: 'Runs a shell command or a source file in the IDE terminal \u2014 exactly like pressing the editor\u2019s run (FAB) button.',
      blocks: [
        { type: 'p', text: 'Registered by the host under `IdeHostServices.CODE_RUNNER_HOST`. Use it whenever your plugin needs to run code or a shell command \u2014 the command is handed to the IDE terminal, which opens either as a bottom sheet or as a full screen.' },
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
        { type: 'table', headers: ['Method', 'Description'], rows: [
          ['`runShell(command, asBottomSheet)`', 'Runs any shell command in the terminal.'],
          ['`runCurrentFile(asBottomSheet)`', 'Runs the file that is currently open in the editor, like the FAB.'],
          ['`runFile(filePath, asBottomSheet)`', 'Runs a specific file by path.'],
          ['`isSupported(filePath)`', '`true` if the runner knows how to execute that file type.'],
          ['`exec(command, onOutputLine)`', 'Headless run with no UI \u2014 returns `ExecResult`. Blocking: call from a background thread.']
        ] },
        { type: 'p', text: 'The `asBottomSheet` argument decides how the terminal is shown: `true` opens it as a bottom sheet, `false` as a full screen.' },
        { type: 'code', filename: 'HelloGhostPlugin.java', lang: 'java', code:
`CodeRunnerHost runner = context.getServices().require(IdeHostServices.CODE_RUNNER_HOST);

// run any command in the terminal
runner.runShell("python3 main.py", true);

// run the file currently open in the editor
runner.runCurrentFile();

// run a specific file
runner.runFile("/sdcard/Project/main.py", false);

// check before running
if (runner.isSupported("/sdcard/Project/main.py")) {
  runner.runFile("/sdcard/Project/main.py", true);
}` },
        { type: 'note', variant: 'tip', text: '`runCurrentFile()` decides the path through the registered `EditorPanel`s: the first non-blank `EditorPanel.getLastPath()` wins, otherwise it falls back to the file open in the editor. See [EditorPanel](#/ui/editor-panel).' },
        { type: 'h2', text: 'exec() \u2014 headless with output capture' },
        { type: 'p', text: 'When you need the command\u2019s output programmatically instead of showing the terminal, use `exec()`. It runs via `sh -c` with no UI and blocks until the process exits \u2014 always call it from a background thread. The optional `Consumer<String>` receives each merged stdout/stderr line as it arrives.' },
        { type: 'code', filename: 'GitStatusTask.java', lang: 'java', code:
`CodeRunnerHost.ExecResult result =
    runner.exec("git -C /sdcard/Project status --porcelain", null);

if (result.success()) {
  String listing = result.output();   // parse it however you like
} else {
  ui.toast("git failed: " + result.exitCode());
}` },
        { type: 'note', variant: 'warn', text: '`exec()` runs in the app\u2019s own shell environment, which is not necessarily identical to the interactive terminal session. Binaries living inside the proot rootfs should go through [ProotProcessLauncher](#/ui/ui-overview) instead.' }
      ]
    },

    'editor-panel': {
      title: 'EditorPanel',
      filename: 'EditorPanel.java',
      module: 'ide-ui-api',
      dek: 'A UI panel a plugin slides into the running editor screen \u2014 the VS Code \u201cwebview / side panel\u201d equivalent.',
      blocks: [
        { type: 'p', text: 'Register an implementation at `PluginUiExtensionPoints.EDITOR_PANEL`. The host creates the panel\u2019s `View` once when it is first shown and keeps it for the rest of the Activity\u2019s lifetime, so build your view lazily and keep its state inside it.' },
        { type: 'code', filename: 'EditorPanel.java', lang: 'java', code:
`public interface EditorPanel {

  String getId();

  String getTitle();

  View createView();

  // Optional: which file/path this panel is about
  default String getLastPath() {
    return null;
  }
}` },
        { type: 'p', text: 'Inflate layouts with the plugin\u2019s own scoped context, or your `R.layout` ids will not resolve:' },
        { type: 'code', filename: 'MyPanel.java', lang: 'java', code:
`Context pluginContext = context.getServices().require(IdeHostServices.PLUGIN_ANDROID_CONTEXT);
View view = LayoutInflater.from(pluginContext)
    .cloneInContext(pluginContext)
    .inflate(R.layout.my_panel, root, false);` },
        { type: 'h2', text: 'getLastPath()' },
        { type: 'p', text: 'Returns the path your panel is currently about \u2014 for example a file the panel\u2019s user picked. The host consults every panel\u2019s `getLastPath()` when running the current file (`CodeRunnerHost.runCurrentFile()`); if you return `null`, the host falls back to the file open in the editor.' },
        { type: 'note', variant: 'tip', text: 'To show a panel with a different window style, override `getState()` / call `setState(PluginStateMod)` \u2014 side sheet, dialog, bottom sheet and more are all supported.' }
      ]
    },

    'editor-action-handler': {
      title: 'EditorActionHandler',
      filename: 'EditorActionHandler.java',
      module: 'ide-ui-api',
      dek: 'Lets a plugin intercept its own LSP command actions locally instead of forwarding them back to the language server.',
      blocks: [
        { type: 'p', text: 'Commands the editor receives from LSP code actions are normally forwarded back to the server via `workspace/executeCommand`. Registering an `EditorActionHandler` at `PluginUiExtensionPoints.EDITOR_ACTION_HANDLER` lets your plugin handle its own commands locally \u2014 where the raw editor widget is available.' },
        { type: 'code', filename: 'EditorActionHandler.java', lang: 'java', code:
`public interface EditorActionHandler {

  String getCommandId();

  boolean execute(Object editor, String command, List<Object> arguments);
}` },
        { type: 'table', headers: ['Method', 'Description'], rows: [
          ['`getCommandId()`', 'The command id this handler owns \u2014 the editor only calls you for commands with this exact id.'],
          ['`execute(editor, command, arguments)`', 'Runs the command. Return `true` if you handled it; `false` lets the editor forward it to the server as before.']
        ] },
        { type: 'p', text: 'The `editor` argument is the raw `IdeEditor` widget behind the action (an `Object` because `IdeEditor` lives in the host editor module, not in this API), or `null` when no editor is attached. Add the host editor module as a `compileOnly` dependency to cast:' },
        { type: 'code', filename: 'MyActionHandler.java', lang: 'java', code:
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
        { type: 'code', filename: 'RustPlugin.java', lang: 'java', code:
`context.getExtensions().register(
    PluginUiExtensionPoints.EDITOR_ACTION_HANDLER,
    new MyActionHandler(),
    context.getDescriptor().getId(),
    0);` },
        { type: 'note', variant: 'warn', text: '`execute` may run on a background thread, so hop back to the UI thread before touching the editor.' }
      ]
    },

    'ui-feedback-host': {
      title: 'UiFeedbackHost',
      filename: 'UiFeedbackHost.java',
      module: 'ide-ui-api',
      dek: 'Shows toasts and simple dialogs (input, confirm) on behalf of your plugin \u2014 no Activity required.',
      blocks: [
        { type: 'p', text: 'Published by the host under `IdeHostServices.UI_FEEDBACK`. All methods are safe to call from any thread \u2014 the host hops to the main thread internally. Dialog callbacks fire with `null`/`false` when no Activity is available to host the dialog, so always handle those cases.' },
        { type: 'code', filename: 'UiFeedbackHost.java', lang: 'java', code:
`public interface UiFeedbackHost {

  default void toast(String message) { toast(message, false); }
  void toast(String message, boolean longDuration);

  void promptInput(String title, String prefill, InputCallback callback);

  void confirm(String title, String message, ConfirmCallback callback);

  @FunctionalInterface interface InputCallback {
    void onInput(String text);   // null = cancelled
  }

  @FunctionalInterface interface ConfirmCallback {
    void onResult(boolean confirmed);
  }
}` },
        { type: 'code', filename: 'MyPlugin.java', lang: 'java', code:
`UiFeedbackHost ui = context.getServices().require(IdeHostServices.UI_FEEDBACK);

ui.toast("Indexed 42 files");

ui.confirm("Format all?", "This rewrites 12 files.", confirmed -> {
  if (confirmed) formatAll();
});

ui.promptInput("Project name", "my-app", name -> {
  if (name == null) return; // cancelled
  createProject(name);
});` },
        { type: 'note', variant: 'tip', text: 'Prefer this service over holding a `Context` yourself: it always targets whatever screen the user is currently looking at.' }
      ]
    },

    'ide-events': {
      title: 'IdeEvents / FileEvent',
      filename: 'IdeEvents.java',
      module: 'ide-ui-api',
      dek: 'Subscribes to file lifecycle changes everywhere in the IDE \u2014 opened, saved, closed, deleted, renamed.',
      blocks: [
        { type: 'p', text: 'Register a `FileEventListener` at `IdeEvents.FILE_EVENT`. Your listener is unregistered automatically when your plugin unloads. Listeners may be called from any thread (saves and deletes happen on background threads) \u2014 hop to the main thread before touching UI.' },
        { type: 'table', headers: ['Event type', 'Meaning'], rows: [
          ['`OPENED`', 'A file was opened in a new editor tab (not merely re-focused).'],
          ['`SAVED`', 'The editor wrote a file\u2019s content to disk.'],
          ['`CLOSED`', 'An editor tab showing this file was closed.'],
          ['`DELETED`', 'A file or directory was deleted from disk.'],
          ['`RENAMED`', 'A file or directory was renamed/moved; `path()` is the new location, `previousPath()` the old one.']
        ] },
        { type: 'code', filename: 'MyPlugin.java', lang: 'java', code:
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
        { type: 'p', text: 'Paths are absolute filesystem paths. The static helper `IdeEvents.post(FileEvent)` is what the host itself calls internally to dispatch events to all listeners.' },
        { type: 'note', variant: 'tip', text: 'Typical uses: auto-formatting on save, invalidating an index on delete/rename, session restore on open.' }
      ]
    },

    'plugin-screen': {
      title: 'PluginScreen',
      filename: 'PluginScreen.java',
      module: 'ide-ui-api',
      dek: 'A complete screen contributed by a plugin.',
      blocks: [
        { type: 'code', filename: 'PluginScreen.java', lang: 'java', code:
`public interface PluginScreen {

  String getId();

  String getTitle();

  Fragment createFragment();
}` },
        { type: 'p', text: 'Register an instance at the `PluginUiExtensionPoints.PLUGIN_SCREEN` extension point. The Fragment\u2019s layout and resources come from the plugin\u2019s own `.gpl` bundle, not from the host app\u2019s resources.' },
        { type: 'code', filename: 'PluginUiExtensionPoints.java', lang: 'java', code:
`public final class PluginUiExtensionPoints {

  public static final ExtensionPoint<PluginScreen> PLUGIN_SCREEN =
      new ExtensionPoint<>("ir.hanzodev1375.ghostide.ui.pluginScreen", PluginScreen.class);

  public static final ExtensionPoint<EditorPanel> EDITOR_PANEL =
      new ExtensionPoint<>("ir.hanzodev1375.ghostide.ui.editorPanel", EditorPanel.class);

  public static final ExtensionPoint<EditorActionHandler> EDITOR_ACTION_HANDLER =
      new ExtensionPoint<>(
          "ir.hanzodev1375.ghostide.ui.editorActionHandler", EditorActionHandler.class);
}` },
        { type: 'p', text: 'For a complete implementation \u2014 including the Fragment itself \u2014 see the [Hello Ghost example](#/example/hello-world).' }
      ]
    },

    'file-icon-contributor': {
      title: 'FileIconContributor',
      filename: 'FileIconContributor.java',
      module: 'ide-ui-api',
      dek: 'Overrides the built-in file/folder icons for the paths a plugin decides \u2014 including whole icon packs.',
      blocks: [
        { type: 'p', text: 'Register a `FileIconContributor` at `PluginUiExtensionPoints.FILE_ICON_CONTRIBUTOR`. It is consulted for every icon shown in the file manager, editor tabs, history and bookmarks, **before** the built-in `file_icons.json` set. Return `null` for paths you do not handle so the next contributor \u2014 or the built-in set \u2014 takes over.' },
        { type: 'code', filename: 'FileIconContributor.java', lang: 'java', code:
`public interface FileIconContributor {

  String getIcon(String filePath);
}` },
        { type: 'table', headers: ['Return value', 'Meaning'], rows: [
          ['`file://...`, `content://...`', 'A full URI. Use it for artwork shipped inside your `.gpl`; extract it to private storage during `activate()` because Glide cannot open plugin assets through `android_asset`.'],
          ['`file_type_kotlin`', 'A bare icon name; resolved as `vscode_icons/<name>.svg` inside the host assets.'],
          ['`null` / blank', 'You do not handle this path \u2014 fall through to the next contributor, then the built-in set.']
        ] },
        { type: 'h2', text: 'JsonFileIconContributor' },
        { type: 'p', text: 'For bulk mappings, ship a JSON file in your plugin assets and register the ready-made `JsonFileIconContributor`. The JSON is **partial**: declare only the sections you want to override, and everything else falls through. Extension keys may be written as `hsi`, `.hsi` or `*.hsi` \u2014 all three are equivalent.' },
        { type: 'code', filename: 'assets/myicons.json', lang: 'json', code:
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
        { type: 'p', text: 'The VS Code spelling of the section names is accepted too: `fileExtensions` \u2192 `extensions`, `fileNames` \u2192 `filenames`, `folderNames` / `folderNamesExpanded` \u2192 `folders`. A minimal pack needs nothing but the mapping:' },
        { type: 'code', filename: 'assets/myicons.json', lang: 'json', code:
`{
  "extensions": {
    "hsi": "iconhsi"
  }
}` },
        { type: 'code', filename: 'MyPlugin.java', lang: 'java', code:
`public void activate(PluginContext context) {
  Context pluginContext =
      context.getServices().require(IdeHostServices.PLUGIN_ANDROID_CONTEXT);
  context.registerDisposable(
      context.getExtensions().register(
          PluginUiExtensionPoints.FILE_ICON_CONTRIBUTOR,
          new JsonFileIconContributor(pluginContext, "myicons.json")));
}` },
        { type: 'p', text: '`asset_dir` is optional; names that point at an SVG inside it are extracted once into the plugin\u2019s private storage and served as `file://` URIs, while unknown names fall back to the built-in `vscode_icons` set. `defaults` supports `file`, `folder` and `root_folder`.' },
        { type: 'h2', text: 'Priority between icon packs' },
        { type: 'p', text: 'Several icon plugins can be active at once. The **newest installed** plugin is queried first \u2014 its priority is derived from the `.gpl` install time and survives restarts. The first non-null answer wins per path, so a newer pack overrides older packs on the keys it declares and falls back to them \u2014 and finally to the built-in set \u2014 everywhere else. Unloading a plugin removes its contributions automatically.' },
        { type: 'note', variant: 'tip', text: 'To reuse the built-in artwork, point a mapping at any existing icon name (for example `file_type_kotlin`). Ship your own SVGs under `asset_dir` only for icons the built-in set does not have.' }
      ]
    },

    'gpl-format': {
      title: '.gpl format',
      filename: 'plugin.json',
      module: 'gpl runtime',
      dek: 'The layout of a Ghost IDE plugin install file.',
      blocks: [
        { type: 'p', text: 'A `.gpl` file is structurally a zip \u2014 much like a stripped-down APK \u2014 and two things inside it are required:' },
        { type: 'table', headers: ['Path in the zip', 'Contents'], rows: [
          ['`assets/plugin.json`', 'The plugin manifest.'],
          ['`classes.dex` (or `classes2.dex`, ...)', 'The plugin\u2019s compiled bytecode.']
        ] },
        { type: 'h2', text: 'plugin.json fields' },
        { type: 'table', headers: ['Field', 'Type', 'Requirement'], rows: [
          ['`id`', 'string', 'Required \u2014 matches `PluginDescriptor`\u2019s contract; a reverse-domain id.'],
          ['`name`', 'string', 'Required.'],
          ['`version`', 'string', 'Required.'],
          ['`entryClass`', 'string', 'Required \u2014 the fully-qualified name of the class implementing `GhostPlugin`, with a public no-arg constructor.'],
          ['`description`', 'string', 'Optional; default is an empty string.'],
          ['`minHostVersion`', 'integer', 'Optional; default `0`. The lowest host app versionCode that supports this plugin.'],
          ['`icon`', 'string', 'Optional; a PNG/JPG file name inside `assets/` (same folder as `plugin.json` itself). If missing, the plugin has no icon.']
        ] },
        { type: 'code', filename: 'assets/plugin.json', lang: 'json', code:
`{
  "id": "com.example.hello-ghost",
  "name": "Hello Ghost",
  "version": "1.0.0",
  "entryClass": "com.example.helloghost.HelloGhostPlugin",
  "description": "Adds a sample screen to Ghost IDE.",
  "minHostVersion": 1,
  "icon": "icon.png"
}` },
        { type: 'note', variant: 'warn', text: 'If `assets/plugin.json` is missing from the zip, or the JSON is invalid, loading fails and the plugin never activates.' }
      ]
    },

    'build-plugin': {
      title: 'Building a plugin',
      filename: 'BUILD.md',
      module: 'gpl runtime',
      dek: 'A suggested way to produce a bundle that GplPluginLoader expects.',
      blocks: [
        { type: 'p', text: 'The runtime doesn\u2019t enforce any particular build tool \u2014 it only cares about the final artifact: a zip with a `.gpl` extension that contains `assets/plugin.json` and at least one valid `classes*.dex`. The path below is a simple, common pattern:' },
        { type: 'list', ordered: true, items: [
          'Compile the plugin module against `plugin-api` (and `ide-api`/`ide-ui-api` if needed) using `compileOnly` \u2014 the host app supplies these at runtime, so they shouldn\u2019t be bundled inside the `.gpl` as well.',
          'Convert the resulting `.class` files to one or more `classes.dex` files with the Android dexer (`d8`).',
          'Put `assets/plugin.json` alongside `classes.dex` in a single zip.',
          'Rename the zip file with a `.gpl` extension.'
        ] },
        { type: 'code', filename: 'package.sh', lang: 'bash', code:
`d8 --output build/dex build/classes/*.class

cd build/dex
zip -r ../hello-ghost.gpl classes.dex ../../assets/plugin.json -j
mv ../../assets/plugin.json assets/plugin.json 2>/dev/null || true` },
        { type: 'note', variant: 'tip', text: 'To compile against the APIs you\u2019ll need the compiled `plugin-api.jar` / `ide-api.jar` / `ide-ui-api.aar` \u2014 grab them from the **ghostide-plugin-sdk** artifact of [GitHub Actions](https://github.com/HanzoDev1375/GhostIdes/actions) or from a [Release](https://github.com/HanzoDev1375/GhostIdes/releases).' },
        { type: 'note', variant: 'tip', text: 'The simplest way to guarantee the right layout is to assemble a temporary staging folder with the same structure before zipping: `classes.dex` at the root and `assets/plugin.json` in a nested `assets/` folder \u2014 exactly what `GplManifestReader` looks for at `assets/plugin.json`.' }
      ]
    },

    'loading-lifecycle': {
      title: 'Loading lifecycle',
      filename: 'GplPluginLoader.java',
      module: 'gpl runtime',
      dek: 'Exactly what happens from installing a .gpl file to it being active \u2014 and on removal.',
      blocks: [
        { type: 'p', text: 'This part is internal to the host app, not part of the public API surface \u2014 but understanding it helps clarify exactly what\u2019s running underneath your `activate(context)`.' },
        { type: 'h2', text: 'Loading' },
        { type: 'list', ordered: true, items: [
          '`GplManifestReader` reads the manifest from `assets/plugin.json`.',
          'If a plugin with the same id is already loaded, that same instance is returned with no extra work.',
          'On Android 14 (API 34) and above, every `classes*.dex` entry is read straight into memory and loaded with `InMemoryDexClassLoader` \u2014 no filesystem extraction. Below API 34, the dex files are extracted to disk and loaded with `DexClassLoader`.',
          'A plugin-scoped `Context` is built that resolves resources (`R.layout` and the rest) from the `.gpl` file itself \u2014 via a reflection call to `AssetManager.addAssetPath`, the same technique Android plugin frameworks like RePlugin and VirtualAPK use.',
          'The `entryClass` is loaded, constructed with its no-arg constructor, and verified to implement `GhostPlugin`.',
          'A `PluginDescriptor` is built from the manifest.',
          'A plugin-scoped copy of `GlobalRegistry.services()` is taken, and `PLUGIN_ANDROID_CONTEXT` is registered only inside that copy.',
          '`activate(context)` is called.'
        ] },
        { type: 'note', variant: 'warn', text: 'If the `addAssetPath` reflection call fails for any reason (say, a future Android version closes off this unofficial API), loading falls back to the host app\u2019s own resources instead of failing outright \u2014 the plugin still comes up, but without its own layouts and drawables.' },
        { type: 'h2', text: 'Unloading' },
        { type: 'list', ordered: true, items: [
          '`plugin.deactivate()` is called.',
          'Every `Disposable` registered via `registerDisposable` is released in reverse registration order (LIFO).',
          '`GlobalRegistry.extensions().unregisterOwner(pluginId)` sweeps out any registration still attributed to that id, as an extra safety net.'
        ] }
      ]
    },

    installing: {
      title: 'Installing plugins',
      filename: 'GplInstalledPlugins.java',
      module: 'gpl runtime',
      dek: 'Where installed .gpl files live on the device, and how they\u2019re scanned at startup.',
      blocks: [
        { type: 'p', text: 'Every installed `.gpl` file is kept inside the host app\u2019s `filesDir/gpl_plugins/` folder. Any file with a `.gpl` extension in that folder counts as \u201cinstalled\u201d.' },
        { type: 'code', filename: 'GplInstalledPlugins.java', lang: 'java', code:
`public static File installDir(Context context) {
  File dir = new File(context.getApplicationContext().getFilesDir(), "gpl_plugins");
  if (!dir.exists()) {
    dir.mkdirs();
  }
  return dir;
}` },
        { type: 'p', text: 'At startup, `loadAll(context, loader)` scans every file in that folder and calls `loader.load(file)` for any id that isn\u2019t already loaded.' },
        { type: 'note', variant: 'tip', text: 'A broken plugin or invalid manifest doesn\u2019t stop the whole scan \u2014 that one is skipped, and the rest of the plugins still come up normally.' },
        { type: 'h2', text: 'Where do plugins come from?' },
        { type: 'p', text: 'Plugins are not published to any separate store. Ready-made `.gpl` bundles are shared from the Ghost IDE repository itself \u2014 download them from the **Actions** tab of the relevant workflow run, or from the file attachments of a **Release**:' },
        { type: 'code', filename: 'GitHub', lang: 'text', code:
`https://github.com/HanzoDev1375/GhostIdes

Releases   -> attach a .gpl file to a release, users grab it from there
Actions    -> every workflow run keeps its artifacts for 90 days, including .gpl bundles` },
        { type: 'note', variant: 'info', text: 'The `app-debug` workflow artifact is the APK itself, `ghostide-plugin-sdk` holds the jars/AAR you compile plugins against, and any `.gpl` bundles a plugin author wants to share show up as release attachments or workflow artifacts as well.' }
      ]
    },

    'hello-world': {
      title: 'Full example: Hello Ghost',
      filename: 'HelloGhostPlugin.java',
      module: 'gpl runtime',
      dek: 'A small but complete plugin \u2014 from implementation to manifest to packaging \u2014 that ties everything above together.',
      blocks: [
        { type: 'p', text: 'This plugin adds a simple screen to Ghost IDE that shows the text of the currently open file. We need three files: the entry class, the screen itself (a Fragment), and the manifest.' },
        { type: 'h2', text: '1. Entry class' },
        { type: 'code', filename: 'HelloGhostPlugin.java', lang: 'java', code:
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
    // nothing beyond what the Disposable already handles
  }
}` },
        { type: 'h2', text: '2. The screen' },
        { type: 'p', text: '`HelloScreen` implements `PluginScreen` and builds a `Fragment`. To keep the example free of any extra layout resource, the `TextView` is built programmatically.' },
        { type: 'code', filename: 'HelloScreen.java', lang: 'java', code:
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
      view.setText("This screen comes from a Ghost IDE plugin.");
      return view;
    }
  }
}` },
        { type: 'h2', text: '3. Manifest' },
        { type: 'code', filename: 'assets/plugin.json', lang: 'json', code:
`{
  "id": "com.example.hello-ghost",
  "name": "Hello Ghost",
  "version": "1.0.0",
  "entryClass": "com.example.helloghost.HelloGhostPlugin",
  "description": "Adds a sample screen to Ghost IDE.",
  "minHostVersion": 1,
  "icon": "icon.png"
}` },
        { type: 'h2', text: '4. Package and install' },
        { type: 'list', ordered: true, items: [
          'Compile `HelloGhostPlugin.java` and `HelloScreen.java` against `plugin-api` + `ide-ui-api`.',
          'Convert the output to `classes.dex` with `d8`.',
          'Put `classes.dex` alongside `assets/plugin.json` in a zip and rename it with a `.gpl` extension \u2014 following the [.gpl format](#/packaging/gpl-format).',
          'Copy `hello-ghost.gpl` into the device\u2019s `filesDir/gpl_plugins/` \u2014 following [Installing plugins](#/packaging/installing).',
          'Restart the app; \u201cHello Ghost\u201d should be available as an active plugin screen.'
        ] },
        { type: 'note', variant: 'tip', text: 'The same pattern, swapping `PluginUiExtensionPoints.PLUGIN_SCREEN` for `EditorExtensionPoints.LSP_SERVER_PROVIDER`, is exactly the path a language server plugin follows \u2014 see [LspServerProvider](#/lsp/lsp-server-provider).' }
      ]
    }
  }
};
