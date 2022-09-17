import axios from 'axios';

function generateRandomString(length: number) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function generateAuthURL() {
  const client_id = 'fba3cb47d4d14044aeae581cd5be33a1'; // Your client id
  const redirect_uri = `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://aschwad.github.io/spotify-react-app/'}dashboard`; // Your redirect uri
  const state = generateRandomString(16);

  // localStorage.setItem(stateKey, state);
  const scope = 'user-read-private user-read-email';

  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += `&client_id=${encodeURIComponent(client_id)}`;
  url += `&scope=${encodeURIComponent(scope)}`;
  url += `&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  url += `&state=${encodeURIComponent(state)}`;
  return url;
}

export function getPlaylists(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const url = '/me/playlists';

    axios
      .get(url)
      .then((result) => resolve(result.data.items))
      .catch((error) => reject(error));
  });
}

export function getPlaylistDetails(playlistId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const url = `/playlists/${playlistId}`;

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

export function getTrackFeatures(trackId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const url = `/audio-features/${trackId}`;

    axios
      .get(url)
      .then(async (result) => resolve(result.data))
     .catch((error) => reject(error));
  });
}