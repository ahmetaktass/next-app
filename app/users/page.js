"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const Users = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Sayfa yüklendiğinde yapılacak işlemler
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyapi.io/data/v1/user", {
          headers: {
            "app-id": process.env.customKey,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Veri çekme hatası:", response.status);
        }
      } catch (error) {
        console.error("İstek hatası:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      // Örnek olarak, silme işlemi için API isteği (Gerçek projenizde bu kısmı API'nize göre ayarlayın)
      const response = await fetch(
        `https://dummyapi.io/data/v1/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            "app-id": process.env.customKey,
          },
        }
      );

      if (response.ok) {
        // Eğer silme işlemi başarılıysa, userData'yı güncelle
        setUserData((prevUserData) => ({
          ...prevUserData,
          data: prevUserData.data.filter((user) => user.id !== userId),
        }));
      } else {
        console.error("Silme işlemi başarısız:", response.status);
      }
    } catch (error) {
      console.error("Silme işlemi sırasında hata oluştu:", error);
    }
  };
  const handleEdit = async (userId) => {
    console.log("Edit");
  };

  return (
    <Grid container spacing={2}>
      {userData &&
        userData.data.map((user) => (
          <Grid item xs={12} sm={6} lg={3} key={user.id}>
            <div className="flex items-center group  bg-gray-100 p-5 rounded-md  m-2 relative cursor-pointer">
              <Image
                src={user.picture}
                alt={`${user.firstName} ${user.lastName}`}
                width={80}
                height={80}
                className="rounded-full"
              />
              <div className="ml-4">
                <h2 className="text-2xl font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-500">{user.title}</p>
                <DeleteIcon
                  sx={{
                    color: "red",
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(user.id)}
                  className="absolute top-2 right-2 hidden group-hover:block "
                >
                  Sil
                </DeleteIcon>
                <EditIcon
                  onClick={() => handleEdit(user.id)}
                  sx={{
                    color: "blue",
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                  }}
                  className="absolute top-10 right-2 hidden group-hover:block "
                >
                  Düzenle
                </EditIcon>
              </div>
            </div>
          </Grid>
        ))}
    </Grid>
  );
};

export default Users;
