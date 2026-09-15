import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ItemForm } from "@/components/ItemForm";
import { useStash } from "@/lib/stash-store";

export const Route = createFileRoute("/add")({
  head: () => ({
    meta: [
      { title: "Add an item — Stash" },
      {
        name: "description",
        content: "Save an item, the room it lives in and its exact storage spot.",
      },
      { property: "og:title", content: "Add an item — Stash" },
      {
        property: "og:description",
        content: "Save an item, the room it lives in and its exact storage spot.",
      },
    ],
  }),
  component: AddItem,
});

function AddItem() {
  const { addItem } = useStash();
  const navigate = useNavigate();

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pt-8 pb-24 sm:pt-12">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back
      </Link>
      <h1 className="mt-4 mb-8 text-3xl font-bold sm:text-4xl">Add an item</h1>
      <ItemForm
        enableVoice
        submitLabel="Save Item"
        onSubmit={(values) => {
          addItem(values);
          navigate({ to: "/" });
        }}
      />
    </main>
  );
}
