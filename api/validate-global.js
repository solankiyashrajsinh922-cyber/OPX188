export default async function handler(req, res) {
  const { key } = req.query;

  if (!key) {
    return res.status(200).json({ status: false, message: "Key missing" });
  }

  try {
    const dbUrl = `https://opx188-ff1a3-default-rtdb.firebaseio.com/keys/${key}.json`;
    const response = await fetch(dbUrl);
    const keyData = await response.json();

    if (keyData && keyData.active === true) {
      // SUCCESS: Injector ko 'data' field dena zaroori hai
      return res.status(200).json({ 
        status: true, 
        auth: "success",
        data: "verified", // Ye wo 'data' field hai jo error hatayegi
        msg: "Login Success",
        expiry: keyData.expires 
      });

    } else {
      return res.status(200).json({ status: false, message: "Invalid Key" });
    }
  } catch (error) {
    return res.status(200).json({ status: false, message: "Server Error" });
  }
}
