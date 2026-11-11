# Lessons

## Match the house style before adding to an existing page

**Correction (11 Nov 2026):** Added InkRealm and OpenSwitchy to the projects page as
two generic `flex` rows with a heading, a paragraph and an image. The reply was that
the design was "lame" next to the rest of the page.

**Pattern:** `app/projects/page.tsx` is not a data list — every project has its own
visual treatment (a hand-built animated SVG in `LearnsByAIIllustration`, a KUTE.js
morphing blob, a fixed-parallax photo band, wave/layer spacers). A new entry that is
just an image beside text reads as filler because the bar on that page is "each
project gets a treatment drawn from its own subject matter."

**How to apply:** Before adding to a page with hand-authored sections, read enough of
it to name the visual vocabulary, then design to that bar. Lead with the most
characteristic thing in the subject's world — for InkRealm, a turn of play; for
OpenSwitchy, a message crossing the board — rather than a screenshot in a rounded box.

## Headless Chrome clamps the layout viewport to 500px

**Mistake (11 Nov 2026):** Screenshotted at `--window-size=390,1500`, saw text cut off
mid-word on the right, and reported a pre-existing mobile overflow bug. There was no
bug — Chrome headless renders at a minimum ~500px layout viewport, so a 390px-wide
screenshot is a crop of a 500px layout.

**How to apply:** Before calling layout breakage from a headless screenshot, read back
`document.documentElement.clientWidth` from the page itself. Screenshot at 500px or
wider, and only treat clipping as real once a measurement confirms it.

## Timers and CSS animations diverge under virtual time

**Pattern:** With `--virtual-time-budget`, `setTimeout` fast-forwards but CSS
animations advance on real/compositor time, so a React state machine races ahead of
its own animations and elements can appear blank in a capture.

**How to apply:** Don't let content visibility depend on `animation-fill-mode` holding
a final state. Apply the animation class only during the phase that animates, and
render plain opaque content afterwards — correct in the browser and in captures.
