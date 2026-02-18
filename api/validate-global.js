export default function handler(req, res) {
    // URL se aayi hui key ko read karo
    const { key } = req.query;

    // 🔥 APNI FILE KA SECRET DIRECT LINK YAHAN DAALO 🔥
    const secureLibLink = "https://your-direct-link.com/libLewis.so";

    // Aapki Keys ka Database
    const validKeys = {
        "OPX-HPW65X": "2026-03-01T10:00:00.000Z", // Active Key
        "OPX-ADMIN": "2026-12-31T23:59:59.000Z"   // Admin Key
    };

    // CORS (Taaki app bina error connect kare)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // Verification Logic
    if (validKeys[key]) {
        const expiryDate = new Date(validKeys[key]);
        const currentDate = new Date();

        if (currentDate < expiryDate) {
            // SUCCESS
            res.status(200).json({
                status: true,
                expiry: validKeys[key],
                lib_url: secureLibLink, // App is link ko hide karke download karegi
                message: "VIP Login Success"
            });
        } else {
            // EXPIRED
            res.status(200).json({
                status: false,
                message: "Key Expired"
            });
        }
    } else {
        // INVALID
        res.status(200).json({
            status: false,
            message: "Invalid Key"
        });
    }
}
