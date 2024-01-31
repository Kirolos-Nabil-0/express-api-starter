import express, { Router, Request, Response, NextFunction } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getChildren = async (req: Request, res: Response) => {
  try {
    const children = await prisma.child.findMany({});
    res.json(children);
  } catch (error) {
    res.status(500).json({
      error: `field to retrive children try again later`,
    });
  }
};

export const getChild = async (req: Request, res: Response) => {
  try {
    const id: number = req.body.id;

    const child = await prisma.child.findUnique({
      where: { id: id },
      include: {
        region: true,
      },
    });
    res.json(child);
  } catch (error) {
    res.status(500).json({
      error: `Failed to find child with ID ${req.params.id}.`,
    });
  }
};
export const createChild = async (req: Request, res: Response) => {
  try {
    const { name, regionId, dadPhone, momPhone, age, address } = req.body;
    const child = await prisma.child.create({
      data: {
        name,
        regionId,
        dadPhone,
        momPhone,
        age,
        address,
        region: {
          connect: { id: regionId },
        },
      },
    });
    res.json(child);
  } catch (error) {
    res.status(500).json({
      error: `Failed to create child with the name '${req.body.name}'.`,
      msg: error,
      dataSended: req.body,
    });
  }
};

export const updateChild = async (req: Request, res: Response) => {
  try {
    const { id, name, regionId, dadPhone, momPhone, age, address } = req.body;
    const child = await prisma.child.update({
      where: { id: id },
      data: {
        name,
        regionId,
        dadPhone,
        momPhone,
        age,
        address,
        region: {
          connect: { id: regionId },
        },
      },
    });
    res.json(child);
  } catch (error) {
    res.status(500).json({
      error: `Failed to update child with the name '${req.body.name}'.`,
      msg: error,
      dataSended: req.body,
    });
  }
};

export const deleteChild = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const child = await prisma.child.delete({
      where: { id: Number(id) },
    });
    res.json(child);
  } catch (error) {
    res.status(500).json({
      error: `Failed to delete child with ID ${req.params.id}.`,
    });
  }
};

// relational getters
export const getChildByRegion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const children = await prisma.region
      .findUnique({
        where: { id: Number(id) },
      })
      .children();
    res.json(children);
  } catch (error) {
    res.status(500).json({
      error: `Failed to find children for region ${req.params.id}.`,
    });
  }
};
