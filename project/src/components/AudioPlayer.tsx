import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { Track } from '../types';

interface AudioPlayerProps {
  track: Track;
  isMuted: boolean;
}

export function AudioPlayer({ track, isMuted }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 1;
    }
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const handleEnd = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnd);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const newTime = percent * duration;

    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (track.type === 'youtube') {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden transition-colors">
        <div className="p-6">
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <h3 className="font-display text-2xl text-white/90">{track.title}</h3>
              <p className="text-white/60 text-sm mt-1 font-body">{track.artist}</p>
            </div>
          </div>
          <div className="mt-6 max-w-[50%] mx-auto aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${track.videoUrl?.split('v=')[1]}`}
              title={track.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden transition-colors">
      <div className="p-6">
        <div className="flex items-center gap-6">
          <button
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:border-accent transition-colors"
          >
            {isPlaying ? 
              <Pause size={24} className="text-white/80" /> : 
              <Play size={24} className="text-white/80" />
            }
          </button>

          <div className="flex-1">
            <h3 className="font-display text-2xl text-white/90">{track.title}</h3>
            <p className="text-white/60 text-sm mt-1 font-body">{track.artist}</p>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <div
            ref={progressBarRef}
            className="h-1 bg-white/10 rounded-full cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-white/40"
              style={{ width: `${(progress / duration) * 100}%` }}
            />
          </div>

          <div className="flex justify-between text-sm text-white/40">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={track.audioUrl}
        preload="metadata"
      />
    </div>
  );
}