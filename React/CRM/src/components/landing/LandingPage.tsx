import React, { useEffect, useState } from "react";
import dataProvider from "../../dataProvider";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  // Efecto para obtener el nombre del usuario
  useEffect(() => {
    const fetchUserName = async () => {
      const username = localStorage.getItem("username");
      if (username) {
        try {
          const response = await dataProvider.getOne("usuarios/username", {
            id: username,
          });
          setUserName(response.data?.nombre || username);
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Error al cargar la información del usuario");
        }
      }
    };

    fetchUserName();
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("rol");
    window.location.reload();
  };

  // Función para alternar el menú de configuración
  const toggleSettingsMenu = () => {
    setShowSettingsMenu(!showSettingsMenu);
  };

  return (
    <div className="landing-page">
      {/* Sección de Agradecimiento con imagen de fondo */}
      <section
        className="thanks-section"
        style={{ backgroundImage: `url('/cisternaFondo.png')` }}
      >
        <div className="overlay">
          {/* Logo y nombre de la fundación */}
          <div className="logo-container">
            <img
              src="/logoConFondo.jpeg"
              alt="Fundación Sanders Logo"
              className="logo"
            />
            <span className="nombre-fundacion">Fundación Sanders</span>
          </div>

          {/* Texto de agradecimiento */}
          <div className="thanks-text">
            <h1>Gracias por tu donación, {userName ? userName : "donador"}!</h1>
            {error ? (
              <p>{error}</p>
            ) : (
              <p>
                Gracias a tu generosa donación, estamos un paso más cerca de
                mejorar la vida de muchas personas que carecen de acceso a agua
                potable. Tu apoyo no solo proporciona un recurso vital como el
                agua, sino que también trae esperanza y un futuro más brillante
                para familias y comunidades que dependen de tu ayuda. Cada gota
                cuenta, y con tu colaboración, estamos construyendo un mundo más
                justo y solidario, donde el agua limpia ya no es un lujo, sino
                un derecho para todos. Gracias por creer en nuestra causa y por
                formar parte de este cambio.
              </p>
            )}
          </div>

          {/* Botón de configuración y log out */}
          <div className="overlay-settings">
            <img
              src="/settings.svg"
              alt="Settings"
              className="settings-icon"
              onClick={toggleSettingsMenu}
            />
            {showSettingsMenu && (
              <div className="settings-menu">
                <button onClick={handleLogout} className="logout-button">
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sección de Información del Proyecto */}
      <section className="project-info-section">
        <div className="project-text">
          <h2>Información del Proyecto</h2>
          <p>
            La Fundación Sanders tiene como misión llevar agua potable a las
            comunidades más necesitadas, promoviendo la salud, el bienestar y el
            desarrollo sostenible. A través de proyectos innovadores como la
            captación de agua pluvial y el abastecimiento seguro de agua,
            buscamos transformar vidas y construir un futuro donde cada persona
            tenga acceso a este recurso esencial. Nuestro compromiso es crear un
            impacto duradero que empodere a las comunidades y mejore sus
            condiciones de vida.
          </p>
        </div>
        <div className="progress-placeholder">
          <h3>Progreso del Proyecto</h3>
          <div className="graph-placeholder">[Gráfica de progreso]</div>
        </div>
      </section>

      {/* Sección de Conciencia */}
      <section className="awareness-section">
        <h2>Crea Conciencia</h2>
        <div className="image-grid">
          <img src="/grifo.jpg" alt="Grifo" className="awareness-image" />
          <img
            src="/manoConAgua.jpg"
            alt="Mano con agua"
            className="awareness-image"
          />
          <img
            src="/lavandoManos.jpg"
            alt="Lavando manos"
            className="awareness-image"
          />
        </div>

        {/* Párrafos de concienciación */}
        <div className="awareness-info">
          <div className="awareness-text">
            <h3>Para qué lo hacemos</h3>
            <p>
              Disponer de agua en cantidad y condiciones suficientes, y tener un
              impacto directo en la calidad de vida y el desarrollo social.
            </p>
          </div>
          <div className="awareness-text">
            <h3>Cómo lo hacemos</h3>
            <p>
              Llevamos agua potable a todas las comunidades mediante sistemas de
              captación de agua pluvial y abasto de agua potable.
            </p>
          </div>
        </div>

        {/* Botón de donación */}
        <button className="donate-button">Realiza una donación</button>

        {/* Compartir en redes sociales */}
        <div className="social-share">
          <h3>Comparte nuestra causa</h3>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/fundacionsandersac"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/facebook.png" alt="Facebook" className="social-icon" />
            </a>
            <a
              href="https://x.com/SandersAc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/x.png" alt="X" className="social-icon" />
            </a>
            <a
              href="https://www.instagram.com/sandersfundacion/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/instagram.png"
                alt="Instagram"
                className="social-icon"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Footer con información de contacto */}
      <footer className="footer">
        <div className="contact-info">
          <div className="contact-left">
            <p>
              <strong>DIRECCIÓN</strong>
            </p>
            <p>
              Melchor Ocampo 193, Torre A, Piso 1,
              <br />
              CP 11300 Col. Verónica Anzures
            </p>
          </div>

          <div className="contact-center">
            <p>
              <strong>TELÉFONO</strong>
            </p>
            <p>55 1707-6203</p>
          </div>

          <div className="contact-right">
            <p>
              <strong>CORREO</strong>
            </p>
            <p>contacto@sanders.com.mx</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
