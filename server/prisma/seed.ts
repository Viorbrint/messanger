import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const names = ['john', 'Anya', 'Viorbrint', 'Bogdan', 'Noname', 'Gentelman'];
  const emails = [
    'john@gmail.com',
    'Anya@gmail.com',
    'Viorbrint@gmail.com',
    'Bogdan@gmail.com',
    'Noname@gmail.com',
    'Gentelman@gmail.com',
  ];
  const passwords = [
    'johnasdf',
    'Anyafd',
    'Viorbrinthgf',
    'Bdfghogdan',
    'Nonfdsame',
    'Gentcvbelman',
  ];

  const usersObjs = names.map((_, index) => {
    return {
      name: names[index],
      email: emails[index],
      pass: passwords[index],
    };
  });

  const usersPromises = usersObjs.map(async (user) => {
    return await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: {
        email: user.email,
        password: user.pass,
        name: user.name,
        role: 'USER',
      },
    });
  });

  Promise.all(usersPromises).then((users) => console.log(users));
};

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
