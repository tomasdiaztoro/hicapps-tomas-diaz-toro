import db from "../configs/db.js";

export const createLog = async (log) => {
  try {
    await db.ref("logs").push(log);
  } catch (error) {
    throw new Error(`Error creating log: ${error.message}`);
  }
};
