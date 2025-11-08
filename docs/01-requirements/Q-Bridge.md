**1\. Introduction**

**1.1 Purpose**

Define, collect, analyze, and predict quality metrics across TPI’s programs (on-campus, blended, online) via web and mobile apps. Enable students/staff to submit evaluations; enable QA to monitor KPIs, generate reports, and run AI-assisted insights (trends, risks, recommendations).

**1.2 Scope**

* Multi-tenant (TPI now; extensible to partner institutions).  
* Web (admin/analyst/faculty) \+ Mobile (student/staff).  
* Integrations: LMS (Moodle), SIS, HR, Authentication/SSO, email/SMS, cloud storage.  
* Covers tools you defined (Teaching & Learning, LMS/e-Library, Staff Performance, Student Experience, Infrastructure, Governance, ISEF, Programme Review, Risk & Corrective Action, Tracer & Employer Feedback, Online Course Evaluation—student & academic forms).

**1.3 Stakeholders**

* **Students** (respondents)  
* **Academic staff/e-tutors** (self & peer evals)  
* **Heads of Department/Deans** (unit dashboards, actions)  
* **QAU** (global dashboards, audits, ISEF, exports)  
* **Management/Board** (high-level KPIs)  
* **ICT/Systems Admin** (ops, security, SSO)  
* **External reviewers (NACTVET/peers)** (read-only packs)

**1.4 Definitions & References**

* NACTVET Standards 1–10; TPI QAPM 2025\.  
* ISEF \= Institutional Self-Evaluation Framework.

**1.5 Assumptions/Dependencies**

* Moodle (or equivalent) accessible via REST API.  
* Institutional email/SMS gateways available.  
* Data retention policy approved by TPI.

**2\. System Overview**

Modular platform with:

* **Survey & Workflow Engine**  
* **Data & Metrics Layer**  
* **AI Analytics Layer** (forecasting, anomaly detection, risk scoring)  
* **Dashboards & Reporting**  
* **Integrations** (LMS, SIS/HR, SSO)  
* **Admin & Governance** (RBAC, audit, compliance)

**3\. User Roles & Permissions (RBAC)**

* **Student**: submit evaluations; view personal submissions; receive feedback summaries (course level).  
* **Academic Staff**: self/peer/unit evaluations; access course analytics for their courses; action plans.  
* **HOD/Dean**: unit dashboards, approvals, action tracking.  
* **QAU Analyst**: full analytics, AI insights, ISEF composer, export packs.  
* **QA Admin**: configure tools, forms, KPIs, academic structures.  
* **SysAdmin**: tenant, SSO, secrets, backups.  
* **External Reviewer (optional)**: read-only scoped access.

**4\. Functional Requirements**

**4.1 Form & Workflow Management**

* Create/edit versioned instruments: **Tool 12A, 12B**, Teaching & Learning, LMS & e-Library, Staff Performance, Student Experience & Support, Departmental Work Plan, Infrastructure & Resource Audit, Governance & Integrity, ISEF, Programme Review & Accreditation, Graduate Tracer & Employer, Risk & Corrective Action.  
* Question types: Likert, MCQ, matrix, numeric, file, open-ended.  
* Targeting: by program, cohort, course code, semester, role.  
* Scheduling: opening/closing windows; reminders; nudges.  
* Anonymity modes: anonymous, pseudonymous, identified.  
* Validation & branching logic.  
* Accessibility (WCAG 2.1 AA).

**4.2 Data Ingestion & Integrations**

* **LMS (Moodle)**:  
  * Pull: courses, enrollments, grades, activity logs (logins, forum posts, quiz completion), quiz analytics.  
  * Push (optional): course quality badges, announcements.  
* **SIS/HR**: programs, cohorts, staff profiles, org structure.  
* **Auth/SSO**: OAuth2/OIDC (e.g., Google Workspace/Azure AD).  
* **Notifications**: Email \+ SMS (e.g., Africa’s Talking/Twilio) \+ push.  
* **Storage**: secure file uploads (evidence, minutes, audits).

**4.3 Dashboards & KPIs**

* **Student dashboard**: pending surveys; course feedback summaries; action taken (transparent loop).  
* **Staff dashboard**: course-level LMS engagement, assessment timelines, evaluation scores, action items.  
* **HOD/Dean**: unit heatmap by standard/tool; completion & compliance; red/amber/green (RAG) view.  
* **QAU**: institution heatmap by **NACTVET 1–10**; trends; ISEF builder; programme accreditation readiness score.  
* **Management/Board**: quarterly KPI pack (PDF/PowerPoint): student satisfaction, staff performance, LMS engagement, infrastructure status, risk levels, employability (tracer), finance-adjacent KPIs (collection %—if integrated).

**4.4 AI/ML Features**

* **Forecasting**: predict satisfaction, dropout risk, assessment delays per program/course/semester.  
* **Anomaly detection**: detect sudden drops in logins, submission rates, or unusually high/low scores.  
* **Text analytics**: topic extraction & sentiment from open-ended responses; surface actionable themes.  
* **Risk scoring**: combine KPIs into risk index by unit (ties to Tool 11).  
* **Recommendation engine**: suggest corrective actions, CPD, content fixes, or resource allocation.  
* **Early alerts**: threshold-based \+ ML-based alerts to HOD/QAU.

**4.5 Reporting & Exports**

* One-click **NACTVET evidence pack** (PDF \+ XLSX): ISEF matrices, programme checklists, tracer summaries.  
* Drill-down reports: instrument → standard → unit → course.  
* Time-series and cohort comparisons.  
* Scheduled distribution to role-based mailing lists.

**4.6 Action Planning & Follow-Up**

* Convert flagged findings into **Action Items** with owner, due date, budget, evidence uploads, status.  
* Escalations for overdue items.  
* Link actions to standards/tools and show closure evidence trail.

**4.7 Security, Privacy & Consent**

* Consent prompts for students; anonymization options.  
* Role-based data visibility (e.g., staff cannot see named student comments if anonymous mode).  
* Audit logs for form edits, data access, exports.

**4.8 Localization & Accessibility**

* **English/Swahili** toggle (all UI \+ instruments).  
* Mobile-first design; offline capture (mobile app) with sync & conflict resolution.

**5\. Non-Functional Requirements (NFRs)**

* **Availability**: 99.5% monthly uptime; planned maintenance windows.  
* **Performance**:  
  * P95 page load \< 2.5s (web), \< 1s navigation (mobile).  
  * Aggregation queries (dashboard tiles) \< 5s P95 for 100k responses.  
* **Scalability**: horizontal scaling to 10k concurrent users; sharding by tenant.  
* **Security**: OWASP ASVS L2, TLS 1.2+, AES-256 at rest, secrets in vault, MFA for admins, IP allowlists (admin), periodic pen-tests.  
* **Privacy/Compliance**: align with Tanzanian data laws; GDPR-inspired principles (minimization, purpose limitation, DSR support).  
* **Backup/DR**: daily encrypted backups, RPO ≤ 24h, RTO ≤ 8h.  
* **Observability**: logs, metrics, traces; alerting on error budgets.

**6\. Data Model (Core Entities)**

* **User**, **Role**, **OrgUnit** (Dept/School/Program), **Course**, **Semester**, **Cohort**  
* **Instrument** (Tool definition), **InstrumentVersion**, **Question**, **Response**, **ResponseItem**  
* **KPI** (definition), **KPIValue**  
* **IntegrationSource** (LMS, SIS, HR), **SyncJob**, **LMSMetrics** (logins, forum posts, submissions, grades)  
* **ActionItem**, **Evidence**, **AuditLog**  
* **Report** (generated artifacts), **NACTVETStandard**, **Mapping** (tool→standard)

**7\. APIs (Representative)**

REST (GraphQL optional for dashboards)

* **Auth**: /auth/login, /auth/refresh, /auth/sso/callback  
* **Users/Roles**: /users, /roles, /rbac/policies  
* **Instruments**: /instruments, /instruments/{id}/versions, /submissions  
* **Dashboards**: /kpi/overview, /kpi/standard/{id}, /heatmap  
* **AI**: /ai/forecast/{kpi}, /ai/anomaly, /ai/sentiment, /ai/recommendations  
* **Integrations**: /integrations/moodle/sync, /integrations/sis/sync  
* **Reports**: /reports/isef, /reports/programme/{code}, /reports/tracer  
* **Actions**: /actions, /actions/{id}, /actions/{id}/evidence  
* **Admin**: /tenants, /settings, /webhooks

**8\. Architecture & Tech Stack (Suggested)**

* **Frontend (Web)**: React/Next.js, TypeScript, Tailwind, i18n, PWA.  
* **Mobile**: Flutter or React Native (Android/iOS), offline cache (SQLite), push notifications.  
* **Backend**: Node.js (NestJS) or Python (FastAPI). Async worker (Celery/ BullMQ) for sync & AI jobs.  
* **DB**: PostgreSQL (JSONB for responses), Redis (caching/queues), Elastic/OpenSearch (full-text).  
* **AI/ML**: Python services (scikit-learn/Prophet/LightGBM); embeddings \+ sentiment (open-source or API). Model registry (MLflow).  
* **Integrations**: Moodle REST, OAuth2/OIDC, SMTP, SMS (Africa’s Talking), object storage (S3-compatible).  
* **Infra**: Docker \+ Kubernetes, CI/CD (GitHub Actions), IaC (Terraform). Monitoring: Prometheus/Grafana; Logs: Loki.

**9\. AI Requirements (Detail)**

* **Features engineered** from: survey scores, LMS usage, submission/grade timelines, infrastructure incident logs.  
* **Models**:  
  * Time-series forecasting (course satisfaction, engagement).  
  * Binary/ordinal classifiers (risk of low satisfaction/retention).  
  * NLP: sentiment \+ topic modeling (student/staff comments).  
* **MLOps**: versioning, drift detection, bias checks, explainability summaries, human-in-the-loop review for recommendations.

**10\. Workflows (Key)**

1. **Semester Launch** → auto-create instruments per course → notify students/staff.  
2. **Mid-course pulse** (short survey) → tutor sees early warnings.  
3. **End-course** → student Tool 12A \+ academic Tool 12B → AI summary → action items.  
4. **Quarterly QA** → ISEF composer pulls tool outputs → NACTVET pack generation.  
5. **Risk Cycle** → anomalies → Tool 11 corrective actions → track to closure.

**11\. Reporting & Compliance**

* Prebuilt packs: **ISEF**, **Programme Review & Accreditation**, **Tracer & Employer**, **Governance & Integrity**, **Infrastructure Audit**, **Online QA**.  
* Exports: PDF, XLSX, CSV. Watermarking and access logs.

**12\. Security Controls**

* MFA, SSO, RBAC, per-row scoping by OrgUnit.  
* Data masking/anonymization for student comments in faculty view (if anonymous).  
* Audit logs on read/export of sensitive reports.  
* DLP rules for PII exports.

**13\. Data Retention**

* Raw responses: 6 years (configurable).  
* Anonymized aggregates: indefinite.  
* Tracer/employer PII: 3 years (renewable with consent).  
* Right-to-erasure and export tools.

**14\. Acceptance Criteria (Samples)**

* Create, deploy, and run **all defined tools** with real-time dashboards.  
* LMS sync for courses/enrollments within 15 minutes of change.  
* Generate ISEF report with mapped evidence in \<60 seconds.  
* AI model MAE within agreed thresholds; anomaly precision ≥ 0.75.  
* 90% student mobile satisfaction on usability by pilot’s end.

**15\. Migration & Seeding**

* Import: historical QA spreadsheets (CSV/XLSX), course lists, org tree, staff tables.  
* Map legacy instruments to new schema.

**16\. Roadmap (Phased)**

* **Phase 1 (0–8 wks):** Core RBAC, instruments engine, LMS sync, Tool 12A/12B, basic dashboards, PDF exports.  
* **Phase 2 (9–16 wks):** Remaining tools, action plans, tracer/employer, programme review, infrastructure audits, governance tool, ISEF composer.  
* **Phase 3 (17–24 wks):** AI layer (forecasting, anomalies, NLP), risk index, early alerts, mobile offline, bilingual UX.  
* **Phase 4 (25–32 wks):** Advanced analytics, cross-institution benchmarking (if enabled), external reviewer portal, API marketplace.

**17\. Sample KPIs**

* Student response rate ≥ 70% per course.  
* Average report generation time ≤ 60s.  
* ≥ 90% action items closed within SLA.  
* Forecasting MAPE ≤ 15% for satisfaction/engagement.

