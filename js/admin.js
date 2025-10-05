// معلومات تسجيل الدخول للمسؤول
const adminCredentials = {
  username: "admin",
  password: "alkamali2025"
};

// التحقق من بيانات تسجيل الدخول
function validateLogin(username, password) {
  return username === adminCredentials.username && password === adminCredentials.password;
}

// إعادة توجيه المستخدم إلى لوحة التحكم بعد تسجيل الدخول بنجاح
function redirectToDashboard() {
  window.location.href = "admin/dashboard.html";
}

// التعامل مع نموذج تسجيل الدخول
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      if (validateLogin(username, password)) {
        // تخزين حالة تسجيل الدخول في localStorage
        localStorage.setItem('isLoggedIn', 'true');
        redirectToDashboard();
      } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    });
  }
  
  // التحقق من حالة تسجيل الدخول عند تحميل صفحات لوحة التحكم
  const isAdminPage = window.location.href.includes('/admin/');
  if (isAdminPage) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = "../login.html";
    }
  }
});

// تسجيل الخروج
function logout() {
  localStorage.removeItem('isLoggedIn');
  window.location.href = "../login.html";
}
