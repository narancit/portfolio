# Requirements Document

## Introduction

This feature enables automatic calculation of years of experience for skills based on a start date, eliminating the need for manual yearly updates. The system will support both static numbers (for backward compatibility) and dynamic date-based calculations.

## Glossary

- **Skill**: A technical competency with associated proficiency level and experience duration
- **Experience_Calculator**: Utility function that computes years of experience from a start date
- **Skill_Type**: TypeScript type definition for skill data structure
- **Skills_Display**: Component that renders skill information to users

## Requirements

### Requirement 1: Support Dual Experience Formats

**User Story:** As a portfolio owner, I want to store experience as either a static number or a start date, so that I have flexibility in how I track experience duration.

#### Acceptance Criteria

1. THE Skill_Type SHALL accept yearsOfExperience as a number
2. THE Skill_Type SHALL accept experienceStartDate as a string in ISO date format
3. WHEN both yearsOfExperience and experienceStartDate are provided, THEN THE System SHALL prioritize the static number
4. THE Skill_Type SHALL allow either field to be optional

### Requirement 2: Calculate Years from Start Date

**User Story:** As a portfolio owner, I want years of experience to be automatically calculated from a start date, so that my portfolio stays current without manual updates.

#### Acceptance Criteria

1. WHEN experienceStartDate is provided, THEN THE Experience_Calculator SHALL compute the difference between the current date and the start date in years
2. THE Experience_Calculator SHALL round down to the nearest whole year
3. WHEN the calculated value is less than 1 year, THEN THE Experience_Calculator SHALL return 1
4. THE Experience_Calculator SHALL handle invalid date strings by returning undefined

### Requirement 3: Display Calculated Experience

**User Story:** As a portfolio visitor, I want to see accurate years of experience for each skill, so that I understand the developer's expertise level.

#### Acceptance Criteria

1. WHEN yearsOfExperience is a number, THEN THE Skills_Display SHALL show that number
2. WHEN experienceStartDate is provided, THEN THE Skills_Display SHALL show the calculated years
3. WHEN neither field is provided, THEN THE Skills_Display SHALL hide the experience duration
4. THE Skills_Display SHALL format the output as "{years} year" for 1 year and "{years} years" for multiple years

### Requirement 4: Maintain Backward Compatibility

**User Story:** As a developer, I want existing skill data to continue working without changes, so that the migration is seamless.

#### Acceptance Criteria

1. THE System SHALL continue to support all existing skills with static yearsOfExperience values
2. WHEN migrating to date-based experience, THE System SHALL not require changes to skills using static numbers
3. THE System SHALL allow mixing both formats within the same skill category
