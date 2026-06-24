const SERVER_ID = "1455762620907913409";

async function loadDiscordStats() {

  try {

    const res = await fetch(
      `https://discord.com/api/guilds/${SERVER_ID}/widget.json`
    );

    const data = await res.json();

    document.getElementById("online").innerText =
      data.presence_count ?? "N/A";

    document.getElementById("members").innerText =
      data.members?.length ?? "N/A";

  } catch {

    document.getElementById("online").innerText = "--";
    document.getElementById("members").innerText = "--";

  }
}

loadDiscordStats();