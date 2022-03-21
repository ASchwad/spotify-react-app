import axios from 'axios';

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