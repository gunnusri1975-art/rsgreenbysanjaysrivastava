import mainAvenueImg from '../assets/images/rs-green-city-main-avenue.jpg';
import wideRccRoadImg from '../assets/images/rs-green-city-wide-rcc-road.jpg';
import paverWaterTankImg from '../assets/images/rs-green-city-paver-road-water-tank.jpg';
import cornerPlotsImg from '../assets/images/rs-green-city-corner-plots-electricity.jpg';
import drainageAvenueImg from '../assets/images/rs-green-city-drainage-avenue-palms.jpg';
import internalRoadImg from '../assets/images/rs-green-city-internal-road-development.jpg';
import surroundingViewImg from '../assets/images/rs-green-city-surrounding-view-road.jpg';
import boundaryWallImg from '../assets/images/rs-green-city-boundary-wall-panorama.jpg';
import advisorPortraitImg from '../assets/images/sanjay-srivastava-senior-advisor.jpg';
import masterLayoutImg from '../assets/images/rs-green-city-master-layout.png';
import phase1LayoutImg from '../assets/images/rs-green-city-phase1-layout.png';
import rsBlockLayoutImg from '../assets/images/rs-green-city-rs-block-layout.png';
import rs1Phase1LayoutImg from '../assets/images/rs-green-city-rs1-phase1-layout.png';
import dBlockLayoutImg from '../assets/images/rs-green-city-d-block-layout.png';

export const HERO_IMAGE = {
  src: mainAvenueImg,
  alt: 'Wide RCC main avenue leading toward the entrance gate at RS GREEN CITY, Kanpur',
};

export const OVERVIEW_IMAGES = {
  primary: {
    src: wideRccRoadImg,
    alt: 'Wide RCC road with interlocking paver shoulders and planted trees at RS GREEN CITY',
  },
  secondary: {
    src: paverWaterTankImg,
    alt: 'Interlocking paved avenue, greenery, and overhead water tank at RS GREEN CITY',
  },
  tertiary: {
    src: cornerPlotsImg,
    alt: 'Open residential plot blocks beside paved RCC road and electricity poles at RS GREEN CITY',
  },
};

export const ADVISOR_IMAGE = {
  src: advisorPortraitImg,
  alt: 'Sanjay Srivastava, Senior Advisor for RS GREEN CITY',
};

export const SITE_VIDEO = {
  src: `${import.meta.env.BASE_URL}videos/rs-green-city-highway-walkthrough.mp4`,
  poster: mainAvenueImg,
  durationLabel: '1 min 44 sec',
  chapters: [
    {
      time: '0:00 – 0:12',
      title: 'Direct Turn from Naubasta–Hamirpur Highway',
      detail: 'Shows live highway traffic turning directly onto the project approach road.',
    },
    {
      time: '0:13 – 0:31',
      title: 'Approach Road to Main Entrance Gate',
      detail: 'Wide approach avenue lined with boundary walls leading straight to the gate.',
    },
    {
      time: '0:32 – 1:44',
      title: 'Internal RCC Roads & Site Development',
      detail: 'Walkthrough of laid RCC roads, drainage, water tank, electricity poles, and ongoing construction.',
    },
  ],
} as const;

export interface LayoutPlanItem {
  id: 'master' | 'rs-block' | 'rs1-phase1' | 'phase1' | 'd-block';
  tabLabel: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  pdfHref?: string;
  alt: string;
}

export const LAYOUT_PLANS: readonly LayoutPlanItem[] = [
  {
    id: 'master',
    tabLabel: 'Master Layout Plan',
    title: 'Complete Township Master Plan',
    subtitle: 'Shows highway frontage, main roads (40 ft, 30 ft, 25 ft & 23 ft), parks, and Blocks A to G',
    imageSrc: masterLayoutImg,
    pdfHref: `${import.meta.env.BASE_URL}maps/rs-green-city-master-layout.pdf`,
    alt: 'RS GREEN CITY Master Site Layout Map showing Hamirpur Road entrance, road widths, parks, and plot blocks',
  },
  {
    id: 'rs-block',
    tabLabel: 'RS Block Plan',
    title: 'RS Block Layout & Route Plan',
    subtitle: 'Kanpur–Hamirpur Highway frontage, 80/40/30/25/22 ft road network, plot area tables, and corridor route guide',
    imageSrc: rsBlockLayoutImg,
    pdfHref: `${import.meta.env.BASE_URL}maps/rs-green-city-rs-block.pdf`,
    alt: 'RS GREEN CITY RS Block layout map with highway frontage, road widths, and corridor route guide',
  },
  {
    id: 'rs1-phase1',
    tabLabel: 'RS1 Block (Phase 1)',
    title: 'RS1 Block — Phase 1 Layout Plan',
    subtitle: 'Hamirpur Highway frontage, 40 ft, 30 ft, 25 ft & 23 ft roads, and full plot area statement (RS1-1 to RS1-285)',
    imageSrc: rs1Phase1LayoutImg,
    pdfHref: `${import.meta.env.BASE_URL}maps/rs-green-city-rs1-phase1.pdf`,
    alt: 'RS GREEN CITY RS1 Block Phase 1 layout plan along Hamirpur Highway with plot area statement',
  },
  {
    id: 'phase1',
    tabLabel: 'Blocks A–D Plan',
    title: 'Blocks A–D & Area Statement Plan',
    subtitle: 'Detailed plot dimensions and individual square-yard area tables for Blocks A, B, C, and D',
    imageSrc: phase1LayoutImg,
    pdfHref: `${import.meta.env.BASE_URL}maps/rs-green-city-phase1-layout.pdf`,
    alt: 'RS GREEN CITY Blocks A to D layout plan with plot dimensions and square yard area statements',
  },
  {
    id: 'd-block',
    tabLabel: 'D-Block Layout',
    title: 'D-Block Detailed Plot Plan',
    subtitle: 'Individual plot numbering (D-1 to D-264), dimensions, 40/30/27/25/20 ft roads, and directional compass',
    imageSrc: dBlockLayoutImg,
    alt: 'RS GREEN CITY D-Block detailed layout plan showing plots D-1 to D-264 and internal roads',
  },
];

export interface OverviewMetric {
  label: string;
  value: string;
}

export const OVERVIEW_METRICS: readonly OverviewMetric[] = [
  { label: 'Plot Sizes', value: '50 – 1,200 Sq. Yards' },
  { label: 'Internal Roads', value: '40 ft, 30 ft, 25 ft & 22 ft RCC' },
  { label: 'Development Type', value: 'Gated Community' },
  { label: 'Location', value: 'Naubasta–Hamirpur Highway' },
];

export interface FeatureGroup {
  heading: string;
  items: readonly { title: string; detail: string }[];
}

export const FEATURE_GROUPS: readonly FeatureGroup[] = [
  {
    heading: 'Plot Sizes & Road Network',
    items: [
      {
        title: 'Residential Plots (50 to 1,200 Sq. Yards)',
        detail: 'Multiple plot sizes available across planned residential blocks.',
      },
      {
        title: 'Wide RCC Roads',
        detail: 'Completed internal RCC roads in 40 ft, 30 ft, 25 ft, and 22 ft road widths.',
      },
    ],
  },
  {
    heading: 'Essential Civic Infrastructure',
    items: [
      {
        title: 'Electricity Supply',
        detail: 'Overhead electric poles and power lines installed along internal roads.',
      },
      {
        title: 'Water Supply & Drinking Water',
        detail: 'Dedicated water tank and water supply provision for the community.',
      },
      {
        title: 'Sewer System & Drainage',
        detail: 'Planned sewer network and roadside drainage facilities.',
      },
    ],
  },
  {
    heading: 'Inside Society Facilities & Security',
    items: [
      {
        title: 'Gated Community & Boundary Wall',
        detail: 'Enclosed perimeter boundary wall with gated entry and security guard.',
      },
      {
        title: 'Park & Green Surroundings',
        detail: 'Dedicated park spaces and roadside tree plantations throughout the site.',
      },
      {
        title: 'In-Society School, Hospital & Water Park',
        detail: 'School, hospital, and family water park facilities planned inside the residential society.',
      },
    ],
  },
  {
    heading: 'Located in New Greater Kanpur · Nearby Access',
    items: [
      {
        title: 'Education & Healthcare Nearby',
        detail: 'Inter College, Degree College, Academic College, and nearby Hospital along the corridor.',
      },
      {
        title: 'Major Connectivity & Hubs',
        detail: 'Direct reach to Ring Road, Express Highway, Defence Corridor, Leather Cluster, and Local Market.',
      },
    ],
  },
];

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  {
    id: 'main-avenue',
    src: mainAvenueImg,
    alt: 'Wide RCC main avenue leading toward the entrance gate at RS GREEN CITY',
    caption: 'Main RCC avenue with roadside trees and boundary walls',
    category: 'Main Avenue',
  },
  {
    id: 'wide-rcc-road',
    src: wideRccRoadImg,
    alt: 'Straight wide RCC road with interlocking paver shoulders and planted trees at RS GREEN CITY',
    caption: 'Wide RCC road with interlocking paver shoulders and electric poles',
    category: 'Site Roads',
  },
  {
    id: 'paver-water-tank',
    src: paverWaterTankImg,
    alt: 'Interlocking paved road, avenue trees, and overhead water tank at RS GREEN CITY',
    caption: 'Interlocking paved street and overhead water tank',
    category: 'Infrastructure',
  },
  {
    id: 'corner-plots',
    src: cornerPlotsImg,
    alt: 'Open residential plot zones alongside paved RCC road and electricity poles at RS GREEN CITY',
    caption: 'Residential plot blocks along paved roads and power lines',
    category: 'Residential Plots',
  },
  {
    id: 'drainage-avenue',
    src: drainageAvenueImg,
    alt: 'Wide internal road showing sewer and drainage manhole cover with palm planters',
    caption: 'Internal street with drainage manhole and roadside planters',
    category: 'Drainage & Sewer',
  },
  {
    id: 'internal-road-dev',
    src: internalRoadImg,
    alt: 'Internal road development and site maintenance at RS GREEN CITY',
    caption: 'Internal residential road and ongoing site maintenance',
    category: 'Site Progress',
  },
  {
    id: 'surrounding-view',
    src: surroundingViewImg,
    alt: 'Wide internal street view showing surrounding residential neighborhood and trees',
    caption: 'Open street perspective with surrounding greenery',
    category: 'Surroundings',
  },
  {
    id: 'boundary-panorama',
    src: boundaryWallImg,
    alt: 'Panoramic view of enclosed boundary wall and curbed plot area at RS GREEN CITY',
    caption: 'Perimeter boundary wall and curbed plot demarcation',
    category: 'Gated Layout',
  },
];
