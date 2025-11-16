// src/constants/riderImages.ts

import { COLORS } from './colors'; 

const MarcMarquez = require('../assets/images/Marc.png');
const AlexMarquez = require('../assets/images/Alex.png');
const PeccoBagnaia = require('../assets/images/Pecco.png');
const MarcoBezzecchi = require('../assets/images/Bezz.png');
const FerminAldeguer = require('../assets/images/Fermin.png');
const FabioQuartararo = require('../assets/images/Fabio.png');
const RaulFernandez = require('../assets/images/Raul.png');
const JohannZarco = require('../assets/images/Zarco.png');

export const DEFAULT_RIDER_DATA = {
  image: MarcMarquez,
  color: COLORS.mediumGray 
};

export const RIDER_DATA_MAP: Record<string, { image: any, color: string }> = {
  'Marc Márquez':     { image: MarcMarquez,     color: COLORS.red },
  'Francesco Bagnaia':{ image: PeccoBagnaia,    color: COLORS.red },
  'Marco Bezzecchi':  { image: MarcoBezzecchi,  color: COLORS.purple },
  'Álex Márquez':     { image: AlexMarquez,     color: COLORS.lightBlue },
  'Fermín Aldeguer':  { image: FerminAldeguer,  color: COLORS.lightBlue },
  'Johann Zarco':     { image: JohannZarco,     color: COLORS.green },
  'Fabio Quartararo': { image: FabioQuartararo, color: COLORS.darkBlue },
  'Raül Fernández':   { image: RaulFernandez,   color: COLORS.lightBlue },
  
  'Jorge Martín':     { image: DEFAULT_RIDER_DATA.image, color: COLORS.primary },
  'Enea Bastianini':  { image: DEFAULT_RIDER_DATA.image, color: COLORS.primary },
  'TBD':              { image: DEFAULT_RIDER_DATA.image, color: COLORS.mediumGray },
};