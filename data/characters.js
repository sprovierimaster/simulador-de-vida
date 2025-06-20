// Character data and generation functions
const characterData = {
    countries: {
        'brasil': {
            name: 'Brasil',
            cities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
            currency: 'R$',
            socialClasses: {
                'pobre': { money: [500, 2000], influence: [1, 10] },
                'classe média': { money: [3000, 8000], influence: [10, 30] },
                'rico': { money: [10000, 50000], influence: [30, 80] }
            }
        },
        'eua': {
            name: 'Estados Unidos',
            cities: ['Nova York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Filadélfia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
            currency: '$',
            socialClasses: {
                'pobre': { money: [1000, 3000], influence: [1, 10] },
                'classe média': { money: [4000, 12000], influence: [10, 30] },
                'rico': { money: [15000, 80000], influence: [30, 90] }
            }
        },
        'canada': {
            name: 'Canadá',
            cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec', 'Hamilton', 'Kitchener'],
            currency: 'C$',
            socialClasses: {
                'pobre': { money: [800, 2500], influence: [1, 10] },
                'classe média': { money: [3500, 10000], influence: [10, 30] },
                'rico': { money: [12000, 60000], influence: [30, 85] }
            }
        },
        'reino-unido': {
            name: 'Reino Unido',
            cities: ['Londres', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Cardiff'],
            currency: '£',
            socialClasses: {
                'pobre': { money: [800, 2200], influence: [1, 10] },
                'classe média': { money: [3000, 9000], influence: [10, 30] },
                'rico': { money: [11000, 55000], influence: [30, 85] }
            }
        },
        'franca': {
            name: 'França',
            cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
            currency: '€',
            socialClasses: {
                'pobre': { money: [700, 2000], influence: [1, 10] },
                'classe média': { money: [2800, 8500], influence: [10, 30] },
                'rico': { money: [10000, 50000], influence: [30, 80] }
            }
        },
        'alemanha': {
            name: 'Alemanha',
            cities: ['Berlim', 'Hamburgo', 'Munique', 'Colônia', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
            currency: '€',
            socialClasses: {
                'pobre': { money: [900, 2500], influence: [1, 10] },
                'classe média': { money: [3200, 9500], influence: [10, 30] },
                'rico': { money: [12000, 60000], influence: [30, 85] }
            }
        },
        'japao': {
            name: 'Japão',
            cities: ['Tóquio', 'Osaka', 'Yokohama', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama'],
            currency: '¥',
            socialClasses: {
                'pobre': { money: [50000, 150000], influence: [1, 10] },
                'classe média': { money: [200000, 600000], influence: [10, 30] },
                'rico': { money: [800000, 3000000], influence: [30, 85] }
            }
        },
        'australia': {
            name: 'Austrália',
            cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong'],
            currency: 'A$',
            socialClasses: {
                'pobre': { money: [1200, 3500], influence: [1, 10] },
                'classe média': { money: [4500, 13000], influence: [10, 30] },
                'rico': { money: [16000, 75000], influence: [30, 90] }
            }
        }
    },

    firstNames: {
        masculino: ['João', 'Pedro', 'Lucas', 'Gabriel', 'Rafael', 'Daniel', 'Matheus', 'Felipe', 'Bruno', 'André', 'Carlos', 'Diego', 'Eduardo', 'Fernando', 'Gustavo', 'Henrique', 'Igor', 'José', 'Leonardo', 'Marcelo'],
        feminino: ['Maria', 'Ana', 'Beatriz', 'Carla', 'Daniela', 'Eduarda', 'Fernanda', 'Gabriela', 'Helena', 'Isabela', 'Juliana', 'Larissa', 'Letícia', 'Mariana', 'Natália', 'Patrícia', 'Rafaela', 'Sabrina', 'Tatiana', 'Vanessa']
    },

    lastNames: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa', 'Rocha', 'Dias', 'Monteiro', 'Cardoso', 'Reis']
};

// Utility functions for character generation
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomName(gender) {
    const firstName = getRandomElement(characterData.firstNames[gender]);
    const lastName = getRandomElement(characterData.lastNames);
    return { firstName, lastName };
}

function generateRandomCity(country) {
    const countryData = characterData.countries[country];
    return getRandomElement(countryData.cities);
}

function generateSocialClass() {
    const classes = ['pobre', 'classe média', 'rico'];
    const weights = [40, 50, 10]; // 40% pobre, 50% classe média, 10% rico
    
    const random = Math.random() * 100;
    let cumulative = 0;
    
    for (let i = 0; i < classes.length; i++) {
        cumulative += weights[i];
        if (random <= cumulative) {
            return classes[i];
        }
    }
    
    return 'classe média'; // fallback
}

function generateFamilyStats(country, socialClass) {
    const countryData = characterData.countries[country];
    const classData = countryData.socialClasses[socialClass];
    
    const money = getRandomNumber(classData.money[0], classData.money[1]);
    const influence = getRandomNumber(classData.influence[0], classData.influence[1]);
    
    return { money, influence, currency: countryData.currency };
}

function generateInitialAttributes() {
    return {
        intelligence: getRandomNumber(10, 30),
        health: getRandomNumber(70, 100),
        beauty: getRandomNumber(10, 30),
        charisma: getRandomNumber(10, 30),
        strength: getRandomNumber(10, 30),
        discipline: getRandomNumber(5, 25),
        happiness: getRandomNumber(60, 90)
    };
}

