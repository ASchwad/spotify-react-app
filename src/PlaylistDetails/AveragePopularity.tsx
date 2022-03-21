import React from 'react';
import KeyValueItem from 'components/KeyValueItem';

function AveragePopularity({ tracks }: any) {
  const totalPopularity = tracks.reduce(
    (acc: any, curr: any) => acc + curr.track.popularity,
    0,
  );

  return (
    <KeyValueItem description='Average Song Popularity' value={(totalPopularity / tracks.length).toFixed(0)} />
  );
}
export default AveragePopularity;
