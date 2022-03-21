import { Dialog } from '@headlessui/react';
import axios from 'axios';
import KeyValueItem from 'components/KeyValueItem';
import React, { useEffect, useState } from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

function SongDetailsDialog({ selectedTrack, setSelectedTrack }: any) {
  const [selectedTrackDetails, setSelectedTrackDetails] = useState<any>(null);

  useEffect(() => {
    getTrackFeatures(selectedTrack?.id)
    .then((res) => setSelectedTrackDetails(res));
  }, [selectedTrack]);


  function getTrackFeatures(trackId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `https://api.spotify.com/v1/audio-features/${trackId}`;
  
      axios
        .get(url)
        .then(async (result) => resolve(result.data))
       .catch((error) => reject(error));
    });
  }

  return (
    <Dialog open={selectedTrack !== null} onClose={() => setSelectedTrack(null)} className="fixed z-10 inset-0 overflow-y-auto flex">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className='bg-white z-20 w-1/2 max-w-xl p-5 m-auto self-center rounded'>
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
        {selectedTrackDetails && (

        <>
          <RadarChart
            outerRadius={90}
            height={250}
            width={500}
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
        </>
        )}
        {/* <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setSelectedTrack(null)}>Cancel</button> */}
      </div>
    </Dialog>
  );
}
export default SongDetailsDialog;
