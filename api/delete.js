import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "الطريقة غير مدعومة" });
  }

  const { username, phone } = req.body;
  if (!username || !phone) {
    return res.status(400).json({ message: "الرجاء ملء جميع الحقول." });
  }

  // إعداد المرسل - هنا نفترض استخدام حساب Gmail
  // قم بتعيين هذه المتغيرات في إعدادات Vercel Environment Variables:
  // GMAIL_USER = بريدك (مثلاً: your@gmail.com)
  // GMAIL_PASS = كلمة مرور التطبيق App Password
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  // تكوين البريد
  const mailOptions = {
    from: `"سفراء الولاية" <${process.env.GMAIL_USER}>`,
    to: "amaryaser22288@gmail.com",
    subject: "طلب حذف حساب جديد",
    text: `وصل طلب حذف حساب من المستخدم:
اسم المستخدم: ${username}
رقم الهاتف: ${phone}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "تم إرسال طلبك بنجاح." });
  } catch (error) {
    console.error("خطأ بإرسال البريد:", error);
    return res.status(500).json({ message: "فشل إرسال البريد، حاول لاحقًا." });
  }
}
