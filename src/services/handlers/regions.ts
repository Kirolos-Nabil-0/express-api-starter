import express, { Router, Request, Response, NextFunction } from "express";

import { Region as RegionTypes } from "../../../types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRegions = async (req: Request, res: Response) => {
  try {
    const regions = await prisma.region.findMany({
      include: {
        servants: true,
        children: true,
      },
    });
    res.json(regions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve regions. Please try again later." });
  }
};

export const getRegion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const region = await prisma.region.findUnique({
      where: { id: Number(id) },
      include: {
        servants: true,
        children: true,
      },
    });
    res.json(region);
  } catch (error) {
    res.status(500).json({
      error: `Failed to find region with ID ${req.params.id}.`,
    });
  }
};

export const createRegion = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const region = await prisma.region.create({
      data: {
        name,
      },
    });
    res.json(region);
  } catch (error) {
    res.status(500).json({
      error: ` Failed to create region with the name '${req.body.name}`,
    });
  }
};

export const updateRegion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const region = await prisma.region.update({
      where: { id: Number(id) },
      data: {
        name,
      },
    });
    res.json(region);
  } catch (error) {
    res.status(500).json({
      error: `Failed to update region with ID ${req.params.id}.`,
    });
  }
};

export const deleteRegion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const region = await prisma.region.delete({
      where: { id: Number(id) },
    });
    res.json(region);
  } catch (error) {
    res.status(500).json({
      error: `Failed to delete region with ID ${req.params.id}.`,
    });
  }
};

export const getRegionServants = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const region = await prisma.region.findUnique({
      where: { id: Number(id) },
      include: {
        servants: true,
      },
    });
    res.json(region);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRegionChildren = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const region = await prisma.region.findUnique({
      where: { id: Number(id) },
      include: {
        children: true,
      },
    });
    res.json(region);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRegionServantsChildren = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const region = await prisma.region.findUnique({
      where: { id: Number(id) },
      include: {
        servants: {
          include: {
            children: true,
          },
        },
      },
    });
    res.json(region);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const countRegionServants = async (req: Request, res: Response) => {
  // return the number of servants in a region
  try {
    const { id } = req.params;
    const region = await prisma.region.findUnique({
      where: { id: Number(id) },
      include: {
        servants: true,
      },
    });
    if (region) {
      res.json(region.servants.length);
    } else {
      res.json(0);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const countRegionChildren = async (req: Request, res: Response) => {
  // return the number of children in a region
  try {
    const { id } = req.params;
    const region = await prisma.region.findUnique({
      where: { id: Number(id) },
      include: {
        children: true,
      },
    });
    if (region) {
      res.json(region.children.length);
    } else {
      res.json(0);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
