import React from 'react';
import { formatMsToMinutesAndSeconds } from 'helper/dateHelper';
import KeyValueItem from 'components/KeyValueItem';

function AverageSongLength({ tracks }: any) {
  const totalDuration = tracks.reduce(
    (acc: any, curr: any) => acc + curr.track.duration_ms,
    0,
  );

  return (
    <KeyValueItem description='Average Song length' value={`${formatMsToMinutesAndSeconds(totalDuration / tracks.length)} minutes`} />
  );
}
export default AverageSongLength;
