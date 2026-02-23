(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile sidebar toggle
  const btn = document.getElementById("menuBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      document.body.classList.toggle("menu-open");
    });
  }

  // Close menu on section click (mobile)
  document.querySelectorAll(".snav a").forEach(a => {
    a.addEventListener("click", () => document.body.classList.remove("menu-open"));
  });

  // Copy quick note
  const copyBtn = document.getElementById("copyBtn");
  const status = document.getElementById("copyStatus");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const name = (document.getElementById("name")?.value || "").trim();
      const msg = (document.getElementById("msg")?.value || "").trim();

      const text =
`Hi Faizan,
${name ? `I'm ${name}. ` : ""}${msg ? msg : "I'd like to discuss an opportunity with you."}

Thanks!`;

      try {
        await navigator.clipboard.writeText(text);
        if (status) status.textContent = "Copied to clipboard.";
        setTimeout(() => { if (status) status.textContent = ""; }, 2500);
      } catch {
        if (status) status.textContent = "Copy failed. Please copy manually.";
      }
    });
  }
})();
