import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const ReproductorVideo = () => {
    const [videos, setVideos] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const obtenerListaVideos = async () => {
        try {
            const response = await fetch('http://localhost:8000/obtenerlistavideos');
            const data = await response.json();
            setVideos(data);
        } catch (error) {
            console.error('Error al obtener la lista de videos:', error);
        }
    };

    useEffect(() => {
        obtenerListaVideos();
    }, [])

    const handleVideoEnded = async () => {
        try {
            await obtenerListaVideos(); // Actualizamos la lista de videos

            // Ajustamos el índice del video actual si la lista de videos ha cambiado
            if (currentVideoIndex >= videos.length) {
                setCurrentVideoIndex(0); // Si el índice actual es mayor o igual que la longitud de la lista de videos, establecemos el índice en 0
            }
            else {
                // Recalculamos el índice del video actual en caso de que haya cambiado la lista de videos
                const nextVideoIndex = (currentVideoIndex + 1) % videos.length;
                setCurrentVideoIndex(nextVideoIndex);
            }
        } catch (error) {
            console.error('Error al manejar el final del video:', error);
        }
    };

    return (
        <div>
            {videos.length === 0 ? (
                <div>No hay Videos</div>
            ) : (
                <ReactPlayer
                    url={videos[currentVideoIndex].url}
                    controls
                    width="100%"
                    height="100%"
                    playing={true}
                    onEnded={handleVideoEnded}
                    style={{ objectFit: 'cover' }}
                    loop={videos.length === 1 ? true : false}
                />
            )}
        </div>
    );
};

export default ReproductorVideo;