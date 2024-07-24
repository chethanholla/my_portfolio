//<!--Not required dot this project-->


document.addEventListener('DOMContentLoaded', function () {
    const password = prompt('Enter password to access the admin panel:');
    if (password !== 'your_secure_password') {
        alert('Incorrect password. Access denied.');
        window.location.href = 'index.html';
    } else {
        initAdminPanel();
    }
});

function saveSkillToLocalStorage(skill, icon, level) {
    let skills = JSON.parse(localStorage.getItem('skills')) || [];
    skills.push({ name: skill, icon: icon, level: parseInt(level) });
    localStorage.setItem('skills', JSON.stringify(skills));
}

function saveProjectToLocalStorage(title, image, description, category) {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push({ title: title, image: image, description: description, category: category });
    localStorage.setItem('projects', JSON.stringify(projects));
}

function initAdminPanel() {
    document.getElementById('skills-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const skill = document.getElementById('new-skill').value.trim();
        const icon = document.getElementById('skill-icon').value.trim();
        const level = document.getElementById('skill-level').value.trim();

        if (skill && icon && level) {
            //save skill to local storage
            saveSkillToLocalStorage(skill, icon, level);
            alert('Skill added successfully!');
        }
    });

    document.getElementById('projects-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('project-title').value.trim();
        const image = document.getElementById('project-image').value.trim();
        const description = document.getElementById('project-description').value.trim();
        const category = document.getElementById('project-category').value.trim();

        if (title && image && description && category) {
            //Save project to local storage
            saveProjectToLocalStorage(title, image, description, category);
            alert('Project added successfully');
        }
    });
}