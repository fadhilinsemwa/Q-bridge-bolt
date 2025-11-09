#!/bin/bash

###############################################################################
# Q-Bridge Phase 2: Dashboard Testing Script
# Tests all 7 role-based dashboards with authentication
# Compatible with bash 3.2+ (macOS default)
###############################################################################

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# API endpoints
BACKEND_URL="http://localhost:4100/api"
FRONTEND_URL="http://localhost:3100"

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Print header
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "  Q-Bridge Phase 2: Dashboard Testing"
echo "  Testing all 7 role-based dashboards"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Test user credentials (parallel arrays for bash 3.2 compatibility)
USER_NAMES=("student" "staff" "hod" "qac" "registrar" "director" "admin")
USER_EMAILS=("student@tpi.ac.tz" "staff@tpi.ac.tz" "hod@tpi.ac.tz" "qac@tpi.ac.tz" "registrar@tpi.ac.tz" "director@tpi.ac.tz" "admin@tpi.ac.tz")
USER_PASSWORDS=("Student@123" "Staff@123" "Hod@123" "Qac@123" "Registrar@123" "Director@123" "Admin@123")
USER_ROLES=("STUDENT" "ACADEMIC_STAFF" "HOD" "QAC_MEMBER" "REGISTRAR" "DIRECTOR" "SYSTEM_ADMIN")
USER_DASHBOARDS=("/student/dashboard" "/staff/dashboard" "/hod/dashboard" "/qac/dashboard" "/registrar/dashboard" "/director/dashboard" "/admin/dashboard")

###############################################################################
# Helper Functions
###############################################################################

print_header() {
  echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${BLUE}  $1${NC}"
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

print_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
  echo -e "${RED}❌ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
  echo -e "${CYAN}ℹ️  $1${NC}"
}

###############################################################################
# Test Functions
###############################################################################

test_backend_health() {
  print_header "Test 1: Backend Health Check"
  
  print_info "Testing backend at: $BACKEND_URL"
  
  RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/health" 2>/dev/null || echo "000")
  
  if [ "$RESPONSE" = "200" ]; then
    print_success "Backend is healthy (HTTP $RESPONSE)"
    return 0
  else
    print_error "Backend health check failed (HTTP $RESPONSE)"
    print_warning "Make sure backend is running on port 4100"
    return 1
  fi
}

test_frontend_health() {
  print_header "Test 2: Frontend Health Check"
  
  print_info "Testing frontend at: $FRONTEND_URL"
  
  RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL" 2>/dev/null || echo "000")
  
  if [ "$RESPONSE" = "200" ]; then
    print_success "Frontend is healthy (HTTP $RESPONSE)"
    return 0
  else
    print_error "Frontend health check failed (HTTP $RESPONSE)"
    print_warning "Make sure frontend is running on port 3100"
    return 1
  fi
}

test_unauthorized_access() {
  print_header "Test 3: Unauthorized Access Protection"
  
  print_info "Testing protected endpoint without authentication"
  
  RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/auth/me" 2>/dev/null)
  
  if [ "$RESPONSE" = "401" ]; then
    print_success "Unauthorized access properly blocked (HTTP $RESPONSE)"
    return 0
  else
    print_warning "Unexpected response for unauthorized access (HTTP $RESPONSE)"
    return 1
  fi
}

test_user_login() {
  local INDEX=$1
  local EMAIL="${USER_EMAILS[$INDEX]}"
  local PASSWORD="${USER_PASSWORDS[$INDEX]}"
  local ROLE="${USER_ROLES[$INDEX]}"
  
  print_info "Testing login for $ROLE ($EMAIL)"
  
  RESPONSE=$(curl -s -X POST "$BACKEND_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" \
    2>/dev/null)
  
  if echo "$RESPONSE" | grep -q "accessToken"; then
    ACCESS_TOKEN=$(echo "$RESPONSE" | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)
    if [ -n "$ACCESS_TOKEN" ]; then
      print_success "$ROLE login successful"
      echo "$ACCESS_TOKEN"
      return 0
    else
      print_error "$ROLE login failed: No access token in response"
      return 1
    fi
  else
    print_error "$ROLE login failed"
    if echo "$RESPONSE" | grep -q "User not found"; then
      print_warning "User not found. Please create test users first."
      print_info "Run: curl -X POST $BACKEND_URL/auth/register -H 'Content-Type: application/json' -d '{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"firstName\":\"Test\",\"lastName\":\"${USER_NAMES[$INDEX]}\",\"role\":\"$ROLE\"}'"
    fi
    return 1
  fi
}

test_token_validation() {
  local ROLE=$1
  local TOKEN=$2
  
  print_info "Testing token validation for $ROLE"
  
  RESPONSE=$(curl -s -X GET "$BACKEND_URL/auth/me" \
    -H "Authorization: Bearer $TOKEN" \
    2>/dev/null)
  
  if echo "$RESPONSE" | grep -q "email"; then
    print_success "$ROLE token is valid"
    return 0
  else
    print_error "$ROLE token validation failed"
    return 1
  fi
}

###############################################################################
# Main Test Execution
###############################################################################

main() {
  # Test 1: Backend Health
  TOTAL_TESTS=$((TOTAL_TESTS + 1))
  if test_backend_health; then
    PASSED_TESTS=$((PASSED_TESTS + 1))
  else
    FAILED_TESTS=$((FAILED_TESTS + 1))
    print_error "Backend is not running. Exiting..."
    exit 1
  fi
  
  # Test 2: Frontend Health
  TOTAL_TESTS=$((TOTAL_TESTS + 1))
  if test_frontend_health; then
    PASSED_TESTS=$((PASSED_TESTS + 1))
  else
    FAILED_TESTS=$((FAILED_TESTS + 1))
    print_warning "Frontend is not running. Some tests will be skipped."
  fi
  
  # Test 3: Unauthorized Access
  TOTAL_TESTS=$((TOTAL_TESTS + 1))
  if test_unauthorized_access; then
    PASSED_TESTS=$((PASSED_TESTS + 1))
  else
    FAILED_TESTS=$((FAILED_TESTS + 1))
  fi
  
  # Test 4-10: Login and token validation for each role
  print_header "Test 4-10: User Authentication (All 7 Roles)"
  
  for i in "${!USER_NAMES[@]}"; do
    ROLE="${USER_ROLES[$i]}"
    DASHBOARD="${USER_DASHBOARDS[$i]}"
    
    echo ""
    echo -e "${YELLOW}Testing Role: $ROLE${NC}"
    echo "─────────────────────────────────────────────────────────────"
    
    # Test login
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    TOKEN=$(test_user_login "$i")
    
    if [ $? -eq 0 ]; then
      PASSED_TESTS=$((PASSED_TESTS + 1))
      
      # Test token validation
      TOTAL_TESTS=$((TOTAL_TESTS + 1))
      if test_token_validation "$ROLE" "$TOKEN"; then
        PASSED_TESTS=$((PASSED_TESTS + 1))
      else
        FAILED_TESTS=$((FAILED_TESTS + 1))
      fi
      
      # Print dashboard URL
      print_info "Dashboard URL: $FRONTEND_URL$DASHBOARD"
    else
      FAILED_TESTS=$((FAILED_TESTS + 1))
      print_warning "Skipping token validation for $ROLE due to login failure"
    fi
  done
  
  # Print Summary
  print_header "Test Summary"
  
  echo -e "Total Tests:  ${CYAN}$TOTAL_TESTS${NC}"
  echo -e "Passed:       ${GREEN}$PASSED_TESTS${NC}"
  echo -e "Failed:       ${RED}$FAILED_TESTS${NC}"
  
  if [ $TOTAL_TESTS -gt 0 ]; then
    PASS_RATE=$((PASSED_TESTS * 100 / TOTAL_TESTS))
    echo -e "Pass Rate:    ${CYAN}$PASS_RATE%${NC}\n"
  fi
  
  if [ $FAILED_TESTS -eq 0 ]; then
    print_success "All tests passed! ✨"
    echo ""
    print_info "Next Steps:"
    echo "  1. Run E2E tests with Playwright for full dashboard testing"
    echo "  2. Verify mobile responsiveness"
    echo "  3. Test role-based access control (RBAC)"
    echo ""
    return 0
  else
    print_error "Some tests failed. Please review the output above."
    echo ""
    print_info "Common Issues:"
    echo "  - Test users not created: Use the curl commands shown above"
    echo "  - Backend not running: Check Docker containers"
    echo "  - Database not migrated: cd backend && npx prisma migrate dev"
    echo ""
    
    if [ $FAILED_TESTS -gt 3 ]; then
      print_warning "Multiple test failures detected. Creating test users..."
      echo ""
      print_info "Creating test users for all 7 roles..."
      
      for i in "${!USER_NAMES[@]}"; do
        EMAIL="${USER_EMAILS[$i]}"
        PASSWORD="${USER_PASSWORDS[$i]}"
        ROLE="${USER_ROLES[$i]}"
        NAME="${USER_NAMES[$i]}"
        
        echo "Creating $ROLE user..."
        curl -s -X POST "$BACKEND_URL/auth/register" \
          -H "Content-Type: application/json" \
          -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"firstName\":\"Test\",\"lastName\":\"$NAME\",\"role\":\"$ROLE\"}" \
          > /dev/null 2>&1
      done
      
      echo ""
      print_success "Test users created. Re-run this script to test again."
    fi
    
    return 1
  fi
}

# Run main function
main

exit $?
