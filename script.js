

console.log("✅ script.js carregado com sucesso");



document.addEventListener("DOMContentLoaded", function () {

    const game = new LifeSimulator();

});

// Main game logic and DOM manipulation

class LifeSimulator {

    constructor() {

        this.character = null;

        this.gameStarted = false;

        this.currentEvent = null;

        

        this.initializeEventListeners();

    }



    initializeEventListeners() {

        // Character creation listeners

        document.getElementById('start-game').addEventListener('click', () => this.startGame());

        

        // Gender selection

        document.querySelectorAll('.gender-btn').forEach(btn => {

            btn.addEventListener('click', (e) => this.selectGender(e.target));

        });

        

        // Next year button

        document.getElementById('next-year').addEventListener('click', () => this.nextYear());

    }



    



selectGender(button) {

    console.log("Selecionando gênero:", button.textContent);

    document.querySelectorAll('.gender-btn').forEach(btn => {

        btn.classList.remove('selected');

    });

    button.classList.add('selected');

}



    // Adiciona ao botão clicado

    button.classList.add('selected');

}

);

        

        // Add selection to clicked button

        button.classList.add('selected');

    }



    



startGame() {

    const name = document.getElementById('character-name').value.trim();

    const lastName = document.getElementById('character-lastname').value.trim();

    const country = document.getElementById('character-country').value;

    const selectedGender = document.querySelector('.gender-btn.selected');



    console.log("Iniciando jogo com dados:");

    console.log("Nome = " + name);

    console.log("Sobrenome = " + lastName);

    console.log("País = " + country);

    console.log("Gênero selecionado = " + (selectedGender ? selectedGender.dataset.gender : "Nenhum"));



    if (!name || !lastName || !country || !selectedGender) {

        this.showNotification('Por favor, preencha todos os campos!', 'error');

        return;





        }

        

        const surname = lastName;

        const gender = selectedGender.dataset.gender;

        

        // Initialize character with all systems

        this.character = generateCharacter(name, surname, gender, country);

        initializeRelationships(this.character);

        initializeHealth(this.character);

        

        // Switch to game interface

        document.getElementById('character-creation').classList.add('hidden');

        document.getElementById('game-interface').classList.remove('hidden');

        

        // Update display

        this.updateDisplay();

        this.gameStarted = true;

        

        // Generate initial actions

        this.generateActions();

        

        this.showNotification('Bem-vindo à sua nova vida!');

    }



    generateCharacter(name, lastName, country, gender) {

        const socialClass = generateSocialClass();

        const familyStats = generateFamilyStats(country, socialClass);

        const city = generateRandomCity(country);

        const attributes = generateInitialAttributes();

        

        return {

            name: name,

            lastName: lastName,

            country: country,

            city: city,

            gender: gender,

            socialClass: socialClass,

            familyMoney: familyStats.money,

            familyInfluence: familyStats.influence,

            currency: familyStats.currency,

            attributes: attributes,

            education: {

                schoolType: socialClass === 'rico' ? 'privada' : 'pública',

                grades: [],

                hasGraduated: false,

                universityCourse: ''

            },

            career: {

                type: '',

                details: {}

            },

            relationships: [],

            healthStatus: [],

            age: 0,

            energy: 100,

            history: []

        };

    }



    updateDisplay() {

        if (!this.character) return;

        

        // Update character info

        document.getElementById('display-name').textContent = `${this.character.name} ${this.character.lastName}`;

        document.getElementById('display-age').textContent = `${this.character.age} anos`;

        document.getElementById('display-country').textContent = characterData.countries[this.character.country].name;

        document.getElementById('display-social-class').textContent = this.character.socialClass;

        document.getElementById('display-family-money').textContent = `${this.character.currency}${this.character.familyMoney.toLocaleString()}`;

        

        // Update attributes

        Object.keys(this.character.attributes).forEach(attribute => {

            const value = this.character.attributes[attribute];

            document.getElementById(`${attribute}-value`).textContent = value;

            document.getElementById(`${attribute}-bar`).style.width = `${value}%`;

        });

        

        // Update energy

        document.getElementById('energy-value').textContent = this.character.energy;

        document.getElementById('energy-bar').style.width = `${this.character.energy}%`;

    }



    generateActions() {

        const actionsContainer = document.getElementById('actions-container');

        actionsContainer.innerHTML = '';

        

        // Basic actions always available

        const basicActions = [

            {

                name: 'Estudar',

                description: 'Dedicar tempo aos estudos',

                effects: { intelligence: 5, discipline: 3 },

                energyCost: 20

            },

            {

                name: 'Exercitar-se',

                description: 'Fazer exercícios físicos',

                effects: { health: 8, strength: 5, happiness: 3 },

                energyCost: 25

            },

            {

                name: 'Socializar',

                description: 'Passar tempo com amigos',

                effects: { charisma: 6, happiness: 8 },

                energyCost: 15

            },

            {

                name: 'Descansar',

                description: 'Relaxar e recuperar energia',

                effects: { health: 3, happiness: 5 },

                energyCost: -30 // Recupera energia

            }

        ];

        

        // Add basic actions

        basicActions.forEach(action => {

            this.createActionButton(action, actionsContainer);

        });

        

        // Add education actions if character is school age

        if (this.character.age >= 6 && this.character.age <= 18 && !this.character.education.hasGraduated) {

            this.addEducationActions(actionsContainer);

        }

        

        // Add university actions if character has graduated and is eligible

        if (this.character.education.hasGraduated && this.character.age >= 18 && !this.character.education.universityCourse) {

            this.addUniversityActions(actionsContainer);

        }

        

        // Add career actions if character has a career

        if (this.character.career.type) {

            const careerActions = getAvailableCareerActions(this.character);

            careerActions.forEach(action => {

                this.createActionButton({

                    name: action.name,

                    description: action.description,

                    effects: action.effects,

                    energyCost: action.energyCost,

                    isCareerAction: true

                }, actionsContainer);

            });

        } else {

            // Show available careers

            const availableCareers = getAvailableCareers(this.character);

            if (availableCareers.length > 0) {

                const careerSection = document.createElement('div');

                careerSection.className = 'mt-4 pt-4 border-t border-white border-opacity-20';

                careerSection.innerHTML = '<h4 class="text-lg font-semibold mb-2">Carreiras Disponíveis</h4>';

                

                availableCareers.forEach(career => {

                    const careerBtn = document.createElement('button');

                    careerBtn.className = 'action-btn w-full p-3 rounded-lg text-left mb-2';

                    careerBtn.innerHTML = `

                        <div class="font-semibold">${career.name}</div>

                        <div class="text-sm opacity-80">${career.description}</div>

                    `;

                    careerBtn.addEventListener('click', () => this.startCareer(career.key));

                    careerSection.appendChild(careerBtn);

                });

                

                actionsContainer.appendChild(careerSection);

            }

        }

    }



    createActionButton(action, container) {

        const button = document.createElement('button');

        button.className = 'action-btn w-full p-3 rounded-lg text-left';

        

        const canPerform = this.character.energy >= action.energyCost;

        if (!canPerform) {

            button.classList.add('opacity-50', 'cursor-not-allowed');

            button.disabled = true;

        }

        

        button.innerHTML = `

            <div class="flex justify-between items-start">

                <div>

                    <div class="font-semibold">${action.name}</div>

                    <div class="text-sm opacity-80">${action.description}</div>

                </div>

                <div class="text-sm text-cyan-400">

                    ${action.energyCost > 0 ? `-${action.energyCost}` : `+${Math.abs(action.energyCost)}`} energia

                </div>

            </div>

        `;

        

        if (canPerform) {

            button.addEventListener('click', () => this.performAction(action));

        }

        

        container.appendChild(button);

    }



    performAction(action) {

        // Apply effects

        Object.keys(action.effects).forEach(attribute => {

            this.character.attributes[attribute] += action.effects[attribute];

            this.character.attributes[attribute] = Math.max(0, Math.min(100, this.character.attributes[attribute]));

        });

        

        // Apply energy cost

        this.character.energy -= action.energyCost;

        this.character.energy = Math.max(0, this.character.energy);

        

        // Add to history

        const historyEntry = {

            year: this.character.age,

            action: action.name,

            description: action.description,

            effects: action.effects

        };

        

        this.character.history.push(historyEntry);

        

        // Update display

        this.updateDisplay();

        this.generateActions();

        this.addEventToHistory(historyEntry);

        

        // Check for random events

        if (Math.random() < 0.3) { // 30% chance of random event

            this.triggerRandomEvent();

        }

    }



    startCareer(careerType) {

        startCareer(this.character, careerType);

        this.updateDisplay();

        this.generateActions();

        this.showNotification(`Carreira iniciada: ${careersData[careerType].name}`);

    }

    

    triggerRandomEvent() {

        const event = getSmartRandomEvent(this.character);

        if (!event) return;

        

        this.showEventModal(event);

    }



    showEventModal(event) {

        const modal = document.createElement('div');

        modal.className = 'modal';

        modal.innerHTML = `

            <div class="modal-content max-w-lg">

                <h3 class="text-xl font-bold mb-4">${event.title}</h3>

                <p class="mb-6">${event.description}</p>

                <div class="space-y-3">

                    ${event.options.map((option, index) => `

                        <button class="event-option w-full p-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-left hover:bg-opacity-20 transition-all duration-200" data-index="${index}">

                            <div class="font-semibold">${option.text}</div>

                            <div class="text-sm opacity-80 mt-1">Energia: ${option.energyCost}</div>

                        </button>

                    `).join('')}

                </div>

            </div>

        `;

        

        // Add event listeners to options

        modal.querySelectorAll('.event-option').forEach(btn => {

            btn.addEventListener('click', (e) => {

                const optionIndex = parseInt(e.currentTarget.dataset.index);

                this.chooseEventOption(optionIndex);

                document.body.removeChild(modal);

            });

        });

        

        document.body.appendChild(modal);

    }



    chooseEventOption(optionIndex) {

        if (!this.currentEvent) return;

        

        const historyEntry = processEventChoice(this.currentEvent, optionIndex, this.character);

        this.updateDisplay();

        this.generateActions();

        this.addEventToHistory(historyEntry);

        

        this.currentEvent = null;

    }



    addEventToHistory(entry) {

        const eventsContainer = document.getElementById('events-container');

        const eventCard = document.createElement('div');

        eventCard.className = 'event-card p-3 rounded-lg';

        

        const effectsText = Object.keys(entry.effects).map(attr => {

            const value = entry.effects[attr];

            const sign = value > 0 ? '+' : '';

            return `${attr}: ${sign}${value}`;

        }).join(', ');

        

        eventCard.innerHTML = `

            <div class="flex justify-between items-start">

                <div>

                    <div class="font-semibold">${entry.event || entry.action}</div>

                    <div class="text-sm opacity-80">${entry.choice || entry.description}</div>

                    ${effectsText ? `<div class="text-xs text-cyan-400 mt-1">${effectsText}</div>` : ''}

                </div>

                <div class="text-xs opacity-60">

                    Ano ${entry.year}

                </div>

            </div>

        `;

        

        eventsContainer.insertBefore(eventCard, eventsContainer.firstChild);

        

        // Limit history display to 20 items

        while (eventsContainer.children.length > 20) {

            eventsContainer.removeChild(eventsContainer.lastChild);

        }

    }



    nextYear() {

        this.character.age++;

        this.character.energy = 100; // Reset energy for new year

        

        // Handle school progression

        if (this.character.age >= 6 && this.character.age <= 18 && !this.character.education.hasGraduated) {

            const schoolResult = studyAtSchool(this.character);

            if (schoolResult) {

                this.addEventToHistory({

                    year: this.character.age,

                    action: 'Escola',

                    description: `Estudou na ${educationData.schoolTypes[this.character.education.schoolType].name}`,

                    effects: { 

                        intelligence: schoolResult.intelligenceGain, 

                        discipline: schoolResult.disciplineGain 

                    },

                    details: `Média: ${schoolResult.average}`

                });

            }

        }

        

        // Handle graduation

        if (this.character.age === 18) {

            const graduationResult = graduateFromSchool(this.character);

            if (graduationResult) {

                this.addEventToHistory({

                    year: this.character.age,

                    action: 'Formatura',

                    description: graduationResult.message,

                    effects: {},

                    details: `Média geral: ${graduationResult.overallAverage.toFixed(1)}`

                });

            }

        }

        

        // Age-related attribute changes

        if (this.character.age > 30) {

            this.character.attributes.health -= 1;

            this.character.attributes.strength -= 0.5;

        }

        

        if (this.character.age > 50) {

            this.character.attributes.health -= 2;

            this.character.attributes.strength -= 1;

            this.character.attributes.beauty -= 1;

        }

        

        // Ensure attributes don't go below 0

        Object.keys(this.character.attributes).forEach(attr => {

            this.character.attributes[attr] = Math.max(0, this.character.attributes[attr]);

        });

        

        this.updateDisplay();

        this.generateActions();

        

        // Add year change to history

        this.addEventToHistory({

            year: this.character.age,

            action: 'Novo Ano',

            description: `Completou ${this.character.age} anos`,

            effects: {}

        });

        

        // Chance of random event at year start

        if (Math.random() < 0.4) {

            setTimeout(() => this.triggerRandomEvent(), 1000);

        }

    }



    showNotification(message, type = 'success') {

        const notification = document.createElement('div');

        notification.className = `notification ${type}`;

        notification.textContent = message;

        

        document.body.appendChild(notification);

        

        setTimeout(() => {

            if (document.body.contains(notification)) {

                document.body.removeChild(notification);

            }

        }, 3000);

    }



    addEducationActions(container) {

        const educationSection = document.createElement('div');

        educationSection.className = 'mt-4 pt-4 border-t border-white border-opacity-20';

        educationSection.innerHTML = '<h4 class="text-lg font-semibold mb-2">Educação</h4>';

        

        // Show current school info

        const currentSchool = educationData.schoolTypes[this.character.education.schoolType];

        const schoolInfo = document.createElement('div');

        schoolInfo.className = 'mb-3 p-2 bg-white bg-opacity-5 rounded';

        schoolInfo.innerHTML = `

            <div class="text-sm">

                <strong>Escola Atual:</strong> ${currentSchool.name}<br>

                <strong>Custo Anual:</strong> ${this.character.currency}${currentSchool.cost}

            </div>

        `;

        educationSection.appendChild(schoolInfo);

        

        // Show available schools if character can change

        const availableSchools = getAvailableSchools(this.character);

        if (availableSchools.length > 1) {

            availableSchools.forEach(school => {

                if (school.key !== this.character.education.schoolType) {

                    const schoolBtn = document.createElement('button');

                    schoolBtn.className = 'action-btn w-full p-3 rounded-lg text-left mb-2';

                    schoolBtn.innerHTML = `

                        <div class="font-semibold">Mudar para ${school.name}</div>

                        <div class="text-sm opacity-80">Custo: ${this.character.currency}${school.cost}/ano</div>

                    `;

                    schoolBtn.addEventListener('click', () => this.changeSchool(school.key));

                    educationSection.appendChild(schoolBtn);

                }

            });

        }

        

        container.appendChild(educationSection);

    }

    

    addUniversityActions(container) {

        const universitySection = document.createElement('div');

        universitySection.className = 'mt-4 pt-4 border-t border-white border-opacity-20';

        universitySection.innerHTML = '<h4 class="text-lg font-semibold mb-2">Universidades Disponíveis</h4>';

        

        const availableUniversities = getAvailableUniversities(this.character);

        

        if (availableUniversities.length === 0) {

            const noUniversities = document.createElement('div');

            noUniversities.className = 'text-sm opacity-70';

            noUniversities.textContent = 'Nenhuma universidade disponível. Melhore suas notas ou situação financeira.';

            universitySection.appendChild(noUniversities);

        } else {

            availableUniversities.forEach(university => {

                const universityBtn = document.createElement('button');

                universityBtn.className = 'action-btn w-full p-3 rounded-lg text-left mb-2';

                universityBtn.innerHTML = `

                    <div class="font-semibold">${university.name}</div>

                    <div class="text-sm opacity-80">

                        Custo: ${this.character.currency}${university.cost}/ano<br>

                        Cursos: ${university.courses.join(', ')}

                    </div>

                `;

                universityBtn.addEventListener('click', () => this.showUniversityModal(university));

                universitySection.appendChild(universityBtn);

            });

        }

        

        container.appendChild(universitySection);

    }

    

    changeSchool(schoolType) {

        const oldSchool = educationData.schoolTypes[this.character.education.schoolType];

        const newSchool = educationData.schoolTypes[schoolType];

        

        // Check if can afford

        if (newSchool.cost > this.character.familyMoney) {

            this.showNotification('Família não tem dinheiro suficiente para esta escola!', 'error');

            return;

        }

        

        this.character.education.schoolType = schoolType;

        

        this.addEventToHistory({

            year: this.character.age,

            action: 'Mudança de Escola',

            description: `Mudou de ${oldSchool.name} para ${newSchool.name}`,

            effects: {}

        });

        

        this.updateDisplay();

        this.generateActions();

        this.showNotification(`Transferido para ${newSchool.name}!`);

    }

    

    showUniversityModal(university) {

        const modal = document.createElement('div');

        modal.className = 'modal';

        modal.innerHTML = `

            <div class="modal-content max-w-lg">

                <h3 class="text-xl font-bold mb-4">${university.name}</h3>

                <p class="mb-4">Escolha um curso:</p>

                <div class="space-y-3">

                    ${university.courses.map(course => `

                        <button class="course-option w-full p-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-left hover:bg-opacity-20 transition-all duration-200" data-course="${course}">

                            <div class="font-semibold">${course}</div>

                            <div class="text-sm opacity-80">Custo: ${this.character.currency}${university.cost}/ano</div>

                        </button>

                    `).join('')}

                </div>

                <button class="cancel-btn mt-4 w-full p-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-all duration-200">

                    Cancelar

                </button>

            </div>

        `;

        

        // Add event listeners

        modal.querySelectorAll('.course-option').forEach(btn => {

            btn.addEventListener('click', (e) => {

                const course = e.currentTarget.dataset.course;

                this.enrollInUniversity(university.name, course);

                document.body.removeChild(modal);

            });

        });

        

        modal.querySelector('.cancel-btn').addEventListener('click', () => {

            document.body.removeChild(modal);

        });

        

        document.body.appendChild(modal);

    }

    

    enrollInUniversity(universityName, course) {

        const result = enrollInUniversity(this.character, universityName, course);

        

        if (result) {

            this.addEventToHistory({

                year: this.character.age,

                action: 'Universidade',

                description: `Ingressou em ${course} na ${universityName}`,

                effects: {},

                details: `Custo: ${this.character.currency}${result.cost}`

            });

            

            this.updateDisplay();

            this.generateActions();

            this.showNotification(`Matriculado em ${course}!`);

        }

    }

}



// Initialize game when DOM is loaded

document.addEventListener('DOMContentLoaded', () => {

    new LifeSimulator();

});




document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM totalmente carregado");
    try {
        window.sim = new LifeSimulator();
        console.log("✅ LifeSimulator iniciado");
    } catch (e) {
        console.error("❌ Erro ao iniciar LifeSimulator:", e);
    }
});
