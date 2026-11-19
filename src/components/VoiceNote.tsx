import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { Placeholder } from "./Placeholder";
import { formatAudioTime } from "../utils/format";
import { cx } from "../utils/cx";
import type { VoiceMessage } from "../types/content";

const WAVE_HEIGHTS = [28, 46, 22, 60, 38, 78, 32, 54, 20, 70, 44, 26, 62, 36, 50, 22, 42, 30];

interface VoiceNoteProps {
  voice: VoiceMessage;
  fileHint: string;
  className?: string;
}

/**
 * A local voice-message player. Nothing autoplays and the empty state is fully
 * usable. Add a real local file path to enable playback.
 */
export function VoiceNote({ voice, fileHint, className }: VoiceNoteProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const hasAudio = Boolean(voice.src);

  useEffect(() => {
    setPlaying(false);
    setDuration(0);
    setCurrentTime(0);
  }, [voice.src]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || !hasAudio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <div className={cx("voice-note", !hasAudio && "voice-note--empty", className)}>
      {hasAudio ? (
        <audio
          ref={audioRef}
          src={voice.src}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);
            setCurrentTime(0);
          }}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        />
      ) : null}
      <button
        type="button"
        className="voice-note__play"
        onClick={toggle}
        disabled={!hasAudio}
        aria-label={hasAudio ? (playing ? "Pause voice note" : "Play voice note") : "Voice note not added yet"}
      >
        {playing ? (
          <Pause size={17} fill="currentColor" aria-hidden="true" />
        ) : (
          <Play size={17} fill="currentColor" aria-hidden="true" />
        )}
      </button>
      <div className="voice-note__body">
        <div className="voice-note__head">
          <span className="voice-note__label">{voice.label}</span>
          <span className="voice-note__time">
            {hasAudio ? `${formatAudioTime(currentTime)} / ${formatAudioTime(duration)}` : "—:—"}
          </span>
        </div>
        <div className="voice-note__wave" aria-hidden="true">
          {WAVE_HEIGHTS.map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} className={index / WAVE_HEIGHTS.length < currentTime / Math.max(duration, 1) ? "is-heard" : undefined} />
          ))}
        </div>
        {hasAudio ? (
          <input
            className="voice-note__seek"
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => {
              const audio = audioRef.current;
              if (!audio) return;
              audio.currentTime = Number(event.target.value);
              setCurrentTime(audio.currentTime);
            }}
            aria-label="Voice note position"
          />
        ) : (
          <p className="voice-note__hint">
            <Volume2 size={13} strokeWidth={1.7} aria-hidden="true" />
            <span>
              Add a voice note in <code>{fileHint}</code>
            </span>
          </p>
        )}
        {voice.note ? <p className="voice-note__note">{voice.note}</p> : null}
      </div>
    </div>
  );
}

/** A smaller, static writing placeholder for a voice note that is not configured. */
export function VoicePlaceholder({ hint }: { hint: string }) {
  return (
    <p className="voice-note-placeholder">
      <Volume2 size={14} strokeWidth={1.6} aria-hidden="true" />
      <Placeholder>{hint}</Placeholder>
    </p>
  );
}
