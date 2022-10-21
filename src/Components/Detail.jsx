import {useEffect, useState} from "react"
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function Detail({token, setToken}){
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const API_KEY = "api_key=05f6cab85bf9d4f4c5d9018a962d5f29"
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
    const params = useParams()
    const navigate = useNavigate()

    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")

    useEffect(() => {
        if(params.id){
            axios.get(`${MOVIE_API}movie/${params.id}?${API_KEY}`).then((res) => {
                console.log(res.data)
                setMovies(res.data)
            })
        }
    }, [params.id])

    const search = () => (
        navigate(`/search?keywords=${searchKey}`)
    )

    const home = () => (
        navigate("/")
    )

    const login = () => (
        navigate("/login")
    )

    const reg = () => (
        navigate("/register")
    )

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
    <div className="App">
            {token ? (<header className="center-max-size header">
                <span className={"brand"} onClick={home}><h2>Movielist</h2></span>
                <form className="form" onSubmit={search}> 
                    <input className="search" type="text" id="search" placeholder="Search Movie"
                           onInput={(event) => setSearchKey(event.target.value)}/>
                    <button className="submit-search" type="submit"><SearchIcon fontSize="small" /></button>
                </form>
                <span className={"lojin"}>
                <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
                </span>
            </header>) : (<header className="center-max-size header">
                <span className={"brand"} onClick={home}><h2>Movielist</h2></span>
                <form className="form" onSubmit={search}> 
                    <input className="search" type="text" id="search" placeholder="Search Movie"
                           onInput={(event) => setSearchKey(event.target.value)}/>
                    <button className="submit-search" type="submit"><SearchIcon fontSize="small" /></button>
                </form>
                <span className={"lojin"}>
                <Button variant="outlined" color="error" onClick={login}>Login</Button>
                <Button variant="contained" color="error" onClick={reg}>Register</Button>
                </span>
            </header>)}
            <div>
                <section className="detail">
                <div className="poster"
                 style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movies.backdrop_path})`}}>
                    <div className="center-max-size">
                        <div className="poster-content">
                        <span className={"movie-voting"}>{movies.vote_average} / 10</span>
                            <Button variant='contained' color="error" startIcon={<PlayCircleIcon />}>Watch Trailer</Button>
                            <p>{movies.genres && movies.genres.slice(0,5).map((item, i) => (
                                <Button
                                    key={i}
                                    variant="contained"
                                    color="secondary"
                                    style={{ minWidth:"100px", marginRight:"5px" }}>    
                                    {item.name}
                                </Button>
                            ))}</p>
                            <h1>{movies.title}</h1>
                            <p>{movies.overview}</p>
                        </div>
                    </div>
                </div>
                </section>
            </div>
    </div>
    )
}

export default Detail;