import React from 'react';
import { Button } from "@mui/material"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const MovieCar = ({movie}) => {
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"

    return (
        <main>
        {movie ?
            <div className="poster"
                 style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`}}>
                    <div className="center-max-size">
                        <div className="poster-content">
                            <Button variant='contained' color="error" startIcon={<PlayCircleIcon />}>Watch Trailer</Button>
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
            </div>
            : null}
        </main>
    );
};


export default MovieCar;