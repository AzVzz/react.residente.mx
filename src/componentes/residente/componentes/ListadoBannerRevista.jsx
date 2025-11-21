import React, { useState, useEffect } from "react";
import MainLateralPostTarjetas from './componentesColumna2/MainLateralPostTarjetas';
import { urlApi, imgApi } from '../../../componentes/api/url.js';
import { cuponesGet } from '../../../componentes/api/cuponesGet.js';
import BannerChevrolet from "./BannerChevrolet.jsx";

const ListadoBannerRevista = ({
    tiposNotas,
    filtrarPostsPorTipoNota,
    filtrarDestacadasPorTipoNota,
    handleCardClick,
    revistaActual,
    notasResidenteGet
}) => {

    const [cupones, setCupones] = useState([]);
    const [giveaway, setGiveaway] = useState(null);

    useEffect(() => {
        cuponesGet()
            .then(data => setCupones(Array.isArray(data) ? data : []))
            .catch(() => setCupones([]));
    }, []);

    // Configuración para los buscadores de Notas
    const buscadorConfig = [
        { tipo: "Antojos", keyword: "taquerias iconicas", img: "taquerias-iconicas.webp" },
        { tipo: "Antojos", keyword: "cantinas", img: "ruta-de-las-cantinas.webp" },
        { tipo: "Antojos", keyword: "cafes", img: "cafe-independiente-de-nl.webp" }
    ];

    return (
        <div className="flex flex-col">
            {["Restaurantes", "Food & Drink", "Antojos"].map((tipo) => {
                const postsFiltrados = filtrarPostsPorTipoNota(tipo);
                const destacadasFiltradas = filtrarDestacadasPorTipoNota(tipo);

                if (postsFiltrados.length === 0) return null;

                const tipoConfig = tiposNotas.find(t => t.nombre === tipo) || { tipoLogo: "", marqueeTexto: "", label: "" };
                const tipoLogo = tipoConfig.tipoLogo ? `${imgApi}${tipoConfig.tipoLogo}` : null;
                const marqueeTexto = tipoConfig.marqueeTexto || "";
                const tipoLabel = (tipoConfig.label || tipo || "").toString();
                const mostrarBanner = ["Antojos", "Gastro-Destinos", "Food & Drink"].includes(tipo);
                const mostrarBannerEnMedio = tipo === "Restaurantes";

                return (
                    <div key={tipo} className="flex flex-col pt-9" id={tipo.replace(/[^a-zA-Z]/g, '').toLowerCase()}>
                        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-x-15 gap-y-9">
                            {/* Columna Principal */}
                            <div>
                                <div className="relative flex justify-center items-center mb-2">
                                    <div className="absolute left-0 right-0 top-1/2 border-t-4 border-transparent opacity-100 z-0" aria-hidden="true" />
                                    <div className="relative z-10">
                                        <div className="flex">
                                            {mostrarBanner && (
                                                tipo === "Food & Drink" ? (
                                                    <div className="mb-11">
                                                        <BannerChevrolet size="big" />
                                                    </div>
                                                ) : revistaActual && revistaActual.pdf ? (
                                                    <div className="mb-11">
                                                        <a
                                                            href={revistaActual.pdf}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            download
                                                            className="inline-block"
                                                        >
                                                            <img
                                                                src={revistaActual.imagen_banner}
                                                                alt="Banner Revista"
                                                                className="w-full cursor-pointer"
                                                                title="Descargar Revista"
                                                            />
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={revistaActual?.imagen_banner}
                                                        alt="Banner Revista"
                                                        className="w-full mb-11"
                                                    />
                                                )
                                            )}
                                        </div>
                                        <div className="flex items-center justify-center">
                                            {tipoLogo ? (
                                                <img
                                                    src={tipoLogo}
                                                    alt={tipoLabel}
                                                    className={
                                                        tipo === "Antojos" ? "h-auto w-70 object-contain" :
                                                            tipo === "Gastro-Destinos" ? "h-auto w-95 object-contain" :
                                                                tipo === "Food & Drink" ? "h-auto w-80 object-contain" :
                                                                    tipo === "Restaurantes" ? "h-auto w-85 object-contain" :
                                                                        "h-auto w-60 object-contain"}
                                                />
                                            ) : (
                                                <span
                                                    className={[
                                                        "block text-black font-extrabold uppercase text-center",
                                                        tipo === "Antojos" ? "text-2xl md:text-2xl" : "text-4xl md:text-4xl",
                                                        "leading-none tracking-tight"
                                                    ].join(" ")}
                                                >
                                                    {tipoLabel}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center items-center text-[12px] mb-4 gap-6">
                                    <p className="uppercase">{marqueeTexto}</p>
                                </div>
                            </div>

                            {/* Columna lateral */}
                            <div className="flex flex-col items-end justify-start gap-10">
                                <MainLateralPostTarjetas
                                    notasDestacadas={destacadasFiltradas}
                                    onCardClick={handleCardClick}
                                    sinCategoria
                                    sinFecha
                                    cantidadNotas={5}
                                />
                            </div>
                        </div>
                        {tipo === "Restaurantes" && (
                            <>
                                <div className="relative flex justify-center items-center mb-6 pt-2 mt-8">
                                    <div className="absolute left-0 right-0 top-1/3 border-t-2 border-black opacity-100 z-0" />
                                    <div className="relative z-10 px-4 bg-[#DDDDDE]">
                                        <div className="flex flex-row justify-center items-center gap-2">
                                            <img className="h-full w-105" src="https://residente.mx/fotos/fotos-estaticas/residente-logos/negros/nuestras-recomendaciones.webp" />
                                        </div>
                                        <div className="text-center mt-0 leading-5">
                                            <span className="text-[12px] font-semibold tracking-wide">
                                                {new Date().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' }).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ListadoBannerRevista;