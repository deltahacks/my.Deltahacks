const allUniversities1 = ['McMaster University',
  'University of Waterloo',
  'University of Toronto',
  'University of Western Ontario',
  'Ryerson University',
  'Queen’s University',
  'University of Guelph',
  'University of Ottawa',
  'University of Windsor',
  'University of Ontario Institute of Technology',
  'Carleton University',
  'Brock University',
  'University of British Columbia',
  'Lakehead University',
  'Laurentian University',
  'Nipissing University',
  'OCAD University',
  'Redeemer University College',
  'Royal Military College of Canada',
  'Saint Paul University',
  'St. Jerome’s University',
  'Trent University',
  'University of St. Michael’s College',
  'University of Sudbury',
  'University of Trinity College',
  'Victoria University',
  'Wilfrid Laurier University',
  'Vancouver Island University',
  'Royal Roads University',
  'Simon Fraser University',
  'Trinity Western University',
  'Thompson River University',
  'University of the Fraser Valley',
  'University of Northern British Columbia',
  'University of Victoria',
  'First Nations University of Canada',
  'University of Regina',
  'University of Saskatchewan',
  'Athabasca University',
  'Augustana University College',
  'Concordia University College of Alberta',
  'The King’s University College',
  'University of Alberta',
  'University of Calgary',
  'University of Lethbridge',
  'MacEwan University',
  'Mount Royal University',
  'Brandon University',
  'University of Manitoba',
  'University of Winnipeg',
  'Canadian Mennonite University',
  'St. Paul’s College',
  'Université de Saint-Boniface',
  'Algoma University',
  'Brescia University College',
  'York University',
  'Bishop’s University',
  'Concordia University',
  'École de technologie supérieur',
  'École nationale d’administration publique',
  'École Polytechnique de Montréal',
  'HEC Montréal',
  'Institut national de la recherche scientifique',
  'McGill University',
  'Université de Montréal',
  'Université de Sherbrooke',
  'Université de Québec',
  'Université du Québec à Chicoutimi (UQAC)',
  'Université du Québec à Montréal (UQAM)',
  'Université du Québec à Rimouski (UQAR)',
  'Université du Québec à Trois-Rivières (UQTR)',
  'Université du Québec en Abitibi-Témiscamingue (UQAT)',
  'Université du Québec en Outaouais',
  'Université de Laval',
  'University of Prince Edward Island',
  'Acadia University',
  'Cape Breton University',
  'Dalhousie University',
  'Mount Saint Vincent University',
  'NSCAD University',
  'Saint Mary’s University',
  'St. Francis Xavier University',
  'Université Sainte-Anne',
  'University of King’s College',
  'Mount Allison University',
  'St. Thomas University',
  'Université de Moncton',
  'University of New Brunswick',
  'Memorial University of Newfoundland',
  'BRITISH COLUMBIA',
  'British Columbia Institute of Technology',
  'Okanagan College',
  'Ashton College',
  'Brighton College',
  'Columbia College',
  'Camosun College',
  'Canadian College',
  'Capilano University',
  'Collège Éducacentre',
  'College of the New Caledonia',
  'College of the Rockies',
  'Douglas College',
  'Eton College',
  'Justice Institute of British Columbia',
  'Kwantlen Polytechnic University',
  'Langara College',
  'Native Education College',
  'Nicola Valley Institute of Technology',
  'North Island College',
  'Northern Lights College',
  'Northwest Community College',
  'Okanagan College',
  'Selkirk College',
  'Sprott Shaw College',
  'Vancouver Community College',
  'Vancouver Institute of Media Arts',
  'Winnipeg Technical College',
  'Assiniboine Community College',
  'University College of the North',
  'Red River College of Applied Arts, Science and Technology',
  'École technique et professionnelle, Université de Saint-Boniface',
  'Manitoba Institute of Trades and Technology',
  'New Brunswick College of Craft and Design',
  'New Brunswick Community College',
  'Maritime College of Forest Technology',
  'New Brunswick Bible Institute',
  'College of the North Atlantic',
  'Marine Institute',
  'Centre for Nursing Studies',
  'Université de Guelph, Campus d’Alfred',
  'Algonquin College',
  'Collège Boréal',
  'Cambrian College of Applied Arts and Technology',
  'Canadore College of Applied Arts and Technology',
  'Centennial College of Applied Arts and Technology',
  'La Cité collégiale',
  'Conestoga College Institute of Technology and Advanced Learning',
  'Confederation College of Applied Arts and Technology',
  'Durham College',
  'Fanshawe College of Applied Arts and Technology',
  'Fleming College',
  'George Brown College',
  'Georgian College of Applied Arts and Technology',
  'Humber College Institute of Technology & Advanced Learning University of Guelph, Kemptville Campus',
  'Lambton College of Applied Arts and Technology',
  'Loyalist College of Applied Arts and Technology',
  'The Michener Institute for Applied Health Sciences',
  'Mohawk College of Applied Arts and Technology',
  'Niagara College',
  'Northern College of Applied Arts and Technology',
  'St. Clair College of Applied Arts and Technology',
  'St. Lawrence College',
  'Sault College of Applied Arts and Technology',
  'Seneca College of Applied Arts and Technology',
  'Sheridan College Institute of Technology and Advanced Learning',
  'Aurora College',
  'Academy of Learning College',
  'Canadian Coast Guard College',
  'Gaelic College',
  'Kingston Bible College',
  'Nova Scotia Community College',
  'Nunavut Arctic College',
  'Holland College',
  'Maritime Christian College',
  'Collège Acadie Î.-P.-É.',
  'Cégep de l’Abitibi-Témiscamingue',
  'Collège Ahuntsic',
  'Collège André-Laurendeau',
  'Cégep de Baie-Comeau',
  'Cégep Beauce-Appalaches',
  'Collège de Bois-de-Boulogne',
  'Champlain Regional College',
  'Cégep de Chicoutimi',
  'Dawson College',
  'Cégep de Drummondville',
  'Cégep Édouard-Montpetit',
  'Collège François-Xavier-Garneau',
  'Cégep de la Gaspésie et des Îles',
  'Collège Gérald-Godin',
  'Cégep de Granby-Haute-Yamaska',
  'Heritage College',
  'John Abbott College',
  'Cégep de Jonquière',
  'Cégep de La Pocatière',
  'Cégep régional de Lanaudière',
  'Cégep de Lévis-Lauzon',
  'Cégep Limoilou',
  'Collège Lionel-Groulx',
  'Collège de Maisonneuve',
  'Cégep Marie-Victorin',
  'Cégep de Matane',
  'Collège Montmorency',
  'Cégep de l’Outaouais',
  'Cégep de Rimouski',
  'Collège de Rosemont',
  'Cégep de Saint-Félicien',
  'Cégep de Saint-Hyacinthe',
  'Cégep de Saint-Jean-sur-Richelieu',
  'Cégep de Saint-Jérôme',
  'Cégep de Saint-Laurent',
  'Cégep de Sainte-Foy',
  'Cégep de Sept-Îles',
  'Collège Shawinigan',
  'Cégep de Sherbrooke',
  'Cégep de Sorel-Tracy',
  'Cégep de Thetford',
  'Cégep de Trois-Rivières',
  'Collège de Valleyfield',
  'Vanier College',
  'Cégep de Victoriaville',
  'Cégep du Vieux Montréal',
  'Collège Bart',
  'Collège Jean-de-Brébeuf',
  'Collège Laflèche',
  'LaSalle College',
  'Marianopolis College',
  'Collège International Marie de France',
  'Collège Mérici',
  'O’Sullivan College of Montreal',
  'Collège O’Sullivan de Québec',
  'Collège Stanislas',
  'École de musique Vincent d’Indy',
  'National Circus School',
  'Séminaire de Sherbrooke',
  'Trebas Institute',
  'Bethany College',
  'Briercrest College and Seminary',
  'Carlton Trail Regional College',
  'Horizon College and Seminary',
  'College Mathieu',
  'Cumberland College',
  'Eston College',
  'Great Plains College',
  'Nipawin Bible College',
  'Northlands College',
  'North West Regional College',
  'Parkland College',
  'Saskatchewan Indian Institute of Technologies',
  'Saskatchewan Institute of Applied Sciences and Technology',
  'Southeast Regional College',
  'St Peter’s College',
  'Western Academy Broadcasting College',
  'Yukon College'];

const majorsList = [
  'Computer Science',
  'Software Engineering',
  'Computer Engineering',
  'Physcology',
  'Music',
  'Civil Engineering',
  'Mechatronics Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Biomedical Engineering',
  'Materials Engineering',
  'Chemical Engineering',
  'Astronomy',
  'Physics',
  'English',
  'Philosophy',
  'Art',
  'Mathematics',
  'Biology',
  'Medicine',
  'Life Science',
  'Health Science',
  'Engineering 1st Year',
  'Other',
];

export const majors = majorsList;

export const allUniversities = allUniversities1;
