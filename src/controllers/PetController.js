import { prismaClient } from "../database/PrismaClient.js";

export class PetController {
  
  
  async registerPet(req, res) {
    const { nome, idade, tipo, raça, status } = req.body;

    try {
      const newPet = await prismaClient.pets.create({
        data: {
          nome,
          idade,
          tipo,
          raça,
          status,
        },
      });

      return res.status(201).json(newPet);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

 
  async getAllPets(req, res) {
    try {
      const pets = await prismaClient.pets.findMany();
      return res.status(200).json(pets);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  
  async getPetById(req, res) {
    const { id } = req.params;

    try {
      const pet = await prismaClient.pets.findUnique({
        where: { id },
      });

      if (!pet) {
        return res.status(404).json({ error: "Pet not found" });
      }

      return res.status(200).json(pet);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  
  async updatePet(req, res) {
    const { id } = req.params;
    const { nome, idade, tipo, raça, status } = req.body;

    try {
      const updatedPet = await prismaClient.pets.update({
        where: { id },
        data: {
          nome,
          idade,
          tipo,
          raça,
          status,
        },
      });

      return res.status(200).json(updatedPet);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  
  async deletePet(req, res) {
    const { id } = req.params;

    try {
      const pet = await prismaClient.pets.findUnique({
        where: { id },
      });

      if (!pet) {
        return res.status(404).json({ error: "Pet not found" });
      }

      await prismaClient.pets.delete({
        where: { id },
      });

      return res.status(200).json({ message: "Pet deleted" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}