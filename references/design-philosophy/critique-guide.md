# Expert 5-Dimension Review

> 5-dimension design review framework, used for Phase 3 variant scoring and Phase 5 quality polish. For variant-stage review, use `review-scoring.md`.

---

## Five Dimensions

### 1. Visual Hierarchy

**Evaluates**: Whether information has clear priority guidance

| Score | Criteria |
|-------|----------|
| 5 | User gaze naturally flows from most to least important, without thinking |
| 4 | Most information hierarchy is clear, minor areas need optimization |
| 3 | Primary information is identifiable, but secondary information causes interference |
| 2 | Information hierarchy is chaotic, user must struggle to find key information |
| 1 | No clear hierarchy, all information has equal visual weight |

**Checklist**:
- [ ] Title and body text have clear size/weight contrast
- [ ] CTA stands out more than surrounding elements
- [ ] Information groups are clearly separated by spacing/background/borders
- [ ] Visual focal points guide the user's gaze downward

### 2. Information Architecture

**Evaluates**: Whether content organization is logically clear

| Score | Criteria |
|-------|----------|
| 5 | Content organization is intuitive, user finds targets without thinking |
| 4 | Content organization is mostly clear, minor paths need optimization |
| 3 | Content organization is understandable, but requires learning effort |
| 2 | Content organization is chaotic, user must try repeatedly |
| 1 | Content has no organization, user cannot find targets |

**Checklist**:
- [ ] Navigation depth does not exceed 2 levels
- [ ] Similar information is grouped, different information is separated
- [ ] User can determine what the product/page is within 3 seconds
- [ ] Critical path CTA is visible above the fold

### 3. Emotional Resonance

**Evaluates**: Whether the design conveys the correct emotional tone

| Score | Criteria |
|-------|----------|
| 5 | Design precisely conveys brand emotion, user resonates |
| 4 | Design mostly conveys brand emotion, minor deviations |
| 3 | Design conveys some emotion, but not precisely enough |
| 2 | Design emotional tone is vague, no resonance possible |
| 1 | Design conveys the wrong emotion |

**Checklist**:
- [ ] Color choices are consistent with brand tone
- [ ] Font choices convey the correct personality
- [ ] Image/illustration style is consistent with the brand
- [ ] Overall atmosphere matches target user expectations

### 4. Cognitive Load

**Evaluates**: How much cognitive resource the user must invest to complete tasks

| Score | Criteria |
|-------|----------|
| 5 | User can operate intuitively, zero learning cost |
| 4 | User needs minimal learning, operation path is clear |
| 3 | User needs moderate learning, but can complete tasks |
| 2 | User learning cost is high, must try repeatedly |
| 1 | User cannot understand how to operate |

**Checklist**:
- [ ] No more than 3 core actions per screen
- [ ] Operation flow does not exceed 5 steps
- [ ] Error states have clear recovery paths
- [ ] Complex operations have guidance/prompts

### 5. Technical Quality

**Evaluates**: Technical implementation quality of the design

| Score | Criteria |
|-------|----------|
| 5 | Pixel-perfect, no technical flaws |
| 4 | Overall precise, negligible minor flaws |
| 3 | Basically usable, but obvious technical issues exist |
| 2 | Technical issues affect user experience |
| 1 | Technical issues make it unusable |

**Checklist**:
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] All interactive elements have focus states
- [ ] Responsive layout works at 5 breakpoints
- [ ] Animation frame rate ≥ 60fps
- [ ] Images have no compression artifacts

---

## Composite Scoring

| Dimension | Weight | Score (1-5) | Weighted |
|-----------|--------|-------------|----------|
| Visual Hierarchy | 25% | | |
| Information Architecture | 25% | | |
| Emotional Resonance | 20% | | |
| Cognitive Load | 20% | | |
| Technical Quality | 10% | | |
| **Total** | **100%** | | **/5** |

### Rating Scale

| Composite Score | Rating | Description |
|-----------------|--------|-------------|
| 4.5-5.0 | ⭐⭐⭐⭐⭐ | Exceptional — benchmark-worthy |
| 3.5-4.4 | ⭐⭐⭐⭐ | Excellent — ready to ship with minor polish |
| 2.5-3.4 | ⭐⭐⭐ | Acceptable — needs targeted optimization |
| 1.5-2.4 | ⭐⭐ | Insufficient — requires major revision |
| 1.0-1.4 | ⭐ | Failed — needs redesign |

---

## Review Report Format

```
## Design Review Report

**Project**: [Project Name]
**Reviewer**: [Name]
**Date**: YYYY-MM-DD

### Dimension Scores

| Dimension | Score | Notes |
|-----------|-------|-------|
| Visual Hierarchy | [x]/5 | [Specific notes] |
| Information Architecture | [x]/5 | [Specific notes] |
| Emotional Resonance | [x]/5 | [Specific notes] |
| Cognitive Load | [x]/5 | [Specific notes] |
| Technical Quality | [x]/5 | [Specific notes] |

### Composite Score: [x]/5 — [Rating]

### Key Findings

**Strengths**:
1. [Specific strength]
2. [Specific strength]

**Issues**:
1. [Specific issue] → [Suggested fix]
2. [Specific issue] → [Suggested fix]

### Priority Fixes

1. [Highest priority fix]
2. [Second priority fix]
3. [Third priority fix]
```
