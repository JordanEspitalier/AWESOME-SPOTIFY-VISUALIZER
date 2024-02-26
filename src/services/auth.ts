import { CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, TOKEN_ENDPOINT, SCOPE } from "../utils/constants";
  
// Data structure that manages the current active token, caching it in localStorage
export const currentToken = 
{
    get access_token() {return localStorage.getItem('access_token') || null},
    get refresh_token() { return localStorage.getItem('refresh_token') || null; },
    get expires_in() { return localStorage.getItem('refresh_in') || null },
    get expires() { return localStorage.getItem('expires') || null },

    save: function(response : any)
    {
        const {access_token, refresh_token, expires_in} = response
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        localStorage.setItem('expires_in', expires_in)

        const now = new Date()
        const expiry = new Date(now.getTime() + (expires_in * 1000)).toString()
        localStorage.setItem('expires', expiry)
    }
}

// On page load, try to fetch auth code from current browser search URL
const args = new URLSearchParams(window.location.search);
const code = args.get('code');



export async function redirectToSpotifyAuthorize() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");
  
    const code_verifier = randomString;
    const data = new TextEncoder().encode(code_verifier);
    const hashed = await crypto.subtle.digest('SHA-256', data);
  
    const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  
    window.localStorage.setItem('code_verifier', code_verifier);
  
    const authUrl = new URL(AUTH_ENDPOINT)
    const params = {
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPE,
      code_challenge_method: 'S256',
      code_challenge: code_challenge_base64,
      redirect_uri: REDIRECT_URI,
    };
  
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
  }

  
  // Soptify API Calls

  export async function getToken(code : string) {
    const code_verifier = localStorage.getItem('code_verifier')
    const params = new URLSearchParams()
    params.append('client_id', CLIENT_ID)
    params.append('grant_type', 'authorization_code')
    params.append('code', code),
    params.append('redirect_uri', REDIRECT_URI)
    params.append('code_verifier', code_verifier || '')

    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
    })
  
    return await response.json()
  }
  
  async function refreshToken() {
    const params = new URLSearchParams()
    params.append('client_id', CLIENT_ID)
    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', currentToken.refresh_token || '')

    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    })
  
    return await response.json()
  }
