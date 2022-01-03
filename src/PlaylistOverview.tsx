import React, { Suspense } from 'react';
import './App.css';
import axios, { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

function getPlaylists(token: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const url = 'https://api.spotify.com/v1/me/playlists';

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(url, config)
      .then((result) => resolve(result.data.items))
      .catch((error) => reject(error));
  });
}

type IProps = {
  selectedPlaylistId?: string | null;
  setSelectedPlaylistId: (playlistId: string) => void;
};

function PlaylistOverview({
  selectedPlaylistId,
  setSelectedPlaylistId,
}: IProps) {
  const navigate = useNavigate();
  const token = window.location.href
    .split('access_token=')[1]
    .split('&token_type')[0];
  const { data, isLoading, isError } = useQuery('playlists', () =>
    getPlaylists(token),
  );
  if (isError) {
    navigate('/');
  }
  if (isLoading) return null;
  return (
    <Suspense fallback="LOADING...">
      <div className="flex overflow-y-scroll">
        {data!.map((playlist) => (
          <div
            key={playlist.id}
            className="p-3 mb-3"
            onClick={() => setSelectedPlaylistId(playlist.id)}
          >
            <div
              className={`w-56 rounded overflow-hidden shadow-lg hover:bg-green-300 ${
                selectedPlaylistId === playlist.id && 'bg-green-300'
              }`}
            >
              <img
                className="w-1/3 m-auto"
                src={
                  playlist.images[1]?.url ||
                  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Suh7FOTof_i0vIsm2Q1dEwAAAA%26pid%3DApi&f=1'
                }
                alt="Artists Cover"
              />
              <div className="px-6 py-1">
                <div className="font-bold text-lg">{playlist.name}</div>
              </div>
              <div className="px-6 pb-1">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                  Tracks: {playlist.tracks.total}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  );
}

export default PlaylistOverview;