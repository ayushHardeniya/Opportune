// Opportune - Job Portal Application
class Opportune {
    constructor() {
        this.currentUser = null;
        this.jobs = [];
        this.applications = [];
        this.notifications = [];
        this.savedJobs = [];
        this.currentSort = 'date-desc';
        
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
                salary: '₹75,00,000 - ₹1,10,00,000',
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
                salary: '₹1,00,00,000 - ₹1,35,00,000',
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
                salary: '₹15,000 - ₹25,000 per month',
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
                salary: '₹6,000 - ₹8,000 per hour',
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
        
        // Sort functionality
        const sortSelect = document.getElementById('sortFilter');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.renderJobs();
            });
        }
        
        // Salary filter
        const salaryFilter = document.getElementById('salaryFilter');
        if (salaryFilter) {
            salaryFilter.addEventListener('change', () => this.renderJobs());
        }
        
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
        const salaryFilter = document.getElementById('salaryFilter');
        const selectedSalary = salaryFilter ? salaryFilter.value : '';
        
        let filteredJobs = this.jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm) || 
                                job.company.toLowerCase().includes(searchTerm) ||
                                job.description.toLowerCase().includes(searchTerm) ||
                                job.skills.some(skill => skill.toLowerCase().includes(searchTerm));
            const matchesLocation = !selectedLocation || job.location === selectedLocation;
            const matchesType = !selectedType || job.type === selectedType;
            
            // Salary filtering (INR in lakhs)
            let matchesSalary = true;
            if (selectedSalary) {
                const salaryNum = this.extractSalaryNumber(job.salary);
                switch(selectedSalary) {
                    case 'under-50k':
                        matchesSalary = salaryNum < 500000;
                        break;
                    case '50k-100k':
                        matchesSalary = salaryNum >= 500000 && salaryNum < 1000000;
                        break;
                    case '100k-150k':
                        matchesSalary = salaryNum >= 1000000 && salaryNum < 2000000;
                        break;
                    case 'over-150k':
                        matchesSalary = salaryNum >= 2000000;
                        break;
                }
            }
            
            return matchesSearch && matchesLocation && matchesType && matchesSalary;
        });
        
        // Sort jobs
        filteredJobs = this.sortJobs(filteredJobs);

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
                                onclick="window.Opportune.applyForJob(${job.id})" 
                                ${hasApplied ? 'disabled' : ''}>
                            <i class="fas ${hasApplied ? 'fa-check' : 'fa-paper-plane'}"></i>
                            ${hasApplied ? 'Applied' : 'Apply Now'}
                        </button>
                        <button class="save-job-btn ${this.isJobSaved(job.id) ? 'saved' : ''}" 
                                onclick="window.Opportune.toggleSaveJob(${job.id})" 
                                title="${this.isJobSaved(job.id) ? 'Remove from saved' : 'Save job'}">
                            <i class="fas fa-bookmark"></i>
                        </button>
                    ` : ''}
                    ${isCurrentUserJob ? `
                        <button class="delete-job-btn" onclick="window.Opportune.deleteJob(${job.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                        <button class="view-applicants-btn" onclick="window.Opportune.viewApplicants(${job.id})">
                            <i class="fas fa-users"></i> View Applicants
                        </button>
                    ` : ''}
                    <button class="view-details-btn" onclick="window.Opportune.viewJobDetails(${job.id})">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
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
            ${this.currentUser.type === 'job_seeker' && application.status === 'Applied' ? `
                <div style="margin-top: 15px;">
                    <button class="withdraw-btn" onclick="window.Opportune.withdrawApplication(${application.id})">
                        <i class="fas fa-times"></i> Withdraw Application
                    </button>
                </div>
            ` : ''}
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
        const buttonTexts = ['jobs', 'saved', 'post', 'applications', 'profile'];
        const buttonIndex = buttonTexts.indexOf(sectionName);
        if (buttonIndex !== -1 && navButtons[buttonIndex]) {
            navButtons[buttonIndex].classList.add('active');
        }
        
        // Load draft when entering post section
        if (sectionName === 'post') {
            setTimeout(() => this.loadDraft(), 100);
        }
        
        // Render saved jobs when entering saved section
        if (sectionName === 'saved') {
            this.renderSavedJobs();
        }
        
        // Render profile content when entering profile section
        if (sectionName === 'profile') {
            this.renderProfileContent();
        }
        
        // Hide notifications panel
        this.notificationsPanel.style.display = 'none';
    }

    // Render profile content
    renderProfileContent() {
        const container = document.getElementById('profileContentContainer');
        if (!container) return;

        if (this.currentUser.type === 'job_seeker') {
            const userApps = this.applications.filter(app => app.applicant === this.currentUser.username);
            const statusCounts = {
                Applied: userApps.filter(app => app.status === 'Applied').length,
                Reviewing: userApps.filter(app => app.status === 'Reviewing').length,
                Interview: userApps.filter(app => app.status === 'Interview').length,
            };

            container.innerHTML = `
                <div class="profile-stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-paper-plane"></i>
                        <h4>${statusCounts.Applied}</h4>
                        <p>Applied</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-eye"></i>
                        <h4>${statusCounts.Reviewing}</h4>
                        <p>Under Review</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-calendar-check"></i>
                        <h4>${statusCounts.Interview}</h4>
                        <p>Interview Stage</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-bookmark"></i>
                        <h4>${this.savedJobs.length}</h4>
                        <p>Saved Jobs</p>
                    </div>
                </div>
                <div class="recent-activity">
                    <h4>Recent Applications</h4>
                    ${userApps.slice(0, 5).map(app => `
                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="fas fa-briefcase"></i>
                            </div>
                            <div class="activity-details">
                                <p><strong>${this.escapeHtml(app.jobTitle)}</strong> at ${this.escapeHtml(app.company)}</p>
                                <span class="activity-date">${app.appliedDate}</span>
                                <span class="application-status status-${app.status.toLowerCase()}">${app.status}</span>
                            </div>
                        </div>
                    `).join('') || '<p class="no-activity">No applications yet</p>'}
                </div>
            `;
        } else {
            const userJobs = this.jobs.filter(job => job.postedBy === this.currentUser.username);
            const totalApplicants = userJobs.reduce((sum, job) => sum + job.applicants, 0);

            container.innerHTML = `
                <div class="profile-stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-briefcase"></i>
                        <h4>${userJobs.length}</h4>
                        <p>Posted Jobs</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-users"></i>
                        <h4>${totalApplicants}</h4>
                        <p>Total Applicants</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-clock"></i>
                        <h4>${userJobs.filter(j => j.postedDate === new Date().toLocaleDateString()).length}</h4>
                        <p>Posted Today</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-chart-line"></i>
                        <h4>${userJobs.length > 0 ? Math.round(totalApplicants / userJobs.length) : 0}</h4>
                        <p>Avg. Applicants</p>
                    </div>
                </div>
                <div class="recent-activity">
                    <h4>Your Posted Jobs</h4>
                    ${userJobs.slice(0, 5).map(job => `
                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="fas fa-briefcase"></i>
                            </div>
                            <div class="activity-details">
                                <p><strong>${this.escapeHtml(job.title)}</strong></p>
                                <span class="activity-date">${job.postedDate}</span>
                                <span class="meta-badge">${job.applicants} applicants</span>
                            </div>
                        </div>
                    `).join('') || '<p class="no-activity">No jobs posted yet</p>'}
                </div>
            `;
        }
    }

    // Render saved jobs
    renderSavedJobs() {
        const savedJobsContainer = document.getElementById('savedJobsContainer');
        if (!savedJobsContainer) return;

        const savedJobsList = this.jobs.filter(job => this.isJobSaved(job.id));

        if (savedJobsList.length === 0) {
            savedJobsContainer.innerHTML = `
                <div class="no-content">
                    <i class="fas fa-bookmark"></i>
                    <h3>No saved jobs</h3>
                    <p>Save jobs you're interested in to view them here later</p>
                </div>
            `;
            return;
        }

        savedJobsContainer.innerHTML = '';
        savedJobsList.forEach(job => {
            const jobElement = this.createJobElement(job);
            savedJobsContainer.appendChild(jobElement);
        });
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
        const savedJobsList = localStorage.getItem('OpportuneSavedJobs');
        if (savedJobsList) this.savedJobs = JSON.parse(savedJobsList);
    }

    // Check if job is saved
    isJobSaved(jobId) {
        return this.savedJobs.includes(jobId);
    }

    // Toggle save job
    toggleSaveJob(jobId) {
        if (this.isJobSaved(jobId)) {
            this.savedJobs = this.savedJobs.filter(id => id !== jobId);
            this.showMessage('Job removed from saved', 'success');
        } else {
            this.savedJobs.push(jobId);
            this.showMessage('Job saved successfully!', 'success');
            this.addNotification('Job Saved', `You saved a job for later viewing`, 'save');
        }
        localStorage.setItem('OpportuneSavedJobs', JSON.stringify(this.savedJobs));
        this.renderJobs();
        
        // Also refresh saved jobs section if active
        if (document.getElementById('savedSection')?.classList.contains('active')) {
            this.renderSavedJobs();
        }
    }

    // Extract salary number for filtering
    extractSalaryNumber(salaryString) {
        const numbers = salaryString.match(/[\d,]+/g);
        if (!numbers) return 0;
        return parseInt(numbers[0].replace(/,/g, ''));
    }

    // Sort jobs
    sortJobs(jobs) {
        const sorted = [...jobs];
        switch(this.currentSort) {
            case 'date-desc':
                return sorted.sort((a, b) => b.id - a.id);
            case 'date-asc':
                return sorted.sort((a, b) => a.id - b.id);
            case 'salary-desc':
                return sorted.sort((a, b) => this.extractSalaryNumber(b.salary) - this.extractSalaryNumber(a.salary));
            case 'salary-asc':
                return sorted.sort((a, b) => this.extractSalaryNumber(a.salary) - this.extractSalaryNumber(b.salary));
            case 'applicants':
                return sorted.sort((a, b) => b.applicants - a.applicants);
            default:
                return sorted;
        }
    }

    // View job details in modal
    viewJobDetails(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;

        const hasApplied = this.applications.some(app => 
            app.jobId === jobId && app.applicant === this.currentUser.username
        );

        const modalHTML = `
            <div class="job-detail-modal" onclick="this.remove()">
                <div class="job-detail-content" onclick="event.stopPropagation()">
                    <button class="close-modal-btn" onclick="this.closest('.job-detail-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="job-detail-header">
                        <h2>${this.escapeHtml(job.title)}</h2>
                        <h3>${this.escapeHtml(job.company)}</h3>
                    </div>
                    <div class="job-detail-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                        <span><i class="fas fa-clock"></i> ${job.type}</span>
                        <span><i class="fas fa-dollar-sign"></i> ${job.salary}</span>
                        <span><i class="fas fa-user-tie"></i> ${job.experience}</span>
                        <span><i class="fas fa-users"></i> ${job.applicants} applicants</span>
                        <span><i class="fas fa-calendar"></i> ${job.postedDate}</span>
                    </div>
                    <div class="job-detail-skills">
                        ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                    <div class="job-detail-description">
                        <h4>Job Description</h4>
                        <p>${this.escapeHtml(job.description).replace(/\n/g, '<br>')}</p>
                    </div>
                    ${this.currentUser && this.currentUser.type === 'job_seeker' ? `
                        <div class="job-detail-actions">
                            <button class="apply-btn ${hasApplied ? 'applied' : ''}" 
                                    onclick="window.Opportune.applyForJob(${job.id}); this.closest('.job-detail-modal').remove();" 
                                    ${hasApplied ? 'disabled' : ''}>
                                <i class="fas ${hasApplied ? 'fa-check' : 'fa-paper-plane'}"></i>
                                ${hasApplied ? 'Already Applied' : 'Apply Now'}
                            </button>
                            <button class="save-job-btn ${this.isJobSaved(job.id) ? 'saved' : ''}" 
                                    onclick="window.Opportune.toggleSaveJob(${job.id})">
                                <i class="fas fa-bookmark"></i> ${this.isJobSaved(job.id) ? 'Saved' : 'Save Job'}
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // View applicants for a job
    viewApplicants(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;

        const jobApplications = this.applications.filter(app => app.jobId === jobId);

        const modalHTML = `
            <div class="job-detail-modal" onclick="this.remove()">
                <div class="job-detail-content applicants-modal" onclick="event.stopPropagation()">
                    <button class="close-modal-btn" onclick="this.closest('.job-detail-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                    <h2>Applicants for ${this.escapeHtml(job.title)}</h2>
                    <p class="applicants-count">${jobApplications.length} total applicant${jobApplications.length !== 1 ? 's' : ''}</p>
                    <div class="applicants-list">
                        ${jobApplications.length === 0 ? `
                            <div class="no-applicants">
                                <i class="fas fa-inbox"></i>
                                <p>No applications yet</p>
                            </div>
                        ` : jobApplications.map(app => `
                            <div class="applicant-card">
                                <div class="applicant-info">
                                    <h4>${app.applicant}</h4>
                                    <p><i class="fas fa-calendar"></i> Applied on ${app.appliedDate}</p>
                                    <span class="application-status status-${app.status.toLowerCase()}">${app.status}</span>
                                </div>
                                <div class="applicant-actions">
                                    <button class="status-btn" onclick="window.Opportune.updateApplicationStatus(${app.id}, 'Reviewing')">
                                        <i class="fas fa-eye"></i> Review
                                    </button>
                                    <button class="status-btn" onclick="window.Opportune.updateApplicationStatus(${app.id}, 'Interview')">
                                        <i class="fas fa-calendar-check"></i> Interview
                                    </button>
                                    <button class="status-btn reject" onclick="window.Opportune.updateApplicationStatus(${app.id}, 'Rejected')">
                                        <i class="fas fa-times"></i> Reject
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Update application status
    updateApplicationStatus(appId, newStatus) {
        const app = this.applications.find(a => a.id === appId);
        if (!app) return;

        app.status = newStatus;
        this.saveApplications();
        this.showMessage(`Application status updated to ${newStatus}`, 'success');
        
        // Close and reopen modal to refresh
        document.querySelector('.job-detail-modal')?.remove();
        this.viewApplicants(app.jobId);
    }

    // Withdraw application
    withdrawApplication(appId) {
        if (!confirm('Are you sure you want to withdraw this application?')) return;

        const appIndex = this.applications.findIndex(app => app.id === appId);
        if (appIndex > -1) {
            this.applications.splice(appIndex, 1);
            this.saveApplications();
            this.renderApplications();
            this.showMessage('Application withdrawn successfully', 'success');
        }
    }
}

// Global functions for onclick handlers
window.showSection = function(section) {
    window.Opportune.showSection(section);
};

window.toggleNotifications = function() {
    window.Opportune.toggleNotifications();
};

window.clearNotifications = function() {
    window.Opportune.clearNotifications();
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    window.Opportune = new Opportune();
});