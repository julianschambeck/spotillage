function Tile({ artist }) {
    const url = artist.images[2].url;
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#ff0000",
                width: "210px",
                height: "210px",
                paddingTop: "10px",
                marginLeft: "15px",
                marginRight: "15px",
                borderRadius: "10px",
                borderStyle: "solid",
                borderWidth: "1px",
            }}
        >
            <div style={{ textAlign: "center" }}>
                <div
                    style={{
                        backgroundImage: `url(${url})`,
                        width: "140px",
                        height: "140px",
                        borderRadius: "50%",
                    }}
                ></div>
                <p>
                    {artist.name}
                    <br />
                </p>
            </div>
        </div>
    );
}

export { Tile };
