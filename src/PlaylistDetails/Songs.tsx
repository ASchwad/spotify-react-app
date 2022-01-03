import { formatMsToMinutesAndSeconds } from 'helper/dateHelper';
import React, { useEffect } from 'react';

function Songs({ tracks }: any) {
  const [currentPreviewMp3, setCurrentPreviewMp3] = React.useState(null);
  const currentAudio = React.useRef(new Audio());

  useEffect(() => {
    if (currentPreviewMp3){
      currentAudio.current.pause();
      currentAudio.current = new Audio(currentPreviewMp3);
      currentAudio.current.play();
    } else {
      currentAudio.current.pause();
    }
  }, [currentPreviewMp3]);

  // Attempt to stop audio when changing the playlist - does not work
  // TODO: Fix this
  // useLayoutEffect(() => {
  //   currentAudio.current.pause();
  // }, []);

  return (
    <>
      <h1 className="text-2xl font-light mb-2">Songs</h1>
      <ul className="divide-y divide-gray-100 text-left w-full">
        {tracks.map((track: any) => (
          <div key={track.track.id} className='flex'>
            {// eslint-disable-next-line no-nested-ternary
}            {track.track.preview_url ? 
              (track.track.preview_url !== currentPreviewMp3 ?
                <button
                  onClick={() => {
                  setCurrentPreviewMp3(track.track.preview_url);
                }}
                  type='button'
                  className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <svg className="w-6 h-6 fill-current text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="m10 16.5 6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                </button>
              : 
                <button
                  onClick={() => setCurrentPreviewMp3(null)}
                  type='button'
                  className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <svg className="w-6 h-6 fill-current text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z" /></svg>
                </button>
              )
            : 
                <button
                  type='button'
                  className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <svg className="w-6 h-6 fill-current text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="m10 16.5 6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                </button>
            }
            <div className='flex-1 flex-row'>
              <p>{track.track.name}</p>
              <p className='font-light text-sm'>{track.track.artists.map((artist: any) => artist.name).join(' & ')}</p>
            </div>
            <p className='flex-1'>{track.track.album.name}</p>
            <p className='flex-1'>{new Date(track.added_at).toLocaleDateString()}</p>
            <p className='flex-1'>{formatMsToMinutesAndSeconds(track.track.duration_ms)}</p>
          </div>
        ))}
      </ul>
    </>
  );
}

export default Songs;
