function isValidAccount(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^09\d{8}$/;
  return emailRegex.test(input) || phoneRegex.test(input);
}

function togglePasswordVisibility() {
  const pw = document.getElementById("password");
  const icon = document.querySelector(".toggle-password");

  const isHidden = pw.type === "password";
  pw.type = isHidden ? "text" : "password";
  icon.src = isHidden ? "images/eye-open.svg" : "images/eye-closed.svg";
}


document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("savedAccount");
  if (saved) document.getElementById("account").value = saved;
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const account = document.getElementById("account").value.trim();
  const password = document.getElementById("password").value.trim();
  const remember = document.getElementById("remember").checked;
  const btn = document.querySelector(".login-btn");

  if (!account || !password) {
    alert("請輸入帳號與密碼");
    return;
  }

  if (!isValidAccount(account)) {
    alert("請輸入正確的手機號碼或 Email");
    return;
  }

  if (remember) {
    localStorage.setItem("savedAccount", account);
  } else {
    localStorage.removeItem("savedAccount");
  }

  btn.innerText = "登入中...";
  btn.disabled = true;

  setTimeout(() => {
    document.body.innerHTML = `
      <div class="login-box">
        <h2>您好，${account} 👋</h2>
        <p>您已成功登入！</p>
        <button onclick="location.reload()">登出</button>
      </div>
    `;
  }, 1000);
});

