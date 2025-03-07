import React, { useState } from "react";
import Image from "next/image";
import { Rate } from "antd";
import IOutfit from "@/app/types/IOutfit";
import { updateOutfitFavorite } from "@/app/services/outfitServices";

export interface IUserOutfits {
  looks: IOutfit[];
}

const UserOutfits: React.FC<IUserOutfits> = ({ looks }) => {
  const [outfits, setOutfits] = useState<IOutfit[]>(looks || []);

  const updateRate = async (outfitId: string, value: number) => {
    try {
      setOutfits((prevOutfits: IOutfit[]) => {
        return prevOutfits.map((outfit: IOutfit) => {
            if (String(outfit._id) === outfitId) {
                return {...outfit, favorite: value} as IOutfit
            }
            return outfit;
        });
      });
      const response = await updateOutfitFavorite(outfitId, value);

      if (!response) {
        setOutfits((prevOutfits: IOutfit[]) => {
          return prevOutfits.map((outfit: IOutfit) => {
            return outfit;
          });
        });
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="flex overflow-x-auto p-2 custom-scrollbar mb-3">
      {outfits.map((look: IOutfit, index: number) => (
        <div
          key={index}
          className="my-4 ml-1 shadow-md p-1 flex flex-col items-center justify-center w-[145px] shrink-0"
        >
          <Image
            src={look.img}
            alt={`Look ${index + 1}`}
            width={120}
            height={180}
          />
          <span className="my-2 text-sm">עונה: {look.season}</span>
          <Rate
            onChange={(value: number) => updateRate(String(look._id), value)}
            value={look.favorite}
          />
        </div>
      ))}
    </div>
  );
};

export default UserOutfits;
