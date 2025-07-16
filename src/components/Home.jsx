




function Home() {
    //const navigate = useNavigate();

    return (
        <div 
            style={{
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center", 
                height: "100vh", 
                textAlign: "center"
            }}
        >
            <h1>Welcome to the Book Management System</h1>
            <h3 style={{ marginTop: "40px" }}>
                Manage your books efficiently. Register or log in to access the system.
            </h3>
            <button
                //onClick={() => navigate('/reg')}
                style={{
                    backgroundColor: "green", 
                    marginRight: "10px", 
                    marginTop: "20px", 
                    padding: "10px 20px", 
                    border: "none", 
                     
                    borderRadius: "4px"
                }}
            >
                Register
            </button>
            <button
                //onClick={() => navigate('/log')}
                style={{
                    marginTop:"5px",
                    backgroundColor: "lightblue", 
                    padding: "10px 20px", 
                    border: "none", 
                    borderRadius: "4px"
                }}
            >
                Login
            </button>
            <p style={{ marginTop: "40px" }}>&copy; 2024 Book Management System</p>
        </div>
    );
}

export default Home;
