import { ZodError } from "zod";

export const validateSchema = (schema) => (req, res, next) => {
    try {
        // 🔍 Sanity check: aseguramos que pasaste un schema válido
        if (!schema || typeof schema.safeParse !== "function") {
        console.error("❌ validateSchema: schema inválido o undefined");
        return res.status(500).json({
            message: "Internal validation middleware error (invalid schema)",
        });
        }

        const result = schema.safeParse(req.body);

        if (!result.success) {
        const issues = (result.error.issues ?? []).map((i) => ({
            path: Array.isArray(i.path) ? i.path.join(".") : "",
            message: i.message || "Invalid field",
        }));

        return res.status(422).json({
            message: "Validation error",
            issues,
        });
        }

        // Datos ya validados / transformados
        req.body = result.data;
        return next();
    } catch (error) {
        console.error("❌ Error in validateSchema:", error);

        if (error instanceof ZodError) {
        const issues = (error.issues ?? []).map((i) => ({
            path: Array.isArray(i.path) ? i.path.join(".") : "",
            message: i.message || "Invalid field",
        }));

        return res.status(422).json({
            message: "Validation error",
            issues,
        });
        }

        return res.status(500).json({
        message: "Internal validation middleware error",
        });
    }
};
