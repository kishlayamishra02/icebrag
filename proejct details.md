# Icebrag Project

This is everything we need to know. Just read it, and we're good to go.

---

## Message from Me :)

"Hey everyone, thanks for making time for this. I'm really excited about what we're about to build. So quick intro - I'm Kishlaya, I'll be managing this project and making sure we stay on track.

We have 10 days to build something really cool called Icebrag. It's going to be a fun app where people can get random icebreaker questions, submit their own questions, vote on the best ones, and even generate questions using AI. It's simple, it's useful, and it's something we can all be proud of.

I know some of you might be wondering why we're doing this. Honestly, we are a team of talented developers, and instead of just talking about building something, let's actually build it together. This will look amazing on everyone's portfolio, and we'll learn a ton in the process."

---

## What We're Building

"Okay, so imagine you're in a team meeting or a social event, and things are awkward. What do you do? You use Icebrag. You open it on your phone, click a button, and boom - you get a random icebreaker question. You can filter by what kind of question you want - funny, professional, deep, whatever. You can vote on questions that are actually good. You can submit your own questions so others can use them. And if you want something creative, you can generate an AI question using Google's Gemini API.

That's it. Simple, but actually useful. And it's something we can build in 10 days.

The app is going to work on desktop and mobile. It's going to be fast. It's going to look good. And most importantly, it's going to work properly."

---

## The Tech Stack

"Let me break down what we're using, because you all need to know this:

**Frontend - React and Vite:**
We're using React because it's what we know, and Vite because it's faster than Create React App. This handles all the UI stuff - the buttons, forms, the questions display, everything the user sees.

**Backend - Supabase:**
Supabase is like a super easy database that you don't have to manage yourself. It handles storing all our questions, letting us read them, add new ones, update votes - all the data stuff. It's free to start, and it's incredible.

**AI - Google Gemini API:**
This is how we generate creative questions. We send Gemini a prompt, it generates a cool icebreaker question, and we show it to the user. They can save it to our database if they like it.

**Hosting:**
Frontend goes on Netlify. Backend is handled by Supabase. AI endpoint goes on Vercel. All free to start.

So basically: You code in React, you talk to Supabase from the frontend, Supabase stores the data, you call Gemini API for AI questions. That's the whole thing."

---

## Team Roles and Responsibilities

"Okay, so here's what each of you is doing. I've already sent out your assignments, but let me explain:

**Abinash - Frontend Developer 1:**
Your job is to build the main interface. The random question button, the question display card, the category filtering. You're connecting the frontend to Supabase and making sure we can fetch questions and display them. You're also integrating the AI button on Day 3. Think of yourself as the person who makes sure users can actually interact with questions.

**Anshuman - Frontend Developer 2:**
You're handling the form where people submit their own questions. You're making sure the form looks good, validates properly, and submits to the database. You're also making sure everything works on mobile - if Abinash builds for desktop, you make sure it doesn't break on a phone. You're our responsive design expert.

**Aman - Backend Developer:**
You're setting up Supabase and creating the database. You're writing the API helper functions that the frontend developers will use to talk to Supabase. You're basically the middleman between the frontend and the database. Without you, there's nowhere to store questions.

**Md. Kamran Alam - AI Integration Developer:**
You're making the Gemini API work. You're setting up the endpoint that generates questions. You're making sure we can call it securely and get back good questions. On Day 2, you'll test it. On Day 3, Abinash will integrate it into the UI.

**Shiven Kathuria - QA and Documentation:**
You're testing everything. Like, actually trying to break things. If something doesn't work or looks weird, you report it. You're also writing down how to use the app, how to deploy it, how to set it up. Documentation is boring, but it's super important.

**Srishti Mehta - Full-Stack Support:**
You're like the utility player. If anyone gets stuck, you help them. You also add those nice-to-have features like a top questions list, copy-to-clipboard buttons, stuff like that.

**Me - Product Manager:**
I'm organizing everyone. I'm in standups every day checking that we're on track. I'm reviewing code. I'm making sure you're not blocked. I'm also the decision maker - if we need to cut a feature or change something, I decide that.

Everyone clear on their role? Good. Because the next 10 days, you're going to be heads down building."

---

## The 10-Day Timeline

"Alright, here's how the next 10 days are going to go:

**Day 1 - Today - Setup and Planning:**
This is foundation day. aAman, you're creating Supabase and seeding test data. Abinash, you're creating the React app and basic layout. Anshuman, you're building the components we need. Kamran, you're setting up the Gemini API. Shiven, you're writing the test plan and docs. By the end of today, everyone should be able to run the app locally. We're aiming for 15% done.

**Day 2 - Core Features:**
Everything starts connecting. The frontend talks to Supabase. You can get a random question, filter by category, vote, submit a question. By end of day, the app should actually work. We'll be at 35% done.

**Day 3 - AI Integration:**
Kamran, your API is ready. Abinash integrates it into the UI. Users can now generate AI questions. We add a top questions list. By end of day, all features are working. 50% done.

**Days 4-5 - Polish and Testing:**
Shiven, you're testing everything thoroughly. Everyone is fixing bugs. We're making the UI look better, optimizing performance, making sure it works on all devices. We should have zero critical bugs by end of Day 5. 70% done.

**Days 6-7 - Deployment:**
Abinash, you deploy the frontend to Netlify. Kamran, you deploy the API. We test the live website. By end of Day 7, the app is actually live on the internet. 85% done.

**Days 8-10 - Launch and Next Phase:**
We announce it to the team. We collect feedback. We fix anything that breaks in production. We plan what's next - maybe dark mode, sharing features, user accounts. By Day 10, we're done and we celebrate. 100% done."

---

## How We're Working Together

"So we've got 10 days. That's actually tight. Here's how we make sure we don't mess it up:

**Communication:**
We're using Whastapp for quick messages. If you have a question, ask there. Don't wait. If I'm bottlenecking something, let me know.

**GitHub:**
We're all working on the same codebase. You work on the dev branch. When you're done with something, you push it and create a pull request. I'll review it, someone else will look at it, and once it's good, we merge it. This way we're not stepping on each other's toes.

**Standups:**
Every morning, 10 AM IST, we do a 15-minute standup. You say: what did you do yesterday, what are you doing today, are you blocked. That's it. No meetings. Just sync up.

**Git Workflow:**
This is important. Everyone works on dev branch. Branch names are descriptive: feature/random-question, feature/voting-system, whatever. Commit messages are clear. When you're done with a feature, you push and create a PR. Someone reviews it, then it gets merged. We never push directly to main. Main is only for working code.

**Testing:**
Shiven, you're testing. But also, everyone should test their own code first before pushing. Test locally, test on mobile, test edge cases. Don't wait for Shiven to find your bugs."

---

## What Success Looks Like

"Here's what we need to hit to say we did good:

By end of Day 7:
- The app is deployed and live
- Anyone can go to the URL and use it
- Get random questions - works
- Filter by category - works
- Submit questions - works
- Vote - works
- Generate AI questions - works
- It looks good on desktop and mobile
- Zero critical bugs

By end of Day 10:
- Team has used it
- We got feedback
- We fixed anything broken
- We know what to build next

That's it. That's the bar."

---

## Common Issues We're Heading Off

"I'm going to predict some things that might go wrong, and let's just agree on how we handle them:

**API keys getting committed to GitHub:**
Don't do this. Use .env files. Iaman, Kamran, make sure the team knows this.

**Someone branches off main instead of dev:**
It happens. Just delete the branch and start over. Branching from dev.

**Two people editing the same file:**
Merge conflicts happen. Don't panic. GitHub will show you the conflict, you fix it, you push again. If you're stuck, ask.

**Feature takes longer than expected:**
Tell me immediately. We figure out if we cut it or extend the deadline. Don't just silently work extra late.

**Something breaks in production:**
We fix it fast. Priority number one. Everything else pauses.

**Someone gets stuck:**
Ask for help. Seriously. Don't struggle alone for 3 hours. Five minutes of asking saves you 2 hours of spinning."

---

## Deliverables and Documentatio

"Shiven, you're responsible for making sure we have:

- Getting started guide - how to set up the project locally
- API documentation - how the Supabase and Gemini APIs work
- Deployment guide - how to deploy to production
- User guide - how to actually use Icebrag
- Test plan - what features need to be tested

These don't need to be fancy. They just need to be clear. Think of them as guides for someone who's never seen the project before.

Everyone else, when you write code, write it clearly. Comment the confusing parts. Name variables well. Shiven will read it and write docs, but help them out."

---

## Final Checklist

"Okay, before we jump in, let me make sure everyone has what they need:

Everyone:
- Do you have the GitHub repo link?
- Do you know your role?

Iaman:
- Do you have the Supabase URL and API keys ready to share?

Kamran:
- Do you have your Gemini API key?

Shiven:
- Do you have the test plan template?

Abinash and anshuman:
- Are you ready to get Iaman's credentials and start building the React app?

If Yes? Great. Then we're good to go."

---

## The Actual Ask

"So here's what I need from you all:

One: Be all in. We're doing this for the next 10 days. That means focusing on this project. If you're on another project at the same time, let me know so I can adjust expectations.

Two: Communicate. If you're stuck, if something's wrong, if you need help - tell me. Don't assume I know. I'm not a mind reader.

Three: Take ownership. You're not working for me. You're building this with me. If you see something that needs to be done, do it. If you see a bug, fix it. Don't wait for me to tell you.

Four: Quality over speed. Yeah, we're in a rush, but we're not shipping garbage. Test your code. Make sure it works. Make sure it doesn't break other people's code.

Five: Have fun with this. You're building something real. People are going to use it. That's cool. Enjoy that."

---

## We've got 10 days. Let's build something awesome.
