import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getPlaylistDetails } from 'api/spotify';
import Songs from './Songs/Songs';
import AveragePopularity from './AveragePopularity';
import TopArtists from './TopArtists';
import AverageSongLength from './AverageSongLength';

function PlaylistDetails({ playlistId }: any) {
  const navigate = useNavigate();

  const { data, isError } = useQuery(
    `playlist_details_${playlistId}`,
    () => getPlaylistDetails(playlistId),
  );

  if (isError) {
    navigate('/');
  }
  return (
    <div className="flex p-5 items-start flex-col text-center">
      <p className="text-sm font-normal text-gray-600">PLAYLIST</p>
      <h1 className="text-7xl font-light mb-6">{data!.name}</h1>
      <div className='flex space-x-12 mb-3'>
        <TopArtists tracks={data!.tracks.items} />
        <AverageSongLength tracks={data!.tracks.items} />
        <AveragePopularity tracks={data!.tracks.items} />
      </div>
      <Songs tracks={data!.tracks.items} />
    </div>
  );
}

export default PlaylistDetails;
