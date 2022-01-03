import React from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { formatMsToMinutesAndSeconds } from 'helper/dateHelper';
import Songs from './Songs';

function getPlaylistDetails(token: string, playlistId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(url, config)
      .then((result) => resolve(result.data))
      .catch((error) => reject(error));
  });
}

function Duration({ tracks }: any) {
  const totalDuration = tracks.reduce(
    (acc: any, curr: any) => acc + curr.track.duration_ms,
    0,
  );

  return (
    <p className="text-2xl font-semibold">
      Average Song length: {formatMsToMinutesAndSeconds(totalDuration / tracks.length)} minutes
    </p>
  );
}

function Popularity({ tracks }: any) {
  const totalPopularity = tracks.reduce(
    (acc: any, curr: any) => acc + curr.track.popularity,
    0,
  );

  return (
    <>
      <p className="text-2xl font-semibold">
        Average Song Popularity: {(totalPopularity / tracks.length).toFixed(0)}
      </p>
      <p className="text-xs text-justify">
        The popularity of the track. The value will be between 0 and 100, with
        100 being the most popular. The popularity of a track is a value between
        0 and 100, with 100 being the most popular. The popularity is calculated
        by algorithm and is based, in the most part, on the total number of
        plays the track has had and how recent those plays are. Generally
        speaking, songs that are being played a lot now will have a higher
        popularity than songs that were played a lot in the past. Duplicate
        tracks (e.g. the same track from a single and an album) are rated
        independently. Artist and album popularity is derived mathematically
        from track popularity. Note: the popularity value may lag actual
        popularity by a few days: the value is not updated in real time.
      </p>
    </>
  );
}

function PlaylistDetails({ playlistId }: any) {
  const navigate = useNavigate();
  const token = window.location.href
    .split('access_token=')[1]
    .split('&token_type')[0];
  const { data, isLoading, isError } = useQuery(
    `playlist_details_${playlistId}`,
    () => getPlaylistDetails(token, playlistId),
  );

  if (isError) {
    navigate('/');
  }
  if (isLoading) return null;
  return (
    <div className="flex p-5 items-start flex-col">
      <h1 className="text-4xl font-light mb-2">Playlist: {data!.name}</h1>
      <Popularity tracks={data!.tracks.items} />
      <Duration tracks={data!.tracks.items} />
      <Songs tracks={data!.tracks.items} />
    </div>
  );
}

export default PlaylistDetails;
