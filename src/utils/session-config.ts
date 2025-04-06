declare module 'express-session' {
  interface SessionData {
    visited?: boolean;
  }
}
export const sessionConfig = {
  secret: 'my-secret', // Güvenli bir anahtar seçin
  resave: false, // Oturum verisini her istekten sonra kaydetme
  saveUninitialized: true, // Başlangıçta oturum verisi yoksa kaydetme
  cookie: {
    httpOnly: true, // Tarayıcı tarafından sadece http isteklerinde erişilebilir
    // secure: false, // HTTPS kullanıyorsanız true yapabilirsiniz
    maxAge: 24 * 60 * 60 * 1000, // Çerezin geçerlilik süresi (1 gün)
  },
};
