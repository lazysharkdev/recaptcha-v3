import { NextApiRequest, NextApiResponse } from "next";

export async function validateRecaptcha(recaptchaResponse: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY as string;

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();

  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body;
  const data = await validateRecaptcha(token);

  if (data.success) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
}
