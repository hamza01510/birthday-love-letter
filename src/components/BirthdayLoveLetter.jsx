import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Get base URL for assets
const baseUrl = import.meta.env.BASE_URL;

// Special Cards Section Component
const SpecialCardsSection = ({ onComplete }) => {
    const [flippedCards, setFlippedCards] = useState({});
    const [discoveredCards, setDiscoveredCards] = useState(new Set());

    const cards = [
        {
            id: 1,
            frontImage: <img src={`${baseUrl}img1.png`} alt="Bow" className="w-24 h-24" />,
            // frontIcon: <img src={`${baseUrl}img1.png`} alt="Hearts" className="w-20 h-20" />,
            message: "Eshuu Meri Billii, Tum Mery Liye Buhat Special Ho. 💖"
        },
        {
            id: 2,
            frontImage: <img src={`${baseUrl}img3.webp`} alt="Hearts" className="w-20 h-20" />,
            // frontIcon: "💌",
            message: "Ye Hamza tum sy buhat payar karta hai, I Love You Alote <3✨"
        },
        {
            id: 3,
            frontImage: <img src={`${baseUrl}img2.jpg`} alt="Hearts" className="w-20 h-20" />,
            // frontIcon: "🕷️",
            message: "Ye Sepcial Gift, Mery sab sy special shaks ka liyee, My Eshuu 💖"
        }
    ];

    const handleCardClick = (cardId) => {
        setFlippedCards(prev => ({
            ...prev,
            [cardId]: !prev[cardId]
        }));

        if (!discoveredCards.has(cardId)) {
            setDiscoveredCards(prev => new Set([...prev, cardId]));
        }
    };

    const progress = (discoveredCards.size / cards.length) * 100;
    const allDiscovered = discoveredCards.size === cards.length;

    const getStatusText = () => {
        if (discoveredCards.size === 0) {
            return "Start by tapping any card above ✨";
        } else if (discoveredCards.size < cards.length) {
            return `${discoveredCards.size} of ${cards.length} messages discovered! Keep exploring 💖`;
        } else {
            return "You've found them all! Click \"Continue\" to read my final letter.";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-200 via-pink-100 to-orange-100"
        >
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }} />

            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 text-5xl opacity-80">🌸</div>
            <div className="absolute top-8 right-8 text-4xl opacity-80">⭐</div>
            <div className="absolute bottom-8 left-8 text-4xl opacity-80">💝</div>
            <div className="absolute bottom-4 right-4 text-5xl opacity-80">🎀</div>

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-pink-600 mb-2" style={{ fontFamily: 'cursive' }}>
                        Some Special Cards For You
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base">
                        Click each card to reveal a special message!
                    </p>
                </motion.div>

                {/* Cards Grid - Now Square Shaped */}
                <div className="w-full max-w-5xl mb-8 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {cards.map((card, index) => (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                className="w-full"
                                style={{ perspective: '1000px' }}
                            >
                                <motion.div
                                    className="relative w-full cursor-pointer"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        paddingBottom: '100%' // Makes it square
                                    }}
                                    animate={{ rotateY: flippedCards[card.id] ? 180 : 0 }}
                                    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                                    onClick={() => handleCardClick(card.id)}
                                >
                                    {/* Front of Card */}
                                    <div
                                        className="absolute inset-0 w-full h-full rounded-3xl shadow-xl flex flex-col items-center justify-center p-6"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            WebkitBackfaceVisibility: 'hidden',
                                            backgroundColor: '#FFFEF0',
                                            border: '4px solid #FFE4B5'
                                        }}
                                    >
                                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                                            <div className="text-7xl md:text-8xl">{card.frontImage}</div>
                                            <div className="text-6xl md:text-7xl">{card.frontIcon}</div>
                                            <div className="text-pink-400 text-base font-bold mt-4">Tap!</div>
                                        </div>
                                    </div>

                                    {/* Back of Card */}
                                    <div
                                        className="absolute inset-0 w-full h-full rounded-3xl shadow-xl flex flex-col items-center justify-between p-6"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            WebkitBackfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)',
                                            backgroundColor: '#FFFFFF',
                                            border: '4px solid #FFE4B5'
                                        }}
                                    >
                                        <div className="flex-1 flex items-center justify-center">
                                            <p className="text-gray-700 text-center text-sm md:text-base leading-relaxed px-2" style={{ fontFamily: 'Georgia, serif' }}>
                                                {card.message}
                                            </p>
                                        </div>
                                        <button
                                            className="mt-4 px-6 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-full text-sm font-semibold shadow-md transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCardClick(card.id);
                                            }}
                                        >
                                            Tap to flip back
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Progress Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="w-full max-w-3xl px-4"
                >
                    <div className="bg-yellow-50 rounded-3xl shadow-xl p-6 md:p-8">
                        {/* Progress Bar */}
                        <div className="mb-4">
                            <div className="w-full h-4 bg-pink-200 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-pink-400 to-pink-600"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                />
                            </div>
                        </div>

                        {/* Status Text */}
                        <motion.p
                            key={discoveredCards.size}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center text-gray-700 text-sm md:text-base font-medium mb-4"
                        >
                            {getStatusText()}
                        </motion.p>

                        {/* Continue Button */}
                        <AnimatePresence>
                            {allDiscovered && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onComplete}
                                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-full shadow-lg transition-all"
                                >
                                    Continue to Final Letter 💌
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

// Main App Component
function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const [showConfetti, setShowConfetti] = useState(false);

    const nextPage = () => setCurrentPage(prev => prev + 1);
    const restart = () => {
        setCurrentPage(1);
        setShowConfetti(false);
    };

    const triggerConfetti = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
    };

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-200 via-pink-100 to-orange-100">
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }} />

            {/* Confetti */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none z-50">
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-2xl"
                            initial={{
                                top: '50%',
                                left: '50%',
                                opacity: 1
                            }}
                            animate={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                opacity: 0,
                                rotate: Math.random() * 360
                            }}
                            transition={{ duration: 2, ease: 'easeOut' }}
                        >
                            {['💖', '💝', '💕', '🌸', '✨'][Math.floor(Math.random() * 5)]}
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Decorative Stickers */}
            <div className="absolute top-4 left-4 text-6xl opacity-80 z-0">🌸</div>
            <div className="absolute top-8 right-8 text-5xl opacity-80 z-0">⭐</div>
            <div className="absolute bottom-8 left-8 text-5xl opacity-80 z-0">💝</div>
            <div className="absolute bottom-4 right-4 text-6xl opacity-80 z-0">🎀</div>

            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <AnimatePresence mode="wait">
                    {/* Page 1: The Hook */}
                    {currentPage === 1 && (
                        <motion.div
                            key="page1"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.8 }}
                            className="w-full max-w-md"
                        >
                            <div className="bg-yellow-50 rounded-3xl shadow-2xl p-8 relative">
                                <div className="absolute -top-6 -right-6 text-6xl">🐱</div>
                                <div className="text-center mb-6">
                                    <div className="inline-block bg-pink-100 rounded-full px-4 py-1 mb-4">
                                        <p className="text-sm text-pink-600">A Note for You 💌</p>
                                    </div>
                                </div>

                                <h1 className="text-4xl font-bold text-center mb-6" style={{ fontFamily: 'cursive' }}>
                                    Hey Eshuu Meri Billi 💖
                                </h1>

                                <p className="text-center text-gray-700 mb-4">
                                    I wanted to do something special on your birthday, so I made something special just for you 💖
                                </p>

                                <p className="text-center text-pink-500 font-semibold mb-6">
                                    Click below to see what it is! ✨
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    onClick={nextPage}
                                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 px-6 rounded-full shadow-lg"
                                >
                                    Open My Heart 💕
                                </motion.button>

                                <div className="absolute -bottom-4 -left-4 text-5xl">🐾</div>
                                <p className="text-center text-xs text-gray-500 mt-6" style={{ fontFamily: 'cursive' }}>
                                    Made with love, only for you 💕
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Page 2: The Envelope */}
                    {currentPage === 2 && (
                        <motion.div
                            key="page2"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.8 }}
                            className="w-full max-w-md"
                        >
                            <div className="flex flex-col items-center">
                                <motion.div
                                    className="relative cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    onClick={nextPage}
                                >
                                    {/* Envelope */}
                                    <svg width="300" height="200" viewBox="0 0 300 200" className="drop-shadow-2xl">
                                        {/* Envelope Body */}
                                        <rect x="30" y="60" width="240" height="140" fill="#FFB6C1" rx="5" />

                                        {/* Envelope Flap */}
                                        <motion.path
                                            d="M 30 60 L 150 140 L 270 60"
                                            fill="#FF69B4"
                                            initial={{ rotateX: 0 }}
                                            animate={{ rotateX: 0 }}
                                            whileHover={{ rotateX: -30 }}
                                            style={{ transformOrigin: '150px 60px' }}
                                        />

                                        {/* Envelope Lines */}
                                        <line x1="30" y1="60" x2="150" y2="140" stroke="#FF1493" strokeWidth="2" />
                                        <line x1="270" y1="60" x2="150" y2="140" stroke="#FF1493" strokeWidth="2" />

                                        {/* Heart Seal */}
                                        <circle cx="150" cy="60" r="20" fill="#FF1493" />
                                        <text x="150" y="68" fontSize="20" textAnchor="middle" fill="white">💖</text>
                                    </svg>

                                    <motion.p
                                        className="text-center mt-6 text-gray-700 font-semibold"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    >
                                        Click to open the envelope ✨
                                    </motion.p>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {/* Page 3: Main Letter */}
                    {currentPage === 3 && (
                        <motion.div
                            key="page3"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.8 }}
                            className="w-full max-w-2xl"
                        >
                            <div className="bg-yellow-50 rounded-3xl shadow-2xl p-8 max-h-[80vh] overflow-y-auto relative">
                                <div className="absolute -top-4 -right-4 text-6xl">😺</div>

                                <div className="text-center mb-6">
                                    <h2 className="text-pink-500 text-xl font-semibold mb-1" style={{ fontFamily: 'cursive' }}>
                                        A Love Letter 💌
                                    </h2>
                                    <p className="text-sm text-gray-500">From my heart to yours</p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-inner mb-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white mr-3">
                                            💖
                                        </div>
                                        <h3 className="font-bold text-lg">My Sweetest Love</h3>
                                    </div>

                                    <div className="space-y-4 text-gray-700" style={{ fontFamily: 'Georgia, serif' }}>
                                        <p>
                                            My dearest love, Every moment with you feels like a beautiful dream that I never want to wake up from. I want you to know that you are the most precious person in my life. Every day with you is a gift, and I'm grateful for every second we share together. You make me want to be the best version of myself.
                                        </p>

                                        <p>
                                            Your smile lights up my world in ways words cannot express. Your laughter is my favorite melody, and your presence brings me a peace I've never known before. Through every high and low, you've been my constant, my anchor, my home.
                                        </p>

                                        <p>
                                            I promise to cherish you today, tomorrow, and always. To support your dreams, celebrate your victories, and stand by you through challenges. You deserve all the happiness in the world, and I'll spend my life trying to give you just that.
                                        </p>

                                        <p className="text-pink-600 italic">
                                            With all my love, Always yours 💕
                                        </p>
                                    </div>

                                    <div className="mt-6 flex justify-center">
                                        <div className="w-16 h-16 rounded-full border-4 border-pink-300 flex items-center justify-center">
                                            <span className="text-2xl">💝</span>
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={nextPage}
                                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 px-6 rounded-full shadow-lg"
                                >
                                    Continue To See More ✨
                                </motion.button>

                                <div className="absolute -bottom-3 -left-3 text-4xl">💕</div>
                            </div>
                        </motion.div>
                    )}

                    {/* Page 4: Special Cards Section - NOW SECOND LAST PAGE */}
                    {currentPage === 4 && (
                        <SpecialCardsSection key="cards" onComplete={nextPage} />
                    )}

                    {/* Page 5: Final Letter - LAST PAGE */}
                    {currentPage === 5 && (
                        <motion.div
                            key="page5"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.8 }}
                            className="w-full max-w-md"
                        >
                            <div className="bg-yellow-50 rounded-3xl shadow-2xl p-8 relative">
                                <div className="absolute -top-4 -right-4 text-6xl">😻</div>

                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white mr-3">
                                        💌
                                    </div>
                                    <h2 className="text-2xl font-bold">Final Love Letter</h2>
                                </div>

                                <div className="space-y-4 mb-8" style={{ fontFamily: 'cursive' }}>
                                    <p className="font-semibold text-gray-800">My sweetest darling,</p>

                                    <p className="text-gray-700 italic">
                                        You're the calm I reach for and the laugh that brightens my day.
                                    </p>

                                    <p className="text-blue-500">
                                        I hope this tiny world made you smile — and whispered how much you mean to me.
                                    </p>

                                    <p className="text-gray-700">
                                        I'll keep making memories, big and small, always with you.
                                    </p>

                                    <p className="text-pink-600 font-semibold" style={{ fontFamily: 'cursive' }}>
                                        Forever yours, in every little universe.
                                    </p>
                                </div>


                                <div className="flex gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={triggerConfetti}
                                        className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-4 rounded-full shadow-lg"
                                    >
                                        Click For Cherish Flowers ✨
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={restart}
                                        className="flex-1 bg-teal-400 hover:bg-teal-500 text-white font-semibold py-3 px-4 rounded-full shadow-lg"
                                    >
                                        Restart
                                    </motion.button>
                                </div>

                                <div className="absolute -bottom-4 -left-4 text-5xl">⭐</div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default App;