import DiceRoller from '@3d-dice/dice-roller-parser';
const diceRoller = new DiceRoller.DiceRoller();

const firstNames = ["Abigayl", "Aebria", "Aeobreia", "Breia", "Aedria", "Aodreia", "Dreia", "Aeliya", "Aliya",
  "Aella", "Aemilya", "Aemma", "Aemy", "Amy", "Ami", "Aeria", "Arya", "Aeva",
  "Aevelyn", "Evylann", "Alaexa", "Alyxa", "Alina", "Aelina", "Aelinea", "Allisann", "Allysann",
  "Alyce", "Alys", "Alysea", "Alyssia", "Aelyssa", "Amelya", "Maelya", "Andreya", "Aendrea",
  "Arianna", "Aryanna", "Arielle", "Aryell", "Ariella", "Ashlena", "Aurora", "Avaery", "Avyrie",
  "Bella", "Baella", "Brooklinea", "Bryanna", "Brynna", "Brinna", "Caemila", "Chloe", "Chloeia",
  "Claira", "Clayre", "Clayra", "Delyla", "Dalyla", "Elisybeth", "Aelisabeth", "Ellia", "Ellya",
  "Elyana", "Eliana", "Eva", "Falyne", "Genaesis", "Genaesys", "Gianna", "Jianna", "Janna",
  "Graece", "Grassa", "Haenna", "Hanna", "Halya", "Harperia", "Peria", "Hazyl", "Hazel",
  "Jasmyne", "Jasmine", "Jocelyne", "Joceline", "Celine", "Kaelia", "Kaelya", "Kathryne", "Kathrine",
  "Kayla", "Kaila", "Kymber", "Kimbera", "Layla", "Laylanna", "Leia", "Leya", "Leah",
  "Lilia", "Lylia", "Luna", "Maedisa", "Maelania", "Melania", "Maya", "Mya", "Myla",
  "Milae", "Naomi", "Naome", "Natalya", "Talya", "Nathylie", "Nataliae", "Thalia", "Nicola",
  "Nikola", "Nycola", "Olivya", "Alivya", "Penelope", "Paenelope", "Pynelope", "Rianna", "Ryanna",
  "Ruby", "Ryla", "Samaentha", "Samytha", "Sara", "Sarah", "Savannia", "Scarletta", "Sharlotta",
  "Caerlotta", "Sophya", "Stella", "Stylla", "Valentyna", "Valerya", "Valeria", "Valia", "Valea",
  "Victorya", "Vilettia", "Ximena", "Imaena", "Ysabel", "Zoe", "Zoeia", "Zoea", "Zoesia",
  "Aaryn", "Aaro", "Aarus", "Abramus", "Abrahm", "Abyl", "Abelus", "Adannius", "Adanno",
  "Aedam", "Adym", "Adamus", "Aedrian", "Aedrio", "Aedyn", "Aidyn", "Aelijah", "Elyjah",
  "Aendro", "Androe", "Aenry", "Hynroe", "Hynrus", "Aethan", "Aethyn", "Aevan", "Evyn",
  "Evanus", "Alecks", "Alyx", "Alexandyr", "Xandyr", "Alyn", "Alaen", "Andrus", "Aendrus",
  "Anglo", "Aenglo", "Anglus", "Antony", "Antonyr", "Astyn", "Astinus", "Axelus", "Axyl",
  "Benjamyn", "Benjamyr", "Braidyn", "Brydus", "Braddeus", "Brandyn", "Braendyn", "Bryus", "Bryne",
  "Bryn", "Branus", "Caeleb", "Caelyb", "Caerlos", "Carlus", "Cameryn", "Camerus", "Cartus",
  "Caertero", "Charlus", "Chaerles", "Chyrles", "Christophyr", "Christo", "Chrystian", "Chrystan",
  "Connorus", "Connyr", "Daemian", "Damyan", "Daenyel", "Danyel", "Davyd", "Daevo", "Dominac", "Dylaen",
  "Dylus", "Elius", "Aeli", "Elyas", "Helius", "Helian", "Emilyan", "Emilanus", "Emmanus",
  "Emynwell", "Ericus", "Eryc", "Eryck", "Ezekius", "Zeckus", "Ezekio", "Ezrus", "Yzra",
  "Gabrael", "Gaebriel", "Gael", "Gayl", "Gayel", "Gaeus", "Gavyn", "Gaevyn", "Goshwa",
  "Joshoe", "Graysus", "Graysen", "Gwann", "Ewan", "Gwyllam", "Gwyllem", "Haddeus", "Hudsyn",
  "Haesoe", "Haesys", "Haesus", "Handus", "Handyr", "Hantus", "Huntyr", "Haroldus", "Haryld",
  "Horgus", "Horus", "Horys", "Horyce", "Hosea", "Hosius", "Iaen", "Yan", "Ianus",
  "Ivaen", "Yvan", "Jaecoby", "Jaecob", "Jaeden", "Jaedyn", "Jaeremiah", "Jeremus", "Jasyn",
  "Jaesen", "Jaxon", "Jaxyn", "Jaxus", "Johnus", "Jonus", "Jonaeth", "Jonathyn", "Jordus",
  "Jordyn", "Josaeth", "Josephus", "Josaeus", "Josayah", "Jovanus", "Giovan", "Julyan", "Julyo",
  "Jyck", "Jaeck", "Jacus", "Kaevin", "Kevyn", "Vinkus", "Laevi", "Levy", "Levius",
  "Landyn", "Laendus", "Leo", "Leonus", "Leonaerdo", "Leonyrdo", "Lynardus", "Lincon", "Lyncon",
  "Linconus", "Logaen", "Logus", "Louis", "Lucius", "Lucae", "Lucaen", "Lucaes", "Lucoe",
  "Lucus", "Lyam", "Maeson", "Masyn", "Maetho", "Mathoe", "Matteus", "Matto", "Maxus",
  "Maximus", "Maximo", "Maxymer", "Mychael", "Mygwell", "Miglus", "Mythro", "Mithrus", "Naemo",
  "Naethyn", "Nathanus", "Naethynel", "Nicholaes", "Nycholas", "Nicholys", "Nicolus", "Nolyn", "Nolanus",
  "Olivyr", "Alivyr", "Olivus", "Oscarus", "Oscoe", "Raen", "Ryn", "Robertus", "Robett",
  "Bertus", "Romyn", "Romanus", "Ryderus", "Ridyr", "Samwell", "Saemuel", "Santegus", "Santaegus",
  "Sybasten", "Bastyen", "Tago", "Aemo", "Tagus", "Theodorus", "Theodus", "Thaeodore", "Thomys",
  "Thomas", "Tommus", "Tylus", "Tilyr", "Uwyn", "Oewyn", "Victor", "Victyr", "Victorus",
  "Vincynt", "Vyncent", "Vincentus", "Wyttus", "Wyaett", "Xavius", "Havius", "Xavyer", "Yago",
  "Tyago", "Tyego", "Ysaac", "Aisaac", "Ysaiah", "Aisiah", "Siahus", "Zacharus", "Zachar",
  "Zachaery", "Abigail", "Aemily", "Emilia", "Alexa", "Alinea", "Alina", "Leena", "Allyson",
  "Allison", "Alya", "Aliya", "Alys", "Alyce", "Ami", "Amee", "Andrea", "Aendrea",
  "Aria", "Arya", "Ariana", "Aryana", "Ariel", "Arielle", "Ashlene", "Ashlyne", "Aubree",
  "Aubria", "Bree", "Audree", "Audria", "Dree", "Aurora", "Ava", "Averee", "Avery",
  "Bella", "Brianna", "Brynn", "Bryanna", "Brooke", "Brooklyn", "Camila", "Clayre", "Clara",
  "Clayra", "Claire", "Cloe", "Cloey", "Delyla", "Dalia", "Eliana", "Elyna", "Liana",
  "Lyana", "Ella", "Ellie", "Elli", "Elyssa", "Lyssie", "Emma", "Eva", "Evylen",
  "Faline", "Genesys", "Jenessa", "Gina", "Ginna", "Janna", "Grayce", "Grace", "Halia",
  "Halie", "Hanna", "Hannah", "Harper", "Peria", "Hazel", "Azalea", "Isabel", "Belle",
  "Jasmine", "Jocelyn", "Joyce", "Celyne", "Kaeli", "Kathryn", "Kathrinn", "Cathryn", "Kayla",
  "Kym", "Kymber", "Layla", "Laila", "Lanna", "Lea", "Leia", "Leah", "Lily",
  "Lyly", "Lisbeth", "Lysbeth", "Luna", "Loona", "Madisyn", "Maya", "Maia", "Mea",
  "Melania", "Melany", "Mena", "Mina", "Mila", "Myla", "Milly", "Amelia", "Naomi",
  "Nataly", "Natta", "Natylie", "Natty", "Nycole", "Nicolle", "Olyva", "Alivia", "Olivia",
  "Penelope", "Penny", "Rianna", "Ryanna", "Ruby", "Ryla", "Rilie", "Rylie", "Samitha",
  "Samentha", "Sara", "Sarah", "Savanna", "Scarlet", "Sharlotte", "Carlotta", "Sophia", "Stelly",
  "Stella", "Vala", "Valentyna", "Valea", "Valerya", "Valerie", "Victoria", "Victora", "Violet",
  "Viola", "Zoe", "Zoey", "Zosy", "Aaron", "Aaryn", "Abram", "Bram", "Abyl",
  "Abel", "Adam", "Aedam", "Adrian", "Hadrian", "Aiden", "Aidyn", "Alyx", "Alix",
  "Andres", "Andrew", "Andre", "Angel", "Anthony", "Astin", "Axel", "Axyl", "Benjamyn",
  "Benjamin", "Braddeus", "Bradyn", "Brynden", "Brandyn", "Bryne", "Bryan", "Bran", "Calyb",
  "Caleb", "Camryn", "Cam", "Carliss", "Cartyr", "Cartus", "Chirles", "Charly", "Conner",
  "Cristian", "Crystan", "Damien", "Damyn", "Daniel", "Dannel", "Dann", "Danny", "David",
  "Davyd", "Diegon", "Tiagon", "Domnac", "Dylan", "Eli", "Ely", "Elias", "Elyas",
  "Elijah", "Elijan", "Emilian", "Emynwell", "Emmyn", "Emmon", "Eric", "Eryc", "Ethan",
  "Athyn", "Evan", "Evyn", "Ezran", "Ezrus", "Gabreil", "Gabreal", "Gael", "Gayl",
  "Gavyn", "Gavin", "Gray", "Grasyn", "Haddeus", "Hudsen", "Handyr", "Hander", "Harold",
  "Haryld", "Horus", "Horace", "Horyce", "Hoseas", "Huntyr", "Han", "Hynry", "Henro",
  "Iaen", "Ian", "Isaac", "Isiah", "Isaias", "Ivaen", "Ivan", "Jacoby", "Jacob",
  "Jaeden", "Jayden", "Jak", "Jyck", "Jasyn", "Jason", "Jax", "Jaxon", "Jaymes",
  "Iamus", "Jestin", "Yestin", "John", "Jonn", "Jonath", "Joathyn", "Jorden", "Jordyn",
  "Joseth", "Joeseph", "Joshen", "Goshen", "Josyah", "Josius", "Jovan", "Julian", "Julyan",
  "Kevin", "Kevan", "Lan", "Alyn", "Landon", "Landyn", "Lenus", "Linus", "Leon",
  "Leo", "Lynard", "Levi", "Levy", "Liam", "Logan", "Lucan", "Luc", "Lucas",
  "Lucyus", "Louis", "Lyncon", "Lincus", "Mason", "Masyn", "Mathew", "Mattius", "Matt",
  "Maximer", "Maximus", "Michael", "Migwell", "Mither", "Nathyn", "Nathan", "Nathynel", "Nathanyel",
  "Nicholus", "Nik", "Noam", "Nolyn", "Nolan", "Olver", "Olliver", "Osco", "Oscus",
  "Oscar", "Owyn", "Owen", "Remus", "Jaeremy", "Rian", "Ryan", "Robett", "Robb",
  "Roman", "Romyn", "Ryder", "Samwell", "Samuel", "Sebasten", "Bastien", "Taegus", "Santus",
  "Theodor", "Theodus", "Thedoras", "Thomys", "Tommas", "Tomm", "Thom", "Tophyr", "Cristor",
  "Tylor", "Ty", "Tylus", "Victor", "Vyctor", "Vincent", "Vyncent", "Vynce", "Wann",
  "Wanny", "Willam", "Willem", "Wytt", "Xander", "Alexander", "Xavyer", "Xavy", "Havy",
  "Zachaery", "Zeke", "Zeek", "Ezekyel", "Abryia", "Abrjia", "Bryia", "Brjia", "Abyiga",
  "Abjiga", "Adryia", "Adrjia", "Dryia", "Drjia", "Aleksa", "Alisya", "Alisja", "Aliya",
  "Alija", "Alysann", "Alisann", "Alyss", "Aliss", "Amya", "Amja", "Andreya", "Andreja",
  "Anika", "Arya", "Arja", "Aryana", "Arjana", "Aryel", "Arjel", "Aslyena", "Asljena",
  "Bela", "Brooka", "Bruka", "Brynn", "Brinn", "Dalilja", "Dalilya", "Elisabet", "Ellya",
  "Ellja", "Elyana", "Eljana", "Ema", "Emili", "Amilja", "Eva", "Eva", "Falyne",
  "Faline", "Feryia", "Ferjia", "Graya", "Graja", "Halya", "Halja", "Hanna", "Hazel",
  "Isabel", "Ysabel", "Jenesa", "Yenesa", "Kalya", "Kalja", "Kamilia", "Kamilja", "Karlata",
  "Sharla", "Katrina", "Katya", "Katja", "Kayla", "Kaila", "Klara", "Kloya", "Kloja",
  "Kyma", "Kima", "Lana", "Leya", "Leja", "Lilja", "Lilya", "Lina", "Lyna",
  "Alyna", "Lippi", "Pippi", "Loona", "Lona", "Madyisa", "Madjisa", "Maya", "Maja",
  "Melanya", "Melanja", "Lanya", "Lanja", "Milya", "Milja", "Miya", "Mija", "Myla",
  "Mjila", "Natalya", "Natalja", "Natya", "Natja", "Nikola", "Olifya", "Olifja", "Oyara",
  "Ojara", "Perja", "Perya", "Ruby", "Rubi", "Ryanna", "Rjanna", "Ryila", "Rjila",
  "Samitya", "Samitja", "Sara", "Selyne", "Seline", "Skarlya", "Skarlja", "Sofi", "Sosya",
  "Sosja", "Soya", "Soja", "Tella", "Tylla", "Valentina", "Valerya", "Valerja", "Valya",
  "Valja", "Vanna", "Viktorya", "Viktorja", "Vila", "Vyla", "Yanna", "Janna", "Yasmine",
  "Jasmine", "Yella", "Jella", "Yemina", "Jemina", "Yvelyn", "Iveljin", "Aaro", "Aaryn",
  "Abel", "Adryan", "Adrjan", "Adym", "Adam", "Aksel", "Aleks", "Aleksander", "Alver",
  "Andrey", "Andrej", "Andrus", "Anton", "Anyel", "Anjel", "Astyn", "Asten", "Aydyn",
  "Ayden", "Benyen", "Benjen", "Brahm", "Brahn", "Brandyn", "Brandjen", "Branus", "Bronn",
  "Dain", "Davek", "Dale", "Damyin", "Damjin", "Dan", "Danyel", "Danjel", "Domnik",
  "Efan", "Efjan", "Efyan", "Elijan", "Eliyan", "Elje", "Elye", "Emanus", "Emilyan",
  "Emiljan", "Eryk", "Erik", "Esran", "Ethyn", "Gabrjel", "Gabryel", "Gafyn", "Gafjen",
  "Gayl", "Gail", "Graysen", "Graisen", "Hadsen", "Hudsen", "Hafyus", "Hafjus", "Han",
  "Handus", "Harold", "Helyan", "Heljan", "Henrik", "Horgus", "Hossen", "Ifjan", "Yfan",
  "Jak", "Yak", "Jakob", "Yakob", "Jamye", "Jamje", "Jan", "Yak", "Jasyn",
  "Jasjen", "Johan", "Yohan", "Joren", "Yoren", "Josef", "Yosef", "Julyan", "Juljan",
  "Yulian", "Kaliv", "Kamrus", "Kanus", "Karl", "Yarl", "Jarl", "Karlus", "Kartus",
  "Kefyan", "Kefjan", "Kristofer", "Tofer", "Kristyan", "Kristjan", "Lan", "Landen", "Lefi",
  "Lokan", "Lucyus", "Lucjius", "Lukas", "Lyam", "Ljam", "Lyenard", "Ljenard", "Lynkus",
  "Linkus", "Lyonus", "Ljonus", "Lyuk", "Ljuk", "Maks", "Masyn", "Matye", "Matje",
  "Matyus", "Matjus", "Miglus", "Mitye", "Mitje", "Mykael", "Natyan", "Natjan", "Natyanus",
  "Natjanus", "Nikolas", "Nolen", "Nom", "Oskar", "Owyn", "Ojin", "Remus", "Robyet",
  "Robjet", "Romyn", "Romen", "Ryderus", "Riderus", "Ryn", "Rjan", "Sammen", "Santyeg",
  "Santjeg", "Sebastyan", "Sebastjan", "Sekyus", "Sekjus", "Skarye", "Skarje", "Teodus", "Teddus",
  "Tomus", "Tylus", "Tilus", "Viktor", "Viktus", "Vintus", "Vyntus", "Wilhelm", "Wyat",
  "Wjat", "Yaden", "Jaden", "Yaks", "Jaks", "Yaksen", "Jaksen", "Yesten", "Jesten",
  "Ygan", "Egan", "Yofan", "Jofan", "Yonaf", "Jonaf", "Yoshen", "Joshen", "Yosyen",
  "Josjen", "Ysak", "Isak", "Isaak", "Ysiah", "Isjah", "Isajas", "Abigala", "Abia",
  "Abria", "Abressa", "Adria", "Adressa", "Alessa", "Alessana", "Alia", "Alya", "Alina",
  "Alinea", "Alinia", "Alisea", "Alisia", "Alissa", "Lyssa", "Alova", "Elva", "Amia",
  "Amya", "Amilia", "Andrea", "Ondrea", "Aria", "Ariana", "Ariella", "Aryella", "Aslena",
  "Azlena", "Avelia", "Avelina", "Averra", "Ferra", "Avia", "Azelia", "Hazelia", "Bella",
  "Bera", "Kimbera", "Brianna", "Brinna", "Brocalina", "Brokalina", "Calia", "Caliana", "Calla",
  "Camilia", "Carlotta", "Catrina", "Catherina", "Clara", "Claira", "Cloia", "Delia", "Delila",
  "Delyla", "Elia", "Ellya", "Eliana", "Ema", "Estella", "Estelia", "Eva", "Falinia",
  "Gianesia", "Genesia", "Gianna", "Gianna", "Grassia", "Grazia", "Halia", "Hanna", "Iasmina",
  "Jazmina", "Illa", "Ella", "Imina", "Isabella", "Laila", "Lailana", "Leia", "Lilia",
  "Lisabeta", "Betta", "Luna", "Madisinia", "Madizinia", "Maia", "Maya", "Melania", "Milannia",
  "Mia", "Mila", "Milia", "Natalia", "Natalya", "Nicola", "Nikola", "Nomi", "Nomia",
  "Oiara", "Oyara", "Pera", "Pinna", "Pia", "Pinelopi", "Riana", "Rilia", "Rubia",
  "Samena", "Samitia", "Sara", "Sarra", "Scarlotta", "Selina", "Jocelina", "Sofia", "Zofia",
  "Talia", "Talea", "Talya", "Valentina", "Fantina", "Valeria", "Feria", "Valia", "Vanna",
  "Fanna", "Viola", "Violetta", "Vittoria", "Vittora", "Zoia", "Uzoia", "Zosia", "Zusia",
  "Abelan", "Abbos", "Abramo", "Brammos", "Adamo", "Adamos", "Adrio", "Adrios", "Adros",
  "Aido", "Aidos", "Aleno", "Alennos", "Alessandro", "Alesso", "Alonso", "Alonnos", "Alvero",
  "Alvan", "Andoran", "Handros", "Andrean", "Andrenas", "Andro", "Andros", "Angelo", "Anglos",
  "Antonio", "Antono", "Aro", "Aros", "Astono", "Stonnos", "Benemo", "Benemos", "Brado",
  "Bridos", "Brando", "Brannos", "Bruno", "Bronnos", "Caliban", "Callos", "Camero", "Kamros",
  "Carlos", "Karlos", "Carolan", "Karolos", "Cartero", "Karros", "Cavo", "Cavos", "Conoro",
  "Konoros", "Cristeno", "Cristenos", "Cristofo", "Cristos", "Dalio", "Dalian", "Damino", "Dammos",
  "Danello", "Danellos", "Dano", "Dannos", "Davo", "Davios", "Domino", "Domnos", "Elian",
  "Helian", "Eligio", "Elihios", "Elio", "Ellios", "Emanolo", "Emannos", "Enrico", "Enrikos",
  "Esekio", "Esekios", "Esro", "Ezro", "Ezros", "Etan", "Evanio", "Ephanos", "Gabrilo",
  "Gabrios", "Galan", "Gallos", "Gavano", "Gavannos", "Giaco", "Jakos", "Giacomo", "Jacomo",
  "Jakomos", "Giadeo", "Hadeos", "Giasson", "Giassonos", "Gionato", "Gionatos", "Giorran", "Jorros",
  "Gioseno", "Giosenos", "Gioseppi", "Gioseppos", "Giosso", "Hossos", "Giovan", "Jovos", "Giulio",
  "Hulios", "Grassio", "Grassos", "Guan", "Jannos", "Guliemo", "Guliemos", "Haddeo", "Haddeos",
  "Hano", "Hanos", "Hanro", "Hanros", "Hanto", "Hantos", "Hasselo", "Axlos", "Havio",
  "Xavios", "Horacio", "Horace", "Hosso", "Hossos", "Iacono", "Jakonos", "Iago", "Tiago",
  "Iamos", "Ianio", "Jannos", "Iasono", "Jasonos", "Iesso", "Hessos", "Iono", "Yonnos",
  "Isamo", "Isamos", "Isimo", "Isimos", "Ivano", "Ibannos", "Jeraldo", "Graddos", "Lando",
  "Landos", "Leo", "Leon", "Leon", "Leonnos", "Levio", "Lebbios", "Liamo", "Liamos",
  "Lincono", "Linconos", "Lucios", "Lukios", "Luco", "Lucos", "Lugo", "Lucan", "Luho",
  "Luhos", "Masono", "Masnos", "Massimo", "Maksimos", "Mateo", "Mateos", "Matos", "Matto",
  "Mattos", "Miglan", "Miglos", "Miguel", "Miguelos", "Milio", "Miliano", "Milyannos", "Mitro",
  "Mitros", "Natan", "Natannos", "Nateo", "Natos", "Nicolo", "Nicos", "Nolano", "Nolannos",
  "Oscaro", "Oskos", "Otio", "Ottios", "Remo", "Remmos", "Riano", "Rianos", "Ridero",
  "Riddros", "Robero", "Robbos", "Roman", "Romannos", "Saccoro", "Saccaros", "Samual", "Samos",
  "Santo", "Santos", "Sebastio", "Sebastos", "Bastio", "Teodoro", "Theodorus", "Tiago", "Iago",
  "Iagos", "Tagos", "Tilo", "Tiloros", "Tomo", "Tommos", "Uenio", "Unnos", "Victoran",
  "Tornos", "Vincenso", "Vincenzo", "Vinnos"]

const lastNames = ["Bright", "Brown", "Browne", "Brushfire", "Camp", "Campman", "Canyon", "Cricketts", "Crickets",
  "Dunes", "Doons", "Doones", "Dunne", "Dunneman", "Flats", "Fox", "Foxx", "Gold",
  "Golden", "Grey", "Gray", "Gulch", "Gully", "Hardy", "Hills", "Hill", "Hopper",
  "Hunter", "Huntsman", "March", "Marcher", "Moon", "Redmoon", "Palmer", "Palms", "Peartree",
  "Pearman", "Redd", "Red", "Rider", "Ryder", "Rock", "Rockman", "Rock", "Rockman",
  "Rocker", "Sands", "Scales", "Redscale", "Greyscale", "Singer", "Small", "Smalls", "Star",
  "Starr", "Stone", "Stoneman", "Storm", "Storms", "Strider", "Stryder", "Sunn", "Sunner",
  "Tumbleweed", "Walker", "Water", "Watters", "Appletree", "Appler", "Applin", "Barley", "Barleycorn",
  "Barleywine", "Barns", "Barnes", "Barnard", "Beans", "Beanman", "Beanstalk", "Berry", "Berryland",
  "Bloom", "Bloomland", "Brown", "Brownland", "Brownard", "Bull", "Bullyard", "Cabbage", "Kabbage",
  "Cotton", "Cottonseed", "Croppe", "Cropman", "Dairyman", "Darryman", "Darry", "Derry", "Farmer",
  "Farmor", "Fields", "Fielder", "Fieldman", "Flats", "Redflats", "Sandflats", "Stoneflats", "Flowers",
  "Gardner", "Gardener", "Gardiner", "Green", "Greene", "Greenland", "Greenyard", "Grove", "Groveland",
  "Hays", "Hayes", "Hayward", "Henkeeper", "Hennerman", "Herd", "Hurd", "Herdland", "Land",
  "Lander", "Mares", "Mayr", "Mair", "Meadows", "Milk", "Millet", "Millett", "Mills",
  "Miller", "Millard", "Neeps", "Neepland", "Nutt", "Nutman", "Oates", "Oats", "Overland",
  "Overfield", "Peartree", "Pearman", "Pease", "Peapod", "Peabody", "Picket", "Picketts", "Pickens",
  "Pickman", "Plant", "Planter", "Ploughman", "Plowman", "Plougherman", "Pollen", "Pollin", "Polly",
  "Pollard", "Rains", "Raines", "Rayns", "Raynes", "Rainard", "Root", "Roote", "Rutland",
  "Shepherd", "Shepard", "Shepyrd", "Shearer", "Sheerer", "Shears", "Sheers", "Sower", "Soward",
  "Tate", "Tater", "Thresh", "Threshett", "Tiller", "Tillman", "Vines", "Vineland", "Wheatley",
  "Wheatly", "Wheat", "Whittaker", "Whitard", "Winnows", "Winnower", "Wool", "Woolard", "Yardly",
  "Yardley", "Yards", "Ales", "Aleman", "Aler", "Baker", "Bake", "Bakeler", "Barr",
  "Barre", "Barman", "Berry", "Berryman", "Berriman", "Boyle", "Boiles", "Boyles", "Brewer",
  "Brewster", "Broyles", "Broiles", "Broyler", "Butcher", "Butchett", "Cook", "Dice", "Dougherman",
  "Dougher", "Fry", "Frey", "Fryman", "Gardner", "Gardener", "Gardiner", "Grills", "Grillett",
  "Innes", "Innman", "Inman", "Kettle", "Kettleblack", "Kettleman", "Kneadler", "Kneadman", "Milk",
  "Miller", "Mills", "Miller", "Palewine", "Pan", "Pannerman", "Panning", "Peppers", "Pepper",
  "Pickler", "Pickleman", "Pickles", "Pieman", "Piemaker", "Potts", "Pott", "Potter", "Redwine",
  "Roasterman", "Salt", "Salter", "Simms", "Simmerman", "Slaughter", "Smoke", "Smoker", "Vines",
  "Vintner", "Vinaker Winaker", "Wineman", "Biggs", "Bigg", "Byggs", "Camp", "Campman", "Coates",
  "Frost", "Furrs", "Furrman", "Graysky", "Whitesky", "Blacksky", "Grey", "Gray", "Hardy",
  "Hardison", "Hardland", "Harland", "Hills", "Hill", "Hylls", "Hunter", "Huntsman", "Ice",
  "Iceland", "Icewind", "Icecutter", "Yceland", "Ycewind", "Ycecutter", "Longnight", "Longdark", "Moon",
  "Wintermoon", "North", "Northman", "Norman", "Northland", "Norland", "Pix", "Pickman", "Pickes",
  "Pyckes", "Seales", "Seals", "Silver", "Silvermoon", "Sylver", "Snow", "Snowes", "Star",
  "Starr", "Northstar", "Stone", "Stoneman", "Strider", "Stryder", "Walker", "White", "Whyte",
  "Winter", "Winters", "Wynters", "Bobbin", "Bolt", "Bolte", "Bolter", "Button", "Buttonworth",
  "Capers", "Coates", "Cotton", "Dyer", "Dye", "Dyeworth", "Dyerson", "Dyson", "Felter",
  "Felterman", "Glover", "Hatter", "Hatty", "Hattiman", "Hatson", "Hemmings", "Hemings", "Hemson",
  "Hyde", "Hides", "Hydes", "Leathers", "Lethers", "Mercer", "Needleman", "Needler", "Needleworth",
  "Seams", "Seems", "Seemworth", "Shearer", "Sheerer", "Shears", "Sheers", "Shoemaker", "Stitches",
  "Stitchworth", "Tailor", "Taylor", "Tanner", "Tannerman", "Thredd", "Threddler", "Threddman", "Threddaker",
  "Weaver", "Weever", "Wool", "Woolworth", "Yardly", "Yardley", "Yards", "Bay", "Bayes",
  "Bayer", "Bayers", "Beacher", "Beach", "Blue", "Bowman", "Castaway", "Crabb", "Crab",
  "Crest", "Days", "Dayes", "Dunes", "Doons", "Doones", "Dunne", "Dunneman", "Eddy",
  "Fisher", "Fishman", "Flowers", "Harper", "Hook", "Hooke", "Iles", "Isles", "Ailes",
  "Mast", "Palmer", "Palms", "Rafman", "Raftman", "Reel", "Reelings", "Salt", "Seasalt",
  "Sands", "Sandman", "Seabreeze", "Shell", "Shellman", "Shellmound", "Sheller", "Shelley", "Shoals",
  "Singer", "Star", "Starr", "Stern", "Sterne", "Stillwater", "Storm", "Storms", "Summers",
  "Sunn", "Sunner", "Swimmer", "Shwimmer", "Swymmer", "Tidewater", "Waters", "Watters", "Waterman",
  "Arch", "Archmaker", "Baskett", "Basket", "Bilder", "Builder", "Bulder", "Bilds", "Blow",
  "Brickman", "Bricker", "Brycks", "Bricks", "Burgh", "Berg", "Burg", "Burgher", "Berger",
  "Burger", "Carpenter", "Chandler", "Candler", "Clay", "Cooper", "Crafter", "Glass", "Glazier",
  "Glasier", "Hammer", "Maker", "Mason", "Masen", "Masyn", "Potts", "Pott", "Potter",
  "Quarrier", "Quarryman", "Rock", "Rockman", "Rocker", "Roof", "Roofe", "Sawyer", "Stone",
  "Stoneman", "Townes", "Towns", "Towny", "Wahl", "Wall", "Wahls", "Walls", "Waller",
  "Waxman", "Wax", "Wackes", "Wood", "Woods", "Billy", "Billie", "Bluffe", "Bluffclimber",
  "Boulder", "Bulder", "Camp", "Campman", "Claymer", "Clayms", "Claimer", "Cole", "Coler",
  "Coleman", "Coalman", "Coaler", "Coaldigger", "Coledegger", "Condor", "Condorman", "Cragg", "Cragman",
  "Diggs", "Digger", "Diggman", "Digger", "Diggett", "Dragonhoard", "Dragonhord", "Dragon", "Drake",
  "Dredge", "Dredger", "Hall", "Haul", "Heights", "Hights", "Hytes", "Hites", "Highland",
  "Hills", "Hill", "Hillclimber", "Hylltopper", "Hoard", "Hord", "Hoar", "Hoardigger", "Hordegger",
  "Kidd", "Kipman", "Kipper", "Kipson", "Kopperfield", "Miner", "Myner", "Mynor", "Minor",
  "Mole", "Moler", "Moller", "Molson", "Molsen", "Ores", "Orr", "Orrs", "Oredigger",
  "Orrdegger", "Orson", "Orrsen", "Pan", "Pans", "Pannerman", "Panning", "Peaks", "Peeks",
  "Pike", "Pyke", "Pikeclimber", "Pyketopper", "Pix", "Pickman", "Pickes", "Pyckes", "Pickens",
  "Quarrier", "Quarryman", "Ridge", "Ridgeclimber", "Ridgetopper", "Rock", "Rockman", "Rocker", "Rockridge",
  "Snow", "Snowes", "Spade", "Spader Springs", "Springer", "Stone", "Stoneman", "Underhill", "Underwood",
  "Underman", "Walker", "Barr", "Barre", "Cash", "Copper", "Coppers", "Curry", "Deals",
  "Deels", "Deel", "Deelaker", "Deelman. Diamond", "Glass", "Glazier", "Glasier", "Gold", "Golden",
  "Goldsmith", "Goldman", "Jewels", "Jules", "Jewls", "Lender", "Lenderman", "Lynder", "Mercer",
  "Money", "Munny", "Monny", "Munnee", "Monnee", "Peppers", "Pepper", "Rich", "Richman",
  "Richett", "Riches", "Saffron", "Sage", "Salt", "Scales", "Shine", "Ships", "Schipps",
  "Shipps", "Shipman", "Schippman", "Silver", "Sylver", "Silverman", "Small", "Smalls", "Spicer",
  "Spiceman", "Star", "Starr", "Thyme", "Ware", "Wool", "Altarside", "Altarworthy", "Beacon",
  "Beecon", "Beeken", "Bell", "Bolt", "Bolte", "Bolter", "Bones", "Bright", "Burns",
  "Cast", "Caster", "Kast", "Chaplain", "Chaplin", "Church", "Churchside", "Darko", "Darkstar",
  "Darker", "Darkbrother", "Deacon", "Deecon", "Deeken", "Drake", "Draco", "Dragon", "Dreamer",
  "Dreemer", "Dreems", "Goodbrother", "Goodman", "Hecks", "Heckes", "Hex", "Holiday", "Holliday",
  "Holyday", "Hollier", "Holly", "Holier", "Hollison", "Hood", "Kearse", "Kerse", "Kerser",
  "Curser", "Monk", "Munk", "Nunn", "Nun", "Powers", "Preacher", "Preecher", "Priest",
  "Preest", "Sage", "Sageworthy", "Saint", "School", "Skool", "Skolar", "Scholyr", "Shock",
  "Shocker", "Shaka", "Skelton", "Skeltyn", "Smart", "Spelling", "Speller", "Star", "Starr",
  "Brightstar", "Teech", "Teeches", "Theery", "Tinker", "Tutor", "Tudor", "Vickers", "Vykar",
  "Vicker", "Vikars", "Wise", "Overwise", "Worthy", "Zapp", "Zappa", "Banks", "Bankes",
  "Bend", "Benderman", "Blue", "Bridges", "Cray", "Craw", "Eddy", "Ferryman", "Ferrimen",
  "Ferry", "Fisher", "Fishman", "Flowers", "Garr", "Hook", "Hooke", "Hopper", "Iles",
  "Isles", "Ailes", "Mills", "Miller", "Oars", "Orrs", "Orr", "Oxbow", "Piers",
  "Peers", "Poleman", "Polman", "Porter", "Rafman", "Raftman", "Reed", "Reede", "Reedy",
  "Reel", "Reelings", "River", "Rivers", "Salmon", "Shell", "Shellman", "Sheller", "Shelley",
  "Silver", "Silvermoon", "Small", "Smalls", "Snails", "Snailman", "Spanner", "Stillwater", "Streams",
  "Streems", "Swimmer", "Shwimmer", "Swymmer", "Trout", "Waters", "Watters", "Waterman", "Whitewater",
  "Wurms", "Worms", "Anchor", "Ankor", "Anker", "Ballast", "Bay", "Bayes", "Bayer",
  "Bayers", "Beacon", "Biggs", "Bigg", "Brigg", "Briggs", "Bowman", "Capp", "Capman",
  "Castaway", "Crabb", "Crab", "Crabber", "Crabman", "Crest", "Darkwater", "Decks", "Decker",
  "Eddy", "Ferryman", "Ferrimen", "Ferry", "Fisher", "Fishman", "Hardy", "Hardison", "Harper",
  "Helms", "Helmsman", "Hook", "Hooke", "Iles", "Isles", "Ailes", "Mast", "Oars",
  "Orrs", "Orr", "Piers", "Peers", "Pitch", "Pytch", "Porter Redtide", "Blacktide", "Riggs",
  "Riggett", "Sailor", "Saylor", "Sailer", "Sayler", "Salt", "Seasalt", "Saltman", "Seabreeze",
  "Seaman", "Season", "Seeman", "Ships", "Schipps", "Shipps", "Shipman", "Schippman", "Shore",
  "Shoreman", "Singer", "Star", "Starr", "Stern", "Sterne", "Storm", "Storms", "Swimmer",
  "Shwimmer", "Swymmer", "Tar", "Tarr", "Tidewater", "Tuggs", "Tugman", "Waters", "Watters",
  "Waterman", "Whitewater", "Anvill", "Anvilson", "Bellows", "Black", "Blackiron", "Copper", "Coppers",
  "Farrier", "Fletcher", "Fletchett", "Forger", "Forgeman", "Goldsmith", "Grey", "Greysteel", "Hammer",
  "Hammett", "Irons", "Yrons", "Ironsmith", "Ironshoe", "Ironhoof", "Kettle", "Kettleblack", "Kettleman",
  "Potts", "Pott", "Pottaker", "Pound", "Poundstone", "Shields", "Shieldson", "Slagg", "Slagman",
  "Smith", "Smyth", "Smitts", "Smittens", "Smitty", "Smythett", "Smoke", "Smoker", "Steel",
  "Steele", "Steelman", "Swords", "Swordson", "Tinn", "Tinman", "Tynn", "Tyne", "Tine",
  "Ackes", "Ax", "Archer", "Bailey", "Banner", "Bannerman", "Bay", "Bayes", "Bones",
  "Boots", "Bootes", "Bowman", "Chestnut", "Colt", "Colter", "Dice", "Dyce", "Dycen",
  "Dyson", "Flagg", "Flag", "Helms", "Hightower", "Knight", "Leathers", "Lethers", "March",
  "Marcher", "Mares", "Mayr", "Mair", "Marks", "Mercer", "Pike", "Pikes", "Pyke",
  "Pykes", "Pikeman", "Pykeman", "Poleman", "Polman", "Rider", "Ryder", "Shields", "Shieldson",
  "Slaughter", "Spears", "Speers", "Swords", "Swordson", "Towers", "Wahl", "Wall", "Wahls",
  "Walls", "Waller", "Bay", "Bayes", "Brand", "Carrier", "Carryer", "Carter", "Carton",
  "Cartwright", "Chestnut", "Colt", "Colter", "Driver", "Dryver", "Foote", "Handler", "Mares",
  "Mayr", "Mair", "Porter", "Quicke", "Quick", "Reines", "Reynes", "Reins", "Reyns",
  "Rider", "Ryder", "Ryde", "Saddler", "Stall", "Stalls", "Staller", "Stallworth", "Stallman",
  "Swift", "Swyft", "Trainor", "Trainer", "Wain", "Wayne", "Wayn", "Wainwright", "Waynwright",
  "Banks", "Bankes", "Black", "Blacktide", "Greentide", "Boggs", "Bogg", "Bogs", "Bull",
  "Buzzfly", "Blackfly", "Shoefly", "Cray", "Craw", "Cricketts", "Crickets", "Darkwater", "Dragonfly",
  "Dragon", "Eeler", "Ealer", "Eeles", "Eales", "Fisher", "Fishman", "Frogg", "Frogman",
  "Green", "Greene", "Greenwater", "Blackwater", "Grey", "Gray", "Grove", "Groves", "Hook",
  "Hooke", "Hopper", "Marsh", "Mayfly", "May", "Moss", "Mosstree", "Greentree", "Poisonweed",
  "Poisonwood", "Polly", "Pollywog", "Polliwog", "Rafman", "Raftman", "Ratt", "Ratman", "Reed",
  "Reede", "Reedy", "River", "Rivers", "Rotten", "Rotman", "Scales", "Greenscale", "Blackscale",
  "Shell", "Shellman", "Sheller", "Shelley", "Skeeter", "Skito", "Small", "Smalls", "Snails",
  "Snailman", "Stillwater", "Swimmer", "Shwimmer", "Swymmer", "Thick", "Thicke", "Tidewater", "Vines",
  "Waters", "Watters", "Wurms", "Worms", "Alley", "Allie", "Bailey", "Bell", "Berg",
  "Berger", "Burg", "Burger", "Brickman", "Brickhouse", "Bridges", "Court", "Gardner", "Gardiner",
  "Hall", "Heap", "Hightower", "Hood", "House", "Lane", "Lain", "Laine", "Lodge",
  "Lodges", "Park", "Parks", "Plaza", "Rhoads", "Rhodes", "Roades", "Roof", "Spanner",
  "Stairs", "Street", "Streets", "Towers", "Towns", "Townsend", "Townes", "Towny", "Towney",
  "Vista", "Wall", "Wahl", "Woodhouse", "Ackes", "Ax", "Archer", "Berry", "Biggs",
  "Bigg", "Birch", "Byrch", "Bird", "Byrd", "Birdett", "Byrdman", "Bloom", "Bowman",
  "Branch", "Brush", "Buck", "Deere", "Deerman", "Doe", "Feller", "Fletcher", "Flowers",
  "Forester", "Forrester", "Forrest", "Fox", "Foxx", "Gardner", "Gardener", "Gardiner", "Green",
  "Greene", "Grove", "Groves", "Harper", "Hatchet", "Hunter", "Huntsman", "Hyde", "Hides",
  "Hydes", "Jack", "Lodge", "Lodges", "Meadows", "Mole", "Moler", "Moller", "Moss",
  "Mosstree", "Greentree", "Oaks", "Oakes", "Pine", "Pines", "Pyne", "Pynes", "Sawyer",
  "Silver", "Silvermoon", "Singer", "Springs", "Springer", "Strider", "Stryder", "Tanner", "Tannerman",
  "Thick", "Thicke", "Walker", "Woods", "Wood", "Woode", "Wooden", "Woodyn"];

const races = [
  {
    name: 'Mountain Dwarf',
    type: 'dwarf',
    modifiers: {
      CON: 2,
      STR: 2,
    }
  },
  {
    name: 'Hill Dwarf',
    type: 'dwarf',
    modifiers: {
      CON: 2,
      WIS: 1,
    }
  },
  {
    name: 'High Elf',
    type: 'elf',
    modifiers: {
      DEX: 2,
      INT: 1,
    }
  },
  {
    name: 'Wood Elf',
    type: 'elf',
    modifiers: {
      DEX: 2,
      WIS: 1,
    }
  },
  {
    name: 'Forest Gnome',
    type: 'gnome',
    modifiers: {
      INT: 2,
      DEX: 1,
    }
  },
  {
    name: 'Rock Gnome',
    type: 'gnome',
    modifiers: {
      INT: 2,
      CON: 1,
    }
  },
  {
    name: 'Lightfoot Halfling',
    type: 'halfling',
    modifiers: {
      DEX: 2,
      CHA: 1,
    }
  },
  {
    name: 'Stout Halfling',
    type: 'halfling',
    modifiers: {
      DEX: 2,
      CON: 1,
    }
  },
  {
    name: 'Half-Elf',
    type: 'half-elf',
    modifiers: {
      CHA: 2,
    },
    notes: 'Half-Elf: Increase 2 Ability Scores except CHA by 1.'
  },
  {
    name: 'Half-Orc',
    type: 'half-orc',
    modifiers: {
      STR: 2,
      CON: 1,
    }
  },
  {
    name: 'Human',
    type: 'human',
    modifiers: {
      STR: 1,
      DEX: 1,
      CON: 1,
      INT: 1,
      WIS: 1,
      CHA: 1,
    }
  },
  {
    name: 'Tiefling',
    type: 'tiefling',
    modifiers: {
      CHA: 2,
      INT: 1,
    }
  },
  {
    name: 'Dragonborn',
    type: 'dragonborn',
    modifiers: {
      STR: 2,
      CHA: 1,
    }
  },
];

const classes = [
  {
    name: 'Barbarian',
    primary: 'STR',
    secondary: 'CON',
    hd: 12
  },
  {
    name: 'Bard',
    primary: 'CHA',
    secondary: 'DEX',
    hd: 8
  },
  {
    name: 'Cleric',
    primary: 'WIS',
    secondary: 'CHA',
    hd: 8
  },
  {
    name: 'Druid',
    primary: 'WIS',
    secondary: 'INT',
    hd: 8
  },
  {
    name: 'Fighter',
    primary: Math.random() >= 0.5 ? 'STR' : 'DEX',
    secondary: 'CON',
    hd: 12
  },
  {
    name: 'Monk',
    primary: Math.random() >= 0.5 ? 'DEX' : 'WIS',
    secondary: 'STR',
    hd: 8
  },
  {
    name: 'Paladin',
    primary: Math.random() >= 0.5 ? 'STR' : 'CHA',
    secondary: 'WIS',
    hd: 10
  },
  {
    name: 'Ranger',
    primary: Math.random() >= 0.5 ? 'DEX' : 'WIS',
    secondary: 'STR',
    hd: 10
  },
  {
    name: 'Rogue',
    primary: 'DEX',
    secondary: 'INT',
    hd: 8
  },
  {
    name: 'Sorcerer',
    primary: 'CHA',
    secondary: 'CON',
    hd: 6
  },
  {
    name: 'Warlock',
    primary: 'CHA',
    secondary: 'WIS',
    hd: 8
  },
  {
    name: 'Wizard',
    primary: 'INT',
    secondary: 'WIS',
    hd: 6
  }
];

const abilities = [
  'STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'
];

const getRaceAndClass = (identifier1, identifier2) => {
  let classIdentifier, raceIdentifier;
  let raceObject, classObject;
  const getRandomRace = () => {
    return races[Math.floor(Math.random() * races.length)];
  };
  const getRandomClass = () => {
    return classes[Math.floor(Math.random() * classes.length)];
  };
  // If both identifiers are blank, return a random race and class.
  if ((!identifier1 || typeof identifier1 !== 'string') && (!identifier2 || typeof identifier2 !== 'string')) {
    raceObject = getRandomRace();
    classObject = getRandomClass();
    return { raceObject, classObject };
  }
  // Assign identifiers to race and class
  [identifier1, identifier2].forEach(needle => {
    if (typeof needle === 'undefined') {
      return true;
    }
    needle = needle.toLowerCase();
    if (classes.find(o => o.name.toLowerCase().startsWith(needle))) {
      classIdentifier = needle;
    } else if (races.find(o => o.name.toLowerCase().includes(needle) || o.type.toLowerCase().includes(needle))) {
      raceIdentifier = needle;
    }
  });
  // Match race and class if their identifiers exist, otherwise generate random
  if (raceIdentifier && raceIdentifier !== undefined) {
    raceObject = races.find(o => o.name.toLowerCase().includes(raceIdentifier) || o.type.toLowerCase().includes(raceIdentifier));
  } else {
    raceObject = getRandomRace();
  }
  if (classIdentifier && classIdentifier !== undefined) {
    classObject = classes.find(o => o.name.toLowerCase().startsWith(classIdentifier))
  } else {
    classObject = getRandomClass();
  }
  return { raceObject, classObject };
}

export const generate = ({ identifier1, identifier2, primaryStat, secondaryStat, level }) => {
  let character = {};
  let { raceObject, classObject } = getRaceAndClass(identifier1, identifier2);

  level = parseInt(level);
  if (!level || typeof level !== 'number') {
    level = 1;
  }

  // Build our stat order (our highest-scored to lowest-scored stats, in order)
  const statOrder = [];
  for (let i = 0; i < 6; i++) {
    // We add stats with this preference:
    // 1. The provided primary stat, if any
    // 2. The provided secondary stat, if any
    // 3. The class primary stat, if not already set
    // 4. The class secondary stat, if not already set
    // 5. CON, if not already set
    // 6. Any random remaining stat
    // If primary stat is not in the stat order array, is set, is a string, and is a valid stat name
    if (primaryStat &&
      !statOrder.includes(primaryStat.toUpperCase().substring(0, 3)) &&
      typeof primaryStat === 'string' &&
      abilities.includes(primaryStat.toUpperCase().substring(0, 3))
    ) {
      statOrder.push(primaryStat.toUpperCase().substring(0, 3));
    }
    // Same for secondary stat
    else if (secondaryStat &&
      !statOrder.includes(secondaryStat.toUpperCase().substring(0, 3)) &&
      typeof secondaryStat === 'string' &&
      abilities.includes(secondaryStat.toUpperCase().substring(0, 3))
    ) {
      statOrder.push(secondaryStat.toUpperCase().substring(0, 3));
    }
    else if (!statOrder.includes(classObject.primary)) {
      statOrder.push(classObject.primary);
    }
    else if (!statOrder.includes(classObject.secondary)) {
      statOrder.push(classObject.secondary);
    }
    else if (!statOrder.includes('CON')) {
      statOrder.push('CON');
    }
    else {
      let remainingStats = abilities.filter(s => !statOrder.includes(s));
      statOrder.push(remainingStats[Math.floor(Math.random() * remainingStats.length)]);
    }
  }

  console.log(statOrder);

  const scores = abilities.map(() => {
    return diceRoller.rollValue('4d6dl');
  })
    .sort((a, b) => b - a)
    .map((i, index) => {
      let statName = statOrder[index];
      let total;
      let matchingModifier = Object.entries(raceObject.modifiers).find(a => a[0] === statName);
      if (matchingModifier) {
        total = i + matchingModifier[1];
      } else {
        total = i;
      }
      let mod = Math.floor((total - 10) / 2);
      mod = mod < 0 ? mod.toString() : '+' + mod.toString();
      return {
        name: statName,
        score: total,
        modifier: mod
      }
    })

  // Sort the array of abilities
  scores.sort((a, b) => {
    return abilities.indexOf(a.name) - abilities.indexOf(b.name);
  });

  character.name = firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)];
  character.class = classObject.name;
  character.race = raceObject.name;
  character.level = level;
  character.abilities = scores;
  character.proficiencyBonus = '+' + Math.ceil(level / 4 + 1);
  character.hp = classObject.hd + parseInt(character.abilities.find(o => o.name === 'CON').modifier) + (level > 1 ? (Math.ceil(classObject.hd / 2) + parseInt(character.abilities.find(o => o.name === 'CON').modifier)) * (level - 1) : 0);
  character.notes = ("" + (raceObject.notes || "") + (level >= 4 ? ` For levelling, increase one Ability Score by 2 or two Ability Scores by 1${level >= 8 ? `, ${Math.floor(level / 4)} times.` : '.'}` : '')).trim();

  console.log(character);

  return character;
}
