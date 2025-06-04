'use client';
import { useState } from "react";
import '@/styles/rsvp.scss'

export default function RSVPForm() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState(''); // 'yes', 'with_spouse', 'no'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(''); // For success/error messages

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Basic validation
    if (!name || !attendance) {
      setSubmitMessage('Аты-жөніңізді және қатысуыңызды таңдаңыз. (Please fill in your name and select attendance.)');
      setIsSubmitting(false);
      return;
    }

    const formData = {
      name,
      attendance,
      timestamp: new Date().toISOString(), // Add timestamp for submission
    };

    console.log('Submitting form data:', formData);

    // --- IMPORTANT: Replace this with your actual submission logic ---
    // You have several options here:
    // 1. Send to your own API endpoint (e.g., /api/rsvp)
    // 2. Use a service like Formspree (https://formspree.io/) or Netlify Forms
    // 3. Send via email (requires a backend)

    try {
      // Example: Using a simple fetch to a placeholder API endpoint
      // You would replace 'YOUR_API_ENDPOINT' with your actual backend URL
      const response = await fetch('/api/rsvp', { // Example: Next.js API route
      // const response = await fetch('https://formspree.io/f/your_form_id', { // Example: Formspree
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // For Formspree
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Растауыңыз қабылданды! Рахмет! ');
        // Clear form after successful submission
        setName('');
        setAttendance('');
      } else {
        const errorData = await response.json();
        setSubmitMessage(`Жіберу қатесі: ${errorData.message || 'Белгісіз қате'}. `);
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmitMessage('Жіберу кезінде қателік орын алды. Қайталап көріңіз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rsvp">
      <div className="container">

        <h2 className="rsvp__title">
          Келіңіздер,<br/>
          қуанышымыздың қадірменді<br/>
          қонағы болыңыздар!
        </h2>

        <h3 className="rsvp__subtitle">
          Сауалнама:
        </h3>
        <p className="rsvp__text">
          төмендегі форманы толтырып, тойға қатысуыңызды растауыңызды сұраймыз
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="label">
              Аты-жөніңіз:
            </label>
            <input
              className="text-input"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Тойға келесіз бе? (Will you attend the wedding?) */}
          <div className="form-group">
            <p className="label">
              Тойға келесіз бе?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <label className="radio-input">
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={attendance === 'yes'}
                  onChange={(e) => setAttendance(e.target.value)}
                  required
                />
                ИӘ, ӘРИНЕ КЕЛЕМІЗ
              </label>
              <label className="radio-input">
                <input
                  type="radio"
                  name="attendance"
                  value="with_spouse"
                  checked={attendance === 'with_spouse'}
                  onChange={(e) => setAttendance(e.target.value)}
                />
                ЖҰБАЙЫММЕН КЕЛЕМІН
              </label>
              <label className="radio-input">
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={attendance === 'no'}
                  onChange={(e) => setAttendance(e.target.value)}
                />
                ӨКІНІШКЕ ОРАЙ, КЕЛЕ АЛМАЙМЫН
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button className="rsvp__button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Жіберілуде...' : 'Жіберу'}
          </button>

          {/* Submission Message */}
          {submitMessage && (
            <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '1em', color: submitMessage.includes('қате') ? 'red' : 'green', fontFamily: 'Georgia, serif' }}>
              {submitMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}