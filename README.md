# Samriddhi Tripathi — Interactive Portfolio

A graph-based portfolio: projects, technologies, journey and hackathons are nodes in a pannable,
zoomable "universe", connected by the real relationships between them (which project used which
technology, which build earned which placement). A grid explorer offers the same content as a
conventional scroll for phones, keyboards and screen readers.

React 19 · Vite · [`@xyflow/react`](https://reactflow.dev) · Framer Motion · GSAP

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
npm run preview  # serve the production build
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/data/portfolioData.js` | **All content.** Profile, projects, tech, experience, hackathons, links. |
| `src/graph/layout.js` | Hand-authored node positions (deterministic, no physics). |
| `src/graph/buildGraph.js` | Turns the data into React Flow nodes/edges, adjacency and focus groups. |
| `src/graph/useCamera.js` | Smooth fly-to / fit / zoom moves, aware of the floating chrome. |
| `src/graph/graphState.js` | Selection / hover / focus emphasis rules and keyboard spatial navigation. |
| `src/components/PortfolioCanvas.jsx` | React Flow wiring, selection, camera, keyboard. |
| `src/components/CustomGraphNode.jsx`, `GraphConnections.jsx` | Custom node and edge renderers. |
| `src/components/FeaturedProjectCard.jsx`, `NodeCards.jsx` | Cards that float beside a selected node. |
| `src/components/ProjectDetail.jsx`, `EntryDetail.jsx`, `DetailOverlay.jsx` | Full-screen detail views. |
| `src/components/ExplorerView.jsx` | The grid / list alternative (default on phones). |
| `src/components/{TopBar,FocusSelector,ThemeToggle,CanvasControls,ViewToggle,Magnetic}.jsx` | Floating chrome. |
| `src/index.css`, `src/graph.css`, `src/explorer.css` | Design tokens + chrome, graph, explorer/detail. |
| `scripts/optimize-images.ps1` | Regenerates `public/projects/*` and `public/profile.jpg` from the source screenshots (Underdraw's source is a capture of its live sample artwork, in `scripts/source-images/`). |

## Common edits

**Add a project.** Add an object to `projects` in `src/data/portfolioData.js` (copy an existing one;
`techIds` must match ids in `tech`), add its screenshot to the optimize script's map, run the script,
then give it a position in `src/graph/layout.js`. Edges, the card, the case-study page and the grid
entry are generated from the data. Fields such as `problem`, `solution`, `outcomes` and `quote` are
optional; sections only render when they exist, so nothing needs to be invented. Set `featured: true` for a larger node and a hero card.

**Add an achievement.** Add it to `achievements`; `projectIds` draws the graph edge to the project. Optional `badges` (several pills), `team` and `journey` (timeline steps) are what make a featured achievement expandable.

**Add a technology / journey entry / hackathon.** Same file; give it a position in `layout.js`. Journey entries and achievements can both list `projectIds` to connect them to projects.

**Add a certificate.** Give a journey entry a `certificate` object (`src`, `filename`, `alt`, issuer, recipient, program, completion) and drop the image into `public/certificates/`. "View Certificate" opens a zoomable, fullscreen-capable, downloadable preview. If the image file is missing, the button and thumbnail simply don't render. The Murf AI entry expects `public/certificates/murf-voice-agents-2026.png`.

**Change colours.** Tokens for both themes are at the top of `src/index.css`. Light mode is its own
palette, not an inversion.

## Behaviour notes

- **Theme:** stored in `localStorage` (`theme`); the first visit follows the system preference. The
  initial value is applied by an inline script in `index.html` before first paint, so there is no flash.
- **Reduced motion:** the intro, floating motion, particle drift, magnetic pull and animated camera
  moves are all disabled under `prefers-reduced-motion`.
- **Keyboard:** arrow keys move between nodes spatially, `Enter` opens details, `Esc` clears or closes,
  `+` / `-` zoom, `0` resets, `F` fits. A skip link at the top switches to the list view.
- **Performance:** the graph, explorer, detail views, intro and GSAP are code-split; project images are
  generated at web size (thumbnails for nodes, ≤1280px for cards); animation is transform/opacity only.
- Original screenshots in `public/*.png` are no longer referenced at runtime; the site uses the
  optimized copies in `public/projects/`.
