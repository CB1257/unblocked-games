export const CLOAK_PRESETS = [
  {
    id: 'default',
    name: 'Nexus Arcade (Default)',
    title: 'Nexus Unblocked - Web Arcade',
    favicon: '/favicon.ico',
  },
  {
    id: 'classroom',
    name: 'Google Classroom',
    title: 'Home - Classroom',
    favicon: 'https://ssl.gstatic.com/classroom/favicon.png',
  },
  {
    id: 'drive',
    name: 'Google Drive',
    title: 'My Drive - Google Drive',
    favicon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png',
  },
  {
    id: 'docs',
    name: 'Google Docs',
    title: 'Untitled document - Google Docs',
    favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico',
  },
  {
    id: 'canvas',
    name: 'Canvas LMS',
    title: 'Dashboard - Canvas',
    favicon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico',
  },
  {
    id: 'desmos',
    name: 'Desmos Graphing Calculator',
    title: 'Desmos | Graphing Calculator',
    favicon: 'https://www.desmos.com/favicon.ico',
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    title: 'Wikipedia, the free encyclopedia',
    favicon: 'https://en.wikipedia.org/static/favicon/wikipedia.ico',
  },
];

export function applyCloak(option) {
  if (!option) return;
  document.title = option.title;

  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = option.favicon;

  try {
    localStorage.setItem('nexus_cloak_id', option.id);
  } catch (e) {
    // ignore
  }
}

export function openAboutBlankGame(iframeSrc, title) {
  try {
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert('Pop-up was blocked. Please allow popups for this site.');
      return;
    }

    const doc = win.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { width: 100%; height: 100%; overflow: hidden; background: #000; }
          iframe { width: 100%; height: 100%; border: none; display: block; }
        </style>
      </head>
      <body>
        <iframe src="${iframeSrc}" allowfullscreen allow="autoplay; fullscreen; gamepad; clipboard-write; microphone"></iframe>
      </body>
      </html>
    `);
    doc.close();
  } catch (err) {
    console.error('Failed to open about:blank window:', err);
    window.open(iframeSrc, '_blank');
  }
}
