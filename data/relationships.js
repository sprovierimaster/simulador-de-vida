// Relationships and health system
const relationshipsData = {
    types: {
        family: {
            name: 'Família',
            maxRelationship: 100,
            decayRate: 0.5, // How much relationship decreases per year without interaction
            interactions: [
                {
                    name: 'Passar tempo juntos',
                    effect: 8,
                    energyCost: 15,
                    description: 'Dedicar tempo de qualidade com a família'
                },
                {
                    name: 'Ligar regularmente',
                    effect: 4,
                    energyCost: 5,
                    description: 'Manter contato por telefone'
                },
                {
                    name: 'Ajudar financeiramente',
                    effect: 12,
                    energyCost: 10,
                    moneyEffect: 'family_support',
                    description: 'Oferecer suporte financeiro'
                }
            ]
        },
        friends: {
            name: 'Amigos',
            maxRelationship: 100,
            decayRate: 1.0,
            interactions: [
                {
                    name: 'Sair juntos',
                    effect: 10,
                    energyCost: 20,
                    description: 'Passar tempo se divertindo com amigos'
                },
                {
                    name: 'Conversar online',
                    effect: 3,
                    energyCost: 5,
                    description: 'Manter contato pelas redes sociais'
                },
                {
                    name: 'Organizar evento',
                    effect: 15,
                    energyCost: 30,
                    moneyEffect: 'social_event',
                    description: 'Organizar uma festa ou encontro'
                }
            ]
        },
        romantic: {
            name: 'Relacionamento Amoroso',
            maxRelationship: 100,
            decayRate: 2.0,
            interactions: [
                {
                    name: 'Encontro romântico',
                    effect: 15,
                    energyCost: 25,
                    moneyEffect: 'date',
                    description: 'Ter um encontro especial'
                },
                {
                    name: 'Conversar sobre sentimentos',
                    effect: 8,
                    energyCost: 15,
                    description: 'Ter uma conversa profunda'
                },
                {
                    name: 'Dar presente',
                    effect: 12,
                    energyCost: 10,
                    moneyEffect: 'gift',
                    description: 'Demonstrar carinho com um presente'
                }
            ]
        }
    }
};

const healthData = {
    conditions: [
        {
            name: 'Resfriado',
            severity: 'mild',
            duration: 2, // years
            effects: { health: -5, happiness: -3 },
            treatmentCost: 100,
            description: 'Um resfriado comum que afeta seu bem-estar'
        },
        {
            name: 'Estresse',
            severity: 'mild',
            duration: 1,
            effects: { health: -8, happiness: -10, discipline: -5 },
            treatmentCost: 300,
            description: 'Níveis elevados de estresse afetando sua saúde mental'
        },
        {
            name: 'Lesão Esportiva',
            severity: 'moderate',
            duration: 3,
            effects: { health: -15, strength: -10, happiness: -5 },
            treatmentCost: 800,
            description: 'Uma lesão que limita suas atividades físicas'
        },
        {
            name: 'Depressão',
            severity: 'severe',
            duration: 5,
            effects: { health: -10, happiness: -25, charisma: -8, discipline: -10 },
            treatmentCost: 1500,
            description: 'Condição séria que afeta significativamente sua qualidade de vida'
        }
    ],

    treatments: {
        'Resfriado': [
            { name: 'Descansar em casa', cost: 0, effectiveness: 0.6 },
            { name: 'Remédios da farmácia', cost: 50, effectiveness: 0.8 },
            { name: 'Consulta médica', cost: 150, effectiveness: 0.95 }
        ],
        'Estresse': [
            { name: 'Meditação e relaxamento', cost: 0, effectiveness: 0.5 },
            { name: 'Terapia online', cost: 200, effectiveness: 0.7 },
            { name: 'Psicólogo profissional', cost: 500, effectiveness: 0.9 }
        ],
        'Lesão Esportiva': [
            { name: 'Repouso e gelo', cost: 0, effectiveness: 0.4 },
            { name: 'Fisioterapia', cost: 400, effectiveness: 0.8 },
            { name: 'Cirurgia', cost: 2000, effectiveness: 0.95 }
        ],
        'Depressão': [
            { name: 'Apoio de amigos e família', cost: 0, effectiveness: 0.3 },
            { name: 'Terapia e medicação', cost: 800, effectiveness: 0.7 },
            { name: 'Tratamento intensivo', cost: 2500, effectiveness: 0.9 }
        ]
    }
};

// Relationship management functions
function initializeRelationships(character) {
    character.relationships = {
        family: {
            level: getRandomNumber(60, 90),
            type: 'family'
        },
        friends: {
            level: getRandomNumber(40, 70),
            type: 'friends'
        }
    };
}

function addRomanticRelationship(character) {
    if (!character.relationships.romantic) {
        character.relationships.romantic = {
            level: getRandomNumber(20, 50),
            type: 'romantic',
            partnerName: generateRandomName()
        };
    }
}

function updateRelationship(character, relationshipType, interactionName) {
    const relationship = character.relationships[relationshipType];
    if (!relationship) return null;

    const relationshipData = relationshipsData.types[relationship.type];
    const interaction = relationshipData.interactions.find(i => i.name === interactionName);
    
    if (!interaction) return null;

    // Apply relationship improvement
    relationship.level += interaction.effect;
    relationship.level = Math.min(relationshipData.maxRelationship, relationship.level);

    // Apply energy cost
    character.energy -= interaction.energyCost;
    character.energy = Math.max(0, character.energy);

    // Apply money effect if any
    if (interaction.moneyEffect) {
        processRelationshipMoneyEffect(interaction.moneyEffect, character);
    }

    // Apply happiness bonus based on relationship level
    const happinessBonus = Math.floor(relationship.level / 20);
    character.attributes.happiness += happinessBonus;
    character.attributes.happiness = Math.min(100, character.attributes.happiness);

    return {
        relationshipGain: interaction.effect,
        happinessGain: happinessBonus,
        energyCost: interaction.energyCost
    };
}

function decayRelationships(character) {
    Object.keys(character.relationships).forEach(relationshipType => {
        const relationship = character.relationships[relationshipType];
        const relationshipData = relationshipsData.types[relationship.type];
        
        relationship.level -= relationshipData.decayRate;
        relationship.level = Math.max(0, relationship.level);
        
        // Remove romantic relationship if it gets too low
        if (relationship.type === 'romantic' && relationship.level < 10) {
            delete character.relationships.romantic;
        }
    });
}

// Health management functions
function initializeHealth(character) {
    character.health = {
        conditions: [],
        lastCheckup: 0
    };
}

function checkForHealthConditions(character) {
    // Base chance of getting a condition
    let conditionChance = 0.05;
    
    // Increase chance based on poor health
    if (character.attributes.health < 30) conditionChance += 0.1;
    if (character.attributes.health < 50) conditionChance += 0.05;
    
    // Increase chance with age
    if (character.age > 40) conditionChance += 0.02;
    if (character.age > 60) conditionChance += 0.05;
    
    // Decrease chance with good lifestyle
    if (character.attributes.discipline > 70) conditionChance -= 0.02;
    if (character.attributes.strength > 70) conditionChance -= 0.02;
    
    if (Math.random() < conditionChance) {
        const availableConditions = healthData.conditions.filter(condition => 
            !character.health.conditions.some(existing => existing.name === condition.name)
        );
        
        if (availableConditions.length > 0) {
            const newCondition = availableConditions[Math.floor(Math.random() * availableConditions.length)];
            character.health.conditions.push({
                ...newCondition,
                yearsRemaining: newCondition.duration
            });
            
            return newCondition;
        }
    }
    
    return null;
}

function updateHealthConditions(character) {
    character.health.conditions = character.health.conditions.filter(condition => {
        // Apply condition effects
        Object.keys(condition.effects).forEach(attr => {
            character.attributes[attr] += condition.effects[attr];
            character.attributes[attr] = Math.max(0, Math.min(100, character.attributes[attr]));
        });
        
        // Decrease duration
        condition.yearsRemaining--;
        
        // Remove if duration is over
        return condition.yearsRemaining > 0;
    });
}

function treatHealthCondition(character, conditionName, treatmentName) {
    const condition = character.health.conditions.find(c => c.name === conditionName);
    if (!condition) return null;
    
    const treatments = healthData.treatments[conditionName];
    const treatment = treatments.find(t => t.name === treatmentName);
    if (!treatment) return null;
    
    // Pay treatment cost
    if (treatment.cost > character.familyMoney) {
        return { success: false, reason: 'Dinheiro insuficiente' };
    }
    
    character.familyMoney -= treatment.cost;
    character.familyMoney = Math.max(0, character.familyMoney);
    
    // Check if treatment is successful
    if (Math.random() < treatment.effectiveness) {
        // Remove condition
        character.health.conditions = character.health.conditions.filter(c => c.name !== conditionName);
        
        // Restore some health
        character.attributes.health += 10;
        character.attributes.health = Math.min(100, character.attributes.health);
        
        return { success: true, cured: true, cost: treatment.cost };
    } else {
        // Reduce condition duration
        condition.yearsRemaining = Math.max(1, condition.yearsRemaining - 1);
        
        return { success: true, cured: false, cost: treatment.cost };
    }
}

// Money effects for relationships
function processRelationshipMoneyEffect(effect, character) {
    switch (effect) {
        case 'family_support':
            const support = Math.floor(character.familyMoney * 0.08);
            character.familyMoney -= support;
            break;
        case 'social_event':
            const eventCost = Math.floor(character.familyMoney * 0.05);
            character.familyMoney -= eventCost;
            break;
        case 'date':
            const dateCost = Math.floor(character.familyMoney * 0.03);
            character.familyMoney -= dateCost;
            break;
        case 'gift':
            const giftCost = Math.floor(character.familyMoney * 0.02);
            character.familyMoney -= giftCost;
            break;
    }
    
    character.familyMoney = Math.max(0, character.familyMoney);
}

// Utility function for random names
function generateRandomName() {
    const names = [
        'Ana', 'Carlos', 'Maria', 'João', 'Fernanda', 'Pedro', 'Juliana', 'Rafael',
        'Camila', 'Lucas', 'Beatriz', 'Gabriel', 'Larissa', 'Thiago', 'Amanda', 'Bruno'
    ];
    return names[Math.floor(Math.random() * names.length)];
}

