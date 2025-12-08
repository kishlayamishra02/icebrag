# Icebrag: 10-Day Development Plan

This is our complete step-by-step guide to building Icebrag from scratch. Everyone should follow this, and we'll get from zero to a fully launched app in 10 days.

## Our Team

1. **Abinash Karan** - Frontend Developer 1
2. **anshuman-work** - Frontend Developer 2
3. **iaman08** - Backend Developer
4. **Md. Kamran Alam** - AI Integration Developer
5. **Shiven Kathuria** - QA and Documentation
6. **srishtimehta-13** - Full-Stack Support
7. **Kishlaya (Me)** - Product Manager

---

## Day 1: Setup and Planning

This day is all about getting the foundation ready. Everyone should be able to run the project locally by the end of the day.

### What Kishlaya (PM) Should Do

**Morning - 2-3 hours**

1. Create a GitHub repository
   - Go to github.com and create a new repo named "icebrag"
   - Add a .gitignore file (use the Node.js template)
   - Create a README.md with a brief description
   - Create two branches: main and dev (we work on dev, merge to main when ready)
   - Invite all 6 team members as collaborators

2. Create a project document (use Notion or Google Docs)
   - Write down the project overview
   - List all MVP features: get random questions, submit questions, filter by category, vote, generate AI questions
   - Tech stack: React + Vite (frontend), Supabase (database), Gemini API (AI)
   - Team roles and responsibilities
   - 10-day timeline with daily goals
   - Git rules: everyone works on dev branch, only merge to main when tested

3. Set up a GitHub Issues/Kanban board
   - Create issues for each feature
   - Label them by feature type, priority, and assign to team members
   - Organize into time-based milestones (Day 1-2, Day 3-4, etc.)

**Afternoon - 1 hour**

4. See PrjectDetails.md

---

### What iaman08 (Backend Dev) Should Do

**Morning - 4-5 hours**

1. Create a Supabase project
   - Go to supabase.com and sign up if needed
   - Click "New Project"
   - Name it "icebrag"
   - Choose a region close to India (Singapore works well)
   - Set a strong password
   - Wait for the project to be created (this takes about 5-10 minutes)

2. Create the database table
   - Go to "SQL Editor" in the Supabase dashboard
   - Copy and run this SQL code:

```sql
create table questions (
  id uuid primary key default uuid_generate_v4(),
  text text not null,
  category text not null check (category in ('funny', 'professional', 'deep', 'other')),
  votes integer default 0,
  created_at timestamp with time zone default now(),
  created_by text
);

alter table questions enable row level security;

create policy "allow_read_questions" on questions
  for select using (true);

create policy "allow_insert_questions" on questions
  for insert with check (true);

create policy "allow_update_votes" on questions
  for update using (true);
```

3. Add some test data
   - In the SQL Editor, run this:

```sql
insert into questions (text, category, votes, created_by) values
('What superpower would you have and why?', 'funny', 5, 'admin'),
('Whats your go-to productivity hack?', 'professional', 3, 'admin'),
('If you could learn anything instantly, what would it be?', 'deep', 7, 'admin'),
('Describe your ideal weekend in 3 words', 'funny', 2, 'admin'),
('Whats the best advice youve ever received?', 'professional', 4, 'admin');
```

4. Get your API keys
   - Go to "Settings" then "API"
   - Copy the SUPABASE_URL (looks like https://xxxxx.supabase.co)
   - Copy the ANON_PUBLIC_KEY
   - Share both of these with Abinash and anshuman-work (they need it for the frontend)

**Afternoon - 1 hour**

5. Test that everything works
   - Create a folder called "supabase-test" on your computer
   - Run: npm init -y
   - Run: npm install @supabase/supabase-js
   - Create a file called test.js with this code:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('questions').select('*');
  console.log('Data:', data);
  console.log('Error:', error);
}

test();
```

   - Replace YOUR_SUPABASE_URL and YOUR_ANON_KEY with the ones you copied
   - Run: node test.js
   - If you see the 5 questions you added, everything is working

6. Document everything for the team
   - Create a file in the GitHub repo called BACKEND_SETUP.md
   - Write down the database table structure, the API keys, and how to use them
   - This helps the frontend developers know what they're working with

**By end of Day 1:**
- Supabase project is live
- Database has 5 test questions
- API keys are shared with frontend team
- Backend is tested and ready

---

### What Abinash (Frontend Dev 1) Should Do

**Afternoon - 3-4 hours**

1. Clone the GitHub repo and set up locally
   ```bash
   git clone https://github.com/[your-username]/icebrag.git
   cd icebrag
   git checkout dev
   ```

2. Create a new React project with Vite
   ```bash
   npm create vite@latest . -- --template react
   npm install
   ```

3. Install the tools you'll need
   ```bash
   npm install @supabase/supabase-js
   npm install axios
   ```

4. Create the folder structure for the project
   ```
   src/
     ├── components/
     │   ├── QuestionCard.jsx
     │   ├── QuestionForm.jsx
     │   ├── CategoryFilter.jsx
     │   └── Header.jsx
     ├── lib/
     │   └── supabaseClient.js
     ├── pages/
     │   └── Home.jsx
     ├── App.jsx
     ├── App.css
     └── main.jsx
   ```

5. Create the Supabase client file (src/lib/supabaseClient.js)
   ```javascript
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
   const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

   export const supabase = createClient(supabaseUrl, supabaseKey);
   ```

6. Create a .env file in the root directory
   ```
   VITE_SUPABASE_URL=YOUR_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
   ```
   (Get these from iaman08)

7. Create the main App.jsx file
   ```javascript
   import './App.css';
   import Header from './components/Header';
   import Home from './pages/Home';

   export default function App() {
     return (
       <div className="app">
         <Header />
         <main className="container">
           <Home />
         </main>
       </div>
     );
   }
   ```

8. Create the Header component (src/components/Header.jsx)
   ```javascript
   export default function Header() {
     return (
       <header className="header">
         <h1>Icebrag</h1>
         <p>Break the ice with fun questions</p>
       </header>
     );
   }
   ```

9. Create basic styling (src/App.css)
   ```css
   * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
   }

   body {
     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
     background: #f5f5f5;
     color: #333;
   }

   .app {
     min-height: 100vh;
     display: flex;
     flex-direction: column;
   }

   .header {
     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
     color: white;
     text-align: center;
     padding: 40px 20px;
   }

   .header h1 {
     font-size: 2.5rem;
     margin-bottom: 10px;
   }

   .header p {
     font-size: 1.1rem;
     opacity: 0.9;
   }

   .container {
     max-width: 800px;
     margin: 40px auto;
     padding: 20px;
     flex: 1;
   }
   ```

10. Create a placeholder Home page (src/pages/Home.jsx)
    ```javascript
    export default function Home() {
      return (
        <div className="home">
          <h2>Getting Random Questions...</h2>
          <p>More content coming soon!</p>
        </div>
      );
    }
    ```

11. Test that everything works
    ```bash
    npm run dev
    ```
    Open your browser to http://localhost:5173 and you should see the Icebrag header

12. Push your code to GitHub
    ```bash
    git add .
    git commit -m "feat: initial react vite setup with basic layout"
    git push origin dev
    ```

**By end of Day 1:**
- React project is set up
- Basic header and layout are done
- Code is pushed to GitHub
- App runs locally without errors

---

### What anshuman-work (Frontend Dev 2) Should Do

**Afternoon - 2-3 hours**

1. Get the latest code
   ```bash
   git clone https://github.com/[your-username]/icebrag.git
   cd icebrag
   git checkout dev
   npm install
   ```

2. Create the QuestionCard component (src/components/QuestionCard.jsx)
   ```javascript
   export default function QuestionCard({ question, onVote }) {
     if (!question) {
       return <div className="question-card placeholder">No question loaded yet</div>;
     }

     return (
       <div className="question-card">
         <div className="question-header">
           <span className="category-badge">{question.category}</span>
           <span className="votes">Votes: {question.votes}</span>
         </div>
         <p className="question-text">"{question.text}"</p>
         <div className="voting-buttons">
           <button onClick={() => onVote(question.id, 1)} className="btn btn-upvote">
             Upvote
           </button>
           <button onClick={() => onVote(question.id, -1)} className="btn btn-downvote">
             Downvote
           </button>
         </div>
       </div>
     );
   }
   ```

3. Create the CategoryFilter component (src/components/CategoryFilter.jsx)
   ```javascript
   export default function CategoryFilter({ onFilterChange }) {
     const categories = ['all', 'funny', 'professional', 'deep', 'other'];

     return (
       <div className="category-filter">
         <label>Filter by Category:</label>
         <div className="filter-chips">
           {categories.map((cat) => (
             <button
               key={cat}
               className="chip"
               onClick={() => onFilterChange(cat === 'all' ? null : cat)}
             >
               {cat}
             </button>
           ))}
         </div>
       </div>
     );
   }
   ```

4. Create the QuestionForm component (src/components/QuestionForm.jsx)
   ```javascript
   import { useState } from 'react';

   export default function QuestionForm({ onSubmit }) {
     const [text, setText] = useState('');
     const [category, setCategory] = useState('funny');
     const [loading, setLoading] = useState(false);

     const handleSubmit = async (e) => {
       e.preventDefault();
       if (!text.trim()) {
         alert('Please enter a question');
         return;
       }
       setLoading(true);
       await onSubmit({ text, category });
       setText('');
       setCategory('funny');
       setLoading(false);
     };

     return (
       <form onSubmit={handleSubmit} className="question-form">
         <h3>Submit Your Own Question</h3>
         <div className="form-group">
           <label htmlFor="question">Question:</label>
           <textarea
             id="question"
             value={text}
             onChange={(e) => setText(e.target.value)}
             placeholder="Enter an icebreaker question..."
             rows="3"
           />
         </div>
         <div className="form-group">
           <label htmlFor="category">Category:</label>
           <select
             id="category"
             value={category}
             onChange={(e) => setCategory(e.target.value)}
           >
             <option value="funny">Funny</option>
             <option value="professional">Professional</option>
             <option value="deep">Deep</option>
             <option value="other">Other</option>
           </select>
         </div>
         <button type="submit" className="btn btn-primary" disabled={loading}>
           {loading ? 'Submitting...' : 'Submit Question'}
         </button>
       </form>
     );
   }
   ```

5. Add styling to App.css
   ```css
   .question-card {
     background: white;
     border-radius: 12px;
     padding: 24px;
     margin-bottom: 20px;
     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
   }

   .question-header {
     display: flex;
     justify-content: space-between;
     align-items: center;
     margin-bottom: 16px;
   }

   .category-badge {
     background: #667eea;
     color: white;
     padding: 4px 12px;
     border-radius: 20px;
     font-size: 0.85rem;
     font-weight: bold;
   }

   .question-text {
     font-size: 1.2rem;
     margin-bottom: 20px;
     line-height: 1.6;
   }

   .voting-buttons {
     display: flex;
     gap: 10px;
   }

   .btn {
     padding: 10px 20px;
     border: none;
     border-radius: 8px;
     cursor: pointer;
     font-weight: bold;
   }

   .btn-upvote {
     background: #4ade80;
     color: white;
   }

   .btn-downvote {
     background: #f87171;
     color: white;
   }

   .btn-primary {
     background: #667eea;
     color: white;
   }

   .category-filter {
     margin-bottom: 30px;
     padding: 20px;
     background: white;
     border-radius: 12px;
   }

   .filter-chips {
     display: flex;
     gap: 10px;
     flex-wrap: wrap;
     margin-top: 10px;
   }

   .chip {
     padding: 8px 16px;
     border: 2px solid #667eea;
     background: white;
     color: #667eea;
     border-radius: 20px;
     cursor: pointer;
   }

   .question-form {
     background: white;
     padding: 24px;
     border-radius: 12px;
     margin-top: 30px;
   }

   .form-group {
     margin-bottom: 16px;
   }

   .form-group label {
     display: block;
     margin-bottom: 8px;
     font-weight: bold;
   }

   .form-group textarea,
   .form-group select {
     width: 100%;
     padding: 10px;
     border: 1px solid #ddd;
     border-radius: 8px;
     font-family: inherit;
     font-size: 1rem;
   }

   @media (max-width: 600px) {
     .header h1 {
       font-size: 1.8rem;
     }

     .voting-buttons {
       flex-direction: column;
     }

     .btn {
       width: 100%;
     }
   }
   ```

6. Push to GitHub
   ```bash
   git add .
   git commit -m "feat: add question card, filter, and form components with styles"
   git push origin dev
   ```

**By end of Day 1:**
- All components are created
- Styling is complete and responsive
- Code is pushed to GitHub

---

### What Md. Kamran Alam (AI Integration Dev) Should Do

**Afternoon - 2 hours**

1. Get your Gemini API key
   - Go to aistudio.google.com
   - Click "Create new API key"
   - Copy the key and save it somewhere private (never share this or commit it to GitHub)

2. Create a backend API endpoint
   - You have two options:

   **Option A: Use Vercel (recommended for deployment)**
   - Go to vercel.com and create an account
   - Create a file called /api/generate-question.js

   ```javascript
   import { GoogleGenerativeAI } from '@google/generative-ai';

   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

   export default async function handler(req, res) {
     if (req.method !== 'POST') {
       return res.status(405).json({ error: 'Method not allowed' });
     }

     const { category = 'funny' } = req.body;

     try {
       const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
       const prompt = `Generate exactly 1 short, fun, and engaging icebreaker question suitable for ${category} context. Keep it under 15 words. Return ONLY the question, no numbering or extra text.`;
       const result = await model.generateContent(prompt);
       const question = result.response.text().trim();

       res.status(200).json({ question, category });
     } catch (error) {
       console.error('Gemini API Error:', error);
       res.status(500).json({ error: 'Failed to generate question' });
     }
   }
   ```

   **Option B: Run a local Node.js server (better for development)**
   - Create a folder called api-server in your project
   - Run: npm init -y
   - Run: npm install express @google/generative-ai cors dotenv
   - Create server.js:

   ```javascript
   import express from 'express';
   import cors from 'cors';
   import dotenv from 'dotenv';
   import { GoogleGenerativeAI } from '@google/generative-ai';

   dotenv.config();

   const app = express();
   app.use(cors());
   app.use(express.json());

   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

   app.post('/api/generate-question', async (req, res) => {
     const { category = 'funny' } = req.body;

     try {
       const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
       const prompt = `Generate exactly 1 short, fun icebreaker question for ${category} context. Keep it under 15 words. Return ONLY the question.`;
       const result = await model.generateContent(prompt);
       const question = result.response.text().trim();

       res.json({ question, category });
     } catch (error) {
       console.error('Gemini Error:', error);
       res.status(500).json({ error: 'Failed to generate' });
     }
   });

   app.listen(5000, () => console.log('API running on port 5000'));
   ```

   - Create .env in api-server folder:
   ```
   GEMINI_API_KEY=your_key_here
   ```

   - Test it locally:
   ```bash
   cd api-server
   node server.js
   ```

3. Document how to use the API
   - Create API_INTEGRATION.md in the GitHub repo
   - Write down the endpoint, request format, and response format

**By end of Day 1:**
- Gemini API key obtained
- Backend function created
- Can generate questions via API

---

### What Shiven (QA & Documentation) Should Do

**Afternoon - 1.5 hours**

1. Create a test plan document (TEST_PLAN.md)
   - Write down what needs to be tested for each feature
   - Create a checklist for testing

2. Create a getting started guide (GETTING_STARTED.md)
   - Explain how to clone the repo
   - Explain how to install dependencies
   - Explain how to set up .env file
   - Explain how to run the app locally

3. Create a changelog (CHANGELOG.md)
   - Track what's been done, what's in progress, what's planned

4. Create a troubleshooting guide
   - Write down common problems and solutions

**By end of Day 1:**
- Test plan is ready
- Documentation is started

---

### What srishtimehta-13 (Full-Stack Support) Should Do

**Afternoon - 1 hour**

1. Clone the repo and set up locally
2. Make sure you can run the project
3. Test that Supabase connection works
4. Be ready to help unblock team members

---

## End of Day 1 Summary

By the end of Day 1, here's what should be done:

- PM: GitHub repo is set up, team is organized, everyone knows what to do
- Backend: Supabase is live with test data, API keys are shared
- Frontend 1: React app created with header and basic layout
- Frontend 2: Components created (QuestionCard, Filter, Form) with styling
- AI Dev: Gemini API is set up and tested
- QA: Documentation and test plan are started
- Support: Ready to help

Progress: 0% to 15%

---

## Day 2: Core Features Integration

Now we connect all the pieces. The frontend should talk to Supabase, and basic features should work.

### What iaman08 (Backend Dev) Should Do

**Morning - 3-4 hours**

Create helper functions that the frontend can use to talk to the database. Create a file called src/lib/questionsApi.js:

```javascript
import { supabase } from './supabaseClient';

export const fetchAllQuestions = async () => {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const fetchQuestionsByCategory = async (category) => {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getRandomQuestion = async (category = null) => {
  let query = supabase.from('questions').select('*');
  if (category) {
    query = query.eq('category', category);
  }
  const { data, error } = await query;
  if (error) throw error;
  if (data.length === 0) return null;
  return data[Math.floor(Math.random() * data.length)];
};

export const addQuestion = async (text, category, createdBy = 'anonymous') => {
  const { data, error } = await supabase
    .from('questions')
    .insert([{ text, category, created_by: createdBy }])
    .select();
  if (error) throw error;
  return data[0];
};

export const updateVotes = async (questionId, delta) => {
  const { data: question, error: fetchError } = await supabase
    .from('questions')
    .select('votes')
    .eq('id', questionId)
    .single();
  if (fetchError) throw fetchError;

  const newVotes = Math.max(0, (question.votes || 0) + delta);

  const { error } = await supabase
    .from('questions')
    .update({ votes: newVotes })
    .eq('id', questionId);
  if (error) throw error;

  return newVotes;
};

export const getTopQuestions = async (limit = 10) => {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('votes', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
};
```

Push to GitHub:
```bash
git add src/lib/questionsApi.js
git commit -m "feat: create questions API helper functions"
git push origin dev
```

---

### What Abinash (Frontend Dev 1) Should Do

**Morning - 4 hours**

Build the main page that ties everything together. Update src/pages/Home.jsx:

```javascript
import { useState, useEffect } from 'react';
import QuestionCard from '../components/QuestionCard';
import CategoryFilter from '../components/CategoryFilter';
import QuestionForm from '../components/QuestionForm';
import { getRandomQuestion, addQuestion, updateVotes } from '../lib/questionsApi';

export default function Home() {
  const [question, setQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRandomQuestion(selectedCategory);
      setQuestion(data);
    } catch (err) {
      setError('Failed to load question');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (category) => {
    setSelectedCategory(category);
    setQuestion(null);
    setLoading(true);
    try {
      const data = await getRandomQuestion(category);
      setQuestion(data);
    } catch (err) {
      setError('Failed to load question');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (questionId, delta) => {
    try {
      const newVotes = await updateVotes(questionId, delta);
      setQuestion({ ...question, votes: newVotes });
    } catch (err) {
      setError('Failed to vote');
    }
  };

  const handleSubmitQuestion = async ({ text, category }) => {
    try {
      await addQuestion(text, category);
      alert('Question added!');
      await fetchQuestion();
    } catch (err) {
      setError('Failed to add question');
    }
  };

  return (
    <div className="home">
      <CategoryFilter onFilterChange={handleFilterChange} />

      <div className="question-section">
        <button
          onClick={fetchQuestion}
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Random Icebreaker'}
        </button>

        {error && <div className="error-message">{error}</div>}
        <QuestionCard question={question} onVote={handleVote} />
      </div>

      <QuestionForm onSubmit={handleSubmitQuestion} />
    </div>
  );
}
```

Add this to App.css:
```css
.home {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 12px 16px;
  border-radius: 8px;
}
```

Test it:
```bash
npm run dev
```

Click the button and you should see a random question from the database.

Push to GitHub:
```bash
git add src/pages/Home.jsx src/App.css
git commit -m "feat: implement random question feature with filtering"
git push origin dev
```

---

### What anshuman-work (Frontend Dev 2) Should Do

**Morning - 3 hours**

Polish the form and make sure everything is responsive on mobile. Update src/components/QuestionForm.jsx:

```javascript
import { useState } from 'react';

export default function QuestionForm({ onSubmit }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('funny');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert('Please enter a question');
      return;
    }
    setLoading(true);
    try {
      await onSubmit({ text, category });
      setText('');
      setCategory('funny');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert('Failed to submit question');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <h3>Submit Your Own Question</h3>
      
      {success && <div className="success-message">Question submitted!</div>}

      <div className="form-group">
        <label htmlFor="question">Question *</label>
        <textarea
          id="question"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter an icebreaker question..."
          rows="3"
          maxLength="300"
          required
        />
        <small>{text.length}/300</small>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category *</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="funny">Funny</option>
          <option value="professional">Professional</option>
          <option value="deep">Deep</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Question'}
      </button>
    </form>
  );
}
```

Add responsive styles to App.css:
```css
.success-message {
  background: #efe;
  color: #3c3;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.btn-lg {
  padding: 12px 24px;
  font-size: 1.1rem;
}

@media (max-width: 480px) {
  .container {
    padding: 12px;
    margin: 20px auto;
  }

  .header h1 {
    font-size: 1.5rem;
  }

  .question-card {
    padding: 16px;
  }

  .question-form {
    padding: 16px;
  }
}
```

Test on mobile:
- Press F12 to open developer tools
- Click the mobile device icon
- Test on different widths (320px, 768px, 1024px)

Push to GitHub:
```bash
git add src/components/QuestionForm.jsx src/App.css
git commit -m "feat: improve form and mobile responsiveness"
git push origin dev
```

---

### What Shiven (QA & Documentation) Should Do

**Full Day**

Start testing everything that was built:
- Can you get a random question?
- Does filtering work?
- Can you submit a question?
- Do votes update?
- Does it work on mobile?

Create a file TEST_RESULTS_DAY2.md and document what works and what doesn't. If you find bugs, create GitHub issues for them.

Update the README.md:
```markdown
# Icebrag

Break the ice with fun, engaging questions!

## Features
- Get random icebreaker questions
- Filter by category
- Submit your own questions
- Vote on questions

## Tech Stack
- Frontend: React + Vite
- Backend: Supabase
- AI: Google Gemini API

## Getting Started
See GETTING_STARTED.md

## Status
In Development (Day 2/10)
```

---

## End of Day 2 Summary

- Backend: All API functions created
- Frontend 1: Random question feature working
- Frontend 2: Form polished and responsive
- QA: All features tested

Progress: 15% to 35%

---

## Day 3: AI Integration

Now we connect the Gemini API to the frontend and let users generate AI questions.

### What Abinash (Frontend Dev 1) Should Do

**Morning - 3-4 hours**

Create a button to generate AI questions. Create src/components/AIQuestionButton.jsx:

```javascript
import { useState } from 'react';
import { generateQuestion } from '../lib/geminiApi';

export default function AIQuestionButton({ category, onGenerateQuestion }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateAI = async () => {
    setLoading(true);
    setError(null);
    try {
      const question = await generateQuestion(category || 'funny');
      onGenerateQuestion(question);
    } catch (err) {
      setError('Failed to generate AI question. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-button-container">
      <button
        onClick={handleGenerateAI}
        className="btn btn-ai"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate AI Question'}
      </button>
      {error && <div className="error-small">{error}</div>}
    </div>
  );
}
```

Create src/lib/geminiApi.js:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const generateQuestion = async (category = 'funny') => {
  try {
    const response = await fetch(`${API_URL}/api/generate-question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category }),
    });

    if (!response.ok) throw new Error('Failed to generate question');
    const data = await response.json();
    return data.question;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
};
```

Update Home.jsx to include the AI button:
```javascript
// Add this to the imports
import AIQuestionButton from '../components/AIQuestionButton';

// Add this to the state
const [aiQuestion, setAiQuestion] = useState(null);

// Add this function
const handleGenerateAI = (generatedQuestion) => {
  setAiQuestion(generatedQuestion);
};

// Add the button to the JSX after QuestionCard
<AIQuestionButton
  category={selectedCategory}
  onGenerateQuestion={handleGenerateAI}
/>

{aiQuestion && (
  <div className="ai-question-container">
    <h3>AI Generated Question</h3>
    <p className="ai-question-text">"{aiQuestion}"</p>
    <div className="ai-actions">
      <button
        onClick={async () => {
          try {
            await addQuestion(aiQuestion, selectedCategory || 'other', 'ai-generated');
            alert('Question saved!');
            setAiQuestion(null);
          } catch (err) {
            setError('Failed to save question');
          }
        }}
        className="btn btn-success"
      >
        Save to Database
      </button>
      <button
        onClick={() => setAiQuestion(null)}
        className="btn btn-secondary"
      >
        Discard
      </button>
    </div>
  </div>
)}
```

Add styling:
```css
.ai-button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-ai {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-success {
  background: #4ade80;
  color: white;
}

.btn-secondary {
  background: #999;
  color: white;
}

.ai-question-container {
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border: 2px solid #667eea;
  border-radius: 12px;
  padding: 24px;
  margin-top: 20px;
}

.ai-question-text {
  font-size: 1.1rem;
  font-style: italic;
  margin-bottom: 20px;
}

.ai-actions {
  display: flex;
  gap: 10px;
}
```

Push to GitHub:
```bash
git add src/components/AIQuestionButton.jsx src/lib/geminiApi.js src/pages/Home.jsx src/App.css
git commit -m "feat: integrate Gemini AI question generation"
git push origin dev
```

---

### What srishtimehta-13 (Full-Stack Support) Should Do

**Morning - 3-4 hours**

Add extra features:
1. Create a "Top Questions" list that shows the most voted questions
2. Add a copy-to-clipboard button

Create src/components/TopQuestions.jsx:
```javascript
import { useState, useEffect } from 'react';
import { getTopQuestions } from '../lib/questionsApi';

export default function TopQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const data = await getTopQuestions(5);
        setQuestions(data);
      } catch (err) {
        console.error('Failed to fetch top questions', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTop();
  }, []);

  if (loading) return <div>Loading top questions...</div>;

  return (
    <div className="top-questions">
      <h3>Top Voted Questions</h3>
      <div className="questions-list">
        {questions.map((q) => (
          <div key={q.id} className="top-question-item">
            <span className="votes-badge">{q.votes} votes</span>
            <p>{q.text}</p>
            <span className="category-small">{q.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

Add styling:
```css
.top-questions {
  background: white;
  padding: 24px;
  border-radius: 12px;
  margin-top: 30px;
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.top-question-item {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.votes-badge {
  background: #fbbf24;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
}
```

Add to Home.jsx at the bottom, before closing div.

Push to GitHub:
```bash
git add src/components/TopQuestions.jsx src/App.css
git commit -m "feat: add top questions display"
git push origin dev
```

---

### What Shiven (QA & Documentation) Should Do

**Full Day**

Test everything end-to-end:
- Get a random question
- Filter by category
- Vote on questions
- Submit your own question
- Generate an AI question
- Save the AI question
- Check top questions list

Make sure it works on desktop and mobile. Create TEST_RESULTS_DAY3.md with results.

---

## End of Day 3 Summary

- All core features are working
- AI integration is complete
- Top questions feature added
- Everything tested

Progress: 35% to 50%

---

## Days 4-5: Polish and Testing

These two days are for:
- Fixing any bugs found during testing
- Making the app look better and faster
- Testing on real mobile devices
- Adding loading animations
- Optimizing performance

Focus on making the app production-ready.

---

## Days 6-7: Deployment

This is when we actually launch the app so people can use it.

### What Abinash (Frontend Dev 1) Should Do

1. Build the app for production:
   ```bash
   npm run build
   ```

2. Deploy to Netlify:
   - Go to netlify.com and sign up
   - Connect your GitHub repo
   - Set build command: npm run build
   - Set publish directory: dist
   - Click deploy

3. Test the live website and make sure everything works

---

### What Md. Kamran Alam (AI Dev) Should Do

If you're using the local server, deploy it:
- Option 1: Deploy to Vercel (set GEMINI_API_KEY environment variable)
- Option 2: Deploy to Railway or Render

Get the deployed URL and share with the frontend team so they can update their .env file.

---

### What Shiven (QA) Should Do

- Test the live website thoroughly
- Create a user guide with screenshots
- Document how to use the app
- Test on real mobile devices

---

## Days 8-10: Launch and Planning Next

- Launch the app to the team
- Get feedback from real users
- Fix any critical bugs
- Plan what features to add next (v2)

---

## Quick Command Reference

```bash
# Get the latest code
git pull origin dev

# Create a branch for your work
git checkout -b feature/your-feature-name

# After making changes
git add .
git commit -m "feat: describe what you did"
git push origin feature/your-feature-name

# Then create a Pull Request on GitHub for the team to review

# Run the app locally
npm run dev

# Build for production
npm run build
```

---

## Summary

This is your complete 10-day plan. Everyone knows what to do each day. The key is to stay organized, communicate regularly, and test everything before moving on.

By Day 10, you should have a fully functional Icebrag app deployed and ready for people to use.

Good luck with the build!
