export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, reason } = req.body;
    console.log("طلب حذف من:", email, "السبب:", reason);
    // هنا يمكنك مثلاً إرسال بريد أو تخزين في DB
    return res.status(200).json({ message: "تم استلام الطلب." });
  } else {
    return res.status(405).json({ message: "الطريقة غير مدعومة" });
  }
}
