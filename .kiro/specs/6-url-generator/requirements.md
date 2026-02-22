# Requirements Document

## Introduction

The URL Generator is a client-side tool that allows users to construct URLs with query parameters interactively. Users can define a base URL, add or remove query parameters with name-value pairs, and copy the generated URL to their clipboard. This feature will be added as a project tool following the existing password generator pattern.

## Glossary

- **URL_Generator**: The client-side application component that constructs URLs with query parameters
- **Base_URL**: The protocol, domain, and path portion of a URL before query parameters (e.g., "https://example.com/api/search")
- **Query_Parameter**: A key-value pair appended to a URL after the "?" character, formatted as "name=value"
- **Generated_URL**: The complete URL combining the Base_URL with all Query_Parameters
- **Parameter_List**: The collection of Query_Parameters managed by the user
- **Clipboard**: The system clipboard where the Generated_URL can be copied
- **Local_Storage**: The browser's local storage mechanism for persisting data across sessions
- **URL_Configuration**: A saved state containing the Base_URL and all Query_Parameters
- **History**: The list of previously generated URL_Configurations stored in Local_Storage
- **History_Entry**: A single saved URL_Configuration with timestamp

## Requirements

### Requirement 1: Base URL Input

**User Story:** As a developer, I want to define a base URL, so that I can build complete URLs with query parameters.

#### Acceptance Criteria

1. THE URL_Generator SHALL provide an input field for the Base_URL
2. WHEN the Base_URL changes, THE URL_Generator SHALL update the Generated_URL
3. THE URL_Generator SHALL accept any valid URL format including protocol, domain, and path
4. WHEN the Base_URL is empty, THE Generated_URL SHALL display only the Query_Parameters

### Requirement 2: Add Query Parameters

**User Story:** As a developer, I want to add query parameters with name-value pairs, so that I can construct URLs with multiple parameters.

#### Acceptance Criteria

1. THE URL_Generator SHALL provide a button to add new Query_Parameters
2. WHEN the add button is clicked, THE URL_Generator SHALL create a new empty Query_Parameter entry in the Parameter_List
3. THE URL_Generator SHALL provide input fields for both parameter name and value
4. WHEN a Query_Parameter name or value changes, THE URL_Generator SHALL update the Generated_URL
5. THE URL_Generator SHALL properly encode Query_Parameter names and values in the Generated_URL

### Requirement 3: Delete Query Parameters

**User Story:** As a developer, I want to remove query parameters, so that I can modify the URL structure.

#### Acceptance Criteria

1. THE URL_Generator SHALL provide a delete button for each Query_Parameter in the Parameter_List
2. WHEN a delete button is clicked, THE URL_Generator SHALL remove the corresponding Query_Parameter from the Parameter_List
3. WHEN a Query_Parameter is deleted, THE URL_Generator SHALL update the Generated_URL
4. THE URL_Generator SHALL allow deletion of all Query_Parameters

### Requirement 4: Display Generated URL

**User Story:** As a developer, I want to see the generated URL in real-time, so that I can verify the URL structure before copying it.

#### Acceptance Criteria

1. THE URL_Generator SHALL display the Generated_URL combining the Base_URL and all Query_Parameters
2. WHEN the Base_URL or any Query_Parameter changes, THE URL_Generator SHALL immediately update the Generated_URL display
3. WHEN multiple Query_Parameters exist, THE URL_Generator SHALL join them with "&" characters
4. WHEN the Base_URL contains a "?" character, THE URL_Generator SHALL append Query_Parameters with "&" instead of "?"
5. WHEN the Base_URL does not contain a "?" character and Query_Parameters exist, THE URL_Generator SHALL append Query_Parameters starting with "?"

### Requirement 5: Copy Generated URL

**User Story:** As a developer, I want to copy the generated URL to my clipboard, so that I can use it in other applications.

#### Acceptance Criteria

1. THE URL_Generator SHALL provide a copy button for the Generated_URL
2. WHEN the copy button is clicked, THE URL_Generator SHALL copy the Generated_URL to the Clipboard
3. WHEN the copy operation succeeds, THE URL_Generator SHALL display a success confirmation to the user
4. WHEN the Generated_URL is empty, THE URL_Generator SHALL allow copying an empty string

### Requirement 6: User Interface Integration

**User Story:** As a user, I want the URL Generator to match the portfolio website design, so that it provides a consistent experience.

#### Acceptance Criteria

1. THE URL_Generator SHALL use shadcn/ui components for all interactive elements
2. THE URL_Generator SHALL follow the existing password generator layout pattern
3. THE URL_Generator SHALL be responsive across mobile, tablet, and desktop viewports
4. THE URL_Generator SHALL use the portfolio's dark theme with neon green accents
5. THE URL_Generator SHALL be accessible via the route "/projects/url-generator"
6. THE URL_Generator SHALL appear in the projects list on the projects page

### Requirement 7: Client-Side Processing

**User Story:** As a user, I want URL generation to happen in my browser, so that my data remains private.

#### Acceptance Criteria

1. THE URL_Generator SHALL perform all URL construction operations client-side
2. THE URL_Generator SHALL not send the Base_URL or Query_Parameters to any server
3. THE URL_Generator SHALL use React client component with "use client" directive

### Requirement 8: Local Storage Persistence

**User Story:** As a developer, I want my URL configurations saved automatically, so that I can resume my work after closing the browser.

#### Acceptance Criteria

1. WHEN a user modifies the Base_URL or Query_Parameters, THE URL_Generator SHALL save the current URL_Configuration to Local_Storage
2. WHEN the URL_Generator loads, THE URL_Generator SHALL restore the most recent URL_Configuration from Local_Storage
3. THE URL_Generator SHALL store URL_Configurations as JSON in Local_Storage
4. WHEN Local_Storage is unavailable, THE URL_Generator SHALL continue to function without persistence
5. THE URL_Generator SHALL handle Local_Storage errors gracefully without breaking functionality

### Requirement 9: URL Generation History

**User Story:** As a developer, I want to see my recent URL generations, so that I can quickly access previously created URLs.

#### Acceptance Criteria

1. THE URL_Generator SHALL maintain a History of generated URL_Configurations in Local_Storage
2. THE URL_Generator SHALL display at least the 3 most recent History_Entry items
3. WHEN the copy button is clicked, THE URL_Generator SHALL add the current URL_Configuration to the History
4. THE URL_Generator SHALL store each History_Entry with a timestamp
5. THE URL_Generator SHALL display History_Entry items in reverse chronological order (newest first)
6. WHEN the History exceeds the maximum number of entries, THE URL_Generator SHALL remove the oldest History_Entry

### Requirement 10: Load URL from History

**User Story:** As a developer, I want to load a previous URL configuration from history, so that I can reuse or modify past URLs.

#### Acceptance Criteria

1. THE URL_Generator SHALL provide a clickable interface for each History_Entry
2. WHEN a History_Entry is clicked, THE URL_Generator SHALL restore the Base_URL and Query_Parameters from that History_Entry
3. WHEN a History_Entry is loaded, THE URL_Generator SHALL update the Generated_URL display
4. THE URL_Generator SHALL allow users to modify loaded URL_Configurations
5. THE URL_Generator SHALL provide a way to clear individual History_Entry items
6. THE URL_Generator SHALL provide a way to clear all History
