# 🔑 How to Get Your Supabase Project URL and Anon Key

## **Step-by-Step Guide with Screenshots**

### **Step 1: Go to Supabase Dashboard**
1. Open your web browser
2. Go to: **https://supabase.com/dashboard**
3. Sign in to your account (or create one if you don't have it)

### **Step 2: Select Your Project**
1. You'll see a list of your projects
2. Click on the project you want to use
3. If you don't have a project, click **"New Project"** to create one

### **Step 3: Navigate to API Settings**
1. In your project dashboard, look for the left sidebar
2. Click on **"Settings"** (usually at the bottom of the sidebar)
3. Then click on **"API"**

### **Step 4: Copy Your Credentials**
You'll see a page with your API credentials. Look for these two sections:

#### **Project URL**
- Look for **"Project URL"** section
- It will look like: `https://abcdefghijklmnop.supabase.co`
- Click the **copy button** next to it

#### **Anon Key**
- Look for **"Project API keys"** section
- Find the **"anon public"** key
- It's a long string starting with `eyJ...`
- Click the **copy button** next to it

## **Visual Guide (What You'll See)**

```
┌─────────────────────────────────────────────────────────┐
│  Supabase Dashboard                                     │
├─────────────────────────────────────────────────────────┤
│  Settings > API                                         │
│                                                         │
│  Project URL                                            │
│  ┌─────────────────────────────────────────────────┐   │
│  │ https://abcdefghijklmnop.supabase.co    [📋]   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Project API keys                                       │
│                                                         │
│  anon public                                            │
│  ┌─────────────────────────────────────────────────┐   │
│  │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... [📋]   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  service_role (secret)                                  │
│  ┌─────────────────────────────────────────────────┐   │
│  │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... [📋]   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## **What You Need to Copy**

### **1. Project URL**
- **What it looks like**: `https://abcdefghijklmnop.supabase.co`
- **Where to find it**: Under "Project URL" section
- **What to do**: Click the copy button (📋) next to it

### **2. Anon Key**
- **What it looks like**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY5ODc2ODAwMCwiZXhwIjoyMDE0MzQ0MDAwfQ.example_signature_here`
- **Where to find it**: Under "Project API keys" → "anon public"
- **What to do**: Click the copy button (📋) next to it

## **If You Don't Have a Supabase Account**

### **Create Account**
1. Go to **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with:
   - GitHub account (recommended)
   - Google account
   - Email address

### **Create New Project**
1. After signing up, click **"New Project"**
2. Choose your organization
3. Fill in project details:
   - **Name**: "Real Estate Website" (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location
4. Click **"Create new project"**
5. Wait for project to be created (takes 1-2 minutes)

## **After Getting Your Credentials**

### **Step 1: Create .env.local File**
1. In your project folder, create a new file called `.env.local`
2. Add this content:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

3. Replace the placeholder values with your actual credentials

### **Step 2: Example of What It Should Look Like**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY5ODc2ODAwMCwiZXhwIjoyMDE0MzQ0MDAwfQ.example_signature_here
```

## **Common Issues**

### **Issue 1: Can't Find the API Section**
- Make sure you're in the correct project
- Look for "Settings" in the left sidebar
- Then click "API"

### **Issue 2: Copy Button Not Working**
- Try right-clicking on the text and selecting "Copy"
- Or manually select the text and press Ctrl+C

### **Issue 3: Don't See "anon public" Key**
- Make sure you're looking under "Project API keys"
- It should be the first key listed
- If you only see "service_role", refresh the page

## **Security Note**
- ✅ **Safe to share**: Project URL and anon key are safe to use in frontend code
- ❌ **Never share**: service_role key (this is secret and should never be exposed)

## **Next Steps After Getting Credentials**
1. Create `.env.local` file with your credentials
2. Run `COMPLETE_DATABASE_SETUP.sql` in Supabase SQL Editor
3. Test with `node QUICK_TEST.js`
4. Start your development server: `npm run dev`

---

**Need help?** If you can't find these credentials, make sure you:
1. Are signed in to the correct Supabase account
2. Are in the correct project
3. Have the right permissions to view API settings
