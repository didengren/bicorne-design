# Variant Review Framework

> Variant-stage review (5 criteria, 100-point scale, ≥70 to advance). For final output review, use critique-guide.md.

---

## Scoring Criteria

**Total 100 points. 70+ required to advance to the next phase.**

| Criterion | Max | Description |
|-----------|-----|-------------|
| Goal Alignment | 25 | Does the design solve the stated business goal |
| Technical Feasibility | 20 | Is the implementation cost acceptable within the project timeline |
| Cognitive Load | 25 | How much cognitive effort users must invest to complete tasks |
| Aesthetic Consistency | 20 | Degree of alignment with the system design language |
| Anti-Blur Pass | 10 | Can the intent behind each key design decision be stated |

---

## Scoring Rubric

### Goal Alignment (25 pts)

| Score | Standard |
|-------|----------|
| 21-25 | Design precisely solves the business goal; every element has clear purpose |
| 16-20 | Design largely solves the business goal; a few elements lack clear purpose |
| 11-15 | Design partially solves the business goal; elements unrelated to the goal exist |
| 0-10 | Design is disconnected from the business goal; many elements lack clear purpose |

### Technical Feasibility (20 pts)

| Score | Standard |
|-------|----------|
| 17-20 | Implementation cost fully acceptable within timeline; no technical risk |
| 13-16 | Implementation cost mostly acceptable; minor technical risks are controllable |
| 7-12 | Implementation cost is high; technical risks require evaluation |
| 0-6 | Implementation cost is prohibitive; major technical risks exist |

### Cognitive Load (25 pts)

| Score | Standard |
|-------|----------|
| 21-25 | Users can operate intuitively; zero learning cost |
| 16-20 | Users need minimal learning; operation paths are clear |
| 11-15 | Users need moderate learning; operation paths are mostly clear |
| 0-10 | Users face high learning cost; operation paths are confusing |

### Aesthetic Consistency (20 pts)

| Score | Standard |
|-------|----------|
| 17-20 | Fully aligned with the system design language; style is unified |
| 13-16 | Mostly aligned; minor style deviations |
| 7-12 | Partially aligned; noticeable style deviations |
| 0-6 | Misaligned with the system design language; style is disjointed |

### Anti-Blur Pass (10 pts)

| Score | Standard |
|-------|----------|
| 9-10 | Intent can be stated for every key design decision; aesthetic anchors referenced |
| 6-8 | Intent can be stated for most decisions; a few are vague |
| 3-5 | Intent can be stated for some decisions; many are vague |
| 0-2 | Intent cannot be stated for most decisions; blur risk present |

---

## Review Process

1. Score each variant independently; reviewers must not reference other variants' scores
2. Score all 5 criteria individually, then sum the total
3. Variants scoring ≥70 enter the candidate pool
4. Select the highest-scoring variant from the candidate pool, or combine strengths from multiple variants
5. Trade-off decisions must be recorded in the decision log

---

## Decision Log Format

```
## Variant Review Record

**Date**: YYYY-MM-DD
**Reviewer**: [Name]

### Variant A: [Name]
- Goal Alignment: [Score] — [Explanation]
- Technical Feasibility: [Score] — [Explanation]
- Cognitive Load: [Score] — [Explanation]
- Aesthetic Consistency: [Score] — [Explanation]
- Anti-Blur Pass: [Score] — [Explanation]
- **Total**: [Score]

### Variant B: [Name]
[Same as above]

### Variant C: [Name]
[Same as above]

### Selection Decision
Selected Variant [X], because [specific reason].
Borrowed [specific element] from Variant [Y], because [specific reason].
```
