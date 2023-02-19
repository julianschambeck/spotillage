function Tile({ artist }) {
    const url = artist.imageDetails.url;
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row"
            }}
        >
            <div
                style={{
                    backgroundImage: `url(${url})`,
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    marginRight: "10px"
                }}
            >
            </div>
            <div>
                {artist.name}<br/>
                Genres: {JSON.stringify(artist.genres)}<br/>
                Popularity: {artist.popularity}<br/>
                Follower count: {artist.followersCount}
            </div>
        </div>
    );
}

export { Tile };
