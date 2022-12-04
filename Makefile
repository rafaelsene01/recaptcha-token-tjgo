build:
	docker build -t tjgo/token .
prod:
	docker run -p 4444:4444 -d tjgo/token
dev:
	docker-compose up
hidden:
	docker-compose up -d
down:
	docker-compose down
