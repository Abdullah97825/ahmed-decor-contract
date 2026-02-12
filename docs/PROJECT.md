# Ahmed Decor — Contract Generator Tool

## Overview

A simple web-based tool for generating manufacturing contracts for kitchens and decor. The tool provides an Arabic (RTL) form interface where staff fill in contract details, then print a professional A4 contract document.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: shadcn/ui + Tailwind CSS v4
- **Font**: Cairo (Arabic + Latin)
- **Language**: Arabic (RTL)
- **Print**: CSS `@media print` (browser native, A4 optimized)
- **Persistence**: None — fill and print only

## Contract Sections

### 1. Customer Info (معلومات الزبون)
- اسم الزبون (Customer Name)
- رقم الهاتف (Phone Number)
- العنوان (Address)
- تاريخ العقد (Contract Date)

### 2. Kitchen Dimensions (قياسات المطبخ)
Dynamic list of wall/section measurements:
- الجدار/القسم (Wall/Section label)
- الطول بالسنتمتر (Length in centimeters)
- الارتفاع بالسنتمتر (Height in centimeters)
- ملاحظات (Notes)

### 3. Colors (الألوان)
Dynamic list:
- رمز اللون (Color Code)
- ملاحظات (Notes — what it's used for)

### 4. Engravings (نقشات)
Dynamic list:
- رمز النقشة (Engraving Code)
- ملاحظات (Notes)

### 5. Doors (الأبواب)
Dynamic list of notes describing:
- Handle types (push, gola finger pull, j-pull, etc.)
- Any other door-related specifications

## Workflow

1. Open the tool in browser
2. Fill in all contract sections
3. Click "طباعة العقد" (Print Contract)
4. Browser print dialog opens → print to paper or PDF
5. Printed output is a clean, professional A4 contract with branded header and signature lines

## Translations Reference

| English | Arabic |
| --- | --- |
| Engravings | نقشات |
| Colors | الألوان |
| Kitchen dimensions | قياسات المطبخ |
| Customer name | اسم الزبون |
| Color/Engraving code | رمز اللون/النقشة |
| Doors | الأبواب |
