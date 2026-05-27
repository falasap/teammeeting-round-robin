# FX Two-Pane Demo

Ein minimales Beispiel für FxLayout mit zwei Panes (Start + Center).

## Features

- ✅ **Start Pane**: Liste mit klickbaren Items
- ✅ **Center Pane**: Detail-Ansicht des ausgewählten Items
- ✅ **Keine End Pane**: Nur zwei Panes für einfaches Layout
- ✅ **Header Actions**: Search, New, Delete
- ✅ **Responsive**: Automatische Anpassung an Bildschirmgröße
- ✅ **Theme Support**: Light/Dark Mode

## Installation

```bash
npm install
```

## Starten

```bash
npm run dev
```

Die App läuft auf `http://localhost:5173`

## Struktur

```
src/
├── main.tsx       # Entry Point mit ThemeProvider
└── App.tsx        # Haupt-Komponente mit FxLayout
```

## Key Concepts

### Zwei-Pane Layout

```tsx
<FxLayout
  hideEnd={true}        // End-Pane verbergen
  suppressEnd={true}    // End-Pane komplett entfernen
  startContent={...}    // Liste
  centerContent={...}   // Detail
/>
```

### Pane Headers

```tsx
// Start Header mit Actions
<FxPaneHeader pane="start" title="Items List">
  <FxPaneHeaderAction icon={<Search />} text="Search" />
  <FxPaneHeaderAction icon={<Plus />} text="New" showText design="Secondary" />
</FxPaneHeader>

// Center Header
<FxPaneHeader pane="center" title={selectedItem?.name}>
  <FxPaneHeaderAction icon={<Trash2 />} text="Delete" />
</FxPaneHeader>
```

## Nächste Schritte

- 🔧 Eigene Daten einbinden
- 🎨 Styling anpassen
- 🚀 Weitere Actions hinzufügen
- 📱 Mobile Experience testen
# Teammeeting-Round-Robin
