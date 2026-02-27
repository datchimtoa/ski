import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  const { telegram_id, username } = req.body

  if (!telegram_id) {
    return res.status(400).json({ error: "No telegram_id" })
  }

  const { data: existing } = await supabase
    .from("players")
    .select("*")
    .eq("telegram_id", telegram_id)
    .single()

  if (!existing) {
    await supabase.from("players").insert({
      telegram_id,
      username,
      score: 0
    })
  }

  res.status(200).json({ ok: true })
}
