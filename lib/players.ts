import { Player } from './types';

// ICC T20 World Cup 2026 - Sample player roster
export const WORLD_CUP_PLAYERS: Player[] = [
  // India
  { id: 'ind-1', name: 'Rohit Sharma', country: 'India', role: 'Batsman', basePrice: 200000 },
  { id: 'ind-2', name: 'Virat Kohli', country: 'India', role: 'Batsman', basePrice: 200000 },
  { id: 'ind-3', name: 'Jasprit Bumrah', country: 'India', role: 'Bowler', basePrice: 180000 },
  { id: 'ind-4', name: 'Hardik Pandya', country: 'India', role: 'All-Rounder', basePrice: 180000 },
  { id: 'ind-5', name: 'Rishabh Pant', country: 'India', role: 'Wicket-Keeper', basePrice: 160000 },
  { id: 'ind-6', name: 'KL Rahul', country: 'India', role: 'Wicket-Keeper', basePrice: 150000 },
  { id: 'ind-7', name: 'Ravindra Jadeja', country: 'India', role: 'All-Rounder', basePrice: 160000 },
  { id: 'ind-8', name: 'Mohammed Shami', country: 'India', role: 'Bowler', basePrice: 140000 },
  { id: 'ind-9', name: 'Suryakumar Yadav', country: 'India', role: 'Batsman', basePrice: 150000 },
  { id: 'ind-10', name: 'Kuldeep Yadav', country: 'India', role: 'Bowler', basePrice: 120000 },
  { id: 'ind-11', name: 'Shubman Gill', country: 'India', role: 'Batsman', basePrice: 140000 },
  { id: 'ind-12', name: 'Yuzvendra Chahal', country: 'India', role: 'Bowler', basePrice: 120000 },
  { id: 'ind-13', name: 'Axar Patel', country: 'India', role: 'All-Rounder', basePrice: 130000 },
  { id: 'ind-14', name: 'Shreyas Iyer', country: 'India', role: 'Batsman', basePrice: 130000 },
  { id: 'ind-15', name: 'Arshdeep Singh', country: 'India', role: 'Bowler', basePrice: 110000 },

  // Australia
  { id: 'aus-1', name: 'Pat Cummins', country: 'Australia', role: 'Bowler', basePrice: 180000 },
  { id: 'aus-2', name: 'Steve Smith', country: 'Australia', role: 'Batsman', basePrice: 180000 },
  { id: 'aus-3', name: 'David Warner', country: 'Australia', role: 'Batsman', basePrice: 170000 },
  { id: 'aus-4', name: 'Glenn Maxwell', country: 'Australia', role: 'All-Rounder', basePrice: 170000 },
  { id: 'aus-5', name: 'Mitchell Starc', country: 'Australia', role: 'Bowler', basePrice: 160000 },
  { id: 'aus-6', name: 'Josh Hazlewood', country: 'Australia', role: 'Bowler', basePrice: 150000 },
  { id: 'aus-7', name: 'Alex Carey', country: 'Australia', role: 'Wicket-Keeper', basePrice: 130000 },
  { id: 'aus-8', name: 'Travis Head', country: 'Australia', role: 'Batsman', basePrice: 140000 },
  { id: 'aus-9', name: 'Adam Zampa', country: 'Australia', role: 'Bowler', basePrice: 130000 },
  { id: 'aus-10', name: 'Marcus Stoinis', country: 'Australia', role: 'All-Rounder', basePrice: 140000 },
  { id: 'aus-11', name: 'Mitchell Marsh', country: 'Australia', role: 'All-Rounder', basePrice: 150000 },
  { id: 'aus-12', name: 'Cameron Green', country: 'Australia', role: 'All-Rounder', basePrice: 130000 },
  { id: 'aus-13', name: 'Josh Inglis', country: 'Australia', role: 'Wicket-Keeper', basePrice: 120000 },
  { id: 'aus-14', name: 'Nathan Ellis', country: 'Australia', role: 'Bowler', basePrice: 110000 },
  { id: 'aus-15', name: 'Marnus Labuschagne', country: 'Australia', role: 'Batsman', basePrice: 130000 },

  // England
  { id: 'eng-1', name: 'Jos Buttler', country: 'England', role: 'Wicket-Keeper', basePrice: 180000 },
  { id: 'eng-2', name: 'Ben Stokes', country: 'England', role: 'All-Rounder', basePrice: 180000 },
  { id: 'eng-3', name: 'Joe Root', country: 'England', role: 'Batsman', basePrice: 170000 },
  { id: 'eng-4', name: 'Jofra Archer', country: 'England', role: 'Bowler', basePrice: 160000 },
  { id: 'eng-5', name: 'Mark Wood', country: 'England', role: 'Bowler', basePrice: 140000 },
  { id: 'eng-6', name: 'Jonny Bairstow', country: 'England', role: 'Wicket-Keeper', basePrice: 150000 },
  { id: 'eng-7', name: 'Moeen Ali', country: 'England', role: 'All-Rounder', basePrice: 140000 },
  { id: 'eng-8', name: 'Adil Rashid', country: 'England', role: 'Bowler', basePrice: 130000 },
  { id: 'eng-9', name: 'Sam Curran', country: 'England', role: 'All-Rounder', basePrice: 150000 },
  { id: 'eng-10', name: 'Chris Woakes', country: 'England', role: 'All-Rounder', basePrice: 130000 },
  { id: 'eng-11', name: 'Liam Livingstone', country: 'England', role: 'All-Rounder', basePrice: 130000 },
  { id: 'eng-12', name: 'Reece Topley', country: 'England', role: 'Bowler', basePrice: 110000 },
  { id: 'eng-13', name: 'Harry Brook', country: 'England', role: 'Batsman', basePrice: 130000 },
  { id: 'eng-14', name: 'Phil Salt', country: 'England', role: 'Wicket-Keeper', basePrice: 120000 },
  { id: 'eng-15', name: 'Dawid Malan', country: 'England', role: 'Batsman', basePrice: 120000 },

  // Pakistan
  { id: 'pak-1', name: 'Babar Azam', country: 'Pakistan', role: 'Batsman', basePrice: 190000 },
  { id: 'pak-2', name: 'Shaheen Afridi', country: 'Pakistan', role: 'Bowler', basePrice: 170000 },
  { id: 'pak-3', name: 'Mohammad Rizwan', country: 'Pakistan', role: 'Wicket-Keeper', basePrice: 160000 },
  { id: 'pak-4', name: 'Shadab Khan', country: 'Pakistan', role: 'All-Rounder', basePrice: 140000 },
  { id: 'pak-5', name: 'Haris Rauf', country: 'Pakistan', role: 'Bowler', basePrice: 130000 },
  { id: 'pak-6', name: 'Fakhar Zaman', country: 'Pakistan', role: 'Batsman', basePrice: 130000 },
  { id: 'pak-7', name: 'Mohammad Nawaz', country: 'Pakistan', role: 'All-Rounder', basePrice: 120000 },
  { id: 'pak-8', name: 'Naseem Shah', country: 'Pakistan', role: 'Bowler', basePrice: 120000 },
  { id: 'pak-9', name: 'Iftikhar Ahmed', country: 'Pakistan', role: 'All-Rounder', basePrice: 110000 },
  { id: 'pak-10', name: 'Hasan Ali', country: 'Pakistan', role: 'Bowler', basePrice: 110000 },
  { id: 'pak-11', name: 'Imad Wasim', country: 'Pakistan', role: 'All-Rounder', basePrice: 110000 },
  { id: 'pak-12', name: 'Shan Masood', country: 'Pakistan', role: 'Batsman', basePrice: 100000 },
  { id: 'pak-13', name: 'Usama Mir', country: 'Pakistan', role: 'Bowler', basePrice: 100000 },
  { id: 'pak-14', name: 'Saim Ayub', country: 'Pakistan', role: 'Batsman', basePrice: 100000 },
  { id: 'pak-15', name: 'Azam Khan', country: 'Pakistan', role: 'Wicket-Keeper', basePrice: 100000 },

  // South Africa
  { id: 'sa-1', name: 'Quinton de Kock', country: 'South Africa', role: 'Wicket-Keeper', basePrice: 160000 },
  { id: 'sa-2', name: 'Kagiso Rabada', country: 'South Africa', role: 'Bowler', basePrice: 170000 },
  { id: 'sa-3', name: 'Aiden Markram', country: 'South Africa', role: 'All-Rounder', basePrice: 140000 },
  { id: 'sa-4', name: 'Anrich Nortje', country: 'South Africa', role: 'Bowler', basePrice: 140000 },
  { id: 'sa-5', name: 'David Miller', country: 'South Africa', role: 'Batsman', basePrice: 150000 },
  { id: 'sa-6', name: 'Tabraiz Shamsi', country: 'South Africa', role: 'Bowler', basePrice: 120000 },
  { id: 'sa-7', name: 'Rassie van der Dussen', country: 'South Africa', role: 'Batsman', basePrice: 130000 },
  { id: 'sa-8', name: 'Lungi Ngidi', country: 'South Africa', role: 'Bowler', basePrice: 120000 },
  { id: 'sa-9', name: 'Heinrich Klaasen', country: 'South Africa', role: 'Wicket-Keeper', basePrice: 140000 },
  { id: 'sa-10', name: 'Marco Jansen', country: 'South Africa', role: 'All-Rounder', basePrice: 130000 },
  { id: 'sa-11', name: 'Keshav Maharaj', country: 'South Africa', role: 'Bowler', basePrice: 110000 },
  { id: 'sa-12', name: 'Reeza Hendricks', country: 'South Africa', role: 'Batsman', basePrice: 110000 },
  { id: 'sa-13', name: 'Tristan Stubbs', country: 'South Africa', role: 'Batsman', basePrice: 110000 },
  { id: 'sa-14', name: 'Gerald Coetzee', country: 'South Africa', role: 'Bowler', basePrice: 100000 },
  { id: 'sa-15', name: 'Temba Bavuma', country: 'South Africa', role: 'Batsman', basePrice: 110000 },

  // New Zealand
  { id: 'nz-1', name: 'Kane Williamson', country: 'New Zealand', role: 'Batsman', basePrice: 170000 },
  { id: 'nz-2', name: 'Trent Boult', country: 'New Zealand', role: 'Bowler', basePrice: 160000 },
  { id: 'nz-3', name: 'Tim Southee', country: 'New Zealand', role: 'Bowler', basePrice: 140000 },
  { id: 'nz-4', name: 'Devon Conway', country: 'New Zealand', role: 'Wicket-Keeper', basePrice: 140000 },
  { id: 'nz-5', name: 'Mitchell Santner', country: 'New Zealand', role: 'All-Rounder', basePrice: 130000 },
  { id: 'nz-6', name: 'Daryl Mitchell', country: 'New Zealand', role: 'All-Rounder', basePrice: 130000 },
  { id: 'nz-7', name: 'Glenn Phillips', country: 'New Zealand', role: 'All-Rounder', basePrice: 130000 },
  { id: 'nz-8', name: 'Lockie Ferguson', country: 'New Zealand', role: 'Bowler', basePrice: 130000 },
  { id: 'nz-9', name: 'Ish Sodhi', country: 'New Zealand', role: 'Bowler', basePrice: 110000 },
  { id: 'nz-10', name: 'Tom Latham', country: 'New Zealand', role: 'Wicket-Keeper', basePrice: 120000 },
  { id: 'nz-11', name: 'Mark Chapman', country: 'New Zealand', role: 'Batsman', basePrice: 110000 },
  { id: 'nz-12', name: 'Jimmy Neesham', country: 'New Zealand', role: 'All-Rounder', basePrice: 120000 },
  { id: 'nz-13', name: 'Adam Milne', country: 'New Zealand', role: 'Bowler', basePrice: 100000 },
  { id: 'nz-14', name: 'Finn Allen', country: 'New Zealand', role: 'Batsman', basePrice: 110000 },
  { id: 'nz-15', name: 'Rachin Ravindra', country: 'New Zealand', role: 'All-Rounder', basePrice: 120000 },

  // West Indies
  { id: 'wi-1', name: 'Nicholas Pooran', country: 'West Indies', role: 'Wicket-Keeper', basePrice: 150000 },
  { id: 'wi-2', name: 'Andre Russell', country: 'West Indies', role: 'All-Rounder', basePrice: 160000 },
  { id: 'wi-3', name: 'Jason Holder', country: 'West Indies', role: 'All-Rounder', basePrice: 140000 },
  { id: 'wi-4', name: 'Alzarri Joseph', country: 'West Indies', role: 'Bowler', basePrice: 120000 },
  { id: 'wi-5', name: 'Shimron Hetmyer', country: 'West Indies', role: 'Batsman', basePrice: 130000 },
  { id: 'wi-6', name: 'Akeal Hosein', country: 'West Indies', role: 'Bowler', basePrice: 110000 },
  { id: 'wi-7', name: 'Kyle Mayers', country: 'West Indies', role: 'All-Rounder', basePrice: 120000 },
  { id: 'wi-8', name: 'Rovman Powell', country: 'West Indies', role: 'All-Rounder', basePrice: 120000 },
  { id: 'wi-9', name: 'Shai Hope', country: 'West Indies', role: 'Wicket-Keeper', basePrice: 120000 },
  { id: 'wi-10', name: 'Romario Shepherd', country: 'West Indies', role: 'All-Rounder', basePrice: 100000 },
  { id: 'wi-11', name: 'Obed McCoy', country: 'West Indies', role: 'Bowler', basePrice: 100000 },
  { id: 'wi-12', name: 'Brandon King', country: 'West Indies', role: 'Batsman', basePrice: 100000 },
  { id: 'wi-13', name: 'Johnson Charles', country: 'West Indies', role: 'Wicket-Keeper', basePrice: 100000 },
  { id: 'wi-14', name: 'Gudakesh Motie', country: 'West Indies', role: 'Bowler', basePrice: 90000 },
  { id: 'wi-15', name: 'Shamar Joseph', country: 'West Indies', role: 'Bowler', basePrice: 90000 },

  // Sri Lanka
  { id: 'sl-1', name: 'Wanindu Hasaranga', country: 'Sri Lanka', role: 'All-Rounder', basePrice: 150000 },
  { id: 'sl-2', name: 'Pathum Nissanka', country: 'Sri Lanka', role: 'Batsman', basePrice: 130000 },
  { id: 'sl-3', name: 'Kusal Mendis', country: 'Sri Lanka', role: 'Wicket-Keeper', basePrice: 130000 },
  { id: 'sl-4', name: 'Dasun Shanaka', country: 'Sri Lanka', role: 'All-Rounder', basePrice: 120000 },
  { id: 'sl-5', name: 'Maheesh Theekshana', country: 'Sri Lanka', role: 'Bowler', basePrice: 120000 },
  { id: 'sl-6', name: 'Dushmantha Chameera', country: 'Sri Lanka', role: 'Bowler', basePrice: 110000 },
  { id: 'sl-7', name: 'Charith Asalanka', country: 'Sri Lanka', role: 'All-Rounder', basePrice: 110000 },
  { id: 'sl-8', name: 'Dhananjaya de Silva', country: 'Sri Lanka', role: 'All-Rounder', basePrice: 110000 },
  { id: 'sl-9', name: 'Dilshan Madushanka', country: 'Sri Lanka', role: 'Bowler', basePrice: 100000 },
  { id: 'sl-10', name: 'Angelo Mathews', country: 'Sri Lanka', role: 'All-Rounder', basePrice: 110000 },
  { id: 'sl-11', name: 'Kusal Perera', country: 'Sri Lanka', role: 'Wicket-Keeper', basePrice: 100000 },
  { id: 'sl-12', name: 'Matheesha Pathirana', country: 'Sri Lanka', role: 'Bowler', basePrice: 110000 },
  { id: 'sl-13', name: 'Sadeera Samarawickrama', country: 'Sri Lanka', role: 'Batsman', basePrice: 90000 },
  { id: 'sl-14', name: 'Dunith Wellalage', country: 'Sri Lanka', role: 'All-Rounder', basePrice: 90000 },
  { id: 'sl-15', name: 'Lahiru Kumara', country: 'Sri Lanka', role: 'Bowler', basePrice: 100000 },

  // Bangladesh
  { id: 'ban-1', name: 'Shakib Al Hasan', country: 'Bangladesh', role: 'All-Rounder', basePrice: 150000 },
  { id: 'ban-2', name: 'Mushfiqur Rahim', country: 'Bangladesh', role: 'Wicket-Keeper', basePrice: 130000 },
  { id: 'ban-3', name: 'Mustafizur Rahman', country: 'Bangladesh', role: 'Bowler', basePrice: 120000 },
  { id: 'ban-4', name: 'Litton Das', country: 'Bangladesh', role: 'Wicket-Keeper', basePrice: 120000 },
  { id: 'ban-5', name: 'Taskin Ahmed', country: 'Bangladesh', role: 'Bowler', basePrice: 110000 },
  { id: 'ban-6', name: 'Mehidy Hasan', country: 'Bangladesh', role: 'All-Rounder', basePrice: 110000 },
  { id: 'ban-7', name: 'Najmul Hossain Shanto', country: 'Bangladesh', role: 'Batsman', basePrice: 110000 },
  { id: 'ban-8', name: 'Towhid Hridoy', country: 'Bangladesh', role: 'Batsman', basePrice: 100000 },
  { id: 'ban-9', name: 'Tanzim Hasan', country: 'Bangladesh', role: 'Bowler', basePrice: 90000 },
  { id: 'ban-10', name: 'Shoriful Islam', country: 'Bangladesh', role: 'Bowler', basePrice: 90000 },
  { id: 'ban-11', name: 'Soumya Sarkar', country: 'Bangladesh', role: 'All-Rounder', basePrice: 100000 },
  { id: 'ban-12', name: 'Mahmudullah', country: 'Bangladesh', role: 'All-Rounder', basePrice: 100000 },
  { id: 'ban-13', name: 'Rishad Hossain', country: 'Bangladesh', role: 'Bowler', basePrice: 90000 },
  { id: 'ban-14', name: 'Tanzid Hasan', country: 'Bangladesh', role: 'Batsman', basePrice: 90000 },
  { id: 'ban-15', name: 'Nasum Ahmed', country: 'Bangladesh', role: 'Bowler', basePrice: 80000 },

  // Afghanistan
  { id: 'afg-1', name: 'Rashid Khan', country: 'Afghanistan', role: 'All-Rounder', basePrice: 180000 },
  { id: 'afg-2', name: 'Mohammad Nabi', country: 'Afghanistan', role: 'All-Rounder', basePrice: 130000 },
  { id: 'afg-3', name: 'Rahmanullah Gurbaz', country: 'Afghanistan', role: 'Wicket-Keeper', basePrice: 120000 },
  { id: 'afg-4', name: 'Mujeeb Ur Rahman', country: 'Afghanistan', role: 'Bowler', basePrice: 110000 },
  { id: 'afg-5', name: 'Fazalhaq Farooqi', country: 'Afghanistan', role: 'Bowler', basePrice: 110000 },
  { id: 'afg-6', name: 'Ibrahim Zadran', country: 'Afghanistan', role: 'Batsman', basePrice: 110000 },
  { id: 'afg-7', name: 'Naveen-ul-Haq', country: 'Afghanistan', role: 'Bowler', basePrice: 110000 },
  { id: 'afg-8', name: 'Azmatullah Omarzai', country: 'Afghanistan', role: 'All-Rounder', basePrice: 100000 },
  { id: 'afg-9', name: 'Najibullah Zadran', country: 'Afghanistan', role: 'Batsman', basePrice: 100000 },
  { id: 'afg-10', name: 'Gulbadin Naib', country: 'Afghanistan', role: 'All-Rounder', basePrice: 90000 },
  { id: 'afg-11', name: 'Hashmatullah Shahidi', country: 'Afghanistan', role: 'Batsman', basePrice: 90000 },
  { id: 'afg-12', name: 'Fareed Ahmad', country: 'Afghanistan', role: 'Bowler', basePrice: 80000 },
  { id: 'afg-13', name: 'Noor Ahmad', country: 'Afghanistan', role: 'Bowler', basePrice: 90000 },
  { id: 'afg-14', name: 'Ikram Alikhil', country: 'Afghanistan', role: 'Wicket-Keeper', basePrice: 80000 },
  { id: 'afg-15', name: 'Karim Janat', country: 'Afghanistan', role: 'All-Rounder', basePrice: 80000 },
];

export function getRandomizedPlayers(): Player[] {
  const shuffled = [...WORLD_CUP_PLAYERS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getPlayerById(playerId: string): Player | undefined {
  return WORLD_CUP_PLAYERS.find(p => p.id === playerId);
}
