"use client"

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const stripePromise = loadStripe("pk_test_51RUVJd03qGAtkcQchTp6iaLs4XxUszdOACTfvWedTKDTVWm26QIRWfd804uicD7WW9eBpUHTqe2yhK33e39M6gqe00qmKsvaXM");

export default function Home() {
   const [form, setForm] = useState({ nome: "", nascimento: "", rg: "" });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const session = await res.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="max-w-md w-full">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">Criar RG de Bebê Reborn</h2>
          <input
            type="text"
            name="nome"
            placeholder="Nome do bebê"
            value={form.nome}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="nascimento"
            value={form.nascimento}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="rg"
            placeholder="Número do RG"
            value={form.rg}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <Button onClick={handleCheckout} className="w-full">
            Pagar e Gerar RG
          </Button>
          <p className="text-xs text-gray-500 text-center">
            * Este não é um documento oficial.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
