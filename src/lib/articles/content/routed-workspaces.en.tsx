import { ArticleComparison, ArticleFlowDiagram } from "@/components/articles/ArticleVisuals";

export const routedWorkspacesArticleEn = (
  <>
    <p>
      The modal was reasonable at first. A parent record had a small child list,
      and opening that list without leaving the page was faster than designing a
      separate destination. Then the child gained its own CRUD. Editing one of
      its rows opened another modal. Related child management followed, and the
      “small contextual interaction” had quietly become a full page rendered
      inside an overlay.
    </p>
    <p>
      The implementation still worked in the narrow sense that the controls
      opened and mutations ran. The interaction model no longer matched the
      resource. Parent context lived in component state, refresh could remove
      that context, browser history did not describe where the user was, and a
      table plus form plus another child workflow had very little room to work.
    </p>

    <ArticleComparison
      caption="The resource outgrew its container"
      beforeTitle="Nested modal flow"
      beforeItems={["parent page", "child management modal", "edit modal", "another nested resource", "context held in local state"]}
      afterTitle="Routed resource flow"
      afterItems={["parent route", "parent-aware child route", "deeper child route when needed", "refreshable context", "space for full-page work"]}
    />

    <h2>When a child becomes a workspace</h2>
    <p>
      I did not conclude that modals were generally wrong. They remained useful
      for confirmations, focused forms, uploads, and selection workflows. The
      boundary was about the resource, not the component style.
    </p>
    <p>
      A child stopped feeling like modal content when it had independent CRUD,
      meaningful filtering and table state, its own permissions or workflow,
      several actions, or another child below it. At that point it had identity
      worth representing in the URL. It also needed enough layout and navigation
      space to behave like a workspace rather than a temporary interruption.
    </p>
    <aside>
      A modal fit an interaction that was temporary and focused. A resource with
      identity, history, and navigation depth needed a route.
    </aside>

    <h2>Moving parent context into the route</h2>
    <p>
      The first architectural change was to give complex child resources their
      own React Router destinations. The route carried the parent identifier, and
      the child page derived its scoped query from that parameter. It also loaded
      enough parent data to reconstruct a title and breadcrumb.
    </p>
    <pre><code>{`/parents/:parentId/children
/parents/:parentId/children/:childId/details`}</code></pre>
    <p>
      These are simplified public examples, not the internal paths. The important
      part is that the parent identity no longer depended on the parent component
      remaining mounted. A refresh could reload the same scope. A link could open
      that workspace directly. Browser back and forward had a meaningful resource
      boundary to navigate.
    </p>
    <p>
      I first applied this direction to existing Workflow child-management
      screens. The underlying Workflow CRUD and business contracts were partly
      team-owned; my contribution was moving their frontend integration from
      modal-only management into parent-aware routes, connecting route parameters
      to their data, and retaining context through the application layout.
    </p>

    <ArticleFlowDiagram
      caption="The hierarchy became reconstructable from navigation"
      source="Parent resource"
      items={[
        { title: "Child route", detail: "scope comes from the URL" },
        { title: "Parent query", detail: "restore the visible context" },
        { title: "Breadcrumb", detail: "show where this resource belongs" },
        { title: "Nested child route", detail: "add depth without another management modal" },
      ]}
    />

    <h2>Breadcrumbs were part of the state model</h2>
    <p>
      The breadcrumb was not added as decoration. Inside a deep ERP flow, the
      user needs to know which parent the current table belongs to. A generic
      heading such as “Steps” or “Parts” is not enough when several parents can
      expose the same type of child resource.
    </p>
    <p>
      Each routed child page queried its selected parent and rendered that context
      in the page hierarchy. This made the page understandable after refresh or
      direct entry, not only after clicking the action that originally opened it.
      It also forced a useful implementation discipline: if the page could not
      rebuild its context from route state and data, it was still coupled to the
      old modal flow.
    </p>

    <h2>Routes solved identity, not multitasking</h2>
    <p>
      Independent routes fixed deep linking and context, but they exposed another
      ERP behavior. People often move between several resources before finishing
      any one of them. They may inspect one configuration, compare it with
      another, return to a filtered table, and then open a nested resource. Plain
      browser-style navigation made those movements serial even though the work
      was not.
    </p>
    <p>
      I added a desktop workspace layer over React Router. Open tabs represented
      route contexts rather than arbitrary component instances. The URL remained
      the identity boundary: navigating to a path created or activated its tab,
      and opening an already known path selected the existing workspace instead
      of duplicating it.
    </p>
    <p>
      Sidebar navigation used the same tab-aware path. Nested resources could
      supply parent-aware titles, so two child workspaces did not have to appear
      under the same generic label. Closing the active tab selected a nearby open
      workspace, and closing the final one returned to a safe home destination.
    </p>

    <ArticleFlowDiagram
      caption="One coordinated navigation model"
      source="Current route"
      direction="out"
      items={[
        { title: "Active tab", detail: "the route currently being shown" },
        { title: "Open workspaces", detail: "deduplicated by path" },
        { title: "Sidebar", detail: "opens or activates the same route identity" },
        { title: "Nested title", detail: "adds parent context to the workspace" },
        { title: "Table state", detail: "coordinated with workspace lifecycle" },
        { title: "Browser history", detail: "still reflects route navigation" },
      ]}
    />

    <h2>Temporary navigation versus retained work</h2>
    <p>
      Keeping every visited page open creates a different problem: the tab bar
      becomes a history dump. The workspace later distinguished temporary and
      retained tabs. Normal navigation could use one replaceable temporary tab.
      If a user wanted to keep that context, they could pin it. Opening important
      nested workspaces could retain them immediately.
    </p>
    <p>
      Meaningful table interaction could also promote a temporary tab. Once a
      user had searched, filtered, sorted, selected rows, or changed pages, that
      destination was no longer just a preview. Preserving it reduced the chance
      that the next navigation silently replaced active work.
    </p>
    <p>
      Reordering and clear-all controls followed, but they were secondary to the
      model: temporary tabs represented exploration; retained tabs represented
      work worth keeping visible.
    </p>

    <h2>The route, tab, and table could not each be truth</h2>
    <p>
      The technical risk was synchronization. React Router, the active tab, the
      set of open paths, Sidebar state, dynamic titles, and persisted table state
      all described part of the current workspace. If each updated independently,
      closing a tab could remove the wrong table state, route changes could reopen
      a tab that had just been closed, or the Sidebar could disagree with the
      visible content.
    </p>
    <p>
      The implementation centralized tab state and synchronized it with route
      changes, but some lifecycle edges remained imperfect. Early close-time
      cleanup could target the current route instead of the path actually being
      closed. Browser-history handling was not uniform across every navigation
      path. Keyboard semantics for one close control also remained incomplete.
      Those are useful reminders that a tab bar is not only presentation; it is a
      second navigation surface that must obey the same state contract.
    </p>
    <p>
      Persisted workspaces also needed a session boundary. Later login handling
      cleared the tab set before returning to the application. Broader logout,
      restart, and user-scoping behavior was not fully established in the history,
      so I would not claim a complete session model from persistence alone.
    </p>

    <h2>Desktop workspaces did not become mobile tabs</h2>
    <p>
      The persistent tab strip was a desktop workspace. The compact-screen shell
      already used destination-oriented bottom navigation. Reproducing a crowded
      desktop tab strip on a narrow screen would preserve the component but lose
      the reason it existed.
    </p>
    <p>
      The responsive decision was to keep these interaction models distinct.
      Desktop could expose several retained route contexts at once. Mobile kept a
      smaller destination control and let each routed page occupy the available
      space. The underlying route hierarchy still worked on both; only the
      workspace chrome changed.
    </p>

    <h2>What still belonged in a modal</h2>
    <p>
      Moving management resources to routes did not remove modals from the ERP.
      A confirmation should not become a page. A focused create/edit form may
      still be clearer as a modal within its routed list. File upload and row
      selection can remain temporary interactions when they do not have their own
      navigation depth.
    </p>
    <p>
      The boundary I still use is simple. If the interaction is focused and ends
      when the overlay closes, a modal is a good fit. If the resource has its own
      identity, table state, history, workflow, or children, it deserves a route.
      When users need several of those routed contexts alive at once, a workspace
      layer becomes useful—but only if the URL, active tab, and persisted state
      continue to describe the same place.
    </p>
  </>
);

