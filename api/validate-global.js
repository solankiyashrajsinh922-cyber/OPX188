export default function handler(req, res) {
    // App se aayi hui key ko read karo
    const { key } = req.query;

    // Aapki Keys ka Database (Yahan apni working keys rakhein)
    const validKeys = {
        "OPX-HPW65X": "2026-03-01T10:00:00.000Z", // Ye aapki working key hai
        "OPX-ADMIN": "2026-12-31T23:59:59.000Z"   // Ek aur backup key
    };

    // CORS Headers (Taaki app block na ho)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // Verification Logic (Sirf Status aur Expiry bhejna)
    if (validKeys[key]) {
        const expiryDate = new Date(validKeys[key]);
        const currentDate = new Date();

        // Check expiry
        if (currentDate < expiryDate) {
            // SUCCESS! 
            res.status(200).json({
                status: true,
                expiry: validKeys[key]
            });
        } else {
            // FAIL: Expired
            res.status(200).json({
                status: false,
                message: "Key Expired"
            });
        }
    } else {
        // FAIL: Invalid Key
        res.status(200).json({
            status: false,
            message: "Invalid Key"
        });
    }
}
