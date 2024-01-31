// src/types.ts

export type Region = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  servants: Servant[];
  children: Child[];
};

export type Servant = {
  id: number;
  name: string;
  regionId: number;
  region: Region;
  phone: string;
  children: Childservant[];
  createdAt: Date;
  updatedAt: Date;
};

export type Child = {
  id: number;
  name: string;
  age: number;
  address: string;
  regionId: number;
  region: Region;
  dadPhone: string;
  momPhone: string;
  servants: Childservant[];
  createdAt: Date;
  updatedAt: Date;
  childAttendance: ChildAttendance[];
};

export type Childservant = {
  id: number;
  childId: number;
  servantId: number;
  child: Child;
  servant: Servant;
  createdAt: Date;
  updatedAt: Date;
};

export type ChildAttendance = {
  id: number;
  childId: number;
  Child: Child;
  state: boolean;
  createdAt: Date;
  updatedAt: Date;
};
