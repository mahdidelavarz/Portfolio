import { ArticleComparison, ArticleFlowDiagram } from "@/components/articles/ArticleVisuals";

export const versionedEngineeringArticleEn = (
  <>
    <p>
      The first Tag and Part screens looked like ordinary administration pages.
      There were records to list, forms to open, relationships to select, and
      quantities to validate. The difficult part appeared later: what should
      happen when Engineering needs to change a definition that has already
      progressed through approval?
    </p>
    <p>
      Editing the same rows forever would keep the UI simple, but it would erase
      the meaning of the earlier engineering state. A changed Part would look as
      if it had always been that way. A deleted Part would disappear from the
      definition that previously contained it. The frontend had to represent a
      process closer to controlled revision than ordinary CRUD.
    </p>

    <ArticleComparison
      caption="The model changed when approved data needed history"
      beforeTitle="Ordinary CRUD"
      beforeItems={["load the current record", "edit in place", "save the latest value", "history is incidental"]}
      afterTitle="Controlled engineering revision"
      afterItems={["preserve the approved definition", "create a later Edition", "record what changed", "retain lineage to the earlier Part"]}
    />

    <h2>The handoff was a lifecycle boundary</h2>
    <p>
      The existing business process starts with a Project in Sales. A Project can
      contain multiple Tags, and each Tag groups the engineering definition for
      a product within that Project. Final Project approval hands the relevant
      work into Engineering, but it does not make Engineering another set of
      editable fields on the Sales form.
    </p>
    <p>
      The Engineering work follows its own workflow. That separation mattered in
      the frontend. Project context still had to remain visible, but Engineering
      needed its own routes, forms, permissions, and progression. The Project
      approval and the Engineering Edition state answer different questions: one
      establishes that the handoff may begin; the other controls how the
      engineering definition can evolve.
    </p>

    <ArticleFlowDiagram
      caption="A simplified public view of the lifecycle"
      source="Sales Project"
      items={[
        { title: "Final approval", detail: "the handoff boundary" },
        { title: "Engineering context", detail: "one or more Tags" },
        { title: "Edition 0", detail: "the first controlled definition" },
        { title: "Completed definition", detail: "preserved as engineering history" },
        { title: "Later Edition", detail: "created when a controlled revision is needed" },
      ]}
    />

    <h2>Edition 0 was not a placeholder</h2>
    <p>
      The initial Edition is numbered zero, but its role is not technical
      scaffolding. It is the first engineering definition created after the
      Sales-to-Engineering handoff. Engineering progressively completes Tag
      information, associated product information, groups, and the Part List
      inside that context.
    </p>
    <p>
      Early frontend work exposed Edition numbers as if they were ordinary form
      input even after numbering had become system-assigned. That inconsistency
      was a symptom of the model still settling. Once an Edition number expresses
      sequence rather than user-authored data, letting the form edit it creates
      the wrong expectation. Later Editions should follow the previous completed
      definition, not an arbitrary number entered by a user.
    </p>
    <p>
      Edition creation also needed workflow gating. A later revision belongs
      after the prior Edition has reached the appropriate completed state. The
      implementation evolved around that rule rather than assuming a user could
      create unlimited parallel Editions. I modeled the frontend around the
      existing process; I did not design the company&apos;s approval workflow itself.
    </p>

    <h2>A revision is more than a copied list</h2>
    <p>
      Once later Editions existed, the Part List needed to describe change. A
      Part in a new Edition might be added, removed, or modified relative to the
      earlier definition. For a modification, the new row can keep a lineage
      reference to its predecessor. That gives the UI and later reporting enough
      context to distinguish “this is a different item” from “this is the revised
      form of an earlier item.”
    </p>
    <p>
      Revision-aware update and deletion therefore behave differently depending
      on where a Part originated. If it already belongs to the current draft
      Edition, it can be edited or removed within that draft. If it was inherited
      from an earlier Edition, changing it creates a current-Edition
      representation and marks the relationship to the previous Part. Removing
      an inherited Part records removal rather than erasing the historical row.
    </p>

    <ArticleComparison
      caption="A conceptual Part List revision"
      beforeTitle="Edition 0"
      beforeItems={["Part A", "Part B", "Part C"]}
      afterTitle="Edition 1"
      afterItems={["Part A — retained", "Part B′ — modified", "Part D — added", "Part C — removed"]}
    />

    <p>
      The first revision implementation was not complete. Some lookup wiring was
      provisional, and the early selection of a previous Part did not yet express
      the final lineage behavior. Later work moved that responsibility away from
      a user-selected placeholder and into the revision operation itself. Across
      repeated revisions, the lineage can continue to point through the original
      predecessor instead of becoming an accidental chain of unrelated copies.
    </p>

    <h2>Routes carried the context that modals could not</h2>
    <p>
      Tags, Editions, groups, and Parts form a hierarchy. The first temptation is
      to manage each child in a modal opened from its parent. That works for a
      small lookup. It becomes awkward when the child has its own table, form,
      workflow state, validation, and another level of children.
    </p>
    <p>
      I implemented these resources as routed administration experiences with
      parent-aware queries and breadcrumbs. A reader of the page can see which
      Project, Tag, or group they are working inside, and a direct route still
      carries the identity needed to reload that context. This followed the
      broader frontend direction of moving complex child-resource management out
      of nested modals.
    </p>

    <ArticleFlowDiagram
      caption="Context remains explicit while moving deeper"
      source="Project"
      items={[
        { title: "Tag" },
        { title: "Edition", detail: "current and historical definitions" },
        { title: "Group", detail: "a section of the Part List" },
        { title: "Part", detail: "an item in a specific engineering position" },
      ]}
    />

    <p>
      Nested creation also needed safe defaults. When a group is created from a
      Tag context, the parent selection should already be set and should not be
      casually changed to another Tag. Several route and form contracts were
      inconsistent during the early rollout; making the route parameter, parent
      query, breadcrumb, and form default explicit reduced that ambiguity.
    </p>

    <h2>Current state and history cannot be queried the same way</h2>
    <p>
      Versioning creates a subtle data problem: historical rows remain useful,
      but they are not automatically part of the active definition. An early
      completeness check traversed Parts across Editions. That could make an
      incomplete current Edition appear complete because older Parts were still
      present in history, or make validation reason about rows that no longer
      represented the active engineering state.
    </p>
    <p>
      The confirmed business boundary is narrower. Completeness must be evaluated
      against the relevant current or final Edition. Earlier Editions explain how
      the definition reached this point; they should not be blindly aggregated
      into the structure being approved now. Later implementation in another
      stage filtered by the current Edition correctly, while an earlier material
      check still crossed that boundary. I treat that difference as an
      implementation defect to resolve, not as two valid interpretations of the
      workflow.
    </p>
    <p>
      The same rule matters for reports and downstream work. A report must be
      generated for an intentional Edition context. “All Parts ever associated
      with this Tag” is not equivalent to “the engineering definition that is
      current for this stage.” The public article does not need the internal
      templates or payloads to make that distinction clear.
    </p>

    <h2>Expected quantity should validate, not rebuild</h2>
    <p>
      A related mistake appeared around expected collection sizes. The Project
      records how many Tags are expected, and a Tag records how many associated
      products are expected. It is tempting to treat a quantity change as an
      instruction to clear and recreate the collection. That is dangerous once
      those children contain engineering data, files, workflow history, or
      references from later stages.
    </p>
    <p>
      The confirmed model is non-destructive. Expected quantity is a completeness
      constraint, not ownership of the child collection. The system compares the
      expected count with actual records and blocks completion when they do not
      match. A user then resolves the mismatch explicitly by adding or removing
      the appropriate records, subject to the lifecycle&apos;s editing rules.
    </p>

    <ArticleFlowDiagram
      caption="Quantity is validation, not reconciliation"
      source="Expected structure"
      items={[
        { title: "Compare with actual records" },
        { title: "Mismatch found", detail: "do not silently rebuild children" },
        { title: "Block completion", detail: "keep existing engineering data intact" },
        { title: "Explicit correction", detail: "the user resolves the mismatch" },
      ]}
    />

    <p>
      Some transitional service branches still attempted clear-and-recreate
      behavior. They conflict with this product rule and should be treated as
      remnants to remove, not as the intended architecture. This was one of the
      places where reviewing the business meaning changed how I judged code that
      might otherwise look like convenient synchronization.
    </p>

    <h2>Item identity also depended on position</h2>
    <p>
      Part matching introduced another domain detail. A material or catalog item
      is not always a complete engineering identity. The same item can appear in
      different positions inside an assembly. A hierarchical position such as
      <code>3.2.1</code> can distinguish those occurrences: item 1 inside subgroup
      2 of main group 3.
    </p>
    <pre><code>{`3
└── 3.2
    └── 3.2.1`}</code></pre>
    <p>
      Early copy and revision paths did not apply that identity consistently.
      One pre-copy check compared both the item and its nested position, while
      the copy operation de-duplicated by item alone and did not preserve the
      position. Some inherited revision clones also omitted it. The mismatch
      matters: two equal items in different assembly positions are not
      necessarily duplicates.
    </p>
    <p>
      I would now treat the equivalence rule as one shared domain operation used
      by copy, revision, duplicate checks, and validation. Leaving each path to
      construct its own idea of identity is how small differences become history
      corruption later.
    </p>

    <h2>The UI had to make lifecycle boundaries visible</h2>
    <p>
      Forms and row actions cannot be enabled only because an endpoint exists.
      Edits belong to the appropriate draft state. Group creation, Part changes,
      and revision operations need to reflect which Edition is current and where
      its workflow stands. Several gates changed while the process was being
      clarified; one early check even required an Edition to be complete before
      allowing the groups needed to complete it. That was later corrected to the
      draft stage.
    </p>
    <p>
      These restrictions are easier to understand when the route preserves parent
      context, the table shows revision state, and actions disappear or reject
      work consistently. A generic disabled form is not enough. The frontend has
      to explain whether the reader is viewing history, editing the current
      draft, or starting a later revision.
    </p>

    <h2>What I would establish earlier now</h2>
    <p>
      I would start by writing down three domain boundaries before building the
      forms: which Edition represents the active definition, what makes two Parts
      equivalent across revisions, and which operations are legal in each
      workflow state. Those rules should drive queries, validation, copy logic,
      action policies, and reports from the same source.
    </p>
    <p>
      I would still keep the routed hierarchy. Complex engineering resources need
      room for their own state and history, and the URL is a useful boundary for
      parent context. I would also keep lineage explicit rather than inferring
      change by comparing two arbitrary snapshots in the frontend.
    </p>
    <p>
      The unresolved edge is not whether Editions are useful. It is making every
      path honor the same Edition boundary. A validation query that aggregates
      history, a copy operation that drops positional identity, or a report that
      selects an ambiguous Edition can each undermine an otherwise correct UI.
      That is the part I would test as a domain contract, not leave distributed
      across individual screens.
    </p>
  </>
);

