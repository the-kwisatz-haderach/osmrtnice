import { createObituary } from '../../../domain/obituary'

const expected = {
  avaz_1: [
    createObituary({
      type: 'obituary',
      firstname: 'Hamidu',
      surname: 'Žepljaku',
      middlename: 'Kulovcu',
      date_of_birth: null,
      date_of_death: '08.03.2021.',
      image: 'https://digital.avaz.ba/uploads/obituaries/TmVZO9pahQFdJoI2.jpeg',
      long_text:
        'Molimo Uzvišenog Allaha dž.š. da ukaže Svoju milost i uvede te u Džennetske bašče.\nTvoj duhovni muftija Hamed ef. Efendić, Zakira, Nudžejma, Sinanudin i Dino',
    }),
  ],
  avaz_2: [
    createObituary({
      type: 'obituary',
      firstname: 'Irfan',
      surname: 'Sarajlić',
      date_of_birth: null,
      date_of_death: '08.03.2021.',
      image: 'https://digital.avaz.ba/uploads/obituaries/vbeHXIOa25jPgff8.jpg',
      long_text:
        'Bio je dio našeg puta i sve dobro što smo imali.\nHalko Sarajlić sa porodicom',
    }),
  ],
  avaz_3: [
    createObituary({
      type: 'obituary',
      firstname: 'Mirza',
      middlename: 'Salih',
      surname: 'Krupalija',
      date_of_birth: null,
      date_of_death: '08.03.2021.',
      image: 'https://digital.avaz.ba/uploads/obituaries/8S9zqM5arRAnDGaU.jpg',
      long_text: 'S ljubavlju,\nAzra',
    }),
  ],
} as const

export default expected
