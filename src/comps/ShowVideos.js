
import React, { useState, useEffect } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const CompShowVideos = () => {
    const [fileList, setFileList] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        obtenerListaVideos();
    }, []);

    const obtenerListaVideos = async () => {
        try {
            const response = await fetch('http://localhost:8000/obtenerlistavideos');
            if (response.ok) {
                const data = await response.json();
                setVideos(data);
            } else {
                message.error('Error al obtener la lista de videos');
            }
        } catch (error) {
            console.error('Error al obtener la lista de videos:', error);
            message.error('Error al obtener la lista de videos');
        }
    };

    const props = {
        beforeUpload: (file) => {
            // Verifica si el archivo tiene la extensión mp4
            const isMp4 = file.type === 'video/mp4';
            if (!isMp4) {
                message.error('Por favor, sube solo archivos en formato mp4');
            }
            return isMp4; // Devuelve true si es mp4, false si no lo es
        },
        onChange: (info) => {
            setFileList(info.fileList);
            // Aquí puedes realizar acciones adicionales según el estado de carga
            if (info.file.status === 'done') {
                message.success(`${info.file.name} archivo correcto`);
            } else if (info.file.status === 'error') {
                message.success(`${info.file.name} archivo correcto.`);
            }
        }
    }

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            fileList.forEach((file) => {
                formData.append('videos', file.originFileObj);
            });

            const response = await fetch('http://localhost:8000/subirvideos', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                obtenerListaVideos();
                message.success('Videos subidos correctamente');
            } else {

                message.error('Error al subir los videos');
            }
        } catch (error) {
            console.error('Error de red:', error);

            message.error('Error de red al subir los videos');
        }
    };
    const handleDeleteVideo = async (videoName) => {
        try {
            const response = await fetch(`http://localhost:8000/eliminarvideo`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoNombre: videoName }),
            });

            if (response.ok) {
                message.success('Video eliminado correctamente');
                obtenerListaVideos(); // Actualizar la lista de videos después de eliminar uno
            } else {
                message.error('Error al eliminar el video');
            }
        } catch (error) {
            console.error('Error al eliminar el video:', error);
            message.error('Error al eliminar el video');
        }
    };

    return (
        <>
            {/* Resto de tu componente */}
            <div className="d-flex justify-content-center" style={{ marginBottom: " 3.5vh" }}>
                <Upload {...props} fileList={fileList} customRequest={handleUpload}
                    progress={"line"} showUploadList={false}>
                    <Button icon={<UploadOutlined />} style={{ color: 'white', backgroundColor: 'rgba(255, 119, 15)' }}>
                        Upload mp4 only</Button>
                </Upload>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center"
                style={{ marginBottom: "3.5vh" }}>
                <h2>Videos Subidos</h2>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-start"
                style={{ width: "75%", margin: "auto" }}>
                {videos.map((video, index) => (
                    <div className="d-flex flex-row" key={index} style={{ marginBottom: '20px' }}>
                        <h3 key={index} style={{ marginRight: "3.5vh" }}>{video.nombre}</h3>
                        <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDeleteVideo(video.nombre)}>
                            Eliminar
                        </Button>
                    </div>
                ))}
            </div>
        </>
    );
};



export default CompShowVideos;