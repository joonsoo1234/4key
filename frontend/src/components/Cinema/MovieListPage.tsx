import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Cinema/MovieListPage.css";

interface Screening {
    theater: string;
    time: string;
    availableSeats: string;
    format: string;
}

const movies = [
    {
        title: "모아나2",
        ageRating: "12",
        posterUrl: "https://i.namu.wiki/i/CHQV9S1_2Ril3Obs7-whPG-9H4qllYxClH3jwgc9XXOgYyEOVoFGkWUx-kyqOIOUkRR9VpbPbsqXMm64eFxcrw.webp",
        screenings: [
            { theater: "1관", time: "10:00 ~ 11:30", availableSeats: "120/180", format: "2D" },
            { theater: "2관", time: "13:00 ~ 14:30", availableSeats: "150/300", format: "3D" },
            { theater: "3관", time: "16:00 ~ 17:30", availableSeats: "200/400", format: "IMAX" },
            { theater: "6관", time: "14:30 ~ 16:00", availableSeats: "180/300", format: "IMAX" },
        ],
    },
    {
        title: "무파사: 라이온 킹",
        ageRating: "12",
        posterUrl: "https://i.namu.wiki/i/ZvB1697QFZlA-HYxNL8DkKVtRhWzexPHvZOD8IYkqS-YTiZN8Da2gIK2VJmhC_iMiHXNVsbYu5caAZdOalvemQ.webp",
        screenings: [
            { theater: "4관", time: "09:30 ~ 11:00", availableSeats: "100/500", format: "2D" },
            { theater: "5관", time: "12:00 ~ 13:30", availableSeats: "120/500", format: "2D" },
            { theater: "6관", time: "14:30 ~ 16:00", availableSeats: "180/500", format: "IMAX" },
            { theater: "7관", time: "18:00 ~ 19:30", availableSeats: "200/500", format: "3D" },
        ],
    },
    {
        title: "소방관",
        ageRating: "15",
        posterUrl: "https://i.namu.wiki/i/aSFHhtgLalZFD3Q20IgP_sTgPIedw3RQwp2zjS9_Ks7-R7LIyqkJvlakKjc8v2VAmLE43EkPuu2got7E91Gj3w.webp",
        screenings: [
            { theater: "8관", time: "10:00 ~ 11:30", availableSeats: "150/400", format: "2D" },
            { theater: "9관", time: "12:30 ~ 14:00", availableSeats: "180/400", format: "IMAX" },
            { theater: "10관", time: "15:00 ~ 16:30", availableSeats: "120/400", format: "3D" },
            { theater: "20관", time: "16:00 ~ 17:30", availableSeats: "180/400", format: "IMAX" },
        ],
    },
    {
        title: "위키드",
        ageRating: "15",
        posterUrl: "https://i.namu.wiki/i/Obm8jdGfo6-Vnq_xLAGfvJqX-S4LeYNdDanvK2MLhun6c-9ZCd6jH1LfljrAHpqAQxWhF3AVYeAssHEKKp68Lw.webp",
        screenings: [
            { theater: "11관", time: "11:00 ~ 12:30", availableSeats: "150/350", format: "2D" },
            { theater: "12관", time: "14:00 ~ 15:30", availableSeats: "130/350", format: "2D" },
            { theater: "13관", time: "16:00 ~ 17:30", availableSeats: "100/350", format: "4DX" },
            { theater: "20관", time: "16:00 ~ 17:30", availableSeats: "180/400", format: "IMAX" },
        ],
    },
    {
        title: "나 홀로 집에",
        ageRating: "7",
        posterUrl: "https://i.namu.wiki/i/yKCKWxSAUkSiQHdKyRckkA-miB0VZeIJcpgjtoYPcutixTS9IYbvpXpwD7TvmCIFEf5J52lSfXKFuJzH3UILLA.webp",
        screenings: [
            { theater: "14관", time: "10:30 ~ 12:00", availableSeats: "50/100", format: "2D" },
            { theater: "15��", time: "13:30 ~ 15:00", availableSeats: "60/100", format: "IMAX" },
            { theater: "16관", time: "17:00 ~ 18:30", availableSeats: "40/100", format: "3D" },
            { theater: "17관", time: "20:00 ~ 21:30", availableSeats: "20/100", format: "4DX" },
        ],
    },
    {
        title: "짱구는 못말려: 우리들의 공룡일기",
        ageRating: "12",
        posterUrl: "https://i.namu.wiki/i/KQ5htK9DJyT1ZLXHz2XF9F4IAhtiFESvAFpvrPCIBheypk-ViZP2BqqVBMepRMbiUdZ6VIOkSSAtAz2Rgh62YQ.webp",
        screenings: [
            { theater: "18관", time: "10:30 ~ 12:00", availableSeats: "130/400", format: "2D" },
            { theater: "19관", time: "13:00 ~ 14:30", availableSeats: "150/400", format: "3D" },
            { theater: "20관", time: "16:00 ~ 17:30", availableSeats: "180/400", format: "IMAX" },
            { theater: "17관", time: "20:00 ~ 21:30", availableSeats: "20/100", format: "4DX" },
        ],
    },
];

const MovieListPage: React.FC = () => {
    const navigate = useNavigate();
    const [, setSelectedScreening] = useState<{ movieTitle: string; time: string } | null>(null);

    const isTargetScreening = (movieTitle: string, theater: string, time: string) => {
        return movieTitle === "모아나2" && theater === "1관" && time === "10:00 ~ 11:30";
    };

    const handleScreeningClick = (movieTitle: string, theater: string, time: string, screening: Screening) => {
        if (isTargetScreening(movieTitle, theater, time)) {
            navigate('/seat-selection', {
                state: {
                    movieTitle,
                    theater,
                    time,
                    availableSeats: screening.availableSeats,
                    format: screening.format
                }
            });
        } else {
            setSelectedScreening({ movieTitle, time });
        }
    };

    return (
        <div className="movie-list-container">
            <div className="movie-grid">
                {movies.map((movie, index) => (
                    <div key={index} className="movie-card">
                        <div className="movie-info">
                            <div className="movie-poster">
                                <img
                                    src={movie.posterUrl}
                                    alt={`${movie.title} 포스터`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <span className="age-rating">{movie.ageRating}</span>
                            </div>
                            <h3>{movie.title}</h3>
                        </div>
                        <div className="screenings">
                            {movie.screenings.map((screening, idx) => (
                                <div
                                    key={idx}
                                    className={`screening-card ${
                                        isTargetScreening(movie.title, screening.theater, screening.time)
                                            ? 'highlight-screening'
                                            : ''
                                    }`}
                                    onClick={() => handleScreeningClick(movie.title, screening.theater, screening.time, screening)}
                                >
                                    <div className="screening-header">
                                        <span className="theater">{screening.theater}</span>
                                        <span className="time">{screening.time}</span>
                                    </div>
                                    <div className="screening-details">
                                        <span className="available-seats">{screening.availableSeats}</span>
                                        <span className="format">{screening.format}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieListPage;