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

  return (
    <Suspense fallback="LOADING...">
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
