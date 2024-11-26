export function verifyUser(userID, pass) {
    // ฟังก์ชันเช็คว่ามี user นี้ใน data หรือไม่
    const userFound = users.find((u) => {
      return u.id == userID && u.pass === pass;
    });
    
    // ถ้ามีจะ return name, role ถ้าไม่จะ return null
    return userFound ? {name: userFound.name, role: userFound.role } : null;
  }