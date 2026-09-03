"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Shield } from "../icons";
import { course, modules } from "@/lib/training";
import {
  allModulesComplete,
  completedCount,
  moduleUnlocked,
  useTrainingProgress,
} from "@/lib/training-progress";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), { ssr: false });

// Small forward jumps (buffering, frame steps) are fine; anything past this is a skip.
const SEEK_TOLERANCE = 1.5;

export function CoursePlayer() {
  const { progress, ready, recordModule } = useTrainingProgress();
  const [selectedId, setSelectedId] = useState(modules[0].id);
  const playerRef = useRef<HTMLVideoElement & { duration: number; currentTime: number }>(null);
  const maxWatchedRef = useRef(0);
  const lastSavedRef = useRef(0);
  const [uiPct, setUiPct] = useState(0);

  const selectedIndex = modules.findIndex((m) => m.id === selectedId);
  const selected = modules[selectedIndex];
  const unlocked = moduleUnlocked(progress, selectedIndex);
  const done = allModulesComplete(progress);
  const noVideo = selected.muxPlaybackId.trim() === "";

  // Land on the first unfinished, unlocked module once progress is loaded.
  useEffect(() => {
    if (!ready) return;
    const firstOpen = modules.find(
      (m, i) => moduleUnlocked(progress, i) && !progress.modules[m.id]?.completed,
    );
    setSelectedId(firstOpen?.id ?? modules[modules.length - 1].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // Reset the watch tracker whenever the open module changes.
  useEffect(() => {
    maxWatchedRef.current = progress.modules[selectedId]?.maxWatched ?? 0;
    lastSavedRef.current = maxWatchedRef.current;
    setUiPct(0);
  }, [selectedId, progress]);

  const persist = useCallback(
    (force = false) => {
      const p = playerRef.current;
      const dur = p?.duration || selected.estSeconds;
      const t = maxWatchedRef.current;
      if (force || t - lastSavedRef.current >= 4) {
        lastSavedRef.current = t;
        recordModule(selected.id, t, dur, course.moduleCompleteAt);
      }
    },
    [recordModule, selected.id, selected.estSeconds],
  );

  function onLoadedMetadata() {
    const p = playerRef.current;
    if (!p) return;
    const resume = maxWatchedRef.current;
    if (resume > 2 && resume < p.duration - 1) p.currentTime = resume;
  }

  function onTimeUpdate() {
    const p = playerRef.current;
    if (!p) return;
    const t = p.currentTime;
    if (t > maxWatchedRef.current && t - maxWatchedRef.current < SEEK_TOLERANCE) {
      maxWatchedRef.current = t;
    }
    if (p.duration) setUiPct(Math.min(100, (maxWatchedRef.current / p.duration) * 100));
    persist();
  }

  function onSeeking() {
    const p = playerRef.current;
    if (!p) return;
    if (p.currentTime > maxWatchedRef.current + SEEK_TOLERANCE) {
      p.currentTime = maxWatchedRef.current; // snap back — no skipping ahead
    }
  }

  useEffect(() => () => persist(true), [persist]);

  const sidebar = useMemo(
    () =>
      modules.map((m, i) => {
        const mDone = progress.modules[m.id]?.completed;
        const mUnlocked = moduleUnlocked(progress, i);
        const isCurrent = m.id === selectedId;
        return (
          <li key={m.id} className="border-b border-[var(--rule-strong)]">
            <button
              type="button"
              disabled={!mUnlocked}
              onClick={() => setSelectedId(m.id)}
              className={`
                flex w-full items-start gap-4 px-5 py-5 text-left transition-colors duration-200
                ${isCurrent ? "bg-paper" : "bg-paper-deep hover:bg-paper"}
                disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-paper-deep
              `}
            >
              <span
                className={`
                  mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border text-[0.6875rem] font-semibold tabular
                  ${mDone ? "border-red bg-red text-paper" : "border-[var(--rule-strong)] text-slate"}
                `}
              >
                {mDone ? <Check className="h-4 w-4" /> : mUnlocked ? i + 1 : "·"}
              </span>
              <span>
                <span className="display-tight block text-[1.05rem] leading-tight">
                  {m.title}
                </span>
                <span className="mt-1 block text-[0.8125rem] text-slate">
                  {mDone ? "Complete" : mUnlocked ? "Not started" : "Locked"}
                </span>
              </span>
            </button>
          </li>
        );
      }),
    [progress, selectedId],
  );

  return (
    <div className="grid gap-px border border-[var(--rule-strong)] bg-[var(--rule-strong)] lg:grid-cols-[22rem_1fr]">
      {/* Module index */}
      <div className="bg-paper-deep">
        <div className="border-b border-[var(--rule-strong)] px-5 py-4">
          <p className="label text-slate">
            {completedCount(progress)} / {modules.length} complete
          </p>
        </div>
        <ul>{sidebar}</ul>
        {done && (
          <div className="border-t border-[var(--rule-strong)] p-5">
            <Link
              href="/training/quiz"
              className="group flex items-center justify-center gap-2.5 border border-red bg-red px-5 py-3.5 text-paper transition-colors duration-200 hover:bg-red-deep hover:border-red-deep"
            >
              <span className="label">Take the quiz</span>
              <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Player + module copy */}
      <div className="bg-paper">
        {!unlocked ? (
          <div className="flex min-h-[24rem] flex-col items-center justify-center gap-3 p-10 text-center">
            <Shield className="h-8 w-8 text-slate" />
            <p className="display-tight text-[1.4rem]">Finish the previous module first</p>
            <p className="measure-tight text-[0.9375rem] text-ink-soft">
              Modules unlock in order, and the video can&rsquo;t be skipped ahead.
            </p>
          </div>
        ) : (
          <>
            <div className="aspect-video w-full bg-ink">
              {noVideo ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center text-paper-on-ink">
                  <p className="label">Video coming soon</p>
                  <p className="text-[0.875rem]">
                    This module&rsquo;s recording hasn&rsquo;t been published yet.
                  </p>
                </div>
              ) : (
                <MuxPlayer
                  key={selected.id}
                  ref={playerRef as never}
                  playbackId={selected.muxPlaybackId}
                  streamType="on-demand"
                  accentColor="#c4322b"
                  metadata={{ video_title: selected.title }}
                  style={{ height: "100%", width: "100%" }}
                  onLoadedMetadata={onLoadedMetadata}
                  onTimeUpdate={onTimeUpdate}
                  onSeeking={onSeeking}
                  onPause={() => persist(true)}
                  onEnded={() => persist(true)}
                />
              )}
            </div>

            {/* Watch progress for this module */}
            <div className="h-1 w-full bg-blush-deep">
              <div
                className="h-full bg-red transition-[width] duration-300"
                style={{
                  width: `${
                    progress.modules[selected.id]?.completed ? 100 : uiPct
                  }%`,
                }}
              />
            </div>

            <div className="p-6 lg:p-8">
              <p className="label text-slate">
                Module {selectedIndex + 1} of {modules.length}
              </p>
              <h2 className="display-tight mt-3 text-[clamp(1.5rem,2.6vw,2rem)]">
                {selected.title}
              </h2>
              <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                {selected.summary}
              </p>

              {progress.modules[selected.id]?.completed ? (
                <p className="mt-6 flex items-center gap-2.5 text-[0.875rem] text-red">
                  <Check className="h-[1.15rem] w-[1.15rem]" />
                  <span className="label">Module complete</span>
                </p>
              ) : noVideo ? (
                <button
                  type="button"
                  onClick={() =>
                    recordModule(selected.id, selected.estSeconds, selected.estSeconds, 0)
                  }
                  className="mt-6 border border-dashed border-slate/60 px-4 py-2.5 text-[0.8125rem] text-slate transition-colors hover:border-red hover:text-red"
                >
                  Mark complete (preview only — disappears once the video is live)
                </button>
              ) : (
                <p className="mt-6 text-[0.8125rem] text-slate">
                  Watch to the end to unlock the next module. Rewinding is fine;
                  skipping ahead isn&rsquo;t.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
