
function Login() {
    
    function login() {
        fetch('http://localhost:8888/login')
            .then((response) => {
                console.log(response.status);
                console.log(response.url);
            })
            .catch(console.log);
    }
    return (
        <div>
            <button onClick={() => login()}>Login here</button>
        </div>
    );
}

export { Login };