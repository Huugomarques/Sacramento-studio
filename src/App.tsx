import { ScrollyCanvas } from "../ScrollyCanvas";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// os servicos aqui... dps trocar essas fts png por wbp q é mais rapido pra carregar
const jobCards = [
  {
    name: "Operai",
    image: "/services/hair.png", // temp img
  },
  {
    name: "Ufficio",
    image: "/services/barber.png",
  },
  {
    name: "Magazzino",
    image: "/services/beauty.png",
  },
  {
    name: "Servizi",
    image: "/services/wellness.png",
  },
];

// msm coisa das imagens de cima, converter dps
const aboutImages = [
  {
    src: "/quem-somos/quem-somos-1.png",
    alt: "Atendimento de beleza no studio",
  },
  {
    src: "/quem-somos/quem-somos-2.png",
    alt: "Profissional cuidando do cabelo da cliente",
  },
  {
    src: "/quem-somos/quem-somos-3.png",
    alt: "Procedimento detalhado nas maos",
  },
];

export function App() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [aboutIndex, setAboutIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % jobCards.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setAboutIndex((currentIndex) => (currentIndex + 1) % aboutImages.length);
    }, 3600);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
      <ScrollyCanvas />

      <section className="relative z-20 overflow-hidden bg-[#040507] px-4 pb-20 pt-14 text-white sm:px-8 sm:pb-24 sm:pt-20">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-10 text-center sm:mb-14"
          >
            <div className="mx-auto flex max-w-lg items-center justify-center gap-5 text-[#a78bfa]">
              <span className="h-px w-10 bg-[#a78bfa] sm:w-16" />
              <p className="text-xs font-semibold uppercase tracking-[0.32em]">I Nostri Brand</p>
              <span className="h-px w-10 bg-[#a78bfa] sm:w-16" />
            </div>

            <p className="mx-auto mt-5 max-w-4xl text-xl font-light italic text-white/88 sm:text-[2rem]">
              "La differenza tra il normale e lo straordinario e quel piccolo extra."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="service-carousel-stage"
            aria-label="Carrossel de vagas"
          >
            {jobCards.map((card, index) => {
              const isActive = index === activeIndex;
              const isPrevious = index === (activeIndex - 1 + jobCards.length) % jobCards.length;
              const isNext = index === (activeIndex + 1) % jobCards.length;

              const tileClassName = [
                "service-tile",
                isActive ? "service-tile--featured service-tile--center" : "service-tile--back",
                isPrevious ? "service-tile--left" : "",
                isNext ? "service-tile--right" : "",
                !isActive && !isPrevious && !isNext ? "service-tile--hidden" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <article key={card.name} className={tileClassName}>
                  <img src={card.image} alt={card.name} className="service-tile-image" loading="lazy" />
                </article>
              );
            })}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="service-carousel-dots" 
            aria-label="Navegação do carrossel"
          >
            {jobCards.map((card, index) => (
              <button
                key={card.name}
                type="button"
                className={index === activeIndex ? "service-carousel-dot service-carousel-dot--active" : "service-carousel-dot"}
                onClick={() => setActiveIndex(index)}
                aria-label={`Mostrar ${card.name}`}
                data-active={index === activeIndex ? "true" : "false"}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section id="chi-siamo" className="about-section-bg relative z-20 overflow-hidden text-[#f4efff]">
        <div className="mx-auto grid min-h-[760px] w-full max-w-[1280px] grid-cols-1 lg:grid-cols-[1fr_1fr]">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center px-7 py-14 sm:px-12 lg:px-16"
          >
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ddd8ea]">Chi Siamo</p>
              <h2 className="mt-5 text-5xl font-semibold leading-[0.98] text-white sm:text-7xl">Su Sacramento</h2>
              <p className="mt-7 max-w-[24ch] text-xl leading-relaxed text-[#f4efff]/90 sm:text-[2rem] sm:leading-[1.36]">
                L'azienda si basa su un modello di esperienza efficiente e scalabile che unisce un servizio premium a risultati
                crescenti e a un alto livello di soddisfazione.
              </p>

              <a
                href="https://wa.me/393247481457"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center rounded-full bg-[#7f58d1] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_16px_34px_-18px_rgba(6,2,16,0.9)] transition hover:bg-[#6f45c5]"
              >
                Contatta su WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex min-h-[640px] flex-col items-center justify-center gap-4 px-6 py-10 sm:min-h-[700px] sm:px-10 sm:py-12"
          >
            <div className="relative h-[500px] w-[82%] overflow-hidden rounded-[1.8rem] shadow-[0_28px_56px_-28px_rgba(44,18,71,0.6)] sm:h-[560px]">
              {aboutImages.map((image, index) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  className={
                    index === aboutIndex
                      ? "absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-500"
                      : "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500"
                  }
                />
              ))}
            </div>

            <div className="flex items-center gap-2" aria-label="Navegacao das fotos de quem somos">
              {aboutImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setAboutIndex(index)}
                  className={
                    index === aboutIndex
                      ? "h-2.5 w-7 rounded-full bg-[#f4efff]"
                      : "h-2.5 w-2.5 rounded-full bg-[#f4efff]/45"
                  }
                  aria-label={`Mostrar foto ${index + 1}`}
                />
              ))}
            </div>

          </motion.div>
        </div>

      </section>

      <motion.footer 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 border-t border-white/5 bg-[#020204] px-6 py-12 font-light text-[#8f8f9d] sm:px-10 sm:py-16 lg:px-16 lg:py-20"
      >
        <div className="mx-auto w-full max-w-[1240px]">
          <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1.5fr]">
            <div className="flex flex-col items-start">
              <img src="/logo.svg" alt="Sacramento Studio" className="h-9 w-auto sm:h-10" />
              <p className="mt-6 max-w-[28ch] text-[0.9rem] leading-relaxed text-[#8f8f9d]">
                Studio dedicato all'eccellenza nell'immagine personale, con un servizio premium e risultati costanti.
              </p>

              <div className="mt-8 flex items-center gap-5">
                <a
                  href="https://www.instagram.com/sacramentostudiohs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-[#8f8f9d] transition duration-300 hover:-translate-y-0.5 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@sacramentostudiohs"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="text-[#8f8f9d] transition duration-300 hover:-translate-y-0.5 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M15.8 3c.4 1.4 1.2 2.4 2.7 2.9v2.5c-1 0-1.8-.2-2.6-.6v6.6c0 2.8-2 4.9-5 4.9-2.7 0-4.8-2-4.8-4.7 0-3 2.3-4.9 5.4-4.8v2.6c-1.5-.1-2.8.6-2.8 2.2 0 1.4 1.1 2.2 2.3 2.2 1.3 0 2.2-.9 2.2-2.5V3h2.6Z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/393247481457"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="text-[#8f8f9d] transition duration-300 hover:-translate-y-0.5 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M20 11.8A8 8 0 0 1 8.4 19l-3.4.9.9-3.3A8 8 0 1 1 20 11.8Zm-4.7 1.7c-.2-.1-1.2-.6-1.4-.7-.2-.1-.4-.1-.5.1l-.4.7c-.1.2-.3.2-.4.1-.2-.1-.8-.3-1.4-.9-.6-.5-1-1.2-1.4-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.3.1-.1 0-.3 0-.4l-.6-1.4c-.2-.4-.3-.3-.5-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.3c.1.2 1.5 2.3 3.6 3.1.5.2 1 .4 1.4.5.6.2 1.1.1 1.5.1.5-.1 1.2-.5 1.4-1 .2-.6.2-1 .1-1.1 0-.2-.2-.2-.4-.3Z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[#d5d5d5]">Azienda</p>
              <ul className="mt-6 flex flex-col gap-3 text-[0.88rem] text-[#8f8f9d]">
                <li><a href="#chi-siamo" className="transition hover:text-white">Chi siamo</a></li>
                <li><a href="mailto:sacramentostudiohs@gmail.com" className="transition hover:text-white">Email</a></li>
                <li><a href="https://wa.me/393247481457" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">WhatsApp</a></li>
              </ul>
            </div>

            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[#d5d5d5]">Supporto</p>
              <ul className="mt-6 flex flex-col gap-3 text-[0.88rem] text-[#8f8f9d]">
                <li><a href="mailto:sacramentostudiohs@gmail.com" className="transition hover:text-white">Contatti</a></li>
                <li><a href="https://www.instagram.com/sacramentostudiohs/" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">Instagram</a></li>
                <li><a href="https://www.tiktok.com/@sacramentostudiohs" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">TikTok</a></li>
              </ul>
            </div>

            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[#d5d5d5]">Sede</p>
              <address className="mt-6 not-italic">
                <p className="text-[0.88rem] leading-[1.6] text-[#8f8f9d]">
                  Via Adriatica 156<br />
                  Osimo Stazione<br />
                  Italia
                </p>
                <div className="mt-4 break-all text-[0.88rem] text-[#8f8f9d]">
                  <a href="mailto:sacramentostudiohs@gmail.com" className="transition hover:text-white">sacramentostudiohs@gmail.com</a>
                </div>
              </address>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 text-[0.8rem] text-[#6b6b78] sm:flex-row">
            <p>© 2026 Sacramento Studio. Tutti i diritti riservati.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <p>
                Sviluppato da <a href="https://www.instagram.com/marqueshuugo/" target="_blank" rel="noopener noreferrer" className="font-medium text-white transition hover:text-[#a78bfa] hover:underline">Hugo Marques</a>
              </p>
            </div>
          </div>
        </div>
      </motion.footer>
    </>
  );
}