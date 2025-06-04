import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("RSVP: ", data);

  const { name, attendance, timestamp } = data;
  if (!name || !attendance) {
    return NextResponse.json({ status: 400,success: false, message: 'Name and attendance are required.' });
  }

  // Get Telegram Bot Token and Chat ID from server-side environment variables
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram bot token or chat ID is not set in environment variables.');
    return NextResponse.json({ status: 500, success: false, message: 'Server configuration error.' });
  }

  // Construct the message for Telegram
  let telegramMessage = `*Жаңа RSVP жауабы!*
    Аты-жөні: *${name}*
    Қатысуы: *${
      attendance === 'yes' ? 'Иә, келемін' :
      attendance === 'with_spouse' ? 'Жұбайыммен келемін' :
      'Өкінішке орай, келе алмаймын'
    }*
  `;
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  try {
    const telegramResponse = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'Markdown', // Use Markdown for bold text etc.
      }),
    });

    const telegramData = await telegramResponse.json();

    if (telegramResponse.ok && telegramData.ok) {
      console.log('RSVP successfully sent to Telegram:', telegramData);
      return NextResponse.json({status:200,  success: true, message: 'Растауыңыз қабылданды! Рахмет!' });
    } else {
      console.error('Failed to send message to Telegram:', telegramData);
      return NextResponse.json({status:500,  success: false, message: 'RSVP жіберуде қателік туындады.' });
    }
  } catch (error) {
    console.error('Error sending RSVP to Telegram:', error);
    return NextResponse.json({status:500, success: false, message: 'Серверлік қате: RSVP жіберілмеді.' });
  }
}
