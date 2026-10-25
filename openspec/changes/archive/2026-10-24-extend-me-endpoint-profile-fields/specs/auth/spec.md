# Spec Delta

## MODIFIED Requirements

### Requirement: Log in users
The system MUST allow signed-up users to obtain a fresh token, and MUST record the time of each successful login.

#### Scenario: Successful login
- **GIVEN** a user exists with email and password
- **WHEN** POST /login with matching credentials
- **THEN** response status is 200
- **AND** body is { data: { user: { id, email }, accessToken } }
- **AND** the user's lastLoginAt is set to the current time

#### Scenario: Failed login does not update lastLoginAt
- **GIVEN** a user exists with email and password
- **WHEN** POST /login with a wrong password
- **THEN** the request is rejected
- **AND** the user's lastLoginAt is unchanged

### Requirement: Return current user
The system MUST return the authenticated user data, including displayName and lastLoginAt.

#### Scenario: GET /me with valid token
- **GIVEN** a request with header Authorization: Bearer <validToken>
- **WHEN** GET /me
- **THEN** response status is 200
- **AND** body is { data: { id, email, createdAt, displayName, lastLoginAt } }

#### Scenario: GET /me for a user who never logged in
- **GIVEN** a user who signed up and has never called POST /login
- **WHEN** GET /me with the token issued at signup
- **THEN** data.lastLoginAt is null

#### Scenario: GET /me for a user without a display name
- **GIVEN** a user whose displayName has not been set
- **WHEN** GET /me with a valid token
- **THEN** data.displayName is null

#### Scenario: GET /me reflects the last login
- **GIVEN** a user who has logged in via POST /login
- **WHEN** GET /me with a valid token
- **THEN** data.lastLoginAt is an ISO 8601 timestamp of the most recent successful login
