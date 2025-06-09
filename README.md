# 📌 Resume Matcher using GenAI (Document Similarity & Ranking)

This project automates the matching of Job Descriptions (JDs) to consultant profiles using Generative AI. It extracts text from resumes and JDs, generates semantic embeddings, calculates similarity, ranks the top matches, and emails the recruiter with results and attachments.

> 🔧 Built for the **Mavericks GenAI Designathon (2025)**

---

## 🎯 Problem Statement

In traditional recruitment, manually comparing JDs with consultant resumes is time-consuming and error-prone. This solution automates:
- Semantic matching of JDs and resumes
- Ranking top 3 most relevant consultant profiles
- Sending auto-generated emails with attachments
- Visibility via optional UI or logs

---

## 💡 Features

- ✅ Extracts and parses `.docx` and `.pdf` resumes
- ✅ Generates semantic embeddings using **SBERT**
- ✅ Calculates cosine similarity with job descriptions
- ✅ Ranks top 3 profiles with labels:
  - `✅ Highly Recommended`
  - `☑️ Recommended`
  - `🟡 Decent – Can Explore`
- ✅ Sends recruiter an email with:
  - Top 3 match summary
  - Resumes as attachments
- ✅ Console-based interaction for MVP
- 🚧 UI dashboard coming soon

---

## ⚙️ Tech Stack

| Component           | Tool/Library                |
|---------------------|-----------------------------|
| Language            | Python 3.12                 |
| Embedding Model     | `sentence-transformers` (SBERT) |
| PDF Parser          | `pdfminer.six` or `PyMuPDF` |
| DOCX Parser         | `python-docx`               |
| Similarity Scoring  | `scikit-learn`              |
| Email Automation    | `smtplib`, MIME libraries   |
| IDE                 | VS Code                     |
| Deployment          | GitHub / Local (Console)    |

---


