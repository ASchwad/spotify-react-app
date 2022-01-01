
import React, { Suspense, useEffect } from 'react';
import './App.css';
import axios, { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query'

function getPlaylists(token: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    var url = 'https://api.spotify.com/v1/me/playlists';
  
    var config: AxiosRequestConfig = {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
  
    axios.get(url, config)
    .then(result => resolve(result.data.items))
    .catch(error => reject(error))
  });
}

function Dashboard() {
  const token = window.location.href.split('access_token=')[1].split('&token_type')[0]
  const { data, isLoading } = useQuery('playlists', () => getPlaylists(token))
  console.log(data)
  if(isLoading) return null
  return (
    <Suspense fallback="LOADING...">
      <div>
        {data!.map(playlist => (
          <ul className="list-disc">
            <li>{playlist!.name}</li>
          </ul>
        ))}
      </div>
    </Suspense>
  );
}

export default Dashboard;
