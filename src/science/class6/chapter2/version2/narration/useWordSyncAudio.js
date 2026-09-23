import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Plays a narration audio file and reports which word index (into a flat
 * `words` array of {word, start, end} in seconds) is currently being
 * spoken, so the caller can highlight it in sync with the voice.
 *
 * @param {string} src - audio URL (import result from a bundler asset import)
 * @param {Array<{word:string,start:number,end:number}>} words - flat, time-ordered word list
 * @param {object} [opts]
 * @param {boolean} [opts.autoPlay=true]
 * @param {() => void} [opts.onEnd]
 */
export default function useWordSyncAudio(src, words, opts = {}) {
  const { autoPlay = true, onEnd } = opts;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const rafRef = useRef(null);
  const wordsRef = useRef(words);
  wordsRef.current = words;

  const findActiveIndex = useCallback((t) => {
    const ws = wordsRef.current;
    if (!ws || ws.length === 0) return -1;
    // binary search for the word whose [start,end) contains t
    let lo = 0, hi = ws.length - 1, ans = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (ws[mid].start <= t) {
        ans = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    if (ans >= 0 && t > ws[ans].end + 0.35 && ans < ws.length - 1) {
      // between words with a gap: keep showing the previous word until the next one actually starts
    }
    return ans;
  }, []);

  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;

    const tick = () => {
      const t = audio.currentTime;
      setCurrentTime(t);
      setActiveWordIndex(findActiveIndex(t));
      rafRef.current = requestAnimationFrame(tick);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      rafRef.current = requestAnimationFrame(tick);
    };
    const handlePauseOrEnd = () => {
      setIsPlaying(false);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    const handleEnded = () => {
      handlePauseOrEnd();
      setActiveWordIndex(-1);
      setCurrentTime(0);
      if (onEnd) onEnd();
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePauseOrEnd);
    audio.addEventListener('ended', handleEnded);

    if (autoPlay) {
      audio.play().catch(() => {
        // autoplay blocked (e.g. no prior user gesture) -- wait for manual play
        setIsPlaying(false);
      });
    }

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePauseOrEnd);
      audio.removeEventListener('ended', handleEnded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {});
  }, []);
  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);
  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, []);

  return { audioRef, isPlaying, activeWordIndex, currentTime, play, pause, toggle };
}
