import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus, Box, MapPin, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStash } from "@/lib/stash-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stash — Remember where you put everything" },
      {
        name: "description",
        content:
          "Search your stash to find out where you stored tools, decorations, cables and more.",
      },
      { property: "og:title", content: "Stash — Remember where you put everything" },
      {
        property: "og:description",
        content: "Search your stash to find where you stored anything at home.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { items, loading } = useStash();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!items) return [];
    if (!q) return items;
    return items.filter((i) => i.name.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pt-10 pb-24 sm:pt-16">
      <header className="text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Box className="size-7" aria-hidden="true" />
        </div>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Stash</h1>
        <p className="mt-2 text-lg text-muted-foreground">Where did I put it?</p>
      </header>

      <div className="mt-8 space-y-3">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your stash…"
            aria-label="Search items by name"
            className="h-14 rounded-2xl bg-card pl-12 text-base shadow-card"
          />
        </div>
        <Button asChild size="lg" className="h-14 w-full rounded-2xl text-base">
          <Link to="/add">
            <Plus className="size-5" aria-hidden="true" />
            Add Item
          </Link>
        </Button>
      </div>

      <section className="mt-10">
        {loading ? null : items && items.length === 0 ? (
          <EmptyState />
        ) : filtered.length === 0 ? (
          <p className="rounded-3xl bg-card p-8 text-center text-base font-medium shadow-card">
            We couldn't find that in your Stash.
          </p>
        ) : (
          <ul className="space-y-3">
            {filtered.map((item) => (
              <li key={item.id}>
                <Link
                  to="/item/$id"
                  params={{ id: item.id }}
                  className="block rounded-3xl bg-card p-5 shadow-card transition-shadow hover:shadow-lift"
                >
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <DoorOpen className="size-4" aria-hidden="true" />
                      {item.room}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-accent">
                      <MapPin className="size-4" aria-hidden="true" />
                      {item.location}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl bg-card p-8 text-center shadow-card">
      <h2 className="text-2xl font-bold">Nothing stashed yet.</h2>
      <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
        Add your first item so you never have to wonder where you put it again.
      </p>
      <Button asChild size="lg" className="mt-6 h-13 rounded-2xl px-6 text-base">
        <Link to="/add">
          <Plus className="size-5" aria-hidden="true" />
          Add Item
        </Link>
      </Button>
    </div>
  );
}
