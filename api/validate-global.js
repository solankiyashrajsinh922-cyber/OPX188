export default async function handler(req, res) {
  const userKey = req.query.key; 

  if (!userKey) {
    return res.status(400).json({ status: false, message: "Please enter a key" });
  }

  try {
    // Aapka Firebase URL
    const dbUrl = `https://opx188-ff1a3-default-rtdb.firebaseio.com/keys/${userKey}.json`;
    const response = await fetch(dbUrl);
    const keyData = await response.json();

    if (keyData !== null && keyData.active === true) {
      
      const currentDate = new Date();
      const expireDate = new Date(keyData.expires);

      if (currentDate > expireDate) {
         return res.status(401).json({ status: false, message: "Ye Key expire ho chuki he!" });
      }

      return res.status(200).json({ 
        status: true, 
        message: "Login Successful!",
        expireDate: keyData.expires 
      });

    } else {
      return res.status(401).json({ status: false, message: "Key Galat hai!" });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: "Server Error" });
  }
}

