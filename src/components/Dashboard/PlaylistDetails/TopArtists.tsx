import React from 'react';
import _ from 'lodash';

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

export default TopArtists;
