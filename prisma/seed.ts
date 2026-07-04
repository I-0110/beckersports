import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const categories = [
    { 
        name: "101",
        slug: "101"
    },
    {
        name: "Chiefs",
        slug: "KC"
    },
    {
        name: "Draft",
        slug: "draft"
    },
    {
        name: "Fantasy",
        slug: "fantasy"
    },
    {
        name: "Hall of Fame",
        slug: "hof"
    },
];

async function main() {
    for (const category of categories) {
        await db.category.upsert({
            where: { slug: category.slug },
            update: {},
            create: category,
        });
    }
    console.log("Categories seeded.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });