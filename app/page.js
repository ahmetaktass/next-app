"use client";
import { Link } from "@mui/material";
import React from "react";

export default function Home() {
  return (
    <div className="h-[90vh]">
      <div className="flex flex-col items-center justify-center h-full p-4">
        <h1 className="text-4xl font-bold mb-5">Hoş Geldiniz! 🚀</h1>
        <p className="text-xl">
          Bu Next.js başlangıç projesi, Tailwind CSS , Material UI ve Rudux
          Toolkit kullanılarak oluşturuldu. Projenin temel özellikleri
          şunlardır:
        </p>
        <ul className="list-disc mt-3 ml-5 ">
          <li>
            Kullanıcıları Listeleme , Ekleme i Silme ve Düzenleme İşlemleri{" "}
          </li>
          <li>
            Post Listeleme , Silme , ( Edit ve Ekleme işlemleri benzer yapı
            olduğu için daha sonra eklenecektir.)
          </li>
          <li>
            {" "}
            Kullanıcı ve Post Ekranları İçin Arama İşlemleri oluşturuldu{" "}
          </li>
          <li>Kullanıcılar ve Postlar için ayrı ayrı sayfalar oluşturuldu. </li>
          <li>Responsive tasarım için Tailwind CSS ve MUI kullanıldı.</li>
        </ul>
        <p className="text-xl mt-5">
          Proje dosyalarını keşfetmeye başlayın ve geliştirmeye başlamak için
          hazır olun!
        </p>
        <Link href="https://www.ahmetaktas.dev" className="mt-5 no-underline">
          <span className="text-xl font-bold text-orange-500 ">
            👉 Ahmet Aktaş👈
          </span>
        </Link>
      </div>
    </div>
  );
}
