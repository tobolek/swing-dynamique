import React, { useState } from 'react';
import { Volume2, VolumeX, Mail } from 'lucide-react';
import { AudioPlayer } from './components/AudioPlayer';
import { tracks } from './data/tracks';

function App() {
  const [isMuted, setIsMuted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const encode = (data: { [key: string]: string }) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...data
      })
    })
      .then(() => setIsSubmitted(true))
      .catch(error => console.log(error));
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-body">
      {/* Hero Section - Fixed Background */}
      <div className="fixed inset-0 w-full h-screen">
        <img 
          src="./00.jpg"
          alt="Swing dynamique"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Hero Content */}
        <section className="h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-6xl md:text-9xl mb-6 font-display text-accent [text-shadow:_2px_2px_10px_rgb(0_0_0_/_90%)]">
              Swing Dynamique
            </h1>
            <p className="text-gray-200 text-xl md:text-2xl mb-8 max-w-3xl mx-auto [text-shadow:_1px_1px_2px_rgb(0_0_0_/_100%)]">
              Nous sommes un groupe basé à Montréal, animé par une passion commune pour la musique explosive de l'Europe de l'Est et le jazz swing raffiné des années 1930. Notre répertoire varié s'étend des classiques de Django Reinhardt aux ballades, en passant par les rythmes du blues et de la bossa nova, avec des accents empruntés aux musiques traditionnelles.
            </p>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="w-6 h-6 border-2 border-white rounded-full relative">
              <div className="absolute top-1.5 left-1/2 w-0.5 h-3 bg-white -translate-x-1/2 animate-bounce" />
            </div>
          </div>
        </section>

        {/* Scrolling Content */}
        <div className="relative bg-black">
          {/* About Section */}
          <section className="min-h-screen flex items-center justify-center py-24 px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-accent text-xl md:text-2xl italic font-display mb-12">
                Nous sommes disponibles pour des concerts ou des événements spéciaux.
              </p>
              
              {isSubmitted ? (
                <div className="text-accent text-xl">
                  Merci de nous avoir contacté! Nous vous répondrons bientôt.
                </div>
              ) : (
                <form 
                  name="contact"
                  method="post"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="max-w-lg mx-auto space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                  </p>
                  
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-left text-sm text-white/80">Nom</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-left text-sm text-white/80">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-left text-sm text-white/80">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent text-white"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-black transition-colors font-body"
                  >
                    <Mail size={20} />
                    Envoyez
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Gallery Section */}
          <section className="py-24 px-4 overflow-hidden">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                  <img 
                    src="./01.jpg"
                    alt="Image Swing dynamique"
                    className="w-full h-full object-cover hover:scale-110 transition-all duration-700 ease-in-out"
                  />
                </div>
                <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                  <img 
                    src="./02.jpg"
                    alt="Image Swing dynamique"
                    className="w-full h-full object-cover hover:scale-110 transition-all duration-700 ease-in-out"
                  />
                </div>
                <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                  <img 
                    src="./03.jpg"
                    alt="Image Swing dynamique"
                    className="w-full h-full object-cover hover:scale-110 transition-all duration-700 ease-in-out"
                  />
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-8">Photos © Jacques Bure</p>
            </div>
          </section>

          {/* Music Section */}
          <section className="min-h-screen flex items-center py-24 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-display text-center mb-16 text-accent">Notre Musique</h2>
              <div className="space-y-8">
                {tracks.map((track) => (
                  <AudioPlayer
                    key={track.id}
                    track={track}
                    isMuted={isMuted}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 px-4 border-t border-white/10">
            <p className="text-center text-gray-500">© {new Date().getFullYear()} Swing Dynamique. All rights reserved.</p>
          </footer>
        </div>
      </div>

      {/* Global Controls */}
      <div className="fixed bottom-4 right-4 bg-black/80 p-3 rounded-full backdrop-blur-sm z-50">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="text-white/60 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
    </div>
  );
}

export default App;