import { createObituary } from '../../../domain/obituary'

const expected = {
  avaz_1: [
    createObituary({
      firstname: 'Hamidu',
      surname: 'Žepljaku',
      middlename: 'Kulovcu',
      dateOfBirth: null,
      dateOfDeath: '08.03.2021.',
      imgUrl:
        'https://digital.avaz.ba/uploads/obituaries/TmVZO9pahQFdJoI2.jpeg',
      description:
        'Molimo Uzvišenog Allaha dž.š. da ukaže Svoju milost i uvede te u Džennetske bašče.\nTvoj duhovni muftija Hamed ef. Efendić, Zakira, Nudžejma, Sinanudin i Dino',
    }),
  ],
  avaz_2: [
    createObituary({
      firstname: 'Irfan',
      surname: 'Sarajlić',
      dateOfBirth: null,
      dateOfDeath: '08.03.2021.',
      imgUrl: 'https://digital.avaz.ba/uploads/obituaries/vbeHXIOa25jPgff8.jpg',
      description:
        'Bio je dio našeg puta i sve dobro što smo imali.\nHalko Sarajlić sa porodicom',
    }),
  ],
  avaz_3: [
    createObituary({
      firstname: 'Mirza',
      middlename: 'Salih',
      surname: 'Krupalija',
      dateOfBirth: null,
      dateOfDeath: '08.03.2021.',
      imgUrl: 'https://digital.avaz.ba/uploads/obituaries/8S9zqM5arRAnDGaU.jpg',
      description: 'S ljubavlju,\nAzra',
    }),
  ],
} as const

export default expected
