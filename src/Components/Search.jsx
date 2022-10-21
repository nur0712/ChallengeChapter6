import {useEffect, useState} from "react"
import axios from 'axios'
import Movie from "./Movie"
import { Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useSearchParams } from "react-router-dom"

function Search({token, setToken}) {
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_API = MOVIE_API + "search/movie"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const API_KEY = "05f6cab85bf9d4f4c5d9018a962d5f29"

    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [noOfElement, setnoOfElement] = useState(4)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const query = searchParams.get('keywords')

    const slice = movies.slice(0, noOfElement)

    const showAll = () => {
        setnoOfElement(12)
    }

    const showLess = () => {
        setnoOfElement(4)
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    const fetchMovies = async (event) => {
        if (event) {
            event.preventDefault()
        }

        const {data} = await axios.get(`${query ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: query
            }
        })

        console.log(data.results[0])
        setMovies(data.results)
    }

    const fetchMoviesHere = async (event) => {
        if (event) {
            event.preventDefault()
        }

        const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })
        navigate("/search")
        console.log(data.results[0])
        setMovies(data.results)
    }

    // const trailer = videos?.filter((a) => a.type === "Trailer")[0].key

    // const fetchMovie = async (id) => {
    //     axios.get(`${MOVIE_API}/movie/${movie.id}/videos?${API_KEY}`).then((res) => {
    //         console.log(res.data.results);
    //         setTrailer(res.data.results)
    //     })
    // }


    const selectMovie = (movie) => {
        navigate(`/detail/${movie.id}`)
    }

    const renderMovies = () => (
        slice.map(movie => (
            <Movie
                selectMovie={selectMovie}
                key={movie.id}
                movie={movie}
            />
        ))
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
                <form className="form" onSubmit={fetchMoviesHere}> 
                    <input className="search" type="text" id="search" placeholder="Search Movie"
                           onInput={(event) => setSearchKey(event.target.value)}/>
                    <button className="submit-search" type="submit"><SearchIcon fontSize="small" /></button>
                </form>
                <span className={"lojin"}>
                <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
                </span>
            </header>) : (<header className="center-max-size header">
                <span className={"brand"} onClick={home}><h2>Movielist</h2></span>
                <form className="form" onSubmit={fetchMoviesHere}> 
                    <input className="search" type="text" id="search" placeholder="Search Movie"
                           onInput={(event) => setSearchKey(event.target.value)}/>
                    <button className="submit-search" type="submit"><SearchIcon fontSize="small" /></button>
                </form>
                <span className={"lojin"}>
                <Button variant="outlined" color="error" onClick={login}>Login</Button>
                <Button variant="contained" color="error" onClick={reg}>Register</Button>
                </span>
            </header>)}
            {movies.length ?
                <main>
                    <div className={"center-max-size title"}><h2>Search Result "{query || searchKey}"</h2>
                    {noOfElement===12 ? (<Button color="error" onClick={showLess}>Show Less Movie</Button>) : 
                    (<Button color="error" onClick={showAll}>Show All Movie</Button>)}</div>
                    <div className={"center-max-size container"}>
                        {renderMovies()}
                    </div>
                </main>
                : 'Sorry, no movies found'}
        </div>
    );
}

export default Search;