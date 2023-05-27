function ArtistTile({ artist }) {
    const url = artist.images[2].url;
    return (
        <div className="tile" onClick={() => console.log("hello")}>
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
