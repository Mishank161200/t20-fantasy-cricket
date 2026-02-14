import { Player } from './types';

// ICC T20 World Cup 2026 - Official squads from all 20 participating teams
export const WORLD_CUP_PLAYERS: Player[] = [
  // GROUP A - India (Host Nation)
  { id: 'ind-1', name: 'Suryakumar Yadav', country: 'India', role: 'Batsman', basePrice: 180000 },
  { id: 'ind-2', name: 'Jasprit Bumrah', country: 'India', role: 'Bowler', basePrice: 180000 },
  { id: 'ind-3', name: 'Hardik Pandya', country: 'India', role: 'All-Rounder', basePrice: 170000 },
  { id: 'ind-4', name: 'Axar Patel', country: 'India', role: 'All-Rounder', basePrice: 140000 },
  { id: 'ind-5', name: 'Arshdeep Singh', country: 'India', role: 'Bowler', basePrice: 130000 },
  { id: 'ind-6', name: 'Sanju Samson', country: 'India', role: 'Wicket-Keeper', basePrice: 140000 },
  { id: 'ind-7', name: 'Tilak Varma', country: 'India', role: 'Batsman', basePrice: 130000 },
  { id: 'ind-8', name: 'Rinku Singh', country: 'India', role: 'Batsman', basePrice: 120000 },
  { id: 'ind-9', name: 'Ishan Kishan', country: 'India', role: 'Wicket-Keeper', basePrice: 130000 },
  { id: 'ind-10', name: 'Kuldeep Yadav', country: 'India', role: 'Bowler', basePrice: 120000 },
  { id: 'ind-11', name: 'Varun Chakravarthy', country: 'India', role: 'Bowler', basePrice: 110000 },
  { id: 'ind-12', name: 'Washington Sundar', country: 'India', role: 'All-Rounder', basePrice: 110000 },
  { id: 'ind-13', name: 'Shivam Dube', country: 'India', role: 'All-Rounder', basePrice: 110000 },
  { id: 'ind-14', name: 'Abhishek Sharma', country: 'India', role: 'All-Rounder', basePrice: 100000 },
  { id: 'ind-15', name: 'Harshit Rana', country: 'India', role: 'Bowler', basePrice: 100000 },

  // GROUP A - Pakistan
  { id: 'pak-1', name: 'Salman Ali Agha', country: 'Pakistan', role: 'All-Rounder', basePrice: 130000 },
  { id: 'pak-2', name: 'Babar Azam', country: 'Pakistan', role: 'Batsman', basePrice: 170000 },
  { id: 'pak-3', name: 'Shaheen Shah Afridi', country: 'Pakistan', role: 'Bowler', basePrice: 160000 },
  { id: 'pak-4', name: 'Shadab Khan', country: 'Pakistan', role: 'All-Rounder', basePrice: 130000 },
  { id: 'pak-5', name: 'Fakhar Zaman', country: 'Pakistan', role: 'Batsman', basePrice: 130000 },
  { id: 'pak-6', name: 'Naseem Shah', country: 'Pakistan', role: 'Bowler', basePrice: 120000 },
  { id: 'pak-7', name: 'Saim Ayub', country: 'Pakistan', role: 'Batsman', basePrice: 120000 },
  { id: 'pak-8', name: 'Mohammad Nawaz', country: 'Pakistan', role: 'All-Rounder', basePrice: 110000 },
  { id: 'pak-9', name: 'Sahibzada Farhan', country: 'Pakistan', role: 'Batsman', basePrice: 110000 },
  { id: 'pak-10', name: 'Usman Khan', country: 'Pakistan', role: 'Wicket-Keeper', basePrice: 100000 },
  { id: 'pak-11', name: 'Abrar Ahmed', country: 'Pakistan', role: 'Bowler', basePrice: 100000 },
  { id: 'pak-12', name: 'Faheem Ashraf', country: 'Pakistan', role: 'All-Rounder', basePrice: 100000 },
  { id: 'pak-13', name: 'Khawaja Mohammad Nafay', country: 'Pakistan', role: 'Batsman', basePrice: 90000 },
  { id: 'pak-14', name: 'Usman Tariq', country: 'Pakistan', role: 'Bowler', basePrice: 90000 },
  { id: 'pak-15', name: 'Mohammad Salman Mirza', country: 'Pakistan', role: 'Wicket-Keeper', basePrice: 90000 },

  // GROUP A - United States
  { id: 'usa-1', name: 'Monank Patel', country: 'United States', role: 'Wicket-Keeper', basePrice: 110000 },
  { id: 'usa-2', name: 'Saurabh Netravalkar', country: 'United States', role: 'Bowler', basePrice: 110000 },
  { id: 'usa-3', name: 'Shadley Van Schalkwyk', country: 'United States', role: 'All-Rounder', basePrice: 100000 },
  { id: 'usa-4', name: 'Ali Khan', country: 'United States', role: 'Bowler', basePrice: 100000 },
  { id: 'usa-5', name: 'Harmeet Singh', country: 'United States', role: 'Bowler', basePrice: 100000 },
  { id: 'usa-6', name: 'Andries Gous', country: 'United States', role: 'Wicket-Keeper', basePrice: 90000 },
  { id: 'usa-7', name: 'Milind Kumar', country: 'United States', role: 'Batsman', basePrice: 90000 },
  { id: 'usa-8', name: 'Nosthush Kenjige', country: 'United States', role: 'Bowler', basePrice: 90000 },
  { id: 'usa-9', name: 'Shayan Jahangir', country: 'United States', role: 'Batsman', basePrice: 80000 },
  { id: 'usa-10', name: 'Shehan Jayasuriya', country: 'United States', role: 'All-Rounder', basePrice: 80000 },
  { id: 'usa-11', name: 'Shubham Ranjane', country: 'United States', role: 'Bowler', basePrice: 80000 },
  { id: 'usa-12', name: 'Saiteja Mukkamala', country: 'United States', role: 'Batsman', basePrice: 80000 },
  { id: 'usa-13', name: 'Sanjay Krishnamurthi', country: 'United States', role: 'All-Rounder', basePrice: 70000 },
  { id: 'usa-14', name: 'Mohammad Mohsin', country: 'United States', role: 'Bowler', basePrice: 80000 },
  { id: 'usa-15', name: 'Jessy Singh', country: 'United States', role: 'All-Rounder', basePrice: 80000 },

  // GROUP A - Netherlands
  { id: 'ned-1', name: 'Scott Edwards', country: 'Netherlands', role: 'Wicket-Keeper', basePrice: 120000 },
  { id: 'ned-2', name: 'Bas de Leede', country: 'Netherlands', role: 'All-Rounder', basePrice: 120000 },
  { id: 'ned-3', name: 'Logan van Beek', country: 'Netherlands', role: 'All-Rounder', basePrice: 110000 },
  { id: 'ned-4', name: 'Max O\'Dowd', country: 'Netherlands', role: 'Batsman', basePrice: 110000 },
  { id: 'ned-5', name: 'Paul van Meekeren', country: 'Netherlands', role: 'Bowler', basePrice: 100000 },
  { id: 'ned-6', name: 'Roelof van der Merwe', country: 'Netherlands', role: 'All-Rounder', basePrice: 100000 },
  { id: 'ned-7', name: 'Colin Ackermann', country: 'Netherlands', role: 'All-Rounder', basePrice: 100000 },
  { id: 'ned-8', name: 'Aryan Dutt', country: 'Netherlands', role: 'Bowler', basePrice: 90000 },
  { id: 'ned-9', name: 'Saqib Zulfiqar', country: 'Netherlands', role: 'Bowler', basePrice: 90000 },
  { id: 'ned-10', name: 'Timm van der Gugten', country: 'Netherlands', role: 'Bowler', basePrice: 90000 },
  { id: 'ned-11', name: 'Fred Klaassen', country: 'Netherlands', role: 'Bowler', basePrice: 90000 },
  { id: 'ned-12', name: 'Kyle Klein', country: 'Netherlands', role: 'Bowler', basePrice: 80000 },
  { id: 'ned-13', name: 'Michael Levitt', country: 'Netherlands', role: 'Bowler', basePrice: 80000 },
  { id: 'ned-14', name: 'Noah Croes', country: 'Netherlands', role: 'Batsman', basePrice: 80000 },
  { id: 'ned-15', name: 'Zach Lion-Cachet', country: 'Netherlands', role: 'Batsman', basePrice: 70000 },

  // GROUP A - Namibia
  { id: 'nam-1', name: 'Gerhard Erasmus', country: 'Namibia', role: 'All-Rounder', basePrice: 100000 },
  { id: 'nam-2', name: 'JJ Smit', country: 'Namibia', role: 'All-Rounder', basePrice: 100000 },
  { id: 'nam-3', name: 'Ruben Trumpelmann', country: 'Namibia', role: 'Bowler', basePrice: 90000 },
  { id: 'nam-4', name: 'Zane Green', country: 'Namibia', role: 'Wicket-Keeper', basePrice: 90000 },
  { id: 'nam-5', name: 'Jan Frylinck', country: 'Namibia', role: 'All-Rounder', basePrice: 90000 },
  { id: 'nam-6', name: 'Ben Shikongo', country: 'Namibia', role: 'Bowler', basePrice: 80000 },
  { id: 'nam-7', name: 'Bernard Scholtz', country: 'Namibia', role: 'Bowler', basePrice: 80000 },
  { id: 'nam-8', name: 'Nicol Loftie-Eaton', country: 'Namibia', role: 'All-Rounder', basePrice: 80000 },
  { id: 'nam-9', name: 'Jack Brassell', country: 'Namibia', role: 'All-Rounder', basePrice: 70000 },
  { id: 'nam-10', name: 'Dylan Leicher', country: 'Namibia', role: 'Bowler', basePrice: 70000 },
  { id: 'nam-11', name: 'Malan Kruger', country: 'Namibia', role: 'Batsman', basePrice: 70000 },
  { id: 'nam-12', name: 'WP Myburgh', country: 'Namibia', role: 'Batsman', basePrice: 70000 },
  { id: 'nam-13', name: 'Louren Steenkamp', country: 'Namibia', role: 'All-Rounder', basePrice: 70000 },
  { id: 'nam-14', name: 'Max Heingo', country: 'Namibia', role: 'Bowler', basePrice: 60000 },
  { id: 'nam-15', name: 'JC Balt', country: 'Namibia', role: 'Batsman', basePrice: 60000 },

  // GROUP B - Australia
  { id: 'aus-1', name: 'Mitchell Marsh', country: 'Australia', role: 'All-Rounder', basePrice: 160000 },
  { id: 'aus-2', name: 'Travis Head', country: 'Australia', role: 'Batsman', basePrice: 150000 },
  { id: 'aus-3', name: 'Glenn Maxwell', country: 'Australia', role: 'All-Rounder', basePrice: 150000 },
  { id: 'aus-4', name: 'Adam Zampa', country: 'Australia', role: 'Bowler', basePrice: 130000 },
  { id: 'aus-5', name: 'Marcus Stoinis', country: 'Australia', role: 'All-Rounder', basePrice: 130000 },
  { id: 'aus-6', name: 'Josh Inglis', country: 'Australia', role: 'Wicket-Keeper', basePrice: 120000 },
  { id: 'aus-7', name: 'Nathan Ellis', country: 'Australia', role: 'Bowler', basePrice: 110000 },
  { id: 'aus-8', name: 'Tim David', country: 'Australia', role: 'Batsman', basePrice: 110000 },
  { id: 'aus-9', name: 'Cameron Green', country: 'Australia', role: 'All-Rounder', basePrice: 120000 },
  { id: 'aus-10', name: 'Xavier Bartlett', country: 'Australia', role: 'Bowler', basePrice: 100000 },
  { id: 'aus-11', name: 'Ben Dwarshuis', country: 'Australia', role: 'Bowler', basePrice: 90000 },
  { id: 'aus-12', name: 'Cooper Connolly', country: 'Australia', role: 'All-Rounder', basePrice: 90000 },
  { id: 'aus-13', name: 'Matthew Kuhnemann', country: 'Australia', role: 'Bowler', basePrice: 90000 },
  { id: 'aus-14', name: 'Matthew Renshaw', country: 'Australia', role: 'Batsman', basePrice: 90000 },
  { id: 'aus-15', name: 'Josh Hazlewood', country: 'Australia', role: 'Bowler', basePrice: 120000 },

  // GROUP B - Sri Lanka (Host Nation)
  { id: 'sl-1', name: 'Dasun Shanaka', country: 'Sri Lanka', role: 'All-Rounder', basePrice: 130000 },
  { id: 'sl-2', name: 'Wanindu Hasaranga', country: 'Sri Lanka', role: 'All-Rounder', basePrice: 150000 },
  { id: 'sl-3', name: 'Pathum Nissanka', country: 'Sri Lanka', role: 'Batsman', basePrice: 120000 },
  { id: 'sl-4', name: 'Kusal Mendis', country: 'Sri Lanka', role: 'Wicket-Keeper', basePrice: 120000 },
  { id: 'sl-5', name: 'Maheesh Theekshana', country: 'Sri Lanka', role: 'Bowler', basePrice: 110000 },
  { id: 'sl-6', name: 'Matheesha Pathirana', country: 'Sri Lanka', role: 'Bowler', basePrice: 110000 },
  { id: 'sl-7', name: 'Charith Asalanka', country: 'Sri Lanka', role: 'All-Rounder', basePrice: 110000 },
  { id: 'sl-8', name: 'Dushmantha Chameera', country: 'Sri Lanka', role: 'Bowler', basePrice: 110000 },
  { id: 'sl-9', name: 'Kusal Perera', country: 'Sri Lanka', role: 'Wicket-Keeper', basePrice: 100000 },
  { id: 'sl-10', name: 'Dunith Wellalage', country: 'Sri Lanka', role: 'All-Rounder', basePrice: 90000 },
  { id: 'sl-11', name: 'Kamindu Mendis', country: 'Sri Lanka', role: 'All-Rounder', basePrice: 100000 },
  { id: 'sl-12', name: 'Janith Liyanage', country: 'Sri Lanka', role: 'All-Rounder', basePrice: 90000 },
  { id: 'sl-13', name: 'Dilshan Madushanka', country: 'Sri Lanka', role: 'Bowler', basePrice: 90000 },
  { id: 'sl-14', name: 'Dhananjaya de Silva', country: 'Sri Lanka', role: 'All-Rounder', basePrice: 110000 },
  { id: 'sl-15', name: 'Nuwan Thushara', country: 'Sri Lanka', role: 'Bowler', basePrice: 80000 },

  // GROUP B - Ireland
  { id: 'ire-1', name: 'Paul Stirling', country: 'Ireland', role: 'Batsman', basePrice: 120000 },
  { id: 'ire-2', name: 'Harry Tector', country: 'Ireland', role: 'Batsman', basePrice: 110000 },
  { id: 'ire-3', name: 'Lorcan Tucker', country: 'Ireland', role: 'Wicket-Keeper', basePrice: 100000 },
  { id: 'ire-4', name: 'George Dockrell', country: 'Ireland', role: 'All-Rounder', basePrice: 100000 },
  { id: 'ire-5', name: 'Mark Adair', country: 'Ireland', role: 'All-Rounder', basePrice: 100000 },
  { id: 'ire-6', name: 'Josh Little', country: 'Ireland', role: 'Bowler', basePrice: 100000 },
  { id: 'ire-7', name: 'Curtis Campher', country: 'Ireland', role: 'All-Rounder', basePrice: 90000 },
  { id: 'ire-8', name: 'Barry McCarthy', country: 'Ireland', role: 'Bowler', basePrice: 90000 },
  { id: 'ire-9', name: 'Gareth Delany', country: 'Ireland', role: 'All-Rounder', basePrice: 80000 },
  { id: 'ire-10', name: 'Craig Young', country: 'Ireland', role: 'Bowler', basePrice: 80000 },
  { id: 'ire-11', name: 'Matthew Humphreys', country: 'Ireland', role: 'Bowler', basePrice: 80000 },
  { id: 'ire-12', name: 'Ross Adair', country: 'Ireland', role: 'Batsman', basePrice: 80000 },
  { id: 'ire-13', name: 'Tim Tector', country: 'Ireland', role: 'Batsman', basePrice: 70000 },
  { id: 'ire-14', name: 'Ben White', country: 'Ireland', role: 'Bowler', basePrice: 70000 },
  { id: 'ire-15', name: 'Ben Calitz', country: 'Ireland', role: 'Bowler', basePrice: 70000 },

  // GROUP B - Zimbabwe
  { id: 'zim-1', name: 'Sikandar Raza', country: 'Zimbabwe', role: 'All-Rounder', basePrice: 130000 },
  { id: 'zim-2', name: 'Blessing Muzarabani', country: 'Zimbabwe', role: 'Bowler', basePrice: 100000 },
  { id: 'zim-3', name: 'Ryan Burl', country: 'Zimbabwe', role: 'All-Rounder', basePrice: 90000 },
  { id: 'zim-4', name: 'Wellington Masakadza', country: 'Zimbabwe', role: 'Bowler', basePrice: 90000 },
  { id: 'zim-5', name: 'Brendan Taylor', country: 'Zimbabwe', role: 'Wicket-Keeper', basePrice: 90000 },
  { id: 'zim-6', name: 'Richard Ngarava', country: 'Zimbabwe', role: 'Bowler', basePrice: 80000 },
  { id: 'zim-7', name: 'Clive Madande', country: 'Zimbabwe', role: 'Wicket-Keeper', basePrice: 80000 },
  { id: 'zim-8', name: 'Brian Bennett', country: 'Zimbabwe', role: 'All-Rounder', basePrice: 70000 },
  { id: 'zim-9', name: 'Tadiwanashe Marumani', country: 'Zimbabwe', role: 'Wicket-Keeper', basePrice: 70000 },
  { id: 'zim-10', name: 'Bradley Evans', country: 'Zimbabwe', role: 'All-Rounder', basePrice: 70000 },
  { id: 'zim-11', name: 'Dion Myers', country: 'Zimbabwe', role: 'All-Rounder', basePrice: 70000 },
  { id: 'zim-12', name: 'Tashinga Musekiwa', country: 'Zimbabwe', role: 'Batsman', basePrice: 70000 },
  { id: 'zim-13', name: 'Graeme Cremer', country: 'Zimbabwe', role: 'Bowler', basePrice: 70000 },
  { id: 'zim-14', name: 'Tony Munyonga', country: 'Zimbabwe', role: 'Bowler', basePrice: 60000 },
  { id: 'zim-15', name: 'Tinotenda Maposa', country: 'Zimbabwe', role: 'Bowler', basePrice: 60000 },

  // GROUP B - Oman
  { id: 'omn-1', name: 'Jatinder Singh', country: 'Oman', role: 'Batsman', basePrice: 90000 },
  { id: 'omn-2', name: 'Vinayak Shukla', country: 'Oman', role: 'Wicket-Keeper', basePrice: 80000 },
  { id: 'omn-3', name: 'Mohammad Nadeem', country: 'Oman', role: 'Bowler', basePrice: 80000 },
  { id: 'omn-4', name: 'Shakeel Ahmed', country: 'Oman', role: 'Bowler', basePrice: 70000 },
  { id: 'omn-5', name: 'Jay Odedra', country: 'Oman', role: 'Batsman', basePrice: 70000 },
  { id: 'omn-6', name: 'Sufyan Mehmood', country: 'Oman', role: 'Bowler', basePrice: 70000 },
  { id: 'omn-7', name: 'Wasim Ali', country: 'Oman', role: 'Bowler', basePrice: 70000 },
  { id: 'omn-8', name: 'Karan Sonavale', country: 'Oman', role: 'Batsman', basePrice: 60000 },
  { id: 'omn-9', name: 'Hammad Mirza', country: 'Oman', role: 'Wicket-Keeper', basePrice: 60000 },
  { id: 'omn-10', name: 'Nadeem Khan', country: 'Oman', role: 'Bowler', basePrice: 60000 },
  { id: 'omn-11', name: 'Aamir Kaleem', country: 'Oman', role: 'Bowler', basePrice: 60000 },
  { id: 'omn-12', name: 'Ashish Odedara', country: 'Oman', role: 'Bowler', basePrice: 60000 },
  { id: 'omn-13', name: 'Jiten Ramanandi', country: 'Oman', role: 'Bowler', basePrice: 60000 },
  { id: 'omn-14', name: 'Shafiq Jan', country: 'Oman', role: 'Bowler', basePrice: 60000 },
  { id: 'omn-15', name: 'Shah Faisal', country: 'Oman', role: 'Bowler', basePrice: 60000 },

  // GROUP C - England
  { id: 'eng-1', name: 'Harry Brook', country: 'England', role: 'Batsman', basePrice: 150000 },
  { id: 'eng-2', name: 'Jos Buttler', country: 'England', role: 'Wicket-Keeper', basePrice: 160000 },
  { id: 'eng-3', name: 'Jofra Archer', country: 'England', role: 'Bowler', basePrice: 150000 },
  { id: 'eng-4', name: 'Phil Salt', country: 'England', role: 'Wicket-Keeper', basePrice: 130000 },
  { id: 'eng-5', name: 'Adil Rashid', country: 'England', role: 'Bowler', basePrice: 130000 },
  { id: 'eng-6', name: 'Sam Curran', country: 'England', role: 'All-Rounder', basePrice: 130000 },
  { id: 'eng-7', name: 'Will Jacks', country: 'England', role: 'All-Rounder', basePrice: 120000 },
  { id: 'eng-8', name: 'Ben Duckett', country: 'England', role: 'Batsman', basePrice: 120000 },
  { id: 'eng-9', name: 'Jacob Bethell', country: 'England', role: 'All-Rounder', basePrice: 110000 },
  { id: 'eng-10', name: 'Liam Dawson', country: 'England', role: 'All-Rounder', basePrice: 100000 },
  { id: 'eng-11', name: 'Jamie Overton', country: 'England', role: 'Bowler', basePrice: 100000 },
  { id: 'eng-12', name: 'Luke Wood', country: 'England', role: 'Bowler', basePrice: 100000 },
  { id: 'eng-13', name: 'Tom Banton', country: 'England', role: 'Batsman', basePrice: 100000 },
  { id: 'eng-14', name: 'Rehan Ahmed', country: 'England', role: 'Bowler', basePrice: 90000 },
  { id: 'eng-15', name: 'Josh Tongue', country: 'England', role: 'Bowler', basePrice: 90000 },

  // GROUP C - West Indies
  { id: 'wi-1', name: 'Shai Hope', country: 'West Indies', role: 'Wicket-Keeper', basePrice: 140000 },
  { id: 'wi-2', name: 'Shimron Hetmyer', country: 'West Indies', role: 'Batsman', basePrice: 130000 },
  { id: 'wi-3', name: 'Jason Holder', country: 'West Indies', role: 'All-Rounder', basePrice: 130000 },
  { id: 'wi-4', name: 'Romario Shepherd', country: 'West Indies', role: 'All-Rounder', basePrice: 120000 },
  { id: 'wi-5', name: 'Rovman Powell', country: 'West Indies', role: 'All-Rounder', basePrice: 120000 },
  { id: 'wi-6', name: 'Brandon King', country: 'West Indies', role: 'Batsman', basePrice: 110000 },
  { id: 'wi-7', name: 'Akeal Hosein', country: 'West Indies', role: 'Bowler', basePrice: 110000 },
  { id: 'wi-8', name: 'Sherfane Rutherford', country: 'West Indies', role: 'All-Rounder', basePrice: 110000 },
  { id: 'wi-9', name: 'Gudakesh Motie', country: 'West Indies', role: 'Bowler', basePrice: 100000 },
  { id: 'wi-10', name: 'Johnson Charles', country: 'West Indies', role: 'Wicket-Keeper', basePrice: 100000 },
  { id: 'wi-11', name: 'Shamar Joseph', country: 'West Indies', role: 'Bowler', basePrice: 90000 },
  { id: 'wi-12', name: 'Roston Chase', country: 'West Indies', role: 'All-Rounder', basePrice: 100000 },
  { id: 'wi-13', name: 'Matthew Forde', country: 'West Indies', role: 'Bowler', basePrice: 90000 },
  { id: 'wi-14', name: 'Jayden Seales', country: 'West Indies', role: 'Bowler', basePrice: 90000 },
  { id: 'wi-15', name: 'Quentin Sampson', country: 'West Indies', role: 'Bowler', basePrice: 80000 },

  // GROUP C - Nepal
  { id: 'nep-1', name: 'Rohit Paudel', country: 'Nepal', role: 'Batsman', basePrice: 90000 },
  { id: 'nep-2', name: 'Dipendra Singh Airee', country: 'Nepal', role: 'All-Rounder', basePrice: 90000 },
  { id: 'nep-3', name: 'Sandeep Lamichhane', country: 'Nepal', role: 'Bowler', basePrice: 90000 },
  { id: 'nep-4', name: 'Kushal Bhurtel', country: 'Nepal', role: 'Batsman', basePrice: 80000 },
  { id: 'nep-5', name: 'Aasif Sheikh', country: 'Nepal', role: 'Wicket-Keeper', basePrice: 80000 },
  { id: 'nep-6', name: 'Karan KC', country: 'Nepal', role: 'Bowler', basePrice: 80000 },
  { id: 'nep-7', name: 'Sompal Kami', country: 'Nepal', role: 'Bowler', basePrice: 70000 },
  { id: 'nep-8', name: 'Lalit Rajbanshi', country: 'Nepal', role: 'Bowler', basePrice: 70000 },
  { id: 'nep-9', name: 'Aarif Sheikh', country: 'Nepal', role: 'All-Rounder', basePrice: 70000 },
  { id: 'nep-10', name: 'Gulshan Jha', country: 'Nepal', role: 'Bowler', basePrice: 60000 },
  { id: 'nep-11', name: 'Sundeep Jora', country: 'Nepal', role: 'Batsman', basePrice: 60000 },
  { id: 'nep-12', name: 'Nandan Yadav', country: 'Nepal', role: 'Bowler', basePrice: 60000 },
  { id: 'nep-13', name: 'Sher Malla', country: 'Nepal', role: 'Bowler', basePrice: 60000 },
  { id: 'nep-14', name: 'Lokesh Bam', country: 'Nepal', role: 'Bowler', basePrice: 60000 },
  { id: 'nep-15', name: 'Basir Ahamad', country: 'Nepal', role: 'Bowler', basePrice: 60000 },

  // GROUP C - Italy (World Cup Debut)
  { id: 'ita-1', name: 'Wayne Madsen', country: 'Italy', role: 'Batsman', basePrice: 100000 },
  { id: 'ita-2', name: 'JJ Smuts', country: 'Italy', role: 'All-Rounder', basePrice: 100000 },
  { id: 'ita-3', name: 'Benjamin Manenti', country: 'Italy', role: 'All-Rounder', basePrice: 90000 },
  { id: 'ita-4', name: 'Grant Stewart', country: 'Italy', role: 'All-Rounder', basePrice: 80000 },
  { id: 'ita-5', name: 'Gian Piero Meade', country: 'Italy', role: 'Wicket-Keeper', basePrice: 80000 },
  { id: 'ita-6', name: 'Harry Manenti', country: 'Italy', role: 'All-Rounder', basePrice: 70000 },
  { id: 'ita-7', name: 'Jaspreet Singh', country: 'Italy', role: 'Bowler', basePrice: 70000 },
  { id: 'ita-8', name: 'Marcus Campopiano', country: 'Italy', role: 'Batsman', basePrice: 70000 },
  { id: 'ita-9', name: 'Syed Naqvi', country: 'Italy', role: 'All-Rounder', basePrice: 70000 },
  { id: 'ita-10', name: 'Zain Ali', country: 'Italy', role: 'All-Rounder', basePrice: 70000 },
  { id: 'ita-11', name: 'Ali Hasan', country: 'Italy', role: 'All-Rounder', basePrice: 70000 },
  { id: 'ita-12', name: 'Thomas Draca', country: 'Italy', role: 'Bowler', basePrice: 60000 },
  { id: 'ita-13', name: 'Justin Mosca', country: 'Italy', role: 'Batsman', basePrice: 60000 },
  { id: 'ita-14', name: 'Anthony Mosca', country: 'Italy', role: 'All-Rounder', basePrice: 60000 },
  { id: 'ita-15', name: 'Crishan Jorge', country: 'Italy', role: 'All-Rounder', basePrice: 60000 },

  // GROUP C - Scotland (Replaced Bangladesh)
  { id: 'sco-1', name: 'Richie Berrington', country: 'Scotland', role: 'All-Rounder', basePrice: 100000 },
  { id: 'sco-2', name: 'George Munsey', country: 'Scotland', role: 'Batsman', basePrice: 100000 },
  { id: 'sco-3', name: 'Michael Leask', country: 'Scotland', role: 'All-Rounder', basePrice: 100000 },
  { id: 'sco-4', name: 'Brandon McMullen', country: 'Scotland', role: 'All-Rounder', basePrice: 90000 },
  { id: 'sco-5', name: 'Mark Watt', country: 'Scotland', role: 'Bowler', basePrice: 90000 },
  { id: 'sco-6', name: 'Bradley Wheal', country: 'Scotland', role: 'Bowler', basePrice: 90000 },
  { id: 'sco-7', name: 'Matthew Cross', country: 'Scotland', role: 'Wicket-Keeper', basePrice: 80000 },
  { id: 'sco-8', name: 'Safyaan Sharif', country: 'Scotland', role: 'Bowler', basePrice: 80000 },
  { id: 'sco-9', name: 'Tom Bruce', country: 'Scotland', role: 'Batsman', basePrice: 80000 },
  { id: 'sco-10', name: 'Chris Greaves', country: 'Scotland', role: 'All-Rounder', basePrice: 80000 },
  { id: 'sco-11', name: 'Michael Jones', country: 'Scotland', role: 'Batsman', basePrice: 70000 },
  { id: 'sco-12', name: 'Bradley Currie', country: 'Scotland', role: 'Bowler', basePrice: 70000 },
  { id: 'sco-13', name: 'Oliver Davidson', country: 'Scotland', role: 'All-Rounder', basePrice: 60000 },
  { id: 'sco-14', name: 'Finlay McCreath', country: 'Scotland', role: 'Bowler', basePrice: 60000 },
  { id: 'sco-15', name: 'Zainullah Ihsan', country: 'Scotland', role: 'All-Rounder', basePrice: 60000 },

  // GROUP D - New Zealand
  { id: 'nz-1', name: 'Mitchell Santner', country: 'New Zealand', role: 'All-Rounder', basePrice: 140000 },
  { id: 'nz-2', name: 'Lockie Ferguson', country: 'New Zealand', role: 'Bowler', basePrice: 130000 },
  { id: 'nz-3', name: 'Glenn Phillips', country: 'New Zealand', role: 'All-Rounder', basePrice: 130000 },
  { id: 'nz-4', name: 'Devon Conway', country: 'New Zealand', role: 'Wicket-Keeper', basePrice: 130000 },
  { id: 'nz-5', name: 'Tim Seifert', country: 'New Zealand', role: 'Wicket-Keeper', basePrice: 120000 },
  { id: 'nz-6', name: 'Finn Allen', country: 'New Zealand', role: 'Batsman', basePrice: 120000 },
  { id: 'nz-7', name: 'Daryl Mitchell', country: 'New Zealand', role: 'All-Rounder', basePrice: 120000 },
  { id: 'nz-8', name: 'Mark Chapman', country: 'New Zealand', role: 'All-Rounder', basePrice: 110000 },
  { id: 'nz-9', name: 'Rachin Ravindra', country: 'New Zealand', role: 'All-Rounder', basePrice: 120000 },
  { id: 'nz-10', name: 'James Neesham', country: 'New Zealand', role: 'All-Rounder', basePrice: 110000 },
  { id: 'nz-11', name: 'Ish Sodhi', country: 'New Zealand', role: 'Bowler', basePrice: 100000 },
  { id: 'nz-12', name: 'Matt Henry', country: 'New Zealand', role: 'Bowler', basePrice: 100000 },
  { id: 'nz-13', name: 'Jacob Duffy', country: 'New Zealand', role: 'Bowler', basePrice: 90000 },
  { id: 'nz-14', name: 'Kyle Jamieson', country: 'New Zealand', role: 'All-Rounder', basePrice: 100000 },
  { id: 'nz-15', name: 'Michael Bracewell', country: 'New Zealand', role: 'All-Rounder', basePrice: 100000 },

  // GROUP D - South Africa
  { id: 'sa-1', name: 'Aiden Markram', country: 'South Africa', role: 'Batsman', basePrice: 150000 },
  { id: 'sa-2', name: 'Quinton de Kock', country: 'South Africa', role: 'Wicket-Keeper', basePrice: 150000 },
  { id: 'sa-3', name: 'Kagiso Rabada', country: 'South Africa', role: 'Bowler', basePrice: 160000 },
  { id: 'sa-4', name: 'David Miller', country: 'South Africa', role: 'Batsman', basePrice: 140000 },
  { id: 'sa-5', name: 'Lungi Ngidi', country: 'South Africa', role: 'Bowler', basePrice: 130000 },
  { id: 'sa-6', name: 'Keshav Maharaj', country: 'South Africa', role: 'Bowler', basePrice: 120000 },
  { id: 'sa-7', name: 'Marco Jansen', country: 'South Africa', role: 'All-Rounder', basePrice: 120000 },
  { id: 'sa-8', name: 'Anrich Nortje', country: 'South Africa', role: 'Bowler', basePrice: 130000 },
  { id: 'sa-9', name: 'Tristan Stubbs', country: 'South Africa', role: 'Batsman', basePrice: 110000 },
  { id: 'sa-10', name: 'Ryan Rickelton', country: 'South Africa', role: 'Batsman', basePrice: 100000 },
  { id: 'sa-11', name: 'George Linde', country: 'South Africa', role: 'All-Rounder', basePrice: 100000 },
  { id: 'sa-12', name: 'Corbin Bosch', country: 'South Africa', role: 'All-Rounder', basePrice: 90000 },
  { id: 'sa-13', name: 'Dewald Brevis', country: 'South Africa', role: 'Batsman', basePrice: 100000 },
  { id: 'sa-14', name: 'Jason Smith', country: 'South Africa', role: 'All-Rounder', basePrice: 90000 },
  { id: 'sa-15', name: 'Kwena Maphaka', country: 'South Africa', role: 'Bowler', basePrice: 80000 },

  // GROUP D - Afghanistan
  { id: 'afg-1', name: 'Rashid Khan', country: 'Afghanistan', role: 'All-Rounder', basePrice: 180000 },
  { id: 'afg-2', name: 'Mohammad Nabi', country: 'Afghanistan', role: 'All-Rounder', basePrice: 130000 },
  { id: 'afg-3', name: 'Rahmanullah Gurbaz', country: 'Afghanistan', role: 'Wicket-Keeper', basePrice: 120000 },
  { id: 'afg-4', name: 'Fazalhaq Farooqi', country: 'Afghanistan', role: 'Bowler', basePrice: 110000 },
  { id: 'afg-5', name: 'Mujeeb Ur Rahman', country: 'Afghanistan', role: 'Bowler', basePrice: 110000 },
  { id: 'afg-6', name: 'Ibrahim Zadran', country: 'Afghanistan', role: 'Batsman', basePrice: 110000 },
  { id: 'afg-7', name: 'Azmatullah Omarzai', country: 'Afghanistan', role: 'All-Rounder', basePrice: 100000 },
  { id: 'afg-8', name: 'Noor Ahmad', country: 'Afghanistan', role: 'Bowler', basePrice: 90000 },
  { id: 'afg-9', name: 'Gulbadin Naib', country: 'Afghanistan', role: 'All-Rounder', basePrice: 90000 },
  { id: 'afg-10', name: 'Darwish Rasooli', country: 'Afghanistan', role: 'Batsman', basePrice: 80000 },
  { id: 'afg-11', name: 'Naveen Ul Haq', country: 'Afghanistan', role: 'Bowler', basePrice: 100000 },
  { id: 'afg-12', name: 'Shahidullah Kamal', country: 'Afghanistan', role: 'All-Rounder', basePrice: 70000 },
  { id: 'afg-13', name: 'Sediqullah Atal', country: 'Afghanistan', role: 'Batsman', basePrice: 70000 },
  { id: 'afg-14', name: 'Mohammad Ishaq', country: 'Afghanistan', role: 'Wicket-Keeper', basePrice: 70000 },
  { id: 'afg-15', name: 'Abdullah Ahmadzai', country: 'Afghanistan', role: 'Bowler', basePrice: 70000 },

  // GROUP D - Canada
  { id: 'can-1', name: 'Dilpreet Bajwa', country: 'Canada', role: 'All-Rounder', basePrice: 80000 },
  { id: 'can-2', name: 'Navneet Dhaliwal', country: 'Canada', role: 'All-Rounder', basePrice: 80000 },
  { id: 'can-3', name: 'Kaleem Sana', country: 'Canada', role: 'Bowler', basePrice: 70000 },
  { id: 'can-4', name: 'Saad Bin Zafar', country: 'Canada', role: 'All-Rounder', basePrice: 70000 },
  { id: 'can-5', name: 'Nicholas Kirton', country: 'Canada', role: 'Batsman', basePrice: 70000 },
  { id: 'can-6', name: 'Shreyas Movva', country: 'Canada', role: 'Wicket-Keeper', basePrice: 70000 },
  { id: 'can-7', name: 'Dilon Heyliger', country: 'Canada', role: 'Bowler', basePrice: 60000 },
  { id: 'can-8', name: 'Ravinderpal Singh', country: 'Canada', role: 'All-Rounder', basePrice: 60000 },
  { id: 'can-9', name: 'Harsh Thaker', country: 'Canada', role: 'Batsman', basePrice: 60000 },
  { id: 'can-10', name: 'Ansh Patel', country: 'Canada', role: 'All-Rounder', basePrice: 60000 },
  { id: 'can-11', name: 'Jaskarandeep Buttar', country: 'Canada', role: 'All-Rounder', basePrice: 60000 },
  { id: 'can-12', name: 'Kanwarpal Tathgur', country: 'Canada', role: 'All-Rounder', basePrice: 60000 },
  { id: 'can-13', name: 'Shivam Sharma', country: 'Canada', role: 'Bowler', basePrice: 60000 },
  { id: 'can-14', name: 'Ajayveer Hundal', country: 'Canada', role: 'All-Rounder', basePrice: 50000 },
  { id: 'can-15', name: 'Yuvraj Samra', country: 'Canada', role: 'Batsman', basePrice: 50000 },

  // GROUP D - United Arab Emirates
  { id: 'uae-1', name: 'Muhammad Waseem', country: 'United Arab Emirates', role: 'Batsman', basePrice: 90000 },
  { id: 'uae-2', name: 'Alishan Sharafu', country: 'United Arab Emirates', role: 'All-Rounder', basePrice: 80000 },
  { id: 'uae-3', name: 'Muhammad Jawadullah', country: 'United Arab Emirates', role: 'Bowler', basePrice: 70000 },
  { id: 'uae-4', name: 'Junaid Siddique', country: 'United Arab Emirates', role: 'All-Rounder', basePrice: 70000 },
  { id: 'uae-5', name: 'Muhammad Farooq', country: 'United Arab Emirates', role: 'Bowler', basePrice: 70000 },
  { id: 'uae-6', name: 'Simranjeet Singh', country: 'United Arab Emirates', role: 'Bowler', basePrice: 70000 },
  { id: 'uae-7', name: 'Haider Ali', country: 'United Arab Emirates', role: 'Batsman', basePrice: 70000 },
  { id: 'uae-8', name: 'Muhammad Arfan', country: 'United Arab Emirates', role: 'All-Rounder', basePrice: 60000 },
  { id: 'uae-9', name: 'Rohid Khan', country: 'United Arab Emirates', role: 'Bowler', basePrice: 60000 },
  { id: 'uae-10', name: 'Mayank Kumar', country: 'United Arab Emirates', role: 'Batsman', basePrice: 60000 },
  { id: 'uae-11', name: 'Sohaib Khan', country: 'United Arab Emirates', role: 'All-Rounder', basePrice: 60000 },
  { id: 'uae-12', name: 'Harshit Kaushik', country: 'United Arab Emirates', role: 'Wicket-Keeper', basePrice: 60000 },
  { id: 'uae-13', name: 'Muhammad Zohaib', country: 'United Arab Emirates', role: 'All-Rounder', basePrice: 60000 },
  { id: 'uae-14', name: 'Dhruv Parashar', country: 'United Arab Emirates', role: 'All-Rounder', basePrice: 50000 },
  { id: 'uae-15', name: 'Aryansh Sharma', country: 'United Arab Emirates', role: 'All-Rounder', basePrice: 50000 },
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

// Scale player base prices based on tournament budget
// Default budget is 10,000,000, so prices scale proportionally
export function getScaledPlayers(budget: number): Player[] {
  const DEFAULT_BUDGET = 10000000;
  const scaleFactor = budget / DEFAULT_BUDGET;

  return WORLD_CUP_PLAYERS.map(player => ({
    ...player,
    basePrice: Math.round(player.basePrice * scaleFactor)
  }));
}

export function getRandomizedScaledPlayers(budget: number): Player[] {
  const scaledPlayers = getScaledPlayers(budget);
  const shuffled = [...scaledPlayers];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
