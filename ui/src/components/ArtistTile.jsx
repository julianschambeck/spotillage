function ArtistTile({ artist }) {
    const url = artist.images[2].url;
    return (
        <div className="tileContainer">
            <div
                style={{
                    backgroundImage: `url(${url})`,
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                }}
            ></div>
        </div>
    );
}

export default ArtistTile;
