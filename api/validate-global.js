export default async function handler(req, res) {
  // Injector se 'key' mangne ke liye
  const { key } = req.query;

  if (!key) {
    return res.status(200).json({ 
      status: false, 
      message: "Chave em falta" // (Key missing - LKL language)
    });
  }

  try {
    // Aapke Firebase ka link
    const dbUrl = `https://opx188-ff1a3-default-rtdb.firebaseio.com/keys/${key}.json`;
    const response = await fetch(dbUrl);
    const data = await response.json();

    // Agar key database mein nahi hai
    if (!data) {
      return res.status(200).json({ 
        status: false, 
        message: "Chave não encontrada" // (Key not found)
      });
    }

    const now = new Date();
    const expiry = new Date(data.expires);

    // Agar key expire ho gayi hai
    if (now > expiry) {
      return res.status(200).json({ 
        status: false, 
        message: "Chave expirada" // (Key expired)
      });
    }

    // SUCCESS: Login Successful
    return res.status(200).json({
      status: true,
      auth: "success",
      msg: "Login Sucesso",
      user_key: key,
      expiry: data.expires,
      // Lib file ka link (Iska naam GitHub wali file se match hona chahiye)
      download_url: "https://opx-188.vercel.app/libLKL.so" 
    });

  } catch (error) {
    return res.status(200).json({ status: false, message: "Erro de servidor" });
  }
}
