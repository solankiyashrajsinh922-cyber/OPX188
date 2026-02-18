export default function handler(req, res) {
    // 1. App se aayi hui key ko read karo
    const { key } = req.query;

    // 2. 🔥 APNI FILE KA SECRET DIRECT LINK YAHAN DAALO 🔥
    const secureLibLink = "https://your-direct-link.com/libLewis.so";

    // 3. Aapka Database (Yahan aap apni keys aur expiry date set kar sakte ho)
    // Format: "KEY_NAME": "EXPIRY_DATE_IN_ISO_FORMAT"
    const validKeys = {
        "OPX-HPW65X": "2026-03-01T10:00:00.000Z", // User ki key jo valid hai
        "OPX-ADMIN": "2026-12-31T23:59:59.000Z",  // Aapki personal lifetime key
        "OPX-TEST": "2024-01-01T10:00:00.000Z"    // Ek expired key testing ke liye
    };

    // CORS Headers (Taaki app bina kisi block ke connect kar sake)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // 4. Verification Logic
    if (validKeys[key]) {
        const expiryDate = new Date(validKeys[key]);
        const currentDate = new Date();

        // Check karo ki key expire toh nahi ho gayi
        if (currentDate < expiryDate) {
            // SUCCESS! Sahi key hai aur time bacha hai.
            res.status(200).json({
                status: true,
                expiry: validKeys[key],
                lib_url: secureLibLink, // 👈 Ye link sirf success hone par jayega!
                message: "VIP Login Success"
            });
        } else {
            // FAIL: Key Expire ho chuki hai
            res.status(200).json({
                status: false,
                message: "Key Expired"
            });
        }
    } else {
        // FAIL: Key exist hi nahi karti
        res.status(200).json({
            status: false,
            message: "Invalid Key"
        });
    }
}
