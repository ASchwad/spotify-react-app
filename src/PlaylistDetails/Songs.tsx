import { Dialog } from '@headlessui/react';
import axios from 'axios';
import KeyValueItem from 'components/KeyValueItem';
import { formatMsToMinutesAndSeconds } from 'helper/dateHelper';
import React, { useEffect, useState } from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

function Songs({ tracks }: any) {
  const [currentPreviewMp3, setCurrentPreviewMp3] = React.useState(null);
  const currentAudio = React.useRef(new Audio());
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [selectedTrackDetails, setSelectedTrackDetails] = useState<any>(null);

  useEffect(() => {
    getTrackFeatures(selectedTrack?.id)
    .then((res) => setSelectedTrackDetails(res));
  }, [selectedTrack]);

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

  function getTrackFeatures(trackId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `https://api.spotify.com/v1/audio-features/${trackId}`;
  
      axios
        .get(url)
        .then(async (result) => resolve(result.data))
       .catch((error) => reject(error));
    });
  }

  const SongDetails = () => {
    return (
      <Dialog open={selectedTrack !== null} onClose={() => setSelectedTrack(null)} className="fixed z-10 inset-0 overflow-y-auto flex">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className='bg-white z-20 w-1/2 p-5 m-auto self-center rounded'>
          <p className="text-xs font-bold text-gray-400">
            Song Details
          </p>

          <div className='flex items-center space-x-6 m-3'>
            <img
              className="w-1/4"
              src={
                    selectedTrack?.album.images[1]?.url ||
                    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Suh7FOTof_i0vIsm2Q1dEwAAAA%26pid%3DApi&f=1'
                  }
              alt="Artists Cover"
            />
            <div>
              <p className="text-2xl font-semibold">
                {selectedTrack.name}
              </p>
              <p className="text-sm font-light">
                {selectedTrack.artists.map(({ name } : { name: string  }) => name).join(' & ')}
              </p>
            </div>
          </div>
          <RadarChart
            outerRadius={90}
            width={430}
            height={250}
            data={[
            {
              name: 'Acousticness',
              value: selectedTrackDetails?.acousticness,
            },
            {
              name: 'Energy',
              value: selectedTrackDetails?.energy,
            },
            {
              name: 'Speechiness',
              value: selectedTrackDetails?.speechiness,
            },
            {
              name: 'Valence',
              value: selectedTrackDetails?.valence,
            },
            {
              name: 'Liveness',
              value: selectedTrackDetails?.liveness,
            },
          ]}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <Radar dataKey="value" fill="#86efac" />
          </RadarChart>
          <KeyValueItem description="BPM" value={Math.floor(selectedTrackDetails?.tempo).toString()} />
          <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setSelectedTrack(null)}>Cancel</button>
        </div>
      </Dialog>
    );
  };

  return (
    <>
      <h1 className="text-2xl font-light mb-2">Songs ({tracks.length})</h1>
      <ul className="divide-y divide-gray-100 text-left w-full">
        {_.orderBy(tracks, 'added_at', 'desc').map((track: any) => (
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
            <button
              onClick={() => setSelectedTrack(track.track)}
              type='button'
              className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <svg className="w-6 h-6 fill-current text-black-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
            </button>
          </div>
        ))}
      </ul>
      {selectedTrack ? <SongDetails /> : null}
    </>
  );
}

export default Songs;
