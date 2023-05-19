function ArtistTile({ artist }) {
    const url = artist.images[2].url;
    return (
        <div
            style={{
                flexDirection: "row",
                justifyContent: "center",
                padding: "16px",
                marginLeft: "26px",
                marginBottom: "16px",
                borderRadius: "10px",
                boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            }}
        >
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
