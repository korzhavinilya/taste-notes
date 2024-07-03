seed:
	npx prisma db seed
push:
	npx prisma db push
migrate: 
	npx prisma migrate dev
reset: 
	npx prisma db push --force-reset