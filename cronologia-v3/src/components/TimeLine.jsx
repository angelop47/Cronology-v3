import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import "../styles/loader.css";

function TimeLine() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortByNewest, setSortByNewest] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/events`);

        const sortedEvents = response.data.sort((a, b) =>
          sortByNewest
            ? new Date(b.date) - new Date(a.date)
            : new Date(a.date) - new Date(b.date)
        );

        const formattedEvents = sortedEvents.map((event) => ({
          ...event,
          date: new Date(event.date).toISOString().slice(0, 10),
        }));

        setEvents(formattedEvents);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error("Error al obtener los eventos:", error);
      }
    };

    fetchEvents();
  }, [sortByNewest]);

  const handleSortToggle = () => {
    setSortByNewest((prevSortByNewest) => !prevSortByNewest);
  };

  const memoizedEvents = useMemo(() => events, [events]);

  if (loading) return <div className="loader"></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="w-10/12 sm:w-3/4 lg:w-1/2 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <button
          className="mb-4 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          onClick={handleSortToggle}
        >
          {sortByNewest
            ? "Mostrar desde más antiguo"
            : "Mostrar desde más reciente"}
        </button>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {memoizedEvents.map((event) => (
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
              <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                Usuario: {event.userName} {/* Mostrar el nombre del usuario */}
              </p>
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
      </div>
    </div>
  );
}

export default TimeLine;
