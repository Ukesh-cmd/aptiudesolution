# Variables
DOCKER_IMAGE=aptitude-backend
DOCKER_TAG=latest

.PHONY: help build up down logs db-setup migrate seed

help:
	@echo "Usage:"
	@echo "  make build      Build docker images"
	@echo "  make up         Start containers"
	@echo "  make down       Stop containers"
	@echo "  make logs       View container logs"
	@echo "  make db-setup   Run migrations and seed"
	@echo "  make migrate    Run prisma migrations"
	@echo "  make seed       Run prisma seed"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

db-setup:
	npm run db:setup

migrate:
	npx prisma migrate dev

seed:
	npx prisma db seed
