import '@/styles/event.scss';

export default function EventDetails() {
  return (
    <section className="event">
      <h2 className="event__title">Тойдың бағдарламасы:</h2>
      <div className="event__timeline">
        <div className="event__item">
          <div className="event__dot" />
          <div className="event__content">
            <div className="event__time">16:30</div>
            <div className="event__text">қонақтардың жиналуы</div>
          </div>
        </div>
        <div className="event__item">
          <div className="event__dot" />
          <div className="event__content">
            <div className="event__time">17:00</div>
            <div className="event__text">Тойдың басталуы</div>
          </div>
        </div>
      </div>
    </section>
  );
}