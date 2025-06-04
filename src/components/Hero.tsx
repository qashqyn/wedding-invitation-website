import '@/styles/hero.scss';

export default function Hero() {
  return (
    <section className="hero" >
      <div className="hero__overlay">
        <h1 className="hero__title">Дәулет
          <span>&</span>
        Томирис</h1>
        <p className="hero__subtitle">Үйлену той</p>
        {/* <p className="hero__date">4 October 2025, Almaty</p> */}
      </div>
    </section>
  );
}