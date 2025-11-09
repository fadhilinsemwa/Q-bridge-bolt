# Q-Bridge Authentication API Reference

**Version:** 1.0  
**Base URL:** `http://localhost:4100/api/auth`  
**Production URL:** `https://api.qbridge.tpi.ac.tz/api/auth`

---

## Quick Reference

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/register` | POST | Public | Create new user account |
| `/login` | POST | Public | Authenticate and get tokens |
| `/refresh` | POST | Public | Refresh access token |
| `/logout` | POST | Protected | Invalidate tokens |
| `/me` | GET | Protected | Get current user |
| `/verify-email` | POST | Public | Verify email address |
| `/forgot-password` | POST | Public | Request password reset |
| `/reset-password` | POST | Public | Reset password with token |

---

## Authentication

All protected endpoints require a valid JWT access token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Endpoints

### 1. Register

Create a new user account.

**Endpoint:** `POST /api/auth/register`  
**Access:** Public

**Request:**
```http
POST /api/auth/register HTTP/1.1
Host: localhost:4100
Content-Type: application/json

{
  "email": "student@tpi.ac.tz",
  "password": "SecurePass@123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "STUDENT"
}
```

**Response (201 Created):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "student@tpi.ac.tz",
    "firstName": "John",
    "lastName": "Doe",
    "role": "STUDENT",
    "emailVerified": false,
    "isActive": true,
    "createdAt": "2025-11-08T10:00:00.000Z"
  }
}
```

**Validation:**
- `email`: Valid email format, unique, max 255 chars
- `password`: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
- `firstName`: Required, 2-50 chars
- `lastName`: Required, 2-50 chars
- `role`: One of: STUDENT, ACADEMIC_STAFF, HOD, QAC_MEMBER, REGISTRAR, DIRECTOR, SYSTEM_ADMIN

**Errors:**
```json
// 400 Bad Request - Validation Error
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "password",
      "message": "password must be stronger"
    }
  ]
}

// 409 Conflict - Email Exists
{
  "statusCode": 409,
  "message": "Email already exists"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:4100/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@tpi.ac.tz",
    "password": "SecurePass@123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "STUDENT"
  }'
```

---

### 2. Login

Authenticate user and receive access/refresh tokens.

**Endpoint:** `POST /api/auth/login`  
**Access:** Public

**Request:**
```http
POST /api/auth/login HTTP/1.1
Host: localhost:4100
Content-Type: application/json

{
  "email": "student@tpi.ac.tz",
  "password": "SecurePass@123"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "student@tpi.ac.tz",
    "firstName": "John",
    "lastName": "Doe",
    "role": "STUDENT",
    "emailVerified": true,
    "isActive": true
  }
}
```

**Errors:**
```json
// 401 Unauthorized - Invalid Credentials
{
  "statusCode": 401,
  "message": "Invalid credentials"
}

// 403 Forbidden - Account Suspended
{
  "statusCode": 403,
  "message": "Account is suspended"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:4100/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@tpi.ac.tz",
    "password": "SecurePass@123"
  }'
```

---

### 3. Refresh Token

Get a new access token using a valid refresh token.

**Endpoint:** `POST /api/auth/refresh`  
**Access:** Public

**Request:**
```http
POST /api/auth/refresh HTTP/1.1
Host: localhost:4100
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
```json
// 401 Unauthorized - Invalid/Expired Token
{
  "statusCode": 401,
  "message": "Invalid refresh token"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:4100/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

---

### 4. Get Current User

Get details of the currently authenticated user.

**Endpoint:** `GET /api/auth/me`  
**Access:** Protected (requires valid access token)

**Request:**
```http
GET /api/auth/me HTTP/1.1
Host: localhost:4100
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "student@tpi.ac.tz",
  "firstName": "John",
  "lastName": "Doe",
  "role": "STUDENT",
  "emailVerified": true,
  "isActive": true,
  "createdAt": "2025-11-08T10:00:00.000Z",
  "updatedAt": "2025-11-08T10:00:00.000Z"
}
```

**Errors:**
```json
// 401 Unauthorized - Missing/Invalid Token
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:4100/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 5. Logout

Invalidate all refresh tokens for the current user.

**Endpoint:** `POST /api/auth/logout`  
**Access:** Protected

**Request:**
```http
POST /api/auth/logout HTTP/1.1
Host: localhost:4100
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:4100/api/auth/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 6. Verify Email

Verify email address using verification token.

**Endpoint:** `POST /api/auth/verify-email`  
**Access:** Public

**Request:**
```http
POST /api/auth/verify-email HTTP/1.1
Host: localhost:4100
Content-Type: application/json

{
  "token": "verification-token-from-email"
}
```

**Response (200 OK):**
```json
{
  "message": "Email verified successfully"
}
```

**Errors:**
```json
// 400 Bad Request - Invalid/Expired Token
{
  "statusCode": 400,
  "message": "Invalid or expired verification token"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:4100/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{
    "token": "verification-token-from-email"
  }'
```

---

### 7. Forgot Password

Request a password reset email.

**Endpoint:** `POST /api/auth/forgot-password`  
**Access:** Public

**Request:**
```http
POST /api/auth/forgot-password HTTP/1.1
Host: localhost:4100
Content-Type: application/json

{
  "email": "student@tpi.ac.tz"
}
```

**Response (200 OK):**
```json
{
  "message": "If the email exists, a password reset link has been sent"
}
```

**Note:** Always returns success to prevent email enumeration.

**cURL Example:**
```bash
curl -X POST http://localhost:4100/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@tpi.ac.tz"
  }'
```

---

### 8. Reset Password

Reset password using reset token from email.

**Endpoint:** `POST /api/auth/reset-password`  
**Access:** Public

**Request:**
```http
POST /api/auth/reset-password HTTP/1.1
Host: localhost:4100
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "newPassword": "NewSecurePass@123"
}
```

**Response (200 OK):**
```json
{
  "message": "Password reset successfully"
}
```

**Errors:**
```json
// 400 Bad Request - Invalid Token
{
  "statusCode": 400,
  "message": "Invalid or expired reset token"
}

// 400 Bad Request - Weak Password
{
  "statusCode": 400,
  "message": "Password must be stronger"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:4100/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "reset-token-from-email",
    "newPassword": "NewSecurePass@123"
  }'
```

---

## Response Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input/validation error |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 500 | Internal Server Error | Server error |

---

## Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/register` | 3 requests | 1 hour |
| `/login` | 5 requests | 15 minutes |
| `/forgot-password` | 3 requests | 1 hour |
| All others | 100 requests | 15 minutes |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 4
X-RateLimit-Reset: 1699459200
```

**Rate Limit Error (429):**
```json
{
  "statusCode": 429,
  "message": "Too many requests, please try again later"
}
```

---

## Testing with Postman

### 1. Import Collection

Create a new Postman collection with these requests:

**Collection Variables:**
- `baseUrl`: `http://localhost:4100/api/auth`
- `accessToken`: (will be set automatically)
- `refreshToken`: (will be set automatically)

### 2. Register User

```
POST {{baseUrl}}/register
Body (JSON):
{
  "email": "test@tpi.ac.tz",
  "password": "Test@123",
  "firstName": "Test",
  "lastName": "User",
  "role": "STUDENT"
}

Tests:
pm.test("Status is 201", () => pm.response.to.have.status(201));
pm.collectionVariables.set("accessToken", pm.response.json().accessToken);
pm.collectionVariables.set("refreshToken", pm.response.json().refreshToken);
```

### 3. Login

```
POST {{baseUrl}}/login
Body (JSON):
{
  "email": "test@tpi.ac.tz",
  "password": "Test@123"
}

Tests:
pm.test("Status is 200", () => pm.response.to.have.status(200));
pm.collectionVariables.set("accessToken", pm.response.json().accessToken);
pm.collectionVariables.set("refreshToken", pm.response.json().refreshToken);
```

### 4. Get Current User

```
GET {{baseUrl}}/me
Headers:
Authorization: Bearer {{accessToken}}

Tests:
pm.test("Status is 200", () => pm.response.to.have.status(200));
pm.test("Email matches", () => {
  pm.expect(pm.response.json().email).to.equal("test@tpi.ac.tz");
});
```

---

## Code Examples

### JavaScript/TypeScript

```typescript
// Register
const response = await fetch('http://localhost:4100/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'student@tpi.ac.tz',
    password: 'SecurePass@123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'STUDENT'
  })
});

const data = await response.json();
localStorage.setItem('accessToken', data.accessToken);
localStorage.setItem('refreshToken', data.refreshToken);

// Login
const loginResponse = await fetch('http://localhost:4100/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'student@tpi.ac.tz',
    password: 'SecurePass@123'
  })
});

// Get Current User
const userResponse = await fetch('http://localhost:4100/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  }
});

const user = await userResponse.json();
```

### Python

```python
import requests

# Register
response = requests.post('http://localhost:4100/api/auth/register', json={
    'email': 'student@tpi.ac.tz',
    'password': 'SecurePass@123',
    'firstName': 'John',
    'lastName': 'Doe',
    'role': 'STUDENT'
})

data = response.json()
access_token = data['accessToken']

# Get Current User
user_response = requests.get(
    'http://localhost:4100/api/auth/me',
    headers={'Authorization': f'Bearer {access_token}'}
)

user = user_response.json()
```

---

## Security Best Practices

1. **Always use HTTPS in production**
2. **Never log or expose tokens**
3. **Store tokens securely** (httpOnly cookies or secure storage)
4. **Validate all inputs** on both client and server
5. **Implement rate limiting** to prevent brute force
6. **Use strong passwords** (enforce password policy)
7. **Enable CORS** only for trusted domains
8. **Monitor authentication logs** for suspicious activity
9. **Rotate JWT secrets** periodically
10. **Implement token blacklisting** for compromised tokens

---

## Support

For issues or questions:
- **Documentation:** `/docs/06-phase2-auth/`
- **Testing:** Run `./test-dashboards.sh`
- **Logs:** Check `backend/logs/` directory

---

**API Version:** 1.0  
**Last Updated:** November 8, 2025
