import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Abubakar Siddique - Portfolio',
    short_name: 'Abubakar',
    description: 'Portfolio of Abubakar Siddique - Full Stack MERN Developer',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d0d0d',
    theme_color: '#00d4ff',
    icons: [
      {
        src: '/icon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable'
      }
    ],
  };
}
