import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        manCity: resolve(__dirname, 'teams/Manchester_City.html'),
        liverpool: resolve(__dirname, 'teams/Liverpool.html'),
        arsenal: resolve(__dirname, 'teams/Arsenal.html'),
        bournemouth: resolve(__dirname, 'teams/AFC_Bournemouth.html'),
        tottenham: resolve(__dirname, 'teams/Tottenham_Hotspur.html'),
        westHam: resolve(__dirname, 'teams/West_Ham_United.html'),
        astonVilla: resolve(__dirname, 'teams/Aston_Villa.html'),
        leicester: resolve(__dirname, 'teams/Leicester_City.html'),
        newcastle: resolve(__dirname, 'teams/Newcastle_United.html'),
        crystalPalace: resolve(__dirname, 'teams/crystal_palace.html'),
        fulham: resolve(__dirname, 'teams/Fulham.html'),
        brentford: resolve(__dirname, 'teams/Brentford.html'),
        everton: resolve(__dirname, 'teams/Everton.html'),
        southampton: resolve(__dirname, 'teams/Southampton.html'),
        brighton: resolve(__dirname, 'teams/Brighton&Hove_Albion.html'),
        chelsea: resolve(__dirname, 'teams/Chelsea.html'),
        ipswich: resolve(__dirname, 'teams/Ipswich_Town.html'),
        manUnited: resolve(__dirname, 'teams/Manchester_United.html'),
        nottingham: resolve(__dirname, 'teams/Nottingham_Forest.html'),
        wolves: resolve(__dirname, 'teams/Wolverhampton.html'),
      }
    }
  }
});
