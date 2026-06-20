export default function Contacto() {
  return (
    <div className="contact-bg">
      <h1 className="center-align">¿Preguntas, inquietudes, comentarios?</h1>

      <div className="container">
        <div className="form-container card-panel z-depth-3">
          <div className="input-field">
            <input type="text" id="asunto" name="asunto" />
            <label htmlFor="asunto">Asunto</label>
          </div>

          <div className="file-field input-field">
            <div className="btn teal">
              <span>Adjuntar</span>
              <input type="file" name="file" />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" placeholder="Sube uno o más archivos" />
            </div>
          </div>

          <div className="input-field">
            <textarea id="descripcion" name="descripcion" className="materialize-textarea"></textarea>
            <label htmlFor="descripcion">Descripción</label>
          </div>

          <div className="input-field">
            <input type="text" id="contacto" name="contacto" />
            <label htmlFor="contacto">Email o número de contacto</label>
          </div>

          <div className="center-align">
            <button className="btn waves-effect waves-light btn-custom" type="button">
              Enviar
              <i className="material-icons right"></i>
            </button>
          </div>
        </div>
      </div>

      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Contáctanos</h5>
              <p className="grey-text text-lighten-4">
                Estamos aquí para ayudarte. No dudes en escribirnos.
              </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Síguenos</h5>
              <ul>
                <li>
                  <a className="grey-text text-lighten-3" href="https://web.facebook.com/" target="_blank" rel="noreferrer">
                    <i className="fab fa-facebook left"></i>Facebook
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                    <i className="fab fa-instagram left"></i>Instagram
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="https://outlook.live.com/mail/" target="_blank" rel="noreferrer">
                    <i className="fas fa-envelope left"></i>Correo
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="https://chat.whatsapp.com/" target="_blank" rel="noreferrer">
                    <i className="fab fa-whatsapp left"></i>WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container center-align">
            © 2025 Designed by : Onix.dev
          </div>
        </div>
      </footer>
    </div>
  )
}
