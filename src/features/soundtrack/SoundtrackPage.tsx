import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Disc3,
  Music2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { StickerCluster } from "../../components/Decorations";
import { Sticker } from "../../components/Sticker";
import { InkStar } from "../../components/Ornaments";
import { Placeholder } from "../../components/Placeholder";
import { VoiceNote } from "../../components/VoiceNote";
import { WashiTape } from "../../components/WashiTape";
import { playlist, soundtrackVoiceMessage } from "../../data/playlist";
import { profile } from "../../data/profile";
import { formatAudioTime } from "../../utils/format";
import { cx } from "../../utils/cx";
import type { ChapterPageProps } from "../../app/ChapterRoute";
import type { PlaylistTrack } from "../../types/content";

/** Chapter 07 — a vintage record player and a data-driven track list. */
export function SoundtrackPage({ chapter }: ChapterPageProps) {
  const firstPlayable = playlist.find((track) => track.audioSrc);
  const hasPlayableTrack = Boolean(firstPlayable);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(
    firstPlayable?.id ?? playlist[0]?.id ?? null,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const loadedTrackRef = useRef<string | null>(null);

  const currentTrack =
    playlist.find((track) => track.id === currentTrackId) ?? null;
  const hasTracks = playlist.length > 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = muted ? 0 : volume;
  }, [muted, volume]);

  const prepareTrack = (track: PlaylistTrack) => {
    const audio = audioRef.current;
    if (!audio || !track.audioSrc) return false;
    if (loadedTrackRef.current !== track.id) {
      audio.src = track.audioSrc;
      audio.load();
      loadedTrackRef.current = track.id;
      setCurrentTime(0);
      setDuration(0);
    }
    return true;
  };

  const startTrack = async (track: PlaylistTrack) => {
    const audio = audioRef.current;
    if (!audio || !track.audioSrc) return;
    setError(null);
    setCurrentTrackId(track.id);
    if (!prepareTrack(track)) return;
    try {
      await audio.play();
    } catch {
      setError("This track couldn’t be played. Try another song.");
    }
  };

  const toggleCurrentTrack = async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.audioSrc) return;
    if (audio.paused) {
      await startTrack(currentTrack);
    } else {
      audio.pause();
    }
  };

  const handleRowClick = (track: PlaylistTrack) => {
    if (!track.audioSrc) return;
    if (currentTrackId === track.id && isPlaying) {
      audioRef.current?.pause();
      return;
    }
    void startTrack(track);
  };

  const seekTo = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <div className="chapter-page soundtrack-page">
      <PageHeader
        chapterNumber={chapter.number}
        eyebrow="Press play when ready"
        title={chapter.title}
        deck={chapter.deck}
        decor={
          <StickerCluster>
            <Sticker tone="burgundy" rotate={-4}>
              side A
            </Sticker>
            <Sticker tone="brass" rotate={3}>
              on repeat
            </Sticker>
            <InkStar />
          </StickerCluster>
        }
      />

      <div className="soundtrack-layout">
        <section className="turntable-card" aria-label="Record player">
          <Sticker className="turntable-card__sticker" tone="paper" rotate={3}>
            now spinning
          </Sticker>
          <div className={cx("turntable", isPlaying && "is-playing")}>
            <div className="turntable__platter">
              <div className="vinyl">
                <div className="vinyl__grooves" aria-hidden="true" />
                <div className="vinyl__label">
                  <span className="vinyl__label-top">A PRIVATE EDITION</span>
                  <span className="vinyl__label-mark">P</span>
                  <span className="vinyl__label-bottom">
                    {String(profile.birthdayMilestone).padStart(2, "0")} · ARCHIVE
                  </span>
                </div>
              </div>
            </div>
            <div
              className={cx("turntable__arm", isPlaying && "is-engaged")}
              aria-hidden="true"
            >
              <span className="turntable__arm-base" />
              <span className="turntable__arm-stick" />
              <span className="turntable__arm-head" />
            </div>
            <span className="turntable__screw turntable__screw--one" aria-hidden="true" />
            <span className="turntable__screw turntable__screw--two" aria-hidden="true" />
          </div>

          <div className="turntable-info">
            <div>
              <p className="eyebrow">
                {hasPlayableTrack ? "Now playing" : "On the record"}
              </p>
              <h2>
                {currentTrack?.title ? (
                  currentTrack.title
                ) : hasTracks ? (
                  "Choose a track"
                ) : (
                  "The record is blank"
                )}
              </h2>
              <p className="turntable-info__artist">
                {currentTrack?.artist ? (
                  currentTrack.artist
                ) : hasTracks ? (
                  "Pick a song from the track list."
                ) : (
                  "Add your first song to begin."
                )}
              </p>
            </div>
            {hasPlayableTrack ? (
              <button
                type="button"
                className="turntable-info__play"
                onClick={() => void toggleCurrentTrack()}
                disabled={!currentTrack?.audioSrc}
                aria-label={
                  !currentTrack?.audioSrc
                    ? "No playable track selected"
                    : isPlaying
                      ? "Pause current track"
                      : "Play current track"
                }
              >
                {isPlaying ? (
                  <Pause size={22} fill="currentColor" aria-hidden="true" />
                ) : (
                  <Play size={22} fill="currentColor" aria-hidden="true" />
                )}
              </button>
            ) : null}
          </div>

          {hasPlayableTrack ? (
            <>
              <div className="turntable-progress">
                <span>{formatAudioTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={Math.min(currentTime, duration || 0)}
                  onChange={(event) => seekTo(Number(event.target.value))}
                  disabled={!currentTrack?.audioSrc}
                  aria-label="Seek through the current track"
                />
                <span>{formatAudioTime(duration)}</span>
              </div>

              <div className="volume-control">
                <button
                  type="button"
                  className="icon-button icon-button--small"
                  onClick={() => setMuted((value) => !value)}
                  aria-label={muted ? "Unmute volume" : "Mute volume"}
                  disabled={!currentTrack?.audioSrc}
                >
                  {muted ? (
                    <VolumeX size={16} strokeWidth={1.7} aria-hidden="true" />
                  ) : (
                    <Volume2 size={16} strokeWidth={1.7} aria-hidden="true" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={muted ? 0 : volume}
                  onChange={(event) => {
                    const nextVolume = Number(event.target.value);
                    setVolume(nextVolume);
                    setMuted(nextVolume === 0);
                  }}
                  disabled={!currentTrack?.audioSrc}
                  aria-label="Volume"
                />
                <span className="volume-control__value">
                  {Math.round((muted ? 0 : volume) * 100)}%
                </span>
              </div>
            </>
          ) : null}

          <audio
            ref={audioRef}
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              setIsPlaying(false);
              setCurrentTime(0);
              if (audioRef.current) audioRef.current.currentTime = 0;
            }}
            onLoadedMetadata={(event) => {
              const nextDuration = event.currentTarget.duration;
              setDuration(Number.isFinite(nextDuration) ? nextDuration : 0);
            }}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onError={() => setError("This track could not be loaded. Try another song.")}
          />

          {error ? (
            <p className="player-error" role="status">
              <AlertCircle size={15} strokeWidth={1.7} aria-hidden="true" />
              {error}
            </p>
          ) : (
            <p className="player-note">
              <Disc3 size={14} strokeWidth={1.5} aria-hidden="true" />
              {hasPlayableTrack
                ? "Nothing autoplays. Choose a track when you want one."
                : "Each song is here for a reason. The notes say why."}
            </p>
          )}
        </section>

        <section className="track-sheet" aria-labelledby="track-list-heading">
          <WashiTape className="track-sheet__tape" tone="olive" />
          <div className="track-sheet__head">
            <div>
              <p className="eyebrow">Side A</p>
              <h2 id="track-list-heading">The track list</h2>
            </div>
            <span className="track-sheet__count">
              {String(playlist.length).padStart(2, "0")} tracks
            </span>
          </div>

          {hasTracks ? (
            <ol className="track-list">
              {playlist.map((track, index) => {
                const isCurrent = currentTrackId === track.id;
                const isThisPlaying = isCurrent && isPlaying;
                const playable = Boolean(track.audioSrc);
                return (
                  <li
                    key={track.id}
                    className={cx("track-row", isCurrent && "is-current")}
                  >
                    {playable ? (
                      <button
                        type="button"
                        className="track-row__play"
                        onClick={() => handleRowClick(track)}
                        aria-label={
                          isThisPlaying
                            ? `Pause ${track.title || "track"}`
                            : `Play ${track.title || "track"}`
                        }
                      >
                        {isThisPlaying ? (
                          <Pause size={15} fill="currentColor" aria-hidden="true" />
                        ) : (
                          <Play size={15} fill="currentColor" aria-hidden="true" />
                        )}
                      </button>
                    ) : (
                      <span
                        className="track-row__play track-row__play--static"
                        aria-hidden="true"
                      >
                        <Music2 size={14} strokeWidth={1.6} />
                      </span>
                    )}
                    <span className="track-row__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="track-row__body">
                      <span className="track-row__title">
                        {track.title ? track.title : <Placeholder>Add a track title</Placeholder>}
                      </span>
                      <span className="track-row__artist">
                        {track.artist ? (
                          track.artist
                        ) : (
                          <Placeholder>Add an artist</Placeholder>
                        )}
                      </span>
                      {track.note ? <span className="track-row__note">{track.note}</span> : null}
                    </span>
                    <span className="track-row__status">
                      {playable && isCurrent ? (
                        <span className="track-row__now">
                          {isThisPlaying ? "Playing" : "Selected"}
                        </span>
                      ) : null}
                    </span>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="track-list-empty">
              <div className="track-list-empty__rings" aria-hidden="true" />
              <h3>No tracks have been pressed yet.</h3>
              <p>
                Add a song, its audio file and a note about why it belongs here. The
                player will become a little more personal with each one.
              </p>
              <p className="content-hint">
                <span>Add your playlist in</span>
                <code>src/data/playlist.ts</code>
              </p>
            </div>
          )}
        </section>
      </div>

      {soundtrackVoiceMessage.src ? (
        <section className="voice-section" aria-labelledby="voice-heading">
          <div className="voice-section__head">
            <p className="eyebrow">A second kind of sound</p>
            <h2 id="voice-heading">A voice note</h2>
          </div>
          <VoiceNote voice={soundtrackVoiceMessage} fileHint="src/data/playlist.ts" />
        </section>
      ) : null}
    </div>
  );
}
