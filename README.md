# Spotillage

Spotillage is a single page web app that lists your top 20 favorite artists on Spotify - in the form of a collage. Click on an artist image and you will see further details like: the music
genres which the artist covers, the tracks you listen to the
most, and the general popularity of the artist on Spotify.

The app is built with [React](https://react.dev/) and uses the [Material UI ](https://mui.com/material-ui/) components library (based on Material Design).

Spotillage talks to the [Spotify Web API](https://developer.spotify.com/documentation/web-api) to fetch
the relevant top artists and tracks data. Before that it goes through the
Authorization Code with PKCE Flow to be granted the necessary access token.

The app does _not_ store any Spotify data of users.


Try it out here <<< [Spotillage](https://julianschambeck.github.io/spotillage/) >>>

