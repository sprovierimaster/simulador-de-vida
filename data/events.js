// Events data and management
const eventsData = {
    // Eventos por faixa etária
    childhood: [
        {
            id: 'playground_fight',
            title: 'Briga no Parquinho',
            description: 'Uma criança maior está intimidando você no parquinho. O que você faz?',
            type: 'social',
            minAge: 5,
            maxAge: 10,
            options: [
                {
                    text: 'Enfrentar a criança',
                    effects: { strength: 3, charisma: 2, happiness: -5 },
                    energyCost: 10
                },
                {
                    text: 'Procurar um adulto',
                    effects: { intelligence: 2, discipline: 3, happiness: 5 },
                    energyCost: 5
                },
                {
                    text: 'Fugir correndo',
                    effects: { health: 1, happiness: -10, charisma: -3 },
                    energyCost: 5
                }
            ]
        },
        {
            id: 'lost_toy',
            title: 'Brinquedo Perdido',
            description: 'Você perdeu seu brinquedo favorito. Como você reage?',
            type: 'emotional',
            minAge: 3,
            maxAge: 8,
            options: [
                {
                    text: 'Chorar até os pais comprarem outro',
                    effects: { happiness: 10, discipline: -5, charisma: -2 },
                    energyCost: 5
                },
                {
                    text: 'Procurar o brinquedo pela casa',
                    effects: { intelligence: 3, discipline: 5, happiness: 5 },
                    energyCost: 15
                },
                {
                    text: 'Aceitar a perda e brincar com outra coisa',
                    effects: { discipline: 8, intelligence: 2, happiness: -2 },
                    energyCost: 5
                }
            ]
        }
    ],

    adolescence: [
        {
            id: 'first_crush',
            title: 'Primeira Paixão',
            description: 'Você está apaixonado(a) por alguém da escola. O que você faz?',
            type: 'romance',
            minAge: 12,
            maxAge: 17,
            options: [
                {
                    text: 'Declarar seus sentimentos',
                    effects: { charisma: 5, happiness: 10, beauty: 2 },
                    energyCost: 20
                },
                {
                    text: 'Ficar observando de longe',
                    effects: { intelligence: 2, happiness: -5, charisma: -2 },
                    energyCost: 10
                },
                {
                    text: 'Pedir ajuda aos amigos',
                    effects: { charisma: 3, happiness: 5, intelligence: 1 },
                    energyCost: 15
                }
            ]
        },
        {
            id: 'peer_pressure_drugs',
            title: 'Pressão dos Amigos',
            description: 'Seus amigos estão oferecendo drogas e pressionando você a experimentar.',
            type: 'social',
            minAge: 14,
            maxAge: 18,
            options: [
                {
                    text: 'Experimentar para não ser excluído',
                    effects: { charisma: 5, health: -15, discipline: -10, happiness: -5 },
                    energyCost: 10
                },
                {
                    text: 'Recusar firmemente',
                    effects: { discipline: 10, health: 5, charisma: -3, happiness: 5 },
                    energyCost: 15
                },
                {
                    text: 'Inventar uma desculpa e sair',
                    effects: { intelligence: 5, health: 2, charisma: -1 },
                    energyCost: 10
                }
            ]
        },
        {
            id: 'school_bullying',
            title: 'Bullying na Escola',
            description: 'Você está sendo vítima de bullying na escola. Como você lida com isso?',
            type: 'social',
            minAge: 11,
            maxAge: 17,
            options: [
                {
                    text: 'Contar para os pais e professores',
                    effects: { intelligence: 3, discipline: 5, happiness: 10, charisma: 2 },
                    energyCost: 15
                },
                {
                    text: 'Enfrentar os valentões',
                    effects: { strength: 5, charisma: 3, happiness: 5, health: -10 },
                    energyCost: 20
                },
                {
                    text: 'Tentar se isolar e aguentar',
                    effects: { happiness: -15, health: -5, discipline: -5, intelligence: 2 },
                    energyCost: 5
                }
            ]
        }
    ],

    adulthood: [
        {
            id: 'job_interview',
            title: 'Entrevista de Emprego',
            description: 'Você tem uma entrevista importante para um emprego dos sonhos.',
            type: 'career',
            minAge: 18,
            maxAge: 65,
            options: [
                {
                    text: 'Preparar-se intensivamente',
                    effects: { intelligence: 5, discipline: 3, charisma: 3 },
                    energyCost: 25
                },
                {
                    text: 'Ir sem muita preparação',
                    effects: { charisma: -2, intelligence: -1, happiness: -5 },
                    energyCost: 10
                },
                {
                    text: 'Cancelar por nervosismo',
                    effects: { happiness: -10, discipline: -5, charisma: -3 },
                    energyCost: 5
                }
            ]
        },
        {
            id: 'investment_opportunity',
            title: 'Oportunidade de Investimento',
            description: 'Um amigo oferece uma oportunidade de investimento que parece promissora.',
            type: 'financial',
            minAge: 25,
            maxAge: 60,
            options: [
                {
                    text: 'Investir uma quantia significativa',
                    effects: { intelligence: 3, happiness: 5 },
                    energyCost: 15,
                    moneyEffect: 'risk' // Pode ganhar ou perder dinheiro
                },
                {
                    text: 'Investir uma pequena quantia',
                    effects: { intelligence: 2, discipline: 3 },
                    energyCost: 10,
                    moneyEffect: 'small_risk'
                },
                {
                    text: 'Recusar o investimento',
                    effects: { discipline: 5, intelligence: 1 },
                    energyCost: 5
                }
            ]
        }
    ],

    general: [
        {
            id: 'random_illness',
            title: 'Problema de Saúde',
            description: 'Você não está se sentindo bem. O que você faz?',
            type: 'health',
            minAge: 0,
            maxAge: 100,
            options: [
                {
                    text: 'Ir ao médico imediatamente',
                    effects: { health: 15, intelligence: 2 },
                    energyCost: 20,
                    moneyEffect: 'medical_cost'
                },
                {
                    text: 'Tomar remédio caseiro',
                    effects: { health: 5, discipline: 2 },
                    energyCost: 10
                },
                {
                    text: 'Ignorar e continuar normalmente',
                    effects: { health: -10, discipline: 3, happiness: -5 },
                    energyCost: 5
                }
            ]
        },
        {
            id: 'lottery_ticket',
            title: 'Bilhete de Loteria',
            description: 'Você encontra um bilhete de loteria no chão. O que você faz?',
            type: 'luck',
            minAge: 18,
            maxAge: 100,
            options: [
                {
                    text: 'Verificar se ganhou',
                    effects: { happiness: 5, intelligence: 1 },
                    energyCost: 5,
                    moneyEffect: 'lottery'
                },
                {
                    text: 'Entregar na polícia',
                    effects: { discipline: 8, charisma: 3, happiness: 5 },
                    energyCost: 15
                },
                {
                    text: 'Ignorar e seguir em frente',
                    effects: { discipline: 2 },
                    energyCost: 0
                }
            ]
        }
    ]
};

// Event management functions
function getAvailableEvents(age) {
    let availableEvents = [];
    
    // Adicionar eventos gerais
    availableEvents = availableEvents.concat(eventsData.general);
    
    // Adicionar eventos por faixa etária
    if (age <= 12) {
        availableEvents = availableEvents.concat(eventsData.childhood);
    } else if (age <= 18) {
        availableEvents = availableEvents.concat(eventsData.adolescence);
    } else {
        availableEvents = availableEvents.concat(eventsData.adulthood);
    }
    
    // Filtrar eventos por idade específica
    return availableEvents.filter(event => 
        age >= event.minAge && age <= event.maxAge
    );
}

function getRandomEvent(age) {
    const availableEvents = getAvailableEvents(age);
    if (availableEvents.length === 0) return null;
    
    return getRandomElement(availableEvents);
}

function processEventChoice(event, optionIndex, character) {
    const option = event.options[optionIndex];
    const effects = { ..option.effects };
    
    // Aplicar efeitos nos atributos
    Object.keys(effects).forEach(attribute => {
        if (character.attributes[attribute] !== undefined) {
            character.attributes[attribute] += effects[attribute];
            // Manter atributos entre 0 e 100
            character.attributes[attribute] = Math.max(0, Math.min(100, character.attributes[attribute]));
        }
    });
    
    // Processar efeitos especiais de dinheiro
    if (option.moneyEffect) {
        processMoneyEffect(option.moneyEffect, character);
    }
    
    // Reduzir energia
    character.energy -= option.energyCost;
    character.energy = Math.max(0, character.energy);
    
    // Adicionar ao histórico
    const historyEntry = {
        year: character.age,
        event: event.title,
        choice: option.text,
        effects: effects
    };
    
    character.history.push(historyEntry);
    
    return historyEntry;
}

function processMoneyEffect(effect, character) {
    switch (effect) {
        case 'risk':
            // 60% chance de ganhar, 40% de perder
            if (Math.random() < 0.6) {
                const gain = Math.floor(character.familyMoney * 0.2);
                character.familyMoney += gain;
            } else {
                const loss = Math.floor(character.familyMoney * 0.15);
                character.familyMoney -= loss;
            }
            break;
            
        case 'small_risk':
            // 70% chance de ganhar pouco, 30% de perder pouco
            if (Math.random() < 0.7) {
                const gain = Math.floor(character.familyMoney * 0.05);
                character.familyMoney += gain;
            } else {
                const loss = Math.floor(character.familyMoney * 0.03);
                character.familyMoney -= loss;
            }
            break;
            
        case 'medical_cost':
            // Custo médico baseado na classe social
            const cost = Math.floor(character.familyMoney * 0.02);
            character.familyMoney -= cost;
            break;
            
        case 'lottery':
            // 1% chance de ganhar muito, 99% de não ganhar nada
            if (Math.random() < 0.01) {
                const prize = getRandomNumber(10000, 100000);
                character.familyMoney += prize;
            }
            break;
    }
    
    // Garantir que o dinheiro não fique negativo
    character.familyMoney = Math.max(0, character.familyMoney);
}


    // Additional events for more variety
    career: [
        {
            id: 'promotion_opportunity',
            title: 'Oportunidade de Promoção',
            description: 'Seu chefe ofereceu uma promoção, mas você precisará trabalhar mais horas.',
            type: 'career',
            minAge: 22,
            maxAge: 65,
            options: [
                {
                    text: 'Aceitar a promoção',
                    effects: { intelligence: 3, discipline: 5, happiness: 10, health: -5 },
                    energyCost: 20,
                    moneyEffect: 'promotion'
                },
                {
                    text: 'Recusar educadamente',
                    effects: { happiness: -5, discipline: 2 },
                    energyCost: 5
                },
                {
                    text: 'Negociar melhores condições',
                    effects: { charisma: 5, intelligence: 3 },
                    energyCost: 15,
                    moneyEffect: 'negotiation'
                }
            ]
        },
        {
            id: 'workplace_conflict',
            title: 'Conflito no Trabalho',
            description: 'Você está tendo problemas com um colega de trabalho.',
            type: 'career',
            minAge: 18,
            maxAge: 65,
            options: [
                {
                    text: 'Confrontar diretamente',
                    effects: { charisma: -3, strength: 3, happiness: -5 },
                    energyCost: 15
                },
                {
                    text: 'Procurar o RH',
                    effects: { intelligence: 3, discipline: 5, charisma: 2 },
                    energyCost: 20
                },
                {
                    text: 'Ignorar e focar no trabalho',
                    effects: { discipline: 8, happiness: -3, health: -2 },
                    energyCost: 10
                }
            ]
        }
    ],

        {
            id: 'party_invitation',
            title: 'Convite para Festa',
            description: 'Você foi convidado para uma festa, mas tem trabalho importante no dia seguinte.',
            type: 'social',
            minAge: 16,
            maxAge: 40,
            options: [
                {
                    text: 'Ir à festa e se divertir',
                    effects: { happiness: 15, charisma: 5, health: -5, discipline: -3 },
                    energyCost: 25
                },
                {
                    text: 'Ir por pouco tempo',
                    effects: { happiness: 8, charisma: 3, discipline: 2 },
                    energyCost: 15
                },
                {
                    text: 'Ficar em casa estudando/trabalhando',
                    effects: { intelligence: 5, discipline: 8, happiness: -5 },
                    energyCost: 20
                }
            ]
        },
        {
            id: 'charity_volunteer',
            title: 'Trabalho Voluntário',
            description: 'Uma organização de caridade está procurando voluntários.',
            type: 'social',
            minAge: 16,
            maxAge: 80,
            options: [
                {
                    text: 'Dedicar tempo regularmente',
                    effects: { happiness: 20, charisma: 8, discipline: 5 },
                    energyCost: 30
                },
                {
                    text: 'Ajudar ocasionalmente',
                    effects: { happiness: 10, charisma: 4 },
                    energyCost: 15
                },
                {
                    text: 'Doar dinheiro em vez de tempo',
                    effects: { happiness: 5 },
                    energyCost: 5,
                    moneyEffect: 'charity'
                }
            ]
        }

    family: [
        {
            id: 'family_emergency',
            title: 'Emergência Familiar',
            description: 'Um parente próximo precisa de ajuda financeira urgente.',
            type: 'family',
            minAge: 18,
            maxAge: 80,
            options: [
                {
                    text: 'Ajudar com uma quantia significativa',
                    effects: { happiness: 10, charisma: 5 },
                    energyCost: 10,
                    moneyEffect: 'family_help_large'
                },
                {
                    text: 'Ajudar com o que puder',
                    effects: { happiness: 5, charisma: 2 },
                    energyCost: 5,
                    moneyEffect: 'family_help_small'
                },
                {
                    text: 'Explicar que não pode ajudar',
                    effects: { happiness: -10, charisma: -3 },
                    energyCost: 5
                }
            ]
        },
        {
            id: 'family_reunion',
            title: 'Reunião de Família',
            description: 'Sua família está organizando uma grande reunião.',
            type: 'family',
            minAge: 10,
            maxAge: 80,
            options: [
                {
                    text: 'Participar ativamente da organização',
                    effects: { happiness: 15, charisma: 8, discipline: 3 },
                    energyCost: 25,
                    moneyEffect: 'family_event'
                },
                {
                    text: 'Comparecer apenas',
                    effects: { happiness: 8, charisma: 3 },
                    energyCost: 15
                },
                {
                    text: 'Inventar uma desculpa',
                    effects: { happiness: -5, charisma: -5 },
                    energyCost: 5
                }
            ]
        }
    ],

    lifestyle: [
        {
            id: 'new_hobby',
            title: 'Novo Hobby',
            description: 'Você descobriu um hobby interessante que gostaria de experimentar.',
            type: 'lifestyle',
            minAge: 8,
            maxAge: 80,
            options: [
                {
                    text: 'Dedicar-se intensamente',
                    effects: { happiness: 20, intelligence: 5, discipline: 8 },
                    energyCost: 30,
                    moneyEffect: 'hobby_expensive'
                },
                {
                    text: 'Experimentar casualmente',
                    effects: { happiness: 10, intelligence: 2 },
                    energyCost: 15,
                    moneyEffect: 'hobby_cheap'
                },
                {
                    text: 'Apenas pesquisar sobre',
                    effects: { intelligence: 3, happiness: 2 },
                    energyCost: 5
                }
            ]
        },
        {
            id: 'travel_opportunity',
            title: 'Oportunidade de Viagem',
            description: 'Você tem a chance de fazer uma viagem interessante.',
            type: 'lifestyle',
            minAge: 16,
            maxAge: 80,
            options: [
                {
                    text: 'Fazer uma viagem luxuosa',
                    effects: { happiness: 25, charisma: 5, beauty: 3 },
                    energyCost: 20,
                    moneyEffect: 'travel_luxury'
                },
                {
                    text: 'Viajar com orçamento limitado',
                    effects: { happiness: 15, intelligence: 3, discipline: 5 },
                    energyCost: 25,
                    moneyEffect: 'travel_budget'
                },
                {
                    text: 'Economizar para o futuro',
                    effects: { discipline: 8, happiness: -3 },
                    energyCost: 5
                }
            ]
        }
    ]
};

// Enhanced money effects
function processMoneyEffect(effect, character) {
    switch (effect) {
        case 'risk':
            if (Math.random() < 0.6) {
                const gain = Math.floor(character.familyMoney * 0.2);
                character.familyMoney += gain;
            } else {
                const loss = Math.floor(character.familyMoney * 0.15);
                character.familyMoney -= loss;
            }
            break;
            
        case 'small_risk':
            if (Math.random() < 0.7) {
                const gain = Math.floor(character.familyMoney * 0.05);
                character.familyMoney += gain;
            } else {
                const loss = Math.floor(character.familyMoney * 0.03);
                character.familyMoney -= loss;
            }
            break;
            
        case 'medical_cost':
            const cost = Math.floor(character.familyMoney * 0.02);
            character.familyMoney -= cost;
            break;
            
        case 'lottery':
            if (Math.random() < 0.01) {
                const prize = getRandomNumber(10000, 100000);
                character.familyMoney += prize;
            }
            break;
            
        case 'promotion':
            const promotionBonus = Math.floor(character.familyMoney * 0.3);
            character.familyMoney += promotionBonus;
            break;
            
        case 'negotiation':
            if (character.attributes.charisma > 50) {
                const bonus = Math.floor(character.familyMoney * 0.2);
                character.familyMoney += bonus;
            } else {
                const bonus = Math.floor(character.familyMoney * 0.1);
                character.familyMoney += bonus;
            }
            break;
            
        case 'charity':
            const donation = Math.floor(character.familyMoney * 0.05);
            character.familyMoney -= donation;
            break;
            
        case 'family_help_large':
            const largeHelp = Math.floor(character.familyMoney * 0.15);
            character.familyMoney -= largeHelp;
            break;
            
        case 'family_help_small':
            const smallHelp = Math.floor(character.familyMoney * 0.05);
            character.familyMoney -= smallHelp;
            break;
            
        case 'family_event':
            const eventCost = Math.floor(character.familyMoney * 0.03);
            character.familyMoney -= eventCost;
            break;
            
        case 'hobby_expensive':
            const expensiveHobby = Math.floor(character.familyMoney * 0.08);
            character.familyMoney -= expensiveHobby;
            break;
            
        case 'hobby_cheap':
            const cheapHobby = Math.floor(character.familyMoney * 0.02);
            character.familyMoney -= cheapHobby;
            break;
            
        case 'travel_luxury':
            const luxuryTravel = Math.floor(character.familyMoney * 0.2);
            character.familyMoney -= luxuryTravel;
            break;
            
        case 'travel_budget':
            const budgetTravel = Math.floor(character.familyMoney * 0.08);
            character.familyMoney -= budgetTravel;
            break;
    }
    
    character.familyMoney = Math.max(0, character.familyMoney);
}

// Enhanced event selection based on character state
function getContextualEvents(character) {
    let availableEvents = getAvailableEvents(character.age);
    
    // Filter events based on character's situation
    const contextualEvents = availableEvents.filter(event => {
        // Career events only for working characters
        if (event.type === 'career' && !character.career.type) {
            return false;
        }
        
        // Family events more likely for older characters
        if (event.type === 'family' && character.age < 25 && Math.random() < 0.3) {
            return false;
        }
        
        // Social events less likely for very disciplined characters
        if (event.type === 'social' && character.attributes.discipline > 80 && Math.random() < 0.4) {
            return false;
        }
        
        return true;
    });
    
    return contextualEvents;
}

// Enhanced random event trigger
function getSmartRandomEvent(character) {
    const contextualEvents = getContextualEvents(character);
    if (contextualEvents.length === 0) return null;
    
    // Weight events based on character attributes and situation
    const weightedEvents = contextualEvents.map(event => {
        let weight = 1;
        
        // Increase weight for relevant events
        if (event.type === 'career' && character.attributes.intelligence > 60) weight += 0.5;
        if (event.type === 'social' && character.attributes.charisma > 60) weight += 0.5;
        if (event.type === 'health' && character.attributes.health < 50) weight += 0.8;
        if (event.type === 'family' && character.age > 30) weight += 0.3;
        
        return { event, weight };
    });
    
    // Select event based on weights
    const totalWeight = weightedEvents.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const item of weightedEvents) {
        random -= item.weight;
        if (random <= 0) {
            return item.event;
        }
    }
    
    return weightedEvents[0].event;
}

