import { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/logo.jpg';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  location: { name: string };
  origin: { name: string };
}

const translations = {
  nl: {
    searchPlaceholder: 'Zoek op naam...',
    searchButton: 'Zoekopdracht',
    lightMode: 'Lichtmodus',
    darkMode: 'Donkermodus',
    home: 'Thuis',
    favorites: 'Favorieten',
    language: 'Taal:',
    allStatuses: 'Alle Statussen',
    sortByName: 'Sorteren op Naam',
    sortByStatus: 'Sorteren op Status',
    asc: 'A-Z',
    desc: 'Z-A',
    noCharacters: 'Geen karakters gevonden.',
    noFavorites: 'Geen favorieten toegevoegd.',
    allCharacters: 'Alle Karakters (Pagina',
    myFavoriteCharacters: 'Mijn Favoriete Karakters',
    previous: 'Vorige',
    pageOf: 'Pagina',
    next: 'Volgende',
    status: 'Status',
    species: 'Soort',
    gender: 'Geslacht',
    location: 'Locatie',
    origin: 'Oorsprong',
    // Status vertalingen
    statusAlive: 'Levend',
    statusDead: 'Dood',
    statusUnknown: 'onbekend',
    // Soort vertalingen
    speciesHuman: 'Mens',
    speciesAlien: 'Buitenaards wezen',
    // Geslacht vertalingen
    genderMale: 'Man',
    genderFemale: 'Vrouwelijk',
    genderUnknown: 'onbekend',
    // Locatie en oorsprong vertalingen (specifieke locaties)
    locationAbadango: 'Abadango',
    locationTesticleMonsterDimension: 'Testikel Monster Dimensie',
    locationCitadelOfRicks: 'Citadel van Ricks',
    locationWorldendersLair: 'Wereldender\'s hol',
    locationEarthReplacementDimension: 'Aarde (Vervangingsdimensie)',
    locationEarthC137: 'Aarde (C-137)',
    locationAnatomyPark: 'Anatomiepark',
    locationInterdimensionalCable: 'Interdimensionale kabel',
    originAbadango: 'Abadango',
    originUnknown: 'onbekend',
    // Alt-tekst vertalingen
    logoAlt: 'Rick en Morty Logo',
    characterImageAltPrefix: 'Afbeelding van', // Voor "Afbeelding van [character.name]"
  },
