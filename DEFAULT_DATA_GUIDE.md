# Default Data Implementation Guide

## Overview
This guide explains how to use the comprehensive default data for Jobs and Hackathons in the Learnova.ai application.

## Files Created/Modified

### 1. **Default Data File** 
📁 `src/constants/defaultData.js`
- Contains all mock data for the application
- **New additions:**
  - Extended MOCK_JOBn S (5 jobs with complete details)
  - MOCK_HACKATHONS (6 hackathons with complete details)
  - Updated FULL_DEFAULT_DATA export
  - Updated FULL_MOCK_DATA export

### 2. **Components Created**

#### 📄 `src/components/DefaultJobsDisplay.jsx`
Displays jobs data with:
- Job list sidebar
- Detailed job information panel
- Save/bookmark functionality
- Share options
- Search and filtering UI ready
- Responsive design

**Features:**
- Side-by-side view
- Job details with requirements, responsibilities
- Skills tags
- Apply button CTA
- Dark/Light theme support

#### 📄 `src/components/DefaultHackathonsDisplay.jsx`
Displays hackathons data with:
- Hackathon list sidebar
- Detailed hackathon information panel
- Featured/Trending badges
- Important dates section
- Theme and technology tags
- Registration buttons

**Features:**
- Beautiful banner images
- Status indicators
- Days remaining countdown
- Participant count
- Prize pool display
- External links to hackathon sites

### 3. **Demo Page**
📄 `src/pages/DefaultDataShowcasePage.jsx`
- Tab-based interface to switch between jobs and hackathons
- Shows how to use both components together
- Easy navigation

## How to Use

### Option 1: View Demo Page
Add this route to your Router:

```jsx
import DefaultDataShowcasePage from './pages/DefaultDataShowcasePage';

// In your router configuration:
{
  path: '/demo',
  element: <DefaultDataShowcasePage />
}
```

Then navigate to `/demo` to see the default data rendered.

### Option 2: Use in Your Existing Pages

#### For Jobs Page:
```jsx
import DefaultJobsDisplay from '../components/DefaultJobsDisplay';

// In your existing JobsPage or LearnHub:
export default function JobsPage() {
  const [useDefaultData, setUseDefaultData] = useState(false);

  if (useDefaultData) {
    return <DefaultJobsDisplay />;
  }

  // Your existing JSX...
}
```

#### For Hackathons Page:
```jsx
import DefaultHackathonsDisplay from '../components/DefaultHackathonsDisplay';

// In your existing HackathonPage or LearnHub:
export default function HackathonPage() {
  const [useDefaultData, setUseDefaultData] = useState(false);

  if (useDefaultData) {
    return <DefaultHackathonsDisplay />;
  }

  // Your existing JSX...
}
```

### Option 3: Import Individual Data

```javascript
import { 
  MOCK_JOBS, 
  MOCK_HACKATHONS,
  FULL_MOCK_DATA 
} from './constants/defaultData';

// Use directly in your components
const jobs = MOCK_JOBS;
const hackathons = MOCK_HACKATHONS;
```

## Data Structure

### Job Object
```javascript
{
  id: "job_001",
  title: "Senior React Developer",
  company: "Tech Corp",
  location: "San Francisco, CA",
  salary: "$120,000 - $160,000",
  description: "...",
  requirements: ["..."],
  responsibilities: ["..."],
  jobType: "Full-time",
  experience: "5+ years",
  tags: ["React", "JavaScript", "Frontend"],
  applicants: 45,
  status: "open",
  postedDate: "2025-01-01T...",
  deadline: "2025-02-01T...",
  Company: { name: "Tech Corp", logo: "..." }
}
```

### Hackathon Object
```javascript
{
  id: "hack_001",
  title: "CodeStorm 2025",
  organizer: "IIT Chennai",
  description: "...",
  longDescription: "...",
  image: "https://...",
  bannerImage: "https://...",
  status: "Open",
  type: "In-Person",
  location: "Chennai, India",
  startDate: "2025-03-15",
  endDate: "2025-03-17",
  registrationDeadline: "2025-03-10",
  duration: "48 hours",
  participants: 450,
  maxParticipants: 500,
  prizePool: "₹5,00,000",
  tags: ["Web Development", "AI/ML"],
  themes: ["Sustainability", "Education"],
  difficulty: "Intermediate",
  featured: true,
  trending: true,
  websiteUrl: "https://...",
  discordUrl: "https://..."
}
```

## Features

### Jobs Display
✅ Interactive job selection
✅ Detailed view with full information
✅ Save/bookmark jobs
✅ Share functionality
✅ Requirements & Responsibilities display
✅ Skills tags
✅ Apply button
✅ Responsive design (mobile & desktop)
✅ Dark/Light theme support

### Hackathons Display
✅ Featured & trending badges
✅ Important dates section
✅ Countdown timer (days left)
✅ Participant counter
✅ Prize pool display
✅ Technology tags
✅ Theme categories
✅ External links
✅ Registration button
✅ Difficulty level indicator
✅ Status badges

## Customization

### Add More Jobs
Edit `src/constants/defaultData.js` and add to `MOCK_JOBS`:
```javascript
export const MOCK_JOBS = [
  // ... existing jobs
  {
    id: "job_006",
    title: "Your Job Title",
    // ... other properties
  }
];
```

### Add More Hackathons
Edit `src/constants/defaultData.js` and add to `MOCK_HACKATHONS`:
```javascript
export const MOCK_HACKATHONS = [
  // ... existing hackathons
  {
    id: "hack_007",
    title: "Your Hackathon",
    // ... other properties
  }
];
```

### Modify Component Styling
Both components use `useThemeStore()` for theme colors. Customize by:
1. Accessing theme class variables
2. Modifying color mappings in the component
3. Updating tailwind classes

## Integration Points

### With Zustand Stores
If you want to load default data into your Zustand stores:

```javascript
import { MOCK_JOBS, MOCK_HACKATHONS } from '../constants/defaultData';
import useJobStore from '../zustand/recruiter/useJobStore';

const { setJobs } = useJobStore();

// Load defaults
setJobs(MOCK_JOBS);
```

### With API
To replace with real API data:

```javascript
useEffect(() => {
  // Try API first
  fetchJobs()
    .catch(() => {
      // Fallback to defaults
      setJobs(MOCK_JOBS);
    });
}, []);
```

## Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Performance
- All components use React hooks efficiently
- Memoization ready for large datasets
- Lazy loading compatible
- Virtual scrolling ready

## Next Steps

1. **Add to Routes** - Add DefaultDataShowcasePage to your router
2. **Integrate with Pages** - Use components in your existing pages
3. **Connect to Backend** - Replace mock data with API calls when ready
4. **Customize** - Modify colors, add more jobs/hackathons as needed

## API Migration

When you're ready to connect to your backend, simply replace the mock data with API calls:

```javascript
// Before (using mock data)
const [jobs] = useState(MOCK_JOBS);

// After (using API)
const [jobs, setJobs] = useState([]);

useEffect(() => {
  const fetchJobs = async () => {
    const response = await axiosInstance.get('/jobs');
    setJobs(response.data);
  };
  fetchJobs();
}, []);
```

## Questions?
Check the component implementation in:
- `src/components/DefaultJobsDisplay.jsx`
- `src/components/DefaultHackathonsDisplay.jsx`
- `src/constants/defaultData.js`

All components include detailed comments explaining their functionality.
