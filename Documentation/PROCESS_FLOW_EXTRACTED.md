# Think Funding LLC - End-to-End Process Flow
## Extracted from: High Level Process Flow (End-to-End).vsdx

**Extracted via:** LibreOffice PDF conversion + EasyOCR (300 DPI)  
**Date:** April 14, 2026  
**Confidence:** 67-100% per element

---

## PROCESS FLOW OVERVIEW

This document describes the complete MCA (Merchant Cash Advance) lifecycle workflow from application intake through collections.

---

## MAIN PROCESS FLOW

```
                           START
                             │
                             ▼
                    ┌─────────────────┐
                    │  Application    │
                    │    Received    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Collect        │
                    │  Merchant       │
                    │  Documents      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Screen for    │
                    │  Document       │
                    │  Completeness    │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
     ┌────────────────┐            ┌────────────────┐
     │   INCOMPLETE   │            │   COMPLETE     │
     │   DOCUMENTS    │            │   DOCUMENTS    │
     └───────┬────────┘            └───────┬────────┘
             │                             │
             ▼                             │
    ┌─────────────────┐                   │
    │  Request More   │                   │
    │   Information   │                   │
    └────────┬────────┘                   │
             │                             │
             │ NO                         │ YES
             └──────────────►│◄────────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │  Underwriting   │
                   │    Decision      │
                   └────────┬────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
     ┌────────────────┐          ┌────────────────┐
     │   APPROVED     │          │   REJECTED     │
     └───────┬────────┘          └───────┬────────┘
             │                           │
             ▼                           ▼
    ┌─────────────────┐           ┌─────────────────┐
    │  Obtain ACH     │           │      END        │
    │  Authorization   │           │   (Rejected)    │
    └────────┬────────┘           └─────────────────┘
             │
             ▼
    ┌─────────────────┐
    │  Payment        │
    │  Scheduled      │
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │  ACH Payment    │
    │  Attempt #1     │
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │   Succeeds?     │
    └────────┬────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
   YES                NO
    │                 │
    ▼                 ▼
┌───────────────┐  ┌─────────────────┐
│   Recover-    │  │  Retry ACH      │
│   able?       │  │   Attempt #2    │
└───────┬───────┘  └────────┬────────┘
        │                   │
   ┌────┴────┐             ▼
   │         │     ┌─────────────────┐
  YES        NO    │   Succeeds?     │
   │         │     └────────┬────────┘
   │         │              │
   ▼         ▼      ┌────────┴────────┐
┌─────────────┐    │                 │
│  Payment    │    ▼                 ▼
│  Processing │   YES                NO
└───────┬─────┘    │                 │
        │          ▼                 ▼
        │   ┌───────────────┐ ┌─────────────────┐
        │   │  Payment      │ │  Collection     │
        │   │  Processing   │ │  Calls          │
        │   └───────┬───────┘ └────────┬────────┘
        │           │                  │
        │           └─────────┬────────┘
        │                     │
        ▼                     ▼
┌─────────────────┐  ┌─────────────────┐
│ Funding Mature?  │  │    Trigger      │
│                 │  │    Further      │
└────────┬────────┘  │    Collection   │
         │           └────────┬────────┘
    ┌────┴────┐              │
   YES        NO             ▼
    │         │      ┌─────────────────┐
    │         │      │   Collections   │
    │         │      │   Successful?   │
    │         │      └────────┬────────┘
    │         │               │
    ▼         ▼         ┌─────┴─────┐
┌─────────────┐        │           │
│     END      │       YES         NO
│  (Paid Off)  │        │           │
└─────────────┘        ▼           ▼
                ┌───────────┐ ┌───────────┐
                │    END    │ │   END     │
                │ (Collect) │ │ (Default) │
                └───────────┘ └───────────┘
```

---

## STAGE-BY-STAGE BREAKDOWN

### Stage 1: Application Intake

| Step | Description |
|------|-------------|
| START | Merchant begins application process |
| Application Received | System captures new application submission |
| Collect Merchant Documents | Gather required documents (bank statements, ID, formation docs, etc.) |
| Screen for Completeness | Verify all required documents are present |

**Decision Point:** Document Completeness
- **NO (Incomplete):** → Request More Information → Loop back to document collection
- **YES (Complete):** → Proceed to underwriting

---

### Stage 2: Underwriting

| Step | Description |
|------|-------------|
| Underwriting Decision | Review application, documents, bank statements |
| Approval/Decline Decision | Evaluate creditworthiness and risk |

**Decision Point:** Underwriting Decision
- **APPROVED:** → Obtain ACH Authorization → Schedule Payment
- **REJECTED:** → END (Application rejected)

---

### Stage 3: Funding

| Step | Description |
|------|-------------|
| Obtain ACH Authorization | Capture bank account authorization for automated payments |
| Payment Scheduled | Generate payment schedule based on factor rate and daily amounts |

---

### Stage 4: Payment Collection

| Step | Description |
|------|-------------|
| ACH Payment Attempt #1 | First attempt to collect daily/periodic payment |

**Decision Point:** Payment Succeeds?
- **YES:** → Check if Recoverable (Funding Mature?)
- **NO:** → Retry ACH Attempt #2

| Step | Description |
|------|-------------|
| Retry ACH Attempt #2 | Second payment collection attempt |

**Decision Point:** Retry Succeeds?
- **YES:** → Payment Processing
- **NO:** → Collection Calls → Further Collections

---

### Stage 5: Collections (If Payment Fails)

| Step | Description |
|------|-------------|
| Collection Calls | Outreach to merchant regarding failed payment |
| Trigger Further Collection | Escalate collection efforts |

**Decision Point:** Collections Successful?
- **YES:** → END (Funds recovered)
- **NO:** → END (Default)

---

### Stage 6: Resolution

| Outcome | Description |
|---------|-------------|
| Funding Mature | MCA term complete, merchant paid in full → END (Paid Off) |
| Collections Successful | Collections efforts recovered funds → END (Collected) |
| Default | Unable to recover funds → END (Default) |

---

## DECISION TREE SUMMARY

```
START
  └─► Application Received
        └─► Documents Collected
              └─► Document Complete?
                    ├─► NO ─► Request More Info ─► [Loop to Documents]
                    └─► YES ─► Underwriting Decision
                              ├─► REJECTED ─► END
                              └─► APPROVED ─► ACH Authorization
                                          └─► Payment Scheduled
                                                └─► ACH Attempt #1
                                                      ├─► SUCCESS ─► Recoverable?
                                                      │                  ├─► YES ─► Payment Processing ─► Funding Mature? ─► END (Paid Off)
                                                      │                  └─► NO ─► [Continue Payments]
                                                      └─► FAIL ─► Retry #2
                                                                  ├─► SUCCESS ─► Payment Processing ─► [As above]
                                                                  └─► FAIL ─► Collections
                                                                              ├─► SUCCESS ─► END (Collected)
                                                                              └─► FAIL ─► END (Default)
```

---

## KEY WORKFLOW TRIGGERS

| Trigger | Action |
|---------|--------|
| New Application | Create task in Microsoft Lists for underwriting review |
| Documents Incomplete | Send email to merchant requesting missing documents |
| Underwriting Approved | Generate approval notification + Teams alert |
| Underwriting Declined | Send decline notification to merchant |
| Payment Scheduled | Create expected payment record |
| ACH Payment Failed | Create collection task + notification |
| Collection Success | Update deal status + close task |
| Default | Flag deal for escalation + notify management |

---

## STAKEHOLDER NOTIFICATIONS

| Event | Merchant | Internal Team | Collections |
|-------|----------|---------------|-------------|
| Application Received | Confirmation email | Lists task created | - |
| Documents Requested | Email with checklist | - | - |
| Approved | Congratulations email | Teams notification | - |
| Declined | Decline email | Teams notification | - |
| Payment Scheduled | Payment schedule | - | - |
| Payment Failed | Outreach call | Lists task + email | Collection alert |
| Payment Success | Confirmation | Deal updated | Task closed |
| Default | Notice | Management alert | Agency referral |
| Paid Off | Completion notice | Deal closed | - |

---

## EXTRACTED OCR TEXT (Raw)

The following text elements were extracted from the original Visio diagram via OCR:

```
Reject
END
Funding Mature
Application
Obtain
Fund
Application
Collect
Screen for
Underwriting
Payment
Payment
Approved?
Merchant ACH
Merchant via
Received
Documents
completeness
Decision
Scheduled
Succeeds?
Approval
ACH
Request for
Payment
START
Recoverable
Retry ACH (1)
more infotaion
Succeeds?
Collection
Collection Calls
Trigger
Payment
END
Default
Retry ACH (2)
Escalation
Notice
Collections
Successd?
```

---

*Document generated from: High Level Process Flow (End-to-End).vsdx*  
*Extraction method: LibreOffice PDF conversion + EasyOCR at 300 DPI*