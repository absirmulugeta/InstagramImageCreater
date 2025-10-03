import type { LocationData } from '../types';

export const COUNTRIES: LocationData = [
  {
    name: "Australia",
    destinations: [
      { name: "Sydney Opera House", description: "A multi-venue performing arts centre in Sydney." },
      { name: "Uluru (Ayers Rock)", description: "A massive sandstone monolith in the heart of the Northern Territory's arid 'Red Centre'." },
      { name: "Great Barrier Reef", description: "The world's largest coral reef system." },
    ],
  },
  {
    name: "Brazil",
    destinations: [
      { name: "Christ the Redeemer, Rio de Janeiro", description: "An Art Deco statue of Jesus Christ." },
      { name: "Iguazu Falls", description: "A magnificent waterfall system on the border of Brazil and Argentina." },
      { name: "Sugarloaf Mountain", description: "A peak situated in Rio de Janeiro at the mouth of Guanabara Bay." },
    ],
  },
  {
    name: "Canada",
    destinations: [
        { name: "CN Tower, Toronto", description: "A 553.3 m-high concrete communications and observation tower." },
        { name: "Moraine Lake, Banff National Park", description: "A glacially fed lake with a stunning turquoise color." },
        { name: "Niagara Falls", description: "Three large waterfalls on the Niagara River." },
    ],
  },
  {
    name: "China",
    destinations: [
      { name: "The Great Wall of China", description: "A series of fortifications made of stone, brick, tamped earth, wood, and other materials." },
      { name: "The Forbidden City, Beijing", description: "The former Chinese imperial palace from the Ming dynasty to the end of the Qing dynasty." },
      { name: "Terracotta Army, Xi'an", description: "A collection of terracotta sculptures depicting the armies of Qin Shi Huang." },
    ],
  },
  {
    name: "Egypt",
    destinations: [
      { name: "Pyramids of Giza", description: "Ancient tombs of pharaohs." },
      { name: "Temples of Karnak", description: "Vast complex of temples, chapels, and pylons." },
      { name: "Valley of the Kings", description: "Tombs constructed for the Pharaohs." },
      { name: "Abu Simbel", description: "Two massive rock temples on Lake Nasser." },
    ],
  },
  {
    name: "Ethiopia",
    destinations: [
      { name: "Rock-Hewn Churches, Lalibela", description: "A complex of 11 monolithic churches carved out of rock." },
      { name: "Simien Mountains National Park", description: "A stunning mountain range, home to unique wildlife like the Gelada baboon." },
      { name: "Blue Nile Falls", description: "A dramatic waterfall on the Blue Nile river, known locally as Tis Abay." },
    ],
  },
  {
    name: "France",
    destinations: [
      { name: "Eiffel Tower, Paris", description: "Iconic iron lattice tower." },
      { name: "Louvre Museum, Paris", description: "Home to the Mona Lisa." },
      { name: "Mont Saint-Michel", description: "A tidal island with a medieval monastery." },
    ],
  },
  {
    name: "Greece",
    destinations: [
      { name: "Acropolis of Athens", description: "An ancient citadel located on a rocky outcrop above the city of Athens." },
      { name: "Santorini", description: "A volcanic island known for its dramatic views and whitewashed villages." },
      { name: "Mykonos", description: "An island famous for its vibrant nightlife and beautiful beaches." },
    ],
  },
  {
    name: "India",
    destinations: [
      { name: "Taj Mahal, Agra", description: "An ivory-white marble mausoleum on the south bank of the Yamuna river." },
      { name: "Varanasi Ghats", description: "Riverfront steps leading to the banks of the River Ganges." },
      { name: "Amber Fort, Jaipur", description: "A large fort known for its artistic Hindu style elements." },
    ],
  },
  {
    name: "Italy",
    destinations: [
      { name: "Colosseum, Rome", description: "Ancient Roman gladiatorial arena." },
      { name: "Canals of Venice", description: "City built on water with gondolas." },
      { name: "Leaning Tower of Pisa", description: "Freestanding bell tower famous for its tilt." },
      { name: "Florence Cathedral", description: "Gothic cathedral with a Renaissance dome." },
    ],
  },
  {
    name: "Japan",
    destinations: [
      { name: "Fushimi Inari Shrine, Kyoto", description: "Thousands of vermilion torii gates." },
      { name: "Mount Fuji", description: "Japan's highest and most iconic volcano." },
      { name: "Shibuya Crossing, Tokyo", description: "The world's busiest intersection." },
      { name: "Arashiyama Bamboo Grove", description: "A magical and serene bamboo forest." },
    ],
  },
  {
    name: "Mexico",
    destinations: [
      { name: "Chichen Itza", description: "A large pre-Columbian city built by the Maya people." },
      { name: "Tulum", description: "The site of a pre-Columbian Mayan walled city serving as a major port." },
      { name: "Teotihuacan", description: "An ancient Mesoamerican city located in a sub-valley of the Valley of Mexico." },
    ],
  },
  {
    name: "Peru",
    destinations: [
      { name: "Machu Picchu", description: "An ancient Incan citadel set high in the Andes Mountains." },
      { name: "Rainbow Mountain", description: "A mountain with strata of various colors." },
      { name: "Nazca Lines", description: "Large geoglyphs etched into the desert sands." },
    ],
  },
  {
    name: "Spain",
    destinations: [
        { name: "Sagrada Família, Barcelona", description: "A large unfinished Roman Catholic minor basilica." },
        { name: "Alhambra, Granada", description: "A palace and fortress complex of the Moorish rulers." },
        { name: "Park Güell, Barcelona", description: "A public park system composed of gardens and architectonic elements." },
    ],
  },
   {
    name: "Thailand",
    destinations: [
      { name: "The Grand Palace, Bangkok", description: "A complex of buildings at the heart of Bangkok." },
      { name: "Phi Phi Islands", description: "An island group in Thailand, between the large island of Phuket and the Straits of Malacca coast." },
      { name: "Ayutthaya Historical Park", description: "The ruins of the old city of Ayutthaya." },
    ],
  },
  {
    name: "Turkey",
    destinations: [
      { name: "Hagia Sophia, Istanbul", description: "A late antique place of worship in Istanbul." },
      { name: "Cappadocia", description: "A historical region in Central Anatolia, largely in Turkey's Nevşehir Province." },
      { name: "Pamukkale", description: "A town in western Turkey known for the mineral-rich thermal waters flowing down white travertine terraces." },
    ],
  },
  {
    name: "United Kingdom",
    destinations: [
      { name: "Stonehenge", description: "A prehistoric monument in Wiltshire, England." },
      { name: "Tower of London", description: "A historic castle located on the north bank of the River Thames in central London." },
      { name: "Big Ben, London", description: "The Great Bell of the striking clock at the north end of the Palace of Westminster." },
    ],
  },
  {
    name: "USA",
    destinations: [
      { name: "Grand Canyon, Arizona", description: "A massive, colorful canyon carved by the Colorado River." },
      { name: "Statue of Liberty, New York", description: "A colossal neoclassical sculpture on Liberty Island." },
      { name: "Golden Gate Bridge, San Francisco", description: "A famous suspension bridge." },
      { name: "Yellowstone National Park", description: "Features geysers, hot springs, and diverse wildlife." },
    ],
  },
];