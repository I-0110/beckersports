import ContactForm from "./contactForm";

export default function ContactPageContent() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 bg-chiefs-light dark:bg-chiefs-dark">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/steak.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      <div
        className="
          relative z-20 bg-black/60 backdrop-blur-md
          border border-chiefs-1
          shadow-[0_0_40px_4px_rgba(220,38,38,0.5)]
          p-8 rounded-2xl w-full max-w-lg
        "
      >
        <div className="mb-6">
          <span className="font-nav text-sm font-semibold uppercase tracking-widest text-chiefs-a">
            Get in touch
          </span>
          <h1 className="font-logo text-3xl text-chiefs-a mt-1 mb-2">
            Contact Becker Sports
          </h1>
          <p className="font-post-content text-sm text-chiefs-light">
            Got a story tip, a correction, or a partnership idea? Send it
            our way — we typically reply within 2–3 business days.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}