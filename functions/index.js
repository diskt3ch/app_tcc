const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// webhook que simula o pagamento do pix (recebe o POST e atualiza no firestore)
exports.webhookPagamento = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { pedido_id, gateway_ref, status } = req.body;

  if (!pedido_id || !status) {
    return res.status(400).send({ error: "Missing payload" });
  }

  try {
    const pedidoRef = db.collection("pedidos").doc(String(pedido_id));
    
    // atualiza o pedido pra APPROVED e libera pra cozinha
    await pedidoRef.set({
      pagamento_status: status, // ex: 'APPROVED'
      status_preparo: "PREPARANDO",
      gateway_ref: gateway_ref || "tx_mocked_123",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    functions.logger.info(`Pagamento aprovado para pedido ${pedido_id}`);
    
    return res.status(200).send({ success: true, pedido_id, status: "PREPARANDO" });
  } catch (error) {
    functions.logger.error("Erro no webhook:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});
