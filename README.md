# THE MOMENT — Premium Greeting Website

A responsive, animated, single-template greeting experience built with vanilla HTML, CSS and JavaScript. The recipient experience is organized into cinematic chapters with a multi-page feel, while remaining a lightweight static site.

## Quick start

1. Unzip the package.
2. Open `config.js`.
3. Edit the sender, recipient, letter, memories, wishes and final message.
4. Add your own media to the `assets/` folder and update the matching paths in `config.js`.
5. Open `index.html` in a browser, or deploy the folder to Vercel / Netlify.

No build step, package manager or server is required.

## Personalization

All content is controlled from `config.js`:

- `type`: birthday, anniversary, graduation, friendship, appreciation, apology or custom.
- `theme`: warm, romantic, graduation, friendship or minimal.
- `letter.paragraphs`: paragraphs shown in the interactive letter.
- `memories`: add or remove timeline objects. Each can include `date`, `title`, `description`, `image`, `imageAlt`, and `layout`.
- `unsaid.paragraphs`, `unsaid.secret`, `unsaid.voice`: personal notes, hidden message and optional voice recording.
- `wishes`: array of wishes.
- `countdown`: optional countdown; set `enabled: true` and update `target`.
- `final.image`: optional final photograph.
- `music.background`: optional background music file.
- `features`: enable or disable confetti, hidden message and printable letter.

### Suggested media filenames

Place media in `assets/` and reference it using relative paths:

- `memory-01.jpg`, `memory-02.jpg`, `memory-03.jpg`
- `final-memory.jpg`
- `background.mp3`
- `voice-note.mp3`

Use optimized WebP/JPEG images. Keep audio files reasonably compressed. The background music starts only after the visitor presses the sound control, respecting browser autoplay restrictions.

## Deployment

### Vercel
Import the folder/repository and use the **Other** framework preset. No build command and no output directory are required for a static root deployment.

### Netlify
Drag the project folder into Netlify Drop, or connect the repository. Publish directory: `.`

## Included interactions

- Chapter navigation with smooth scrolling and URL hashes
- Animated envelope and letter reveal
- Scroll-triggered reveals and reading progress
- Memory timeline and photo lightbox
- Optional background music and voice note
- Hidden message interaction
- Optional countdown
- Optional celebratory confetti
- Print-to-PDF letter action (uses the browser's print dialog)
- Mobile responsive layout and reduced-motion support

## Important notes before selling

This is a front-end static template. Each buyer's content and media are stored in their own copy of `config.js` and `assets/`. It does not include user accounts, online editing, payment processing, cloud media uploads or automatic link generation. Those would require a separate backend or platform.

The Google Fonts used here are loaded from Google Fonts and require an internet connection. Replace them with properly licensed local fonts if you need fully offline operation.

Only include photos, music, fonts and other media that you own or are licensed to redistribute. The included project contains no stock photos or music; image paths are examples/placeholders for the buyer's own files.

## Suggested commercial packaging

You may package the template with:
- This source code
- A quick-start PDF or setup guide
- A demo configuration
- A blank configuration
- A list of recommended image dimensions and compression settings

Define your own buyer license and support policy before selling. Do not claim exclusive ownership of third-party fonts or services.
