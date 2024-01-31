import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = await prisma.childAttendance.findMany({
      include: {
        Child: true,
      },
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve attendance. Please try again later.",
    });
  }
};

const getChildAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const attendance = await prisma.childAttendance.findMany({
      where: { childId: Number(id) },
      include: {
        Child: true,
      },
    });
    if (!attendance) {
      return res
        .status(404)
        .json({ error: `Attendance with ID ${req.params.id} not found.` });
    }
    res.json(attendance);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to find attendance with ID ${req.params.id}.` });
  }
};

const createAttendance = async (req: Request, res: Response) => {
  try {
    const { childId, state } = req.body;
    const attendance = await prisma.childAttendance.create({
      data: {
        childId,
        state,
      },
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      error: `Failed to create attendance with the name '${req.body.name}'.`,
    });
  }
};

const updateAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { state } = req.body;
    const attendance = await prisma.childAttendance.update({
      where: { id: Number(id) },
      data: {
        state,
      },
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      error: `Failed to update attendance with ID ${req.params.id}.`,
    });
  }
};

const deleteAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const attendance = await prisma.childAttendance.delete({
      where: { id: Number(id) },
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      error: `Failed to delete attendance with ID ${req.params.id}.`,
    });
  }
};

export {
  getAttendance,
  getChildAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
};
