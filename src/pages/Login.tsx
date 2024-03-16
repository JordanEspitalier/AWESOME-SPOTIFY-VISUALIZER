

import { redirectToSpotifyAuthorize } from "../services/auth"


export default function Login () 
{
    const loginWithSpotifyClick = async () => await redirectToSpotifyAuthorize()

    return (
        <div className="login">
            <header className="login-header">
                <h1>Awesome Spotify Visualizer</h1>
            </header>
            <div className="login-body">
                <button onClick={loginWithSpotifyClick}>Login to Spotify</button>
            </div>
        </div>
    )
}