import React, { useState } from "react";
import "../../styles/Cinema/MovieListPage.css";

const movies = [
    {
        title: "파일럿",
        ageRating: "12",
        screenings: [
            { theater: "1관", time: "10:00 ~ 11:30", availableSeats: "120/600", format: "2D" },
            { theater: "2관", time: "13:00 ~ 14:30", availableSeats: "150/600", format: "3D" },
            { theater: "3관", time: "16:00 ~ 17:30", availableSeats: "200/600", format: "IMAX" },
            { theater: "6관", time: "14:30 ~ 16:00", availableSeats: "180/500", format: "IMAX" },
        ],
    },
    {
        title: "소풍",
        ageRating: "12",
        screenings: [
            { theater: "4관", time: "09:30 ~ 11:00", availableSeats: "100/500", format: "2D" },
            { theater: "5관", time: "12:00 ~ 13:30", availableSeats: "120/500", format: "2D" },
            { theater: "6관", time: "14:30 ~ 16:00", availableSeats: "180/500", format: "IMAX" },
            { theater: "7관", time: "18:00 ~ 19:30", availableSeats: "200/500", format: "3D" },
        ],
    },
    {
        title: "블루 문",
        ageRating: "15",
        screenings: [
            { theater: "8관", time: "10:00 ~ 11:30", availableSeats: "150/400", format: "2D" },
            { theater: "9관", time: "12:30 ~ 14:00", availableSeats: "180/400", format: "IMAX" },
            { theater: "10관", time: "15:00 ~ 16:30", availableSeats: "120/400", format: "3D" },
            { theater: "20관", time: "16:00 ~ 17:30", availableSeats: "180/400", format: "IMAX" },
        ],
    },
    {
        title: "어드벤처타임",
        ageRating: "7",
        screenings: [
            { theater: "11관", time: "11:00 ~ 12:30", availableSeats: "150/350", format: "2D" },
            { theater: "12관", time: "14:00 ~ 15:30", availableSeats: "130/350", format: "2D" },
            { theater: "13관", time: "16:00 ~ 17:30", availableSeats: "100/350", format: "4DX" },
            { theater: "20관", time: "16:00 ~ 17:30", availableSeats: "180/400", format: "IMAX" },
        ],
    },
    {
        title: "미지의 세계",
        ageRating: "18",
        screenings: [
            { theater: "14관", time: "10:30 ~ 12:00", availableSeats: "50/100", format: "2D" },
            { theater: "15관", time: "13:30 ~ 15:00", availableSeats: "60/100", format: "IMAX" },
            { theater: "16관", time: "17:00 ~ 18:30", availableSeats: "40/100", format: "3D" },
            { theater: "17관", time: "20:00 ~ 21:30", availableSeats: "20/100", format: "4DX" },
        ],
    },
    {
        title: "소녀의 꿈",
        ageRating: "12",
        screenings: [
            { theater: "18관", time: "10:30 ~ 12:00", availableSeats: "130/400", format: "2D" },
            { theater: "19관", time: "13:00 ~ 14:30", availableSeats: "150/400", format: "3D" },
            { theater: "20관", time: "16:00 ~ 17:30", availableSeats: "180/400", format: "IMAX" },
            { theater: "17관", time: "20:00 ~ 21:30", availableSeats: "20/100", format: "4DX" },
        ],
    },
    {
        title: "시간의 흐름",
        ageRating: "15",
        screenings: [
            { theater: "1관", time: "11:00 ~ 12:30", availableSeats: "200/500", format: "2D" },
            { theater: "2관", time: "14:00 ~ 15:30", availableSeats: "180/500", format: "IMAX" },
            { theater: "3관", time: "17:00 ~ 18:30", availableSeats: "150/500", format: "4DX" },
            { theater: "4관", time: "19:00 ~ 20:30", availableSeats: "120/500", format: "2D" },
        ],
    },
];

const MovieListPage: React.FC = () => {
    const [selectedScreening, setSelectedScreening] = useState<{ movieTitle: string; time: string } | null>(null);

    const handleScreeningClick = (movieTitle: string, time: string) => {
        // 상영 시간 선택 시 상태 업데이트
        setSelectedScreening({ movieTitle, time });
    };

    return (
        <div className="movie-list-page">
            {movies.map((movie, index) => (
                <div key={index} className="movie-card">
                    <div className="movie-info">
                        <div className="movie-poster">
                            <span className="age-rating">{movie.ageRating}</span>
                        </div>
                        <h3>{movie.title}</h3>
                    </div>
                    <div className="screenings">
                        {movie.screenings.map((screening, idx) => (
                            <div
                                key={idx}
                                className="screening-card"
                                onClick={() => handleScreeningClick(movie.title, screening.time)}
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

            {selectedScreening && (
                <div className="selected-screening">
                    <h3>선택한 상영 시간</h3>
                    <p>영화: {selectedScreening.movieTitle}</p>
                    <p>상영 시간: {selectedScreening.time}</p>
                </div>
            )}
        </div>
    );
};

export default MovieListPage;
