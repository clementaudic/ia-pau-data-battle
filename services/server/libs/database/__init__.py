from prisma import Prisma, register

database = Prisma()

database.connect()

register(database)
