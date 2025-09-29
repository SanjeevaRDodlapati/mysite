# 🧭 STEP 3: Navigation Structure Fix

**Date:** September 29, 2025  
**Status:** 🔄 IN PROGRESS

---

## 🎯 Current Problems

### Issue 1: Confusing "About" Label for Homepage
**Current Navigation:**
```
[About] [Machine Learning] [AI for Genomics] [AI for Chemistry]
```

**Problems:**
❌ Homepage labeled as "About" - confusing for users
❌ "About" typically means biography/CV page
❌ Users expect "Home" icon to return to start
❌ No clear separation between homepage and other content

### Issue 2: Missing "About Me" Page
**Current Situation:**
- Homepage (index.qmd) is labeled "About" in navbar
- No dedicated About/CV page exists
- Biography information mixed with hero landing page

**What Should Exist:**
- index.qmd = Homepage (landing page with hero)
- about.qmd = About Me (detailed bio, education, experience, publications)

### Issue 3: No Search Functionality
**Current State:**
- Search not enabled in _quarto.yml
- Users can't search blog posts or content
- Poor discoverability

---

## ✅ Solution Plan

### Fix 1: Rename Homepage Link
**Change navbar:**
```yaml
# BEFORE:
- href: index.html
  text: About
  icon: person-circle

# AFTER:
- href: index.html
  text: Home
  icon: house-fill
```

**Impact:**
✅ Clear that this returns to landing page
✅ Standard web convention (Home = start)
✅ Frees up "About" for proper bio page

### Fix 2: Update About Page
**Current about.qmd:**
- Check what content exists
- Either repurpose for detailed bio OR delete and recreate

**New about.qmd should contain:**
- Full professional biography
- Detailed education section (3 degrees with coursework)
- Work experience timeline
- Complete publications list (all 7 papers)
- All research projects (with details)
- Certifications and skills
- Awards and recognition
- Professional memberships

**Difference from Homepage:**
- Homepage = Hero + highlights + CTA
- About = Comprehensive CV/portfolio

### Fix 3: Add Search Functionality
**Add to _quarto.yml:**
```yaml
website:
  search:
    location: navbar
    type: overlay
```

**Benefits:**
✅ Users can search all content
✅ Find blog posts by keyword
✅ Navigate to specific topics quickly
✅ Better SEO

### Fix 4: Improve Navigation Structure
**Complete navbar hierarchy:**
```
┌─────────────────────────────────────────────────────┐
│ [🏠 Home] [👤 About] [🎓 Blog ▼]  [GitHub] [Twitter]│
└─────────────────────────────────────────────────────┘
            └─ Machine Learning
            └─ AI for Genomics  
            └─ AI for Chemistry
```

**Optional: Group blog categories under dropdown:**
```yaml
navbar:
  left:
    - href: index.html
      text: Home
      icon: house-fill
    - href: about.html
      text: About
      icon: person-circle
    - text: Blog
      icon: journal-text
      menu:
        - href: ml-blog.html
          text: Machine Learning
          icon: cpu
        - href: genomics-blog.html
          text: AI for Genomics
          icon: dna
        - href: chemistry-blog.html
          text: AI for Chemistry
          icon: flask
```

---

## 🔨 Implementation Steps

### Step 3A: Update Navigation Labels ✅
1. Change "About" → "Home" in navbar
2. Change icon from "person-circle" → "house-fill"
3. Render and test

### Step 3B: Enable Search ✅
1. Add search configuration to _quarto.yml
2. Render site to generate search index
3. Test search functionality

### Step 3C: Create Proper About Page (Optional)
1. Read current about.qmd
2. Decide: repurpose or recreate
3. Add comprehensive bio content
4. Add to navbar
5. Render and test

### Step 3D: Optional - Organize Blog Dropdown
1. Group ML/Genomics/Chemistry under "Blog" menu
2. Test dropdown functionality
3. Ensure mobile compatibility

---

## 📊 Expected Results

### Before:
```
Navigation: [About] [ML] [Genomics] [Chemistry]
Search: None
About page: Unclear purpose
```

### After:
```
Navigation: [Home] [About] [ML] [Genomics] [Chemistry] [🔍 Search]
Search: Working overlay search
About page: Dedicated bio/CV page
Homepage: Clear landing page identity
```

---

## 🎯 User Benefits

### Improved Discoverability:
✅ Search finds blog posts instantly
✅ Clear navigation labels
✅ Obvious homepage return path

### Better Information Architecture:
✅ Homepage = First impression + CTA
✅ About = Detailed credentials
✅ Blog = Content organized by topic

### Professional Presentation:
✅ Standard web conventions followed
✅ Easy to navigate
✅ Mobile-friendly dropdown (optional)

---

**Let's implement Step 3A and 3B first (navigation + search), then decide on 3C/3D!**
