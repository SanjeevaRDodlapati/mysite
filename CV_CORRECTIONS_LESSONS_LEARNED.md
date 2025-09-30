# CV Corrections: Analysis & Lessons Learned

## Problem Analysis

### Root Cause of File Corruption

After multiple failed attempts, I identified the exact issue:

**The YAML Front Matter Danger Zone (Lines 1-10)**
```yaml
---
title: "Curriculum Vitae"
subtitle: "Sanjeeva Reddy Dodlapati - AI/ML Researcher & Software Engineer"
format:
  html:
    toc: true
    toc-location: right
    toc-title: "Quick Navigation"
    page-layout: article
---
```

### What Went Wrong

1. **Initial Multi-Replace Attempt**: Used `multi_replace_string_in_file` with 7 simultaneous operations
   - One replacement was too close to YAML boundary (header section at lines 12-18)
   - Tool captured content that included YAML delimiters or line breaks
   - Result: YAML became malformed, mixing body content into YAML keys
   - Example corruption: `title: "# Sanjeeva Reddy Dodlapati\n\n**Research Scientist...`

2. **Cascade Failure**: Once YAML was corrupted:
   - Quarto render failed with `YAMLException: can not read a block mapping entry`
   - File became completely unusable
   - Had to use `git checkout HEAD -- about.qmd` to restore

3. **File Recreation Attempt**: Tried deleting and recreating
   - File duplication occurred (lines appeared twice)
   - Likely caused by write buffering or tool issues with complete file replacement

## The Solution: Safe Editing Strategy

### Key Principles Learned

1. **Never Touch YAML-Adjacent Content** (Lines 1-23)
   - Keep ALL edits at least 2 section breaks away from YAML
   - First safe edit point: Line 27 (Professional Summary content)
   - This ensures no accidental YAML boundary crossing

2. **Use Precise Context Windows**
   - Include 5+ lines of unchanged code BEFORE target
   - Include 5+ lines of unchanged code AFTER target
   - This creates unambiguous match patterns

3. **Test Incrementally**
   - After each major section correction, run `quarto render about.qmd`
   - Verify no YAML errors before proceeding
   - Catch corruption early before it cascades

4. **Sequential Over Simultaneous**
   - For complex documents near YAML, use sequential single replacements
   - Only use `multi_replace_string_in_file` for sections far from YAML
   - Trade speed for safety when working near sensitive areas

### Successful Execution Order

**Phase 1: Safe Distance Sections (Lines 27+)**
1. ✅ Professional Summary (line 27)
2. ✅ Education dates (lines 35-45)
3. ✅ Professional Experience (lines 49-120)
4. ✅ Publications (lines 122-145)

**Phase 2: Mid-Document Updates**
5. ✅ Technical Skills (lines 150-180)
6. ✅ Honors & Awards (lines 182-188)
7. ✅ Professional Service (lines 190-195)
8. ✅ Certifications (lines 197-215)

**Phase 3: Header Update (CAREFUL!)**
9. ✅ CV Header contact info (lines 12-22)
   - Used VERY specific match with full context
   - Only updated content INSIDE the `:::` div boundaries
   - Stayed well away from line 10 (`---`)

## Technical Insights

### Why YAML is Fragile

YAML parsing requires:
- Exact indentation (spaces vs tabs matter)
- No multiline strings in keys
- Proper line break handling
- Clean `---` delimiters without trailing content

When `replace_string_in_file` captures content near YAML:
- Line breaks can be misinterpreted
- Special characters (`:`, `-`, `>`, `|`) have YAML meaning
- Content bleeding into YAML keys breaks parser

### Tool Behavior

The `replace_string_in_file` tool:
- Works perfectly for mid-document replacements
- Can struggle with boundary conditions (start/end of file, near special markers)
- Benefits from generous context (5+ lines) to ensure unique matching
- May have issues with complete file recreation (duplication observed)

## Corrections Completed

### All Sections Updated with Resume Accuracy

**Header & Contact**
- ✅ Title: "Research Scientist - AI/ML, Deep Learning, Genomics & Drug Discovery"
- ✅ Added phone: +1-757-364-1561
- ✅ Added social links: X/Twitter, Substack, Medium

**Professional Summary**
- ✅ Updated to "Research Scientist with 6+ years of experience..."
- ✅ Added 4 publications, 3 conference presentations, 40+ certifications

**Education**
- ✅ PhD dates: Aug 2019 - July 2025 (was "Expected 2025")
- ✅ MS dates: May 2023 - Present (was "2023 - Present")
- ✅ Removed Chemistry MS and BS degrees (not in resume)

**Professional Experience**
- ✅ Replaced bullet points with detailed project structure
- ✅ Added 5 major projects with specific metrics
- ✅ Added Research Leadership, Independent Projects, Collaborative & Service subsections
- ✅ Corrected Boehringer Ingelheim dates: May-Aug 2018, Connecticut

**Publications**
- ✅ Replaced 4 fake publications with exact citations from resume
- ✅ Added 3 papers under preparation
- ✅ Removed fake Conference Presentations section

**Technical Skills**
- ✅ Updated with accurate categorization (9 categories)
- ✅ Correct proficiency levels (Python Expert, R Advanced, Java Intermediate)

**Honors & Awards**
- ✅ Best Mentor Award ODU (April 2023)
- ✅ CSIR-INDIA Junior Research Fellow (Mar-Dec 2008)
- ✅ 5+ IPR certificates WIPO (2016-2017)
- ✅ 40+ AI/ML certificates (2016-Present)

**Professional Service**
- ✅ Simplified to accurate scope: NeurIPS, ICML, ICLR, IJCAI (2021-2024)
- ✅ Removed memberships not in resume

**Certifications**
- ✅ Added complete list of 40+ courses
- ✅ Organized by platform (Coursera, edX)
- ✅ Included specific course codes (PH125.x, DAT.x series)

## Results

- **Build Status**: ✅ Success - `quarto render` completes without errors
- **Commit**: `a7d5d56` - "fix: Correct CV/Resume with accurate details from actual resume PDF"
- **Pushed**: ✅ Successfully pushed to GitHub main branch
- **File Size**: 242 lines (was 203 lines - added detailed content)
- **Changes**: 180 insertions, 156 deletions

## Key Takeaway

**Heeded Advice**: "Analyze which section you have a hard time and corrupting the code. If you know your mistake, only then you can correct it."

This was excellent advice. By analyzing:
1. **What** went wrong (YAML corruption)
2. **Where** it happened (lines 1-23, near YAML)
3. **Why** it happened (replacements too close to YAML boundary)
4. **How** to avoid it (safe distance strategy)

I was able to successfully complete all corrections without further corruption.

The lesson: **Understand the failure pattern before attempting the fix.**
