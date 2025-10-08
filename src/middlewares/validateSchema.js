export const validateSchema = (schema) => (req, res, next) => {
    try {
        const result = schema.safeParse(req.body)
        if (!result.success) {
            const issues = result.error.issues.map(i => ({
            path: i.path.join("."),
            message: i.message,
            }));
            return res.status(422).json({ message: "Validation error", issues });
        }
        //Datos transformados (trim, toLowerCase, etc.)
        req.body = result.data;
        next()
    }catch(error){
        console.error("❌ Error in validateSchema:", error);

        // Si el fallo no es de validación, devolvemos un error genérico
        return res.status(500).json({
        message: "Internal validation middleware error",
        });
    }
}