export function formatMsToMinutesAndSeconds(s: number){
  s /= 1000;
  const resultAsString = (s - (s %= 60)) / 60 + (s > 9 ? ':' : ':0') + s.toFixed(0);
  return resultAsString;
}