import { createObituary } from '../../../domain/obituary'
import { ICrawledObituary } from '../../../domain/types'

const expected: Array<Omit<ICrawledObituary, '_id'>> = [
  createObituary({
    type: 'OBITUARY',
    firstname: 'Zlatici',
    surname: '',
    long_text: '',
    date_of_birth: null,
    date_of_death: null,
    image:
      'https://cdn.oslobodjenje.ba/images/slike/2021/03/06/ob_media_79797-160.jpg',
    relative: 'Džana, Zijo, Arman i Dado',
  }),
  createObituary({
    type: 'OBITUARY',
    firstname: 'Vesni',
    surname: 'Begtašević',
    date_of_birth: '1955',
    date_of_death: '2021',
    image:
      'https://cdn.oslobodjenje.ba/images/slike/2021/03/06/ob_media_79796-160.jpg',
    relative: 'Amira, Leana i Sanjin Lugić',
    long_text: 'Porodici Begtašević, prijateljima i Konjicu iskreno saučešće.',
  }),
  createObituary({
    type: 'OBITUARY',
    firstname: 'Midhat',
    middlename: 'Akifa',
    surname: 'Jusić',
    date_of_birth: null,
    date_of_death: null,
    image:
      'https://cdn.oslobodjenje.ba/images/slike/2021/03/06/ob_media_79794-160.jpg',
    relative:
      'Tvoji: Dženana, h. Adnan, Avdo, h. Elma, Faruk, Bakir, Lamija, Maja, Tarik i Alison',
    long_text:
      'Neka ti dragi Allah dž.š. podari lijepi džennet i vječni rahmet.',
  }),
  createObituary({
    type: 'OBITUARY',
    firstname: 'Tariku',
    surname: 'Eminagiću',
    date_of_birth: '1987',
    date_of_death: '2021',
    image:
      'https://cdn.oslobodjenje.ba/images/slike/2021/03/06/ob_media_79790-160.jpg',
    relative: 'Tvoja Tacta porodica',
    long_text:
      'Bit ćeš zauvijek zapamćen kao najiskrenija, najvedrija duša i često ćemo te se sjećati.\nNemjerljiv je gubitak što više nisi s nama.\nNeka ti je laka zemlja.',
  }),
  createObituary({
    type: 'OBITUARY',
    firstname: 'Zlatici',
    surname: '',
    date_of_birth: null,
    date_of_death: null,
    image:
      'https://cdn.oslobodjenje.ba/images/slike/2021/03/06/ob_media_79779-160.jpg',
    relative: 'Verica i Nečko',
    long_text:
      'Beskrajno tužni zbog tvog preranog odlaska.\nSuprugu Radetu i porodici iskreno saučešće.',
  }),
  createObituary({
    type: 'OBITUARY',
    firstname: 'Dalida',
    middlename: 'Hadžić',
    surname: 'Tulić',
    date_of_birth: null,
    date_of_death: null,
    image:
      'https://cdn.oslobodjenje.ba/images/slike/2021/03/06/ob_media_79778-160.jpg',
    relative: 'Verica, Nećko, Jesenko, Sabina i Isak',
    long_text:
      'Mnogo voljena, nasmijana, druželjubiva, velikog srca...\nSa porodicom iskreno dijelimo bol...',
  }),
]

export default expected
