import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { make, model, year, goal } = body;

  const prompt = `You are a skilled race technician helping plan a build. The customer owns a ${year} ${make} ${model} and their goal is ${goal}. Suggest 4–6 performance modifications, explain the part types, preferred brands if relevant, and order of install.`;

  const chat = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return NextResponse.json({ recommendations: chat.choices[0].message.content });
}

