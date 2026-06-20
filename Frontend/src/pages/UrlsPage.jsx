import { useEffect } from 'react'

const externalApps = [
  { name: 'Power BI', icon: 'bar_chart', color: 'blue-text', url: 'https://app.powerbi.com/' },
  { name: 'Telegram', icon: 'chat', color: 'green-text', url: 'https://web.telegram.org' },
  { name: 'Anthropic', icon: 'security', color: 'red-text', url: 'https://console.anthropic.com/login' },
  { name: 'Workana', icon: 'work', color: 'orange-text', url: 'https://www.workana.com' },
  { name: 'Office 365 web', icon: 'workspaces', color: 'orange-text', url: 'https://www.microsoft.com/es-co/microsoft-365/free-office-online-for-the-web' },
  { name: 'Programar eventos', icon: 'event', color: 'orange-text', url: 'https://calendar.google.com/calendar/u/0/r' },
  { name: 'WhatsApp', icon: null, color: '', url: 'https://business.whatsapp.com/?lang=es_LA', isWhatsApp: true },
]

export default function UrlsPage() {
  useEffect(() => {
    const carouselElems = document.querySelectorAll('.carousel')
    window.M?.Carousel.init(carouselElems, {})
  }, [])

  return (
    <div className="urls-bg">
      <div className="carousel">
        <a className="carousel-item" href="https://chatgpt.com/">
          <img src="/icons8-aprendizaje-40.png" alt="chatgpt" />
        </a>
        <a className="carousel-item" href="#two!">
          <span className="white-text">
            <div className="container">
              <div className="row">
                <div className="col s12 m10">
                  <div className="card">
                    <div className="card-content">
                      <p style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Espacio donde encontrara herramientas para aumentar su Productividad
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </a>
        <a className="carousel-item" href="#three!">
          <img src="/icons8-gestión-del-tiempo-96.png" alt="tiempo" />
        </a>
        <a className="carousel-item" href="#four!">
          <img src="/icons8-productividad-80.png" alt="productividad" />
        </a>
      </div>

      <main className="principal2">
        <nav className="nav-wrapper green accent-4">
          <a href="#!" className="brand-logo center">APPS</a>
        </nav>

        <div className="icon-container">
          {externalApps.map((app) => (
            <div
              key={app.name}
              className="icon-card"
              onClick={() => window.open(app.url, '_blank')}
            >
              {app.isWhatsApp ? (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  className="responsive-img"
                  alt="WhatsApp"
                  style={{ width: '40px' }}
                />
              ) : (
                <i className={`material-icons ${app.color}`}>{app.icon}</i>
              )}
              <span>{app.name}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
