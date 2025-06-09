function isValidAccount(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^09\d{8}$/;
  return emailRegex.test(input) || phoneRegex.test(input);
}

function maskAccount(account) {
  if (/^09\d{8}$/.test(account)) {
    return account.slice(0, 4) + '***' + account.slice(-3);
  }
  if (account.includes("@")) {
    const [name, domain] = account.split("@");
    return name[0] + '***' + name.slice(-1) + '@' + domain;
  }
  return account;
}

function togglePasswordVisibility() {
  const pw = document.getElementById("password");
  const icon = document.querySelector(".toggle-password");
  const isHidden = pw.type === "password";
  pw.type = isHidden ? "text" : "password";
  icon.src = isHidden ? "images/eye-open.svg" : "images/eye-closed.svg";
}

function toggleRegPw(id, icon) {
  const input = document.getElementById(id);
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  icon.src = isHidden ? "images/eye-open.svg" : "images/eye-closed.svg";
}

function showLogin() {
  document.getElementById("step1").style.display = "block";
  document.getElementById("step2").style.display = "none";
  document.getElementById("registerBox").style.display = "none";
  document.getElementById("forgotBox").style.display = "none";
}

function showRegister() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "none";
  document.getElementById("registerBox").style.display = "block";
  document.getElementById("forgotBox").style.display = "none";
}

function showForgot() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "none";
  document.getElementById("registerBox").style.display = "none";
  document.getElementById("forgotBox").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("savedAccount");
  if (saved) {
    document.getElementById("account").value = saved;
    document.getElementById("remember").checked = true;
  }

  // 登入第一階段：帳號 → 密碼
  document.getElementById("continueBtn").addEventListener("click", () => {
    const account = document.getElementById("account").value.trim();
    const remember = document.getElementById("remember").checked;

    if (!isValidAccount(account)) {
      alert("請輸入正確的手機號碼或 Email");
      return;
    }

    if (remember) {
      localStorage.setItem("savedAccount", account);
    } else {
      localStorage.removeItem("savedAccount");
    }

    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
    document.getElementById("maskedAccount").textContent = maskAccount(account);
  });

  // 登入第二階段：密碼
  document.getElementById("loginBtn").addEventListener("click", () => {
    const password = document.getElementById("password").value.trim();
    if (!password) {
      alert("請輸入密碼");
      return;
    }

    document.getElementById("loginBtn").innerText = "登入中...";
    document.getElementById("loginBtn").disabled = true;

    setTimeout(() => {
      window.location.href = "https://24h.pchome.com.tw/";
    }, 1000);
  });

  // 註冊功能
  document.getElementById("registerBtn").addEventListener("click", () => {
    const phone = document.getElementById("regPhone").value.trim();
    const pw1 = document.getElementById("regPassword").value.trim();
    const pw2 = document.getElementById("regConfirm").value.trim();

    if (!/^09\d{8}$/.test(phone)) {
      alert("請輸入正確的手機號碼");
      return;
    }
    if (pw1.length < 6) {
      alert("密碼需至少 6 碼");
      return;
    }
    if (pw1 !== pw2) {
      alert("兩次輸入的密碼不一致");
      return;
    }

    alert("✅ 註冊成功！請登入");
    showLogin();
  });

  // 忘記密碼功能
  document.getElementById("forgotBtn").addEventListener("click", () => {
    const input = document.getElementById("forgotAccount").value.trim();
    if (!isValidAccount(input)) {
      alert("請輸入正確的手機號碼或 Email");
      return;
    }

    alert("✅ 已寄出重設密碼連結到您輸入的帳號！");
    showLogin();
  });
});
