export default function Contacto() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white/90 to-cyan-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-800 text-center mb-8">
          ¿Preguntas, inquietudes, comentarios?
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-teal-700 font-mono text-sm mb-1">Asunto</label>
              <input type="text" className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500" />
            </div>

            <div>
              <label className="block text-teal-700 font-mono text-sm mb-1">Adjuntar archivos</label>
              <input type="file" multiple className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-teal-500 file:text-white" />
            </div>

            <div>
              <label className="block text-teal-700 font-mono text-sm mb-1">Descripción</label>
              <textarea rows={4} className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500 resize-none" />
            </div>

            <div>
              <label className="block text-teal-700 font-mono text-sm mb-1">Email o número de contacto</label>
              <input type="text" className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500" />
            </div>

            <div className="text-center pt-4">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-bold transition">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-teal-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold font-mono mb-3">Contáctanos</h3>
              <p className="text-cyan-200">Estamos aquí para ayudarte. No dudes en escribirnos.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold font-mono mb-3">Síguenos</h3>
              <ul className="space-y-2">
                <li><a href="https://web.facebook.com/" target="_blank" rel="noreferrer" className="text-cyan-200 hover:text-white transition">Facebook</a></li>
                <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="text-cyan-200 hover:text-white transition">Instagram</a></li>
                <li><a href="https://outlook.live.com/mail/" target="_blank" rel="noreferrer" className="text-cyan-200 hover:text-white transition">Correo</a></li>
                <li><a href="https://chat.whatsapp.com/" target="_blank" rel="noreferrer" className="text-cyan-200 hover:text-white transition">WhatsApp</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-teal-900 py-4 text-center">
          <p className="font-mono">© 2025 Designed by: Onix.dev</p>
        </div>
      </footer>
    </div>
  )
}
