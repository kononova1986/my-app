'use client'
import React, { useState } from 'react';
import { Button, Card, CardContent, Input, Label, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui';
import { CircleArrowDown, CircleArrowUp, UserMinus, UserPen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AddUser } from '../common';
import { nanoid } from "nanoid";

export type UserInfo = {
  id: string; 
  name: string;
  interest: string;
  age: number;
};

const userInfo: UserInfo[] = [
  {
    id: nanoid(),
    name: "Chris",
    interest: "HTML tables",
    age: 22,
  },
  {
    id: nanoid(),
    name: "Dennis",
    interest: "Web accessibility",
    age: 45,
  },
  {
    id: nanoid(),
    name: "Sarah",
    interest: "JavaScript frameworks",
    age: 56,
  },
  {
    id: nanoid(),
    name: "Karen",
    interest: "Web performance",
    age: 24,
  },
  {
    id: nanoid(),
    name: "Emily",
    interest: "CSS animations",
    age: 34,
  },
  {
    id: nanoid(),
    name: "John",
    interest: "Frontend tools",
    age: 94,
  },
  {
     id: nanoid(),
    name: "Anna",
    interest: "UX design",
    age: 28,
  },
];

const userInfoWithIds = userInfo.map((user) => ({
  ...user,
  id: nanoid(),
}));

console.log(userInfoWithIds);

interface TableSortProps {
  className?: string;
}

type SortType = {
  column: string,
  order: 'asc' | 'desc'
}

export const TableSort: React.FC<TableSortProps> = () => {
    const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [sortedData, setSortedData] = useState<UserInfo[]>(userInfoWithIds);
  const [update, setUpdate] = useState<
    UserInfo | { name: ""; interest: ""; age: 0; id: "" } | undefined
  >(undefined);

  const [updateCard, setUpdateCard] = useState(false);
 

  const [sortOrder, setSortOrder] = useState<SortType>({
    column: "",
    order: 'desc'
  });


  const handleSorted = (sortName: keyof UserInfo) => {
    const order = sortOrder.order === 'asc' ? 1 : -1
    setSortedData((prev) => [...prev]
      .sort((a, b) => {
        if (a[sortName] > b[sortName]) {
          return order;
        } else if (a[sortName] < b[sortName]) {
          return -order;
        }
        return 0;
      })
    )
 setSortOrder({
   column: sortName,
   order: sortOrder.order === 'asc' ? "desc" : 'asc'
 })
    setActiveColumn(sortName);
  };

const onSubmit = (formData: UserInfo): void => {
  setSortedData((prev) => [...prev, formData]);
  };
  
  const handleDeleteUser = (id:string) => {
  setSortedData((prev) => prev.filter((item) => item.id !== id));
  };
  
  const handleUpdateUser = (id: string) => {
  const updated = sortedData.find((item) => item.id === id);
  if (updated) {
    setUpdate((prev) => ({ ...prev, ...updated }));
    }
    setUpdateCard(true);
  };

 const handleUpdateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { id, value } = e.target;
   setUpdate((prev) => {
     if (prev) {
       return {
         ...prev,
         [id]: id === "age" ? Number(value) : value, 
       };
     }
   });
 };

   const handleClickUpdate = (e: React.FormEvent<HTMLFormElement>): void => {
     e.preventDefault();
       setSortedData((prev) =>
         prev.map((user) =>
           user.id === update?.id ? { ...user, ...update } : user
         )
       );
     
     setUpdateCard(false);
   };

  const IconSort: React.FC<{
    columnName: string;
  }> = ({ columnName}) => {
    return (
      <>
        {sortOrder.order === "desc" ? (
          <CircleArrowDown
            className={cn(
              "opacity-20 hover:opacity-60",
              activeColumn === columnName && "opacity-80"
            )}
          />
        ) : (
          <CircleArrowUp
            className={cn(
              "opacity-20 hover:opacity-60",
              activeColumn === columnName && "opacity-80"
            )}
          />
        )}
      </>
    );
  };

  return (
    <div className='flex flex-col justify-center'>
      <AddUser onSubmit={onSubmit} />
      <Table className="w-min-[350px] w-max-[1200px] text-base border">
        <TableHeader>
          <TableRow>
            <TableHead
              className="w-[300px]"
              onClick={() => {
                handleSorted("name");
              }}
            >
              <div className="flex gap-1 cursor-pointer">
                Name
                <IconSort columnName={"name"} />
              </div>
            </TableHead>
            <TableHead
              onClick={() => {
                handleSorted("interest");
              }}
            >
              <div className="flex gap-1 cursor-pointer">
                Most interest in
                <IconSort columnName={"interest"} />
              </div>
            </TableHead>
            <TableHead
              onClick={() => {
                handleSorted("age");
              }}
            >
              <div className="flex gap-1 cursor-pointer">
                Age
                <IconSort columnName={"age"} />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.interest}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell className="flex justify-end pr-4">
                <div className="flex flex-row gap-8">
                  <UserMinus
                    className="p-1 opacity-25 hover:opacity-60 cursor-pointer"
                    onClick={() => {
                      handleDeleteUser(user.id);
                    }}
                  />
                  <UserPen
                    className="p-1 opacity-25 hover:opacity-60 cursor-pointer"
                    onClick={() => {
                      handleUpdateUser(user.id);
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {updateCard && (
        <div className="flex justify-end">
          <Card className="w-[350px] pt-6">
            <CardContent>
              <form onSubmit={handleClickUpdate}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={update?.name}
                      onChange={handleUpdateInput}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="interest">Interest</Label>
                    <Input
                      id="interest"
                      value={update?.interest}
                      onChange={handleUpdateInput}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      value={update?.age}
                      onChange={handleUpdateInput}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setUpdateCard(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Update</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};