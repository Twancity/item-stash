import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ItemForm } from "@/components/ItemForm";
import { useStash } from "@/lib/stash-store";

export const Route = createFileRoute("/item/$id/edit")({
  head: () => ({
    meta: [
      { title: "Edit item — Stash" },
      { name: "description", content: "Update where this item is stored." },
      { property: "og:title", content: "Edit item — Stash" },
      { property: "og:description", content: "Update where this item is stored." },
    ],
  }),
  component: EditItem,
});

function EditItem() {
  const { id } = Route.useParams();
  const { items, loading, updateItem } = useStash();
  const navigate = useNavigate();
  const item = items?.find((i) => i.id === id);

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pt-8 pb-24 sm:pt-12">
      <Link
        to="/item/$id"
        params={{ id }}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back
      </Link>
      <h1 className="mt-4 mb-8 text-3xl font-bold sm:text-4xl">Edit item</h1>

      {loading ? null : !item ? (
        <p className="rounded-3xl bg-card p-8 text-center font-medium shadow-card">
          We couldn't find that in your Stash.
        </p>
      ) : (
        <ItemForm
          initial={{
            name: item.name,
            room: item.room,
            location: item.location,
            ...(item.notes ? { notes: item.notes } : {}),
          }}
          submitLabel="Save Changes"
          onSubmit={(values) => {
            updateItem(item.id, values);
            navigate({ to: "/item/$id", params: { id: item.id } });
          }}
        />
      )}
    </main>
  );
}
