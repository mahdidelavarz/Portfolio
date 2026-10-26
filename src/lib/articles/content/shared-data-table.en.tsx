import {
  ArticleComparison,
  ArticleFlowDiagram,
} from "@/components/articles/ArticleVisuals";

export const sharedDataTableArticleEn = (
  <>
    <p>
      Almost every screen in an ERP is a table first. Before a user edits a
      record, approves a request, or opens a child resource, they find it in a
      list. That made the shared table the most reused piece of frontend in the
      project, and also the one where every early shortcut came back as a
      problem on twenty other pages.
    </p>
    <p>
      This is how that table grew from a client-side list component into two
      related implementations, why I tried a popular headless library twice and
      kept my own composition, and where the state of a table should actually
      live. Some of the answers took more than one attempt.
    </p>

    <h2>The first version processed everything in memory</h2>
    <p>
      The first table was a generic TypeScript component driven by typed column
      definitions. It received the full record list and processed it in one
      memoized pipeline: column filters, then global search, then sorting, then
      a slice for the current page. Row numbers were generated from the source
      position, so they stayed correct across pages without the domain record
      needing a number field.
    </p>
    <pre>
      <code>{`const processed = useMemo(
  () => sortRows(searchRows(filterRows(rows, filters), query), sort),
  [rows, filters, query, sort],
);
const visible = processed.slice(page * pageSize, (page + 1) * pageSize);`}</code>
    </pre>
    <p>
      For the early administration pages this was the right trade-off. The lists
      were small, the backend did not need a paging contract yet, and filtering
      felt instant. I deliberately kept filtering client-side and planned a
      server path for modules with different scale, instead of building it
      before any page needed it.
    </p>

    <h2>Removing domain knowledge from the table</h2>
    <p>
      The table did not stay simple for long, but most of the growth was about
      removing assumptions rather than adding features.
    </p>
    <p>
      The first API had fixed <code>onAdd</code>, <code>onEdit</code> and{" "}
      <code>onDelete</code> props. Real screens needed approve, upload, open
      child records, download, and assign. I replaced the fixed callbacks with
      typed action descriptors, so the page supplies the icon, label, callback
      and required permission, and the table only renders them.
    </p>
    <pre>
      <code>{`type RowAction<T> = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  role?: string;          // checked against the active menu permission
  onClick: (row: T) => void;
};`}</code>
    </pre>
    <p>
      The column and action contracts also used to accept a catch-all record
      type with every optional field any page had ever needed. I replaced it
      with generics over each feature's own view type, so a column key that does
      not exist on that record fails at compile time instead of rendering an
      empty cell.
    </p>
    <p>
      The same idea applied to behavior. A table embedded inside a modal, such
      as a short list of files in a group, does not need search, sorting or
      pagination. Instead of a second component, the table received switches for
      those operations, while toolbar actions stayed available when search was
      off. Small screens got a card layout built from the same processed and
      paginated rows and the same row actions, so the mobile view could not
      drift from the desktop one.
    </p>

    <ArticleComparison
      caption="The table stopped knowing what the page was about"
      beforeTitle="Early table"
      beforeItems={[
        "fixed add, edit and delete props",
        "one shared record type",
        "always searchable and paged",
        "desktop rows only",
      ]}
      afterTitle="Shared table"
      afterItems={[
        "typed action descriptors",
        "generic over each page's view type",
        "operations switched per table",
        "mobile cards from the same rows",
      ]}
    />

    <h2>Trying TanStack Table, twice</h2>
    <p>
      TanStack Table is the obvious choice for this kind of component, and I
      evaluated it early. I decided to keep the custom table. Later, when I was
      building the server-backed path, I rewrote that table on top of TanStack
      Table for a short time, and then restored the custom composition in the
      next change.
    </p>
    <p>
      The reason was not that the library was weak. A headless table model
      solves sorting state, column models and row models very well. In this
      project, those were already working and were not where the effort went.
      The effort went into RTL layout and pagination direction, the mobile card
      view, permission-aware actions, filter operators that had to be serialized
      for the backend, and a visual style already shared by many pages. Moving
      to the library would have kept all of that work and added an adapter layer
      between it and our components.
    </p>
    <aside>
      A library is worth adopting when it removes the hard part of your problem.
      Here it would have replaced the part that already worked.
    </aside>
    <p>
      I would make a different call on a new project with no existing table, or
      with requirements such as column virtualization and grouping, which the
      library handles and our table did not need.
    </p>

    <h2>A server table, and who owns the query</h2>
    <p>
      Larger engineering datasets eventually needed real server paging. The
      backend contract was simple: the client sends <code>page</code>,{" "}
      <code>pageSize</code>, a <code>filter</code> and an <code>orderBy</code>,
      and receives the items with a total count. The backend used Gridify, so
      the frontend translated column filters, sort state and search into Gridify
      expressions.
    </p>
    <pre>
      <code>{`// simplified example of a generated request
?page=2&pageSize=16
&filter=title=*pump,status=2
&orderBy=createdAt desc`}</code>
    </pre>
    <p>
      The harder question was ownership. My first server table owned its own
      query and accepted a fetch callback. Then I moved paging, filtering and
      the query fully into the table so the page only declared columns. That
      felt clean until the table was hard-coded to one query and could not be
      reused. The final version moved data fetching back to the page: a hook
      builds the request parameters from table state, the page runs the query,
      and the table receives data, counts, loading and error state.
    </p>
    <p>
      I also stopped trying to make one table do both jobs. The established
      client table kept its behavior for every existing page, and the server
      table became a separate component. They share the header, rows, mobile
      cards, action toolbar, breadcrumb and pagination, so the duplication is
      limited to the part that is actually different: where the data comes from
      and how state turns into a request.
    </p>

    <ArticleFlowDiagram
      caption="The server table does not fetch anything"
      source="Persisted table state"
      items={[
        {
          title: "Parameter hook",
          detail: "debounced filters, sort, search and page",
        },
        {
          title: "Gridify builder",
          detail: "turns state into filter and orderBy strings",
        },
        {
          title: "Page query",
          detail: "owned by the page, keyed by the parameters",
        },
        {
          title: "Server table",
          detail: "renders data and reports state changes",
        },
      ]}
    />

    <h2>Where table state should live</h2>
    <p>
      This took three versions. The first server table kept its paging, sort and
      filters in the URL query string. That made a table state shareable, but it
      mixed table state with route state and became awkward as soon as advanced
      search added nested conditions.
    </p>
    <p>
      The second version moved the state into one persisted Zustand store. State
      survived navigation and refresh, which users wanted. But there was only
      one store, so every server table read and wrote the same state. It worked
      while one page used it and was wrong as soon as there were two.
    </p>
    <p>
      The third version replaced the singleton with a store factory. Each table
      gets its own persisted store, keyed by the route it belongs to, and the
      store is injected into the table, the search bar and the parameter hook.
      The client table received an equivalent factory, and every client table
      now has to pass an explicit key.
    </p>
    <pre>
      <code>{`const createTableStore = (key: string) =>
  create(
    persist(tableState, {
      name: \`table-store-\${key}\`,
      // selection is live state, not a preference
      partialize: ({ selectedRows, ...rest }) => rest,
    }),
  );`}</code>
    </pre>
    <p>
      That last line came from a later fix. Persisting selected rows meant an
      old selection could reappear after a reload and be used in a bulk action
      without the user noticing. Page, sort, search and filters are preferences
      worth restoring. A selection is not.
    </p>

    <h2>Table state and the workspace</h2>
    <p>
      The ERP has a tab-based workspace where normal navigation reuses one
      temporary tab. Once table state was persisted per route, a new problem
      appeared: a user could spend minutes building filters on a list and then
      lose that tab to the next sidebar click. The table now reports meaningful
      interaction, such as filtering, searching, sorting or changing page, and
      the workspace pins the temporary tab when that happens. Closing a tab is
      also meant to clear the stored state for its route.
    </p>

    <h2>Small bugs that shaped the contract</h2>
    <ul>
      <li>
        <strong>Buttons inside forms.</strong> Embedded tables live inside
        forms. Pagination, filter toggles and row actions without{" "}
        <code>type=&quot;button&quot;</code> submitted the surrounding form.
        Every interactive control in the table is now explicitly form-safe.
      </li>
      <li>
        <strong>What &quot;select all&quot; means.</strong> It went from the
        visible page, to the filtered dataset, to numeric IDs so selections
        survive paging. Storing whole row objects broke identity as soon as data
        was refetched.
      </li>
      <li>
        <strong>Permissions on actions.</strong> Unauthorized actions were first
        only dimmed. The follow-up made them actually disabled, which is the
        difference between a hint and a rule. The backend still enforces access;
        this only stops the UI from offering what will fail.
      </li>
      <li>
        <strong>A visible reset.</strong> The reset button shows a marker when
        any filter, sort or search is active. The selector returns a boolean
        rather than a new object, so it does not cause extra renders.
      </li>
    </ul>

    <h2>What is still open</h2>
    <p>
      I would rather list the known limits than pretend the table is finished.
      Advanced search with mixed AND and OR conditions is evaluated in order on
      the client but grouped on the server, so the two tables can disagree on
      the same query. Nested columns can be displayed but not sorted or
      filtered. Client and server stores share a key prefix, so a client table
      embedded in a page that also has a server table at the same route can
      collide. And tab cleanup currently removes the key of the active route,
      not always the key of the tab being closed. Each of these has a clear fix;
      none of them has been needed badly enough yet to justify the change.
    </p>
    <p>
      The lesson I took from this table is that the expensive part of a shared
      component is rarely rendering. It is deciding who owns each piece of
      state, and keeping that decision the same on every page that uses it.
    </p>
  </>
);
