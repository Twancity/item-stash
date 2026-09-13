import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { StashItem } from "@/lib/stash-store";

type Values = Omit<StashItem, "id">;

export function ItemForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial?: Values;
  submitLabel: string;
  onSubmit: (values: Values) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [room, setRoom] = useState(initial?.room ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !room.trim() || !location.trim()) {
      setError("Item name, room and exact location are all required.");
      return;
    }
    onSubmit({
      name: name.trim(),
      room: room.trim(),
      location: location.trim(),
      notes: notes.trim() || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Item name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Christmas Lights"
          className="h-12 rounded-xl bg-card text-base"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="room">Room / area</Label>
        <Input
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Garage"
          className="h-12 rounded-xl bg-card text-base"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Exact location</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Left Shelf → Blue Bin"
          className="h-12 rounded-xl bg-card text-base"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">
          Notes <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Outdoor lights and extension cords"
          rows={4}
          className="rounded-xl bg-card text-base"
        />
      </div>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}

      <Button type="submit" size="lg" className="h-14 w-full rounded-2xl text-base">
        {submitLabel}
      </Button>
    </form>
  );
}
