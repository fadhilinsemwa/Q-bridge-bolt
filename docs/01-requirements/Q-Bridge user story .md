**USER STORY DOCUMENT**

***Project Title:*** **Q-Bridge – AI-Powered Quality Assurance Management System**

***Institution:*** **Tandabui Polytechnic Institute (TPI)**

**1\. OVERVIEW**

Q-Bridge is an AI-powered, web-based and mobile platform designed to automate the collection, analysis, and reporting of quality assurance data across all academic and administrative units of Tandabui Polytechnic Institute (TPI).  
The system provides real-time dashboards for academic staff, Heads of Department (HODs), and the Quality Assurance Unit (QAU), ensuring transparency, evidence-based decision making, and compliance with NACTVET Quality Standards.

**2\. MAIN USER ROLES**

| User Role | Description / Responsibility |
| ----- | ----- |
| **Academic Staff / Tutor** | Completes quality assurance tools relevant to teaching, learning, online courses, field supervision, etc. Provides data and reflections for review. |
| **Head of Department (HOD)** | Oversees departmental quality performance. Views summarized results from staff, reviews flagged issues (scores ≤3), validates findings, and implements improvement actions. |
| **Quality Assurance Officer (QAO)** | Manages all QA tools across departments. Activates, assigns, and monitors tool completion; reviews flagged findings; issues AI-generated recommendations and tracks follow-up actions. |
| **Student** | Provides feedback on learning experience, online courses, welfare, and support services through designated tools. |
| **Registrar / Academic Office** | Accesses QA data relevant to academic operations, student progression, and programme accreditation. |
| **Principal / Management Team** | Views high-level institutional performance, compliance summaries, and aggregated analytics by department, programme, or QA standard. |
| **System Administrator (ICT)** | Manages system setups, user permissions, backups, and updates. |

**3\. CORE USER STORIES**

**3.1 Academic Staff (Lecturer / Tutor)**

**As an academic staff member**,  
I want to:

* Log into the system and access only the QA tools assigned to me (e.g., *Teaching & Learning Evaluation, LMS Utilization, Online Course QA*).  
* Fill in the form easily (on web or mobile), attach evidence (screenshots, lesson plans, student feedback), and submit.  
* Receive instant confirmation and see a summary of my submissions.  
* Get automated recommendations from the system when my scores or student feedback fall below standard (e.g., *“Improve feedback turnaround time”*).  
* View how my department or course performed on key indicators (averages, trends, improvement plans).

**So that** I can continuously improve my teaching quality and comply with QA requirements.

**3.2 Head of Department (HOD)\_Academic and non academic including dean of students.** 

**As a Head of Department**,  
I want to:

* View a dashboard summarizing responses from all staff and students under my department.  
* Automatically see the average rating per criterion and which criteria scored **3 or below**.  
* Receive AI-generated recommendations/interventions for those flagged items.  
* Assign specific staff to take corrective action and set follow-up timelines.  
* Download or print departmental QA reports for internal meetings and audits.

**So that** I can monitor teaching quality, implement improvements, and ensure departmental compliance with NACTVET standards.

**3.3 Quality Assurance Officer (QAO)**

**As a QA Officer**,  
I want to:

* Have full visibility into all QA tools and all departments.  
* Activate and share tools (e.g., *Tool 3: Staff Performance* or *Tool 10: Online Course Evaluation*) to the appropriate user groups.  
* Track which departments have completed tools and which are pending.  
* View summaries of findings, flagged criteria, recommendations, and responsible persons for action.  
* Approve departmental reports or request clarifications before final submission.  
* Generate institutional QA reports, ISEF summaries, and NACTVET compliance **reports** with a single click.  
* Follow up on corrective actions assigned to staff or HODs and mark them as completed once verified.

**So that** I can oversee institutional quality, track performance trends, and provide evidence for accreditation or audits.

**3.4 Student**

**As a student**,  
I want to:

* Access and complete surveys such as *Student Experience & Support*, *Online Course Evaluation*, and *Field Supervision Feedback*.  
* Use my mobile device to rate my course, teaching quality, and institutional services anonymously.  
* Receive confirmation that my feedback has been recorded.

**So that** I can contribute to improving learning quality and services at TPI.

**3.5 Registrar / Academic Office**

**As the Registrar**,  
I want to:

* Access summarized reports on programme evaluation, student feedback, and academic operations.  
* Review accreditation readiness reports generated through the system.  
* Coordinate with the QA Officer to address compliance issues.

**So that** academic operations and programme development remain aligned with quality assurance findings.

**3.6 Principal / Management**

**As the Principal**,  
I want to:

* Access a high-level dashboard summarizing institutional QA performance (by department, standard, or tool).  
* View trends in staff performance, student satisfaction, and programme quality.  
* See institutional risk indicators and pending actions from QA recommendations.  
* Download summary reports for Council and Board meetings.

**So that** I can make data-driven management and policy decisions for institutional improvement.

**3.7 System Administrator (ICT)**

**As the System Administrator**,  
I want to:

* Manage user accounts, permissions, and role assignments.  
* Integrate the QA system with other platforms (e.g., Moodle LMS, Student Information System).  
* Backup data securely and ensure uptime.  
* Configure notifications and workflows per tool activation.

**So that** the system remains secure, reliable, and properly synchronized with institutional systems.

**4\. SYSTEM FLOW NARRATIVE**

1. **Tool Activation:** QA Officer activates a QA tool (e.g., “Teaching and Learning Evaluation”).  
2. **Data Collection:** Academic staff or students fill in the forms online; the system stores responses instantly.  
3. **Aggregation:** The system auto-computes departmental averages, trends, and compliance percentages.  
4. **Flagging:** All criteria rated **3 or below** are auto-highlighted in red and sent to HOD dashboards.  
5. **Recommendation Generation:** AI module proposes specific interventions based on the flagged areas.  
6. **Assignment:** HOD assigns responsible staff to take corrective actions; QA receives updates automatically.  
7. **QA Review:** QA reviews actions taken, verifies evidence, and closes the item upon resolution.  
8. **Reporting:** The system generates visual dashboards and exportable reports (PDF/Excel) for QA, departments, and management.

**5\. NOTIFICATIONS & ALERTS**

* Email/SMS/Push notifications for:  
  * New tool activation  
  * Pending submissions  
  * Flagged performance issues  
  * Overdue follow-up actions  
  * Completion confirmation  
* Color-coded alerts (red \= critical, orange \= moderate, green \= compliant).

**6\. DASHBOARD STRUCTURE**

| Role | Dashboard Features |
| ----- | ----- |
| **Academic Staff** | My Courses, My Evaluations, AI Recommendations, Progress Tracker |
| **HOD** | Department Summary, Flagged Criteria, Improvement Plans, Reports |
| **QA Officer** | Institution-wide Overview, Compliance Index, Follow-up Tracker, Tool Manager |
| **Principal / Board** | Executive Dashboard, NACTVET Standards Summary, Institutional KPIs |
| **Student** | Course Evaluation History, Feedback Summary (anonymous) |

**7\. AI-ASSISTED MODULES**

| Module | Function |
| ----- | ----- |
| **Auto-Flagging Engine** | Identifies all criteria ≤3 and highlights for review. |
| **Recommendation Generator** | Suggests intervention actions tailored to the tool and department. |
| **Risk Analyzer** | Predicts areas likely to underperform based on historical data. |
| **NLP Comment Analyzer** | Extracts themes and sentiment from open-ended responses. |
| **Report Composer** | Automatically creates reports for each QA tool or standard. |

**8\. EXPECTED OUTCOMES**

* Faster data collection and report generation  
* Evidence-based decision making  
* Clear accountability for QA improvement actions  
* Centralized, transparent quality management system  
* Readiness for NACTVET audits and accreditation  
* Continuous improvement culture across departments

