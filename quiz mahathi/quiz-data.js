
// Quiz Data for different categories
const quizData = {
  'General Knowledge': [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: "Mars"
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correct: "Blue Whale"
    },
    {
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correct: "1945"
    },
    {
      question: "What is the smallest country in the world?",
      options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
      correct: "Vatican City"
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Silver", "Oxygen", "Iron"],
      correct: "Oxygen"
    },
    {
      question: "What is the tallest mountain in the world?",
      options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
      correct: "Mount Everest"
    },
    {
      question: "Which ocean is the largest?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correct: "Pacific"
    },
    {
      question: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      correct: "7"
    },
    {
      question: "What is the fastest land animal?",
      options: ["Lion", "Cheetah", "Leopard", "Tiger"],
      correct: "Cheetah"
    },
    {
      question: "Which is the longest river in the world?",
      options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
      correct: "Nile"
    },
    {
      question: "What is the hardest natural substance?",
      options: ["Gold", "Iron", "Diamond", "Platinum"],
      correct: "Diamond"
    },
    {
      question: "Which country has the most natural lakes?",
      options: ["Canada", "Russia", "USA", "Finland"],
      correct: "Canada"
    },
    {
      question: "What is the most spoken language in the world?",
      options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
      correct: "Mandarin Chinese"
    },
    {
      question: "Which vitamin is produced when skin is exposed to sunlight?",
      options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
      correct: "Vitamin D"
    }
  ],
  'Geography': [
    {
      question: "Which is the largest desert in the world?",
      options: ["Sahara", "Antarctic", "Arabian", "Gobi"],
      correct: "Antarctic"
    },
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correct: "Canberra"
    },
    {
      question: "Which country has the most time zones?",
      options: ["Russia", "USA", "China", "Canada"],
      correct: "Russia"
    },
    {
      question: "What is the smallest continent?",
      options: ["Europe", "Antarctica", "Australia", "South America"],
      correct: "Australia"
    },
    {
      question: "Which mountain range contains Mount Everest?",
      options: ["Andes", "Rocky Mountains", "Alps", "Himalayas"],
      correct: "Himalayas"
    },
    {
      question: "What is the capital of Canada?",
      options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
      correct: "Ottawa"
    },
    {
      question: "Which river flows through London?",
      options: ["Seine", "Thames", "Danube", "Rhine"],
      correct: "Thames"
    },
    {
      question: "What is the largest island in the world?",
      options: ["Madagascar", "Greenland", "New Guinea", "Borneo"],
      correct: "Greenland"
    },
    {
      question: "Which country is both in Europe and Asia?",
      options: ["Russia", "Turkey", "Kazakhstan", "All of the above"],
      correct: "All of the above"
    },
    {
      question: "What is the deepest ocean trench?",
      options: ["Puerto Rico Trench", "Java Trench", "Mariana Trench", "Peru-Chile Trench"],
      correct: "Mariana Trench"
    },
    {
      question: "Which African country was never colonized?",
      options: ["Kenya", "Ethiopia", "Ghana", "Nigeria"],
      correct: "Ethiopia"
    },
    {
      question: "What is the capital of Brazil?",
      options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
      correct: "Brasília"
    },
    {
      question: "Which strait separates Europe and Africa?",
      options: ["Strait of Gibraltar", "Bosphorus", "Dardanelles", "Strait of Hormuz"],
      correct: "Strait of Gibraltar"
    },
    {
      question: "What is the highest waterfall in the world?",
      options: ["Niagara Falls", "Angel Falls", "Victoria Falls", "Iguazu Falls"],
      correct: "Angel Falls"
    },
    {
      question: "Which city is located on two continents?",
      options: ["Cairo", "Istanbul", "Casablanca", "Suez"],
      correct: "Istanbul"
    }
  ],
  'Science': [
    {
      question: "What is the chemical formula for water?",
      options: ["H2O", "CO2", "NaCl", "CH4"],
      correct: "H2O"
    },
    {
      question: "How many bones are in the human body?",
      options: ["196", "206", "216", "226"],
      correct: "206"
    },
    {
      question: "What is the speed of light?",
      options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
      correct: "300,000 km/s"
    },
    {
      question: "Which gas makes up most of Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correct: "Nitrogen"
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
      correct: "Mitochondria"
    },
    {
      question: "What is the largest organ in the human body?",
      options: ["Heart", "Brain", "Liver", "Skin"],
      correct: "Skin"
    },
    {
      question: "Which scientist developed the theory of relativity?",
      options: ["Newton", "Einstein", "Galileo", "Darwin"],
      correct: "Einstein"
    },
    {
      question: "What is the atomic number of carbon?",
      options: ["4", "6", "8", "12"],
      correct: "6"
    },
    {
      question: "How many chambers does a human heart have?",
      options: ["2", "3", "4", "5"],
      correct: "4"
    },
    {
      question: "What is the study of earthquakes called?",
      options: ["Geology", "Seismology", "Meteorology", "Oceanography"],
      correct: "Seismology"
    },
    {
      question: "Which blood type is known as the universal donor?",
      options: ["A", "B", "AB", "O"],
      correct: "O"
    },
    {
      question: "What is the nearest star to Earth?",
      options: ["Alpha Centauri", "Sirius", "The Sun", "Proxima Centauri"],
      correct: "The Sun"
    },
    {
      question: "What is the pH of pure water?",
      options: ["6", "7", "8", "9"],
      correct: "7"
    },
    {
      question: "Which planet has the most moons?",
      options: ["Jupiter", "Saturn", "Neptune", "Uranus"],
      correct: "Saturn"
    },
    {
      question: "What is the hardest substance known to man?",
      options: ["Steel", "Diamond", "Titanium", "Graphene"],
      correct: "Diamond"
    }
  ],
  'Arts': [
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
      correct: "Leonardo da Vinci"
    },
    {
      question: "Which composer wrote 'The Four Seasons'?",
      options: ["Bach", "Mozart", "Vivaldi", "Beethoven"],
      correct: "Vivaldi"
    },
    {
      question: "What is the art movement that Pablo Picasso co-founded?",
      options: ["Impressionism", "Cubism", "Surrealism", "Abstract Expressionism"],
      correct: "Cubism"
    },
    {
      question: "Which museum houses the Mona Lisa?",
      options: ["British Museum", "Louvre", "Metropolitan Museum", "Uffizi Gallery"],
      correct: "Louvre"
    },
    {
      question: "Who sculpted 'The Thinker'?",
      options: ["Michelangelo", "Rodin", "Donatello", "Bernini"],
      correct: "Rodin"
    },
    {
      question: "What is the famous ceiling painted by Michelangelo?",
      options: ["Sistine Chapel", "St. Peter's Basilica", "Louvre", "Vatican Museum"],
      correct: "Sistine Chapel"
    },
    {
      question: "Which artist cut off his own ear?",
      options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Salvador Dalí"],
      correct: "Vincent van Gogh"
    },
    {
      question: "What does 'Renaissance' mean?",
      options: ["Rebirth", "Revolution", "Reform", "Renewal"],
      correct: "Rebirth"
    },
    {
      question: "Who composed 'The Magic Flute'?",
      options: ["Bach", "Beethoven", "Mozart", "Handel"],
      correct: "Mozart"
    },
    {
      question: "Which art movement is Salvador Dalí associated with?",
      options: ["Cubism", "Impressionism", "Surrealism", "Pop Art"],
      correct: "Surrealism"
    },
    {
      question: "What is the technique of painting on wet plaster called?",
      options: ["Tempera", "Fresco", "Oil painting", "Watercolor"],
      correct: "Fresco"
    },
    {
      question: "Who painted 'Starry Night'?",
      options: ["Claude Monet", "Vincent van Gogh", "Paul Cézanne", "Edgar Degas"],
      correct: "Vincent van Gogh"
    },
    {
      question: "Which instrument did Yo-Yo Ma master?",
      options: ["Violin", "Piano", "Cello", "Flute"],
      correct: "Cello"
    },
    {
      question: "What is the highest female singing voice?",
      options: ["Alto", "Soprano", "Mezzo-soprano", "Contralto"],
      correct: "Soprano"
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Oscar Wilde", "George Bernard Shaw"],
      correct: "William Shakespeare"
    }
  ],
  'Technology': [
    {
      question: "What does 'WWW' stand for?",
      options: ["World Wide Web", "World Wide Website", "World Web Width", "Wide World Web"],
      correct: "World Wide Web"
    },
    {
      question: "Who founded Microsoft?",
      options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"],
      correct: "Bill Gates"
    },
    {
      question: "What does 'CPU' stand for?",
      options: ["Central Processing Unit", "Computer Processing Unit", "Central Program Unit", "Computer Program Unit"],
      correct: "Central Processing Unit"
    },
    {
      question: "Which company developed the iPhone?",
      options: ["Samsung", "Google", "Apple", "Microsoft"],
      correct: "Apple"
    },
    {
      question: "What is the most popular programming language in 2023?",
      options: ["Python", "JavaScript", "Java", "C++"],
      correct: "JavaScript"
    },
    {
      question: "What does 'AI' stand for?",
      options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Intelligence", "Applied Intelligence"],
      correct: "Artificial Intelligence"
    },
    {
      question: "Which social media platform was founded by Mark Zuckerberg?",
      options: ["Twitter", "Instagram", "Facebook", "LinkedIn"],
      correct: "Facebook"
    },
    {
      question: "What does 'HTML' stand for?",
      options: ["Hypertext Markup Language", "Home Tool Markup Language", "Hyperlink Text Markup Language", "Hypertext Machine Language"],
      correct: "Hypertext Markup Language"
    },
    {
      question: "Which company owns YouTube?",
      options: ["Facebook", "Microsoft", "Google", "Amazon"],
      correct: "Google"
    },
    {
      question: "What is the main function of RAM?",
      options: ["Permanent storage", "Temporary storage", "Processing data", "Display graphics"],
      correct: "Temporary storage"
    },
    {
      question: "What does 'USB' stand for?",
      options: ["Universal Serial Bus", "Universal System Bus", "United Serial Bus", "Universal Storage Bus"],
      correct: "Universal Serial Bus"
    },
    {
      question: "Which programming language is known as the 'language of the web'?",
      options: ["Python", "Java", "JavaScript", "C++"],
      correct: "JavaScript"
    },
    {
      question: "What does 'GPU' stand for?",
      options: ["General Processing Unit", "Graphics Processing Unit", "Game Processing Unit", "Global Processing Unit"],
      correct: "Graphics Processing Unit"
    },
    {
      question: "Which company created the Android operating system?",
      options: ["Apple", "Microsoft", "Google", "Samsung"],
      correct: "Google"
    },
    {
      question: "What is the binary system based on?",
      options: ["Base 8", "Base 10", "Base 2", "Base 16"],
      correct: "Base 2"
    }
  ],
  'Entertainment': [
    {
      question: "Which movie won the Academy Award for Best Picture in 2020?",
      options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
      correct: "Parasite"
    },
    {
      question: "Who directed the movie 'Titanic'?",
      options: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Martin Scorsese"],
      correct: "James Cameron"
    },
    {
      question: "Which band released the album 'Abbey Road'?",
      options: ["The Rolling Stones", "Led Zeppelin", "The Beatles", "Pink Floyd"],
      correct: "The Beatles"
    },
    {
      question: "What is the highest-grossing film of all time?",
      options: ["Titanic", "Avatar", "Avengers: Endgame", "Star Wars: The Force Awakens"],
      correct: "Avatar"
    },
    {
      question: "Who played Jack Sparrow in Pirates of the Caribbean?",
      options: ["Orlando Bloom", "Johnny Depp", "Brad Pitt", "Leonardo DiCaprio"],
      correct: "Johnny Depp"
    },
    {
      question: "Which TV series features dragons and the Iron Throne?",
      options: ["The Witcher", "Game of Thrones", "Vikings", "The Last Kingdom"],
      correct: "Game of Thrones"
    },
    {
      question: "Who composed the music for Star Wars?",
      options: ["Hans Zimmer", "John Williams", "Danny Elfman", "James Horner"],
      correct: "John Williams"
    },
    {
      question: "Which streaming service produced 'Stranger Things'?",
      options: ["Amazon Prime", "Hulu", "Netflix", "Disney+"],
      correct: "Netflix"
    },
    {
      question: "What is the real name of rapper Eminem?",
      options: ["Marshall Mathers", "Calvin Broadus", "Curtis Jackson", "Andre Young"],
      correct: "Marshall Mathers"
    },
    {
      question: "Which movie features the quote 'May the Force be with you'?",
      options: ["Star Trek", "Star Wars", "Guardians of the Galaxy", "Interstellar"],
      correct: "Star Wars"
    },
    {
      question: "Who won the first season of American Idol?",
      options: ["Justin Guarini", "Kelly Clarkson", "Ruben Studdard", "Clay Aiken"],
      correct: "Kelly Clarkson"
    },
    {
      question: "Which animated movie features the song 'Let It Go'?",
      options: ["Moana", "Tangled", "Frozen", "The Little Mermaid"],
      correct: "Frozen"
    },
    {
      question: "What is the longest-running animated TV series in the US?",
      options: ["The Flintstones", "Scooby-Doo", "The Simpsons", "Tom and Jerry"],
      correct: "The Simpsons"
    },
    {
      question: "Which superhero is known as the 'Dark Knight'?",
      options: ["Superman", "Spider-Man", "Batman", "Iron Man"],
      correct: "Batman"
    },
    {
      question: "Who created the TV series 'Friends'?",
      options: ["David Crane & Marta Kauffman", "Chuck Lorre", "Jerry Seinfeld", "Matt Groening"],
      correct: "David Crane & Marta Kauffman"
    }
  ]
};

// Category configurations
const categoryConfig = {
  'General Knowledge': {
    icon: 'fas fa-book-open',
    color: 'category-general',
    description: 'Test your general knowledge across various topics'
  },
  'Geography': {
    icon: 'fas fa-globe',
    color: 'category-geography',
    description: 'Explore the world with geography questions'
  },
  'Science': {
    icon: 'fas fa-flask',
    color: 'category-science',
    description: 'Discover scientific facts and principles'
  },
  'Arts': {
    icon: 'fas fa-palette',
    color: 'category-arts',
    description: 'Creative arts, music, and cultural knowledge'
  },
  'Technology': {
    icon: 'fas fa-laptop-code',
    color: 'category-technology',
    description: 'Modern technology and computing knowledge'
  },
  'Entertainment': {
    icon: 'fas fa-music',
    color: 'category-entertainment',
    description: 'Movies, music, TV shows, and pop culture'
  }
};

// Validation function to ensure data integrity
function validateQuizData() {
  const issues = [];
  
  Object.keys(quizData).forEach(category => {
    if (!categoryConfig[category]) {
      issues.push(`Missing config for category: ${category}`);
    }
    
    quizData[category].forEach((question, index) => {
      if (!question.question || !question.options || !question.correct) {
        issues.push(`Invalid question at ${category}[${index}]`);
      }
      
      if (question.options.length !== 4) {
        issues.push(`Question ${category}[${index}] doesn't have exactly 4 options`);
      }
      
      if (!question.options.includes(question.correct)) {
        issues.push(`Correct answer not found in options for ${category}[${index}]`);
      }
    });
  });
  
  if (issues.length > 0) {
    console.warn('Quiz data validation issues:', issues);
  }
  
  return issues.length === 0;
}

// Initialize validation
validateQuizData();
