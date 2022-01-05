import { createObituary } from '../../../domain/obituary'
import { IObituary } from '../../../domain/types'

const expected: Record<string, Array<Omit<IObituary, '_id'>>> = {
  osmrtnica_1: [
    createObituary({
      type: 'obituary',
      firstname: 'Blaž',
      surname: 'Vlašić – Banović',
      long_text:
        'Zahvalni za dar njegovog života i za ljubav i dobrotu koju smo od njega i po njemu primili, javljamo da je naš dragi\nBLAŽ VLAŠIĆ  BANOVIĆ\nBlago u Gospodinu preminuo u UTORAK 04.01.2022. u 75. godini života. Sprovod dragog nam pokojnika bit će u ČETVRTAK 06.01.2022. godine u 14.00 sati ispred mrtvačnice GORICA – SOVIĆI. Obitelj prima sućut u mrtvačnici od 13.00 sati. Pokop dragog nam pokojnika obavit će se na mjesnom groblju GORICA – SOVIĆI.\nPOČIVAO U MIRU BOŽJEM!\nOŽALOŠĆENI\n',
      date_of_birth: '1947',
      date_of_death: '2022',
      image:
        'https://www.osmrtnica.ba/wp-content/uploads/2022/01/blaz-vlasic.jpg',
      relative: '',
    }),
  ],
}

export default expected
