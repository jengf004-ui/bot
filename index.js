const http = require('http');

const REPLIT_URL = 'https://a3c8d22b-9d27-40ee-b98e-28e131a76f65-00-29wwch4dmlims.pike.replit.dev/'; // URL เว็บ Replit ของคุณ
const RENDER_URL = 'https://your-bot-name.onrender.com'; // เดี๋ยวเอา URL ที่ได้จาก Render มาใส่ทีหลัง

// 1. สร้าง Server หลอกไว้บน Render เพื่อให้เป็น Web Service ได้สำเร็จ
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running and keeping alive!\n');
});

// 2. ฟังก์ชันหลักสำหรับไปปลุก Replit
function pingReplit() {
  fetch(REPLIT_URL)
    .then(res => console.log(`[${new Date().toLocaleTimeString()}] ปลุก Replit สำเร็จ! Status: ${res.status}`))
    .catch(err => console.error('เกิดข้อผิดพลาดในการปลุก Replit:', err.message));
}

// 3. ฟังก์ชันปลุกตัวเอง (Self-Ping) ป้องกันไม่ให้ Render หลับ
function pingMyself() {
  if (RENDER_URL.includes('onrender.com')) {
    fetch(RENDER_URL)
      .then(res => console.log(`[${new Date().toLocaleTimeString()}] บอทปลุกตัวเองสำเร็จ! Status: ${res.status}`))
      .catch(err => console.error('เกิดข้อผิดพลาดในการปลุกตัวเอง:', err.message));
  }
}

// สั่งให้ทำงานตามรอบเวลา
setInterval(pingReplit, 4 * 60 * 1000); // ปลุก Replit ทุก 4 นาที
setInterval(pingMyself, 10 * 60 * 1000); // ปลุกตัวเองทุก 10 นาที

// เปิด Port ให้เซิร์ฟเวอร์ทำงาน
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`บอทสตาร์ทระบบแล้ว รันบน Port ${PORT}`);
  pingReplit(); // รันครั้งแรกทันที
});
