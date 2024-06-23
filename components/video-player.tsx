// components/VideoPlayer.tsx
import React, { useEffect, useRef } from 'react';
import videojs, { VideoJsPlayerOptions, VideoJsPlayer as Player } from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
  url: string;
  options?: VideoJsPlayerOptions;
  onReady?: (player: Player) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, options, onReady }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      const playerOptions: VideoJsPlayerOptions = {
        ...options,
        sources: [{
          src: url,
          type: 'video/mp4'
        }]
      };

      const player = playerRef.current = videojs(videoElement, playerOptions, () => {
        videojs.log('player is ready');
        if (onReady) {
          onReady(player);
        }
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [url, options, onReady]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};

export default VideoPlayer;
