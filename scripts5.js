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

//Script for adding Skills,Project and Certificate from JSON file
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

            //Projects
            const workProjects = document.getElementById('work-projects');
            const collegeProjects = document.getElementById('college-projects');

            data.projects.forEach(project => {
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('project', 'animate');
                projectDiv.setAttribute('data-aos', 'fade-in');
                projectDiv.setAttribute('data-aos-duration', '1500');

                let projectContent = `
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-details">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>`;

                if (project.url !== "#") {
                    projectContent += `<a href="${project.url}" target="_blank">View Project</a>`;
                }

                projectContent += `</div>`;
                projectDiv.innerHTML = projectContent;

                if (project.category === 'work') {
                    workProjects.appendChild(projectDiv);
                } else if (project.category === 'college') {
                    collegeProjects.appendChild(projectDiv);
                }
            });

            //Certificates
            const certificatesContainer = document.getElementById('certificates-container');
            data.certificates.forEach(certificate => {
                const certificateElement = document.createElement('div');
                certificateElement.className = 'certificate';
                certificateElement.innerHTML = `
                <div data-aos="flip-up" data-aos-duration="1500">
                    <h3>${certificate.title}</h3>
                    <p><strong>Issuer:</strong> ${certificate.issuer}</p>
                    <p><strong>Date:</strong> ${certificate.date}</p>
                    <div class="description-txt-align"><p>${certificate.description}</p></div>
                    <p><img class="certificate-size" src="${certificate.image}" alt="Certificate"></p>
                </div>
            `;
                certificatesContainer.appendChild(certificateElement);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
//------------------------------------------------------------------------------------
