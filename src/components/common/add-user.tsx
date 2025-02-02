'use client'
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button, Label } from '../ui';
import { cn } from '@/lib/utils';
import { type UserInfo }  from './table-sort';
import { nanoid } from 'nanoid';


interface AddUserProps {
  className?: string;
  onSubmit: (formData: UserInfo) => void;
}

export const AddUser: React.FC<AddUserProps> = ({ className, onSubmit }) => {
  const [formData, setFormData] = useState<UserInfo>({
    name: "",
    interest: "",
    age: 0,
    id: '',
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: id === 'age' ? Number(value): value }));
  };

  const submitData = () => {
    onSubmit({ ...formData, id: nanoid() });
    setFormData({ name: "", interest: "", age: 0, id: "" }); 
  };

  return (
    <>
      <div className={cn("grid grid-cols-3 gap-4", { className })}>
        <div>
          <Label htmlFor="name" className="text-primary pl-1">
            Name
          </Label>
          <Input id="name" value={formData.name} onChange={handleChangeInput} />
        </div>

        <div>
          <Label htmlFor="interest" className="text-primary pl-1">
            Interest
          </Label>
          <Input
            id="interest"
            value={formData.interest}
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <Label htmlFor="age" className="text-primary pl-1">
            Age
          </Label>
          <Input
            id="age"
            value={formData.age === 0 ? "" : formData.age}
            onChange={handleChangeInput}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="text-base flex-end my-4"
          onClick={() => {
            submitData();
          }}
        >
          Add user
        </Button>
      </div>
    </>
  );
};
