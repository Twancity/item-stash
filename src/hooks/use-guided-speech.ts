import { useCallback, useEffect, useRef, useState } from "react";

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
};

function getRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as any;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

const UNSUPPORTED =
  "Voice add isn't supported in this browser. You can still fill in the form by typing.";

/**
 * Guided, step-by-step dictation: captures one final transcript per step,
 * then advances to the next step automatically.
 */
export function useGuidedSpeech<TStep extends string>(
  steps: readonly TStep[],
  onStepResult: (step: TStep, text: string) => void,
) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState<number | null>(null);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const activeRef = useRef(false);
  const stepIndexRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stepsRef = useRef(steps);
  stepsRef.current = steps;
  const resultRef = useRef(onStepResult);
  resultRef.current = onStepResult;

  const teardown = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    activeRef.current = false;
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    setListening(false);
  }, []);

  useEffect(() => teardown, [teardown]);

  useEffect(() => {
    setSupported(getRecognitionCtor() !== null);
  }, []);

  const listenFor = useCallback(
    (index: number) => {
      const Ctor = getRecognitionCtor();
      if (!Ctor) {
        setSupported(false);
        setError(UNSUPPORTED);
        teardown();
        setStepIndex(null);
        stepIndexRef.current = null;
        return;
      }

      stepIndexRef.current = index;
      setStepIndex(index);

      try {
        recognitionRef.current?.abort();
        const recognition = new Ctor();
        recognition.lang =
          typeof navigator !== "undefined" ? navigator.language || "en-US" : "en-US";
        recognition.interimResults = false;
        recognition.continuous = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setListening(true);

        recognition.onresult = (event: any) => {
          let final = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) final += result[0].transcript;
          }
          const text = final.trim();
          if (!text || !activeRef.current) return;
          const step = stepsRef.current[index];
          if (step) resultRef.current(step, text);
          advanceRef.current(index + 1);
        };

        recognition.onerror = (event: any) => {
          const code = event?.error;
          if (code === "aborted" || !activeRef.current) return;
          setListening(false);
          if (code === "not-allowed" || code === "service-not-allowed") {
            setError("Microphone access was blocked. You can still type the details in.");
          } else if (code === "no-speech") {
            setError("We didn't catch that. Try voice again or type the details in.");
          } else {
            setError("Voice add didn't work just now. You can still type the details in.");
          }
          teardown();
          setStepIndex(null);
          stepIndexRef.current = null;
        };

        recognition.onend = () => setListening(false);

        recognitionRef.current = recognition;
        recognition.start();
      } catch {
        setError("Voice add didn't work just now. You can still type the details in.");
        teardown();
        setStepIndex(null);
        stepIndexRef.current = null;
      }
    },
    [teardown],
  );

  const advanceRef = useRef<(next: number) => void>(() => {});
  advanceRef.current = (next: number) => {
    if (!activeRef.current) return;
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    if (next >= stepsRef.current.length) {
      teardown();
      setStepIndex(null);
      stepIndexRef.current = null;
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => listenFor(next), 350);
  };

  const start = useCallback(() => {
    if (!getRecognitionCtor()) {
      setSupported(false);
      setError(UNSUPPORTED);
      return;
    }
    setError(null);
    activeRef.current = true;
    listenFor(0);
  }, [listenFor]);

  const cancel = useCallback(() => {
    teardown();
    setStepIndex(null);
    stepIndexRef.current = null;
  }, [teardown]);

  const skip = useCallback(() => {
    const current = stepIndexRef.current;
    if (current === null) return;
    advanceRef.current(current + 1);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    supported,
    listening,
    error,
    stepIndex,
    activeStep: stepIndex === null ? null : (steps[stepIndex] ?? null),
    start,
    cancel,
    skip,
    clearError,
  };
}
