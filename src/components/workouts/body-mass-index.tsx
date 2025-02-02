"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button, Input } from "../ui";
import { Label } from "../ui";
import { useTranslation } from "react-i18next";

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
        info = "Underweight";
        break;
      case bmi >= 18.5 && bmi < 24.9:
        info = "Normal weight";
        break;
      case bmi >= 25 && bmi < 29.9:
        info = "Overweight";
        break;
      case bmi >= 30:
        info = "Obese";
        break;
      default:
        info = "Invalid BMI! Please enter numbers";
        break;
    }
    return info;
  };

  return (
    <div className={cn("", className)}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="kg" className="text-xs text-primary">
            {t("workouts.kg")}
          </Label>
          <Input
            id="kg"
            type="number"
            value={bwi.kg <= 0 ? "" : bwi.kg}
            onChange={handleChangeInput}
            className="bg-white border-neutral-300 text-sm text-gray-700"
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
            className="bg-white border-neutral-300 text-sm text-gray-700"
          ></Input>
        </div>
      </div>
      <div>
        <Button onClick={handleCalculateBmi} className="w-full mt-4">
          {t("button.calculate")}
        </Button>
        {bwiData <= 0 ? null : (
          <div className="flex w-full bg-white text-sm text-gray-700 items-center text-center justify-center rounded-sm mt-6 h-8">
            <p>{bwiData} -</p>
            <p className=" pl-1">{infoAboutBmi(bwiData)}</p>
          </div>
        )}
      </div>
    </div>
  );
};
