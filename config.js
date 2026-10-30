/*
  THE MOMENT — PERSONALIZATION FILE
  Edit this file to create a new greeting.
  Keep image/audio files inside /assets and use paths like "assets/photo-01.jpg".
  Use plain text in strings. For multiple paragraphs, separate them with \n\n.
*/
window.THE_MOMENT_CONFIG = {
  type: "birthday", // birthday | anniversary | graduation | friendship | appreciation | apology | custom
  language: "en",
  sender: "Alex",
  recipient: "Someone Special",
  dateLabel: "A day to remember · 2026",
  theme: "warm", // warm | romantic | graduation | friendship | minimal
  opening: {
    subtitle: "Some things deserve more than a message."
  },
  letter: {
    date: "A LITTLE NOTE",
    title: "Dear you,",
    paragraphs: [
      "Today is a good reminder to celebrate you — not just for what you have done, but for the person you are.",
      "I made this little space because some feelings deserve a little more room. I hope every page reminds you that you are appreciated, celebrated, and cared for."
    ],
    signoff: "With love,"
  },
  memories: [
    {
      date: "THE BEGINNING",
      title: "Where it all started",
      description: "Every meaningful story has a first page. This was ours.",
      image: "assets/memory-01.jpg",
      imageAlt: "A special memory",
      layout: "large"
    },
    {
      date: "A LITTLE LATER",
      title: "The kind of day you keep",
      description: "Nothing extraordinary had to happen. Somehow, it became one of those moments worth keeping.",
      image: "assets/memory-02.jpg",
      imageAlt: "Another special memory",
      layout: "small"
    },
    {
      date: "ONE MORE MEMORY",
      title: "And all the little things",
      description: "The laughter, the unexpected turns, and everything in between. They all matter.",
      image: "assets/memory-03.jpg",
      imageAlt: "A meaningful moment",
      layout: "large"
    }
  ],
  unsaid: {
    paragraphs: [
      "I hope you know how much the little things about you matter. The way you keep going, the way you make ordinary moments feel lighter, and the way you leave a good mark on the people around you.",
      "Thank you for being part of this chapter. Not every meaningful thing needs a grand explanation. Sometimes, simply having you here is already something worth being grateful for."
    ],
    voice: "", // Example: "assets/voice-note.mp3"
    voiceCaption: "Press play when you're ready.",
    secret: "If you remember only one thing from this little website, let it be this: you matter more than you know."
  },
  wishes: [
    "May you find reasons to smile, even on the ordinary days.",
    "May the things you work hard for find their way to you.",
    "May you always have people who remind you that you are never alone.",
    "And may you never forget how far you have already come."
  ],
  countdown: {
    enabled: false,
    target: "2026-12-25T00:00:00", // Local date/time
    caption: "A day worth celebrating."
  },
  final: {
    title: "Some moments stay forever.",
    message: "No matter where life takes us, I hope you remember how much this moment means.",
    image: "assets/final-memory.jpg",
    imageAlt: "A final memory"
  },
  music: {
    background: "", // Example: "assets/background.mp3"
    voice: "" // Optional fallback voice file
  },
  features: {
    confetti: true,
    downloadLetter: true,
    hiddenMessage: true
  }
};