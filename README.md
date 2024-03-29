# Spotify App
This open-source React app uses the Spotify API to allow users to gain insights in their playlists.

Technologies used:
* React.js with Typescript
* Tailwind CSS (Styling)
* Headless UI
* Github Pages (Hosting)
* Github Actions (Deployment)

## Spotify Auth flows
<details>
<summary>Implicit grant (Used in this App)</summary>
<p>
The implicit grant flow is carried out on the client side and it does not involve secret keys. Thus, you do not need any server-side code to use it. Access tokens issued are short-lived with no refresh token to extend them when they expire.

> Best option for short-running frontend apps, where token expiration is not an issue  

How to retrieve an access token:
```
var client_id = 'CLIENT_ID';
var redirect_uri = 'http://localhost:8888/callback';

var state = generateRandomString(16);

localStorage.setItem(stateKey, state);
var scope = 'user-read-private user-read-email';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);
```
</p>
</details>

<details>
<summary>client credentials</summary>
<p>
The Client Credentials flow is used in server-to-server authentication. Since this flow does not include authorization, only endpoints that do not access user information can be accessed.

Requests access token via the `client_id` and `client_secret`.

> Best option when using non-user related api ("unscoped") api endpoints.
</p>
</details>
<details>
<summary>authorization code</summary>
<p>
The authorization code flow is suitable for long-running applications (e.g. web and mobile apps) where the user grants permission only once.

If you’re using the authorization code flow in a mobile app, or any other type of application where the client secret can’t be safely stored, then you should use the PKCE extension

- App requests authorization access at Spotify via the user Login
- Spotify API then returns a authorization code
- The auth code can then be used to request an access token (and refresh token)
- The access token can then be used to make API calls

> Access tokens are deliberately set to expire after a short time, after which new tokens may be granted by supplying the refresh token originally obtained during the authorization code exchange.
</p>
</details>

## Use cases
### Playlist analyzer
Calculate average feature values for each track in a playlist. Visualization via pie chart. Get all genres tags. Could also show [recommendations](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendations) based on the average value.

- Get current users playlist (https://api.spotify.com/v1/me/playlists)
- Get features of each track (https://api.spotify.com/v1/audio-features/0XPMfUWuB9U8Y75ywMp9lI)

### Playlist filter + creator
Filter playlist based on audio features and then add all songs to a new playlist.

## References
- Tailwind elements: https://tailwind-elements.com/docs/standard/components/carousel/
- https://developer.spotify.com/documentation/web-api/quick-start/
- https://github.com/spotify/web-api-auth-examples
- https://developer.spotify.com/dashboard/applications/fba3cb47d4d14044aeae581cd5be33a1
- https://michael-ansong7.medium.com/how-to-implement-the-spotify-api-in-your-react-apps-624782586c8


## Deployment
Github pages is not directly compatible with the react-router-dom library. To avoid the usage of [Hashrouter](https://www.freecodecamp.org/news/deploy-a-react-app-to-github-pages/), we use a [scripting approach](https://github.com/rafgraph/spa-github-pages) to redirect the subroutes. Manifested in `404.html` and `index.html`.

GH Pages deployment workflow in `.github/workflows/deploy-to-gh-pages.yml` - [instructions](https://dev.to/pierresaid/deploy-node-projects-to-github-pages-with-github-actions-4jco):
Builds the project, deploys the `build` folder to `gh-pages` branch and publishes the new app [here](https://aschwad.github.io/spotify-react-app/).
## Spotify specific Constants
### Track [audio features](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features)
> Track popularity: 
The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.
The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.
Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. Note: the popularity value may lag actual popularity by a few days: the value is not updated in real time.
### Genres
[Reference](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendation-genres)

```
"genres": [
        "acoustic",
        "afrobeat",
        "alt-rock",
        "alternative",
        "ambient",
        "anime",
        "black-metal",
        "bluegrass",
        "blues",
        "bossanova",
        "brazil",
        "breakbeat",
        "british",
        "cantopop",
        "chicago-house",
        "children",
        "chill",
        "classical",
        "club",
        "comedy",
        "country",
        "dance",
        "dancehall",
        "death-metal",
        "deep-house",
        "detroit-techno",
        "disco",
        "disney",
        "drum-and-bass",
        "dub",
        "dubstep",
        "edm",
        "electro",
        "electronic",
        "emo",
        "folk",
        "forro",
        "french",
        "funk",
        "garage",
        "german",
        "gospel",
        "goth",
        "grindcore",
        "groove",
        "grunge",
        "guitar",
        "happy",
        "hard-rock",
        "hardcore",
        "hardstyle",
        "heavy-metal",
        "hip-hop",
        "holidays",
        "honky-tonk",
        "house",
        "idm",
        "indian",
        "indie",
        "indie-pop",
        "industrial",
        "iranian",
        "j-dance",
        "j-idol",
        "j-pop",
        "j-rock",
        "jazz",
        "k-pop",
        "kids",
        "latin",
        "latino",
        "malay",
        "mandopop",
        "metal",
        "metal-misc",
        "metalcore",
        "minimal-techno",
        "movies",
        "mpb",
        "new-age",
        "new-release",
        "opera",
        "pagode",
        "party",
        "philippines-opm",
        "piano",
        "pop",
        "pop-film",
        "post-dubstep",
        "power-pop",
        "progressive-house",
        "psych-rock",
        "punk",
        "punk-rock",
        "r-n-b",
        "rainy-day",
        "reggae",
        "reggaeton",
        "road-trip",
        "rock",
        "rock-n-roll",
        "rockabilly",
        "romance",
        "sad",
        "salsa",
        "samba",
        "sertanejo",
        "show-tunes",
        "singer-songwriter",
        "ska",
        "sleep",
        "songwriter",
        "soul",
        "soundtracks",
        "spanish",
        "study",
        "summer",
        "swedish",
        "synth-pop",
        "tango",
        "techno",
        "trance",
        "trip-hop",
        "turkish",
        "work-out",
        "world-music"
    ]
```
