import { FaFacebook, FaInstagram, FaSpotify } from 'react-icons/fa/index.js';

import type { IconType } from 'react-icons';

interface Social {
  name: string;
  href: string;
  Icon: IconType;
}

export const socials: Social[] = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/thisisloupe',
    Icon: FaFacebook,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/thisisloupe/',
    Icon: FaInstagram,
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/23n2oObsIrvqtcOVwhyT3o?si=j-sz9MnoSEeFyQDzpJa7Gw',
    Icon: FaSpotify,
  },
];
