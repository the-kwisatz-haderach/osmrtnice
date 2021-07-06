import { createObituary } from '../../../domain/obituary'
import { Obituary } from '../../../domain/obituary/types'

const expected: Obituary[] = [
  createObituary({
    firstname: 'Zlatici',
    surname: '',
    dateOfBirth: null,
    dateOfDeath: null,
    imgUrl:
      'https://cdn.oslobodjenje.ba/images/slike/2021/03/06/ob_media_79797-160.jpg',
    relative: 'Džana, Zijo, Arman i Dado',
  }),
  createObituary({
    firstname: 'Vesni',
    surname: 'Begtašević',
    dateOfBirth: '1955',
    dateOfDeath: '2021',
    imgUrl:
      'https://cdn.oslobodjenje.ba/images/slike/2021/03/06/ob_media_79796-160.jpg',
    relative: 'Amira, Leana i Sanjin Lugić',
    description:
      'Porodici Begtašević, prijateljima i Konjicu iskreno saučešće.',
  }),
  createObituary({
    firstname: 'Midhat',
    middlename: 'Akifa',
    surname: 'Jusić',
    dateOfBirth: null,
    dateOfDeath: null,
    imgUrl:
      'https://cdn.oslobodjenje.ba/images/slike/2021/03/06/ob_media_79794-160.jpg',
    relative:
      'Tvoji: Dženana, h. Adnan, Avdo, h. Elma, Faruk, Bakir, Lamija, Maja, Tarik i Alison',
    description:
      'Neka ti dragi Allah dž.š. podari lijepi džennet i vječni rahmet.',
  }),
  createObituary({
    firstname: 'Tariku',
    surname: 'Eminagiću',
    dateOfBirth: '1987',
    dateOfDeath: '2021',
    imgUrl:
      'https://cdn.oslobodjenje.ba/images/slike/2021/03/06/ob_media_79790-160.jpg',
    relative: 'Tvoja Tacta porodica',
    description:
      'Bit ćeš zauvijek zapamćen kao najiskrenija, najvedrija duša i često ćemo te se sjećati.\nNemjerljiv je gubitak što više nisi s nama.\nNeka ti je laka zemlja.',
  }),
  createObituary({
    firstname: 'Zlatici',
    surname: '',
    dateOfBirth: null,
    dateOfDeath: null,
    imgUrl:
      'https://cdn.oslobodjenje.ba/images/slike/2021/03/06/ob_media_79779-160.jpg',
    relative: 'Verica i Nečko',
    description:
      'Beskrajno tužni zbog tvog preranog odlaska.\nSuprugu Radetu i porodici iskreno saučešće.',
  }),
  createObituary({
    firstname: 'Dalida',
    middlename: 'Hadžić',
    surname: 'Tulić',
    dateOfBirth: null,
    dateOfDeath: null,
    imgUrl:
      'https://cdn.oslobodjenje.ba/images/slike/2021/03/06/ob_media_79778-160.jpg',
    relative: 'Verica, Nećko, Jesenko, Sabina i Isak',
    description:
      'Mnogo voljena, nasmijana, druželjubiva, velikog srca...\nSa porodicom iskreno dijelimo bol...',
  }),
]

export default expected
