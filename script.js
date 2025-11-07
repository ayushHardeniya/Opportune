// Opportune - Job Portal Application
class Opportune {
    constructor() {
        this.currentUser = null;
        this.jobs = [];
        this.applications = [];
        this.notifications = [];
        
        // DOM elements
        this.loginModal = document.getElementById('loginModal');
        this.loginForm = document.getElementById('loginForm');
        this.jobForm = document.getElementById('jobForm');
        this.jobsContainer = document.getElementById('jobsContainer');
        this.applicationsContainer = document.getElementById('applicationsContainer');
        this.searchInput = document.getElementById('searchInput');
        this.locationFilter = document.getElementById('locationFilter');
        this.typeFilter = document.getElementById('typeFilter');
        this.notificationsPanel = document.getElementById('notificationsPanel');
        this.notificationsList = document.getElementById('notificationsList');
        this.notificationCount = document.getElementById('notificationCount');
        
        this.init();
    }

    init() {
        this.initSampleData();
        this.loadData();
        this.setupEventListeners();
        this.checkUser();
        this.updateNotificationCount();
    }

    // Initialize sample data
    initSampleData() {
        const sampleJobs = [
            {
                id: Date.now() - 86400000,
                title: 'Senior Frontend Developer',
                company: 'TechCorp Inc.',
                location: 'Remote',
                type: 'Full-time',
                salary: '$90,000 - $130,000',
                experience: 'Senior Level',
                skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
                description: `We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for building user-facing features, optimizing applications for speed and scalability, and collaborating with backend developers and designers.

Key Responsibilities:
• Develop and maintain high-quality React applications
• Implement responsive designs with modern CSS frameworks
• Optimize applications for maximum speed and scalability
• Collaborate with UX/UI designers to implement designs
• Write clean, maintainable, and well-documented code

Requirements:
• 5+ years of experience with React and modern JavaScript
• Strong understanding of TypeScript and state management
• Experience with RESTful APIs and GraphQL
• Knowledge of testing frameworks (Jest, React Testing Library)
• Excellent problem-solving skills and attention to detail`,
                postedBy: 'hr_techcorp',
                postedDate: new Date(Date.now() - 86400000).toLocaleDateString(),
                applicants: 23
            },
            {
                id: Date.now() - 172800000,
                title: 'Product Manager',
                company: 'StartupXYZ',
                location: 'San Francisco',
                type: 'Full-time',
                salary: '$120,000 - $160,000',
                experience: 'Mid Level',
                skills: ['Product Strategy', 'Analytics', 'Agile', 'User Research'],
                description: `Join our fast-growing startup as a Product Manager where you'll drive product strategy and execution. You'll work closely with engineering, design, and marketing teams to build products that our users love.

What You'll Do:
• Define and execute product roadmap and strategy
• Conduct user research and analyze product metrics
• Work with engineering teams to prioritize features
• Coordinate product launches and go-to-market strategies
• Monitor product performance and iterate based on user feedback

What We're Looking For:
• 3-5 years of product management experience
• Strong analytical skills and data-driven approach
• Experience with product analytics tools (Mixpanel, Amplitude)
• Excellent communication and leadership skills
• Bachelor's degree in Business, Engineering, or related field`,
                postedBy: 'pm_startup',
                postedDate: new Date(Date.now() - 172800000).toLocaleDateString(),
                applicants: 45
            },
            {
                id: Date.now() - 259200000,
                title: 'Data Scientist Intern',
                company: 'DataFlow Solutions',
                location: 'Remote',
                type: 'Internship',
                salary: '$25 - $35 per hour',
                experience: 'Entry Level',
                skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
                description: `Great opportunity for students or recent graduates to gain hands-on experience in data science. You'll work on real projects involving machine learning, data analysis, and visualization.

Learning Opportunities:
• Work with large datasets and build predictive models
• Learn industry-standard tools and technologies
• Collaborate with senior data scientists and engineers
• Present findings to stakeholders and product teams
• Contribute to open-source projects

Requirements:
• Currently pursuing or recently completed degree in Data Science, Statistics, Computer Science, or related field
• Strong foundation in Python and data manipulation libraries (pandas, numpy)
• Basic understanding of machine learning algorithms
• Familiarity with SQL and database concepts
• Strong analytical and problem-solving skills`,
                postedBy: 'recruiter_dataflow',
                postedDate: new Date(Date.now() - 259200000).toLocaleDateString(),
                applicants: 67
            },
            {
                id: Date.now() - 345600000,
                title: 'UX/UI Designer',
                company: 'Creative Agency Ltd.',
                location: 'London',
                type: 'Contract',
                salary: '$75 - $95 per hour',
                experience: 'Mid Level',
                skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
                description: `We're seeking a talented UX/UI Designer for a 6-month contract to help redesign our client's e-commerce platform. You'll be responsible for user research, wireframing, prototyping, and creating beautiful, user-centered designs.

Project Scope:
• Conduct user research and usability testing
• Create wireframes, mockups, and interactive prototypes
• Develop and maintain design system components
• Collaborate with developers to ensure design implementation
• Present design concepts to clients and stakeholders

Ideal Candidate:
• 3+ years of UX/UI design experience
• Proficiency in Figma and other design tools
• Strong portfolio showcasing e-commerce or similar projects
• Experience with user research methodologies
• Understanding of responsive design principles`,
                postedBy: 'creative_lead',
                postedDate: new Date(Date.now() - 345600000).toLocaleDateString(),
                applicants: 34
            },
            {
                id: Date.now() - 432000000,
                title: 'DevOps Engineer',
                company: 'CloudTech Systems',
                location: 'Mumbai',
                type: 'Full-time',
                salary: '₹15,00,000 - ₹25,00,000',
                experience: 'Senior Level',
                skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
                description: `Join our DevOps team to help scale our infrastructure and improve deployment processes. You'll work with cutting-edge cloud technologies and automation tools to support our growing platform.

Responsibilities:
• Design and implement CI/CD pipelines
• Manage cloud infrastructure on AWS
• Automate deployment and monitoring processes
• Ensure system security and compliance
• Collaborate with development teams to optimize workflows

Requirements:
• 5+ years of DevOps or infrastructure experience
• Strong experience with AWS services and cloud architecture
• Proficiency in containerization (Docker, Kubernetes)
• Experience with Infrastructure as Code (Terraform, CloudFormation)
• Knowledge of monitoring and logging tools (Prometheus, ELK stack)`,
                postedBy: 'devops_manager',
                postedDate: new Date(Date.now() - 432000000).toLocaleDateString(),
                applicants: 28
            }
        ];

        const sampleNotifications = [
            {
                id: Date.now() - 3600000,
                title: 'New Job Match!',
                text: 'A new Senior Frontend Developer position matches your profile',
                time: '1 hour ago',
                read: false,
                type: 'job_match'
            },
            {
                id: Date.now() - 7200000,
                title: 'Application Update',
                text: 'Your application for Product Manager at StartupXYZ is under review',
                time: '2 hours ago',
                read: false,
                type: 'application_update'
            }
        ];

        // Only add sample data if not already present
        if (!localStorage.getItem('OpportuneJobs')) {
            this.jobs = sampleJobs;
            this.saveJobs();
        }
        
        if (!localStorage.getItem('OpportuneNotifications')) {
            this.notifications = sampleNotifications;
            this.saveNotifications();
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Login form
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        
        // Job form
        this.jobForm.addEventListener('submit', (e) => this.handleJobSubmit(e));
        
        // Search and filters
        this.searchInput.addEventListener('input', () => this.renderJobs());
        this.locationFilter.addEventListener('change', () => this.renderJobs());
        this.typeFilter.addEventListener('change', () => this.renderJobs());
        
        // Save draft button
        document.querySelector('.save-draft-btn').addEventListener('click', () => this.saveDraft());
        
        // Click outside notifications to close
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.notification-bell') && !e.target.closest('.notifications-panel')) {
                this.notificationsPanel.style.display = 'none';
            }
        });
    }

    // Check if user is logged in
    checkUser() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUserDisplay();
            this.loginModal.style.display = 'none';
            this.renderJobs();
            this.renderApplications();
            this.renderNotifications();
        } else {
            this.showLoginModal();
        }
    }

    // Show login modal
    showLoginModal() {
        this.loginModal.style.display = 'flex';
    }

    // Handle user login
    handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('usernameInput').value.trim();
        const userType = document.getElementById('userTypeSelect').value;
        
        if (!username || !userType) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        const user = {
            username: username,
            name: username.charAt(0).toUpperCase() + username.slice(1).replace('_', ' '),
            type: userType,
            avatar: `https://i.pravatar.cc/150?u=${username}`,
            joinDate: new Date().toLocaleDateString()
        };

        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.updateUserDisplay();
        this.loginModal.style.display = 'none';
        this.renderJobs();
        this.renderApplications();
        this.addNotification('Welcome to Opportune!', 'Start exploring job opportunities', 'welcome');
    }

    // Update user display
    updateUserDisplay() {
        document.getElementById('currentUserName').textContent = this.currentUser.name;
        document.getElementById('profileName').textContent = this.currentUser.name;
        document.getElementById('profileRole').textContent = 
            this.currentUser.type === 'job_seeker' ? 'Job Seeker' : 'Employer';
        document.getElementById('profileAvatar').src = this.currentUser.avatar;
        
        // Update stats based on user type
        if (this.currentUser.type === 'job_seeker') {
            const userApplications = this.applications.filter(app => app.applicant === this.currentUser.username);
            document.getElementById('userJobCount').textContent = userApplications.length;
            document.getElementById('statLabel').textContent = 'Applications';
            document.getElementById('profileContentTitle').textContent = 'My Applications';
        } else {
            const userJobs = this.jobs.filter(job => job.postedBy === this.currentUser.username);
            document.getElementById('userJobCount').textContent = userJobs.length;
            document.getElementById('statLabel').textContent = 'Posted Jobs';
            document.getElementById('profileContentTitle').textContent = 'My Posted Jobs';
        }
        
        document.getElementById('userActivityCount').textContent = this.notifications.length;
        
        // Show/hide post job button based on user type
        const postBtn = document.querySelector('.nav-btn[onclick="showSection(\'post\')"]');
        if (this.currentUser.type === 'job_seeker') {
            postBtn.style.display = 'none';
        } else {
            postBtn.style.display = 'block';
        }
    }

    // Handle job submission
    handleJobSubmit(e) {
        e.preventDefault();
        
        if (this.currentUser.type !== 'employer') {
            this.showMessage('Only employers can post jobs', 'error');
            return;
        }
        
        const formData = new FormData(this.jobForm);
        const jobData = {};
        
        for (let [key, value] of formData.entries()) {
            jobData[key] = value.trim();
        }
        
        // Validate required fields
        const requiredFields = ['jobTitle', 'company', 'location', 'jobType', 'salary', 'experience', 'skills', 'description'];
        for (let field of requiredFields) {
            if (!jobData[field]) {
                this.showMessage('Please fill in all fields', 'error');
                return;
            }
        }

        const newJob = {
            id: Date.now(),
            title: jobData.jobTitle,
            company: jobData.company,
            location: jobData.location,
            type: jobData.jobType,
            salary: jobData.salary,
            experience: jobData.experience,
            skills: jobData.skills.split(',').map(skill => skill.trim()),
            description: jobData.description,
            postedBy: this.currentUser.username,
            postedDate: new Date().toLocaleDateString(),
            applicants: 0
        };

        this.jobs.unshift(newJob);
        this.saveJobs();
        this.renderJobs();
        this.updateUserDisplay();
        
        // Clear form and show success
        this.jobForm.reset();
        this.showMessage('Job posted successfully!', 'success');
        this.showSection('jobs');
        
        // Notify job seekers about new job
        this.addNotification('New Job Posted!', `${newJob.title} at ${newJob.company}`, 'new_job');
    }

    // Apply for job
    applyForJob(jobId) {
        if (this.currentUser.type !== 'job_seeker') {
            this.showMessage('Only job seekers can apply for jobs', 'error');
            return;
        }
        
        // Check if already applied
        const existingApplication = this.applications.find(app => 
            app.jobId === jobId && app.applicant === this.currentUser.username
        );
        
        if (existingApplication) {
            this.showMessage('You have already applied for this job', 'error');
            return;
        }
        
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;
        
        const application = {
            id: Date.now(),
            jobId: jobId,
            jobTitle: job.title,
            company: job.company,
            applicant: this.currentUser.username,
            appliedDate: new Date().toLocaleDateString(),
            status: 'Applied'
        };
        
        this.applications.push(application);
        this.saveApplications();
        
        // Update job applicant count
        job.applicants += 1;
        this.saveJobs();
        
        this.renderJobs();
        this.renderApplications();
        this.updateUserDisplay();
        this.showMessage('Application submitted successfully!', 'success');
        
        // Add notification
        this.addNotification('Application Submitted', `Applied for ${job.title} at ${job.company}`, 'application');
    }

    // Delete job
    deleteJob(jobId) {
        if (confirm('Are you sure you want to delete this job posting?')) {
            this.jobs = this.jobs.filter(job => job.id !== jobId);
            this.saveJobs();
            this.renderJobs();
            this.updateUserDisplay();
            this.showMessage('Job deleted successfully!', 'success');
        }
    }

    // Render jobs
    renderJobs() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const selectedLocation = this.locationFilter.value;
        const selectedType = this.typeFilter.value;
        
        let filteredJobs = this.jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm) || 
                                job.company.toLowerCase().includes(searchTerm) ||
                                job.description.toLowerCase().includes(searchTerm) ||
                                job.skills.some(skill => skill.toLowerCase().includes(searchTerm));
            const matchesLocation = !selectedLocation || job.location === selectedLocation;
            const matchesType = !selectedType || job.type === selectedType;
            return matchesSearch && matchesLocation && matchesType;
        });

        this.jobsContainer.innerHTML = '';

        if (filteredJobs.length === 0) {
            this.jobsContainer.innerHTML = `
                <div class="no-content">
                    <i class="fas fa-search"></i>
                    <h3>No jobs found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }

        filteredJobs.forEach(job => {
            const jobElement = this.createJobElement(job);
            this.jobsContainer.appendChild(jobElement);
        });
    }

    // Create job element
    createJobElement(job) {
        const isCurrentUserJob = this.currentUser && job.postedBy === this.currentUser.username;
        const hasApplied = this.applications.some(app => 
            app.jobId === job.id && app.applicant === this.currentUser.username
        );
        
        const jobDiv = document.createElement('div');
        jobDiv.className = 'job-card';
        jobDiv.setAttribute('data-job-id', job.id);

        const descriptionPreview = job.description.length > 200 
            ? job.description.substring(0, 200) + '...' 
            : job.description;

        jobDiv.innerHTML = `
            <div class="job-header">
                <div class="job-info">
                    <h3 class="job-title">${this.escapeHtml(job.title)}</h3>
                    <div class="company-name">${this.escapeHtml(job.company)}</div>
                </div>
                <div class="job-posted">Posted ${job.postedDate}</div>
            </div>
            <div class="job-meta">
                <div class="meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${job.location}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <span>${job.type}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-dollar-sign"></i>
                    <span>${job.salary}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-user-tie"></i>
                    <span>${job.experience}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-users"></i>
                    <span>${job.applicants} applicants</span>
                </div>
            </div>
            <div class="job-description">${this.escapeHtml(descriptionPreview).replace(/\n/g, '<br>')}</div>
            <div class="skills-list">
                ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <div class="job-actions">
                <div class="job-controls">
                    ${this.currentUser && this.currentUser.type === 'job_seeker' ? `
                        <button class="apply-btn ${hasApplied ? 'applied' : ''}" 
                                onclick="Opportune.applyForJob(${job.id})" 
                                ${hasApplied ? 'disabled' : ''}>
                            <i class="fas ${hasApplied ? 'fa-check' : 'fa-paper-plane'}"></i>
                            ${hasApplied ? 'Applied' : 'Apply Now'}
                        </button>
                    ` : ''}
                    ${isCurrentUserJob ? `
                        <button class="delete-job-btn" onclick="Opportune.deleteJob(${job.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    ` : ''}
                </div>
            </div>
        `;

        return jobDiv;
    }

    // Render applications
    renderApplications() {
        let applications = [];
        
        if (this.currentUser.type === 'job_seeker') {
            applications = this.applications.filter(app => app.applicant === this.currentUser.username);
        } else {
            // For employers, show applications to their jobs
            const employerJobs = this.jobs.filter(job => job.postedBy === this.currentUser.username);
            const employerJobIds = employerJobs.map(job => job.id);
            applications = this.applications.filter(app => employerJobIds.includes(app.jobId));
        }
        
        this.applicationsContainer.innerHTML = '';

        if (applications.length === 0) {
            this.applicationsContainer.innerHTML = `
                <div class="no-content">
                    <i class="fas fa-file-alt"></i>
                    <h3>No applications yet</h3>
                    <p>${this.currentUser.type === 'job_seeker' ? 'Start applying to jobs to see your applications here' : 'No one has applied to your jobs yet'}</p>
                </div>
            `;
            return;
        }

        applications.forEach(application => {
            const applicationElement = this.createApplicationElement(application);
            this.applicationsContainer.appendChild(applicationElement);
        });
    }

    // Create application element
    createApplicationElement(application) {
        const appDiv = document.createElement('div');
        appDiv.className = 'application-card';
        
        const statusClass = {
            'Applied': 'status-applied',
            'Reviewing': 'status-reviewing',
            'Interview': 'status-interview'
        }[application.status] || 'status-applied';

        appDiv.innerHTML = `
            <div class="application-status ${statusClass}">${application.status}</div>
            <h3>${this.escapeHtml(application.jobTitle)}</h3>
            <div class="company-name">${this.escapeHtml(application.company)}</div>
            <div class="application-meta">
                <div class="meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>Applied on ${application.appliedDate}</span>
                </div>
                ${this.currentUser.type === 'employer' ? `
                    <div class="meta-item">
                        <i class="fas fa-user"></i>
                        <span>Applicant: ${application.applicant}</span>
                    </div>
                ` : ''}
            </div>
        `;

        return appDiv;
    }

    // Notifications
    addNotification(title, text, type) {
        const notification = {
            id: Date.now(),
            title: title,
            text: text,
            time: 'Just now',
            read: false,
            type: type
        };
        
        this.notifications.unshift(notification);
        this.saveNotifications();
        this.updateNotificationCount();
        this.renderNotifications();
    }

    toggleNotifications() {
        const isVisible = this.notificationsPanel.style.display === 'block';
        this.notificationsPanel.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            this.renderNotifications();
        }
    }

    renderNotifications() {
        this.notificationsList.innerHTML = '';
        
        if (this.notifications.length === 0) {
            this.notificationsList.innerHTML = `
                <div style="padding: 20px; text-align: center; color: #718096;">
                    No notifications yet
                </div>
            `;
            return;
        }
        
        this.notifications.forEach(notification => {
            const notifDiv = document.createElement('div');
            notifDiv.className = `notification-item ${!notification.read ? 'unread' : ''}`;
            notifDiv.onclick = () => this.markAsRead(notification.id);
            
            notifDiv.innerHTML = `
                <div class="notification-title">${this.escapeHtml(notification.title)}</div>
                <div class="notification-text">${this.escapeHtml(notification.text)}</div>
                <div class="notification-time">${notification.time}</div>
            `;
            
            this.notificationsList.appendChild(notifDiv);
        });
    }

    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
            this.updateNotificationCount();
            this.renderNotifications();
        }
    }

    clearNotifications() {
        this.notifications = [];
        this.saveNotifications();
        this.updateNotificationCount();
        this.renderNotifications();
    }

    updateNotificationCount() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        this.notificationCount.textContent = unreadCount;
        this.notificationCount.style.display = unreadCount > 0 ? 'flex' : 'none';
    }

    // Save draft
    saveDraft() {
        const formData = new FormData(this.jobForm);
        const draft = {};
        
        for (let [key, value] of formData.entries()) {
            draft[key] = value.trim();
        }
        
        draft.timestamp = Date.now();
        localStorage.setItem('jobDraft', JSON.stringify(draft));
        this.showMessage('Draft saved successfully!', 'success');
    }

    // Load draft
    loadDraft() {
        const draft = localStorage.getItem('jobDraft');
        if (draft) {
            const draftData = JSON.parse(draft);
            Object.keys(draftData).forEach(key => {
                if (key !== 'timestamp') {
                    const element = document.getElementById(key);
                    if (element) {
                        element.value = draftData[key] || '';
                    }
                }
            });
        }
    }

    // Show section
    showSection(sectionName) {
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionName + 'Section');
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Activate corresponding nav button
        const navButtons = document.querySelectorAll('.nav-btn');
        const buttonTexts = ['jobs', 'post', 'applications', 'profile'];
        const buttonIndex = buttonTexts.indexOf(sectionName);
        if (buttonIndex !== -1 && navButtons[buttonIndex]) {
            navButtons[buttonIndex].classList.add('active');
        }
        
        // Load draft when entering post section
        if (sectionName === 'post') {
            setTimeout(() => this.loadDraft(), 100);
        }
        
        // Hide notifications panel
        this.notificationsPanel.style.display = 'none';
    }

    // Utility functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showMessage(message, type = 'success') {
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // Storage functions
    saveJobs() {
        localStorage.setItem('OpportuneJobs', JSON.stringify(this.jobs));
    }

    loadJobs() {
        const savedJobs = localStorage.getItem('OpportuneJobs');
        if (savedJobs) {
            this.jobs = JSON.parse(savedJobs);
        }
    }

    saveApplications() {
        localStorage.setItem('OpportuneApplications', JSON.stringify(this.applications));
    }

    loadApplications() {
        const savedApplications = localStorage.getItem('OpportuneApplications');
        if (savedApplications) {
            this.applications = JSON.parse(savedApplications);
        }
    }

    saveNotifications() {
        localStorage.setItem('OpportuneNotifications', JSON.stringify(this.notifications));
    }

    loadNotifications() {
        const savedNotifications = localStorage.getItem('OpportuneNotifications');
        if (savedNotifications) {
            this.notifications = JSON.parse(savedNotifications);
        }
    }

    loadData() {
        this.loadJobs();
        this.loadApplications();
        this.loadNotifications();
    }
}

// Global functions for onclick handlers
window.showSection = function(section) {
    Opportune.showSection(section);
};

window.toggleNotifications = function() {
    Opportune.toggleNotifications();
};

window.clearNotifications = function() {
    Opportune.clearNotifications();
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    window.Opportune = new Opportune();
});