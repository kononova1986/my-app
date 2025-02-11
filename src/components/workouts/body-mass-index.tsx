"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button, Input } from "../ui";
import { Label } from "../ui";
import { useTranslation } from "react-i18next";
import { FcCalculator } from "react-icons/fc";

interface BodyMassIndexProps {
  className?: string;
}

export const BodyMassIndex: React.FC<BodyMassIndexProps> = ({ className }) => {
  const { t } = useTranslation();
  const [bwi, setBmi] = useState({ kg: 0, cm: 0 });
  const [bwiData, setBmiData] = useState(0);
  console.log("🚀 ~ bwiData:", bwiData);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBmi((prev) => ({ ...prev, [id]: value }));
  };

  const handleCalculateBmi = () => {
    const calculate = Math.round(bwi.kg / (bwi.cm / 100) ** 2);
    setBmiData(calculate);
    setBmi({ kg: 0, cm: 0 });
  };

  const infoAboutBmi = (bmi: number) => {
    let info: string;
    switch (true) {
      case bmi < 18.5:
        info = t("workouts.infoAboutBmi.underweight");
        break;
      case bmi >= 18.5 && bmi < 24.9:
        info = t("workouts.infoAboutBmi.normalWeight");
        break;
      case bmi >= 25 && bmi < 29.9:
        info = t("workouts.infoAboutBmi.overweight");
        break;
      case bmi >= 30:
        info = t("workouts.infoAboutBmi.obese");
        break;
      default:
        info = t("workouts.infoAboutBmi.invalidBMI");
        break;
    }
    return info;
  };

  return (
    <div className={cn("", className)}>
      <span className="flex flex-row text-sm items-center ">
        <FcCalculator size={24} />
        {t("workouts.title")}
      </span>
      <div className="grid grid-cols-2 gap-4 mt-1">
        <div>
          <Label htmlFor="kg" className="text-xs text-primary">
            {t("workouts.kg")}
          </Label>
          <Input
            id="kg"
            type="number"
            value={bwi.kg <= 0 ? "" : bwi.kg}
            onChange={handleChangeInput}
            className="bg-white  text-sm text-gray-700"
          ></Input>
        </div>
        <div>
          <Label htmlFor="cm" className="text-xs text-primary">
            {t("workouts.cm")}
          </Label>
          <Input
            id="cm"
            type="number"
            value={bwi.cm <= 0 ? "" : bwi.cm}
            onChange={handleChangeInput}
            className="bg-white  text-sm text-gray-700"
          ></Input>
        </div>
      </div>
      <div>
        <Button onClick={handleCalculateBmi} className="w-full mt-4">
          {t("button.calculate")}
        </Button>
        {bwiData <= 0 ? null : (
          <div className="flex gap-1 w-full bg-white text-sm text-gray-700 items-center text-center justify-center p-1 rounded-sm mt-6 h-10">
            {isNaN(bwiData) ? null : <p>{bwiData}</p>}
            <p className="">{infoAboutBmi(bwiData)}</p>
          </div>
        )}
      </div>
    </div>
  );
};
