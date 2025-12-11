import "dotenv/config";
import express, { Application, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "./config/databse";

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

// POST /api/users - Create a new user
app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const { email, password, phone, role } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        phone: phone || undefined,
        role: role || "PATIENT",
      },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    console.error("Error creating user:", error);

    // Handle unique constraint violations
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "User with this email or phone already exists",
      });
    }

    res.status(500).json({
      error: "Failed to create user",
      message: error.message,
    });
  }
});

// GET /api/users - Get all users
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      message: "Users retrieved successfully",
      count: users.length,
      users,
    });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      error: "Failed to fetch users",
      message: error.message,
    });
  }
});

// GET /api/users/:id - Get a specific user by ID
app.get("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({
      message: "User retrieved successfully",
      user,
    });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      error: "Failed to fetch user",
      message: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
