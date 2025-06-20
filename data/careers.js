// Career data and management
const careersData = {
    sports: {
        name: 'Carreira Esportiva',
        description: 'Dedique-se aos esportes e torne-se um atleta profissional',
        requirements: {
            minAge: 8,
            attributes: {
                strength: 20,
                discipline: 15,
                health: 30
            }
        },
        stages: [
            {
                name: 'Iniciante',
                description: 'Começando nos esportes locais',
                minAge: 8,
                maxAge: 15,
                actions: [
                    {
                        name: 'Treinar Força',
                        description: 'Focar no desenvolvimento da força física',
                        effects: { strength: 8, health: 5, discipline: 3 },
                        energyCost: 25,
                        requirements: { health: 20 }
                    },
                    {
                        name: 'Treinar Resistência',
                        description: 'Melhorar a resistência cardiovascular',
                        effects: { health: 10, strength: 3, discipline: 5 },
                        energyCost: 30,
                        requirements: { health: 25 }
                    },
                    {
                        name: 'Participar de Competições Locais',
                        description: 'Competir em torneios da região',
                        effects: { charisma: 5, strength: 3, happiness: 8 },
                        energyCost: 35,
                        requirements: { strength: 25, health: 30 }
                    }
                ]
            },
            {
                name: 'Amador',
                description: 'Competindo em nível amador',
                minAge: 14,
                maxAge: 22,
                actions: [
                    {
                        name: 'Treinar com Técnico',
                        description: 'Contratar um técnico profissional',
                        effects: { strength: 6, discipline: 8, intelligence: 3 },
                        energyCost: 30,
                        requirements: { discipline: 20 },
                        moneyCost: 500
                    },
                    {
                        name: 'Competir Regionalmente',
                        description: 'Participar de competições regionais',
                        effects: { charisma: 8, strength: 5, happiness: 10 },
                        energyCost: 40,
                        requirements: { strength: 35, health: 40 }
                    },
                    {
                        name: 'Buscar Patrocínio',
                        description: 'Procurar empresas para patrocinar sua carreira',
                        effects: { charisma: 10, intelligence: 5 },
                        energyCost: 25,
                        requirements: { charisma: 25 },
                        moneyGain: 2000
                    }
                ]
            },
            {
                name: 'Semi-Profissional',
                description: 'Transição para o esporte profissional',
                minAge: 18,
                maxAge: 30,
                actions: [
                    {
                        name: 'Treinar Intensivamente',
                        description: 'Treinos de alta intensidade',
                        effects: { strength: 10, health: 8, discipline: 10 },
                        energyCost: 45,
                        requirements: { health: 50, discipline: 30 }
                    },
                    {
                        name: 'Competir Nacionalmente',
                        description: 'Participar de competições nacionais',
                        effects: { charisma: 12, strength: 8, happiness: 15 },
                        energyCost: 50,
                        requirements: { strength: 50, health: 55 },
                        moneyGain: 5000
                    },
                    {
                        name: 'Contratar Agente',
                        description: 'Ter um agente para gerenciar sua carreira',
                        effects: { intelligence: 8, charisma: 6 },
                        energyCost: 20,
                        requirements: { charisma: 35 },
                        moneyCost: 1000,
                        moneyGain: 3000
                    }
                ]
            },
            {
                name: 'Profissional',
                description: 'Atleta profissional de elite',
                minAge: 20,
                maxAge: 40,
                actions: [
                    {
                        name: 'Competir Internacionalmente',
                        description: 'Participar de competições internacionais',
                        effects: { charisma: 15, strength: 10, happiness: 20 },
                        energyCost: 60,
                        requirements: { strength: 70, health: 70, charisma: 40 },
                        moneyGain: 15000
                    },
                    {
                        name: 'Treinar para Olimpíadas',
                        description: 'Preparação para competições olímpicas',
                        effects: { strength: 15, discipline: 15, health: 10 },
                        energyCost: 70,
                        requirements: { strength: 80, health: 80, discipline: 60 }
                    },
                    {
                        name: 'Fazer Publicidade',
                        description: 'Participar de campanhas publicitárias',
                        effects: { charisma: 10, happiness: 8 },
                        energyCost: 25,
                        requirements: { charisma: 50 },
                        moneyGain: 10000
                    }
                ]
            }
        ]
    },

    // Placeholder para futuras carreiras
    academic: {
        name: 'Carreira Acadêmica',
        description: 'Dedique-se aos estudos e pesquisa',
        requirements: {
            minAge: 18,
            attributes: {
                intelligence: 40,
                discipline: 30
            }
        },
        stages: [] // Será implementado futuramente
    },

    business: {
        name: 'Carreira Empresarial',
        description: 'Construa um império nos negócios',
        requirements: {
            minAge: 18,
            attributes: {
                intelligence: 30,
                charisma: 35,
                discipline: 25
            }
        },
        stages: [] // Será implementado futuramente
    }
};

// Career management functions
function getAvailableCareers(character) {
    const availableCareers = [];
    
    Object.keys(careersData).forEach(careerKey => {
        const career = careersData[careerKey];
        
        // Verificar idade mínima
        if (character.age >= career.requirements.minAge) {
            // Verificar requisitos de atributos
            let meetsRequirements = true;
            
            Object.keys(career.requirements.attributes).forEach(attribute => {
                if (character.attributes[attribute] < career.requirements.attributes[attribute]) {
                    meetsRequirements = false;
                }
            });
            
            if (meetsRequirements) {
                availableCareers.push({
                    key: careerKey,
                    ...career
                });
            }
        }
    });
    
    return availableCareers;
}

function getCurrentCareerStage(character) {
    if (!character.career.type) return null;
    
    const career = careersData[character.career.type];
    if (!career) return null;
    
    // Encontrar o estágio atual baseado na idade e progresso
    for (let stage of career.stages) {
        if (character.age >= stage.minAge && character.age <= stage.maxAge) {
            return stage;
        }
    }
    
    return null;
}

function getAvailableCareerActions(character) {
    const currentStage = getCurrentCareerStage(character);
    if (!currentStage) return [];
    
    return currentStage.actions.filter(action => {
        // Verificar requisitos de atributos
        if (action.requirements) {
            for (let attribute in action.requirements) {
                if (character.attributes[attribute] < action.requirements[attribute]) {
                    return false;
                }
            }
        }
        
        // Verificar se tem dinheiro suficiente
        if (action.moneyCost && character.familyMoney < action.moneyCost) {
            return false;
        }
        
        // Verificar se tem energia suficiente
        if (character.energy < action.energyCost) {
            return false;
        }
        
        return true;
    });
}

function executeCareerAction(character, actionName) {
    const currentStage = getCurrentCareerStage(character);
    if (!currentStage) return null;
    
    const action = currentStage.actions.find(a => a.name === actionName);
    if (!action) return null;
    
    // Aplicar efeitos nos atributos
    Object.keys(action.effects).forEach(attribute => {
        if (character.attributes[attribute] !== undefined) {
            character.attributes[attribute] += action.effects[attribute];
            character.attributes[attribute] = Math.max(0, Math.min(100, character.attributes[attribute]));
        }
    });
    
    // Processar custos e ganhos monetários
    if (action.moneyCost) {
        character.familyMoney -= action.moneyCost;
    }
    
    if (action.moneyGain) {
        character.familyMoney += action.moneyGain;
    }
    
    // Reduzir energia
    character.energy -= action.energyCost;
    character.energy = Math.max(0, character.energy);
    
    // Adicionar ao histórico
    const historyEntry = {
        year: character.age,
        action: 'Carreira',
        description: `${action.name}: ${action.description}`,
        effects: action.effects
    };
    
    character.history.push(historyEntry);
    
    return historyEntry;
}

function startCareer(character, careerType) {
    character.career.type = careerType;
    character.career.details = {
        startAge: character.age,
        achievements: [],
        totalEarnings: 0
    };
    
    const historyEntry = {
        year: character.age,
        action: 'Carreira',
        description: `Iniciou carreira: ${careersData[careerType].name}`,
        effects: {}
    };
    
    character.history.push(historyEntry);
    
    return historyEntry;
}

