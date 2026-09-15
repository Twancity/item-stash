import { useState, type FormEvent } from "react";
import { Mic, Square, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGuidedSpeech } from "@/hooks/use-guided-speech";
import type { StashItem } from "@/lib/stash-store";

type Values = Omit<StashItem, "id">;

const VOICE_STEPS = ["name", "room", "location", "notes"] as const;
type VoiceStep = (typeof VOICE_STEPS)[number];

const STEP_PROMPTS: Record<VoiceStep, string> = {
  name: "Say the item name",
  room: "Say the room or area",
  location: "Say the exact location",
  notes: "Say notes, or skip",
};

export function ItemForm({
  initial,
  submitLabel,
  onSubmit,
  enableVoice = false,
}: {
  initial?: Values;
  submitLabel: string;
  onSubmit: (values: Values) => void;
  enableVoice?: boolean;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [room, setRoom] = useState(initial?.room ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [error, setError] = useState<string | null>(null);

  const voice = useGuidedSpeech(VOICE_STEPS, (step, text) => {
    setError(null);
    if (step === "name") setName(text);
    if (step === "room") setRoom(text);
    if (step === "location") setLocation(text);
    if (step === "notes") setNotes(text);
  });

  const voiceActive = voice.activeStep !== null;

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
      ...(notes.trim() ? { notes: notes.trim() } : {}),
    });
  }

  function startVoiceAdd() {
    setError(null);
    voice.clearError();
    voice.start();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {enableVoice ? (
        <section
          className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          aria-label="Voice add"
        >
          {!voiceActive ? (
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={startVoiceAdd}
                className="h-12 w-full rounded-xl"
                aria-label="Add item by voice"
              >
                <Mic className="mr-2 size-5" aria-hidden="true" />
                Add by voice
              </Button>
              <p className="text-sm text-muted-foreground">
                Speak each detail one at a time. You can review and edit everything before saving.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div aria-live="polite">
                <p className="text-sm font-semibold text-foreground">
                  {voice.activeStep ? STEP_PROMPTS[voice.activeStep] : "Voice add"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {voice.listening ? "Listening…" : "Getting ready…"}
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={voice.cancel}
                  className="h-11 flex-1 rounded-xl"
                  aria-label="Stop voice add"
                >
                  <Square className="mr-2 size-4" aria-hidden="true" />
                  Stop
                </Button>

                {voice.activeStep === "notes" ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={voice.skip}
                    className="h-11 flex-1 rounded-xl"
                  >
                    <SkipForward className="mr-2 size-4" aria-hidden="true" />
                    Skip notes
                  </Button>
                ) : null}
              </div>
            </div>
          )}

          {voice.error ? (
            <p role="status" className="mt-3 text-sm text-muted-foreground">
              {voice.error}
            </p>
          ) : null}
        </section>
      ) : null}

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
