import React, { Suspense, useState } from 'react';
import PlaylistDetails from './PlaylistDetails/PlaylistDetails';
import PlaylistOverview from './PlaylistOverview';


function Dashboard() {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');


  React.useEffect(() => {
    if (window.location.href.includes('access_token')) {
      // eslint-disable-next-line prefer-destructuring
      document.location.href = window.location.href.split('#access_token=')[0];
    }
  }, []);

  const Skeletons = () => {
    return (
      <div className='flex flex-row'>
        {[...Array(10)].map((_, index) => (
          <div key={index} className="w-56 h-36 p-6 mr-6 rounded-md mx-auto shadow-lg">
            <div className="flex animate-pulse flex-col items-center h-full justify-center">
              <div className="w-16 bg-gray-300 h-16 mb-3" />
              <div className="flex flex-col justify-center">
                <div className="w-36 bg-gray-300 h-6 rounded-md mb-1" />
                <div className="w-24 bg-gray-300 h-4 rounded-md " />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Suspense fallback={<Skeletons />}>
      <PlaylistOverview selectedPlaylistId={selectedPlaylistId} setSelectedPlaylistId={(playlistId) => setSelectedPlaylistId(playlistId)} />
      {selectedPlaylistId.length > 0 ? 
        <Suspense fallback="LOADING..."><PlaylistDetails playlistId={selectedPlaylistId} /></Suspense>
      : 
        <div className="w-full h-full text-center">
          <p>Select a playlist!</p>
        </div>
      } 
    </Suspense>
  );
}

export default Dashboard;
