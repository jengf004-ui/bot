// 1. กำหนดเป้าหมายและเวลา
const REPLIT_URL = 'https://a3c8d22b-9d27-40ee-b98e-28e131a76f65-00-29wwch4dmlims.pike.replit.dev/'; // เปลี่ยนเป็น URL ของคุณ
const INTERVAL = 4 * 60 * 1000; // 4 นาที (คำนวณจาก: 4 * 60 วินาที * 1000 มิลลิวินาที)

// 2. ฟังก์ชันหลักสำหรับส่งสัญญาณไปปลุก (Ping)
function ping() {
  const now = new Date().toISOString(); // ดึงเวลาปัจจุบันในรูปแบบสากล (ISO)
  
  // ใช้ fetch (Built-in ของ Node.js) ยิงไปที่เว็บ Replit
  fetch(REPLIT_URL)
    .then(res => {
      // ถ้าไม่มีอะไรผิดพลาด จะแสดงเวลาพร้อมกับ HTTP Status (เช่น 200 คือ OK)
      console.log(`[${now}] Pinged Replit! Status: ${res.status}`);
    })
    .catch(err => {
      // หากเน็ตเวิร์กมีปัญหา หรือ URL ผิดพลาด จะดักจับเพื่อไม่ให้บอทล่ม (Crash)
      console.error(`[${now}] Error: ${err.message}`);
    });
}

// 3. เริ่มทำงาน
console.log('Bot started, keep-alive loop initiated.');

ping(); // สั่งให้ยิงหา Replit ทันที 1 ครั้งตอนเปิดเครื่อง (ไม่ต้องรอกดเวลา)

// สั่งให้ตั้งเวลาทำงานซ้ำ ๆ ทุก ๆ 4 นาที (ตามที่เราตั้งไว้ในตัวแปร INTERVAL)
setInterval(ping, INTERVAL);