
import React, { Suspense, useState } from 'react';
import './App.css';
import PlaylistDetails from './PlaylistDetails';
import PlaylistOverview from './PlaylistOverview';


function Dashboard() {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  return (
    <Suspense fallback="LOADING...">
      <PlaylistOverview setSelectedPlaylistId={(playlistId) => setSelectedPlaylistId(playlistId)} />
      {selectedPlaylistId.length > 0 ? 
      <Suspense fallback="LOADING..."><PlaylistDetails playlistId={selectedPlaylistId} /></Suspense>
      : 
        <div className="w-full h-full">
          <p>Select a playlist!</p>
        </div>
      } 
    </Suspense>
  );
}

export default Dashboard;
