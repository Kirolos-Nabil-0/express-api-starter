import express, { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getServants = async (req: Request, res: Response) => {
  try {
    const servants = await prisma.servant.findMany({
      include: {
        region: true,
      },
    });
    res.json(servants);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve servants. Please try again later." });
  }
};

const getServant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const servant = await prisma.servant.findUnique({
      where: { id: Number(id) },
      include: {
        region: true,
      },
    });
    if (!servant) {
      return res
        .status(404)
        .json({ error: `Servant with ID ${req.params.id} not found.` });
    }
    res.json(servant);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to find servant with ID ${req.params.id}.` });
  }
};

const createServant = async (req: Request, res: Response) => {
  try {
    const { name, regionId, phone } = req.body;
    const servant = await prisma.servant.create({
      data: {
        name,
        regionId: regionId,
        phone,
      },
    });
    res.json(servant);
  } catch (error) {
    res.status(500).json({
      error: `Failed to create servant with the name '${req.body.name}'.`,
    });
  }
};

const updateServant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, regionId } = req.body;
    const servant = await prisma.servant.update({
      where: { id: Number(id) },
      data: {
        name,
        regionId,
      },
    });
    res.json(servant);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to update servant with ID ${req.params.id}.` });
  }
};

const deleteServant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const servant = await prisma.servant.delete({
      where: { id: Number(id) },
    });
    res.json(servant);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete servant with ID ${req.params.id}.` });
  }
};

// relational getters
const getServantByRegion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const servants = await prisma.region
      .findUnique({
        where: { id: Number(id) },
      })
      .servants();
    res.json(servants);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to find servants for region ${req.params.id}.` });
  }
};

const ChildrensByServant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const children = await prisma.servant
      .findUnique({
        where: { id: Number(id) },
      })
      .children();
    res.json(children);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to find children for servant ${req.params.id}.` });
  }
};

export {
  getServants,
  getServant,
  createServant,
  updateServant,
  deleteServant,
  getServantByRegion,
  ChildrensByServant,
};
