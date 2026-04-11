# Fetch Job Data & Hackathon Data - Complete API Prompt

## Overview
This prompt defines the complete specifications for fetching job and hackathon data from the Learnova.ai API, including request parameters, response schemas, filtering options, and error handling.

---

## 📋 Table of Contents
1. [Job Data - Fetch Prompt](#job-data---fetch-prompt)
2. [Hackathon Data - Fetch Prompt](#hackathon-data---fetch-prompt)
3. [Response Schemas](#response-schemas)
4. [Error Handling](#error-handling)
5. [Filter Parameters](#filter-parameters)

---

## 🔴 Job Data - Fetch Prompt

### Purpose
Fetch available job listings with comprehensive details including company information, salary, skills required, and application details.

### Request Format
```
GET /api/jobs
GET /api/jobs/:id
GET /api/jobs?filter=active&search=developer&location=bangalore
```

### Request Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `search` | string | No | Search by job title, company name, or skills |
| `filter` | string | No | Filter by status: `active`, `closed`, `draft`, `all` |
| `location` | string | No | Filter by job location (city/country) |
| `employmentType` | string | No | `Internship`, `Full-time`, `Part-time`, `Contract` |
| `minSalary` | number | No | Minimum salary filter |
| `maxSalary` | number | No | Maximum salary filter |
| `skills` | array | No | Filter by required skills (comma-separated) |
| `experience` | number | No | Filter by minimum years of experience |
| `remote` | boolean | No | Filter by remote availability |
| `isFeatured` | boolean | No | Show only featured jobs |
| `sortBy` | string | No | Sort by: `recent`, `salary`, `salary-high`, `applications`, `views` |
| `page` | number | No | Pagination (default: 1) |
| `limit` | number | No | Results per page (default: 10, max: 50) |

### Example Requests

#### Get All Active Jobs
```bash
GET /api/jobs?filter=active&sortBy=recent&limit=20
```

#### Search for Frontend Developer Internships in Bangalore
```bash
GET /api/jobs?search=frontend&employmentType=Internship&location=bangalore&skills=React,JavaScript
```

#### Filter by Salary Range
```bash
GET /api/jobs?minSalary=50000&maxSalary=200000&location=bangalore&sortBy=salary-high
```

---

## 🟢 Hackathon Data - Fetch Prompt

### Purpose
Fetch hackathon events with full details including organizers, dates, prizes, themes, and registration information.

### Request Format
```
GET /api/hackathons
GET /api/hackathons/:id
GET /api/hackathons?filter=open&difficulty=intermediate&search=ai
```

### Request Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `search` | string | No | Search by hackathon title or organizer |
| `filter` | string | No | Filter by status: `open`, `upcoming`, `ongoing`, `closed`, `all` |
| `type` | string | No | `In-Person`, `Virtual`, `Hybrid` |
| `location` | string | No | Filter by location (city/country) |
| `difficulty` | string | No | `Beginner`, `Intermediate`, `Advanced` |
| `tags` | array | No | Filter by technology tags (comma-separated) |
| `themes` | array | No | Filter by themes: `Sustainability`, `AI/ML`, `FinTech`, etc. |
| `minPrizePool` | number | No | Minimum prize pool amount |
| `duration` | string | No | Filter by duration: `24hours`, `36hours`, `48hours`, `72hours` |
| `featured` | boolean | No | Show only featured hackathons |
| `trending` | boolean | No | Show only trending hackathons |
| `sortBy` | string | No | Sort by: `recent`, `trending`, `participants`, `prizePool`, `upcoming` |
| `page` | number | No | Pagination (default: 1) |
| `limit` | number | No | Results per page (default: 10, max: 50) |

### Example Requests

#### Get All Open Hackathons
```bash
GET /api/hackathons?filter=open&sortBy=trending&limit=20
```

#### Search for AI/ML Hackathons
```bash
GET /api/hackathons?search=ai&tags=AI/ML,Machine Learning&difficulty=intermediate
```

#### Get Virtual Hackathons for Beginners
```bash
GET /api/hackathons?type=Virtual&difficulty=Beginner&sortBy=trending
```

#### Find Upcoming Hackathons with High Prize Pools
```bash
GET /api/hackathons?filter=upcoming&minPrizePool=500000&sortBy=prizePool
```

---

## 📊 Response Schemas

### Job Object Schema

```json
{
  "id": "job_00123",
  "title": "Software Engineer Intern",
  "company": {
    "name": "Bluestock Fintech",
    "website": "https://bluestock.in",
    "logoUrl": "https://bluestock.in/logo.png",
    "industry": "FinTech",
    "size": "11-50 employees",
    "headquarters": "Mumbai, India",
    "foundedYear": 2020,
    "verified": true
  },
  "location": {
    "city": "Bangalore",
    "state": "Karnataka",
    "country": "India",
    "remote": false,
    "hybrid": true,
    "onsite": true
  },
  "employmentType": "Internship",
  "workMode": "Hybrid",
  "duration": "3 months",
  "stipend": {
    "min": 15000,
    "max": 25000,
    "currency": "INR",
    "period": "month"
  },
  "salary": null,
  "experienceRequired": {
    "minYears": 0,
    "maxYears": 1,
    "preferred": "Fresher"
  },
  "educationRequired": [
    "B.E/B.Tech",
    "BSc in Computer Science"
  ],
  "skillsRequired": [
    "JavaScript",
    "React.js",
    "Node.js",
    "MongoDB",
    "Next.Js",
    "Git"
  ],
  "languagesPreferred": [
    "English",
    "Hindi"
  ],
  "certificationsPreferred": [
    "React Developer Certification"
  ],
  "responsibilities": [
    "Develop and maintain web applications",
    "Collaborate with cross-functional teams",
    "Write clean, efficient, and testable code"
  ],
  "qualifications": [
    "Strong understanding of front-end technologies",
    "Knowledge of RESTful APIs"
  ],
  "perksAndBenefits": [
    "Certificate",
    "Pre-placement offer (PPO)",
    "Letter of Recommendation",
    "Work from home flexibility",
    "Startup culture"
  ],
  "applicationDetails": {
    "howToApply": "Apply via company website or send resume to hr@bluestock.in",
    "applicationDeadline": "2025-07-01",
    "questions": [
      "Why do you want to join Bluestock?",
      "Link to GitHub or portfolio?",
      "Are you available for a 3-month internship?"
    ]
  },
  "jobStatus": "active",
  "postedDate": "2025-06-10",
  "updatedDate": "2025-06-13",
  "expiryDate": "2025-07-01",
  "applicantsCount": 126,
  "viewsCount": 584,
  "isFeatured": true,
  "isNew": true,
  "tags": [
    "FinTech",
    "Internship",
    "RemoteOption",
    "Startup",
    "Entry Level"
  ],
  "recruiter": {
    "name": "Anjali Sharma",
    "designation": "HR Manager",
    "contactEmail": "anjali@bluestock.in",
    "linkedIn": "https://linkedin.com/in/anjalisharma"
  },
  "attachments": [
    {
      "type": "PDF",
      "url": "https://bluestock.in/job-description.pdf",
      "label": "Job Description"
    }
  ],
  "seo": {
    "metaTitle": "Software Engineer Intern at Bluestock Fintech",
    "metaDescription": "Apply for Software Engineer Internship in a fast-growing fintech startup in Bangalore.",
    "keywords": [
      "Software Engineer",
      "Fintech Internship",
      "React Developer",
      "Startup"
    ]
  }
}
```

### Hackathon Object Schema

```json
{
  "id": "hack_001",
  "title": "CodeStorm 2025",
  "organizer": "IIT Chennai",
  "description": "Build innovative solutions for real-world problems using cutting-edge technology",
  "longDescription": "Join CodeStorm 2025 - a global 48-hour hackathon bringing together developers, designers, and innovators. Compete for exciting prizes, learn from industry mentors, and build the next big thing!",
  "image": "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
  "bannerImage": "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=400&fit=crop",
  "logo": "https://via.placeholder.com/120",
  "status": "Open",
  "type": "In-Person",
  "location": "Chennai, India",
  "startDate": "2025-03-15",
  "endDate": "2025-03-17",
  "registrationDeadline": "2025-03-10",
  "duration": "48 hours",
  "participants": 450,
  "maxParticipants": 500,
  "prizePool": "₹5,00,000",
  "minTeamSize": 1,
  "maxTeamSize": 4,
  "tags": [
    "Web Development",
    "AI/ML",
    "Mobile Apps"
  ],
  "themes": [
    "Sustainability",
    "Education",
    "Healthcare"
  ],
  "difficulty": "Intermediate",
  "eligibility": "Open to all students and professionals",
  "rules": "Teams must submit projects before the deadline. All code must be original.",
  "websiteUrl": "https://www.codestorm.com",
  "discordUrl": "https://discord.gg/codestorm",
  "featured": true,
  "trending": true
}
```

### List Response Format

```json
{
  "success": true,
  "message": "Data fetched successfully",
  "data": [
    { "object": "..." }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  },
  "filters": {
    "applied": {
      "filter": "active",
      "sortBy": "recent"
    },
    "available": {
      "filters": ["active", "closed", "draft", "all"],
      "sortOptions": ["recent", "trending", "popular"],
      "tags": ["FinTech", "AI/ML", "Web Development"]
    }
  }
}
```

### Single Item Response Format

```json
{
  "success": true,
  "message": "Job/Hackathon details fetched successfully",
  "data": {
    "object": "..."
  },
  "relatedItems": {
    "similarJobs": [],
    "relatedHackathons": []
  }
}
```

---

## ⚠️ Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Error message",
  "error": {
    "code": "ERROR_CODE",
    "status": 400,
    "details": "Additional details about the error",
    "timestamp": "2025-04-11T10:30:00Z"
  }
}
```

### Common Error Codes
| Code | Status | Description |
|------|--------|-------------|
| `INVALID_FILTER` | 400 | Invalid filter parameter |
| `INVALID_SORT` | 400 | Invalid sort option |
| `INVALID_PAGE` | 400 | Invalid page number |
| `NOT_FOUND` | 404 | Resource not found |
| `SERVER_ERROR` | 500 | Internal server error |
| `RATE_LIMITED` | 429 | Too many requests |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Access denied |

### Example Error Response
```json
{
  "success": false,
  "message": "Job not found",
  "error": {
    "code": "NOT_FOUND",
    "status": 404,
    "details": "Job with ID 'job_12345' does not exist",
    "timestamp": "2025-04-11T10:30:00Z"
  }
}
```

---

## 🔍 Filter Parameters

### Job Filters

#### By Employment Type
```javascript
// GET /api/jobs?employmentType=Internship
// GET /api/jobs?employmentType=Full-time
// GET /api/jobs?employmentType=Part-time
// GET /api/jobs?employmentType=Contract

const employmentTypes = [
  "Internship",
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance"
];
```

#### By Work Mode
```javascript
// GET /api/jobs?remote=true
// GET /api/jobs?hybrid=true
// GET /api/jobs?onsite=true

const workModes = {
  remote: boolean,   // Work from anywhere
  hybrid: boolean,   // Mix of remote and office
  onsite: boolean    // Office-based
};
```

#### By Experience Level
```javascript
// GET /api/jobs?experience=0          // Fresher
// GET /api/jobs?experience=1-2        // Junior
// GET /api/jobs?experience=3-5        // Mid-level
// GET /api/jobs?experience=5+         // Senior

const experienceLevels = [
  "Fresher",
  "Junior (1-2 years)",
  "Mid-level (3-5 years)",
  "Senior (5+ years)",
  "Lead/Manager"
];
```

#### By Status
```javascript
// GET /api/jobs?filter=active         // Currently open
// GET /api/jobs?filter=closed         // Application closed
// GET /api/jobs?filter=draft          // Not yet published
// GET /api/jobs?filter=all            // All statuses

const jobStatuses = ["active", "closed", "draft", "expired", "all"];
```

#### By Skills (Multiple)
```javascript
// GET /api/jobs?skills=React,JavaScript,Node.js
// GET /api/jobs?skills=Python,Django,PostgreSQL

const techSkills = [
  "JavaScript",
  "React.js",
  "Node.js",
  "Python",
  "Django",
  "MongoDB",
  "PostgreSQL",
  "Git",
  "Docker",
  "AWS",
  "Next.Js",
  "TypeScript",
  "Vue.js",
  "Angular",
  "Express.js"
];
```

#### Sort Options
```javascript
// GET /api/jobs?sortBy=recent          // Newest first
// GET /api/jobs?sortBy=salary          // Lowest to highest
// GET /api/jobs?sortBy=salary-high     // Highest to lowest
// GET /api/jobs?sortBy=applications    // Most applications
// GET /api/jobs?sortBy=views           // Most views

const sortOptions = [
  "recent",
  "salary",
  "salary-high",
  "applications",
  "views",
  "deadline"
];
```

### Hackathon Filters

#### By Type
```javascript
// GET /api/hackathons?type=Virtual
// GET /api/hackathons?type=In-Person
// GET /api/hackathons?type=Hybrid

const hackathonTypes = ["In-Person", "Virtual", "Hybrid"];
```

#### By Difficulty Level
```javascript
// GET /api/hackathons?difficulty=Beginner
// GET /api/hackathons?difficulty=Intermediate
// GET /api/hackathons?difficulty=Advanced

const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];
```

#### By Status
```javascript
// GET /api/hackathons?filter=open           // Registration open
// GET /api/hackathons?filter=upcoming       // Not yet started
// GET /api/hackathons?filter=ongoing        // Currently running
// GET /api/hackathons?filter=closed         // Completed
// GET /api/hackathons?filter=all            // All statuses

const hackathonStatuses = ["open", "upcoming", "ongoing", "closed", "all"];
```

#### By Tags (Technology)
```javascript
// GET /api/hackathons?tags=AI/ML,Machine Learning
// GET /api/hackathons?tags=Web Development,React.js
// GET /api/hackathons?tags=FinTech,Blockchain

const technologyTags = [
  "Web Development",
  "AI/ML",
  "Mobile Apps",
  "FinTech",
  "Blockchain",
  "IoT",
  "Data Science",
  "Cloud Computing",
  "DevOps",
  "Security",
  "Game Development",
  "AR/VR"
];
```

#### By Themes
```javascript
// GET /api/hackathons?themes=Sustainability
// GET /api/hackathons?themes=Healthcare,Entertainment
// GET /api/hackathons?themes=Education

const themes = [
  "Sustainability",
  "Education",
  "Healthcare",
  "Payments",
  "Lending",
  "Investments",
  "Performance",
  "Climate",
  "Energy",
  "Waste Management",
  "Lifestyle",
  "Productivity",
  "Entertainment"
];
```

#### Sort Options
```javascript
// GET /api/hackathons?sortBy=recent           // Newest first
// GET /api/hackathons?sortBy=trending         // Trending now
// GET /api/hackathons?sortBy=participants     // Most participants
// GET /api/hackathons?sortBy=prizePool        // Highest prizes
// GET /api/hackathons?sortBy=upcoming         // Soonest deadline

const sortOptions = [
  "recent",
  "trending",
  "participants",
  "prizePool",
  "upcoming",
  "registrationDeadline"
];
```

---

## 📝 Complete Usage Examples

### Example 1: Search for React Developer Jobs
```bash
curl -X GET "http://localhost:5000/api/jobs?search=react&skills=React,JavaScript&employmentType=Full-time&location=bangalore&sortBy=recent&limit=15"
```

**Response:**
```json
{
  "success": true,
  "message": "5 jobs found",
  "data": [
    {
      "id": "job_001",
      "title": "React Developer",
      "company": { "name": "TechCorp", "industry": "Software" },
      "location": { "city": "Bangalore", "country": "India" },
      "employmentType": "Full-time",
      "skillsRequired": ["React", "JavaScript", "Node.js"],
      "salary": { "min": 600000, "max": 1200000, "currency": "INR" }
    }
  ],
  "pagination": { "page": 1, "limit": 15, "total": 5, "totalPages": 1 }
}
```

### Example 2: Fetch Open AI/ML Hackathons
```bash
curl -X GET "http://localhost:5000/api/hackathons?filter=open&tags=AI/ML&difficulty=Intermediate&sortBy=trending&limit=10"
```

**Response:**
```json
{
  "success": true,
  "message": "8 hackathons found",
  "data": [
    {
      "id": "hack_002",
      "title": "AI Innovation Challenge",
      "organizer": "Microsoft India",
      "type": "Virtual",
      "prizePool": "₹3,00,000",
      "tags": ["AI/ML", "Healthcare", "Data Science"],
      "difficulty": "Advanced",
      "registrationDeadline": "2025-03-25",
      "status": "Open"
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 8, "totalPages": 1 }
}
```

### Example 3: Get Single Job Details
```bash
curl -X GET "http://localhost:5000/api/jobs/job_00123"
```

**Response:**
```json
{
  "success": true,
  "message": "Job details fetched successfully",
  "data": {
    "id": "job_00123",
    "title": "Software Engineer Intern",
    "company": { "name": "Bluestock Fintech", "verified": true },
    "location": { "city": "Bangalore", "hybrid": true },
    "skillsRequired": ["JavaScript", "React.js", "Node.js"],
    "stipend": { "min": 15000, "max": 25000, "currency": "INR" }
  },
  "relatedItems": {
    "similarJobs": [3],
    "relatedHackathons": [2]
  }
}
```

---

## 🚀 Implementation Notes

1. **Caching**: Cache API responses for 5-10 minutes to improve performance
2. **Rate Limiting**: Implement rate limiting to prevent abuse (e.g., 100 requests/minute)
3. **Authentication**: Certain endpoints may require JWT authentication
4. **CORS**: Enable CORS for frontend requests
5. **Validation**: Validate all filter parameters on both frontend and backend
6. **Error Boundaries**: Implement proper error handling in UI components
7. **Pagination**: Always check `hasNext` before fetching more pages
8. **Search**: Use full-text search for better search results

---

## 📞 Support & Questions

For API issues or questions, contact:
- API Documentation: `/api/docs`
- Support Email: support@learnova.ai
- Discord: https://discord.gg/learnova
