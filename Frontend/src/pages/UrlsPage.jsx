const externalApps = [
  { name: 'Power BI', icon: '📊', url: 'https://app.powerbi.com/' },
  { name: 'Telegram', icon: '💬', url: 'https://web.telegram.org' },
  { name: 'Anthropic', icon: '🔒', url: 'https://console.anthropic.com/login' },
  { name: 'Workana', icon: '💼', url: 'https://www.workana.com' },
  { name: 'Office 365', icon: '📄', url: 'https://www.microsoft.com/es-co/microsoft-365/free-office-online-for-the-web' },
  { name: 'Calendar', icon: '📅', url: 'https://calendar.google.com/calendar/u/0/r' },
  { name: 'WhatsApp', icon: '📱', url: 'https://business.whatsapp.com/?lang=es_LA' },
]

export default function UrlsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      {/* Hero */}
      <div className="relative h-[200px] overflow-hidden">
        <img src="/15706.png" alt="hero" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-cyan-800">Productividad</h1>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <nav className="bg-green-500 text-white rounded-xl px-6 py-3 mb-8">
          <h2 className="text-xl font-bold text-center">APPS</h2>
        </nav>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {externalApps.map((app) => (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <span className="text-3xl">{app.icon}</span>
              <span className="text-sm font-medium text-gray-700 text-center">{app.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
