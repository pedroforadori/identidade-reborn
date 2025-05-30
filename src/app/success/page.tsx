"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import html2canvas from 'html2canvas';

export default function Success() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');
  const [dados, setDados] = useState<any>(null);
  const rgRef = useRef(null);

  useEffect(() => {
    if (!session_id) return;
    fetch(`/api/session?session_id=${session_id}`)
      .then((res) => res.json())
      .then((data) => setDados(data.metadata));
  }, [session_id]);

  const handleDownload = async () => {
    if (!rgRef.current) return;
    const canvas = await html2canvas(rgRef.current);
    const link = document.createElement("a");
    link.download = "rg-bebe-reborn.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  if (!dados) return <p className="p-4">Carregando...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-12">
      <div
        ref={rgRef}
        className="relative border-2 border-green-800 bg-green-100 p-4 w-[340px] h-[220px] rounded shadow-md text-left font-mono text-sm"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        <div className="absolute top-2 left-2 w-20 h-24 border bg-white flex items-center justify-center text-xs">
          {/* Simula a área da foto */}
          FOTO
        </div>
        <div className="ml-24">
          <h2 className="text-md font-bold text-green-900">República Federativa do Brasil</h2>
          <h3 className="text-sm text-green-800 mb-2">Registro Geral</h3>
          <p><strong>Nome:</strong> {dados.nome}</p>
          <p><strong>Data de Nascimento:</strong> {dados.nascimento}</p>
          <p><strong>Número do RG:</strong> {dados.rg}</p>
          <p className="mt-2"><strong>Assinatura:</strong></p>
          <div className="border-b border-black w-40 mt-1 mb-2" />
        </div>
        <p className="absolute bottom-1 right-2 text-[8px] italic text-gray-700">
          * Este não é um documento oficial
        </p>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
      >
        Baixar como Imagem
      </button>
    </div>
  );
}
