import { Link } from "react-router";
import { ShieldCheck } from "lucide-react";
import { ANALYTICS, PRODUCT, ROUTES } from "../data/product.ts";
import { useMeta } from "./useMeta.ts";

export function Privacy() {
  useMeta({
    title: "Privacy",
    description: `${PRODUCT.name} never uploads your PDF. This page lists exactly what the app loads, what it stores in your browser, and how to remove it.`,
  });
  return (
    <section className="section container page-narrow tone-teal">
      <p className="eyebrow">
        <ShieldCheck aria-hidden="true" /> Privacy
      </p>
      <h1 className="display">Your document never leaves your device.</h1>
      <p className="lede">
        This is not a policy written by lawyers. It is a description of what the code does, written so
        that you can check it against the{" "}
        <a href={PRODUCT.repository} rel="noopener noreferrer" target="_blank">
          source
        </a>
        .
      </p>

      <div className="prose">
        <h2>What happens to a PDF you open</h2>
        <p>
          The file is read into memory in your browser tab and handed to pdf.js, which parses and renders
          it inside a web worker on your machine. Edits are kept as a list of changes next to the file.
          When you download, pdf-lib builds the new PDF in the same tab and the browser saves it through a
          temporary blob link. No step in that chain talks to a server.
        </p>
        <p>
          The app makes network requests only for its own static files: its JavaScript, stylesheets, fonts,
          the helper files pdf.js loads for some documents, the sample PDF and the emoji images under the
          emoji tool.{" "}
          {ANALYTICS.any
            ? "The editing page loads no analytics script, no error reporter and no third-party embed; the only third-party script anywhere on the site is the visit counter described below."
            : "There is no analytics script, no error reporter, no account system and no third-party embed."}
        </p>

        <h2>What is stored in your browser</h2>
        <ul>
          <li>
            <strong>IndexedDB</strong>, database <code>pdf-editor</code>, object store <code>session</code>:
            <code>file:&lt;id&gt;</code> stores each PDF's bytes and name.
          </li>
          <li>
            <strong>IndexedDB</strong>, <code>ann:&lt;id&gt;</code>: the annotations for each document.
          </li>
          <li>
            <strong>IndexedDB</strong>, <code>app:saved-signatures</code>: saved signature images and
            typed signature details.
          </li>
          <li>
            <strong>IndexedDB</strong>, <code>app:user-fonts</code>: font files added or selected for use
            with document text.
          </li>
          <li>
            <strong>localStorage</strong>, <code>pdf-editor:sessions</code>: the document index, including
            each document's name and created and updated times.
          </li>
          <li>
            <strong>localStorage</strong>, <code>pdf-editor:pdf:&lt;id&gt;</code>: a base64 copy of every
            PDF up to 1,200,000 bytes. This is written whenever a small PDF is saved, alongside its
            IndexedDB copy, not only when IndexedDB is unavailable.
          </li>
          <li>
            <strong>localStorage</strong>, <code>pdf-editor:ann:&lt;id&gt;</code>: each document's
            annotations, also written to IndexedDB.
          </li>
          <li>
            <strong>localStorage</strong>, <code>pdf-editor:theme</code>: the selected theme
            (<code>system</code>, <code>light</code> or <code>dark</code>).
          </li>
          <li>
            <strong>localStorage</strong>, <code>pdf-editor:zoom</code>: the last zoom level.
          </li>
          <li>
            <strong>localStorage</strong>, <code>pdf-editor:fit</code>: the selected fit mode
            (<code>page</code>, <code>width</code> or <code>height</code>), when one is selected.
          </li>
          <li>
            <strong>localStorage</strong>, <code>pdf-editor:inspector</code>: whether the edits-and-properties
            panel is open.
          </li>
          <li>
            <strong>localStorage</strong>, <code>pdf-editor:pages-panel</code>: whether the pages panel
            is open.
          </li>
          <li>
            <strong>localStorage</strong>, <code>pdf-editor:inspector-layout</code>: the edits-and-properties
            panel width and the split between its object list and properties pane.
          </li>
          <li>
            <strong>localStorage</strong>, <code>pdf-editor:analytics</code>: whether Google Analytics
            visit counting was accepted or declined, when that feature is enabled in the build.
          </li>
          <li>
            <strong>sessionStorage</strong>, <code>pdf-editor:chrome:&lt;id&gt;</code>: the last selected
            tool, shape and page rotation for each document in this tab.
          </li>
          <li>
            <strong>sessionStorage</strong>, <code>pdf-editor:chunk-reload</code>: the timestamp used to
            prevent repeated reloads when a deployed JavaScript chunk is missing.
          </li>
          <li>
            <strong>localStorage</strong>, <code>pdf-editor:migrated</code>: whether the one-time migration
            from the earlier document-storage format has run. The migration reads and then removes the
            legacy <code>pdf-editor:meta</code>, <code>pdf-editor:pdf</code>,
            <code>pdf-editor:annotations</code> and <code>pdf-editor:files</code> keys.
          </li>
        </ul>
        <p>
          None of this is sent anywhere.{" "}
          {ANALYTICS.enabled
            ? "The editor sets no cookies; the only cookies on the site are the visit counter's, and only after you agree to it."
            : "No cookies are set."}
        </p>

        {ANALYTICS.counter && (
          <>
            <h2>Visit counting</h2>
            <p>
              The site's pages and the documents screen count visits with Cloudflare Web Analytics, a small
              script that reports the page address, the site that sent the visit, the browser family and how
              long the page took to load. It sets no cookies, stores nothing in your browser and keeps no
              identifier, so it cannot follow you from one visit to the next or from one site to another, and
              it needs no consent notice. It is not loaded on the editing page, and it never sees your
              document or the address of a document you have open.
            </p>
          </>
        )}
        {ANALYTICS.enabled && (
          <>
            <h2>Visit counting</h2>
            <p>
              The site's pages (this one, the landing page, the blog, the comparisons) can count visits with
              Google Analytics: which pages were viewed, roughly where from, on what kind of browser, and
              which site sent the visit. It loads only after you choose OK in the notice at the bottom of the
              page, and it then sets Google's cookies on this site. If you choose "No thanks", or never
              answer, nothing is loaded. The editor pages never load it, so no third-party script runs
              beside your document. Your answer is kept in this browser's localStorage; clear this site's
              data to be asked again.
            </p>
          </>
        )}

        <h2>How to remove it</h2>
        <p>
          Open the <Link to={ROUTES.app}>documents page</Link> and remove a document to delete its file and
          edits. To remove everything at once, clear this site's data in your browser's settings. Because
          nothing was copied elsewhere, that is the end of it.
        </p>

        <h2>What the host of this site can see</h2>
        <p>
          Like any website, the server that delivers the app's files sees the ordinary request for those
          files: your IP address, browser name and the address of the page. It does not receive the
          document, the edits or the name of your file, because the app never sends them.
        </p>

        <h2>Exported files</h2>
        <p>
          The PDF you download is a new file. The one you opened is never modified. An exported PDF
          contains your edited text, a subset of the fonts it uses, and any annotations you added. It does
          not contain a record of your original words where you replaced them, except in the rare cases
          described in the <Link to={ROUTES.post("exporting-real-text")}>export post</Link>, where the
          original text is covered rather than removed.
        </p>
      </div>
    </section>
  );
}
