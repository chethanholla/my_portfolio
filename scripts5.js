//Navigation bar Script
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', function () {
    let elements = this.document.querySelectorAll('.animate');
    let screenHeight = window.innerHeight;

    elements.forEach(element => {
        let position = element.getBoundingClientRect().top;

        if (position < screenHeight) {
            element.classList.add('animated');
        }
    });
});

function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("show") === -1) {
        x.className += " show";
    } else {
        x.className = x.className.replace(" show", "");
    }
}

const navbar = document.getElementById('navigationBar');
navbar.style.display = 'none';
window.addEventListener('scroll', function () {
    if (this.window.scrollY > 200) {
        navbar.style.display = 'block';
    } else {
        navbar.style.display = 'none';
    }
});
//------------------------------------------------------------------------------------

//Dark mode Toggle
document.getElementById('dark-mode-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});
//------------------------------------------------------------------------------------

//Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', function () {
    if (this.window.scrollY > 200) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
//------------------------------------------------------------------------------------

//Contact-form submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const formMessages = document.getElementById('form-messages');

    // Reset form messages
    formMessages.innerHTML = '';

    // Basic validation checks
    let isValid = true;
    if (name.length < 2) {
        isValid = false;
        formMessages.innerHTML += '<p>Please enter at least 2 characters for the name.</p>';
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        isValid = false;
        formMessages.innerHTML += '<p>Please enter a valid email address.</p>';
    }

    if (message.length < 10) {
        isValid = false;
        formMessages.innerHTML += '<p>Please enter at least 10 characters for the message.</p>';
    }

    // If form is valid, proceed with email sending
    if (isValid) {
        emailjs.send('service_bbwa9ry', 'template_45vksdt', {
            from_name: name,
            from_email: email,
            mail_message: message
        })
            .then(function (response) {
                alert('message sent successfully');
            }, function (error) {
                alert('Failed to send message, Please try again later.');
            });
    } else {
        alert('Please fill in all fields.');

    }

    alert('Form submitted!');

});
//------------------------------------------------------------------------------------

//Script for adding Skills from JSON file
document.addEventListener('DOMContentLoaded', function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {

            //Technical-skills
            const technicalSkills = document.getElementById('technical-skills');
            data.technicalSkills.forEach(skill => {
                const skillDiv = document.createElement('div');
                skillDiv.classList.add('skill');
                skillDiv.setAttribute('data-aos', 'flip-left');
                skillDiv.setAttribute('data-aos-duration', '1500');
                skillDiv.innerHTML = `
                    <h3><i id="logo" class="${skill.icon}"></i> ${skill.name}</h3>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${skill.level}%;"></div>
                    </div>`;
                technicalSkills.appendChild(skillDiv);
            });

            //WorkPlace Skills
            const workplaceSkills = document.getElementById('workplace-skills');
            data.workplaceSkills.forEach(skill => {
                const listItem = document.createElement('li');
                listItem.classList.add('skill');
                listItem.setAttribute('data-aos', 'flip-left');
                listItem.setAttribute('data-aos-duration', '1500');
                listItem.innerHTML = `<i class="fas fa-hashtag"></i> ${skill}`;
                workplaceSkills.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
//------------------------------------------------------------------------------------
//Dynamically adding Projects
let currentPage = 1;
const projectsPerPage = 5;
let currentCategory = '';
let filteredProjects = [];

function showCategory(category) {
    currentCategory = category;
    currentPage = 1;
    updateHeading();
    loadProjects();
}


function updateHeading() {
    const heading = document.getElementById('category-heading');
    if (currentCategory === 'work') {
        heading.textContent = 'Professional Projects';
    } else if (currentCategory === 'college') {
        heading.textContent = 'Personal Projects';
    }
}

function loadProjects() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            filteredProjects = data.projects.filter(project => project.category === currentCategory);
            displayProjects();
        });
}

function displayProjects() {
    const projectContainer = document.getElementById('project-container');
    projectContainer.innerHTML = '';

    const start = (currentPage - 1) * projectsPerPage;
    const end = start + projectsPerPage;
    const projectsToShow = filteredProjects.slice(start, end);

    projectsToShow.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-details">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.url}" target="_blank" ${project.url === "#" ? "style='display:none'" : ""}>View Project</a>
            </div>`;
        projectContainer.appendChild(projectDiv);
    });

    updatePaginationControls();
    document.getElementById('pagination').style.display = filteredProjects.length > projectsPerPage ? 'flex' : 'none';
}

function updatePaginationControls() {
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const pageNumberDisplay = document.getElementById('pageNumber');

    const start = (currentPage - 1) * projectsPerPage;
    const end = start + projectsPerPage;

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    prevButton.style.display = currentPage === 1 ? 'none' : 'inline-block';
    nextButton.style.display = end >= filteredProjects.length ? 'none' : 'inline-block';

    if (filteredProjects.length > 0) {
        pageNumberDisplay.textContent = `${currentPage} of ${totalPages}`;
    } else {
        pageNumberDisplay.textContent = '';
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProjects();
    }
}

function nextPage() {
    if ((currentPage * projectsPerPage) < filteredProjects.length) {
        currentPage++;
        displayProjects();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const projectContainer = document.getElementById('project-container');

    const categorySelectionButtons = document.querySelectorAll('#category-selection button');
    const pagination = document.getElementById('pagination');
    const projectsSection = document.getElementById('projects');

    document.getElementById('pagination').style.display = 'none'; // Hide pagination initially

    //Scroll event listener to detect when scrolling out of the project section
    window.addEventListener('scroll', () => {
        const sectionTop = projectsSection.offsetTop;
        const sectionHeight = projectsSection.offsetHeight;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        if (scrollY + windowHeight < sectionTop || scrollY > sectionTop + sectionHeight) {
            resetProjectSection();
        }
    });

    function resetProjectSection() {
        projectContainer.innerHTML = '';
        categorySelectionButtons.forEach(button => button.classList.remove('small'));
        pagination.style.display = 'none';
        currentPage = 1;
        filteredProjects = [];
        document.getElementById('category-heading').textContent = 'Projects';
    }
});
//--------------------------------------------------------------------------------------------
// Dynamically adding Certificates
let currentCertificateIndex = 0;
let certificates = [];

function loadCertificates() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            certificates = data.certificates;
            displayCertificate();
            createDots();
        });
}

function displayCertificate() {
    if (certificates.length === 0) return;

    const certificate = certificates[currentCertificateIndex];
    const leftPage = document.getElementById('left-page');
    const rightPage = document.getElementById('right-page');

    // Fill Left Page with Details
    leftPage.innerHTML = `
        <h3>${certificate.title}</h3>
        <p><strong>Issuer:</strong> ${certificate.issuer}</p>
        <p><strong>Date:</strong> ${certificate.date}</p>
        <p>${certificate.description}</p>
    `;

    // Fill Right Page with Image
    rightPage.innerHTML = `
        <img src="${certificate.image}" alt="${certificate.title}" onclick="enlargeImage('${certificate.image}')">
    `;

    updateDots();
}

function createDots() {
    const dotsContainer = document.getElementById('dots-container');
    dotsContainer.innerHTML = ''; // Clear any existing dots

    for (let i = 0; i < certificates.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('data-index', i);
        dot.onclick = function () {
            currentCertificateIndex = i;
            displayCertificate();
        };
        dotsContainer.appendChild(dot);
    }
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentCertificateIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function prevCertificate() {
    if (certificates.length === 0) return;
    currentCertificateIndex = (currentCertificateIndex === 0) ? certificates.length - 1 : currentCertificateIndex - 1;
    displayCertificate();
}

function nextCertificate() {
    if (certificates.length === 0) return;
    currentCertificateIndex = (currentCertificateIndex === certificates.length - 1) ? 0 : currentCertificateIndex + 1;
    displayCertificate();
}

// Function to enlarge image on click
function enlargeImage(imageSrc) {
    const imageWindow = window.open("", "Image", "width=600,height=450");
    imageWindow.document.write(`<img src='${imageSrc}' style='width: 100%;'>`);
}

document.addEventListener('DOMContentLoaded', loadCertificates);
