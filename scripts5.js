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

//Dark mode Toggle
document.getElementById('dark-mode-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

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

//form submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
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


document.addEventListener('DOMContentLoaded', function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const technicalSkills = document.getElementById('technical-skills');
            data.technicalSkills.forEach(skill => {
                const skillDiv = document.createElement('div');
                skillDiv.classList.add('skill');
                skillDiv.setAttribute('data-aos', 'flip-left');
                skillDiv.setAttribute('data-aos-duration', '1500');
                skillDiv.innerHTML = `
                    <h3><i class="${skill.icon}"></i> ${skill.name}</h3>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${skill.level}%;"></div>
                    </div>`;
                technicalSkills.appendChild(skillDiv);
            });

            const workplaceSkills = document.getElementById('workplace-skills');
            data.workplaceSkills.forEach(skill => {
                const listItem = document.createElement('li');
                listItem.classList.add('skill');
                listItem.setAttribute('data-aos', 'flip-left');
                listItem.setAttribute('data-aos-duration', '1500');
                listItem.innerHTML = `<i class="fas fa-hashtag"></i> ${skill}`;
                workplaceSkills.appendChild(listItem);
            });

            const workProjects = document.getElementById('work-projects');
            const collegeProjects = document.getElementById('college-projects');
            data.projects.forEach(project => {
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('project', 'animate');
                projectDiv.setAttribute('data-aos', 'fade-in');
                projectDiv.setAttribute('data-aos-duration', '1500');
                projectDiv.innerHTML = `
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-details">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="${project.url}" target="_blank">View Project</a>
                    </div>`;

                if (project.category === 'work') {
                    workProjects.appendChild(projectDiv);
                } else if (project.category === 'college') {
                    collegeProjects.appendChild(projectDiv);
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
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
window.addEventListener('scroll', function () {
    if (this.window.scrollY > 200) {
        navbar.style.display = 'block';
    } else {
        navbar.style.display = 'none';
    }
});
