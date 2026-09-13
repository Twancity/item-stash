import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, DoorOpen, MapPin, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useStash } from "@/lib/stash-store";

export const Route = createFileRoute("/item/$id")({
  head: () => ({
    meta: [
      { title: "Item details — Stash" },
      { name: "description", content: "See exactly where this item is stored." },
      { property: "og:title", content: "Item details — Stash" },
      {
        property: "og:description",
        content: "See exactly where this item is stored.",
      },
    ],
  }),
  component: ItemDetails,
});

function ItemDetails() {
  const { id } = Route.useParams();
  const { items, loading, deleteItem } = useStash();
  const navigate = useNavigate();
  const item = items?.find((i) => i.id === id);

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pt-8 pb-24 sm:pt-12">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to Stash
      </Link>

      {loading ? null : !item ? (
        <p className="mt-10 rounded-3xl bg-card p-8 text-center font-medium shadow-card">
          We couldn't find that in your Stash.
        </p>
      ) : (
        <>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{item.name}</h1>

          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">
            <DoorOpen className="size-4" aria-hidden="true" />
            {item.room}
          </p>

          <section className="mt-6 rounded-3xl bg-accent p-6 text-accent-foreground shadow-lift sm:p-8">
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide uppercase opacity-90">
              <MapPin className="size-4" aria-hidden="true" />
              Exact location
            </p>
            <p className="mt-3 font-display text-3xl leading-tight font-bold sm:text-4xl">
              {item.location}
            </p>
          </section>

          {item.notes && (
            <section className="mt-5 rounded-3xl bg-card p-6 shadow-card">
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                Notes
              </h2>
              <p className="mt-2 text-base">{item.notes}</p>
            </section>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 flex-1 rounded-2xl text-base"
            >
              <Link to="/item/$id/edit" params={{ id: item.id }}>
                <Pencil className="size-5" aria-hidden="true" />
                Edit Item
              </Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 flex-1 rounded-2xl border-destructive/40 text-base text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="size-5" aria-hidden="true" />
                  Delete Item
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-3xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete “{item.name}”?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This permanently removes the item from your Stash. This can't be
                    undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => {
                      deleteItem(item.id);
                      navigate({ to: "/" });
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      )}
    </main>
  );
}
