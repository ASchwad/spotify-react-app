import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { formatMsToMinutesAndSeconds } from 'helper/dateHelper';
import _ from 'lodash';
import KeyValueItem from 'components/KeyValueItem';
import Songs from './Songs/Songs';

// eslint-disable-next-line consistent-return
const fetchMoreTracks = (result: any, aggregatedResults: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (result.next == null){
      resolve(aggregatedResults);
    }
    axios.get(result.next)
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    .then(async (newResult) => {
      aggregatedResults.tracks.items = [...newResult.data.items, ...aggregatedResults.tracks.items];
      resolve(await fetchMoreTracks(newResult.data, aggregatedResults));
    })
    .catch((err) => {
      reject(err);
    });
  });
};

function getPlaylistDetails(playlistId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;

    axios
      .get(url)
      .then(async (result) => {
        const aggregatedResults = result.data;
        fetchMoreTracks(result.data.tracks, aggregatedResults)
        .then((tracks) => resolve(tracks));
      })
     .catch((error) => reject(error));
  });
}

function TopArtists({ tracks }: any) {
  const countTracksByArtist  = _.countBy(tracks, (track) => track.track.artists[0].name);
  const sortedArtistCount = _.orderBy(Object.keys(countTracksByArtist).map(key=>({ key, value: countTracksByArtist[key] })), 'value', ['desc']);
  return (
    <div className="flex flex-col items-start">
      <p className="text-xs font-light">
        Top Artists
      </p>
      {sortedArtistCount.slice(0, 5).map((artist: any, index: number) => <p className="text-2xl font-semibold" key={index}>{artist.key} - {artist.value} Songs</p>)}
    </div>
  );
}

function Duration({ tracks }: any) {
  const totalDuration = tracks.reduce(
    (acc: any, curr: any) => acc + curr.track.duration_ms,
    0,
  );

  return (
    <KeyValueItem description='Average Song length' value={`${formatMsToMinutesAndSeconds(totalDuration / tracks.length)} minutes`} />
  );
}

function Popularity({ tracks }: any) {
  const totalPopularity = tracks.reduce(
    (acc: any, curr: any) => acc + curr.track.popularity,
    0,
  );

  return (
    <KeyValueItem description='Average Song Popularity' value={(totalPopularity / tracks.length).toFixed(0)} />
  );
}

function PlaylistDetails({ playlistId }: any) {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(
    `playlist_details_${playlistId}`,
    () => getPlaylistDetails(playlistId),
  );

  if (isError) {
    navigate('/');
  }
  if (isLoading) return null;
  return (
    <div className="flex p-5 items-start flex-col">
      <p className="text-sm font-normal text-gray-600">PLAYLIST</p>
      <h1 className="text-7xl font-light mb-6">{data!.name}</h1>
      <div className='flex space-x-12 mb-3'>
        <TopArtists tracks={data!.tracks.items} />
        <Duration tracks={data!.tracks.items} />
        <Popularity tracks={data!.tracks.items} />
      </div>
      <Songs tracks={data!.tracks.items} />
    </div>
  );
}

export default PlaylistDetails;
