# Makefile for Q-Bridge

.PHONY: help dev-up dev-down dev-logs dev-build dev-restart dev-clean prod-up prod-down prod-logs prod-build prod-restart db-migrate db-seed db-studio test

help:
	@echo "Q-Bridge Docker Commands"
	@echo "========================"
	@echo "Development:"
	@echo "  make dev-up      - Start development environment"
	@echo "  make dev-down    - Stop development environment"
	@echo "  make dev-logs    - View development logs"
	@echo "  make dev-build   - Rebuild development containers"
	@echo "  make dev-restart - Restart development containers"
	@echo "  make dev-clean   - Stop and remove volumes (clean slate)"
	@echo ""
	@echo "Production:"
	@echo "  make prod-up     - Start production environment"
	@echo "  make prod-down   - Stop production environment"
	@echo "  make prod-logs   - View production logs"
	@echo "  make prod-build  - Rebuild production containers"
	@echo "  make prod-restart - Restart production containers"
	@echo ""
	@echo "Database:"
	@echo "  make db-migrate  - Run database migrations"
	@echo "  make db-seed     - Seed database with test data"
	@echo "  make db-studio   - Open Prisma Studio"
	@echo ""
	@echo "Testing:"
	@echo "  make test        - Run all tests"

# Development
dev-up:
	docker-compose -f docker-compose.dev.yml up -d

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

dev-build:
	docker-compose -f docker-compose.dev.yml build

dev-restart:
	docker-compose -f docker-compose.dev.yml restart

dev-clean:
	docker-compose -f docker-compose.dev.yml down -v

# Production
prod-up:
	docker-compose -f docker-compose.prod.yml up -d

prod-down:
	docker-compose -f docker-compose.prod.yml down

prod-logs:
	docker-compose -f docker-compose.prod.yml logs -f

prod-build:
	docker-compose -f docker-compose.prod.yml build

prod-restart:
	docker-compose -f docker-compose.prod.yml restart

# Database
db-migrate:
	docker-compose -f docker-compose.dev.yml exec backend npx prisma migrate dev

db-seed:
	docker-compose -f docker-compose.dev.yml exec backend npm run seed

db-studio:
	docker-compose -f docker-compose.dev.yml exec backend npx prisma studio

# Testing
test:
	docker-compose -f docker-compose.dev.yml exec backend npm run test
	docker-compose -f docker-compose.dev.yml exec frontend npm run test
