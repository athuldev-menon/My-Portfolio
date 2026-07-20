import { Link } from 'react-router-dom';

export default function Contact() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0C0C0C] font-['Kanit'] px-6 relative overflow-hidden">

            {/* Cool background glow effect to match your theme */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B600A8] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

            <div className="z-10 flex flex-col items-center text-center">
                <h1
                    className="font-black uppercase tracking-tight text-[clamp(3rem,10vw,120px)] mb-6"
                    style={{
                        background: 'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    Let's Connect
                </h1>

                <p className="text-xl md:text-2xl font-light tracking-wide mb-12 text-[#D7E2EA] opacity-70 max-w-lg">
                    Interested in working together, or just want to say hi? My inbox is always open.
                </p>


                <a
                    href="tel:+919188702001"
                    className="text-2xl sm:text-4xl md:text-5xl font-medium mb-12 hover:scale-105 transition-all duration-300 drop-shadow-lg underline decoration-2 underline-offset-8 hover:opacity-80"
                    style={{ color: '#B600A8' }}
                >
                    +91 9188702001
                </a>

                {/* --- NEW SOCIAL ICONS ROW --- */}
                <div className="flex justify-center gap-8 items-center mb-16">

                    {/* Gmail */}
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=athuldev4721@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform duration-300"
                    >
                        <img src="/gmail.png" alt="Gmail" className="w-10 h-10 opacity-70 hover:opacity-100 transition-opacity" />
                    </a>


                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/919188702001"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform duration-300"
                    >
                        <img src="/whatsapp.png" alt="WhatsApp" className="w-10 h-10 opacity-70 hover:opacity-100 transition-opacity" />
                    </a>



                    {/* GitHub */}
                    <a
                        href="https://github.com/athuldev-menon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform duration-300"
                    >
                        <img src="/github.png" alt="GitHub" className="w-10 h-10 opacity-70 hover:opacity-100 transition-opacity" />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://linkedin.com/in/athuldev-menon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform duration-300"
                    >
                        <img src="/linkedin.png" alt="LinkedIn" className="w-10 h-10 opacity-70 hover:opacity-100 transition-opacity" />
                    </a>

                </div>
                {/* --------------------------- */}

                <Link
                    to="/"
                    className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-10 py-4 hover:bg-[#D7E2EA]/10 transition-colors duration-300"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}