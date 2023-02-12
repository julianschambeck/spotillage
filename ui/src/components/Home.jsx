import { useEffect, useState } from "react";

function Home({ accessToken }) {
    const [topArtists, setTopArtists] = useState([]);
    useEffect(() => {
        const query = new URLSearchParams({
            limit: 25,
        });
        fetch("https://api.spotify.com/v1/me/top/artists?" + query.toString(), {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + accessToken
            }
        }).then((res) => {
            if (!res.ok) {
                throw new Error("Failed to get top artists");
            }
            return res.json();
        }).then((json) => {
            const topArtists = [];
            json.items.forEach((artist) => {
                topArtists.push({
                    id: artist.id,
                    name: artist.name,
                    genres: artist.genres,
                    imageDetails: artist.images[0],
                    popularity: artist.popularity,
                    url: artist.external_urls.spotify,
                    followersCount: artist.followers.total
                });
            });
            console.log(JSON.stringify(topArtists, null, "\t"));
            setTopArtists(topArtists);
        }
        ).catch((error) => console.error(error.message));
    }, []);
    return <div>Welcome to home page</div>;
}

export default Home;

