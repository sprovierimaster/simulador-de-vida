
// Education system data and management
const educationData = {
    schoolTypes: {
        'publica': {
            name: 'Escola Pública',
            cost: 0,
            qualityModifier: 1.0,
            requirements: {}
        },
        'privada': {
            name: 'Escola Privada',
            cost: 1000,
            qualityModifier: 1.5,
            requirements: {
                familyMoney: 5000
            }
        }
    },

    subjects: [
        {
            name: 'Matemática',
            baseRequirement: 'intelligence',
            difficulty: 0.8
        },
        {
            name: 'Português',
            baseRequirement: 'intelligence',
            difficulty: 0.7
        },
        {
            name: 'História',
            baseRequirement: 'intelligence',
            difficulty: 0.6
        },
        {
            name: 'Geografia',
            baseRequirement: 'intelligence',
            difficulty: 0.6
        },
        {
            name: 'Ciências',
            baseRequirement: 'intelligence',
            difficulty: 0.7
        },
        {
            name: 'Educação Física',
            baseRequirement: 'health',
            difficulty: 0.4
        }
    ],

    universities: [
        {
            name: 'Universidade Federal',
            requirements: {
                averageGrade: 7.0,
                intelligence: 60
            },
            cost: 0,
            prestige: 0.8,
            courses: ['Medicina', 'Engenharia', 'Direito', 'Administração', 'Psicologia']
        },
        {
            name: 'Universidade Privada',
            requirements: {
                averageGrade: 5.0,
                familyMoney: 10000
            },
            cost: 2000,
            prestige: 0.6,
            courses: ['Administração', 'Marketing', 'Design', 'Comunicação', 'Turismo']
        },
        {
            name: 'Universidade de Elite',
            requirements: {
                averageGrade: 9.0,
                intelligence: 80,
                familyMoney: 20000
            },
            cost: 5000,
            prestige: 1.0,
            courses: ['Medicina', 'Engenharia', 'Direito', 'Economia', 'Arquitetura']
        }
    ]
};

// Education management functions
function getAvailableSchools(character) {
    const availableSchools = [];
    
    Object.keys(educationData.schoolTypes).forEach(schoolKey => {
        const school = educationData.schoolTypes[schoolKey];
        let canAfford = true;
        
        // Check family money requirement
        if (school.requirements.familyMoney && character.familyMoney < school.requirements.familyMoney) {
            canAfford = false;
        }
        
        if (canAfford) {
            availableSchools.push({
                key: schoolKey,
                ...school
            });
        }
    });
    
    return availableSchools;
}

function calculateGrade(character, subject, schoolType) {
    const school = educationData.schoolTypes[schoolType];
    const baseAttribute = character.attributes[subject.baseRequirement];
    
    // Base grade calculation
    let grade = (baseAttribute / 100) * 10;
    
    // Apply school quality modifier
    grade *= school.qualityModifier;
    
    // Apply subject difficulty
    grade *= (1 + (1 - subject.difficulty));
    
    // Add some randomness
    const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
    grade += randomFactor;
    
    // Ensure grade is between 0 and 10
    grade = Math.max(0, Math.min(10, grade));
    
    return Math.round(grade * 10) / 10; // Round to 1 decimal place
}

function studyAtSchool(character) {
    if (character.age < 6 || character.age > 18) {
        return null; // Not school age
    }
    
    const grades = {};
    let totalGrade = 0;
    
    // Calculate grades for all subjects
    educationData.subjects.forEach(subject => {
        const grade = calculateGrade(character, subject, character.education.schoolType);
        grades[subject.name] = grade;
        totalGrade += grade;
    });
    
    const averageGrade = totalGrade / educationData.subjects.length;
    
    // Add to character's education record
    character.education.grades.push({
        year: character.age,
        subjects: grades,
        average: Math.round(averageGrade * 10) / 10
    });
    
    // Apply educational effects on attributes
    const school = educationData.schoolTypes[character.education.schoolType];
    const intelligenceGain = Math.floor(averageGrade * school.qualityModifier);
    const disciplineGain = Math.floor((averageGrade / 2) * school.qualityModifier);
    
    character.attributes.intelligence += intelligenceGain;
    character.attributes.discipline += disciplineGain;
    
    // Ensure attributes don't exceed 100
    character.attributes.intelligence = Math.min(100, character.attributes.intelligence);
    character.attributes.discipline = Math.min(100, character.attributes.discipline);
    
    // Pay school costs
    if (school.cost > 0) {
        character.familyMoney -= school.cost;
        character.familyMoney = Math.max(0, character.familyMoney);
    }
    
    return {
        grades: grades,
        average: averageGrade,
        intelligenceGain: intelligenceGain,
        disciplineGain: disciplineGain
    };
}

function getAvailableUniversities(character) {
    if (!character.education.hasGraduated || character.age < 18) {
        return [];
    }
    
    const availableUniversities = [];
    const averageGrade = calculateOverallAverage(character);
    
    educationData.universities.forEach(university => {
        let meetsRequirements = true;
        
        // Check grade requirement
        if (university.requirements.averageGrade && averageGrade < university.requirements.averageGrade) {
            meetsRequirements = false;
        }
        
        // Check intelligence requirement
        if (university.requirements.intelligence && character.attributes.intelligence < university.requirements.intelligence) {
            meetsRequirements = false;
        }
        
        // Check family money requirement
        if (university.requirements.familyMoney && character.familyMoney < university.requirements.familyMoney) {
            meetsRequirements = false;
        }
        
        if (meetsRequirements) {
            availableUniversities.push(university);
        }
    });
    
    return availableUniversities;
}

function calculateOverallAverage(character) {
    if (character.education.grades.length === 0) return 0;
    
    let totalAverage = 0;
    character.education.grades.forEach(yearGrades => {
        totalAverage += yearGrades.average;
    });
    
    return totalAverage / character.education.grades.length;
}

function graduateFromSchool(character) {
    if (character.age === 18 && !character.education.hasGraduated) {
        character.education.hasGraduated = true;
        
        const overallAverage = calculateOverallAverage(character);
        
        // Graduation bonus based on performance
        if (overallAverage >= 8.0) {
            character.attributes.intelligence += 10;
            character.attributes.discipline += 8;
            character.attributes.happiness += 15;
        } else if (overallAverage >= 6.0) {
            character.attributes.intelligence += 5;
            character.attributes.discipline += 4;
            character.attributes.happiness += 8;
        } else {
            character.attributes.happiness -= 5;
        }
        
        // Ensure attributes don't exceed 100
        Object.keys(character.attributes).forEach(attr => {
            character.attributes[attr] = Math.min(100, Math.max(0, character.attributes[attr]));
        });
        
        return {
            graduated: true,
            overallAverage: overallAverage,
            message: overallAverage >= 8.0 ? 'Formatura com honras!' : 
                     overallAverage >= 6.0 ? 'Formatura aprovada!' : 'Formatura com dificuldades.'
        };
    }
    
    return null;
}

function enrollInUniversity(character, universityName, course) {
    const university = educationData.universities.find(u => u.name === universityName);
    if (!university) return null;
    
    character.education.universityCourse = course;
    character.education.university = universityName;
    character.education.universityStartYear = character.age;
    
    // Pay enrollment costs
    if (university.cost > 0) {
        character.familyMoney -= university.cost;
        character.familyMoney = Math.max(0, character.familyMoney);
    }
    
    return {
        enrolled: true,
        university: universityName,
        course: course,
        cost: university.cost
    };
}

