import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

type ResponseData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { to, html, subject, RESEND_API_KEY } = req.body;
  const resend = new Resend(RESEND_API_KEY);

  if (!to || !html) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      from: 'yoopta dev app <onboarding@resend.dev>',
      to,
      subject: subject || 'Your Email Subject',
      html,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
}
