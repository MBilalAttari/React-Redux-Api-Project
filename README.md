# Lumo — Media Search

Search photos (Unsplash), videos (Pexels) and GIFs (Giphy) in one place, save
favorites, and preview media full-screen.

## Setup

```bash
npm install
cp .env.example .env   # then fill in your API keys
npm run dev
```

You'll need free API keys from:

- Unsplash — https://unsplash.com/developers
- Pexels — https://www.pexels.com/api/
- Giphy — https://developers.giphy.com/

The app builds and its UI renders without keys, but each tab will show a
"missing API key" error until its corresponding key is set — that's expected,
not a bug.

## What changed from the original

### Bugs fixed
- `setHasMore` referenced an undefined `action` variable and silently did nothing.
- Loading state was never actually set to `true`, so the loading UI never showed.
- GIF "load more" re-fetched from offset 0 with a growing limit, which
  duplicated already-shown GIFs on scroll. Pagination is now offset-based and
  consistent across all three sources.
- Switching tabs didn't reliably re-fetch (the effect didn't depend on the
  active tab). It does now.
- Infinite scroll had no real end-of-results detection and could keep firing
  requests forever. `hasMore` is now derived from whether a full page came back.
- Fast typing/tab-switching could let a stale response overwrite a newer one
  (race condition). Requests are now cancelled with `AbortController` when
  the query/tab/page changes again before they resolve.
- The bookmark button existed in the UI but wasn't wired to anything
  (`collectionSlice.js` was empty). It's now a full save/unsplash feature,
  persisted to `localStorage`.
- All video cards autoplayed simultaneously, which is expensive with many
  cards on screen. Videos now only play on hover/focus and pause otherwise.

### Design & UX
- New visual identity: a charcoal-blue canvas (not flat black) with a
  distinct accent color per media type — blue for photos, coral for videos,
  violet for GIFs, gold for saved — carried through tab underlines, card
  glows, and badges.
- Full dark/light theme toggle, persisted and defaulting to system preference.
- Masonry-style responsive grid (1 → 4 columns) instead of a fixed-height flex-wrap.
- Skeleton loading cards on first load; a smaller inline spinner for
  "load more" via infinite scroll.
- Dedicated empty state (with clickable search suggestions) and error state
  (with a retry button), replacing the old bare `<h1>Error</h1>` / `<h1>Loading</h1>`.
- Full-screen preview modal (click any card) with download and save actions,
  closable with Escape or a backdrop click.
- Sticky header that gains a blurred background on scroll.

### New functionality
- **Saved / Collections tab** — bookmark any item and browse it later,
  filterable by the current search text, persisted across sessions.
- **Recent searches** — quick-access chips under the search bar, persisted
  and clearable.
- **Toast notifications** for save/unsave and errors.
- **Scroll-to-top button** once you've scrolled past the fold.
- Suggested search chips shown on the empty state for first-time users.

### Performance
- Kept the original's code-splitting: `ResultGrid` (and everything it pulls
  in — infinite scroll, the preview modal) is still lazy-loaded via
  `React.lazy`/`Suspense`, so it's not in the initial bundle.
- `React.memo` on `ResultCard` to avoid re-rendering unaffected cards.
- Images use `loading="lazy"` / `decoding="async"`; videos use
  `preload="metadata"` and only decode on hover.
- In-flight requests are aborted on query/tab/page change instead of left to
  resolve and get discarded, saving bandwidth and avoiding flicker.
- Removed an unused dependency (`react-loader-spinner`) that was imported but
  never rendered.

## Notes
- Only the `src/` folder was present in the original upload (no
  `package.json`, `index.html`, or build config), so those were recreated
  from scratch based on the existing imports and Tailwind v4 usage.
- I verified every file with an `esbuild` bundle pass (checking all imports,
  exports, and JSX syntax resolve correctly) since a full `npm install` isn't
  possible in this sandbox — you'll want to run `npm install` yourself to
  pull the actual packages before `npm run dev`.
