#!/bin/bash

# Q-Bridge Authentication Testing Script
# Tests all auth endpoints to verify functionality

BASE_URL="http://localhost:4100/api"
echo "🧪 Testing Q-Bridge Authentication System"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo "1️⃣  Testing Health Endpoint (Public)"
echo "-----------------------------------"
HEALTH_RESPONSE=$(curl -s -X GET "$BASE_URL/health")
echo "Response: $HEALTH_RESPONSE"
if echo "$HEALTH_RESPONSE" | grep -q "ok"; then
    echo -e "${GREEN}✅ Health check passed${NC}"
else
    echo -e "${RED}❌ Health check failed${NC}"
fi
echo ""

# Test 2: Register a STUDENT user
echo "2️⃣  Testing User Registration (STUDENT)"
echo "---------------------------------------"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@test.tpi.ac.tz",
    "password": "Test@123456",
    "firstName": "Test",
    "lastName": "Student",
    "role": "STUDENT",
    "studentId": "TPI2024001"
  }')
echo "Response: $REGISTER_RESPONSE"
if echo "$REGISTER_RESPONSE" | grep -q "accessToken"; then
    echo -e "${GREEN}✅ Student registration successful${NC}"
    STUDENT_ACCESS_TOKEN=$(echo "$REGISTER_RESPONSE" | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)
    STUDENT_REFRESH_TOKEN=$(echo "$REGISTER_RESPONSE" | grep -o '"refreshToken":"[^"]*' | cut -d'"' -f4)
    echo "Access Token: ${STUDENT_ACCESS_TOKEN:0:50}..."
else
    echo -e "${RED}❌ Student registration failed${NC}"
fi
echo ""

# Test 3: Register an ACADEMIC_STAFF user
echo "3️⃣  Testing User Registration (ACADEMIC_STAFF)"
echo "----------------------------------------------"
REGISTER_STAFF_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "staff@test.tpi.ac.tz",
    "password": "Test@123456",
    "firstName": "Test",
    "lastName": "Tutor",
    "role": "ACADEMIC_STAFF",
    "employeeId": "EMP2024001",
    "department": "Computer Science"
  }')
echo "Response: $REGISTER_STAFF_RESPONSE"
if echo "$REGISTER_STAFF_RESPONSE" | grep -q "accessToken"; then
    echo -e "${GREEN}✅ Academic staff registration successful${NC}"
    STAFF_ACCESS_TOKEN=$(echo "$REGISTER_STAFF_RESPONSE" | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)
else
    echo -e "${RED}❌ Academic staff registration failed${NC}"
fi
echo ""

# Test 4: Register a SYSTEM_ADMIN user
echo "4️⃣  Testing User Registration (SYSTEM_ADMIN)"
echo "--------------------------------------------"
REGISTER_ADMIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.tpi.ac.tz",
    "password": "Test@123456",
    "firstName": "System",
    "lastName": "Admin",
    "role": "SYSTEM_ADMIN",
    "employeeId": "ADMIN001"
  }')
echo "Response: $REGISTER_ADMIN_RESPONSE"
if echo "$REGISTER_ADMIN_RESPONSE" | grep -q "accessToken"; then
    echo -e "${GREEN}✅ System admin registration successful${NC}"
    ADMIN_ACCESS_TOKEN=$(echo "$REGISTER_ADMIN_RESPONSE" | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)
else
    echo -e "${RED}❌ System admin registration failed${NC}"
fi
echo ""

# Test 5: Login with student credentials
echo "5️⃣  Testing Login (STUDENT)"
echo "--------------------------"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@test.tpi.ac.tz",
    "password": "Test@123456"
  }')
echo "Response: $LOGIN_RESPONSE"
if echo "$LOGIN_RESPONSE" | grep -q "accessToken"; then
    echo -e "${GREEN}✅ Login successful${NC}"
    NEW_ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)
    NEW_REFRESH_TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"refreshToken":"[^"]*' | cut -d'"' -f4)
else
    echo -e "${RED}❌ Login failed${NC}"
fi
echo ""

# Test 6: Get current user (protected route)
echo "6️⃣  Testing Get Current User (Protected)"
echo "----------------------------------------"
if [ -n "$NEW_ACCESS_TOKEN" ]; then
    ME_RESPONSE=$(curl -s -X GET "$BASE_URL/auth/me" \
      -H "Authorization: Bearer $NEW_ACCESS_TOKEN")
    echo "Response: $ME_RESPONSE"
    if echo "$ME_RESPONSE" | grep -q "email"; then
        echo -e "${GREEN}✅ Get current user successful${NC}"
    else
        echo -e "${RED}❌ Get current user failed${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Skipped - no access token${NC}"
fi
echo ""

# Test 7: Refresh token
echo "7️⃣  Testing Token Refresh"
echo "------------------------"
if [ -n "$NEW_REFRESH_TOKEN" ]; then
    REFRESH_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/refresh" \
      -H "Content-Type: application/json" \
      -d "{\"refreshToken\": \"$NEW_REFRESH_TOKEN\"}")
    echo "Response: $REFRESH_RESPONSE"
    if echo "$REFRESH_RESPONSE" | grep -q "accessToken"; then
        echo -e "${GREEN}✅ Token refresh successful${NC}"
        REFRESHED_ACCESS_TOKEN=$(echo "$REFRESH_RESPONSE" | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)
    else
        echo -e "${RED}❌ Token refresh failed${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Skipped - no refresh token${NC}"
fi
echo ""

# Test 8: Logout
echo "8️⃣  Testing Logout (Protected)"
echo "-----------------------------"
if [ -n "$REFRESHED_ACCESS_TOKEN" ]; then
    LOGOUT_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/logout" \
      -H "Authorization: Bearer $REFRESHED_ACCESS_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"refreshToken\": \"$NEW_REFRESH_TOKEN\"}")
    echo "Response: $LOGOUT_RESPONSE"
    if echo "$LOGOUT_RESPONSE" | grep -q "success"; then
        echo -e "${GREEN}✅ Logout successful${NC}"
    else
        echo -e "${RED}❌ Logout failed${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Skipped - no access token${NC}"
fi
echo ""

# Test 9: Try accessing protected route without token
echo "9️⃣  Testing Protected Route Without Token"
echo "-----------------------------------------"
UNAUTHORIZED_RESPONSE=$(curl -s -X GET "$BASE_URL/auth/me")
echo "Response: $UNAUTHORIZED_RESPONSE"
if echo "$UNAUTHORIZED_RESPONSE" | grep -q "Unauthorized"; then
    echo -e "${GREEN}✅ Correctly blocked unauthorized access${NC}"
else
    echo -e "${RED}❌ Should have blocked unauthorized access${NC}"
fi
echo ""

# Test 10: Invalid login credentials
echo "🔟 Testing Invalid Login Credentials"
echo "------------------------------------"
INVALID_LOGIN=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@test.tpi.ac.tz",
    "password": "WrongPassword"
  }')
echo "Response: $INVALID_LOGIN"
if echo "$INVALID_LOGIN" | grep -q "Unauthorized\|Invalid"; then
    echo -e "${GREEN}✅ Correctly rejected invalid credentials${NC}"
else
    echo -e "${RED}❌ Should have rejected invalid credentials${NC}"
fi
echo ""

echo "=========================================="
echo "✅ Authentication Testing Complete!"
echo "=========================================="
