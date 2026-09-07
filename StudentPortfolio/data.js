// =========================================================
// STUDENT PORTFOLIO - STATIC DATA
// All portfolio content is maintained in this single file.
// No Supabase/database connection is required.
// =========================================================

const portfolioData = {

    // =====================================================
    // ABOUT / PROFILE
    // =====================================================
    profile: {
        id: 1,
        full_name: "Faith M. Valencia",
        greeting_prefix: "Hi, I'm",
        role_quote: "Front-end Developer",
        intro_text:
            "Hello! I'm Faith, a 4th Year college student taking Bachelor of Science in Information Technology major in Business Analytics.",
        address: "San Pedro, Bauan, Batangas",
        birthday: "November 5, 2005",
        birth_place: "Bauan Doctors General Hospital",
        contact_number: "9938564676",
        civil_status: "Single",
        profile_image: "Profile Image.jpg",
        level_order: 1
    },

    // =====================================================
    // SOCIAL LINKS
    // =====================================================
    socialLinks: [
        {
            id: 1,
            label: "Facebook",
            url: "https://www.facebook.com/valencia.faith.05",
            icon_class: "fa-brands fa-facebook",
            level_order: 1
        },
        {
            id: 2,
            label: "Instagram",
            url: "https://www.instagram.com/_notur.fth",
            icon_class: "fa-brands fa-instagram",
            level_order: 2
        },
        {
            id: 3,
            label: "Email",
            url: "mailto:faithm.valencia5@gmail.com",
            icon_class: "fa-solid fa-envelope",
            level_order: 3
        },
        {
            id: 4,
            label: "GitHub",
            url: "https://github.com/FaithV5",
            icon_class: "fa-brands fa-github",
            level_order: 4
        }
    ],

    // =====================================================
    // ORGANIZATIONS
    // =====================================================
    organizations: [
        {
            id: 1,
            organization_name:
                "College of Informatics and Computing Sciences - Mabini Student Council",
            year_text: "2023 - Present",
            position_text:
                "Member (2023-2024) |\nBusiness Manager II (2025-2026) |\nMember (Present)",
            level_order: 1
        },
        {
            id: 2,
            organization_name:
                "Supreme Student Council - Mabini Campus",
            year_text: "2023 - Present",
            position_text:
                "Member (2023-2024) | Committee Chairperson on Records (2025-2026) | Member (Present)",
            level_order: 2
        }
    ],

    // =====================================================
    // EDUCATION
    // =====================================================
    education: {

        // -------------------------------------------------
        // GWA
        // -------------------------------------------------
        gwa: [
            {
                id: 6,
                label: "JHS",
                gwa: 90.0,
                rank: null,
                honor: "With Honors",
                level_order: 1
            },
            {
                id: 5,
                label: "SHS",
                gwa: 93.0,
                rank: null,
                honor: "With Honors",
                level_order: 2
            },
            {
                id: 1,
                label: "1st Year 1st Sem",
                gwa: 1.4457,
                rank: 2,
                honor: null,
                level_order: 3
            },
            {
                id: 2,
                label: "1st Year 2nd Sem",
                gwa: 1.2826,
                rank: 1,
                honor: null,
                level_order: 4
            },
            {
                id: 3,
                label: "2nd Year 1st Sem",
                gwa: 1.5652,
                rank: 6,
                honor: null,
                level_order: 5
            },
            {
                id: 4,
                label: "2nd Year 2nd Sem",
                gwa: 1.4783,
                rank: 5,
                honor: null,
                level_order: 6
            },
            {
                id: 7,
                label: "3rd Year 1st Sem",
                gwa: 1.5357,
                rank: 5,
                honor: null,
                level_order: 7
            },
            {
                id: 8,
                label: "3rd Year 2nd Sem",
                gwa: 1.5357,
                rank: 3,
                honor: null,
                level_order: 8
            }
        ],

        // -------------------------------------------------
        // EDUCATION TIMELINE
        // -------------------------------------------------
        timeline: [
            {
                id: 1,
                title: "College Student",
                date_range: "2023 - Present",
                institution: "BatStateU The NEU - Mabini Campus",
                role: "BS in Information Technology - Business Analytics",
                icon: "college",
                level_order: 1
            },
            {
                id: 2,
                title: "SHS Graduate",
                date_range: "2021-2023",
                institution: "AASMNHS",
                role: "Science, Technology, Engineering, and Mathematics (STEM)",
                icon: "school",
                level_order: 2
            },
            {
                id: 3,
                title: "JHS Graduate",
                date_range: "2017-2021",
                institution: "AASMNHS",
                role: "Secondary Education",
                icon: "junior",
                level_order: 3
            },
            {
                id: 4,
                title: "Elementary Graduate",
                date_range: "2010-2017",
                institution: "SMSPES",
                role: "Primary Education",
                icon: "elementary",
                level_order: 4
            }
        ]
    },

    // =====================================================
    // SKILLS
    // =====================================================
    skills: {

        // -------------------------------------------------
        // PROGRAMMING LANGUAGES
        // -------------------------------------------------
        programming: [
            {
                id: 1,
                name: "HTML",
                icon_class: "devicon-html5-plain colored",
                level_order: 1
            },
            {
                id: 2,
                name: "CSS",
                icon_class: "devicon-css3-plain colored",
                level_order: 2
            },
            {
                id: 3,
                name: "JavaScript",
                icon_class: "devicon-javascript-plain colored",
                level_order: 3
            },
            {
                id: 4,
                name: "Python",
                icon_class: "devicon-python-plain colored",
                level_order: 4
            },
            {
                id: 5,
                name: "Java",
                icon_class: "devicon-java-plain colored",
                level_order: 5
            },
            {
                id: 6,
                name: "C++",
                icon_class: "devicon-cplusplus-plain colored",
                level_order: 6
            },
            {
                id: 7,
                name: "Dart",
                icon_class: "devicon-dart-plain colored",
                level_order: 7
            }
        ],

        // -------------------------------------------------
        // REPOSITORY LANGUAGES
        // -------------------------------------------------
        repositoryLanguages: [
            {
                name: "HTML",
                repository_count: 7
            },
            {
                name: "JavaScript",
                repository_count: 3
            },
            {
                name: "Java",
                repository_count: 2
            },
            {
                name: "Python",
                repository_count: 1
            },
            {
                name: "C++",
                repository_count: 1
            },
            {
                name: "CSS",
                repository_count: 1
            },
            {
                name: "PHP",
                repository_count: 1
            }
        ],

        // -------------------------------------------------
        // TOOLS
        // -------------------------------------------------
        tools: [
            {
                id: 1,
                name: "GitHub",
                icon_class: "fa-brands fa-github",
                level_order: 1
            },
            {
                id: 2,
                name: "VS Code",
                icon_class: "devicon-vscode-plain colored",
                level_order: 2
            },
            {
                id: 3,
                name: "Linux",
                icon_class: "devicon-linux-plain colored",
                level_order: 3
            },
            {
                id: 4,
                name: "MySQL",
                icon_class: "devicon-mysql-plain colored",
                level_order: 4
            },
            {
                id: 5,
                name: "Code::Blocks",
                icon_class: "fa-solid fa-code",
                level_order: 5
            },
            {
                id: 6,
                name: "MySQL (XAMPP)",
                icon_class: "fa-solid fa-database",
                level_order: 6
            },
            {
                id: 7,
                name: "Cisco Packet Tracer",
                icon_class: "fa-solid fa-network-wired",
                level_order: 7
            },
            {
                id: 8,
                name: "IntelliJ IDEA Community",
                icon_class: "devicon-intellij-plain colored",
                level_order: 8
            },
            {
                id: 9,
                name: "Flutter",
                icon_class: "devicon-flutter-plain colored",
                level_order: 9
            }
        ],

        // -------------------------------------------------
        // SKILLS SETTINGS
        // -------------------------------------------------
        settings: {
            id: 1,
            github_username: "FaithV5",
            level_order: 1
        }
    },

    // =====================================================
    // SEMINARS
    // =====================================================
    seminars: [
        {
            id: 2,
            title: "Trick or Tech: The AI Dilemma",
            date_text: "November 18, 2025",
            institution: "Conducted by: CICS - MSC",
            marker_class: "technical",
            icon_class: "fas fa-robot",
            level_order: 2
        },
        {
            id: 3,
            title: "Fire Prevention and Emergency Response Training",
            date_text: "August 20, 2025",
            institution:
                "Conducted by: CICS - MSC in partnership with BFP R4 Mabini",
            marker_class: "safety",
            icon_class: "fas fa-fire-extinguisher",
            level_order: 3
        },
        {
            id: 4,
            title: "HerStory: Celebrating Women's Achievement and Empowerment",
            date_text: "March 5, 2025",
            institution:
                "SSC Alangilan - Mabini Campus in partnership with PNP Mabini",
            marker_class: "professional",
            icon_class: "fas fa-fist-raised",
            level_order: 4
        },
        {
            id: 5,
            title: "Capstone <Pro>osal Seminar: Sculpting Your Ideas into Reality",
            date_text: "January 31, 2025",
            institution: "Conducted by: CICS-MSC",
            marker_class: "technical",
            icon_class: "fas fa-lightbulb",
            level_order: 5
        },
        {
            id: 6,
            title: "Combating Cyber Harassment: Building a Safe and Inclusive Online Space",
            date_text: "November 25, 2024",
            institution: "Conducted by: CICS-MSC",
            marker_class: "professional",
            icon_class: "fas fa-shield-alt",
            level_order: 6
        },
        {
            id: 7,
            title: "Step Up: IT Career Development Road Map",
            date_text: "September 11, 2024",
            institution: "Conducted by: CICS-MSC",
            marker_class: "professional",
            icon_class: "fas fa-chart-line",
            level_order: 7
        },
        {
            id: 8,
            title: "Elevate Your Career: IT Career Guidance",
            date_text: "October 24, 2023",
            institution: "Conducted by: CICS-MSC",
            marker_class: "professional",
            icon_class: "fas fa-briefcase",
            level_order: 8
        }
    ],

    // =====================================================
    // PROJECTS
    // =====================================================
    projects: [

        // -------------------------------------------------
        // FEATURED PROJECTS
        // -------------------------------------------------
        {
            id: 1,
            section: "featured",
            title: "Mabini Tourism",
            year_text: "3rd Year",
            category: "web",
            icon_class: "fas fa-map-marked-alt",
            source_url: "https://github.com/FaithV5/Homepage",
            demo_url: "https://homepage-alpha-snowy.vercel.app/",
            demo_label: "Live Demo",
            level_order: 1
        },

        {
            id: 2,
            section: "featured",
            title: "KitchenCraft",
            year_text: "3rd Year",
            category: "web",
            icon_class: "fa-solid fa-kitchen-set",
            source_url: "https://github.com/FaithV5/KitchenCraft",
            demo_url: "https://kitchen-craft-nine.vercel.app/",
            demo_label: "Live Demo",
            level_order: 2
        },

        {
            id: 3,
            section: "featured",
            title: "FaithCafe",
            year_text: "3rd Year",
            category: "web",
            icon_class: "fas fa-coffee",
            source_url: "https://github.com/FaithV5/FaithCafe",
            demo_url: "https://faithcafe.vercel.app/",
            demo_label: "Live Demo",
            level_order: 3
        },

        {
            id: 4,
            section: "featured",
            title: "VistaMabini",
            year_text: "3rd Year",
            category: "web",
            icon_class: "fas fa-umbrella-beach",
            source_url: "https://github.com/FaithV5/Resort",
            demo_url: "https://resortbooking-azwf.onrender.com",
            demo_label: "Live Demo",
            level_order: 4
        },

        {
            id: 5,
            section: "featured",
            title: "Mae Cafe",
            year_text: "1st Year",
            category: "web",
            icon_class: "fas fa-coffee",
            source_url: "https://github.com/FaithV5/MaeCafe",
            demo_url: "https://mae-cafe.vercel.app/",
            demo_label: "Live Demo",
            level_order: 5
        },

        {
            id: 6,
            section: "featured",
            title: "JobBoard Pro",
            year_text: "2nd Year",
            category: "web",
            icon_class: "fas fa-briefcase",
            source_url: "https://github.com/FaithV5/JobBoard",
            demo_url: null,
            demo_label: null,
            level_order: 6
        },

        {
            id: 7,
            section: "featured",
            title: "AttendEase",
            year_text: "2nd Year",
            category: "software",
            icon_class: "fas fa-clipboard-check",
            source_url: "https://github.com/FaithV5/AttendEase",
            demo_url: null,
            demo_label: null,
            level_order: 7
        },

        {
            id: 8,
            section: "featured",
            title: "University Website",
            year_text: "3rd Year",
            category: "academic",
            icon_class: "fas fa-university",
            source_url: "https://github.com/FaithV5/University",
            demo_url: null,
            demo_label: null,
            level_order: 8
        },

        {
            id: 9,
            section: "featured",
            title: "Vendo Machine",
            year_text: "1st Year",
            category: "software",
            icon_class: "fas fa-cube",
            source_url: "https://github.com/FaithV5/Vendo",
            demo_url: null,
            demo_label: null,
            level_order: 9
        },

        // -------------------------------------------------
        // ANALYTICS / DATA PROJECTS
        // -------------------------------------------------
        {
            id: 10,
            section: "analytics",
            title: "Looker Dashboard",
            year_text: "3rd Year",
            category: "data",
            icon_class: "fas fa-chart-pie",
            source_url: null,
            demo_url:
                "https://lookerstudio.google.com/reporting/347073ab-1f44-432d-9ff1-03492168f8e7",
            demo_label: "View Dashboard",
            level_order: 1
        },

        {
            id: 11,
            section: "analytics",
            title: "Data Analysis",
            year_text: "3rd Year",
            category: "data",
            icon_class: "fas fa-chart-line",
            source_url: null,
            demo_url:
                "https://drive.google.com/drive/folders/1tV8wIU6DwRCXKqFtkcOwwsv80CWBD0zT?usp=sharing",
            demo_label: "Open Folder",
            level_order: 2
        },

        {
            id: 12,
            section: "analytics",
            title: "Data Management",
            year_text: "3rd Year",
            category: "data",
            icon_class: "fas fa-database",
            source_url: null,
            demo_url:
                "https://drive.google.com/drive/folders/1YAvEJlCXfCTlNtfi0PHkE7vdjrHg29gJ?usp=sharing",
            demo_label: "Open Folder",
            level_order: 3
        },

        {
            id: 13,
            section: "analytics",
            title: "Data Privacy",
            year_text: "3rd Year",
            category: "data",
            icon_class: "fas fa-user-shield",
            source_url: null,
            demo_url:
                "https://drive.google.com/drive/folders/16QZMHQWA5GuDQ5qIcEZJc8_2JYDvVhZv?usp=sharing",
            demo_label: "Open Folder",
            level_order: 4
        },

        {
            id: 14,
            section: "analytics",
            title: "Managing Data",
            year_text: "3rd Year",
            category: "data",
            icon_class: "fas fa-table",
            source_url: null,
            demo_url:
                "https://drive.google.com/drive/folders/1veqO7lQzsecdhmryxOZE-VbOzXMG36_2?usp=sharing",
            demo_label: "Open Folder",
            level_order: 5
        },

        // -------------------------------------------------
        // TINDACOUNT
        // -------------------------------------------------
        {
            id: 15,
            section: "featured",
            title: "TindaCount",
            year_text: "3rd Year",
            category: "Application",
            icon_class: "fas fa-mobile-phone",
            source_url:
                "https://github.com/FaithV5/TindaCount/releases/tag/TindaCount",
            demo_url:
                "https://github.com/FaithV5/TindaCount/releases/tag/TindaCount",
            demo_label: "Install Apk",
            level_order: 15
        }
    ]
};


// =========================================================
// MAKE DATA AVAILABLE TO THE WEBSITE
// =========================================================

if (typeof window !== "undefined") {
    window.portfolioData = portfolioData;
}