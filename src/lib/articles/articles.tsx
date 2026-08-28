import type { Article } from "./types";
import { ArticleComparison, ArticleFlowDiagram } from "@/components/articles/ArticleVisuals";
import { pageArchitectureArticleFa } from "./content/page-architecture.fa";
import { versionedEngineeringArticleEn } from "./content/versioned-engineering.en";
import { versionedEngineeringArticleFa } from "./content/versioned-engineering.fa";
import { routedWorkspacesArticleEn } from "./content/routed-workspaces.en";
import { routedWorkspacesArticleFa } from "./content/routed-workspaces.fa";

const pageArchitectureArticleEn = (
  <>
    <p>
      The problem did not begin with a missing component. We already had shared
      tables, form controls, modals, hooks, and action helpers. The problem was
      that every new ERP administration page still had to assemble those pieces
      for itself. A page would load its records, coordinate create and edit
      state, open a modal, build row actions, handle deletion, render loading
      states, and then attach whatever else that domain needed—files, reports,
      signatures, or navigation to a child resource.
    </p>
    <p>
      None of that looked especially bad in isolation. The repetition became
      visible only after enough pages existed. Two screens could use the same
      table and the same modal but disagree about when an edit action appeared,
      how loading was presented, or how a newly created record reached the
      mutation. Fixing a shared control did not remove the page-level wiring
      around it. The project had reusable parts, but not a reusable way to
      compose a page.
    </p>

    <ArticleComparison
      caption="The unit of repetition was the page orchestration"
      beforeTitle="Each domain page"
      beforeItems={["data and mutation hooks", "table and columns", "form modal state", "CRUD action wiring", "optional domain actions"]}
      afterTitle="Shared composition boundary"
      afterItems={["declarative page definition", "one orchestration shell", "domain-owned hooks and fields", "capabilities added explicitly"]}
    />

    <h2>Extracting components was necessary, but not sufficient</h2>
    <p>
      The shared table had already grown well beyond a simple list. It supported
      client-side and server-backed data, filtering, sorting, pagination, mobile
      cards, selectable rows, group actions, and permission-aware operations.
      The form layer had reusable inputs, searchable selects, validation, modal
      states, and edit-value synchronization. Those systems were useful on their
      own, and I did not want a page abstraction to replace them.
    </p>
    <p>
      That became an important constraint: the new layer had to orchestrate the
      existing building blocks rather than absorb all of their behavior. If the
      shell started implementing table filtering, field rendering, or mutation
      rules itself, it would become a second version of systems we already had.
      It also would be much harder to change those lower-level components
      independently.
    </p>
    <p>
      My first attempt was a generic CRUD shell. It described the common
      server-table flow and proved that some of the repeated code could move out
      of individual pages. But it was still closer to a reusable page component
      with a growing prop list than an architecture for different kinds of
      pages. The first pages created around that work did not actually consume
      it. That was a useful warning: an abstraction existing in the shared folder
      did not mean it matched the work the product needed.
    </p>

    <h2>The generic page started collecting exceptions</h2>
    <p>
      A conventional CRUD page was the easy case. Real consumers quickly made
      the boundary less tidy. Some pages used a server-backed table while others
      processed a client-side collection. Some allowed creation but not deletion.
      Some had an edit action alongside unrelated row actions. A display-only
      page needed columns and data but no form at all. Nested resources needed a
      parent identifier from the route, a scoped query, a breadcrumb, and a
      default form selection that users should not change.
    </p>
    <p>
      Optional workflows caused the bigger design pressure. One page could open
      contextual files, another could start a report, another could navigate to
      related records, and another needed a modal with selectable rows and one
      group-save action. Putting all of these behind boolean props inside one
      component would technically reduce code, but it would make the shell know
      every feature in the ERP. Each new capability would add another branch to
      the same component and another combination to reason about.
    </p>
    <aside>
      The goal changed from “make a generic CRUD page” to “centralize stable
      orchestration without making domain differences invisible.”
    </aside>

    <h2>From a shell component to a page definition</h2>
    <p>
      The design that held up better separated a typed <code>PageDefinition</code>
      from the <code>PageShell</code> that executes it. A domain page declares its
      hooks, columns, labels, form metadata, table mode, and action policies. The
      shell connects those declarations to the existing entity-form, data,
      table-action, modal, and field systems.
    </p>
    <p>
      A small definition helper preserves TypeScript inference, so the config is
      not just an untyped object passed into a large component. Domain-specific
      view and submit types still matter. Column definitions remain typed for
      their records, and the form factory remains responsible for the actual
      fields. The definition describes how a page is composed; it does not turn
      every domain into one generic record shape.
    </p>

    <ArticleFlowDiagram
      caption="The resulting composition model"
      source="PageDefinition → PageShell"
      direction="out"
      items={[
        { title: "Data strategy", detail: "server-backed or client-backed" },
        { title: "Form config", detail: "domain fields and defaults" },
        { title: "Table mode", detail: "columns and table options" },
        { title: "Policies", detail: "create, edit, delete, read-only" },
        { title: "Nested context", detail: "parent query and breadcrumb" },
        { title: "Features", detail: "explicit optional adapters" },
      ]}
    />

    <p>
      This distinction also kept ownership clear. Moving an existing Project or
      Planning page into PageShell did not make the shell responsible for that
      domain&apos;s lifecycle. The domain continued to own its API hooks, fields,
      relationships, validation, and business actions. I owned the composition
      contract and the migrations I implemented, not every business capability
      rendered through it.
    </p>

    <h2>Optional behavior became composition, not conditionals</h2>
    <p>
      Capabilities that were not part of every page became feature adapters.
      An adapter could contribute row actions, table actions, and any modal UI it
      needed. That was enough for contextual uploads, report actions,
      signatures, navigation, custom actions, and selection workflows without
      hard-coding those domains into PageShell.
    </p>
    <p>
      There was a React-specific trade-off here. A feature factory could execute
      hooks, so the array of configured features had to remain structurally
      stable. Features could not be added and removed conditionally during
      rendering without risking hook-order problems. Enablement had to live
      inside a stable feature configuration. It is a less flexible API at first
      glance, but it makes the runtime behavior predictable.
    </p>

    <ArticleFlowDiagram
      caption="Stable shell, opt-in capabilities"
      source="PageShell core"
      direction="out"
      items={[
        { title: "Upload" }, { title: "Report" }, { title: "Signature" },
        { title: "Navigation" }, { title: "Selection workflow" }, { title: "Custom action" },
      ]}
    />

    <h2>The policies needed more precision than expected</h2>
    <p>
      Read-only behavior exposed a subtle modeling problem. At first, disabling
      editing looked like enough. It was not. A page can be non-editable and
      still legitimately expose other actions, while a truly read-only page
      should expose no mutations or feature actions at all. The architecture
      eventually represented those as separate policies: an independent edit
      policy and a broader read-only mode that can omit form metadata, suppress
      the form modal, and remove actions from both table implementations.
    </p>
    <p>
      That distinction was corrected again after rollout when row actions could
      still reach a page configured as read-only. The shell had to stop passing
      those actions to both the client and server table paths. It was a small fix,
      but it showed why policy belongs at the composition boundary: if only the
      visible edit button is hidden, another rendering path can still leak an
      operation the page was meant to suppress.
    </p>

    <h2>Nested pages found the weak spots first</h2>
    <p>
      Nested resources needed more than an <code>isNested</code> flag. The page
      definition had to state which route parameter carried the parent identity,
      which hook loaded the scoped collection, which query supplied parent
      context, how the breadcrumb was rendered, and which form field received
      the parent as a locked default.
    </p>
    <p>
      The first completed implementation got that default-selection mapping
      wrong. It derived a field name mechanically from the route parameter and
      produced an invalid selection key instead of respecting the field declared
      by the form config. The correction was to make both sides explicit: the
      route parameter to read and the selection field to populate. That removed
      a naming convention the shell had invented and returned control to the
      domain definition.
    </p>
    <p>
      Selection workflows had a similar rollout issue. The first real consumer
      initially used a fixed contextual identifier. Once wired to the selected
      record, it became a useful proof that a feature adapter could combine
      default selected rows, an embedded table, and one group action without
      turning that workflow into core shell behavior.
    </p>

    <h2>Forms kept evolving underneath the page layer</h2>
    <p>
      The page architecture did not freeze the form system. Dependent lookups
      later became a declarative cascade field: one selection could provide the
      parent value used to load another field&apos;s options. That capability entered
      PageShell through the existing dynamic-field composition rather than a
      page-specific branch. The same principle applied to table options. Server
      consumers could supply their quick filters, while client consumers could
      configure pagination, sorting, filtering, and page size through table
      metadata.
    </p>
    <p>
      This is where keeping layers separate paid off. PageShell did not need to
      know what a dependent field meant in a particular workflow. It only needed
      to carry the form metadata to the component that already understood field
      dependencies.
    </p>

    <h2>Migration was the test, not the first demo</h2>
    <p>
      The architecture became credible through gradual migration. The first set
      included pages with ordinary forms, contextual features, and a nested
      child resource. Later migrations included read-only projections, pages
      with server quick filters, client-table pages with deletion disabled, and
      planning forms with dependent selections. Existing domain behavior was
      preserved where it belonged; unsupported actions were removed rather than
      forced through a generic contract.
    </p>
    <p>
      Not every cleanup was complete. An extracted data-loading helper existed
      before PageShell actually consumed it. An early usage guide still contained
      draft-like fragments. Some old tests were retired because they represented
      the previous page/form architecture and were no longer trusted, leaving the
      need for replacement coverage around the new boundary. Those are not signs
      that the abstraction failed, but they are parts of the migration I would
      plan more deliberately today.
    </p>

    <h2>What I would keep—and tighten—today</h2>
    <p>
      I would keep the separation between a typed definition, a stable
      orchestrator, and domain-owned behavior. I would also keep feature adapters
      explicit rather than building a registry of every capability the ERP might
      ever need. The shell works because it has a boundary, not because it can
      render anything.
    </p>
    <p>
      I would tighten the rollout around contract tests: read-only pages should
      never receive actions, nested defaults should map the declared route field
      to the declared form field, and each table mode should honor the same page
      policies. I would also avoid landing an extraction such as the unused data
      helper until the orchestrator actually used it.
    </p>
    <p>
      The durable value of PageShell was not a line-count reduction. It gave the
      ERP one place to express recurring page behavior while leaving the parts
      that make each domain different outside. That balance is also the limit I
      would protect: once a domain rule needs to be explained in PageShell, it is
      probably time to move that rule back to the domain—or introduce a small,
      explicit adapter instead.
    </p>
  </>
);

export const articles = [
  {
    slug: "metadata-driven-page-architecture",
    language: "en",
    title: "Building a Metadata-Driven Page Architecture for a Growing ERP",
    summary:
      "How repeated ERP page wiring evolved from an incomplete generic CRUD shell into typed page definitions, a stable orchestrator, and explicit feature adapters.",
    publishedAt: "2026-08-28",
    readingTime: "12 min read",
    tags: ["Frontend Architecture", "TypeScript", "React"],
    featured: true,
    project: "ERP",
    status: "published",
    content: pageArchitectureArticleEn,
  },
  {
    slug: "versioned-engineering-workflows",
    language: "en",
    title: "Designing a Versioned Engineering Workflow for a Manufacturing ERP",
    summary:
      "How the frontend moved beyond edit-in-place CRUD to represent controlled Engineering Editions, Part lineage, lifecycle gates, and current-state validation.",
    publishedAt: "2026-08-28",
    readingTime: "13 min read",
    tags: ["Product Engineering", "Workflow", "React"],
    featured: false,
    project: "ERP",
    status: "published",
    content: versionedEngineeringArticleEn,
  },
  {
    slug: "routed-workspaces-over-nested-modals",
    language: "en",
    title: "Why I Replaced Nested Modals with Routed Workspaces in an ERP",
    summary:
      "How complex child resources outgrew modal-only management and evolved into parent-aware routes, persistent tabs, and coordinated ERP workspaces.",
    publishedAt: "2026-08-28",
    readingTime: "9 min read",
    tags: ["UX Architecture", "Routing", "State Management"],
    featured: false,
    project: "ERP",
    status: "published",
    content: routedWorkspacesArticleEn,
  },
  {
    slug: "metadata-driven-page-architecture",
    language: "fa",
    title: "از CRUDهای تکراری تا PageShell در یک ERP واقعی",
    summary:
      "روایت شکل‌گیری PageShell؛ از wiring تکراری pageهای CRUD تا یک قرارداد تایپ‌شده که orchestration مشترک را از behavior دامنه جدا نگه می‌دارد.",
    publishedAt: "2026-08-28",
    readingTime: "حدود ۱۰ دقیقه",
    tags: ["معماری فرانت‌اند", "TypeScript", "React"],
    featured: true,
    project: "ERP",
    status: "published",
    content: pageArchitectureArticleFa,
  },
  {
    slug: "versioned-engineering-workflows",
    language: "fa",
    title: "وقتی edit کردن کافی نبود: Editionهای مهندسی در یک ERP تولیدی",
    summary:
      "روایت frontend یک فرایند مهندسی که باید تعریف قبلی را حفظ می‌کرد، revision جدید می‌ساخت و تفاوت Partهای جاری و تاریخی را جدی می‌گرفت.",
    publishedAt: "2026-08-28",
    readingTime: "حدود ۱۰ دقیقه",
    tags: ["مهندسی محصول", "گردش کار", "React"],
    featured: false,
    project: "ERP",
    status: "published",
    content: versionedEngineeringArticleFa,
  },
  {
    slug: "routed-workspaces-over-nested-modals",
    language: "fa",
    title: "چرا modalهای تودرتو را کنار گذاشتم و resourceهای ERP را route کردم",
    summary:
      "روایت resourceهایی که دیگر داخل modal جا نمی‌شدند و به routeهای parent-aware، tabهای ماندگار و workspace هماهنگ تبدیل شدند.",
    publishedAt: "2026-08-28",
    readingTime: "حدود ۷ دقیقه",
    tags: ["معماری تجربه کاربری", "مسیریابی", "مدیریت وضعیت"],
    featured: false,
    project: "ERP",
    status: "published",
    content: routedWorkspacesArticleFa,
  },
] satisfies Article[];
