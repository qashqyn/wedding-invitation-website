import '@/styles/couple.scss'
import Image from 'next/image';

import Ornament from '@/assets/imgs/ornament-horizontal.png';

export default function CoupleSection() {
  return (
    <section className="couple">
      <div className="container">
        <h2 className="couple__title">Our Story</h2>
        <div className="couple__invite_text">
          <p className="song">
            Бақыттың нұры төгілген күн бүгін,<br/>
            Екі жүрек тоғысып, бір арнаға келіп тұр.<br/>
            Махаббаттың әнін шырқап, той жасап,<br/>
            Жас жұбайлар жаңа өмірге қадам басып тұр.<br/>
            Осы тойда ақ тілектер айтылсын,<br/>
            Шаңырақтары биік болып, береке толсын!
          </p>
          <p className='people'>
            <span>Құрметті</span> <br/>
            ағайын-туыс, бауырлар,
            құда-жекжат, нағашы-жиен,
            бөлелер, құрбы-құрдас,
            дос-жарандар, әріптестер,
            көршілер!
          </p>
          <Image src={Ornament} alt='ornament' className='ornament rotate' />
          <p className='invitation'>
            Сіздерді ұл/қызымыздың
            <span>Дәулет пен Томирис</span>
            арасындағы неке тойына арналған салтанатты дастарханымызға шақырамыз!
          </p>
          <Image src={Ornament} alt='ornament' className='ornament' />
        </div>
        {/* <div className="couple__photos">
          <img src="/images/bride.jpg" className="couple__photo" alt="Bride" />
          <img src="/images/groom.jpg" className="couple__photo" alt="Groom" />
        </div> */}
      </div>
    </section>
  );
}