import React from "react";

const About = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
        <div className="w-10/12 sm:w-3/4 lg:w-1/2 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <h1 className="font-bold text-2xl cursor-pointer flex items-center gap-1">
            Acerca de este proyecto
          </h1>
          <p className="py-5">
            Soy un desarrollador apasionado, comprometido con la promoción y
            divulgación de la fascinante herencia histórica de Uruguay. Esta
            página web ha sido creada con el propósito de ayudarte a mantenerte
            informado y comprender mejor la historia de Uruguay.
          </p>
          <p className="py-5">
            Uruguay es un país verdaderamente encantador, lleno de belleza y
            cultura. A través de esta página web, te invitamos a explorar los
            momentos clave que han dado forma a Uruguay tal como lo conocemos
            hoy.
          </p>
          <p className="py-5">
            Ya sea que te interese conocer los antecedentes históricos de un
            determinado período o profundizar en eventos específicos,
            encontrarás una amplia gama de información detallada y visualmente
            atractiva.
          </p>
          <p className="py-5">
            Esta página web es una herramienta educativa esencial para
            estudiantes, investigadores, profesionales y cualquier persona
            interesada en sumergirse en la fascinante historia de Uruguay.
          </p>
          <p className="py-5">
            Únete a nosotros mientras navegamos a través del pasado y
            descubrimos cómo los eventos y las personas han moldeado la
            identidad uruguaya.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
