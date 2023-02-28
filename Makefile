build:
	docker build -t rafaelsene/node:tokenTJGO .
prod:
	docker run -p 4444:4444 -d rafaelsene/node:tokenTJGO
dev:
	docker-compose up
hidden:
	docker-compose up -d
down:
	docker-compose down
