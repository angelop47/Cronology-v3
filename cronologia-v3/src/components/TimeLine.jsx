import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function TimeLine() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Estado para la página actual
  const [hasMore, setHasMore] = useState(true); // Estado para indicar si hay más eventos por cargar
  const [sortByNewest, setSortByNewest] = useState(true); // Estado para controlar el orden

  const loadEvents = useCallback(() => {
    if (!hasMore) return; // No hacer solicitudes si no hay más eventos

    setLoading(true);
    axios
      .get("https://cronology-v3.onrender.com/events", {
        params: {
          page: page,
          limit: 10, // Número de eventos por solicitud
        },
      })
      .then((response) => {
        let sortedEvents = response.data;

        // Ordenar eventos según la opción seleccionada
        sortedEvents = sortedEvents.sort((a, b) => {
          if (sortByNewest) {
            return new Date(b.date) - new Date(a.date);
          } else {
            return new Date(a.date) - new Date(b.date);
          }
        });

        // Formatear las fechas para mostrar solo "yyyy-mm-dd"
        sortedEvents = sortedEvents.map((event) => ({
          ...event,
          date: new Date(event.date).toISOString().slice(0, 10),
        }));

        // Verificar si hay más eventos que cargar
        const moreEventsAvailable = sortedEvents.length > 0;

        // Agregar eventos nuevos si estamos en la primera página, de lo contrario concatenar
        setEvents((prevEvents) => {
          // Si estamos cargando la primera página, reemplazamos los eventos anteriores
          if (page === 1) {
            return sortedEvents;
          }
          // Si estamos cargando eventos adicionales, evitamos duplicados
          const existingIds = new Set(prevEvents.map((event) => event._id));
          return [
            ...prevEvents,
            ...sortedEvents.filter((event) => !existingIds.has(event._id)),
          ];
        });

        // Actualizar hasMore dependiendo de si hay más eventos en la respuesta
        setHasMore(moreEventsAvailable);

        // Si no hay eventos en la respuesta y estamos en la primera página, indicamos que no hay más eventos
        if (!moreEventsAvailable && page === 1) {
          setHasMore(false);
        }

        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [page, sortByNewest, hasMore]);

  useEffect(() => {
    loadEvents();
  }, [page, sortByNewest, loadEvents]);

  const handleSortToggle = () => {
    // Cambiar la opción de orden al hacer clic en el botón
    setSortByNewest((prevSortByNewest) => !prevSortByNewest);
    setEvents([]); // Limpiar los eventos actuales
    setPage(1); // Reiniciar la página
    setHasMore(true); // Restablecer hasMore al cambiar el orden
  };

  const handleLoadMore = () => {
    if (!hasMore || loading) return; // No hacer nada si no hay más eventos o si está cargando
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && events.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="w-10/12 sm:w-3/4 lg:w-1/2 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        {/* Botón para cambiar el orden de los eventos */}
        <button
          className="mb-4 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          onClick={handleSortToggle}
        >
          {sortByNewest
            ? "Mostrar desde más antiguo"
            : "Mostrar desde más reciente"}
        </button>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {events.map((event) => (
            <li key={event._id} className="mb-10 ml-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {event.date}
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {event.name}
              </h3>
              <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
                {event.description}
              </p>
              <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                Categoría:{" "}
                {event.categoryId ? event.categoryId.name : "Sin categoría"}
              </p>
              {/* <img
                src={event.image}
                alt={event.name}
                className="mb-4 rounded-lg"
              /> */}
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                Leer más
                <svg
                  className="w-3 h-3 ml-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </li>
          ))}
        </ol>
        {hasMore && !loading && (
          <button
            className="mt-4 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            onClick={handleLoadMore}
          >
            Cargar más
          </button>
        )}
        {!hasMore && !loading && events.length > 0 && (
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            No hay más eventos para cargar.
          </div>
        )}
      </div>
    </div>
  );
}

export default TimeLine;
